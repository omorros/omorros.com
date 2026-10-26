import { defineFlow, defineProject } from './schema'

export default defineProject({
  title: 'SnapShelf',
  description: 'A kitchen inventory app that reads a photo of your shopping, built on my dissertation research into which vision model does that best.',
  tags: ['React Native', 'FastAPI', 'Python', 'Computer Vision'],
  link: 'https://github.com/omorros/SnapShelf',
  slug: 'snapshelf',
  lastModified: '2026-10-25',
  category: 'personal',
  year: '2026',
  caseStudy: {
    thumbnail: { src: '/images/snapshelf/cover.jpg', alt: 'SnapShelf, a food inventory app, showing the pantry list sorted by expiry' },
    cardImage: { src: '/images/snapshelf/cover.jpg', alt: 'SnapShelf, a food inventory app, showing the pantry list sorted by expiry' },
    screenshots: [
      { src: '/images/snapshelf/inventory.jpg', alt: 'SnapShelf inventory sorted by expiry, with expired and expiring-soon counts' },
      { src: '/images/snapshelf/scan.jpg', alt: 'A kitchen counter photo and the items SnapShelf detected in it, each waiting for confirmation' },
      { src: '/images/snapshelf/recipes.jpg', alt: 'Recipe ideas that use the chicken, spinach and tomatoes expiring in the next three days' },
      { src: '/images/snapshelf/recipe-detail.jpg', alt: 'A suggested recipe with each ingredient flagged by how many days it has left' },
    ],
    story: {
      insight: 'Choose the model in the kitchen, not in the lab.',
      facts: [
        { label: 'Stack', value: 'React Native, FastAPI, PostgreSQL, GPT-5.2, YOLOv8, TensorFlow' },
        { label: 'Research', value: 'BSc dissertation, Anglia Ruskin' },
        { label: 'Training data', value: '120,842 images, three public datasets merged' },
        { label: 'Test set', value: '120 kitchen photos I took, on Hugging Face' },
      ],
      context: 'A lot of food waste at home happens because people forget what they have, and inventory apps fail because typing everything in is too much work. SnapShelf swaps the typing for a photo, which only works if the app can read a real photo of real shopping. I started it as a personal project, then took the chance to research that question for my BSc dissertation at Anglia Ruskin. In the first experiment I trained three CNNs on 120,842 images, merged from three public datasets with the duplicates removed. In the second I compared whole pipelines on 120 kitchen photos I took myself. SnapShelf is built on the approach that won.',
      flow: defineFlow({
        modes: {
          photo: { label: 'Photo', note: 'Snap the shopping, and the vision model lists every item in it.' },
          barcode: { label: 'Barcode', note: 'Scan one product, and Open Food Facts names it.' },
        },
        tones: {
          input: { swatch: 'grey' },
          draft: { swatch: 'amber', label: 'Unconfirmed' },
          confirmed: { swatch: 'green', label: 'Confirmed' },
        },
        nodes: [
          { id: 'photo', label: 'Photo', note: 'Your shopping, in one picture', detail: 'Expo · sent at 1024\u00a0px', tone: 'input', col: 0, row: 0, modes: ['photo'] },
          { id: 'barcode', label: 'Barcode', note: 'The phone reads it itself', detail: 'EAN and UPC', tone: 'input', col: 0, row: 2, modes: ['barcode'] },
          { id: 'api', label: 'Backend', note: 'Asks the right service', detail: 'FastAPI', tone: 'input', col: 1, row: 1 },
          { id: 'vlm', label: 'GPT-5.2', note: 'Names each item and its amount', detail: 'OpenAI · JSON · the research pick', live: 'chicken breast · 500 g', tone: 'draft', col: 2, row: 0, service: true, modes: ['photo'] },
          { id: 'off', label: 'Open Food Facts', note: 'Looks up the barcode', detail: 'one item · 100 g unless changed', tone: 'draft', col: 2, row: 2, service: true, modes: ['barcode'] },
          { id: 'expiry', label: 'Expiry', note: 'Tidies each item, then dates it', detail: 'shelf\u2011life table', steps: ['category and unit fixed', 'expiry predicted'], live: 'Expires: 2026\u201111\u201101', tone: 'draft', col: 3, row: 1 },
          { id: 'review', label: 'Review', note: 'Nothing counts until you confirm', detail: 'drafts · one confirm route', steps: ['edit if wrong', 'confirm or skip'], live: 'Item added to inventory!', tone: 'confirmed', col: 4, row: 0 },
          { id: 'inventory', label: 'Inventory', note: 'What goes off first, on top', detail: 'PostgreSQL · confirmed only', live: '4 expiring soon', tone: 'confirmed', col: 4, row: 1 },
          { id: 'recipes', label: 'Recipe ideas', note: 'Built around what expires first', detail: 'OpenAI · gpt\u20114o\u2011mini', live: 'Uses 3 items expiring in the next 3 days', tone: 'confirmed', col: 4, row: 2 },
        ],
        edges: [
          ['photo', 'api'],
          ['barcode', 'api'],
          ['api', 'vlm'],
          ['api', 'off'],
          ['vlm', 'expiry'],
          ['off', 'expiry'],
          ['expiry', 'review'],
          ['review', 'inventory'],
          ['inventory', 'recipes'],
        ],
        caption: 'Solid boxes are what I built. Dashed ones are outside services.',
      }),
      decisions: [
        {
          title: 'Test the approaches before building on one',
          why: 'The plan was one custom CNN. Vision-language models improved so fast while I read the literature that the better question became which approach to build on at all. So I compared three pipelines on 120 photos I took and labelled in a real home: GPT-5.2, a YOLOv8 detector trained on 14 kinds of produce, and YOLO finding each item with a CNN naming it: EfficientNetB0, the best of the three CNNs from the first experiment. Each photo was also blurred, noised and JPEG-damaged.',
          tradeoff: 'A small test: 120 photos from one home and one phone, all taken and labelled by me. My YOLO baseline was also undertrained, so its score sits below what YOLOv8 usually reaches.',
        },
        {
          title: 'Accuracy over speed and offline use',
          why: 'GPT-5.2 came first on clean, blurred, noisy and compressed photos. On clean ones it scored F1 0.900, against 0.603 for YOLO and 0.547 for YOLO with the CNN, and damage cost it at most 0.034, against 0.350 for YOLO. Gemini 3.1 Pro scored 0.004 higher but was 2.4 times slower and 2.7 times dearer, so SnapShelf runs GPT-5.2.',
          tradeoff: 'In the tests a photo took 2.3 to 10.7 seconds and about $0.004, and it needs a network; YOLO was 10 to 50 times faster and runs offline. The scores also cover only 14 kinds of produce, while the app asks about any food.',
        },
        {
          title: 'Nothing counts until you confirm it',
          why: 'Even the winner miscounts: all 126 of its false positives on clean photos were grapes, counted one by one where my labels counted the bunch. So whatever a photo or a barcode returns lands in a review list as a draft, and the only way into the inventory is a confirm step that needs every field filled in.',
          tradeoff: 'Every scan ends with a review, a little of the typing the app exists to remove. Add All confirms a whole photo in one tap.',
        },
      ],
    },
    tables: [
      {
        title: 'Results on 120 kitchen photos',
        headers: ['Pipeline', 'F1, clean photos', 'Worst drop when damaged', 'Time per photo'],
        rows: [
          ['GPT-5.2', '0.900', '0.034', '2.3 to 10.7 s'],
          ['YOLOv8s, 14 classes', '0.603', '0.350', '0.2 to 0.5 s'],
          ['YOLOv8s + EfficientNetB0', '0.547', '0.180', '0.9 to 1.3 s'],
        ],
      },
    ],
  },
})
