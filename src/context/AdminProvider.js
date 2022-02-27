import axios from "axios";
import React, { createContext, useReducer } from "react";
import { API } from "../helpers/const";

export const AdminContext = createContext();

const INIT_STATE = {
  products: null,
  productsToEdit: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_EDIT":
      return { ...state, productsToEdit: action.payload };
    default:
      return state;
  }
};

const AdminProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const addProduct = async (newProduct) => {
    try {
      await axios.post(API, newProduct);
    } catch (err) {
      console.log(err);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios(API);

      let action = {
        type: "GET_PRODUCTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      getProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const getProductToEdit = async (id) => {
    try {
      let response = await axios(`${API}/${id}`);

      let action = {
        type: "GET_EDIT",
        payload: response.data,
      };
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  const editProduct = async (edit) => {
    try {
      await axios.patch(`${API}/${edit.id}`, edit);
      getProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        addProduct,
        getProducts,
        deleteProduct,
        getProductToEdit,
        editProduct,
        productsToEdit: state.productsToEdit,
        products: state.products,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
