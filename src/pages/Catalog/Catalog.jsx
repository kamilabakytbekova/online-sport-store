import { Container, Grid } from "@mui/material";
import { React, useContext, useEffect } from "react";
import Cards from "../../components/Cards/Cards";
import FilterBlock from "../../components/FilterBlock/FilterBlock";
import ProductPagination from "../../components/Pagination/ProductPagination";
import { ClientContext } from "../../context/ClientProvider";

const Catalog = () => {
  const { getProducts, products } = useContext(ClientContext);

  useEffect(() => {
    getProducts();
  }, []);

  if (!products) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <Container>
        <FilterBlock />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {products.map((item) => (
            <Grid xs={6} sm={6} md={4} item>
              <Cards item={item} />
            </Grid>
          ))}
        </Grid>

        <ProductPagination />
      </Container>
    </div>
  );
};

export default Catalog;
