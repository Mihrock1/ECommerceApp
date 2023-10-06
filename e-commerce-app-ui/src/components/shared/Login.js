import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useAuth } from "../../hooks/useAuth";
import { baseUrl } from "./Constants";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { setUser, setJwtToken, setIsAuthenticated } = useAuth();
  var userType = "";

  async function login() {
    const credentials = { email: email, password: password };
    await fetch(baseUrl + "/Users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setJwtToken(data.token);
        setUser(data.user);
        userType = data.user.type;

        setIsAuthenticated(true);

        if (userType === "User") {
          navigate("/dashboard", { replace: false });
        } else if (userType === "Admin") {
          navigate("/admindashboard", { replace: false });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Your account status is 'Pending' with Admin");
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <h1 className="mb-4">Login</h1>
      <MDBInput
        wrapperClass="mb-4"
        label="Email address"
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="password"
        type="password"
        required
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />

      <MDBBtn className="mb-4" onClick={handleSubmit}>
        Sign in
      </MDBBtn>

      <div className="text-center">
        <p>
          Not a member? <Link to="/registration">Sign Up</Link>
        </p>
      </div>
    </MDBContainer>
  );
}

export default Login;
