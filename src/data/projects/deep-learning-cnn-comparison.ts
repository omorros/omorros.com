import { defineFlow, defineProject } from './schema'

export default defineProject({
  title: 'CNN Architecture Comparison',
  description: 'Three image classifiers trained the same way on 120,842 fruit and vegetable photos, to pick the one my SnapShelf research would build on.',
  tags: ['Jupyter Notebook', 'Python', 'TensorFlow', 'Deep Learning'],
  link: 'https://github.com/omorros/SnapShelf/tree/main/research/01-cnn-comparison',
  slug: 'deep-learning-cnn-comparison',
  lastModified: '2026-10-25',
  category: 'personal',
  year: '2026',
  caseStudy: {
    story: {
      insight: 'The small model tied the big one at a fifth of the size.',
      facts: [
        { label: 'Stack', value: 'Python, TensorFlow, Keras, scikit-learn, Google Colab' },
        { label: 'Dataset', value: '120,842 images, 14 classes' },
        { label: 'Research', value: 'BSc dissertation, Anglia Ruskin' },
      ],
      context: 'Bigger image models usually score higher, but they cost more to store and run, and on a phone that matters. This was the first of two experiments in my BSc dissertation at Anglia Ruskin, the research behind SnapShelf. Its job was to choose the classifier for the second, where a detector finds each item in a kitchen photo and the classifier names it.',
      flow: defineFlow({
        tones: {
          images: { swatch: 'violet', label: 'Images' },
          splits: { swatch: 'blue', label: 'Splits' },
          scores: { swatch: 'amber', label: 'Test scores' },
        },
        nodes: [
          { id: 'kaggle', label: 'Kaggle datasets', note: 'Three sources, merged', detail: 'fruit and vegetables', live: '163,316 images', tone: 'images', col: 0, row: 1, service: true },
          { id: 'dedup', label: 'Hashing', note: 'Drops every exact copy', detail: 'SHA-256', steps: ['42,474 copies removed', '9,263 across sources'], live: '120,842 unique', tone: 'images', col: 1, row: 1 },
          { id: 'split', label: 'Split', note: 'By class, no copy in two splits', detail: '70/15/15 · class weights', live: '18,141 test images', tone: 'splits', col: 2, row: 1 },
          { id: 'custom', label: 'Custom CNN', note: 'Built from scratch', detail: '4.96M params · 56.9\u00a0MB', live: '98.34%', tone: 'scores', col: 3, row: 0 },
          { id: 'effnet', label: 'Efficient\u00adNetB0', note: 'Pretrained, tuned in two phases', detail: '4.07M params · 40.0\u00a0MB', live: '99.75%', tone: 'scores', col: 3, row: 1 },
          { id: 'resnet', label: 'ResNet\u201150', note: 'Pretrained, tuned in two phases', detail: '24.13M params · 211.0\u00a0MB', live: '99.77%', tone: 'scores', col: 3, row: 2 },
          { id: 'pick', label: 'Choice', note: 'A tie on accuracy, so size decides', detail: 'Wilson 95% intervals', steps: ['intervals overlap', 'smallest model'], live: 'Efficient\u200bNetB0 selected', tone: 'scores', col: 4, row: 1 },
        ],
        edges: [
          ['kaggle', 'dedup'],
          ['dedup', 'split'],
          ['split', 'custom'],
          ['split', 'effnet'],
          ['split', 'resnet'],
          ['custom', 'pick'],
          ['effnet', 'pick'],
          ['resnet', 'pick'],
        ],
        caption: 'Solid boxes are what I built. Dashed ones are the public datasets I started from.',
      }),
      decisions: [
        {
          title: 'Remove duplicates before splitting',
          why: 'The three Kaggle sets overlapped, and a random split would have put copies of training images in the test set and inflated the score. I hashed every file with SHA-256 and removed 42,474 exact duplicates, 9,263 of them across sources, before splitting by class.',
          tradeoff: 'Hashing only catches identical files. Most images are video frames of one fruit turning on a white background, so near-identical frames still sit on both sides of the split, and 99.7% is optimistic.',
        },
        {
          title: 'A bigger test set for the rare classes',
          why: 'Apples outnumbered carrots 113 to 1. I split 70/15/15 instead of the usual 80/10/10, so even the smallest classes had enough validation and test images for a reliable F1 score, and weighted the classes in training to balance them.',
          tradeoff: 'Ten percent of the images moved from training to validation and test. And it is one split with one seed: cross-validation would have been tighter, but it costs five times the compute, too much for a Colab budget.',
        },
        {
          title: 'Pick on size when accuracy ties',
          why: 'ResNet-50 scored 99.77% and EfficientNetB0 99.75% on 18,141 test images, but their Wilson 95% intervals overlap, so the gap is not significant. EfficientNetB0 is 5.3 times smaller, 40 MB against 211 MB, which matters when it has to name every item a detector finds in a photo. The custom CNN, at 98.34%, was significantly behind both.',
          tradeoff: 'ResNet-50 trained faster, 8.1 hours against 11.0. And with most classes perfect for every model, the choice rests on four classes and a few dozen images.',
        },
      ],
      limits: 'A classifier ready for a real kitchen. The 99.75% was measured on clean studio images. In the second experiment, on real kitchen photos, the pipeline that used this model scored F1 0.547, the weakest of the three.',
    },
    tables: [
      {
        title: 'Results on 18,141 test images',
        headers: ['Model', 'Test accuracy', 'Parameters', 'Size', 'Training time'],
        rows: [
          ['Custom CNN', '98.34%', '4.96M', '56.9 MB', 'about 24.8 h'],
          ['EfficientNetB0', '99.75%', '4.07M', '40.0 MB', '10.96 h'],
          ['ResNet-50', '99.77%', '24.13M', '211.0 MB', '8.13 h'],
        ],
      },
    ],
  },
})
