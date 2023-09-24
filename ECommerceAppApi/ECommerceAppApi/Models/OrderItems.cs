namespace ECommerceAppApi.Models
{
    public class OrderItems
    {
        public int Id { get; set; }
        public Guid OrderNo { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
