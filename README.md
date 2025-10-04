# DocWise AI

AI-powered PDF analysis platform with vintage aesthetics. Upload PDFs and chat with your documents using advanced AI.

## Features

🤖 **AI Chat Interface** - Natural conversation about your document content using Groq's Meta Llama models  
📄 **PDF Processing** - Advanced text extraction from any PDF document  
⚡ **Instant Analysis** - Get insights and answers in seconds  
🎨 **Beautiful Design** - Vintage black & white aesthetic with glass effects  
📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile  
🔒 **Secure** - Your documents stay private and secure  

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS with custom vintage design system
- **AI**: Groq SDK with Meta Llama models
- **PDF Processing**: PDF.js for browser-based text extraction
- **Build**: Vite with SWC for fast compilation
- **Fonts**: Inter + Space Grotesk for modern typography

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
echo "VITE_GROQ_API_KEY=your_groq_api_key_here" > .env
```

3. Start development server:
```bash
npm run dev
```

4. Visit `http://localhost:5173` to see the app in action!

## Routes

- `/` - Landing page with features showcase
- `/chat` - Chat interface for PDF analysis

## Project Structure

```
src/
├── components/          # React components
│   ├── LandingPage.tsx  # Homepage with aesthetic elements
│   └── Chat.tsx         # Chat interface (fully responsive)
├── services/            # API integrations
│   ├── groqService.ts   # AI chat functionality
│   └── pdfService.ts    # PDF text extraction
├── types/               # TypeScript type definitions
├── utils/               # Utility functions & markdown parser
└── constants/           # Theme and configuration
```

## Key Features Implemented

✅ **Responsive Design** - Mobile-first approach with perfect scaling  
✅ **URL Routing** - Clean `/chat` route navigation  
✅ **Aesthetic Elements** - Beautiful dotted lines, diagonal elements, and animations  
✅ **PDF Text Extraction** - Real browser-based PDF processing  
✅ **AI Integration** - Contextual conversations about document content  
✅ **Modern Typography** - Compact, readable fonts with perfect spacing  
✅ **Glass Effects** - Premium visual effects throughout the interface  
✅ **Button Hover States** - All interactions work perfectly  

## Performance Optimizations

- ⚡ Optimized bundle splitting
- 🗜️ Terser minification
- 🧹 Cleaned up 70+ unused dependencies
- 📦 Minimal build size with maximum functionality

---

Built with ❤️ using modern web technologies. Perfect for document analysis workflows!