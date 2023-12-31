﻿namespace ECommerceAppApi.Models
{
    public class Users
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public decimal Fund { get; set; }
        public string? Type { get; set; }
        public DateTime CreatedOn { get; set; }
        public string? AccountStatus { get; set; }
    }
}
