# Backend API for Internal Communication Platform

## Database and Authentication Setup

### MongoDB Atlas Setup

1. Create a free MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier is sufficient)
3. Set up database access:
   - Create a database user with password authentication
   - Add your IP address to the IP access list or allow access from anywhere for development
4. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<dbname>` with your credentials and database name

### Clerk Authentication Setup

1. Create a Clerk account at [https://clerk.dev](https://clerk.dev)
2. Create a new application
3. Configure your application:
   - Set up the authentication methods you want to support
   - Configure the user profile fields
4. Get your API keys:
   - Go to the API Keys section
   - Copy the Secret Key
5. Set up webhooks:
   - Go to the Webhooks section
   - Create a new webhook endpoint with URL: `https://your-api-url/auth/webhook`
   - Select events: `user.created`, `user.updated`, `user.deleted`
   - Copy the Signing Secret

### Environment Configuration

1. Update the `.env` file with your MongoDB Atlas connection string and Clerk API keys:

```
# MongoDB Atlas Connection
DATABASE_URL="mongodb+srv://username:password@cluster0.mongodb.net/internal-comms?retryWrites=true&w=majority"

# Clerk Authentication
CLERK_SECRET_KEY="your_clerk_secret_key"
CLERK_WEBHOOK_SECRET="your_clerk_webhook_secret"

# JWT for internal auth
JWT_SECRET="your_jwt_secret_key"
JWT_EXPIRATION="1d"

# Server
PORT=3001
NODE_ENV=development
```

### Database Initialization

Run the following commands to initialize the database:

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Seed database with initial data
npm run prisma:seed

# Or run all at once
npm run db:setup
```

## Development

```bash
# Start development server
npm run dev
```
