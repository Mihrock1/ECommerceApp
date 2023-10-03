import {
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardHeader,
  MDBTypography,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../Constants";
import OrderItems from "./OrderItems";

export default function Orders() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useState(location.state.user);
  const [products] = useState(location.state.products);
  const [orders, setOrders] = useState([]);
  const [fetchOrders, setFetchOrders] = useState(true);

  useEffect(() => {
    console.log(user);
    if (fetchOrders) {
      fetch(baseUrl + "/Products/viewOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
                Thanks for your Orders,
                <span style={{ color: "#a8729a" }}> {user.firstName}</span>!
              </MDBTypography>

              {orders.map((order) => (
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
                  />
                </MDBContainer>
              ))}
            </MDBCardHeader>
          </MDBCard>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="d-flex justify-content-center">
              <MDBCol lg="3" md="6" className="bg-grey">
                <MDBBtn
                  color="dark"
                  size="lg"
                  block
                  onClick={() => navigate(-1)}
                >
                  Go back to Cart
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBContainer>
      </section>
    </>
  );
}
