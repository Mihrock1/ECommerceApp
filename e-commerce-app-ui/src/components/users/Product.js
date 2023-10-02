import React, { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { baseUrl } from "../Constants";

function Product(props) {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (quantity !== 0) {
      const productInfo = {
        userId: props.userId,
        productId: props.product.id,
        quantity: quantity,
      };
      console.log(JSON.stringify(productInfo));

      fetch(baseUrl + "/Products/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <MDBCard className="text-black">
      <MDBCardImage
        src={props.product.imageUrl}
        className="img rounded mx-auto d-block"
      />
      <MDBCardBody>
        <div className="text-center">
          <MDBCardTitle>{props.product.name}</MDBCardTitle>
          <p className="text-muted mb-4">{props.product.manufacturer}</p>
        </div>
        <div className="d-flex justify-content-between">
          <span>Price</span>
          <span>{props.product.unitPrice}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Discount</span>
          <span>{props.product.discount}%</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Select Quantity</span>
          <span>
            <MDBBtn
              rounded
              outline
              color="dark"
              onClick={() => {
                if (quantity !== 0) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              -
            </MDBBtn>
          </span>
          <span>{quantity}</span>
          <span>
            <MDBBtn
              rounded
              outline
              color="dark"
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              +
            </MDBBtn>
          </span>
        </div>
        <div className="d-flex justify-content-between">
          <MDBBtn rounded outline color="dark" onClick={handleAddToCart}>
            Add to Cart
          </MDBBtn>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}

export default Product;
