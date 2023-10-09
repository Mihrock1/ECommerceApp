import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { baseUrl } from "../shared/Constants";

function UpdateUser(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user] = useState(location.state.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const userUpdateInfo = {
      id: user.id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: newPassword,
    };

    fetch(baseUrl + "/Users/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.jwtToken,
      },
      body: JSON.stringify(userUpdateInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.statusCode === 200) {
          alert(data.message + ", redirecting to user dashboard...");
          navigate("/dashboard", { replace: true });
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err + ", redirecting to login...");
        navigate("/", { replace: true });
      });
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <h1 className="mb-4">Update User</h1>
      <div>
        <MDBInput
          wrapperClass="mb-4"
          label="First Name"
          id="firstName"
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Last Name"
          id="lastName"
          type="text"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Email"
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="New Password"
          id="newPassword"
          type="password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <MDBBtn className="mb-4" onClick={handleUpdateUser}>
        Update User
      </MDBBtn>
    </MDBContainer>
  );
}

export default UpdateUser;
