import { Button, Container } from "@mui/material";
import "./DetailPage.css";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClientContext } from "../../context/ClientProvider";

const DetailPage = () => {
  const params = useParams();
  const { addToCart, checkInCart, deleteFromCart } =
    React.useContext(ClientContext);

  const { getDetail, detail } = useContext(ClientContext);

  useEffect(() => {
    getDetail(params.id);
  }, []);

  if (!detail) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <Container>
        <div className="detail-page">
          <div className="detail-left">
            <img
              style={{ marginTop: "50px", width: "450px" }}
              src={detail.image}
              alt="detail-img"
            />
          </div>
          <div className="detail-right">
            <h2>{detail.category}</h2>
            <ul>
              <li>{detail.name}</li>
              <li> {detail.descr}</li>
              <li id="price">Price: {detail.price}</li>
            </ul>

            {checkInCart(detail.id) ? (
              <Button
                onClick={() => deleteFromCart(detail.id)}
                style={{ marginTop: "40px", marginLeft: "45px" }}
                size="small"
                color="warning"
                variant="contained"
              >
                Added
              </Button>
            ) : (
              <Button
                onClick={() => addToCart(detail)}
                style={{ marginTop: "40px", marginLeft: "45px" }}
                size="small"
                color="warning"
                variant="contained"
              >
                Add
              </Button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DetailPage;
