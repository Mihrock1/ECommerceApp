using ECommerceAppApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace ECommerceAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("registration")]
        public Response Register(Users users)
        {
            DAL dal = new DAL();

            SqlConnection connection = 
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.Register(users, connection);

            return response;
        }

        [HttpPost]
        [Route("login")]
        public Response Login(Users users)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.Login(users, connection);

            return response;
        }

        [HttpPost]
        [Route("viewUser")]
        public Response ViewUser(Users users)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.ViewUser(users, connection);

            return response;
        }

        [HttpPost]
        [Route("updateUser")]
        public Response UpdateUser(Users users)
        {
            DAL dal = new DAL();

            SqlConnection connection =
                new SqlConnection(_configuration.GetConnectionString("ECommerceAppCS").ToString());

            Response response = dal.UpdateUser(users, connection);

            return response;
        }
    }
}
