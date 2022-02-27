import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { API } from "../helpers/const";

export const ClientContext = createContext();

const INIT_STATE = {
  products: null,
  cartCount: JSON.parse(localStorage.getItem("carts"))
    ? JSON.parse(localStorage.getItem("carts")).products.length
    : 0,
  carts: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_TO_CARTS":
      return { ...state, cartCount: action.payload };
    case "DELETE_FROM_CART":
      return { ...state, cartCount: action.payload };
    case "GET_CARTS":
      return { ...state, carts: action.payload };
    default:
      return state;
  }
};

const ClientProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProducts = async () => {
    try {
      const response = await axios(`${API}/${window.location.search}`);

      let action = {
        type: "GET_PRODUCTS",
        payload: response.data,
      };

      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  const productPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (state.products) {
      setPosts(state.products);
    }
  }, [state.products]);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = posts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalProductsCount = posts.length;

  const addToCart = (product) => {
    let carts = JSON.parse(localStorage.getItem("carts"));
    if (!carts) {
      carts = {
        products: [],
        totalPrice: 0,
      };
    }
    let productCart = {
      product: product,
      count: 1,
      subPrice: product.price,
    };
    carts.products.push(productCart);
    carts.totalPrice = carts.products.reduce((prev, item) => {
      return prev + +item.subPrice;
    }, 0);
    localStorage.setItem("carts", JSON.stringify(carts));
    let action = {
      type: "ADD_TO_CARTS",
      payload: carts.products.length,
    };

    dispatch(action);
  };

  const checkInCart = (id) => {
    let carts = JSON.parse(localStorage.getItem("carts"));
    if (!carts) {
      carts = {
        products: [],
      };
    }

    let check = carts.products.find((item) => {
      return item.product.id === id;
    });

    if (!check) {
      return false;
    } else {
      return true;
    }
  };

  const deleteFromCart = (id) => {
    let carts = JSON.parse(localStorage.getItem("carts"));
    carts.products = carts.products.filter((item) => {
      return item.product.id !== id;
    });
    carts.totalPrice = carts.products.reduce((prev, item) => {
      return prev + +item.subPrice;
    }, 0);
    localStorage.setItem("carts", JSON.stringify(carts));
    let action = {
      type: "DELETE_FROM_CART",
      payload: carts.products.length,
    };
    dispatch(action);
  };

  const getCarts = () => {
    let carts = JSON.parse(localStorage.getItem("carts"));
    if (!carts) {
      carts = {
        products: [],
        totalPrice: 0,
      };
    }
    let action = {
      type: "GET_CARTS",
      payload: carts,
    };
    dispatch(action);
  };

  const changeCount = (count, id) => {
    let carts = JSON.parse(localStorage.getItem("carts"));
    carts.products = carts.products.map((item) => {
      if (item.product.id === id) {
        item.count = count;
        item.subPrice = item.count * item.product.price;
        return item;
      } else {
        return item;
      }
    });
    carts.totalPrice = carts.products.reduce((prev, item) => {
      return prev + +item.subPrice;
    }, 0);
    localStorage.setItem("carts", JSON.stringify(carts));
    getCarts();
  };

  return (
    <ClientContext.Provider
      value={{
        getProducts,
        setCurrentPage,
        addToCart,
        checkInCart,
        deleteFromCart,
        changeCount,
        getCarts,
        totalProductsCount,
        productPerPage,
        currentPage,
        products: currentProduct,
        cartCount: state.cartCount,
        carts: state.carts,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
