import React, { useEffect, useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import CustomerList from "./CustomerList";
import ProductList from "./ProductList";
import { baseUrl } from "../shared/Constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AdminDashboard(props) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    fetch(baseUrl + "/Products/viewProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.jwtToken,
      },
      body: JSON.stringify({ id: props.user.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (String(data.statusCode).charAt(0) === "2") {
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
  }, [navigate, props]);

  return (
    <MDBContainer className="overflow-hidden">
      <MDBRow className="p-1 overflow-hidden">
        <MDBCol className="gx-2 gy-2">
          <MDBBtn
            rounded
            className="mx-2"
            color="danger"
            size="lg"
            onClick={() => logout()}
          >
            Logout
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <CustomerList
          user={props.user}
          jwtToken={props.jwtToken}
          products={products}
        />
      </MDBRow>
      <MDBRow>
        <ProductList user={props.user} jwtToken={props.jwtToken} />
      </MDBRow>
    </MDBContainer>
  );
}
