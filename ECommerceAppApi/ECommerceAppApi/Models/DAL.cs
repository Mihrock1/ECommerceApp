using ECommerceAppApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            Response response = new Response();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.Message = "User registered successfully, but pending activation";
            }
            else
            {
                response.StatusCode = 400;
                response.Message = "User registration failed as User already exists, please login";
            }

            return response;
        }

        public Users? Login(Users users, SqlConnection connection)
        {
            SqlDataAdapter da = new SqlDataAdapter("sp_login", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;

            da.SelectCommand.Parameters.AddWithValue("@Email", users.Email);
            da.SelectCommand.Parameters.AddWithValue("@Password", users.Password);

            DataTable dt = new DataTable();
            da.Fill(dt);

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
                user.AccountStatus = Convert.ToString(dt.Rows[0]["AccountStatus"]);

                return user;
            }
            else {
                return null;
                }
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
                user.AccountStatus = Convert.ToString(dt.Rows[0]["AccountStatus"]);

                response.StatusCode = 200;
                response.Message = "User details fetched";
                response.User = user;
            }
            else
            {
                response.StatusCode = 404;
                response.Message = "User does not exist";
                response.User = null;
            }

            return response;
        }

        public Response ViewUsers(Users users, SqlConnection connection)
        {
            Response response = new Response();
            List<Users> usersList = new List<Users>();
            SqlDataAdapter da = new SqlDataAdapter("sp_viewUsers", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;

            da.SelectCommand.Parameters.AddWithValue("@Id", users.Id);

            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Users user = new Users();
                    user.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    user.FirstName = Convert.ToString(dt.Rows[i]["FirstName"]);
                    user.LastName = Convert.ToString(dt.Rows[i]["LastName"]);
                    user.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    user.Fund = Convert.ToDecimal(dt.Rows[i]["Fund"]);
                    user.Type = Convert.ToString(dt.Rows[i]["Type"]);
                    user.CreatedOn = Convert.ToDateTime(dt.Rows[i]["CreatedOn"]);
                    user.AccountStatus = Convert.ToString(dt.Rows[i]["AccountStatus"]);
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
                    response.StatusCode = 401;
                    response.Message = "Users could not be fetched";
                    response.ListUsers = null;
                }
            }
            else
            {
                response.StatusCode = 401;
                response.Message = "Users could not be fetched";
                response.ListUsers = null;
            }

            return response;
        }

        public Response UpdateUser(Users users, SqlConnection connection)
        {
            SqlCommand cmd = new SqlCommand("sp_updateUser", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Id", users.Id);
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
                response.StatusCode = 400;
                response.Message = "User could not be updated";
            }

            return response;
        }

        public Response ActivateUser(Users users, SqlConnection connection)
        {
            SqlCommand cmd = new SqlCommand("sp_activateUser", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Id", users.Id);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            Response response = new Response();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.Message = "User activated successfully";
            }
            else
            {
                response.StatusCode = 400;
                response.Message = "User is already active!";
            }

            return response;
        }

        public Response DeleteUser(Users users, SqlConnection connection)
        {
            SqlCommand cmd = new SqlCommand("sp_deleteUser", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Id", users.Id);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            Response response = new Response();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.Message = "User deleted successfully";
            }
            else
            {
                response.StatusCode = 400;
                response.Message = "User could not be deleted";
            }

            return response;
        }

        public Response AddToCart(Cart cart, SqlConnection connection)
        {
            SqlCommand cmd = new SqlCommand("sp_addToCart", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@UserId", cart.UserId);
            cmd.Parameters.AddWithValue("@ProductId", cart.ProductId);
            cmd.Parameters.AddWithValue("@Quantity", cart.Quantity);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            Response response = new Response();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.Message = "Items added to cart successfully";
            }
            else
            {
                response.StatusCode = 400;
                response.Message = "Items could not be added to cart";
            }

            return response;
        }

        public Response UpdateCartItem(Cart cart, SqlConnection connection)
        {
            SqlCommand cmd = new SqlCommand("sp_updateCartItem", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@UserId", cart.UserId);
            cmd.Parameters.AddWithValue("@ProductId", cart.ProductId);
            cmd.Parameters.AddWithValue("@Quantity", cart.Quantity);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            Response response = new Response();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.Message = "Items in the cart updated successfully";
            }
            else
            {
                response.StatusCode = 400;
                response.Message = "Items in the cart could not be updated";
            }

            return response;
        }

        public Response DeleteCartItem(Cart cart, SqlConnection connection)
        {
            SqlCommand cmd = new SqlCommand("sp_deleteCartItem", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Id", cart.Id);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            Response response = new Response();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.Message = "Item in the cart deleted successfully";
            }
            else
            {
                response.StatusCode = 400;
                response.Message = "Item in the cart could not be deleted";
            }

            return response;
        }

        public Response ViewCartItems(Users users, SqlConnection connection)
        {
            Response response = new Response();
            List<Cart> cartItemsList = new List<Cart>();
            SqlDataAdapter da = new SqlDataAdapter("sp_viewCartItems", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;

            da.SelectCommand.Parameters.AddWithValue("@UserId", users.Id);

            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Cart cartItems = new Cart();
                    cartItems.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    cartItems.UserId = Convert.ToInt32(dt.Rows[i]["UserId"]);
                    cartItems.ProductId = Convert.ToInt32(dt.Rows[i]["ProductId"]);
                    cartItems.Quantity = Convert.ToInt32(dt.Rows[i]["Quantity"]);
                    cartItems.TotalPrice = Convert.ToDecimal(dt.Rows[i]["TotalPrice"]);
                    cartItemsList.Add(cartItems);
                }

                if (cartItemsList.Count > 0)
                {
                    response.StatusCode = 200;
                    response.Message = "Cart Items fetched";
                    response.ListCartItems = cartItemsList;
                }
                else
                {
                    response.StatusCode = 401;
                    response.Message = "Cart Items could not be fetched";
                    response.ListCartItems = null;
                }
            }
            else
            {
                response.StatusCode = 401;
                response.Message = "Cart Items could not be fetched";
                response.ListCartItems = null;
            }

            return response;
        }

        public Response PlaceOrder(Users users, SqlConnection connection)
        {
            SqlCommand cmd = new SqlCommand("sp_placeOrder", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@UserId", users.Id);
            cmd.Parameters.AddWithValue("@OrderNo", Guid.NewGuid());

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
                response.StatusCode = 400;
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

            DataTable dt = new DataTable();
            da.Fill(dt);
            if(dt.Rows.Count > 0)
            {
                for(int i = 0; i < dt.Rows.Count; i++)
                {
                    Orders order = new Orders();
                    order.OrderNo = Guid.Parse(Convert.ToString(dt.Rows[i]["OrderNo"]));
                    order.OrderTotal = Convert.ToDecimal(dt.Rows[i]["OrderTotal"]);
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
                    response.StatusCode = 401;
                    response.Message = "Orders could not be fetched";
                    response.ListOrders = null;
                }
            }
            else
            {
                response.StatusCode = 401;
                response.Message = "Orders could not be fetched";
                response.ListOrders = null;
            }

            return response;
        }

        public Response DeleteOrder(Orders order, SqlConnection connection)
        {
            SqlCommand cmd = new SqlCommand("sp_deleteOrder", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@OrderNo", order.OrderNo);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            Response response = new Response();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.Message = "Order cancelled successfully";
            }
            else
            {
                response.StatusCode = 400;
                response.Message = "Order could not be cancelled";
            }

            return response;
        }

        public Response ViewOrderItems(Orders orders, SqlConnection connection)
        {
            Response response = new Response();
            List<OrderItems> orderItemsList = new List<OrderItems>();
            SqlDataAdapter da = new SqlDataAdapter("sp_viewOrderItems", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;

            da.SelectCommand.Parameters.AddWithValue("@OrderNo", orders.OrderNo);

            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    OrderItems orderItem = new OrderItems();
                    orderItem.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    orderItem.OrderNo = Guid.Parse(Convert.ToString(dt.Rows[i]["OrderNo"]));
                    orderItem.ProductId = Convert.ToInt32(dt.Rows[i]["ProductId"]);
                    orderItem.Quantity = Convert.ToInt32(dt.Rows[i]["Quantity"]);
                    orderItem.TotalPrice = Convert.ToDecimal(dt.Rows[i]["TotalPrice"]);
                    orderItemsList.Add(orderItem);
                }

                if (orderItemsList.Count > 0)
                {
                    response.StatusCode = 200;
                    response.Message = "Order Items fetched";
                    response.ListOrderItems = orderItemsList;
                }
                else
                {
                    response.StatusCode = 401;
                    response.Message = "Order Items could not be fetched";
                    response.ListOrderItems = null;
                }
            }
            else
            {
                response.StatusCode = 401;
                response.Message = "Order Items could not be fetched";
                response.ListOrderItems = null;
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
            cmd.Parameters.AddWithValue("@ImageUrl", products.ImageUrl);

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
                response.StatusCode = 400;
                response.Message = "Product could not be added";
            }

            return response;
        }

        public Response UpdateProducts(Products products, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_updateProducts", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Id", products.Id);
            cmd.Parameters.AddWithValue("@Name", products.Name);
            cmd.Parameters.AddWithValue("@Manufacturer", products.Manufacturer);
            cmd.Parameters.AddWithValue("@UnitPrice", products.UnitPrice);
            cmd.Parameters.AddWithValue("@Discount", products.Discount);
            cmd.Parameters.AddWithValue("@ImageUrl", products.ImageUrl);

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
                response.StatusCode = 400;
                response.Message = "Product could not be updated";
            }

            return response;
        }

        public Response ViewProducts(Users users, SqlConnection connection)
        {
            Response response = new Response();
            List<Products> productList = new List<Products>();
            SqlDataAdapter da = new SqlDataAdapter("sp_viewProducts", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;

            da.SelectCommand.Parameters.AddWithValue("@UserId", users.Id);

            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Products product = new Products();
                    product.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    product.Name = Convert.ToString(dt.Rows[i]["Name"]);
                    product.Manufacturer = Convert.ToString(dt.Rows[i]["Manufacturer"]);
                    product.UnitPrice = Convert.ToDecimal(dt.Rows[i]["UnitPrice"]);
                    product.Discount = Convert.ToInt32(dt.Rows[i]["Discount"]);
                    product.ImageUrl = Convert.ToString(dt.Rows[i]["ImageUrl"]);
                    productList.Add(product);
                }

                if (productList.Count > 0)
                {
                    response.StatusCode = 200;
                    response.Message = "Products fetched";
                    response.ListProducts = productList;
                }
                else
                {
                    response.StatusCode = 401;
                    response.Message = "Products could not be fetched";
                    response.ListProducts = null;
                }
            }
            else
            {
                response.StatusCode = 401;
                response.Message = "Products could not be fetched";
                response.ListProducts = null;
            }

            return response;
        }
    }
}
