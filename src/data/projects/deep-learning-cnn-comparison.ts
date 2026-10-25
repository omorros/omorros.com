import { defineProject } from './schema'

export default defineProject({
  title: 'CNN Architecture Comparison',
  description: 'Three neural networks compared on 120,000 food photos, showing a small model can match a big one at the same accuracy while being six times smaller.',
  tags: ['Jupyter Notebook', 'Python', 'TensorFlow', 'Deep Learning'],
  link: 'https://github.com/omorros/food-cv-exp1-cnn-comparison',
  slug: 'deep-learning-cnn-comparison',
  lastModified: '2026-08-16',
  category: 'personal',
  year: '2026',
  caseStudy: {
    challenge: 'Bigger models usually win, but they cost more to train and run. I wanted to know how much model you actually need for one specific job, recognising food.',
    approach: 'I trained three architectures on 120,000 food images and compared them. The small one matched the big one at 99.75 percent accuracy while being six times smaller and a third faster to train.',
    features: [
      { title: '120,000 Images, Cleaned', description: 'I merged three Kaggle datasets, removed every duplicate by hashing the files, and split what was left carefully by class.' },
      { title: '99.75 Percent Accuracy', description: 'EfficientNetB0 matched ResNet-50 once both were fine-tuned on the food images.' },
      { title: 'Six Times Smaller', description: 'The winning model is 40 MB against ResNet-50\'s 211 MB, at the same accuracy.' },
      { title: 'Fair to the Rare Classes', description: 'Even classes with 113 times fewer images kept F1 scores above 0.98, thanks to class weighting.' }
    ],
    tables: [
      {
        title: 'Model Performance Comparison',
        headers: ['Model', 'Test Accuracy', 'Parameters', 'Size', 'Training Time'],
        rows: [
          ['Custom CNN', '97.97%', '4.96M', '56.9 MB', '14.8h'],
          ['EfficientNetB0', '99.75%', '4.07M', '40.0 MB', '6.7h'],
          ['ResNet-50', '99.76%', '24.13M', '211.0 MB', '10.3h']
        ]
      },
      {
        title: 'Dataset Specifications',
        headers: ['Property', 'Value'],
        rows: [
          ['Total Images', '120,842 (deduplicated)'],
          ['Classes', '14 (Fruits & Vegetables)'],
          ['Split (Train/Val/Test)', '84,582 / 18,119 / 18,141'],
          ['Resolution', '224×224 RGB']
        ]
      }
    ]
  }
})
