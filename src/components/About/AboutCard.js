import React from "react";
import Card from "react-bootstrap/Card";
import {
  AiOutlineHome,
  AiOutlineBook,
  AiOutlineCamera,
  AiOutlineFormatPainter,
  AiOutlineCoffee,
} from "react-icons/ai";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "left" }}>
            hello, i'm <span className="green">saloni garg! </span>
           <span className="green"> </span>
            <br />
            I am currently a Product Manager at SeatGeek.
            I graduated from the University of Illinois at Urbana-Champaign with a degree in computer engineering
            <br />
            <br />
            Apart from being a PM, I'm into...
          </p>
          <ul>
            <li className="about-activity">
              <AiOutlineCamera /> photography
            </li>
            <li className="about-activity">
              <AiOutlineCoffee /> coffee
            </li>
            <li className="about-activity">
              <AiOutlineHome /> trying new restaurants
            </li>
            <li className="about-activity">
              <AiOutlineFormatPainter /> digital art
            </li>
            <li className="about-activity">
              <AiOutlineBook /> reading
            </li>
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
