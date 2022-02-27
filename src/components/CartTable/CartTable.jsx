import React, { useContext, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ClientContext } from "../../context/ClientProvider";
import { Button, TableFooter } from "@mui/material";

const CartTable = () => {
  const { carts, getCarts, changeCount } = useContext(ClientContext);

  useEffect(() => {
    getCarts();
  }, []);

  if (!carts) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <TableContainer style={{ marginTop: "50px" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell id="table_head">Name</TableCell>
              <TableCell id="table_head">Image</TableCell>
              <TableCell id="table_head">Price</TableCell>
              <TableCell id="table_head">Count</TableCell>
              <TableCell id="table_head">Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carts.products.map((item) => (
              <TableRow
                key={item.product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell id="table_body">{item.product.name}</TableCell>
                <TableCell>
                  <img width={80} src={item.product.image} alt="product-img" />
                </TableCell>
                <TableCell>{item.product.price} $</TableCell>
                <TableCell align="right">
                  <input
                    type="number"
                    min="1"
                    value={item.count}
                    onChange={(e) => {
                      if (e.target.value < 1) {
                        return;
                      }
                      changeCount(e.target.value, item.product.id);
                    }}
                  />
                </TableCell>
                <TableCell align="right">{item.subPrice} $</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} align="right">
                <strong style={{ fontSize: 22 }}>Summary:</strong>
              </TableCell>
              <TableCell colSpan={1} align="right">
                <strong style={{ fontSize: 22 }}>{carts.totalPrice} $</strong>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <div className="order-button">
        <Button variant="contained" color="warning" style={{ marginTop: 50 }}>
          Order
        </Button>
      </div>
    </>
  );
};

export default CartTable;
