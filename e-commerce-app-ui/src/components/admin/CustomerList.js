import {
  MDBTypography,
  MDBBtn,
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../Constants";

export default function CustomerList(props) {
  const navigate = useNavigate();
  const [fetchCustomerList, setFetchCustomerList] = useState(true);
  const [customerList, setCustomerList] = useState([]);

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

  function handleUserActivation(customer, admin) {
    const activateRequestBody = {
      customer: { id: customer.id },
      admin: { id: admin.id },
    };

    fetch(baseUrl + "/Admin/activateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.jwtToken,
      },
      body: JSON.stringify(activateRequestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.statusCode === 200) {
          alert(data.message);
          setFetchCustomerList(true);
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err + ", Redirecting to login...");
        navigate("/", { replace: true });
      });
  }

  function handleViewOrders(customer) {
    console.log(customer);
    navigate("/myorders", {
      state: { user: customer, products: props.products },
      replace: false,
    });
  }

  function handleDeleteUser(customer, admin) {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this user?"
    );

    const deleteRequestBody = {
      customer: { id: customer.id },
      admin: { id: admin.id },
    };

    if (confirmDeletion) {
      fetch(baseUrl + "/Admin/deleteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.jwtToken,
        },
        body: JSON.stringify(deleteRequestBody),
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
          alert(err + ", Redirecting to login...");
          navigate("/", { replace: true });
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
          Authorization: "Bearer " + props.jwtToken,
        },
        body: JSON.stringify({ id: props.user.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.statusCode === 200) {
            setCustomerList(
              data.listUsers.filter((user) => user.type === "User")
            );
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
          setFetchCustomerList(false);
        });
    }
  }, [fetchCustomerList, navigate, props]);

  useEffect(() => {}, [customerList]);

  return (
    <MDBContainer className="py-3 h-100">
      <MDBTypography tag="h4" className="text-muted mb-2">
        List of all registered Customers
      </MDBTypography>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Type</th>
            <th scope="col">Funds</th>
            <th scope="col">Created On</th>
            <th scope="col">Account Status</th>
            <th scope="col">Activate User</th>
            <th scope="col">Orders</th>
            <th scope="col">Delete User</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {customerList.map((customer) => (
            <tr key={customer.id}>
              <td>
                <div className="ms-3">
                  <p className="fw-bold mb-1">
                    {customer.firstName + " " + customer.lastName}
                  </p>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{customer.email}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{customer.type}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{customer.fund}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">
                  {changeTimeFormat(customer.createdOn)}
                </p>
              </td>
              <td>
                <p className="fw-normal mb-1">{customer.accountStatus}</p>
              </td>

              <td>
                <MDBBtn
                  color="success"
                  rounded
                  onClick={() => handleUserActivation(customer, props.user)}
                >
                  Activate
                </MDBBtn>
              </td>
              <td>
                <MDBBtn
                  color="warning"
                  rounded
                  onClick={() => handleViewOrders(customer)}
                >
                  View
                </MDBBtn>
              </td>
              <td>
                <MDBBtn
                  color="danger"
                  rounded
                  onClick={() => handleDeleteUser(customer, props.user)}
                >
                  Delete
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}
