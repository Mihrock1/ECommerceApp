import {
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardHeader,
  MDBTypography,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../Constants";
import OrderItems from "./OrderItems";

export default function Orders(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useState(props.user);
  const [products, setProducts] = useState(location.state.products);
  const [orders, setOrders] = useState([]);
  const [fetchOrders, setFetchOrders] = useState(true);

  // useLayoutEffect(() => {
  //   if (location.state === null) {
  //     // alert("You are not logged in, Redirecting to login page...");
  //     navigate("/", { replace: true });
  //   } else {
  //     setProducts(location.state.products);
  //   }
  // }, []);

  useEffect(() => {
    if (fetchOrders) {
      fetch(baseUrl + "/Products/viewOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.jwtToken,
        },
        body: JSON.stringify({ id: user.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.statusCode === 200) {
            setOrders(data.listOrders);
          } else {
            setOrders([]);
          }
        })
        .catch((err) => {
          console.log(err);
          console.log("Redirecting to login page...");
          navigate("/", { replace: true });
        })
        .finally(() => {
          setFetchOrders(false);
        });
    }
  }, [fetchOrders, user]);

  useEffect(() => {}, [orders]);

  return (
    <>
      <section
        className="h-100 gradient-custom"
        style={{ backgroundColor: "#eee" }}
      >
        <MDBContainer className="py-5 h-100">
          <MDBCard style={{ borderRadius: "10px" }}>
            <MDBCardHeader className="px-4 py-5">
              <MDBTypography tag="h4" className="text-muted mb-4">
                <span style={{ color: "#a8729a" }}>
                  {user.firstName}'s Orders
                </span>
              </MDBTypography>

              {orders.length !== 0 ? (
                orders.map((order) => (
                  <MDBContainer className="py-5 h-100" key={order.orderNo}>
                    <MDBTypography
                      tag="h6"
                      className="text-muted mb-4 text-uppercase"
                    >
                      Order No: {order.orderNo}
                    </MDBTypography>
                    <hr
                      className="mb-3"
                      style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                    />
                    <OrderItems
                      order={order}
                      products={products}
                      setFetchOrders={setFetchOrders}
                      jwtToken={props.jwtToken}
                    />
                  </MDBContainer>
                ))
              ) : (
                <MDBTypography>
                  <span style={{ color: "#a8729a" }}>No orders found!</span>
                </MDBTypography>
              )}
            </MDBCardHeader>
          </MDBCard>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="d-flex justify-content-center">
              <MDBCol lg="3" md="6" className="bg-grey">
                <MDBBtn
                  color="dark"
                  size="lg"
                  block
                  onClick={() => navigate(-1, { replace: true })}
                >
                  Go to Cart
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBContainer>
      </section>
    </>
  );
}
