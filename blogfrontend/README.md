# MyBlog Frontend

This is the frontend application for the MyBlog platform. It is a single-page application (SPA) built using React and Vite, featuring a modern, responsive user interface with Tailwind CSS.

## Features

- **Modern UI**: Clean, aesthetic, and responsive design built with React 19 and Tailwind CSS 4.
- **State Management**: Efficient global state handling using Zustand.
- **Form Handling**: Robust form validation and management with React Hook Form.
- **Routing**: Seamless client-side routing using React Router 7.
- **Notifications**: Interactive toast notifications for user feedback (React Hot Toast & React Toastify).
- **API Integration**: Simplified and centralized HTTP requests using Axios.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Routing**: React Router
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js (v18+)
- The backend server must be running to provide API data.

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Bundles the app into static files for production.
- `npm run lint`: Runs ESLint to find and fix code issues.
- `npm run preview`: Bootstraps a local static web server to preview the production build.

## Deployment

This application is ready to be deployed on platforms like Vercel or Netlify. A `vercel.json` file is included in the root directory to handle client-side routing rewrites for Vercel deployments.
