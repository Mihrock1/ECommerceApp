import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    window.localStorage.setItem("email", email);
    window.localStorage.setItem("password", password);

    setIsRedirect(true);
  };

  useEffect(() => {
    if (isRedirect) {
      navigate("/dashboard", { replace: true });
    }
  }, [isRedirect, navigate]);

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
