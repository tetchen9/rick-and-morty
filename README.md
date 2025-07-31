# Rick and Morty Characters App

This project lets a user browse a list of characters appearing in Rick and Morty series, the data comes from an open Rick and Morty GraphQL API (`https://rickandmortyapi.com/graphql`).

Built with `TypeScript` and `Next.js`. Uses `Chakra UI` as a components library.

## Features

### Core Functionality

The app allows to browse through all Rick and Morty characters using pagination.

&nbsp;
<img width="807" height="609" alt="image" src="https://github.com/user-attachments/assets/ec16cfa7-9fad-426e-a29c-93b720cb7c94" />
&nbsp;

Each character has detailed information, including location, species, origin and a list of episodes where he appeared.

&nbsp;
<img width="807" alt="image" src="https://github.com/user-attachments/assets/a2f69164-08f4-4567-9dc3-1e8737441041" />
&nbsp;

The user of the app can create and edit their profile with name and job title.

### User Experience

The app has a responsive interface that works on mobile, tablet and desktop devices. The app is accessible, fully navigable by keyboard only users. Both dark and light themes are supported based on the user's browser preferences.
While the data is being loaded, skeleton components are used as placeholders for data.
There's error handling for failed API call, attempts to access pages outside of the pages range and redirection to home page from 404 page.

## Implementation Details

The app is built with `Next.js App Router`, uses `Apollo Client` for efficient data fetching. The interface is built with `Chakra UI` v3.

### State Management

- `React Context API` is used for a custom user context for authentication and profile management.
- `Apollo client` is used for `GraphQL` state management with caching and optimistic updates.
- `sessionStorage` is used for navigation state.
- `localStorage` is used for storing user data.

### Testing and Code quality

Unit tests are written with `Vitest` and `Testing Library` (the coverage is unsufficient at the moment, fuller coverage was descoped to meet time boundaries).
Code linting and style enforcement is done with the help of ESlint, with a typescript plugin.

### Performance Optimizations

- Automatic code splitting with `Next.js`
- Images optimization with `Next.js`
- `Apollo Client` caching for `GraphQL queries`
- Suspense boundaries for better loading experience

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/tetchen9/rick-and-morty.git
   cd rick-and-morty
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Run the development server

   ```bash
   npm run dev
   ```

4. Open your browser
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run test suite

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── characters/       # Character listing pages
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page with user form
├── components/           # Reusable React components
│   └──ui/                # Base UI components
├── context/              # React Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries (Apollo Client)
├── queries/              # GraphQL queries
├── test-utils/           # Testing utilities and mocks
└── types/                # TypeScript type definitions
```

## Configuration

### Environment Variables

- `NEXT_PUBLIC_VERSION`: App version (auto-injected from package.json)

### Build Configuration

- Next.js configuration in `next.config.ts`
- TypeScript configuration in `tsconfig.json`
- Vitest configuration in `vitest.config.mts`

## Deployment

The project is deployed with Vercel at
`https://rick-and-morty-levandovska.vercel.app/`
