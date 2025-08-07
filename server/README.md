# Movies API Server

A Node.js/Express server with PostgreSQL database using Prisma ORM for managing movies.

## Features

- RESTful API for movies CRUD operations
- PostgreSQL database with Prisma ORM
- TypeScript support
- CORS enabled
- Type-safe database operations

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory with:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/movies_db"
   PORT=3001
   ```

3. **Set up the database:**
   ```bash
   # Push the schema to your database (creates tables)
   npm run db:push
   
   # Or use migrations (recommended for production)
   npm run db:migrate
   ```

4. **Generate Prisma client:**
   ```bash
   npm run db:generate
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript code
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and apply database migrations
- `npm run db:studio` - Open Prisma Studio (database GUI)

## API Endpoints

- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Create a new movie
- `PUT /api/movies/:id` - Update a movie
- `DELETE /api/movies/:id` - Delete a movie

## Movie Schema

```typescript
interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
}
```

## Database Schema

The database includes a `movies` table with:
- `id` (Primary Key, Auto-increment)
- `title` (String, Required)
- `director` (String, Required)
- `year` (Integer, Required)
- `created_at` (Timestamp, Auto-generated)
- `updated_at` (Timestamp, Auto-updated)

## Why Prisma?

Instead of raw SQL queries, this project uses Prisma ORM which provides:
- Type-safe database operations
- Auto-completion and IntelliSense
- Automatic query optimization
- Database migrations
- Schema validation
- Much cleaner and maintainable code 