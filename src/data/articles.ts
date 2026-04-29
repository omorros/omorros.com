export interface Article {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  href: string
  thumbnail: string
}

// Placeholder articles - first one will be the "build of this site" piece.
// Replace these with real markdown posts once Phase 2 (chat) is wired and there
// is something to write about.
export const articles: Article[] = [
  {
    slug: 'building-a-rag-portfolio',
    title: 'Building a RAG-Powered Portfolio',
    description: 'Notes on shipping a personal-corpus chatbot - embeddings pipeline, eval suite, the lessons.',
    date: '2026 · in progress',
    readTime: '12 min',
    href: '#articles',
    thumbnail: '/gradients/projects.svg',
  },
  {
    slug: 'cnn-benchmark',
    title: '5.9× Smaller, Same Accuracy',
    description: 'How EfficientNetB0 matched ResNet-50 on 120K food images - and what the parameter count is hiding.',
    date: '2024',
    readTime: '8 min',
    href: 'https://github.com/omorros/deep-learning-cnn-comparison',
    thumbnail: '/gradients/projects.svg',
  },
  {
    slug: 'snapshelf-vision-loop',
    title: 'The Trust-First Vision Loop',
    description: 'Why SnapShelf keeps GPT-4o in a draft staging area - and the UX pattern behind it.',
    date: '2025',
    readTime: '6 min',
    href: 'https://github.com/omorros/SnapShelf',
    thumbnail: '/gradients/projects.svg',
  },
]
