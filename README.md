# Project Title: Marenne Books - Online Bookstore

## Description

Marenne Books is an e-commerce web application focused on delivering a seamless and engaging online book shopping experience. Users can explore and browse book collections, search for specific titles, add items to a shopping cart, and create personal accounts through a well-organized and appealing interface.

## Features

- Personalized Home Page Experience: the main screen presents multiple discovery areas such as new releases, best sellers, and dynamic recommended books tailored to the logged user’s preferred genres. Each collection can also be explored on its own dedicated page for deeper browsing.

- Books & Magazines Catalog: users can access a general listing of items and filter results by selecting a genre. This makes it easy to narrow large collections and quickly find relevant titles.

- Detailed Products: every book or magazine has an individual page containing essential information like author, publisher, number of pages, publishing year, ISBN, and additional metadata. The details are followed by a description and a list of similar items, generated using shared genres with the current selection.

- Search System: every book or magazine has an individual page containing essential information like author, publisher, page count, publishing year, ISBN, and additional metadata. The details are followed by a description and a list of similar items, generated using shared genres with the current selection.

- Persistent Cart: while typing in the search input, users instantly receive suggestions and partial matches. They can also open a separate results page to view the complete list corresponding to their query, making searches both fast and comprehensive.

- Authentication: login and registration are powered by `Firebase`. During account creation, each user is required to select at least two favorite genres, which are later used to personalize recommendations and browsing.

- Additionals for Logged Users: once authenticated, users gain access to a profile modal where they can see personal data and edit their username and update preferred genres. Similar to the cart, the wishlist can be toggled from anywhere in the app. Users can save or remove favorite items, and the list is stored per account.

- Informational Pages: the platform also includes standard sections such as Newsletter, FAQ, and About Us, helping users understand the brand, stay informed, and find support.

## [Demo](https://marenne.vercel.app/)

## Technologies & Dependencies

- Next.js
- React
- Tailwind
- Firebase (authentication & database)
- Open Library API (book data & covers)

## Architecture

Marenne Books follows a modern React and Next.js architecture that balances performance, scalability, and maintainability.

- Application Structure: the project uses the App Router pattern, separating server components (data fetching, static & dynamic rendering) from client components (interactive UI, user actions). This hybrid approach enables fast initial loads while still supporting rich interactivity.

- State Management: global state is managed using React Context, allowing shared access to: authenticated user information, user profile data and preferences, shopping cart visibility and contents, wishlist state, UI elements such as modals and overlays. This avoids prop drilling and keeps updates predictable across distant parts of the interface.

- Authentication & Database: using `Firebase`, users can register and log in using email/password. Each account stores a profile document containing username, preferred genres, and wishlist items. Firestore security rules ensure users can only read or modify their own data.

- Performance Considerations: server rendering is used whenever possible, optimized images are delivered through Next.js., components are conditionally hydrated only when interactivity is required.

- Responsive Design: the interface is built with a mobile-first philosophy using Tailwind CSS. Layouts adapt fluidly between small and large screens, ensuring readability and usability everywhere.

## Getting Started

### 1. Clone the repository

```bash
https://github.com/Balteanu-Sara/Marenne.git
```

### 2. Install dependencies

Make sure you have Node.js installed (recommended version: 18+).

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file and include your Firebase credentials.
Example:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 4. Start the development server

```bash
npm run dev
```

The app will run at: **http://localhost:3000**
