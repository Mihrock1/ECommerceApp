import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { baseUrl } from "../shared/Constants";
import { useAuth } from "../../hooks/useAuth";

function UpdateProduct(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  useMemo(() => {
    if (location.state === null) {
      alert("You can't access this page directly, Logging Out...");
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [product] = useState(location.state.product);
  const [name, setName] = useState(product.name);
  const [manufacturer, setManufacturer] = useState(product.manufacturer);
  const [unitPrice, setUnitPrice] = useState(product.unitPrice);
  const [discount, setDiscount] = useState(product.discount);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const productUpdateInfo = {
      admin: {
        id: props.user.id,
      },
      product: {
        id: product.id,
        name: name,
        manufacturer: manufacturer,
        unitPrice: unitPrice,
        discount: discount,
        imageUrl: imageUrl,
      },
    };

    fetch(baseUrl + "/Admin/updateProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.jwtToken,
      },
      body: JSON.stringify(productUpdateInfo),
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
      <h1 className="mb-4">Update Product</h1>
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
      <MDBBtn className="mb-4" onClick={handleUpdateProduct}>
        Update Product
      </MDBBtn>
    </MDBContainer>
  );
}

export default UpdateProduct;
