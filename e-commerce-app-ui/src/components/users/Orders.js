import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardHeader,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../Constants";
import OrderItems from "./OrderItems";

export default function Orders() {
  const location = useLocation();
  const [user] = useState(location.state.user);
  const [products] = useState(location.state.products);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
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
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <>
      <section
        className="h-100 gradient-custom"
        style={{ backgroundColor: "#eee" }}
      >
        <MDBContainer className="py-5 h-100">
          <MDBCard style={{ borderRadius: "10px" }}>
            <MDBCardHeader className="px-4 py-5">
              <MDBTypography tag="h5" className="text-muted mb-0">
                Thanks for your Orders,
                <span style={{ color: "#a8729a" }}>{user.firstName}</span>!
              </MDBTypography>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>
                  Receipts of all orders received:-
                </p>
              </div>
            </MDBCardHeader>
          </MDBCard>
          {orders.map((order) => (
            <MDBRow
              className="justify-content-center align-items-center h-100"
              key={order.orderNo}
            >
              <OrderItems order={order} products={products} />
            </MDBRow>
          ))}
        </MDBContainer>
      </section>
    </>
  );
}
