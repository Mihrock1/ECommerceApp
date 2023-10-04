import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MDBContainer } from "mdb-react-ui-kit";
import { MDBRow } from "mdb-react-ui-kit";
import CustomerList from "./CustomerList";
import { baseUrl } from "../Constants";

export default function AdminDashboard() {
  const location = useLocation();
  const [user] = useState(location.state);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(baseUrl + "/Products/viewProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      });
  }, [user.id]);

  return (
    <MDBContainer className="p-1 overflow-hidden">
      <MDBRow>
        <CustomerList user={user} products={products} />
      </MDBRow>
    </MDBContainer>
  );
}
