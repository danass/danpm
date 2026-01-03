# Daniel Assayag - Product Manager CV

Interactive CV built with Next.js 15, React 19, and Tailwind CSS.

**Live:** [danpm.com](https://danpm.com)

## 🚀 Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## ✨ Features

- 🌐 French & English versions
- ✏️ Edit mode with live preview
- 📊 SQLite database for persistence  
- 🎨 Glassmorphism design
- 📱 Responsive & print-friendly
- 🔍 ATS-optimized (Schema.org markup)

## 📁 Structure

```
app/
  components/     # CV sections (Header, Experience, Skills, etc.)
  contexts/       # React contexts (Language, Edit, Collapse)
  api/            # API routes (save, migrate)
data/
  cv-data.json    # CV content (FR/EN, short/long versions)
  cv.db           # SQLite database
```

## 📝 Editing Content

1. Run `npm run dev`
2. Click the edit icon in the header
3. Edit any text directly
4. Click save to persist changes

## 📄 PDF Export

Press `Cmd+P` (Mac) or `Ctrl+P` and save as PDF.

## 🛠️ Tech Stack

- Next.js 15+ / React 19
- Tailwind CSS
- SQLite (better-sqlite3)
- Lucide Icons
