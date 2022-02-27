import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/NavBar/Navbar";
import ClientProvider from "./context/ClientProvider";
import Catalog from "./pages/Catalog/Catalog";
import MainPage from "./pages/MainPage/MainPage";
import AddProduct from "./pages/AddPage/AddProduct";
import AdminProvider from "./context/AdminProvider";
import AdminPage from "./pages/AdminPage/AdminPage";
import EditPage from "./pages/EditPage/EditPage";
import CartPage from "./pages/CartPage/CartPage";
import AuthProvider from "./context/AuthProvider";

const MyRoutes = () => {
  return (
    <AuthProvider>
      <AdminProvider>
        <ClientProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/admin-panel" element={<AdminPage />} />
              <Route path="/admin-panel/edit/:id" element={<EditPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ClientProvider>
      </AdminProvider>
    </AuthProvider>
  );
};

export default MyRoutes;
