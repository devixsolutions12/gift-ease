# GiftEase Frontend

This is the frontend for the GiftEase application, a digital gift card marketplace.

## Deployment Information
- Last deployment: {new Date().toISOString()}
- Version: 1.0.0

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

## Troubleshooting Deployment Issues

If you encounter deployment issues, especially with Railway backend deployment:

1. **"No repository found" on Railway**: 
   - Run `CHECK_GITHUB_REPO.bat` to verify repository access
   - Check `RAILWAY_DEPLOYMENT_TROUBLESHOOTING.md` for detailed solutions
   - Try the Railway CLI deployment method using `DEPLOY_TO_RAILWAY_USING_CLI.bat`

2. **GitHub Integration Problems**:
   - Ensure Railway has proper GitHub permissions
   - Consider making your repository temporarily public for deployment

3. **Alternative Deployment**:
   - Use `DEPLOY_TO_RAILWAY_USING_CLI.bat` for direct CLI deployment

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/guide/).

To learn React, check out the [React documentation](https://react.dev/).