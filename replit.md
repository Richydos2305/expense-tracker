# Expense Tracker Application

## Overview

This is a React-based expense tracking frontend application built with TypeScript and modern UI components. The application is designed to work with external backend APIs for managing expenses across multiple accounts and categories with a clean, responsive dashboard interface.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management with ExpenseContext wrapper
- **UI Components**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom design tokens for Nigerian banks
- **Data Fetching**: TanStack Query for caching and synchronization with backend APIs
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization

### Backend Integration
- **API Communication**: RESTful API calls to external backend
- **Endpoints**: `/api/accounts`, `/api/categories`, `/api/expenses`
- **HTTP Methods**: GET (fetch), POST (create), PATCH (update), DELETE (remove)
- **Validation**: Zod schemas for runtime type checking
- **Error Handling**: Comprehensive error handling with user feedback

### Data Management
- **No Local Storage**: Removed local storage dependency for production use
- **Real-time Sync**: TanStack Query handles caching and invalidation
- **Loading States**: Proper loading indicators throughout the application
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`

## Key Components

### Schema Design
The application uses three main entities:
- **Accounts**: Financial accounts (savings, current, investment, cash) with balance tracking
- **Categories**: Expense categories with color coding and icons
- **Expenses**: Individual expense records linking accounts and categories

### Frontend Components
- **Dashboard**: Overview with account summaries, charts, and recent transactions
- **Account Management**: View and manage financial accounts
- **Category Management**: Organize expenses by categories
- **Expense Entry**: Form-based expense creation with validation
- **Analytics**: Visual data representation with charts and trends
- **Transactions**: Comprehensive expense listing with filtering

### UI/UX Features
- Responsive design with mobile-first approach
- Dark/light theme support via CSS variables
- Interactive charts and data visualizations
- Form validation with real-time feedback
- Toast notifications for user feedback
- Sidebar navigation with mobile drawer support

## Data Flow

### Client-Side Flow
1. User interactions trigger React component state updates
2. Form submissions validate data using Zod schemas
3. API calls made through TanStack Query for caching
4. Global state managed via ExpenseContext
5. Local storage provides persistence between sessions

### Server-Side Flow
1. Express middleware handles request parsing and logging
2. Routes process API requests with error handling
3. Drizzle ORM manages database operations
4. Response data validated against shared schemas
5. Sessions stored in PostgreSQL for scalability

### Development vs Production
- Development: Uses in-memory storage and Vite dev server
- Production: PostgreSQL database with optimized builds
- Shared validation schemas ensure consistency across environments

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless deployment
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/**: Comprehensive UI primitive components
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **zod**: Runtime type validation and schema definition
- **wouter**: Lightweight client-side routing

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Static type checking and enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint/Prettier**: Code formatting and linting (configured via package.json)

### Chart and Visualization
- **recharts**: React chart library for analytics dashboard
- **lucide-react**: Icon library for consistent UI elements
- **date-fns**: Date manipulation and formatting utilities

## Deployment Strategy

### Build Process
- **Development**: `npm run dev` starts Vite dev server with hot reload
- **Production Build**: `npm run build` creates optimized static assets and bundles server
- **Server Bundle**: ESBuild bundles server code for production deployment

### Environment Configuration
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
- **Session Store**: PostgreSQL-backed session storage for scalability
- **Static Assets**: Built client assets served from `/dist/public`

### Hosting Platform
- **Target Platform**: Replit autoscale deployment
- **Port Configuration**: Server runs on port 5000 with external port 80
- **Database**: PostgreSQL 16 module for persistent data storage

### Monitoring and Logging
- Request logging with duration tracking for API endpoints
- Error handling middleware for graceful failure recovery
- Development-specific error overlays and debugging tools

## User Preferences

Preferred communication style: Simple, everyday language.

## API Endpoints Expected by Frontend

The frontend expects your backend to provide these RESTful endpoints:

### Accounts API
```
GET    /api/accounts          - Fetch all accounts
POST   /api/accounts          - Create new account
PATCH  /api/accounts/:id      - Update account
DELETE /api/accounts/:id      - Delete account
```

### Categories API
```
GET    /api/categories        - Fetch all categories
POST   /api/categories        - Create new category
PATCH  /api/categories/:id    - Update category
DELETE /api/categories/:id    - Delete category
```

### Expenses API
```
GET    /api/expenses          - Fetch all expenses
POST   /api/expenses          - Create new expense
PATCH  /api/expenses/:id      - Update expense
DELETE /api/expenses/:id      - Delete expense
```

### Expected Data Formats

**Account Object:**
```json
{
  "id": "string",
  "name": "string",
  "type": "savings|current|investment|cash",
  "balance": "number",
  "color": "string",
  "icon": "string"
}
```

**Category Object:**
```json
{
  "id": "string",
  "name": "string",
  "color": "string",
  "icon": "string"
}
```

**Expense Object:**
```json
{
  "id": "string",
  "amount": "number",
  "description": "string",
  "categoryId": "string",
  "accountId": "string",
  "date": "string",
  "notes": "string (optional)",
  "createdAt": "string"
}
```

## New Features Added

### UI Enhancements
- **Add Account Button**: Available on Accounts page for creating new financial accounts
- **Create Category Button**: Available on Categories page for adding expense categories
- **Loading States**: Comprehensive loading indicators throughout the application
- **Empty States**: User-friendly messages when no data is available

### API Integration
- **Real-time Data**: All data fetched from backend APIs with automatic cache invalidation
- **Error Handling**: Proper error messages for failed API calls
- **Optimistic Updates**: UI updates immediately with backend synchronization

## Changelog

- June 17, 2025: Initial setup with local storage
- June 17, 2025: Restructured to work with external backend APIs, added create buttons and loading states