import * as React from "react";
import "./AdminTable.css";
import { useContext, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AdminContext } from "../../context/AdminProvider";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function AdminTable() {
  const { getProducts, products, deleteProduct } = useContext(AdminContext);

  useEffect(() => {
    getProducts();
  }, []);

  if (!products) {
    return <h2>Loading...</h2>;
  }
  return (
    <TableContainer style={{ marginTop: "50px" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell id="table_head">Category</TableCell>
            <TableCell id="table_head">Name</TableCell>
            <TableCell id="table_head">Description</TableCell>
            <TableCell id="table_head">Image</TableCell>
            <TableCell id="table_head">Price</TableCell>
            <TableCell id="table_head"></TableCell>
            <TableCell id="table_head"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell id="table_body">{item.category}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.descr}</TableCell>
              <TableCell>
                <img width={80} src={item.image} alt="product-img" />
              </TableCell>
              <TableCell id="table_body">{item.price} $</TableCell>

              <TableCell>
                <Button
                  onClick={() => deleteProduct(item.id)}
                  color="error"
                  variant="outlined"
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell>
                <Link to={`/admin-panel/edit/${item.id}`}>
                  <Button color="warning" variant="outlined">
                    Edit
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
