import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { baseUrl } from "./Constants";

function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const registrationInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    fetch(baseUrl + "/Users/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (String(data.statusCode).charAt(0) === "2") {
          alert(data.message + ", redirecting to login...");
          navigate("/", { replace: true });
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err + ", Redirecting to login...");
        navigate("/", { replace: true });
      });
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <h1 className="mb-4">Sign Up</h1>
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
        label="Email address"
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <MDBBtn className="mb-4" onClick={handleSubmit}>
        Register
      </MDBBtn>

      <div className="text-center">
        <p>
          Already a member? <Link to="/">Login</Link>
        </p>
      </div>
    </MDBContainer>
  );
}

export default Registration;
