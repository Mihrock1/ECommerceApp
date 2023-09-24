namespace ECommerceAppApi.Models
{
    public class Products
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Manufacturer { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Discount { get; set; }
        public string? ImageUrl { get; set; }
        public int Status { get; set; }
    }
}
