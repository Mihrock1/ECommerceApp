import {
  MDBTypography,
  MDBBtn,
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../shared/Constants";

export default function ProductList(props) {
  const navigate = useNavigate();
  const [fetchProducts, setFetchProducts] = useState(true);
  const [products, setProducts] = useState([]);

  function handleAddProduct(product) {
    console.log(product);
    navigate("/addproduct", {
      replace: false,
    });
  }

  function handleUpdateProduct(product) {
    console.log(product);
    navigate("/updateproduct", {
      state: { product: product },
      replace: false,
    });
  }

  function handleDeleteProduct(product) {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this Product?"
    );

    const deleteRequestBody = {
      admin: { id: props.user.id },
      product: { id: product.id },
    };

    if (confirmDeletion) {
      fetch(baseUrl + "/Admin/deleteProduct", {
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
            setFetchProducts(true);
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
    if (fetchProducts) {
      fetch(baseUrl + "/Products/viewProducts", {
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
            setProducts(data.listProducts);
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
          setFetchProducts(false);
        });
    }
  }, [fetchProducts, navigate, props]);

  return (
    <MDBContainer className="h-100">
      <MDBTypography tag="h4" className="text-muted mb-2">
        List of all Products
      </MDBTypography>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Image Url</th>
            <th scope="col">Name</th>
            <th scope="col">Manufacturer</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Discount</th>
            <th scope="col">Update Product</th>
            <th scope="col">Delete Product</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <p className="fw-normal mb-1">
                  {
                    <img
                      className="img rounded mx-auto d-block"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  }
                </p>
              </td>
              <td>
                <div className="ms-3">
                  <p className="fw-bold mb-1">{product.name}</p>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{product.manufacturer}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">${product.unitPrice}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{product.discount}%</p>
              </td>

              <td>
                <MDBBtn
                  color="warning"
                  rounded
                  onClick={() => handleUpdateProduct(product)}
                >
                  Update
                </MDBBtn>
              </td>
              <td>
                <MDBBtn
                  color="danger"
                  rounded
                  onClick={() => handleDeleteProduct(product)}
                >
                  Delete
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <MDBRow className="pb-5 overflow-hidden">
        <MDBCol className="gx-4 gy-4">
          <MDBBtn
            rounded
            className="mx-2"
            color="dark"
            size="lg"
            onClick={handleAddProduct}
          >
            Add New Product
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
