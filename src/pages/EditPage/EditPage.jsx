import * as React from "react";
import { useState, useEffect, useContext } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

export default function AddProduct() {
  const params = useParams();

  const { productsToEdit, getProductToEdit, editProduct } =
    useContext(AdminContext);

  const [edit, setEdit] = useState(productsToEdit);

  const navigate = useNavigate();

  useEffect(() => {
    setEdit(productsToEdit);
  }, [productsToEdit]);

  useEffect(() => {
    getProductToEdit(params.id);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in edit) {
      if (!edit[key]) {
        alert("Заполните все поля!");
        return;
      }
    }
    editProduct(edit);
    navigate("/admin-panel");
  };

  if (!edit) {
    return <h2>Loading...</h2>;
  }
  return (
    <Container>
      <div className="add-page">
        <div className="add-form">
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => setEdit({ ...edit, name: e.target.value })}
              value={edit.name}
              required
              id="standard-required"
              label="Name"
              variant="standard"
            />

            <TextField
              onChange={(e) => setEdit({ ...edit, price: e.target.value })}
              value={edit.price}
              required
              id="standard-required"
              label="Price"
              variant="standard"
            />
            <TextField
              onChange={(e) => setEdit({ ...edit, image: e.target.value })}
              value={edit.image}
              required
              id="standard-required"
              label="Image"
              variant="standard"
            />

            <TextareaAutosize
              onChange={(e) => setEdit({ ...edit, descr: e.target.value })}
              value={edit.descr}
              minRows={3}
            />
            <FormControl style={{ margin: "10px 0px" }} fullWidth>
              <InputLabel id="category-select">Category</InputLabel>
              <Select
                onChange={(e) => setEdit({ ...edit, category: e.target.value })}
                value={edit.category}
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
            <Button type="submit" variant="contained" color="success">
              Save Changes
            </Button>
          </form>
        </div>
        <img
          src="https://i.pinimg.com/564x/2d/6e/c7/2d6ec77564bf212835b06964185253b9.jpg"
          alt=""
        />
      </div>
    </Container>
  );
}
