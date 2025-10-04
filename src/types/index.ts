// Core message types
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  attachments?: Attachment[];
}

// Attachment types for file uploads
export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  extractedText?: string;
  metadata?: AttachmentMetadata;
}

export interface AttachmentMetadata {
  title?: string;
  author?: string;
  subject?: string;
  creator?: string;
  producer?: string;
  creationDate?: Date | string | null;
  keywords?: string;
  pageCount?: number;
}

// Chat session types
export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  systemPrompt?: string;
}

// API types
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Groq API types
export interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GroqChatCompletion {
  id: string;
  object: 'chat.completion';
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: 'assistant';
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Chat types
export interface ChatContext {
  messages: Message[];
  currentAttachment?: Attachment;
  isLoading: boolean;
  error?: string | null;
}

// UI state types
export interface UIState {
  isLoading: boolean;
  error?: string | null;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
}

// Error types
export interface APIError {
  message: string;
  code?: string;
  details?: any;
}

// User types for future auth implementation
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
}

// Component props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

// Hook return types
export interface UseAPIReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// PDF processing types
export interface PDFProcessingResult {
  text: string;
  pageCount: number;
  metadata?: {
    title?: string;
    author?: string;
    subject?: string;
    creator?: string;
    producer?: string;
    creationDate?: Date | string | null;
    keywords?: string;
  };
}

export interface PDFStats {
  wordCount: number;
  characterCount: number;
  readingTime: number;
  pages: number;
}

export interface PDFKeyInfo {
  emails: string[];
  phones: string[];
  urls: string[];
  dates: string[];
} 