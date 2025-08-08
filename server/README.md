# Movie API Server

A comprehensive RESTful API for managing movies with integration to external movie databases (OMDb API). Built with Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL.

## 🚀 Features

### Core Functionality
- **CRUD Operations** - Create, Read, Update, Delete movies
- **Pagination Support** - Get movies with page-based pagination
- **Advanced Search** - Search movies with intelligent filtering and relevance scoring
- **External API Integration** - Fetch additional movies from OMDb API
- **Soft Delete** - Mark movies as deleted without removing from database
- **Title Existence Check** - Check if a movie title exists in database or external API
- **Duplicate Prevention** - Smart filtering to avoid duplicate movies between database and external API

### Database Features
- **PostgreSQL Database** - AWS RDS integration
- **Prisma ORM** - Type-safe database operations
- **Migration Support** - Database schema versioning
- **Soft Delete** - Movies marked as deleted are filtered out from results

### External API Integration
- **OMDb API Integration** - Fetch movie data from Open Movie Database
- **Fallback Mechanism** - Graceful handling when external API is unavailable
- **Random Movie Fetching** - Get random popular movies to fill results
- **Error Handling** - Robust error handling with fallback data

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (AWS RDS)
- **ORM**: Prisma
- **External API**: OMDb API
- **HTTP Client**: Axios

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database (AWS RDS or local)
- OMDb API key (optional, fallback data available)

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
PORT=3001
DATABASE_URL="postgresql://username:password@host:port/database"
OMDB_API_KEY=your_omdb_api_key_here
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init
```

### 5. Start the server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📚 API Endpoints

### Movies

#### Get All Movies (with pagination)
```http
GET /api/movies?page={pageNumber}
```

**Response:**
```json
{
  "movies": [
    {
      "id": 1,
      "title": "Movie Title",
      "director": "Director Name",
      "year": "2024",
      "genre": "Action",
      "runtime": "120 min",
      "img": "https://example.com/poster.jpg",
      "action": null,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "totalPages": 5,
  "currentPage": 1,
  "totalMovies": 50
}
```

#### Get Movie by ID
```http
GET /api/movies/{id}
```

#### Search Movies
```http
GET /api/movies/search?query={searchTerm}
```

**Features:**
- Case-insensitive search
- Exact match prioritization
- Phrase matching for multi-word queries
- Relevance-based sorting
- Duplicate prevention between database and external API

#### Check Title Existence
```http
GET /api/movies/check-title?title={movieTitle}
```

**Response:**
```json
{
  "exists": true
}
```

#### Add New Movie
```http
POST /api/movies
Content-Type: application/json

{
  "title": "Movie Title",
  "director": "Director Name",
  "year": "2024",
  "genre": "Action",
  "runtime": "120 min",
  "img": "https://example.com/poster.jpg"
}
```

#### Update Movie
```http
PUT /api/movies/{id}
Content-Type: application/json

{
  "title": "Updated Title",
  "director": "Updated Director"
}
```

#### Delete Movie
```http
DELETE /api/movies/{id}
```

**Database Movies:** Soft delete (marks as deleted)
**External Movies:** Requires movie data in request body to add to database with `action: "deleted"`

## 🗄️ Database Schema

### Movie Model
```prisma
model Movie {
  id        Int      @id @default(autoincrement())
  title     String
  director  String
  year      String
  genre     String
  runtime   String
  img       String?
  action    String?
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("movies")
}
```

**Fields:**
- `id`: Unique identifier (positive for database, 10-digit for external)
- `title`: Movie title
- `director`: Movie director
- `year`: Release year (string format)
- `genre`: Movie genre
- `runtime`: Movie runtime
- `img`: Optional poster image URL
- `action`: Status field (null = active, "deleted" = soft deleted)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 3001)
- `DATABASE_URL`: PostgreSQL connection string
- `OMDB_API_KEY`: OMDb API key (optional)

### Pagination
- Default page size: 10 movies per page
- Page numbers start from 1
- Invalid page numbers return error

### Search Features
- **Exact Match**: Highest priority
- **Starts With**: Second priority
- **Contains**: Third priority
- **Phrase Matching**: Smart handling of multi-word queries
- **Duplicate Prevention**: Filters out movies that already exist in database

## 🚨 Error Handling

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request (invalid input)
- `404`: Not Found
- `500`: Internal Server Error

### Error Response Format
```json
{
  "message": "Error description"
}
```

## 🔄 External API Integration

### OMDb API Features
- **Search Movies**: Find movies by title
- **Random Movies**: Fetch popular movies for filling results
- **Fallback Data**: Curated movie list when API is unavailable
- **Error Handling**: Graceful degradation when API fails

### Fallback Mechanism
When OMDb API is unavailable or reaches rate limits:
1. Logs error for debugging
2. Uses curated fallback movie list
3. Continues serving requests without interruption

## 🧪 Testing

### Manual Testing Examples

#### Get all movies (page 1)
```bash
curl http://localhost:3001/api/movies?page=1
```

#### Search for movies
```bash
curl "http://localhost:3001/api/movies/search?query=batman"
```

#### Check if title exists
```bash
curl "http://localhost:3001/api/movies/check-title?title=The%20Batman"
```

#### Add a new movie
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"title":"Test Movie","director":"Test Director","year":"2024","genre":"Action","runtime":"120 min"}' \
  http://localhost:3001/api/movies
```

#### Delete a movie
```bash
curl -X DELETE http://localhost:3001/api/movies/1
```

## 📁 Project Structure

```
server/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── controllers/
│   │   └── movies.controller.ts    # Request handlers
│   ├── services/
│   │   ├── movies.service.ts       # Business logic
│   │   └── omdb.service.ts         # External API service
│   ├── routes/
│   │   └── movies.routes.ts        # API routes
│   ├── models/
│   │   └── Movie.interface.ts      # TypeScript interfaces
│   ├── db/
│   │   └── prisma.ts              # Prisma client
│   ├── middlewares/
│   │   └── cors.middleware.ts      # CORS middleware
│   └── index.ts                    # Server entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Deployment

### AWS RDS Setup
1. Create PostgreSQL RDS instance
2. Configure security groups
3. Update `DATABASE_URL` in environment
4. Run migrations: `npx prisma migrate deploy`

### Environment Variables
Ensure all required environment variables are set in production:
- `DATABASE_URL`
- `OMDB_API_KEY` (optional)
- `PORT` (optional, defaults to 3001)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the documentation
2. Review error logs
3. Test with provided examples
4. Create an issue with detailed information 