import { defineFlow, defineProject } from './schema'

export default defineProject({
  title: 'University Library System',
  description: 'A console library system in Java where adults, students and children each borrow under their own rules, built for my object-oriented programming module.',
  tags: ['Java', 'OOP', 'JUnit', 'File I/O'],
  link: 'https://github.com/omorros/UniversityLibrarySystem',
  slug: 'university-library-system',
  lastModified: '2026-10-25',
  category: 'personal',
  year: '2025',
  caseStudy: {
    reportUrl: '/reports/university-library-report.pdf',
    screenshots: [
      { src: '/images/university-library-system/class-diagram.jpg', alt: 'Final UML class diagram: LibrarySystem, the abstract User and Product classes with their subclasses, Loan and Policy' },
      { src: '/images/university-library-system/test-folder.jpg', alt: 'The project in IntelliJ, with the seven JUnit test classes in their own test folder' },
      { src: '/images/university-library-system/limit-test-failing.jpg', alt: 'AdultBorrowLimitTest failing: ten borrows print as successful, but the adult holds 0 loans instead of 10' },
      { src: '/images/university-library-system/limit-test-passing.jpg', alt: 'AdultBorrowLimitTest passing after the fix: ten borrows succeed and the next five are refused at the limit' },
    ],
    story: {
      insight: 'The borrower carries the rules, not the front desk.',
      facts: [
        { label: 'Stack', value: 'Java 17, JUnit 4, CSV files, UML' },
        { label: 'Module', value: 'Object-oriented programming' },
        { label: 'Tests', value: '7 unit tests, 17 console tests' },
      ],
      context: 'Coursework for my object-oriented programming module: a console library where adults, students and children borrow books, CDs, DVDs and audiobooks under different limits and loan lengths. There is no database and no graphical interface, in line with the brief, so the work is in the design. The real question is where the rules live. Keep them at the front desk, in one controller that checks who is asking, and every new kind of user means editing it; give each kind of borrower its own class, and the desk never has to ask.',
      flow: defineFlow({
        tones: {
          catalogue: { swatch: 'grey', label: 'Catalogue' },
          request: { swatch: 'blue', label: 'Request' },
          rules: { swatch: 'violet', label: 'Rules' },
          loan: { swatch: 'green', label: 'Loan' },
        },
        nodes: [
          { id: 'csv', label: 'CSV files', note: 'The catalogue, one file per media type', detail: 'books · cds · dvds · audiobooks', tone: 'catalogue', col: 0, row: 0 },
          { id: 'loader', label: 'Data loader', note: 'Turns each line into an object', detail: 'Book · CD · DVD · Audiobook', live: 'Total products: 35', tone: 'catalogue', col: 1, row: 0 },
          { id: 'login', label: 'Login menu', note: 'Pick adult, child or student', detail: 'one demo user per role', live: 'Logged in as Student: Oriol', tone: 'request', col: 0, row: 1 },
          { id: 'menu', label: 'Borrow menu', note: 'Only the categories that role may take', detail: 'student: books, audiobooks', steps: ['category chosen', 'product ID typed in'], tone: 'request', col: 1, row: 1 },
          { id: 'system', label: 'LibrarySystem', note: 'Finds the product, checks it is in', detail: 'controller · findProductById', steps: ['product found', 'not checked out'], tone: 'request', col: 2, row: 1 },
          { id: 'user', label: 'User subclass', note: 'Each role checks its own rules', detail: 'adult 10 · student 5 · child 3', steps: ['under its limit', 'guardian, if a child', 'loan policy chosen'], tone: 'rules', col: 3, row: 1 },
          { id: 'loan', label: 'Loan', note: 'Due date set by the policy', detail: 'LocalDate · reminders', live: 'Borrowed successfully: The Hobbit', tone: 'loan', col: 4, row: 1 },
        ],
        edges: [
          ['csv', 'loader'],
          ['loader', 'system'],
          ['login', 'menu'],
          ['menu', 'system'],
          ['system', 'user'],
          ['user', 'loan'],
        ],
        caption: 'Every box is something I built.',
      }),
      decisions: [
        {
          title: 'Each borrower carries its own rules',
          why: 'AdultUser, Student and ChildUser each override the same borrow method with their own limit of ten, five or three items. Students and children also get their own loan length, and a child cannot borrow without a guardian. LibrarySystem hands every request to whoever is asking and never checks their type. I weighed putting the rules in the controller, or in one method with a branch per user type, and turned both down.',
          tradeoff: 'Which categories each role may see is still decided in the menu, with a type check per role, so that rule sits outside the user classes. The limits are also fixed in code, not read from data.',
        },
        {
          title: 'The loan is made where the borrowing happens',
          why: 'LibrarySystem used to create each loan. A JUnit test that had an adult borrow ten items then found them holding no loans at all, so the limit could never be reached. I moved loan creation into the user\'s own borrow method, which every borrow passes through, whoever starts it.',
          tradeoff: 'Loans now live in two lists, the user\'s and the library\'s, and each borrow and return must update both.',
        },
        {
          title: 'The catalogue lives in CSV files',
          why: 'Books, CDs, DVDs and audiobooks each have their own CSV file, read into objects when the program starts. Adding a title means adding a line, not changing code.',
          tradeoff: 'Nothing is written back, so loans last only until the program closes.',
        },
      ],
    },
    awards: [
      {
        title: 'Distinction Grade (80%)',
        description: 'Marked at 80 percent, a First-Class grade.',
      },
    ],
  },
})
