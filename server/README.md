# Movie API Server

A comprehensive RESTful API for managing movies with external API integration. Built with Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL.

## 🚀 Features

### Core Functionality
- **CRUD Operations** - Complete Create, Read, Update, Delete operations
- **Advanced Search** - Intelligent search with relevance filtering
- **External API Integration** - OMDb API integration for additional movie data
- **Soft Delete** - Mark movies as deleted without database removal
- **Title Existence Check** - Verify movie titles across database and external sources
- **Duplicate Prevention** - Smart filtering to prevent duplicate entries

### Database Features
- **PostgreSQL Database** - Production-ready AWS RDS integration
- **Prisma ORM** - Type-safe database operations and migrations
- **Soft Delete System** - Movies marked as deleted are automatically filtered
- **Pagination Support** - Efficient page-based data retrieval
- **Data Validation** - Comprehensive input validation and sanitization

### External API Integration
- **OMDb API Integration** - Fetch movie data from Open Movie Database
- **Error Handling** - Graceful fallback when external services are unavailable
- **Rate Limit Handling** - Automatic empty array return when API limits are reached
- **Random Movie Fetching** - Dynamic content population from external sources

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
- OMDb API key (optional, graceful degradation when unavailable)

## 🚀 Installation & Setup

### 1. Clone and Install
   ```bash
git clone <repository-url>
cd server
   npm install
   ```

### 2. Environment Configuration
Create `.env` file:
   ```env
   PORT=3001
DATABASE_URL="postgresql://username:password@host:port/database"
OMDB_API_KEY=your_omdb_api_key_here
   ```

### 3. Database Setup
   ```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Start Server
   ```bash
   npm run dev
   ```

## 📚 API Endpoints

### Movies Management

#### Get All Movies
```http
GET /api/movies?page={pageNumber}
```

**Example Response:**
```json
[
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
]
```

#### Search Movies
```http
GET /api/movies/search?query={searchTerm}
```

**Features:**
- Case-insensitive search
- Exact match prioritization
- Multi-word phrase matching
- Duplicate prevention between database and external API
- Relevance-based results

#### Get Movie by ID
```http
GET /api/movies/{id}
```

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

**Behavior:**
- **Database Movies**: Soft delete (marks as deleted)
- **External Movies**: Requires movie data in request body

## 🗄️ Database Schema

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

**Field Descriptions:**
- `id`: Unique identifier (positive for database, 10-digit random for external)
- `title`: Movie title
- `director`: Movie director
- `year`: Release year (string format)
- `genre`: Movie genre
- `runtime`: Movie runtime
- `img`: Optional poster image URL
- `action`: Status field (null = active, "deleted" = soft deleted)

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 3001)
- `DATABASE_URL`: PostgreSQL connection string
- `OMDB_API_KEY`: OMDb API key (optional, graceful degradation)

### Pagination
- Default page size: 12 movies per page
- Page numbers start from 0
- Invalid page numbers return error

### Search Features
- **Exact Match**: Highest priority
- **Starts With**: Second priority
- **Contains**: Third priority
- **Phrase Matching**: Intelligent multi-word query handling
- **Duplicate Prevention**: Filters existing database titles from external results

## 🚨 Error Handling

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
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
- **Movie Search**: Find movies by title with detailed information
- **Random Movie Fetching**: Populate additional content
- **Graceful Degradation**: Returns empty arrays when API is unavailable
- **Rate Limit Handling**: Automatic fallback behavior

### Fallback Behavior
When OMDb API is unavailable:
1. Returns empty array instead of fallback data
2. Logs errors for monitoring
3. Continues normal operation with database-only results

## 📁 Project Architecture

```
server/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── config/                # Configuration files
│   ├── controllers/
│   │   └── movies.controller.ts    # Request handlers
│   ├── services/
│   │   ├── movies.service.ts       # Business logic
│   │   └── omdb.service.ts         # External API service
│   ├── repositories/
│   │   └── movie.repository.ts     # Database operations
│   ├── routes/
│   │   └── movies.routes.ts        # API routes
│   ├── models/
│   │   ├── Movie.interface.ts      # Core interfaces
│   │   └── ExternalMovie/
│   │       └── OMDB.interface.ts   # External API interfaces
│   ├── utils/
│   │   └── movieUtils.ts           # Utility functions
│   ├── db/
│   │   └── prisma.ts              # Prisma client
│   ├── middlewares/
│   │   └── cors.middleware.ts      # CORS middleware
│   └── index.ts                    # Server entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testing Examples

### Basic Operations
```bash
# Get all movies (page 0)
curl http://localhost:3001/api/movies

# Search for movies
curl "http://localhost:3001/api/movies/search?query=batman"

# Check title existence
curl "http://localhost:3001/api/movies/check-title?title=The%20Batman"

# Add movie
curl -X POST -H "Content-Type: application/json" \
  -d '{"title":"Test Movie","director":"Test Director","year":"2024","genre":"Action","runtime":"120 min"}' \
  http://localhost:3001/api/movies

# Update movie
curl -X PUT -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}' \
  http://localhost:3001/api/movies/1

# Delete movie
curl -X DELETE http://localhost:3001/api/movies/1
```

## 🚀 Deployment

### AWS RDS Setup
1. Create PostgreSQL RDS instance
2. Configure security groups for database access
3. Update `DATABASE_URL` in environment variables
4. Run migrations: `npx prisma migrate deploy`

### Production Environment
Ensure environment variables are configured:
- `DATABASE_URL` (required)
- `OMDB_API_KEY` (optional)
- `PORT` (optional, defaults to 3001)

## 🔍 Key Features Explained

### Smart Search System
The search functionality combines database and external API results with intelligent filtering:
- Searches local database first
- Fetches additional results from OMDb API
- Removes duplicates based on title matching
- Filters results by query relevance
- Returns combined, deduplicated results

### Soft Delete System
Movies are never permanently deleted:
- Database movies: Marked with `action: "deleted"`
- External movies: Added to database with `action: "deleted"`
- Deleted movies are automatically filtered from all results
- Enables data recovery and audit trails

### External API Integration
Seamless integration with OMDb API:
- Automatic additional content when database has insufficient data
- Graceful handling of API failures and rate limits
- Consistent data structure between internal and external sources
- No fallback data - returns empty arrays when API unavailable

### Data Architecture
- **Repository Pattern**: Clean separation of data access logic
- **Service Layer**: Business logic isolation
- **Type Safety**: Full TypeScript coverage with Prisma types
- **Error Handling**: Comprehensive error handling throughout the stack

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with proper TypeScript typing
4. Test all endpoints
5. Submit pull request

## 📄 License

MIT License

## 🆘 Support

For issues:
1. Check logs for error details
2. Verify environment variables
3. Test API endpoints individually
4. Create issue with reproduction steps