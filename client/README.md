# 🎬 Movies App

A modern, responsive movie management application built with React 19, TypeScript, and Vite. Features include movie browsing, search, favorites management, and full CRUD operations with multilingual support.

## ✨ Features

### Core Functionality
- **Movie Browsing**: Infinite scroll through movie collection
- **Search**: Real-time movie search with debounced input
- **Favorites**: Star/unstar movies and filter by favorites
- **CRUD Operations**: Add, edit, and delete movies with validation
- **Movie Details**: Detailed view for each movie

### User Experience
- **Responsive Design**: Mobile-first responsive layout
- **Internationalization**: Full Hebrew/English support with RTL/LTR
- **Modern UI**: Material-UI components with custom styling
- **Loading States**: Comprehensive loading indicators and error handling
- **Accessibility**: ARIA labels and keyboard navigation

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Form Validation**: React Hook Form with Zod schema validation
- **State Management**: Redux Toolkit + Jotai for optimal state handling
- **Performance**: Debounced search, memoization, infinite scroll
- **Testing**: Comprehensive test suite with Vitest

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd client

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser to http://localhost:5173
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
npm run lint         # Run ESLint
```

## 🏗️ Architecture

### Project Structure

```
src/
├── api/                    # API service layer
├── assets/                 # Static assets
├── components/             # Reusable UI components
│   ├── autocomplete/       # Multi-select autocomplete
│   ├── button/            # Custom button component
│   ├── confirm-dialog/    # Confirmation dialogs
│   ├── header/            # App header with navigation
│   ├── input/             # Form input components
│   ├── language-switcher/ # Language toggle
│   ├── loader/            # Loading components
│   ├── movie-card/        # Movie card display
│   ├── movie-detail/      # Detailed movie view
│   ├── movie-grid/        # Movie grid layout
│   ├── popup/             # Modal popup wrapper
│   ├── search/            # Search input component
│   └── typography/        # Custom typography system
├── context/               # React context providers
├── home/                  # Home page components
├── hooks/                 # Custom React hooks
├── interfaces/            # TypeScript interfaces
├── locales/              # Translation files
├── movies/               # Movie-specific features
│   ├── add-movie/        # Add movie functionality
│   ├── edit-movie/       # Edit movie functionality
│   └── delete-movie/     # Delete movie functionality
├── store/                # State management
├── test/                 # Test utilities and setup
├── theme/                # Theme configuration
├── utils/                # Utility functions
└── validation/           # Form validation schemas
```

### Key Technologies

- **React 19.1.0**: Latest React with modern features
- **TypeScript**: Full type safety and developer experience
- **Vite 7.0.4**: Fast build tool and development server
- **Material-UI 7.x**: Component library with custom theming
- **React Hook Form**: Performant form handling
- **Zod**: Schema validation for forms
- **Redux Toolkit**: State management for favorites
- **Jotai**: Atomic state management for UI state
- **React Query**: Server state management and caching
- **i18next**: Internationalization framework
- **Styled Components/Emotion**: CSS-in-JS styling
- **Vitest**: Modern testing framework

## 🎨 Styling System

### Design Tokens
- **Colors**: Custom color palette with primary gold (#f5c518)
- **Typography**: GeneralTypography component with consistent styling
- **Spacing**: Material-UI spacing system
- **Breakpoints**: Mobile-first responsive design

### Component Library
- **GeneralButton**: Reusable button with multiple variants
- **GeneralInput**: Form input with validation integration
- **GeneralTypography**: Consistent text rendering
- **GeneralSearch**: Search input with icon support

## 🌐 Internationalization

### Supported Languages
- **English (en)**: Left-to-right layout
- **Hebrew (he)**: Right-to-left layout with proper text direction

### Translation Structure
```
locales/
├── en/
│   └── translation.ts     # English translations
└── he/
    └── translation.ts     # Hebrew translations

