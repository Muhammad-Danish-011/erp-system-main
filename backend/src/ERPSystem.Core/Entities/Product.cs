using System;
using System.ComponentModel.DataAnnotations;

namespace ERPSystem.Core.Entities
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string SKU { get; set; } = string.Empty;

        public decimal Price { get; set; }
        public int StockQuantity { get; set; }

        [Required]
        public string Brand { get; set; } = string.Empty;

        [Required]
        public string Category { get; set; } = string.Empty;

        public string Specifications { get; set; } = string.Empty;
        public decimal CostPrice { get; set; }
        public string SupplierInfo { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsActive { get; set; }
        public string WarrantyInfo { get; set; } = string.Empty;
    }
} 