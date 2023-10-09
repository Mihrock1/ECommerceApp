import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import { baseUrl } from "../shared/Constants";

function AddFunds(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user] = useState(location.state.user);
  const [addAmount, setAddAmount] = useState(0);

  const handleAddFunds = (e) => {
    e.preventDefault();

    const addAmountInfo = {
      id: user.id,
      fund: addAmount,
    };

    fetch(baseUrl + "/Users/addFunds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.jwtToken,
      },
      body: JSON.stringify(addAmountInfo),
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
      <h1 className="mb-4">Add Funds</h1>
      <MDBTypography>Current Balance: {user.fund}</MDBTypography>
      <div>
        <MDBInput
          wrapperClass="mb-4"
          label="Add Amount"
          id="addAmount"
          type="number"
          step=".01"
          required
          value={addAmount}
          onChange={(e) => setAddAmount(e.target.value)}
        />
      </div>
      <MDBBtn className="mb-4" onClick={handleAddFunds}>
        Add Funds
      </MDBBtn>
    </MDBContainer>
  );
}

export default AddFunds;
