using System.Data;
using System.Data.SqlClient;

namespace ECommerceAppApi.Models
{
    public class DAL
    {
        public Response Register(Users users, SqlConnection connection)
        {
            SqlCommand cmd = new SqlCommand("sp_register", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@FirstName", users.FirstName);
            cmd.Parameters.AddWithValue("@LastName", users.LastName);
            cmd.Parameters.AddWithValue("@Password", users.Password);
            cmd.Parameters.AddWithValue("@Email", users.Email);
            cmd.Parameters.AddWithValue("@Fund", 0);
            cmd.Parameters.AddWithValue("@Type", "User");
            cmd.Parameters.AddWithValue("@Status", "Pending");

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            Response response = new Response();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.Message = "User registered successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.Message = "User registration failed";
            }

            return response;
        }

        public Response Login(Users users, SqlConnection connection)
        {
            SqlDataAdapter da = new SqlDataAdapter("sp_login", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;

            da.SelectCommand.Parameters.AddWithValue("@Email", users.Email);
            da.SelectCommand.Parameters.AddWithValue("@Password", users.Password);

            DataTable dt = new DataTable();
            da.Fill(dt);

            Response response = new Response();
            Users user = new Users();
            if(dt.Rows.Count > 0)
            {
                user.Id = Convert.ToInt32(dt.Rows[0]["Id"]);
                user.FirstName = Convert.ToString(dt.Rows[0]["FirstName"]);
                user.LastName = Convert.ToString(dt.Rows[0]["LastName"]);
                user.Email = Convert.ToString(dt.Rows[0]["Email"]);
                user.Type = Convert.ToString(dt.Rows[0]["Type"]);

                response.StatusCode = 200;
                response.Message = "User is valid";
                response.User = user;
            }
            else
            {
                response.StatusCode = 100;
                response.Message = "User is invalid";
                response.User = null;
            }

            return response;
        }

        public Response ViewUser(Users users, SqlConnection connection) {
            SqlDataAdapter da = new SqlDataAdapter("sp_viewUser", connection);
            da.SelectCommand.CommandType= CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@Id", users.Id);

            DataTable dt = new DataTable();
            da.Fill(dt);

            Response response = new Response();
            Users user = new Users();
            if (dt.Rows.Count > 0)
            {
                user.Id = Convert.ToInt32(dt.Rows[0]["Id"]);
                user.FirstName = Convert.ToString(dt.Rows[0]["FirstName"]);
                user.LastName = Convert.ToString(dt.Rows[0]["LastName"]);
                user.Email = Convert.ToString(dt.Rows[0]["Email"]);
                user.Type = Convert.ToString(dt.Rows[0]["Type"]);
                user.Fund = Convert.ToDecimal(dt.Rows[0]["Fund"]);
                user.CreatedOn = Convert.ToDateTime(dt.Rows[0]["CreatedOn"]);
                user.Password = Convert.ToString(dt.Rows[0]["Password"]);

                response.StatusCode = 200;
                response.Message = "User exists";
                response.User = user;
            }
            else
            {
                response.StatusCode = 100;
                response.Message = "User does not exist";
                response.User = null;
            }

            return response;
        }

        public Response UpdateUser(Users users, SqlConnection connection)
        {
            SqlCommand cmd = new SqlCommand("sp_update", connection);
            cmd.Parameters.AddWithValue("@FirstName", users.FirstName);
            cmd.Parameters.AddWithValue("@LastName", users.LastName);
            cmd.Parameters.AddWithValue("@Email", users.Email);
            cmd.Parameters.AddWithValue("@Password", users.Password);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            Response response = new Response();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.Message = "User updated successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.Message = "User could not be updated";
            }

            return response;
        }

        public Response AddToCart(Cart cart, SqlConnection connection)
        {
            SqlCommand cmd = new SqlCommand("sp_addToCart", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@UserId", cart.UserId);
            cmd.Parameters.AddWithValue("@ProductId", cart.ProductId);
            cmd.Parameters.AddWithValue("@UnitPrice", cart.UnitPrice);
            cmd.Parameters.AddWithValue("@Discount", cart.Discount);
            cmd.Parameters.AddWithValue("@Quantity", cart.Quantity);
            cmd.Parameters.AddWithValue("@TotalPrice", cart.TotalPrice);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            Response response = new Response();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.Message = "Item added to cart successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.Message = "Item could not be added to cart";
            }

            return response;
        }

