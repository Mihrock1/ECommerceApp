import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import { baseUrl } from "../Constants";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";

export default function AdminDashboard() {
  const location = useLocation();

  const [user] = useState(location.state);
  const [isRedirect, setIsRedirect] = useState(false);

  const navigate = useNavigate();

  const handleViewCustomers = (e) => {
    e.preventDefault();

    setIsRedirect(true);
  };

  useEffect(() => {
    if (isRedirect) {
      navigate("/customers", { state: user, replace: false });
    }
  }, [isRedirect, navigate, user]);

  //   useEffect(() => {
  //     fetch(baseUrl + "/Products/viewProducts", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ id: user.id }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         if (data.statusCode === 200) {
  //           //   setProducts(data.listProducts);
  //         } else {
  //           alert(data.message);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, [user.id]);

  return (
    <MDBContainer className="p-4 overflow-hidden">
      <MDBRow className="p-4 overflow-hidden">
        <MDBCol className="gx-4 gy-4">
          <MDBBtn
            rounded
            className="mx-2"
            color="dark"
            size="lg"
            onClick={handleViewCustomers}
          >
            View Customers
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
