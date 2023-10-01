import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Cart() {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.state);

  const noOfItems = () => {
    let noOfItems = 0;
    location.state.cartItems.map(
      (cartItem) => (noOfItems += cartItem.quantity)
    );
    return noOfItems;
  };

  const totalCost = () => {
    let totalCost = 0;
    location.state.cartItems.map(
      (cartItem) => (totalCost += cartItem.totalPrice)
    );
    return totalCost;
  };

  const fetchProduct = (productId) => {
    let product;
    location.state.products.map((prod) =>
      prod.id === productId ? (product = prod) : null
    );
    return product;
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol size="12">
            <MDBCard
              className="card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <MDBCardBody className="p-0">
                <MDBRow className="g-0">
                  <MDBCol lg="8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <MDBTypography
                          tag="h1"
                          className="fw-bold mb-0 text-black"
                        >
                          Shopping Cart
                        </MDBTypography>
                        <MDBTypography className="mb-0 text-muted">
                          {noOfItems()} items
                        </MDBTypography>
                      </div>

                      <hr className="my-4" />

                      <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                        {location.state.cartItems.map((cartItem) => (
                          <>
                            <MDBCol md="2" lg="2" xl="2">
                              <MDBCardImage
                                src={fetchProduct(cartItem.productId).imageUrl}
                                fluid
                                className="img rounded-3 mx-auto d-block"
                              />
                            </MDBCol>
                            <MDBCol md="3" lg="3" xl="3">
                              <MDBTypography tag="h6" className="text-muted">
                                {fetchProduct(cartItem.productId).manufaacturer}
                              </MDBTypography>
                              <MDBTypography
                                tag="h6"
                                className="text-black mb-0"
                              >
                                {fetchProduct(cartItem.productId).name}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol
                              md="3"
                              lg="3"
                              xl="3"
                              className="d-flex align-items-center"
                            >
                              <MDBBtn color="link" className="px-2">
                                <MDBIcon fas icon="minus" />
                              </MDBBtn>

                              <MDBInput
                                type="number"
                                min="0"
                                defaultValue={1}
                                size="sm"
                              />

                              <MDBBtn color="link" className="px-2">
                                <MDBIcon fas icon="plus" />
                              </MDBBtn>
                            </MDBCol>
                            <MDBCol md="3" lg="2" xl="2" className="text-end">
                              <MDBTypography tag="h6" className="mb-0">
                                {cartItem.totalPrice}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol md="1" lg="1" xl="1" className="text-end">
                              <a href="#!" className="text-muted">
                                <MDBIcon fas icon="times" />
                              </a>
                            </MDBCol>
                          </>
                        ))}
                      </MDBRow>

                      <hr className="my-4" />

                      <div className="pt-5">
                        <MDBTypography tag="h6" className="mb-0">
                          <MDBCardText tag="a" className="text-body">
                            <MDBBtn
                              rounded
                              className="mx-2"
                              color="dark"
                              size="lg"
                              onClick={() => navigate(-1)}
                            >
                              Back to Dashboard
                            </MDBBtn>
                          </MDBCardText>
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol lg="4" className="bg-grey">
                    <div className="p-5">
                      <MDBTypography
                        tag="h3"
                        className="fw-bold mb-5 mt-2 pt-1"
                      >
                        Summary
                      </MDBTypography>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <MDBTypography tag="h5" className="text-uppercase">
                          no of items:
                        </MDBTypography>
                        <MDBTypography tag="h5">{noOfItems()}</MDBTypography>
                      </div>
                      <div className="d-flex justify-content-between mb-5">
                        <MDBTypography tag="h5" className="text-uppercase">
                          total price
                        </MDBTypography>
                        <MDBTypography tag="h5">${totalCost()}</MDBTypography>
                      </div>

                      <MDBBtn color="dark" block size="lg">
                        Place Order
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
