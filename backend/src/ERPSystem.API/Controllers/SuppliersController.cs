using ERPSystem.Core.Entities;
using ERPSystem.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ERPSystem.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SuppliersController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public SuppliersController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Supplier>>> GetSuppliers()
    {
        var suppliers = await _unitOfWork.Repository<Supplier>().GetAllAsync();
        return Ok(suppliers);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Supplier>> GetSupplier(int id)
    {
        var supplier = await _unitOfWork.Repository<Supplier>().GetByIdAsync(id);
        if (supplier == null)
        {
            return NotFound();
        }
        return Ok(supplier);
    }

    [HttpPost]
    public async Task<ActionResult<Supplier>> CreateSupplier(Supplier supplier)
    {
        supplier.CreatedAt = DateTime.UtcNow;
        supplier.UpdatedAt = DateTime.UtcNow;
        
        await _unitOfWork.Repository<Supplier>().AddAsync(supplier);
        await _unitOfWork.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSupplier), new { id = supplier.Id }, supplier);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSupplier(int id, Supplier supplier)
    {
        if (id != supplier.Id)
        {
            return BadRequest();
        }

        var existingSupplier = await _unitOfWork.Repository<Supplier>().GetByIdAsync(id);
        if (existingSupplier == null)
        {
            return NotFound();
        }

        supplier.UpdatedAt = DateTime.UtcNow;
        supplier.CreatedAt = existingSupplier.CreatedAt; // Preserve the original creation date
        
        _unitOfWork.Repository<Supplier>().Update(supplier);
        await _unitOfWork.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSupplier(int id)
    {
        var supplier = await _unitOfWork.Repository<Supplier>().GetByIdAsync(id);
        if (supplier == null)
        {
            return NotFound();
        }

        _unitOfWork.Repository<Supplier>().Remove(supplier);
        await _unitOfWork.SaveChangesAsync();

        return NoContent();
    }
} 