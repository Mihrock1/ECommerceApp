import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { baseUrl } from "../Constants";

export default function OrderItems(props) {
  const [orderItems, setOrderItems] = useState([]);

  const findProduct = (productId) => {
    return props.products.find((product) => product.id === productId);
  };

  useEffect(() => {
    fetch(baseUrl + "/Products/viewOrderItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderNo: props.order.orderNo }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.statusCode === 200) {
          setOrderItems(data.listOrderItems);
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.order]);

  return (
    <MDBCol lg="10" xl="8">
      <MDBCard style={{ borderRadius: "10px" }}>
        <MDBCardBody className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <p className="small text-muted mb-0">
              Order No : {props.order.orderNo}
            </p>
          </div>
        </MDBCardBody>
      </MDBCard>
      {orderItems.map((orderItem) => (
        <MDBCard style={{ borderRadius: "10px" }} key={orderItem.id}>
          {console.log(orderItem)}
          <MDBCardBody className="p-4">
            <MDBCard className="shadow-0 border mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md="2">
                    <MDBCardImage
                      src={findProduct(orderItem.productId).imageUrl}
                      fluid
                    />
                  </MDBCol>
                  <MDBCol
                    md="2"
                    className="text-center d-flex justify-content-center align-items-center"
                  >
                    <p className="text-muted mb-0">
                      {findProduct(orderItem.productId).name}
                    </p>
                  </MDBCol>
                  <MDBCol
                    md="2"
                    className="text-center d-flex justify-content-center align-items-center"
                  >
                    <p className="text-muted mb-0 small">
                      {findProduct(orderItem.productId).manufacturer}
                    </p>
                  </MDBCol>
                  <MDBCol
                    md="2"
                    className="text-center d-flex justify-content-center align-items-center"
                  >
                    <p className="text-muted mb-0 small">
                      Unit Price: {findProduct(orderItem.productId).unitPrice}
                    </p>
                  </MDBCol>
                  <MDBCol
                    md="2"
                    className="text-center d-flex justify-content-center align-items-center"
                  >
                    <p className="text-muted mb-0 small">
                      Quantity: {findProduct(orderItem.productId).quantity}
                    </p>
                  </MDBCol>
                  <MDBCol
                    md="2"
                    className="text-center d-flex justify-content-center align-items-center"
                  >
                    <p className="text-muted mb-0 small">
                      Discount: {findProduct(orderItem.productId).discount}%
                    </p>
                  </MDBCol>
                  <MDBCol
                    md="2"
                    className="text-center d-flex justify-content-center align-items-center"
                  >
                    <p className="text-muted mb-0 small">
                      Final Price: {orderItem.totalPrice}%
                    </p>
                  </MDBCol>
                </MDBRow>
                <hr
                  className="mb-4"
                  style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCardBody>
        </MDBCard>
      ))}
    </MDBCol>
  );
}
