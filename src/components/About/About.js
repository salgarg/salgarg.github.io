import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import aboutImg from "../../Assets/about.jpeg";
import Toolstack from "./Toolstack";
import SidebarNav from "../SidebarNav";

function About() {
  return (
    <>
      <SidebarNav />
      <Container fluid className="about-section">
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "left",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px"}}>
              a little bit about me... <strong className="green"></strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "30px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img 
              src={aboutImg} 
              alt="about" 
              className="img-fluid" 
              style={{ borderRadius: '15px' }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h1 className="project-heading">
              <strong> skills </strong>
            </h1>
            <Techstack />
          </Col>
          <Col md={6}>
            <h1 className="project-heading">
              <strong> tools </strong>
            </h1>
            <Toolstack />
          </Col>
        </Row>

        <Github />
      </Container>
    </Container>
    </>
  );
}

export default About;
