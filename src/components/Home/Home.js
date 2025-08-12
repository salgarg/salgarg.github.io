import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
// import Particle from "../Particle";
// import Home2 from "./Home2";
import Type from "./Type";
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineCamera,
  AiOutlineFormatPainter,
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";

function Home() {
  return (
    <section>
      {/* Minimal SG header (replaces Navbar brand) */}
      <header
        style={{
          position: "fixed",
          top: 12,
          left: 16,
          fontWeight: 700,
          letterSpacing: "0.08em",
          zIndex: 1000,
          color: "white",
          fontSize: 25
        }}
      >
        SG
      </header>

      <Container fluid className="home-section" id="home">
        <Container className="home-content">
          <div className="home-inner">
            {/* Navigation above text - All breakpoints */}
            <Row>
              <Col xs={12}>
                <div className="home-links home-links-top" style={{ marginBottom: 40 }}>
                  <nav aria-label="Primary top">
                    <ul
                      style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <li>
                        <Link to="/" className="home-link">
                          <AiOutlineHome />
                        </Link>
                      </li>
                      <li>
                        <Link to="/about" className="home-link">
                          <AiOutlineUser />
                        </Link>
                      </li>
                      <li>
                        <Link to="/resume" className="home-link">
                          <CgFileDocument />
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Col>
            </Row>

            <Row className="align-items-center">
              {/* Main content */}
              <Col md={12} className="home-header">
                <h1 style={{ paddingBottom: 15 }} className="heading">
                  hi there!{" "}
                  <span className="wave" role="img" aria-labelledby="wave">
                    👋🏻
                  </span>
                </h1>

                <h1 className="heading-name">
                  i'm<strong className="main-name"> saloni garg</strong>
                </h1>

                <div className="typewrap">
                  <Type />
                </div>
              </Col>
            </Row>

            {/* Navigation below text - All breakpoints */}
            <Row>
              <Col xs={12}>
                <div className="home-links home-links-bottom" style={{ marginTop: 40 }}>
                  <nav aria-label="Primary bottom">
                    <ul
                      style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <li>
                        <Link to="/photography" className="home-link">
                          <AiOutlineCamera />
                        </Link>
                      </li>
                      <li>
                        <Link to="/digitalartgallery" className="home-link">
                          <AiOutlineFormatPainter />
                        </Link>
                      </li>
                      <li>
                        <Link to="/bookshelf" className="home-link">
                          <AiOutlineBook />
                        </Link>
                      </li>
                      <li>
                        <Link to="/projects" className="home-link">
                          <AiOutlineFundProjectionScreen />
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </Container>
    </section>
  );
}

export default Home;