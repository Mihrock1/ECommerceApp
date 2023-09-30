import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
} from "mdb-react-ui-kit";

function Product(props) {
  console.log(props);
  return (
    <MDBCard className="text-black">
      <MDBCardImage src={props.product.imageUrl} className='img rounded mx-auto d-block' />
      <MDBCardBody>
        <div className="text-center">
          <MDBCardTitle>{props.product.name}</MDBCardTitle>
          <p className="text-muted mb-4">{props.product.manufacturer}</p>
        </div>
        <div className="d-flex justify-content-between">
          <span>{props.product.unitPrice}</span>
          <span>{props.product.discount}</span>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}

export default Product;
