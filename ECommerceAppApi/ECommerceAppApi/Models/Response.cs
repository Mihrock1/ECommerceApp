namespace ECommerceAppApi.Models
{
    public class Response
    {
        public int StatusCode { get; set; }
        public string? Message { get; set; }
        public List<Users>? ListUsers { get; set; }
        public Users? User { get; set; }
        public List<Products>? ListProducts { get; set; }
        public Products? Product { get; set; }
        public List<Cart>? ListCartItems { get; set; }
        public List<Orders>? ListOrders { get; set; }
        public Orders? Order { get; set; }
        public List<OrderItems>? ListItems { get; set; }
        public OrderItems? Item { get; set; }
    }
}
