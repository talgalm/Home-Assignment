# Movies API Server

A RESTful API server for managing movies with PostgreSQL database and OMDb integration.

## Features

- **CRUD Operations**: Create, Read, Update, Delete movies
- **PostgreSQL Database**: Persistent storage with Prisma ORM
- **OMDb Integration**: Fetches additional movies from [OMDb API](https://www.omdbapi.com/) when database has fewer than 10 movies
- **Auto-completion**: Always returns at least 10 movies by combining database and external API data

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file with:
   ```
   DATABASE_URL="your_postgresql_connection_string"
   OMDB_API_KEY="your_omdb_api_key"
   PORT=3001
   ```

3. **Get OMDb API Key**:
   - Visit [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
   - Request a free API key
   - Add it to your `.env` file as `OMDB_API_KEY`

4. **Database Setup**:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start Server**:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/movies` - Get all movies (always returns at least 10)
- `GET /api/movies/:id` - Get specific movie
- `POST /api/movies` - Create new movie
- `PUT /api/movies/:id` - Update movie
- `DELETE /api/movies/:id` - Delete movie

## Movie Schema

```typescript
{
  id: number;
  title: string;
  director: string;
  year: string;
  genre: string;
  runtime: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## OMDb Integration

When the database has fewer than 10 movies, the API automatically fetches additional movies from the OMDb API to ensure a minimum of 10 movies are always returned. If the OMDb API is unavailable or the API key is invalid, it falls back to a curated list of popular movies.

## Development

- **Database**: PostgreSQL with Prisma ORM
- **Runtime**: Node.js with TypeScript
- **Server**: Express.js
- **External API**: OMDb API for movie data 