        public Response PlaceOrder(Users users, SqlConnection connection)
        {
            SqlCommand cmd = new SqlCommand("sp_placeOrder", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@UserId", users.Id);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            Response response = new Response();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.Message = "Order placed successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.Message = "Order could not be placed";
            }

            return response;
        }

        public Response ViewOrders(Users users, SqlConnection connection)
        {
            Response response = new Response();
            List<Orders> orderList = new List<Orders>();
            SqlDataAdapter da = new SqlDataAdapter("sp_viewOrders", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@Id", users.Id);
            da.SelectCommand.Parameters.AddWithValue("@Type", users.Type);

            DataTable dt = new DataTable();
            da.Fill(dt);
            if(dt.Rows.Count > 0)
            {
                for(int i = 0; i < dt.Rows.Count; i++)
                {
                    Orders order = new Orders();
                    order.Id = Convert.ToInt32(dt.Rows[0]["Id"]);
                    order.OrderNo = Convert.ToString(dt.Rows[0]["OrderNo"]);
                    order.OrderTotal = Convert.ToDecimal(dt.Rows[0]["OrderTotal"]);
                    order.OrderStatus = Convert.ToString(dt.Rows[0]["OrderStatus"]);
                    orderList.Add(order);
                }

                if(orderList.Count > 0)
                {
                    response.StatusCode = 200;
                    response.Message = "Orders fetched";
                    response.ListOrders = orderList;
                }
                else
                {
                    response.StatusCode = 100;
                    response.Message = "Orders could not be fetched";
                    response.ListOrders = null;
                }
            }
            else
            {
                response.StatusCode = 100;
                response.Message = "Orders could not be fetched";
                response.ListOrders = null;
            }

            return response;
        }

        public Response AddProducts(Products products, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_addProducts", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Name", products.Name);
            cmd.Parameters.AddWithValue("@Manufacturer", products.Manufacturer);
            cmd.Parameters.AddWithValue("@UnitPrice", products.UnitPrice);
            cmd.Parameters.AddWithValue("@Discount", products.Discount);
            cmd.Parameters.AddWithValue("@Quantity", products.Quantity);
            cmd.Parameters.AddWithValue("@ImageUrl", products.ImageUrl);
            cmd.Parameters.AddWithValue("@Status", products.Status);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            if (i > 0)
            {
                response.StatusCode = 200;
                response.Message = "Product added successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.Message = "Product could not be added";
            }

            return response;
        }

        public Response UpdateProducts(Products products, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_updateProducts", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Name", products.Name);
            cmd.Parameters.AddWithValue("@Manufacturer", products.Manufacturer);
            cmd.Parameters.AddWithValue("@UnitPrice", products.UnitPrice);
            cmd.Parameters.AddWithValue("@Discount", products.Discount);
            cmd.Parameters.AddWithValue("@Quantity", products.Quantity);
            cmd.Parameters.AddWithValue("@ImageUrl", products.ImageUrl);
            cmd.Parameters.AddWithValue("@Status", products.Status);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            if (i > 0)
            {
                response.StatusCode = 200;
                response.Message = "Product updated successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.Message = "Product could not be updated";
            }

            return response;
        }

        public Response ViewUsers(SqlConnection connection)
        {
            Response response = new Response();
            List<Users> usersList = new List<Users>();
            SqlDataAdapter da = new SqlDataAdapter("sp_viewUsers", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;

            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Users user = new Users();
                    user.Id = Convert.ToInt32(dt.Rows[0]["Id"]);
                    user.FirstName = Convert.ToString(dt.Rows[0]["FirstName"]);
                    user.LastName = Convert.ToString(dt.Rows[0]["LastName"]);
                    user.Password = Convert.ToString(dt.Rows[0]["Password"]);
                    user.Email = Convert.ToString(dt.Rows[0]["Email"]);
                    user.Fund = Convert.ToDecimal(dt.Rows[0]["Fund"]);
                    user.Type = Convert.ToString(dt.Rows[0]["Type"]);
                    user.Status = Convert.ToInt32(dt.Rows[0]["Status"]);
                    user.CreatedOn = Convert.ToDateTime(dt.Rows[0]["CreatedOn"]);
                    usersList.Add(user);
                }

                if (usersList.Count > 0)
                {
                    response.StatusCode = 200;
                    response.Message = "Users fetched";
                    response.ListUsers = usersList;
                }
                else
                {
                    response.StatusCode = 100;
                    response.Message = "Users could not be fetched";
                    response.ListUsers = null;
                }
            }
            else
            {
                response.StatusCode = 100;
                response.Message = "Users could not be fetched";
                response.ListUsers = null;
            }

            return response;
        }
    }
}
