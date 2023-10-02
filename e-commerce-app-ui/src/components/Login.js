import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { baseUrl } from "./Constants";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginInfo = { email: email, password: password };

    fetch(baseUrl + "/Users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.statusCode === 200) {
          setUser(data.user);
          setIsRedirect(true);
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isRedirect) {
      if (user.type === "User") {
        navigate("/dashboard", { state: user, replace: false });
      } else if (user.type === "Admin") {
        navigate("/admindashboard", { state: user, replace: false });
      }
    }
  }, [isRedirect, navigate, user]);

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
