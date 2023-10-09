using ECommerceAppApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace ECommerceAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AdminController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Authorize]
        [HttpPost]
        [Route("addProduct")]
        public Response AddProduct(UsersProductsArray usersProductsArray)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.AddProduct(usersProductsArray, connection);

            return response;
        }

        [Authorize]
        [HttpPost]
        [Route("updateProduct")]
        public Response UpdateProduct(UsersProductsArray usersProductsArray)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.UpdateProduct(usersProductsArray, connection);

            return response;
        }

        [Authorize]
        [HttpPost]
        [Route("deleteProduct")]
        public Response DeleteProduct(UsersProductsArray usersProductsArray)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.DeleteProduct(usersProductsArray, connection);

            return response;
        }

        [Authorize]
        [HttpPost]
        [Route("viewUsers")]
        public Response ViewUsers(Users users)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.ViewUsers(users, connection);

            return response;
        }

        [Authorize]
        [HttpPost]
        [Route("deleteUser")]
        public Response DeleteUser(UsersArray usersArray)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.DeleteUser(usersArray, connection);

            return response;
        }

        [Authorize]
        [HttpPost]
        [Route("activateUser")]
        public Response ActivateUser(UsersArray usersArray)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.ActivateUser(usersArray, connection);

            return response;
        }
    }
}
