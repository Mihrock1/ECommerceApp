import React, { useState, useEffect } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { MDBRow } from "mdb-react-ui-kit";
import CustomerList from "./CustomerList";
import { baseUrl } from "../Constants";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard(props) {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (props.user.type === "User") {
      alert("This page is not for users, Redirecting to login...");
      navigate("/", { replace: true });
    }

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
    <MDBContainer className="p-1 overflow-hidden">
      <MDBRow>
        <CustomerList
          user={props.user}
          jwtToken={props.jwtToken}
          products={products}
        />
      </MDBRow>
    </MDBContainer>
  );
}
