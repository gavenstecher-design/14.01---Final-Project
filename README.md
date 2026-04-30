# CS208 Full Stack Final Project

# Downtown Donuts Website Redesign

## Overview
This was a full-stack web application for our CS208 final project. We were tasked with creating a website for Downtown Donuts that had a landing page, menu, about page, and a functional comments page. We ahd to o this whiel keeping the website feelign cozy with a modern design. 

## Setup Instructions


1. Clone the repository using the same methods we have used throughout the semester (via GitHub template or clone command).

## run these in the terminal
 
2. Install dependencies: npm install

3. Start the database: sudo service mariadb start

4. Set up the database: sudo mysql -u root -p < ./setup_scripts/create_demo_table.sql

5. Set password: 12345

6. Run the server: npm start

7. Open in browser: http://localhost:3000


## Design Decisions

1. Color Palette
   - Used dark green (#10291D) and gold (#F7C64A) to match the brand guidelines.
   - Warm backgrounds were added to create a cozy feel.

2. Card-Based Layout
   - Menu items, comments, and about sections use card components.
   - This improves readability and creates visual structure.

3. Typography*
   - Montserrat was used for body text to maintain a clean and modern look.
   - Italianno was used for headings to add personality and match the donut shop aesthetic.

## Edge Cases

1. Server/API Unreachable
   - If the database connection fails, the application catches the error and renders a user-friendly message instead of crashing or showing a stack trace.

2. Empty or Whitespace Input
   - The server trims input and checks for empty strings.
   - If invalid, the user sees a clear error message and the comment is not submitted.

3. Extremely Long Input
   - Comments are limited to 500 characters.
   - If exceeded, the server rejects the input and displays an error message.

4. Rapid Double Submission
   - The submit button is disabled immediately after being clicked to prevent duplicate comments.

## Challenges & Learnings

1. Database Connection Issues
   - Encountered errors where the database connection would close unexpectedly.
   - Solved by restarting MariaDB and understanding connection lifecycle.

2. Timezone Handling
   - Timestamps were initially incorrect due to UTC vs local time differences.
   - Fixed using SQL timezone conversion.   

## Features

- Landing page with branding
- Menu page with items and layout
- About page with business information
- Comments system with posting and display
- Server-side validation
- Pagination for comments
- Mobile responsive design
- Links to online ordering services (UberEats and DoorDash)

## Citations

- ChatGPT (OpenAI) was used to help debug issues and guide development
- Google Fonts (Montserrat, Italianno)
- StackOverflow
- MDN Web Docs for HTML, CSS, and JavaScript reference
