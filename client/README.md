# Movie Management Application

A modern, full-featured movie management application built with React, TypeScript, and Vite. This application provides a comprehensive solution for browsing, searching, managing, and organizing movies with advanced features like infinite scroll, favorites management, and real-time search.

## 🎬 Features

### Core Functionality
- **Movie Browsing**: Browse through an extensive collection of movies with infinite scroll
- **Advanced Search**: Real-time search with debounced input and instant results
- **Movie Management**: Add, edit, and delete movies with form validation
- **Favorites System**: Save and manage your favorite movies with Redux state management
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Advanced Features
- **Infinite Scroll**: Seamless pagination for both regular listings and search results
- **Real-time Search**: Instant search results with debounced API calls
- **Form Validation**: Comprehensive validation using Zod schemas
- **State Management**: Redux Toolkit for favorites, React Query for server state
- **Type Safety**: Full TypeScript implementation with strict typing
- **Testing Suite**: Comprehensive test coverage with Vitest and React Testing Library

### UI/UX Features
- **Modern Design**: Clean, intuitive interface using Material-UI components
- **Loading States**: Smooth loading indicators and skeleton screens
- **Error Handling**: Graceful error states with user-friendly messages
- **Accessibility**: ARIA-compliant components with keyboard navigation
- **Autocomplete**: Smart genre selection with custom autocomplete component

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_BET_BASE_URL=http://localhost:3000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── api/                    # API service layer
│   ├── apiService.ts      # HTTP client and request handling
│   └── apiService.test.ts # API service tests
├── components/            # Reusable UI components
│   ├── autocomplete/      # Custom autocomplete component
│   ├── button/           # Button components
│   ├── header/           # Application header
│   ├── input/            # Input field components
│   ├── loader/           # Loading indicators
│   ├── movie-card/       # Movie card component
│   ├── movie-grid/       # Movie grid layout
│   ├── popup/            # Modal/popup components
│   ├── search/           # Search functionality
│   └── typography/       # Typography components
├── context/              # React Context providers
│   ├── SearchContext.tsx # Search state management
│   └── FavoritesViewContext.tsx # Favorites view context
├── hooks/                # Custom React hooks
│   ├── useMovies.ts      # Movie data fetching
│   ├── useSearchMovies.ts # Search functionality
│   ├── useInfiniteScroll.ts # Infinite scroll logic
│   ├── useDebounce.ts    # Debounced input handling
│   └── useEditMovie.ts   # Movie editing operations
├── interfaces/           # TypeScript type definitions
├── movies/              # Movie-related components
│   ├── add-movie/       # Add movie functionality
│   ├── edit-movie/      # Edit movie functionality
│   └── delete-movie/    # Delete movie functionality
├── store/               # Redux store configuration
│   ├── index.ts         # Store setup
│   ├── favoritesSlice.ts # Favorites state management
│   └── hooks.ts         # Typed Redux hooks
├── validation/          # Form validation schemas
└── utils/               # Utility functions
```

## 🛠️ Technology Stack

### Frontend Framework
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### State Management
- **Redux Toolkit** - Global state management for favorites
- **React Query (TanStack Query)** - Server state management and caching
- **React Context** - Local state management for search

### UI Components
- **Material-UI (MUI)** - Component library
- **Styled Components** - CSS-in-JS styling
- **Emotion** - CSS-in-JS runtime

### Form Handling
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Testing
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **Jest DOM** - DOM testing utilities

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run preview      # Preview production build

# Building
npm run build        # Build for production

# Testing
npm test             # Run tests in watch mode
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint         # Run ESLint
```

## 🎯 Key Features Explained

### Infinite Scroll
The application implements infinite scroll for both regular movie listings and search results. When users scroll to the bottom, additional movies are automatically loaded.

**Features:**
- Automatic loading when scrolling to bottom
- Loading indicators with descriptive text
- End-of-content messages
- Desktop optimization for pages with insufficient height
- Responsive design across all devices

