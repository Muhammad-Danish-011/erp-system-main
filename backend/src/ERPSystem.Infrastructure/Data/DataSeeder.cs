using ERPSystem.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace ERPSystem.Infrastructure.Data;

public class DataSeeder
{
    private readonly ApplicationDbContext _context;

    public DataSeeder(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task SeedDataAsync()
    {
        // Only seed if the database is empty
        if (!await _context.Customers.AnyAsync() && 
            !await _context.Suppliers.AnyAsync() && 
            !await _context.Orders.AnyAsync())
        {
            // Seed Customers
            var customers = new List<Customer>
            {
                new Customer
                {
                    FirstName = "John",
                    LastName = "Doe",
                    Email = "john.doe@example.com",
                    Phone = "555-0100",
                    Address = "123 Main St",
                    City = "New York",
                    Country = "USA",
                    PostalCode = "10001",
                    CompanyName = "Tech Corp",
                    CustomerType = "Corporate",
                    CreditLimit = 10000,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Customer
                {
                    FirstName = "Jane",
                    LastName = "Smith",
                    Email = "jane.smith@example.com",
                    Phone = "555-0101",
                    Address = "456 Oak Ave",
                    City = "Los Angeles",
                    Country = "USA",
                    PostalCode = "90001",
                    CompanyName = "Digital Solutions",
                    CustomerType = "Corporate",
                    CreditLimit = 15000,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Customer
                {
                    FirstName = "Robert",
                    LastName = "Johnson",
                    Email = "robert.j@example.com",
                    Phone = "555-0102",
                    Address = "789 Pine St",
                    City = "Chicago",
                    Country = "USA",
                    PostalCode = "60601",
                    CompanyName = "",
                    CustomerType = "Individual",
                    CreditLimit = 5000,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }
            };
            await _context.Customers.AddRangeAsync(customers);

            // Seed Suppliers
            var suppliers = new List<Supplier>
            {
                new Supplier
                {
                    CompanyName = "Electronics Pro",
                    ContactName = "Michael Wilson",
                    ContactTitle = "Sales Manager",
                    Email = "michael.w@electronicspro.com",
                    Phone = "555-0200",
                    Address = "100 Tech Blvd",
                    City = "San Jose",
                    Country = "USA",
                    PostalCode = "95110",
                    TaxIdentificationNumber = "123456789",
                    PaymentTerms = "Net 30",
                    BankAccountDetails = "Bank of America - 1234567890",
                    CreditLimit = 100000,
                    Rating = "A",
                    IsActive = true,
                    Notes = "Premium electronics supplier",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Supplier
                {
                    CompanyName = "Global Tech Supply",
                    ContactName = "Sarah Brown",
                    ContactTitle = "Account Executive",
                    Email = "sarah.b@globaltechsupply.com",
                    Phone = "555-0201",
                    Address = "200 Innovation Way",
                    City = "Austin",
                    Country = "USA",
                    PostalCode = "73301",
                    TaxIdentificationNumber = "987654321",
                    PaymentTerms = "Net 45",
                    BankAccountDetails = "Chase Bank - 0987654321",
                    CreditLimit = 150000,
                    Rating = "A+",
                    IsActive = true,
                    Notes = "Global technology supplier",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }
            };
            await _context.Suppliers.AddRangeAsync(suppliers);

            // Save changes to get IDs for customers
            await _context.SaveChangesAsync();

            // Get some products for order items
            var products = await _context.Products.Take(3).ToListAsync();
            if (products.Any())
            {
                // Seed Orders
                var orders = new List<Order>
                {
                    new Order
                    {
                        CustomerId = customers[0].Id,
                        OrderDate = DateTime.UtcNow.AddDays(-5),
                        OrderStatus = "Completed",
                        TotalAmount = 2500.00m,
                        TaxAmount = 200.00m,
                        ShippingCost = 50.00m,
                        ShippingAddress = customers[0].Address,
                        PaymentStatus = "Paid",
                        PaymentMethod = "Credit Card",
                        TrackingNumber = "TRK123456",
                        ShippedDate = DateTime.UtcNow.AddDays(-3),
                        DeliveredDate = DateTime.UtcNow.AddDays(-1),
                        Notes = "Priority shipping",
                        CreatedAt = DateTime.UtcNow.AddDays(-5),
                        UpdatedAt = DateTime.UtcNow.AddDays(-1)
                    },
                    new Order
                    {
                        CustomerId = customers[1].Id,
                        OrderDate = DateTime.UtcNow.AddDays(-2),
                        OrderStatus = "Processing",
                        TotalAmount = 1800.00m,
                        TaxAmount = 150.00m,
                        ShippingCost = 35.00m,
                        ShippingAddress = customers[1].Address,
                        PaymentStatus = "Pending",
                        PaymentMethod = "Bank Transfer",
                        TrackingNumber = "",
                        Notes = "Standard shipping",
                        CreatedAt = DateTime.UtcNow.AddDays(-2),
                        UpdatedAt = DateTime.UtcNow.AddDays(-2)
                    }
                };
                await _context.Orders.AddRangeAsync(orders);

                // Save changes to get order IDs
                await _context.SaveChangesAsync();

                // Seed Order Items
                var orderItems = new List<OrderItem>();
                foreach (var order in orders)
                {
                    // Add 2 random products to each order
                    for (int i = 0; i < 2; i++)
                    {
                        var product = products[i];
                        orderItems.Add(new OrderItem
                        {
                            OrderId = order.Id,
                            ProductId = product.Id,
                            Quantity = i + 1,
                            UnitPrice = product.Price,
                            Discount = 0,
                            TotalPrice = product.Price * (i + 1)
                        });
                    }
                }
                await _context.OrderItems.AddRangeAsync(orderItems);
            }

            await _context.SaveChangesAsync();
        }
    }
} 