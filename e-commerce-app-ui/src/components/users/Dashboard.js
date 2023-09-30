import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { baseUrl } from "../Constants";

export default function Dashboard() {
  const location = useLocation();
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const userId = {"id": location.state.id};

    fetch(baseUrl + "/Products/viewProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userId),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.statusCode === 200) {
            setProducts(data.listProducts);
            console.log(products);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state.id]);

  return (
    <MDBContainer fluid>
      <MDBRow className="justify-content-center mb-0">
        <MDBCol md="12" xl="10">
            
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
