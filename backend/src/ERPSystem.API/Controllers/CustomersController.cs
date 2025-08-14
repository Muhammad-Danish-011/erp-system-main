using ERPSystem.Core.Entities;
using ERPSystem.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ERPSystem.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public CustomersController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
    {
        var customers = await _unitOfWork.Repository<Customer>().GetAllAsync();
        return Ok(customers);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Customer>> GetCustomer(int id)
    {
        var customer = await _unitOfWork.Repository<Customer>().GetByIdAsync(id);
        if (customer == null)
        {
            return NotFound();
        }
        return Ok(customer);
    }

    [HttpPost]
    public async Task<ActionResult<Customer>> CreateCustomer(Customer customer)
    {
        customer.CreatedAt = DateTime.UtcNow;
        customer.UpdatedAt = DateTime.UtcNow;
        
        await _unitOfWork.Repository<Customer>().AddAsync(customer);
        await _unitOfWork.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, customer);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCustomer(int id, Customer customer)
    {
        if (id != customer.Id)
        {
            return BadRequest();
        }

        var existingCustomer = await _unitOfWork.Repository<Customer>().GetByIdAsync(id);
        if (existingCustomer == null)
        {
            return NotFound();
        }

        customer.UpdatedAt = DateTime.UtcNow;
        customer.CreatedAt = existingCustomer.CreatedAt; // Preserve the original creation date
        
        _unitOfWork.Repository<Customer>().Update(customer);
        await _unitOfWork.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCustomer(int id)
    {
        var customer = await _unitOfWork.Repository<Customer>().GetByIdAsync(id);
        if (customer == null)
        {
            return NotFound();
        }

        _unitOfWork.Repository<Customer>().Remove(customer);
        await _unitOfWork.SaveChangesAsync();

        return NoContent();
    }
} 