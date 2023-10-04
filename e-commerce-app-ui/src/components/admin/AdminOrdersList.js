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
import { baseUrl } from "../Constants";
import OrderItems from "../users/OrderItems";

export default function AdminOrdersList(props) {
  const [fetchCustomerList, setFetchCustomerList] = useState(true);
  const [customerList, setCustomerList] = useState([]);
  const [orders, setOrders] = useState([]);
  const [fetchOrders, setFetchOrders] = useState(true);

  useEffect(() => {
    if (fetchCustomerList) {
      fetch(baseUrl + "/Admin/viewUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: props.user.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.statusCode === 200) {
            setCustomerList(data.listUsers);
          } else {
            alert(data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setFetchCustomerList(false);
        });
    }
  }, [fetchCustomerList, props.user.id]);

  useEffect(() => {}, [customerList]);

  useEffect(() => {
    if (fetchOrders) {
      fetch(baseUrl + "/Products/viewOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: props.user.id }),
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
  }, [fetchOrders, props.user]);

  useEffect(() => {}, [orders]);

  return (
    <MDBContainer className="py-1 h-100">
      <MDBTypography tag="h4" className="text-muted mb-2">
        List of all Customer Orders
      </MDBTypography>
    </MDBContainer>
  );
}
