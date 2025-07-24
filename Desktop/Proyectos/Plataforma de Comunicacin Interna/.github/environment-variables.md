# Environment Variables and Secrets

This document outlines the environment variables and secrets that need to be configured for the CI/CD pipeline and deployment.

## GitHub Secrets

The following secrets need to be added to the GitHub repository settings:

### Vercel Deployment (Frontend)

- `VERCEL_TOKEN`: API token from Vercel
- `VERCEL_ORG_ID`: Organization ID from Vercel
- `VERCEL_PROJECT_ID_FRONTEND`: Project ID for the frontend from Vercel

### Railway Deployment (Backend)

- `RAILWAY_TOKEN`: API token from Railway
- `RAILWAY_PROJECT_ID`: Project ID for the backend from Railway

### Notifications

- `SLACK_WEBHOOK`: Webhook URL for Slack notifications

## Environment Variables

### Frontend Environment Variables

Create a `.env.local` file in the frontend directory with the following variables:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
NEXT_PUBLIC_SOCKET_URL=https://your-backend-url.railway.app
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

These variables should also be added to the Vercel project settings for production deployment.

### Backend Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
PORT=3001
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
FRONTEND_URL=https://your-frontend-url.vercel.app
```

These variables should also be added to the Railway project settings for production deployment.

## Setting Up Environment Variables in CI/CD

1. For local development, use the `.env.local` and `.env` files
2. For Vercel deployment, add the environment variables in the Vercel project settings
3. For Railway deployment, add the environment variables in the Railway project settings
4. For GitHub Actions, add the secrets in the GitHub repository settings
