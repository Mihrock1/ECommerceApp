using ECommerceAppApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace ECommerceAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ProductsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("addToCart")]
        public Response AddToCart(Cart cart)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.AddToCart(cart, connection);

            return response;
        }

        [HttpPost]
        [Route("updateCartItem")]
        public Response UpdateCartItem(Cart cart)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.UpdateCartItem(cart, connection);

            return response;
        }

        [HttpPost]
        [Route("deleteCartItem")]
        public Response DeleteCartItem(Cart cart)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.DeleteCartItem(cart, connection);

            return response;
        }

        [HttpPost]
        [Route("viewCartItems")]
        public Response ViewCartItems(Users users)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.ViewCartItems(users, connection);

            return response;
        }

        [HttpPost]
        [Route("placeOrder")]
        public Response PlaceOrder(Users users)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.PlaceOrder(users, connection);

            return response;
        }

        [HttpPost]
        [Route("viewOrders")]
        public Response ViewOrders(Users users)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.ViewOrders(users, connection);

            return response;
        }

        [HttpPost]
        [Route("viewOrderItems")]
        public Response ViewOrderItems(Orders orders)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.ViewOrderItems(orders, connection);

            return response;
        }

        [HttpPost]
        [Route("deleteOrder")]
        public Response DeleteOrder(Orders orders)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.DeleteOrder(orders, connection);

            return response;
        }

        [HttpPost]
        [Route("viewProducts")]
        public Response ViewProducts(Users users)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.ViewProducts(users, connection);

            return response;
        }
    }
}
