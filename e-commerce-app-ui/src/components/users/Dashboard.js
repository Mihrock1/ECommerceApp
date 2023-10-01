import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import { baseUrl } from "../Constants";
import Product from "./Product";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";

export default function Dashboard() {
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [isRedirect, setIsRedirect] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  const handleGoToCart = (e) => {
    e.preventDefault();

    const userId = { id: location.state.id };

    fetch(baseUrl + "/Products/viewCartItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userId),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.statusCode === 200) {
          setCartItems(data.listCartItems);
          setIsRedirect(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isRedirect) {
      navigate("/cart", { state: { cartItems, products }, replace: false });
    }
  }, [isRedirect, navigate, cartItems, products]);

  useEffect(() => {
    const userId = { id: location.state.id };

    fetch(baseUrl + "/Products/viewProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userId),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.statusCode === 200) {
          setProducts(data.listProducts);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state.id]);

  return (
    <MDBContainer className="p-4 overflow-hidden">
      <MDBRow className="gx-4 gy-4">
        {products.map((product) => (
          <MDBCol md="4" key={product.id}>
            <Product product={product} userId={location.state.id} />
          </MDBCol>
        ))}
      </MDBRow>
      <MDBRow className="p-4 overflow-hidden">
        <MDBCol className="gx-4 gy-4">
          <MDBBtn
            rounded
            className="mx-2"
            color="dark"
            size="lg"
            onClick={handleGoToCart}
          >
            Go to Cart
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
