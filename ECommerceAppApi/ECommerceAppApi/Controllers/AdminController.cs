using ECommerceAppApi.Models;
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

        [HttpPost]
        [Route("addProducts")]
        public Response AddProducts(Products products)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.AddProducts(products, connection);

            return response;
        }

        [HttpPost]
        [Route("updateProducts")]
        public Response UpdateProducts(Products products)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.UpdateProducts(products, connection);

            return response;
        }

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

        [HttpPost]
        [Route("deleteUser")]
        public Response DeleteUser(Users users)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.DeleteUser(users, connection);

            return response;
        }

        [HttpPost]
        [Route("activateUser")]
        public Response ActivateUser(Users users)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.ActivateUser(users, connection);

            return response;
        }
    }
}
