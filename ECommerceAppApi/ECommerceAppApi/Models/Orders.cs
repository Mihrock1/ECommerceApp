namespace ECommerceAppApi.Models
{
    public class Orders
    {
        public Guid OrderNo { get; set; }
        public int MyInt { get; set; }
        public int UserId { get; set; }
        public decimal OrderTotal { get; set; }
        public string? OrderStatus { get; set; }
    }
}
