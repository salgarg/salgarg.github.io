import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hello, I'm <span className="green">Saloni Garg! </span>
           <span className="green"> </span>
            <br />
            I am currently a Product Manager at SeatGeek.
            I graduated from the University of Illinois at Urbana-Champaign with a degree in Computer Engineering
            <br />
            <br />
            Apart from being a PM, I'm into...
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Photography
            </li>
            <li className="about-activity">
              <ImPointRight /> Coffee
            </li>
            <li className="about-activity">
              <ImPointRight /> Trying New Restaurants
            </li>
            <li className="about-activity">
              <ImPointRight /> Digital Art
            </li>
            <li className="about-activity">
              <ImPointRight /> Reading
            </li>
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
