using System;

namespace ERPSystem.Core.Entities
{
    public class Supplier
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string ContactName { get; set; }
        public string ContactTitle { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string TaxIdentificationNumber { get; set; }
        public string PaymentTerms { get; set; }
        public string BankAccountDetails { get; set; }
        public decimal CreditLimit { get; set; }
        public string Rating { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Notes { get; set; }
    }
} 