import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { baseUrl } from "../shared/Constants";

function AddProduct(props) {
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [unitPrice, setUnitPrice] = useState(0.0);
  const [discount, setDiscount] = useState(0.0);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productAddInfo = {
      admin: {
        id: props.user.id,
      },
      product: {
        name: name,
        manufacturer: manufacturer,
        unitPrice: unitPrice,
        discount: discount,
        imageUrl: imageUrl,
      },
    };

    fetch(baseUrl + "/Admin/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.jwtToken,
      },
      body: JSON.stringify(productAddInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (String(data.statusCode).charAt(0) === "2") {
          alert(data.message + ", redirecting to admin dashboard...");
          navigate("/admindashboard", { replace: true });
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
      <h1 className="mb-4">Add a new Product</h1>
      <div>
        <MDBInput
          wrapperClass="mb-4"
          label="Name"
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Manufacturer"
          id="manufacturer"
          type="text"
          required
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Unit Price"
          id="unitPrice"
          type="number"
          step=".01"
          required
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Discount"
          id="discount"
          type="number"
          step=".01"
          required
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Image Url"
          id="imageUrl"
          type="url"
          required
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <MDBBtn className="mb-4" onClick={handleAddProduct}>
        Add Product
      </MDBBtn>
    </MDBContainer>
  );
}

export default AddProduct;
