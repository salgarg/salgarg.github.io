import React from "react";
import { Container, Row } from "react-bootstrap";
import previousCover from "../Assets/Books/daisyjones.jpg";
import nowCover from "../Assets/Books/exceptional.jpg"; // You'll need to add this image
import nextCover from "../Assets/Books/yellowface.jpg";

function Bookshelf() {
  return (
    <Container className="bookshelf">
      <Row className="book-row">
        <div className="book">
          <h3 className="book-status-title">Previous</h3>
          <img src={previousCover} alt="Previous Book" />
        </div>
        <div className="book">
          <h3 className="book-status-title">Now</h3>
          <img src={nowCover} alt="Now Reading" />
        </div>
        <div className="book">
          <h3 className="book-status-title">Next</h3>
          <img src={nextCover} alt="Next Book" />
        </div>
      </Row>
    </Container>
  );
}

export default Bookshelf;
