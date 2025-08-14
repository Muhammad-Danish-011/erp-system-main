using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ERPSystem.Core.Entities;
using ERPSystem.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ERPSystem.API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            try
            {
                var products = await _unitOfWork.Repository<Product>().GetAllAsync();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while processing your request.", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            try
            {
                var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id);
                if (product == null)
                    return NotFound(new { message = $"Product with ID {id} not found." });

                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while processing your request.", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromBody] Product product)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                product.CreatedAt = DateTime.UtcNow;
                product.UpdatedAt = DateTime.UtcNow;

                await _unitOfWork.Repository<Product>().AddAsync(product);
                await _unitOfWork.SaveChangesAsync();

                return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while processing your request.", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product product)
        {
            try
            {
                if (id != product.Id)
                    return BadRequest(new { message = "ID mismatch" });

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var existingProduct = await _unitOfWork.Repository<Product>().GetByIdAsync(id);
                if (existingProduct == null)
                    return NotFound(new { message = $"Product with ID {id} not found." });

                // Update the properties we want to change
                existingProduct.Name = product.Name;
                existingProduct.Description = product.Description;
                existingProduct.SKU = product.SKU;
                existingProduct.Price = product.Price;
                existingProduct.StockQuantity = product.StockQuantity;
                existingProduct.Brand = product.Brand;
                existingProduct.Category = product.Category;
                existingProduct.Specifications = product.Specifications;
                existingProduct.CostPrice = product.CostPrice;
                existingProduct.SupplierInfo = product.SupplierInfo;
                existingProduct.WarrantyInfo = product.WarrantyInfo;
                existingProduct.IsActive = product.IsActive;
                existingProduct.UpdatedAt = DateTime.UtcNow;

                _unitOfWork.Repository<Product>().Update(existingProduct);
                await _unitOfWork.SaveChangesAsync();

                return Ok(existingProduct);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while processing your request.", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id);
                if (product == null)
                    return NotFound(new { message = $"Product with ID {id} not found." });

                _unitOfWork.Repository<Product>().Remove(product);
                await _unitOfWork.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while processing your request.", error = ex.Message });
            }
        }
    }
} 