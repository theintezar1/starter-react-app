import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { textColor } from "../../Color.Config";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  let pic = localStorage.getItem("userPhoto");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {
    name,
    allegrie,
    image,
    desc,
    ing1,
    ing2,
    mainIng,
    medicalCond,
    deficency,
  } = props;

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: "330px",
        minHeight: "320px",
        position: "relative",
      }}
    >
      {/* <p
        style={{
          padding: "10px",
          color: textColor,
          fontSize: "14px",
          backgroundColor: "green",
          textAlign: "justify",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace:"nowrap"
        }}
      >
        {name}
      </p> */}
      <p
  style={{
    padding: "10px",
    color: textColor,
    fontSize: "14px",
    color: "#504f6b",
    lineHeight: "20px",
    textAlign: "justify",
    whiteSpace: "nowrap", // Set whiteSpace to nowrap
    overflow: "hidden",
    textOverflow: "ellipsis",
    position: "relative", // Add position relative for pseudo elements
  }}
>
  {name}
  <span
    style={{
      position: "absolute", // Add position absolute to pseudo elements
      top: 0,
      right: "-20px", // Adjust the spacing between dots as needed
      content: '""',
      display: "block",
      width: "10px",
      height: "100%",
      background: "white", // Set the background color to match the background of your UI
    }}
  ></span>
  <span
    style={{
      position: "absolute", // Add position absolute to pseudo elements
      top: 0,
      left: "-20px", // Adjust the spacing between dots as needed
      content: '""',
      display: "block",
      width: "10px",
      height: "100%",
      background: "white", // Set the background color to match the background of your UI
    }}
  ></span>
</p>

      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <p
          style={{
            fontSize: "13px",
            lineHeight: "20px",
            color: "#504f6b",
            margintop: "0",
            textAlign: "justify",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {desc}
        </p>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="share"
          sx={{ position: "absolute", top: "190px", right: "10px" }}
        >
          <a
            style={{ paddin: "0", display: "flex", alignItems: "center" }}
            href="https://www.youtube.com/watch?v=3Vf5_St-DEo"
          >
            <YouTubeIcon sx={{ color: "red" }} />
          </a>
        </IconButton>
        <ExpandMore
          sx={{ position: "absolute", bottom: "0px", right: "0px" }}
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography>Main Ingdrients: {mainIng}</Typography>
          <Typography>2nd Ingdrients: {ing1}</Typography>
          <Typography>3nd Ingdrients: {ing2}</Typography>
          <Typography>Allergy: {allegrie}</Typography>
          <Typography>Deficency: {deficency}</Typography>
          <Typography>Medical: {medicalCond}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
