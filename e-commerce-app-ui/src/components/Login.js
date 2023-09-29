import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { baseUrl } from "./Constants";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isRedirect, setIsRedirect] = React.useState(false);
  const [user, setUser] = React.useState({"id": "", "firstName": "", "lastName": "", 
  "email": "", "type": "", "fund": "", "createdOn": ""});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginInfo = { email, password };

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
          setUser({"id": data.user.id, "firstName": data.user.firstName, "lastName": data.user.lastName, 
          "email": data.user.email, "type": data.user.type, "fund": data.user.fund, "createdOn": data.user.createdOn});
          setIsRedirect(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isRedirect) {
      if (user.type === "User") {
        navigate("/dashboard", {state: {user}, replace: false});
      } else if (user.type === "Admin") {
        navigate("/admindashboard", {state: {user}, replace: false});
      }
    }
  }, [isRedirect, navigate, user]);

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
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
          Not a member? <Link to="/registration">Register</Link>
        </p>
      </div>
    </MDBContainer>
  );
}

export default Login;
