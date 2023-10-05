import { MDBCardImage, MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { baseUrl } from "../Constants";

export default function OrderItems(props) {
  const [orderItems, setOrderItems] = useState([]);
  const [fetchOrderItems, setFetchOrderItems] = useState(true);

  const findProduct = (productId) => {
    return props.products.find((product) => product.id === productId);
  };

  function handleOrderCancellation() {
    fetch(baseUrl + "/Products/deleteOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.jwtToken,
      },
      body: JSON.stringify({ orderNo: props.order.orderNo }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.statusCode === 200) {
          alert(data.message);
          setFetchOrderItems(true);
          props.setFetchOrders(true);
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (fetchOrderItems) {
      fetch(baseUrl + "/Products/viewOrderItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.jwtToken,
        },
        body: JSON.stringify({ orderNo: props.order.orderNo }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.statusCode === 200) {
            setOrderItems(data.listOrderItems);
          } else {
            setOrderItems([]);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setFetchOrderItems(false);
        });
    }
  }, [fetchOrderItems, props.order]);

  useEffect(() => {}, [orderItems]);

  return (
    <>
      {orderItems.map((orderItem) => (
        <MDBRow key={orderItem.id}>
          <MDBCol md="2">
            <MDBCardImage
              className="img rounded mx-auto d-block mb-4"
              src={findProduct(orderItem.productId).imageUrl}
            />
          </MDBCol>
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <p className="text-muted mb-0">
              {findProduct(orderItem.productId).manufacturer}{" "}
              {findProduct(orderItem.productId).name}
            </p>
          </MDBCol>
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <p className="text-muted mb-0">
              Unit Price: {findProduct(orderItem.productId).unitPrice}
            </p>
          </MDBCol>
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <p className="text-muted mb-0">Quantity: {orderItem.quantity}</p>
          </MDBCol>
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <p className="text-muted mb-0">
              Discount: {findProduct(orderItem.productId).discount}%
            </p>
          </MDBCol>
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <p className="text-muted mb-0">
              Final Price: {orderItem.totalPrice}
            </p>
          </MDBCol>
          <hr
            className="mb-3"
            style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
          />
        </MDBRow>
      ))}
      <MDBRow className="d-flex justify-content-end">
        <MDBCol lg="3" md="12" className="bg-grey">
          <MDBBtn
            color="danger"
            size="lg"
            block
            onClick={handleOrderCancellation}
          >
            Cancel Order
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </>
  );
}
