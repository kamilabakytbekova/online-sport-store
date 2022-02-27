import * as React from "react";
import { useState, useEffect, useContext } from "react";
import "./AddProduct.css";
import TextField from "@mui/material/TextField";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@mui/material";
import { AdminContext } from "../../context/AdminProvider";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../../context/ClientProvider";

export default function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    descr: "",
    price: "",
    category: "",
    image: "",
  });

  const { addProduct } = useContext(AdminContext);
  const { getProducts } = useContext(ClientContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in newProduct) {
      if (!newProduct[key]) {
        alert("Заполните все поля!");
        return;
      }
    }
    addProduct(newProduct);
    getProducts();
    navigate("/catalog");

    setNewProduct({
      name: "",
      descr: "",
      price: "",
      category: "",
      image: "",
    });
  };

  return (
    <Container>
      <div className="add-page">
        <div className="add-form">
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              value={newProduct.name}
              required
              id="standard-required"
              label="Name"
              variant="standard"
            />

            <TextField
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              value={newProduct.price}
              required
              id="standard-required"
              label="Price"
              variant="standard"
            />
            <TextField
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              value={newProduct.image}
              required
              id="standard-required"
              label="Image"
              variant="standard"
            />

            <TextareaAutosize
              onChange={(e) =>
                setNewProduct({ ...newProduct, descr: e.target.value })
              }
              value={newProduct.descr}
              minRows={3}
            />
            <FormControl style={{ margin: "10px 0px" }} fullWidth>
              <InputLabel id="category-select">Category</InputLabel>
              <Select
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                value={newProduct.category}
                label="Select category"
                labelId="category-select"
              >
                <MenuItem value="Clothes">Clothes</MenuItem>
                <MenuItem value="Yoga mat">Yoga Mat </MenuItem>
                <MenuItem value="Bottle">Water bottle</MenuItem>
                <MenuItem value="Bag">Sport Bag</MenuItem>
                <MenuItem value="Fitness equipment">Fitness equipment</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained">
              Add Product
            </Button>
          </form>
        </div>
        <img
          src="https://i.pinimg.com/564x/3b/63/9f/3b639f7243cf4103191c3179f5e14c94.jpg"
          alt=""
        />
      </div>
    </Container>
  );
}
