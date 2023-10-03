import React from "react";
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";

export default function Navbar() {
  return (
    <>
      <MDBNavbar light bgColor="light">
        <MDBContainer fluid className="d-flex justify-content-center">
          <MDBNavbarBrand tag="span" md="6" className="mb-0 h1">
            ECommerce App
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
