# ERP System for Tech/Electrical Devices Store

A comprehensive ERP (Enterprise Resource Planning) system built with ASP.NET Core for managing a tech/electrical devices store. This system handles inventory management, customer relations, order processing, and supplier management.

## Features

- Product Management

  - Add, update, and delete products
  - Track inventory levels
  - Manage product categories
  - Handle product specifications and warranty information

- Customer Management

  - Customer profiles
  - Order history
  - Contact information
  - Business/Individual customer types

- Order Processing

  - Create and manage orders
  - Track order status
  - Calculate totals, taxes, and shipping
  - Handle multiple items per order

- Supplier Management
  - Supplier profiles
  - Purchase orders
  - Track supplier performance
  - Manage supplier contracts

## Technology Stack

- ASP.NET Core 9.0
- Entity Framework Core
- SQL Server
- Clean Architecture
- Repository Pattern with Unit of Work
- Swagger/OpenAPI

## Prerequisites

- .NET 9.0 SDK
- SQL Server
- Visual Studio 2022 or VS Code

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/erp-system.git
   cd erp-system
   ```

2. Update the database connection string in `appsettings.json` and `appsettings.Development.json`

3. Apply database migrations:

   ```bash
   cd src/ERPSystem.API
   dotnet ef database update
   ```

4. Run the application:

   ```bash
   dotnet run
   ```

5. Access the API documentation at:
   ```
   https://localhost:5001/swagger
   ```

## Project Structure

- `ERPSystem.API`: Web API project
- `ERPSystem.Core`: Domain entities and interfaces
- `ERPSystem.Infrastructure`: Data access and implementation
- `ERPSystem.Application`: Business logic and services

## API Endpoints

### Products

- GET `/api/products`: Get all products
- GET `/api/products/{id}`: Get product by ID
- POST `/api/products`: Create new product
- PUT `/api/products/{id}`: Update product
- DELETE `/api/products/{id}`: Delete product

(More endpoints documentation to be added for Customers, Orders, and Suppliers)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
