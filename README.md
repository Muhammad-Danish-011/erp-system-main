# ERP System

A modern Enterprise Resource Planning (ERP) system built with Next.js, .NET Core, and SQL Server. This system helps manage various aspects of business operations including inventory, customers, suppliers, and orders.

## Features

- **Dashboard**

  - Overview of key metrics
  - Real-time statistics
  - Alert notifications

- **Product Management**

  - Inventory tracking
  - Product details and specifications
  - Stock level monitoring
  - Price management

- **Customer Management**

  - Customer profiles
  - Contact information
  - Order history
  - Credit limit tracking

- **Supplier Management**

  - Supplier profiles
  - Contact information
  - Performance ratings
  - Payment terms

- **Order Management**
  - Order creation and tracking
  - Status updates
  - Payment processing
  - Shipping information

## Tech Stack

### Frontend

- Next.js 14
- TypeScript
- Tailwind CSS
- React Hook Form
- Headless UI

### Backend

- .NET 9
- Entity Framework Core
- SQL Server
- RESTful API

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- .NET 9 SDK
- SQL Server
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/erp-system.git
cd erp-system
```

1. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

1. Backend Setup

```bash
cd backend/src/ERPSystem.API
dotnet restore
dotnet run
```

1. Configure the database connection string in `backend/src/ERPSystem.API/appsettings.json`

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5019
```

## Project Structure

```
erp-system/
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js pages
│   │   │   ├── components/   # React components
│   │   │   ├── lib/         # Utilities and API client
│   │   │   └── types/       # TypeScript types
│   │   └── public/          # Static assets
│   └── backend/
│       └── src/
│           ├── ERPSystem.API/           # API endpoints
│           ├── ERPSystem.Core/          # Business logic
│           └── ERPSystem.Infrastructure/# Data access
```

## API Documentation

The API documentation is available at `http://localhost:5019/swagger` when running the backend in development mode.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
