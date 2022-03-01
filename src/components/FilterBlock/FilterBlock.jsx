import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import "./FilterBlock.css";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../../context/ClientProvider";

const FilterBlock = () => {
  const search = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const { getProducts } = useContext(ClientContext);
  const [searchValue, setSearchValue] = useState(search.get("q") || "");
  const [categoryValue, setCategoryValue] = useState(
    search.get("category") || ""
  );
  const [priceValue, setPriceValue] = useState(search.get("price_lte") || "");

  const filterProducts = (key, value) => {
    search.set(key, value);
    let newPath = `${window.location.pathname}?${search.toString()}`;
    navigate(newPath);
    setSearchValue(search.get("q") || "");
    setCategoryValue(search.get("category") || "");
    setPriceValue(search.get("price_lte") || "");
    getProducts();
  };

  const resetFilter = () => {
    navigate("/catalog");
    setSearchValue("");
    setCategoryValue("");
    setPriceValue("");
    getProducts();
  };

  return (
    <div className="filters-block">
      <div>
        <TextField
          value={searchValue}
          variant="filled"
          label="Search"
          onChange={(e) => filterProducts("q", e.target.value)}
        ></TextField>
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel id="category-select">Category</InputLabel>
          <Select
            label="Category"
            labelId="category-select"
            value={categoryValue}
            onChange={(e) => filterProducts("category", e.target.value)}
          >
            <MenuItem value="Clothes">Clothes</MenuItem>
            <MenuItem value="Yoga mat">Yoga Mat </MenuItem>
            <MenuItem value="Bottle">Water bottle</MenuItem>
            <MenuItem value="Bag">Sport Bag</MenuItem>
            <MenuItem value="Fitness equipment">Fitness equipment</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Slider
          className="slider"
          value={priceValue}
          onChange={(e) => filterProducts("price_lte", e.target.value)}
          valueLabelDisplay="auto"
          max={100}
          step={1}
        />
      </div>
      <div>
        <Button onClick={resetFilter} variant="contained" color="success">
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FilterBlock;
