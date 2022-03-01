import { Container } from "@mui/material";
import "./DetailPage.css";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClientContext } from "../../context/ClientProvider";

const DetailPage = () => {
  const params = useParams();

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
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DetailPage;
