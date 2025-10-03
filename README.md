# GiftEase - Digital Gift Card Platform

GiftEase is a modern digital gift card platform built with React and Vite. The application allows users to browse, purchase, and manage digital gift cards for various products and services.

## Features

- Browse gift cards by category
- Secure checkout process
- Order management
- User account management
- Admin dashboard for managing orders and products
- Responsive design for all devices

## Tech Stack

- **Frontend**: React, Vite, React Router
- **Styling**: CSS3 with modern features
- **Build Tool**: Vite
- **Package Manager**: npm

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run preview`

Preview the production build locally.

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```
REACT_APP_API_URL=http://localhost:5003
VITE_API_URL=http://localhost:5003
```

For production deployment, replace the URL with your actual backend API URL.

## Deployment

This project is configured for easy deployment to Vercel with automated CI/CD.

To deploy to Vercel:
1. Push your code to GitHub
2. Import the repository in Vercel
3. Set the environment variables in Vercel dashboard
4. Deploy

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/guide/).

To learn React, check out the [React documentation](https://react.dev/).
