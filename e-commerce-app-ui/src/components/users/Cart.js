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
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../Constants";

export default function Cart(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(props.user);
  const [products] = useState(location.state.products);
  const [cartItems, setCartItems] = useState([]);
  const [fetchCartItems, setFetchCartItems] = useState(true);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (user.fund - totalCost() >= 0 && cartItems.length > 0) {
      fetch(baseUrl + "/Products/placeOrder", {
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
            alert(data.message);
          } else {
            alert(data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err + ", Redirecting to login...");
          navigate("/", { replace: true });
        })
        .finally(() => {
          setFetchCartItems(true);
        });
    } else if (cartItems.length === 0) {
      alert("No items in cart");
    } else {
      alert("Insufficient Funds");
    }
  };

  const handleGoToMyOrders = (e) => {
    e.preventDefault();
    navigate("/myorders", {
      state: { user: props.user, products },
      replace: false,
    });
  };

  function handleCartItemUpdateMinusButton(cartItem) {
    if (cartItem.quantity !== 1) {
      const newCartItem = {
        userId: cartItem.userId,
        productId: cartItem.productId,
        quantity: cartItem.quantity - 1,
      };

      updateCartItemsFunction(newCartItem);
    }
  }

  function handleCartItemUpdate(e, cartItem) {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem.quantity !== parseInt(e.target.value)) {
      const newCartItem = {
        userId: cartItem.userId,
        productId: cartItem.productId,
        quantity: parseInt(e.target.value),
      };

      updateCartItemsFunction(newCartItem);
    }
  }

  function handleCartItemUpdatePlusButton(cartItem) {
    const newCartItem = {
      userId: cartItem.userId,
      productId: cartItem.productId,
      quantity: cartItem.quantity + 1,
    };

    updateCartItemsFunction(newCartItem);
  }

  function updateCartItemsFunction(newCartItem) {
    fetch(baseUrl + "/Products/updateCartItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.jwtToken,
      },
      body: JSON.stringify(newCartItem),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.statusCode === 200) {
          setFetchCartItems(true);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err + ", Redirecting to login...");
        navigate("/", { replace: true });
      });
  }

  function handleDeleteCartItem(cartItemId) {
    fetch(baseUrl + "/Products/deleteCartItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.jwtToken,
      },
      body: JSON.stringify({ id: cartItemId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.statusCode === 200) {
          setFetchCartItems(true);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err + ", Redirecting to login...");
        navigate("/", { replace: true });
      });
  }

  useEffect(() => {
    if (props.user.type === "Admin") {
      alert("This page is not for admin, Redirecting to login...");
      navigate("/", { replace: true });
    }

    if (fetchCartItems) {
      fetch(baseUrl + "/Products/viewCartItems", {
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
            setCartItems(data.listCartItems);
          } else {
            setCartItems([]);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err + ", Redirecting to login...");
          navigate("/", { replace: true });
        })
        .finally(async () => {
          fetch(baseUrl + "/Users/viewUser", {
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
                setUser(data.user);
              }
            })
            .catch((err) => {
              console.log(err);
              alert(err + ", Redirecting to login...");
              navigate("/", { replace: true });
            })
            .finally(() => {
              setFetchCartItems(false);
            });
        });
    }
  }, [fetchCartItems, navigate, props, setUser, user]);

  const noOfItems = () => {
    let noOfItems = 0;
    cartItems.map((cartItem) => (noOfItems += cartItem.quantity));
    return noOfItems;
  };

  const totalCost = () => {
    let totalCost = 0;
    cartItems.map((cartItem) => (totalCost += cartItem.totalPrice));
    return totalCost;
  };

  const fetchProduct = (productId) => {
    let product;
    location.state.products.map((prod) =>
      prod.id === productId ? (product = prod) : null
    );
    return product;
  };

  useEffect(() => {}, [cartItems, props]);

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

                      {cartItems.map((cartItem) => (
                        <MDBRow
                          className="mb-4 d-flex justify-content-between align-items-center"
                          key={cartItem.id}
                        >
                          <MDBCol md="2" lg="2" xl="2">
                            <MDBCardImage
                              src={fetchProduct(cartItem.productId).imageUrl}
                              fluid
                              className="img rounded-3 mx-auto d-block"
                            />
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3">
                            <MDBTypography tag="h6" className="text-muted">
                              {fetchProduct(cartItem.productId).manufacturer}
                            </MDBTypography>
                            <MDBTypography tag="h6" className="text-black mb-0">
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
                              <MDBIcon
                                fas
                                icon="minus"
                                onClick={(e) =>
                                  handleCartItemUpdateMinusButton(cartItem)
                                }
                              />
                            </MDBBtn>

                            <MDBInput
                              type="number"
                              min="1"
                              value={cartItem.quantity}
                              onChange={(e) =>
                                handleCartItemUpdate(e, cartItem)
                              }
                            />

                            <MDBBtn color="link" className="px-2">
                              <MDBIcon
                                fas
                                icon="plus"
                                onClick={(e) =>
                                  handleCartItemUpdatePlusButton(cartItem)
                                }
                              />
                            </MDBBtn>
                          </MDBCol>
                          <MDBCol md="3" lg="2" xl="2" className="text-end">
                            <MDBTypography tag="h6" className="mb-0">
                              {cartItem.totalPrice}
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="1" lg="1" xl="1" className="text-end">
                            <MDBBtn
                              color="none"
                              style={{ border: 0, backgroundColor: "#eee" }}
                              onClick={() => handleDeleteCartItem(cartItem.id)}
                            >
                              <MDBIcon fas icon="times" size="lg" />
                            </MDBBtn>
                          </MDBCol>
                        </MDBRow>
                      ))}

                      <hr className="my-4" />

                      <div className="pt-5">
                        <MDBTypography tag="h6" className="mb-0">
                          <MDBCardText tag="a" className="text-body">
                            <MDBBtn
                              rounded
                              className="mx-2"
                              color="dark"
                              size="lg"
                              onClick={() => navigate(-1, { replace: true })}
                            >
                              Go to Dashboard
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
                        Available Funds: {user.fund}
                      </MDBTypography>

                      <hr className="my-4" />

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

                      <MDBBtn
                        color="dark"
                        block
                        size="lg"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </MDBBtn>

                      <hr className="my-4" />

                      <MDBBtn
                        outline
                        color="dark"
                        size="lg"
                        block
                        onClick={handleGoToMyOrders}
                      >
                        Go to My Orders
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