### Real-time Search
Advanced search functionality with debounced API calls to prevent excessive server requests.

**Features:**
- Instant search results
- Debounced input (300ms delay)
- Search across movie titles, genres, and directors
- Maintains search context during infinite scroll
- Clear search functionality

### Favorites Management
Redux-powered favorites system with persistent state management.

**Features:**
- Add/remove movies to favorites
- Favorites counter in header
- Dedicated favorites view
- Toggle functionality with visual feedback
- State persistence across sessions

### Movie Management
Complete CRUD operations for movie management with form validation.

**Features:**
- Add new movies with validation
- Edit existing movies with change detection
- Delete movies with confirmation
- Form validation using Zod schemas
- Optimistic updates with React Query

## 🧪 Testing

The application includes comprehensive testing with over 150+ tests covering:

### Test Coverage
- **Components**: MovieCard, MovieGrid, Search, Header
- **Hooks**: useDebounce, useInfiniteScroll, useMovies
- **Context**: SearchContext
- **API**: ApiService
- **Integration**: Home component

### Running Tests
```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Test Structure
- **Unit Tests**: Individual component and hook testing
- **Integration Tests**: Component interaction testing
- **API Tests**: Service layer testing
- **Accessibility Tests**: ARIA compliance and keyboard navigation

## 🎨 Styling and Design

### Design System
- **Material-UI**: Primary component library
- **Styled Components**: Custom styling
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliance

### Theme
- **Color Palette**: Consistent color scheme
- **Typography**: Hierarchical text system
- **Spacing**: 8px grid system
- **Components**: Reusable design patterns

## 🔌 API Integration

### API Service
The application uses a custom API service built with XMLHttpRequest for maximum compatibility.

**Features:**
- Support for all HTTP methods (GET, POST, PUT, DELETE)
- Query parameter handling
- FormData support
- Custom headers
- Error handling
- Response parsing

### Endpoints
- `GET /movies` - Fetch movies with pagination
- `GET /movies/search` - Search movies
- `POST /movies` - Add new movie
- `PUT /movies/:id` - Update movie
- `DELETE /movies/:id` - Delete movie

## 🚀 Performance Optimizations

### React Query Caching
- **Stale Time**: 5 minutes for cached data
- **Garbage Collection**: 10 minutes for unused data
- **Background Refetching**: Automatic data updates
- **Optimistic Updates**: Immediate UI feedback

### Code Splitting
- **Route-based splitting**: Lazy loading of components
- **Component splitting**: Dynamic imports for heavy components
- **Bundle optimization**: Tree shaking and minification

### Infinite Scroll Optimization
- **Debounced scroll events**: Prevents excessive function calls
- **Resize throttling**: Optimized window resize handling
- **Memory management**: Proper cleanup of event listeners

## 🔒 Security

### Input Validation
- **Client-side validation**: Zod schemas for form validation
- **Server-side validation**: API-level validation
- **XSS Prevention**: Proper input sanitization
- **CSRF Protection**: Token-based protection

### Environment Variables
- **API URLs**: Configurable base URLs
- **Feature flags**: Environment-based feature toggles
- **Debug modes**: Development-only features

## 📱 Browser Support

### Supported Browsers
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Polyfills
- **Intersection Observer**: For infinite scroll
- **Resize Observer**: For responsive design
- **Custom Event**: For component communication

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

### Code Standards
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Conventional Commits**: Commit message format

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Documentation
- **Testing Guide**: `TESTING_GUIDE.md`
- **Infinite Scroll**: `INFINITE_SCROLL.md`
- **Redux Favorites**: `REDUX_FAVORITES.md`

### Common Issues
- **Build Issues**: Check Node.js version and dependencies
- **API Issues**: Verify environment variables and API endpoints
- **Test Failures**: Ensure all dependencies are installed

### Getting Help
- Check existing documentation
- Review test files for usage examples
- Open an issue with detailed information

---

**Built with ❤️ using React, TypeScript, and Vite**
