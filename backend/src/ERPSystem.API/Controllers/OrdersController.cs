using ERPSystem.Core.Entities;
using ERPSystem.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ERPSystem.Infrastructure.Data;

namespace ERPSystem.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ApplicationDbContext _context;

    public OrdersController(IUnitOfWork unitOfWork, ApplicationDbContext context)
    {
        _unitOfWork = unitOfWork;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        // Include related customer and order items data
        var orders = await _context.Orders
            .Include(o => o.Customer)
            .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
            .ToListAsync();
            
        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var order = await _context.Orders
            .Include(o => o.Customer)
            .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
        {
            return NotFound();
        }
        return Ok(order);
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(Order order)
    {
        // Validate customer exists
        var customer = await _unitOfWork.Repository<Customer>().GetByIdAsync(order.CustomerId);
        if (customer == null)
        {
            return BadRequest("Invalid customer ID");
        }

        // Set timestamps
        order.CreatedAt = DateTime.UtcNow;
        order.UpdatedAt = DateTime.UtcNow;
        order.OrderDate = DateTime.UtcNow;

        // Calculate totals
        decimal subtotal = 0;
        foreach (var item in order.OrderItems ?? Enumerable.Empty<OrderItem>())
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(item.ProductId);
            if (product == null)
            {
                return BadRequest($"Invalid product ID: {item.ProductId}");
            }

            item.UnitPrice = product.Price;
            item.TotalPrice = item.UnitPrice * item.Quantity * (1 - item.Discount / 100);
            subtotal += item.TotalPrice;
        }

        // Set order totals
        order.TotalAmount = subtotal + order.ShippingCost + order.TaxAmount;
        
        await _unitOfWork.Repository<Order>().AddAsync(order);
        await _unitOfWork.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrder(int id, Order order)
    {
        if (id != order.Id)
        {
            return BadRequest();
        }

        var existingOrder = await _context.Orders
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (existingOrder == null)
        {
            return NotFound();
        }

        // Update timestamps
        order.UpdatedAt = DateTime.UtcNow;
        order.CreatedAt = existingOrder.CreatedAt; // Preserve the original creation date

        // Remove existing order items
        _context.OrderItems.RemoveRange(existingOrder.OrderItems ?? Enumerable.Empty<OrderItem>());

        // Calculate new totals
        decimal subtotal = 0;
        foreach (var item in order.OrderItems ?? Enumerable.Empty<OrderItem>())
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(item.ProductId);
            if (product == null)
            {
                return BadRequest($"Invalid product ID: {item.ProductId}");
            }

            item.OrderId = id;
            item.UnitPrice = product.Price;
            item.TotalPrice = item.UnitPrice * item.Quantity * (1 - item.Discount / 100);
            subtotal += item.TotalPrice;
        }

        // Update order totals
        order.TotalAmount = subtotal + order.ShippingCost + order.TaxAmount;

        _context.Entry(existingOrder).CurrentValues.SetValues(order);
        await _context.OrderItems.AddRangeAsync(order.OrderItems ?? Enumerable.Empty<OrderItem>());
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
        {
            return NotFound();
        }

        // Remove order items first
        _context.OrderItems.RemoveRange(order.OrderItems ?? Enumerable.Empty<OrderItem>());
        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();

        return NoContent();
    }
} 