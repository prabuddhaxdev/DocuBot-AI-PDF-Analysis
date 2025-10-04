import * as pdfjsLib from 'pdfjs-dist';
import type { PDFProcessingResult, Attachment } from '@/types';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// Utility function to generate unique IDs
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Validate PDF file
export const validatePDFFile = (file: File): { valid: boolean; error?: string } => {
  // Check file type
  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'Please select a PDF file' };
  }
  
  // Check file size (max 15MB for better processing)
  const maxSize = 15 * 1024 * 1024; // 15MB
  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: `File size (${formatFileSize(file.size)}) exceeds the maximum limit of ${formatFileSize(maxSize)}` 
    };
  }
  
  return { valid: true };
};

// Real PDF text extraction using PDF.js
export const extractTextFromPDF = async (file: File): Promise<PDFProcessingResult> => {
  try {
    console.log(`🔍 Starting PDF text extraction for: ${file.name}`);
    
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load PDF document
    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
      verbosity: 0, // Reduce console noise
    }).promise;
    
    console.log(`📄 PDF loaded successfully. Pages: ${pdf.numPages}`);
    
    const textPages: string[] = [];
    let metadata: any = {};
    
    // Extract metadata
    try {
      const pdfMetadata = await pdf.getMetadata();
      const info = pdfMetadata.info as Record<string, any> | undefined;
      metadata = {
        title: info && typeof info['Title'] === 'string' ? info['Title'] : file.name.replace('.pdf', ''),
        author: info && typeof info['Author'] === 'string' ? info['Author'] : 'Unknown',
        subject: info && typeof info['Subject'] === 'string' ? info['Subject'] : 'Document Analysis',
        creator: info && typeof info['Creator'] === 'string' ? info['Creator'] : 'PDF Creator',
        producer: info && typeof info['Producer'] === 'string' ? info['Producer'] : 'Unknown',
        creationDate: (pdfMetadata.info && 'CreationDate' in pdfMetadata.info) ? (pdfMetadata.info as any).CreationDate : null,
        keywords: (pdfMetadata.info && 'Keywords' in pdfMetadata.info) ? (pdfMetadata.info as any).Keywords : '',
      };
    } catch (metaError) {
      console.warn('Could not extract PDF metadata:', metaError);
    }
    
    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        console.log(`📝 Processing page ${pageNum}/${pdf.numPages}`);
        
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Combine all text items into a single string
        const pageText = textContent.items
          .map((item: any) => {
            // Handle different text item types
            if ('str' in item) {
              return item.str;
            }
            return '';
          })
          .join(' ')
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
        
        if (pageText) {
          textPages.push(`--- Page ${pageNum} ---\n${pageText}\n`);
        }
        
        // Clean up page resources
        page.cleanup();
      } catch (pageError) {
        console.error(`Error processing page ${pageNum}:`, pageError);
        textPages.push(`--- Page ${pageNum} ---\n[Error extracting text from this page]\n`);
      }
    }
    
    // Combine all pages
    const fullText = textPages.join('\n').trim();
    
    console.log(`✅ PDF extraction complete. Extracted ${fullText.length} characters from ${pdf.numPages} pages`);
    
    // Validate extraction
    if (!fullText || fullText.length < 10) {
      throw new Error('PDF appears to be empty or contains only images/scanned content. Text extraction failed.');
    }
    
    return {
      text: fullText,
      pageCount: pdf.numPages,
      metadata,
    };
  } catch (error) {
    console.error('PDF extraction error:', error);
    
    if (error instanceof Error) {
      // Provide more specific error messages
      if (error.message.includes('Invalid PDF')) {
        throw new Error('The uploaded file appears to be corrupted or is not a valid PDF document.');
      } else if (error.message.includes('password')) {
        throw new Error('This PDF is password-protected. Please upload an unprotected PDF file.');
      } else if (error.message.includes('empty')) {
        throw new Error('This PDF appears to contain only images or scanned content. Please try a PDF with selectable text.');
      } else {
        throw new Error(`Failed to extract text from PDF: ${error.message}`);
      }
    }
    
    throw new Error('An unexpected error occurred while processing the PDF. Please try again.');
  }
};

// Process PDF file and create attachment
export const processPDFFile = async (file: File): Promise<Attachment> => {
  // Validate file first
  const validation = validatePDFFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }
  
  console.log(`🚀 Starting PDF processing for: ${file.name} (${formatFileSize(file.size)})`);
  
  // Extract text from PDF
  const extractionResult = await extractTextFromPDF(file);
  
  // Create attachment object
  const attachment: Attachment = {
    id: generateId(),
    name: file.name,
    type: 'pdf',
    size: file.size,
    url: URL.createObjectURL(file), // Local blob URL for display
    extractedText: extractionResult.text,
    metadata: extractionResult.metadata || {},
  };
  
  console.log(`✅ PDF attachment created successfully:`, {
    name: attachment.name,
    textLength: attachment.extractedText?.length || 0,
    pageCount: extractionResult.pageCount,
  });
  
  return attachment;
};

// Get PDF preview/thumbnail
export const getPDFPreview = async (file: File): Promise<string> => {
  try {
    // Create a simple preview using the file icon
    // In a real app, you might generate actual PDF thumbnails
    return URL.createObjectURL(file);
  } catch (error) {
    console.error('Failed to generate PDF preview:', error);
    throw new Error('Failed to generate PDF preview');
  }
};

// Clean up blob URLs to prevent memory leaks
export const cleanupPDFResources = (attachment: Attachment): void => {
  if (attachment.url.startsWith('blob:')) {
    URL.revokeObjectURL(attachment.url);
  }
};

// Search within PDF text
export const searchInPDF = (text: string, query: string): boolean => {
  if (!text || !query) return false;
  return text.toLowerCase().includes(query.toLowerCase());
};

// Get PDF statistics
export const getPDFStats = (attachment: Attachment): {
  wordCount: number;
  characterCount: number;
  readingTime: number; // in minutes
  pages: number;
} => {
  const text = attachment.extractedText || '';
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const characters = text.length;
  const readingTime = Math.ceil(words.length / 200); // Assuming 200 words per minute
  
  return {
    wordCount: words.length,
    characterCount: characters,
    readingTime,
    pages: attachment.metadata?.pageCount || 0,
  };
};

// Extract key information from PDF text
export const extractKeyInfo = (text: string): {
  emails: string[];
  phones: string[];
  urls: string[];
  dates: string[];
} => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const urlRegex = /https?:\/\/[^\s]+/g;
  const dateRegex = /\b\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\b|\b\d{4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,2}\b/g;
  
  return {
    emails: [...new Set(text.match(emailRegex) || [])],
    phones: [...new Set(text.match(phoneRegex) || [])],
    urls: [...new Set(text.match(urlRegex) || [])],
    dates: [...new Set(text.match(dateRegex) || [])],
  };
}; 