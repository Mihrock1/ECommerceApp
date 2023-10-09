import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTypography,
} from "mdb-react-ui-kit";
import { baseUrl } from "../shared/Constants";
import Product from "../shared/Product";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard(props) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(props.user);
  const { logout } = useAuth();

  function changeTimeFormat(createdOn) {
    createdOn = new Date(createdOn);
    let year = createdOn.getFullYear();
    let month = createdOn.getMonth() + 1;
    month = "" + month;
    if (!month.charAt(1)) {
      month = "0" + month;
    }
    let day = createdOn.getDate();
    day = "" + day;
    if (!day.charAt(1)) {
      day = "0" + day;
    }
    let date = year + "-" + month + "-" + day;
    let hour = createdOn.getHours();
    if (hour < 12) {
      var meridiem = "AM";
      if (hour === 0) {
        hour = 12;
      }
    } else {
      // eslint-disable-next-line no-redeclare
      var meridiem = "PM";
      if (hour > 12) {
        hour = hour - 12;
      }
    }
    hour = "" + hour;
    if (!hour.charAt(1)) {
      hour = "0" + hour;
    }
    let minute = createdOn.getMinutes();
    minute = "" + minute;
    if (!minute.charAt(1)) {
      minute = "0" + minute;
    }
    let second = createdOn.getSeconds();
    second = "" + second;
    if (!second.charAt(1)) {
      second = "0" + second;
    }
    let time = hour + ":" + minute + ":" + second + " " + meridiem;

    return date + " " + time;
  }

  const handleGoToCart = (e) => {
    e.preventDefault();
    navigate("/cart", {
      state: { user: user, products: products },
      replace: false,
    });
  };

  const handleUpdateUserDetails = (e) => {
    e.preventDefault();
    navigate("/updateuser", { state: { user: user }, replace: false });
  };

  const handleAddFunds = (e) => {
    e.preventDefault();
    navigate("/addfunds", { state: { user: user }, replace: false });
  };

  useEffect(() => {
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
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err + ", Redirecting to login...");
        navigate("/", { replace: true });
      })
      .then(() => {
        fetch(baseUrl + "/Products/viewProducts", {
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
              setProducts(data.listProducts);
            } else {
              alert(data.message);
            }
          })
          .catch((err) => {
            console.log(err);
            alert(err + ", Redirecting to login...");
            navigate("/", { replace: true });
          });
      });
  }, [navigate, props.jwtToken, user.id]);

  return (
    <>
      <MDBContainer className="p-4 overflow-hidden">
        <MDBTypography tag="h4" className="text-muted mb-2">
          User Details
        </MDBTypography>
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Type</th>
              <th scope="col">Funds</th>
              <th scope="col">Created On</th>
              <th scope="col">Account Status</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            <tr>
              <td>
                <div className="ms-3">
                  <p className="fw-bold mb-1">{user.firstName}</p>
                </div>
              </td>
              <td>
                <div className="ms-3">
                  <p className="fw-bold mb-1">{user.lastName}</p>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{user.email}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{user.type}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{user.fund}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">
                  {changeTimeFormat(user.createdOn)}
                </p>
              </td>
              <td>
                <p className="fw-normal mb-1">{user.accountStatus}</p>
              </td>
            </tr>
          </MDBTableBody>
        </MDBTable>
        <MDBRow className="p-1 overflow-hidden">
          <MDBCol className="gx-2 gy-2">
            <MDBBtn
              rounded
              className="mx-2"
              color="dark"
              size="lg"
              onClick={handleUpdateUserDetails}
            >
              Update User Info
            </MDBBtn>
          </MDBCol>
          <MDBCol className="gx-2 gy-2">
            <MDBBtn
              rounded
              className="mx-2"
              color="dark"
              size="lg"
              onClick={handleAddFunds}
            >
              Add Funds
            </MDBBtn>
          </MDBCol>
          <MDBCol className="gx-2 gy-2">
            <MDBBtn
              rounded
              className="mx-2"
              color="dark"
              size="lg"
              onClick={() => logout()}
            >
              Logout
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBTypography tag="h4" className="text-muted my-3">
        Browse Products
      </MDBTypography>
      <MDBContainer className="p-3 overflow-hidden">
        <MDBRow className="gx-4 gy-4">
          {products.map((product) => (
            <MDBCol md="4" key={product.id}>
              <Product
                product={product}
                userId={user.id}
                jwtToken={props.jwtToken}
              />
            </MDBCol>
          ))}
        </MDBRow>
        <MDBRow className="p-2 overflow-hidden">
          <MDBCol className="gx-4 gy-4">
            <MDBBtn
              rounded
              className="mx-2"
              color="dark"
              size="lg"
              onClick={handleGoToCart}
            >
              Go to Cart
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
