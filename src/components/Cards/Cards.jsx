import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { ClientContext } from "../../context/ClientProvider";

export default function Cards(props) {
  const { addToCart, checkInCart, deleteFromCart } =
    React.useContext(ClientContext);
  return (
    <Container>
      <Card
        style={{ marginTop: "50px", width: "18rem", height: "500px" }}
        sx={{ position: "relative", maxWidth: 345 }}
      >
        <CardMedia
          component="img"
          height="200"
          image={props.item.image}
          alt="green iguana"
          style={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.item.descr.length > 250 ? (
              <>{props.item.descr.slice(0, 200)}</>
            ) : (
              <>{props.item.descr}</>
            )}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {props.item.price} $
          </Typography>
        </CardContent>
        <CardActions
          sx={{ position: "absolute", bottom: "10 px", left: "10px" }}
        >
          {checkInCart(props.item.id) ? (
            <Button onClick={() => deleteFromCart(props.item.id)} size="small">
              Added
            </Button>
          ) : (
            <Button onClick={() => addToCart(props.item)} size="small">
              Add
            </Button>
          )}

          <Button size="small">Details</Button>
        </CardActions>
      </Card>
    </Container>
  );
}
