import React, { useState } from "react";

// MUI Components
// import { Box, Button, Typography } from "@mui/material";

// // icons
import Dot from "../../../assets/images/templates/dot";
import ArrowDown from "../../../assets/images/templates/arrow-down";
import Button from '../../../components/GenericUIBlocks/Button'
import Typography from '../../../components/GenericUIBlocks/Typography'

// styles
import './styles.scss'

const TempCard = (props:any) => {
    // const { templates } = props;
  // state to track the side of the card (front or back) and the flip state
  const [side, setSide] = useState({
    side: "front",
    flip: false, // to track the flip state so if we want anything to be done on flip
  });

  // handler for Flip
  const handleFlip = () => {
    setSide((prevState) => {
      const newSide = prevState.side === "front" ? "back" : "front";
      return {
        ...prevState,
        flip: !prevState.flip,
        side: newSide,
      };
    });
  };

  // handler for checking frontside
  const sideValidate = (value:any) => {
    if (!side.side === value ) {
      return true;
    } else {
      handleFlip();
    }
  };

  // handler for setting color
  const colorSetter = (value:any) => {
    const result = side.side === value 
    ? { fill: "#FFFFFF" } : { fill: "#878585" };
    return result;
  };
  
  // handler for setting rotation
  const transformSetter = (value:any) => {
    const result = side.side === value
      ? { transform: "rotateY(0deg)" }
      : { transform: "rotateY(360deg)" };
    return result;
  };

 const tempHeight = "407";

  return (
    <>
      {Array.from({ length: 20 }, (_, index) => index).map((val) => {
        return (
          <div className="templateCard" key={val}
        //   style={{
        //     width: "485px",
        //   }}
          >
            <div className="templateImage">
              <img
                src={
                  side.side === "front"
                    ? `https://dummyimage.com/200x300`
                    : `https://via.placeholder.com/200x${tempHeight}`
                }
                // src={
                //   side.side === "front"
                //     ? val.thumbnailUrl
                //     : val.backThumbnailUrl
                // }
                // src={val.thumbnailUrl}
                height={tempHeight+"px"}
                alt="template"
                style={transformSetter("front")}
                loading="lazy"
              />
              <Button className="tempButton">Edit Template</Button>
              <div className="flipWrapper">
                <Dot
                  onClick={() => sideValidate("front")}
                  style={colorSetter("front")}
                />
                <Dot
                  onClick={() => sideValidate("back")}
                  style={colorSetter("back")}
                />
                <ArrowDown onClick={handleFlip} />
              </div>
            </div>
            <Typography className="templateName">Template Name</Typography>
            <Typography className="templateID">
              Template ID: {val}
            </Typography>
          </div>
        );
      })}
    </>
  );
};

export default TempCard;
