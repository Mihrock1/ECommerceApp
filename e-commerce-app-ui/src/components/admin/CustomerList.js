import {
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../Constants";

export default function CustomerList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user] = useState(location.state);
  const [fetchCustomerList, setFetchCustomerList] = useState(true);
  const [customerList, setCustomerList] = useState([]);

  function handleDeleteUser(userId) {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDeletion) {
      fetch(baseUrl + "/Admin/deleteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.statusCode === 200) {
            setFetchCustomerList(true);
          } else {
            alert(data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  }

  useEffect(() => {
    if (fetchCustomerList) {
      fetch(baseUrl + "/Admin/viewUsers", {
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
            setCustomerList(data.listUsers);
          } else {
            alert(data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setFetchCustomerList(false);
        });
    }
  }, [fetchCustomerList, user.id]);

  useEffect(() => {}, [customerList]);

  return (
    <MDBContainer className="p-4 overflow-hidden">
      {customerList.map((customer) => (
        <MDBRow key={customer.id}>
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <p className="text-muted mb-0">
              {customer.firstName + " " + customer.lastName}
            </p>
          </MDBCol>
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <p className="text-muted mb-0">{customer.email}</p>
          </MDBCol>
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <p className="text-muted mb-0">{customer.type}</p>
          </MDBCol>
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <p className="text-muted mb-0">Funds: {customer.fund}</p>
          </MDBCol>
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <p className="text-muted mb-0">Created: {customer.createdOn}</p>
          </MDBCol>
          <MDBCol
            md="2"
            className="text-center d-flex justify-content-center align-items-center"
          >
            <p className="text-muted mb-0">Status: {customer.accountStatus}</p>
          </MDBCol>
          <MDBCol md="1" lg="1" xl="1" className="text-end">
            <MDBBtn
              color="none"
              style={{ border: 0, backgroundColor: "#eee" }}
              onClick={() => handleDeleteUser(customer.id)}
            >
              <MDBIcon fas icon="times" size="lg" />
            </MDBBtn>
          </MDBCol>
          <hr
            className="mb-3"
            style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
          />
        </MDBRow>
      ))}
      <MDBRow className="p-4 overflow-hidden">
        <MDBCol className="gx-4 gy-4">
          <MDBBtn
            rounded
            className="mx-2"
            color="dark"
            size="lg"
            onClick={() => navigate(-1)}
          >
            Go back to Admin Dashboard
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
