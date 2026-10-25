import { defineProject } from './schema'

export default defineProject({
  title: 'University Library System',
  description: 'A university library system built in Java, with different borrowing rules for each type of user and no database behind it.',
  tags: ['Java', 'OOP', 'JUnit', 'File I/O'],
  link: 'https://github.com/omorros/UniversityLibrarySystem',
  slug: 'university-library-system',
  lastModified: '2026-08-16',
  category: 'personal',
  year: '2025',
  caseStudy: {
    challenge: 'The module asked for a full library system with different rules for each type of user, students, children, and adults, built without a database.',
    approach: 'I designed it as a Java MVC app where books and users share common base classes, borrowing limits are enforced per role, and everything saves to CSV files through a loader I wrote myself.',
    features: [
      { title: 'Classic MVC Design', description: 'Books and users share abstract base classes, and every screen talks to the model through a controller.' },
      { title: 'Different Rules Per Role', description: 'Adults can borrow ten items, children three, and the system enforces it, suspensions included.' },
      { title: 'No Database Needed', description: 'Everything saves to CSV files through a loader I wrote myself.' },
      { title: 'Properly Tested', description: 'JUnit tests cover the core logic, and end-to-end tests walk the full user flows.' }
    ],
    reportUrl: '/reports/university-library-report.pdf',
    screenshots: [
      '/images/university-library/ui.jpg'
    ],
    awards: [
      {
        title: 'Distinction Grade (80%)',
        description: 'Marked at 80 percent, a First-Class grade, for the architecture, the clean code, and the documentation.'
      }
    ],
    tables: [
      {
        title: 'Class Hierarchy',
        headers: ['Base Class', 'Subclasses', 'Key Responsibilities'],
        rows: [
          ['Product (Abstract)', 'Book, CD, DVD, Audiobook', 'Stores metadata (ISBN, Title), manages loan status'],
          ['User (Abstract)', 'Student, ChildUser, AdultUser', 'Manages personal info, active loans, and permissions'],
          ['Loan', 'N/A', 'Links Users to Products, tracks due dates and fines']
        ]
      },
      {
        title: 'Testing Verification',
        headers: ['Test Type', 'Scope', 'Key Scenarios Verified'],
        rows: [
          ['Functional', 'End-to-End User Flows', 'Login, Product Visibility (DVDs hidden for Students), Error Handling'],
          ['Unit (JUnit)', 'Core Business Logic', 'Borrowing Limits (10/5/3), Guardian Assignment, ID Uniqueness'],
          ['Regression', 'Bug Fix Verification', 'Loan state consistency between Controller and User classes']
        ]
      }
    ]
  }
})
