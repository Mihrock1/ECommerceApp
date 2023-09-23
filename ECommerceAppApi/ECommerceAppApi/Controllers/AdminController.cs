using ECommerceAppApi.Models;
using Microsoft.AspNetCore.Http;
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
        [Route("addUpdateProducts")]
        public Response AddUpdateProducts(Products products)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.AddUpdateProducts(products, connection);

            return response;
        }

        [HttpGet]
        [Route("viewUsers")]
        public Response ViewUsers()
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.ViewUsers(connection);

            return response;
        }
    }
}
