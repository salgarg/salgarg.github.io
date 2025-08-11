import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            hello, i'm <span className="green">saloni garg! </span>
           <span className="green"> </span>
            <br />
            I am currently a product manager at SeatGeek.
            I graduated from the University of Illinois at Urbana-Champaign with a degree in computer engineering
            <br />
            <br />
            Apart from being a PM, I'm into...
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> photography
            </li>
            <li className="about-activity">
              <ImPointRight /> coffee
            </li>
            <li className="about-activity">
              <ImPointRight /> trying new restaurants
            </li>
            <li className="about-activity">
              <ImPointRight /> digital art
            </li>
            <li className="about-activity">
              <ImPointRight /> reading
            </li>
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
