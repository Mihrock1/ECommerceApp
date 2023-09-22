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
        [Route("placeOrder")]
        public Response PlaceOrder(Users users)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.PlaceOrder(users, connection);

            return response;
        }
    }
}