components/*/
├── Component.lang.en.json # Component-specific English
└── Component.lang.he.json # Component-specific Hebrew
```

### Features
- **Automatic Direction**: RTL/LTR layout switching
- **Dynamic Validation**: Form validation messages in user's language
- **Browser Detection**: Automatic language detection
- **Language Persistence**: Settings preserved across sessions

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 600px
- **Tablet**: 600px - 900px
- **Desktop**: 900px - 1200px
- **Large Desktop**: > 1200px

### Grid System
- **Movie Grid**: Auto-fill responsive grid
- **Adaptive Columns**: 1-6 columns based on screen size
- **Flexible Layout**: CSS Grid with fallbacks

## 🔧 API Integration

### Endpoints
```typescript
GET    /movies              # Fetch movies with pagination
POST   /movies              # Create new movie
PUT    /movies/:id          # Update existing movie
DELETE /movies/:id          # Delete movie
GET    /movies/search       # Search movies
```

### Data Format
```typescript
interface Movie {
  id: number;
  title: string;
  year: string;
  runtime: string;
  genre: string;
  director: string;
  img?: string;
}
```

## 🧪 Testing

### Test Structure
- **Unit Tests**: Component and hook testing
- **Integration Tests**: User interaction flows
- **Coverage**: Comprehensive test coverage reporting

### Testing Tools
- **Vitest**: Test runner and framework
- **Testing Library**: Component testing utilities
- **jsdom**: Browser environment simulation
- **User Events**: User interaction simulation

### Running Tests
```bash
npm run test              # Run all tests
npm run test:ui           # Visual test interface
npm run test:coverage     # Coverage report
```

## 🔒 Validation

### Form Validation
- **Schema-based**: Zod validation schemas
- **Multilingual**: Error messages in user's language
- **Real-time**: Immediate validation feedback
- **Type-safe**: TypeScript integration

### Validation Rules
- **Title**: 3+ characters, unique titles
- **Year**: 4-digit number, 1900-current year
- **Runtime**: Valid number format
- **Genre**: At least one genre required
- **Director**: 3+ characters

## 🚀 Performance

### Optimizations
- **Code Splitting**: Dynamic imports for routes
- **Memoization**: React.memo and useMemo usage
- **Infinite Scroll**: Efficient data loading
- **Debounced Search**: Reduced API calls
- **Query Caching**: React Query optimization

### Bundle Size
- **Tree Shaking**: Unused code elimination
- **Dynamic Imports**: Lazy loading
- **Asset Optimization**: Image and font optimization

## 🔧 Development

### Code Quality
- **ESLint**: Code linting and formatting
- **TypeScript**: Strict type checking
- **Prettier**: Code formatting (via ESLint)
- **Git Hooks**: Pre-commit validation

### Environment Setup

Create a `.env` file in the client directory with the following variables:

```bash
# API Base URL for the backend server
# For local development:
VITE_BET_BASE_URL=http://localhost:3001/api

# For production deployment:
# VITE_BET_BASE_URL=http://your-server-ip:3001/api
```

**Important**: Make sure to set `VITE_BET_BASE_URL` in your production environment. If not set, the app will fallback to `http://13.53.80.101:3001/api`.

**Environment Variables Template**:
```bash
# Copy this to .env file in the client directory
VITE_BET_BASE_URL=http://localhost:3001/api

# For production:
# VITE_BET_BASE_URL=http://13.53.80.101:3001/api
```

```bash
# Development tools
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build
```

## 📦 Deployment

### Build Process
```bash
npm run build        # Creates dist/ folder
npm run preview      # Test production build
```

### Environment Configuration
- **Development**: Hot reload, debug tools
- **Production**: Optimized bundle, error tracking
- **Testing**: Mock data, test utilities

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Run linting and tests
5. Submit pull request

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Enforced code style
- **Testing**: Required for new features
- **Documentation**: Update README for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review test files for examples

## 🔄 Version History

### Current Version: 1.0.0
- Initial release with full feature set
- React 19 and TypeScript support
- Multilingual interface
- Comprehensive testing suite
- Modern responsive design

---

Built with ❤️ using React 19, TypeScript, and Vite