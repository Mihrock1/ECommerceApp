import React, { useEffect, useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { MDBRow } from "mdb-react-ui-kit";
import CustomerList from "./CustomerList";
import ProductList from "./ProductList";
import { baseUrl } from "../shared/Constants";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard(props) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

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
  }, [navigate, props]);

  return (
    <>
      <MDBContainer className="overflow-hidden">
        <MDBRow>
          <CustomerList
            user={props.user}
            jwtToken={props.jwtToken}
            products={products}
          />
        </MDBRow>
      </MDBContainer>
      <MDBContainer className="overflow-hidden">
        <MDBRow>
          <ProductList user={props.user} jwtToken={props.jwtToken} />
        </MDBRow>
      </MDBContainer>
    </>
  );
}
