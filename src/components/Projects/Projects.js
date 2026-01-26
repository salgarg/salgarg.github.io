import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SidebarNav from "../SidebarNav";
import ProjectCard from "./ProjectCards";
import "./Projects.css";
import boot from "../../Assets/Projects/boot.png";
import jobmatcher from "../../Assets/Projects/thumbnailjobmatcher.png";

function Projects() {
  return (
    <>
      <SidebarNav />
      <Container fluid className="project-section">
        <Container>
          <h1 className="project-heading">
            projects
          </h1>
          <Row style={{ justifyContent: "center", paddingBottom: "15px" }}>

            <Col md={4} className="project-card">
              <ProjectCard
                isBlog={false}
                imgPath = {boot}
                title="Remotely Adjustable Cast"
                description=""
                ghLink="https://github.com/salgarg/ece445"
                demoLink="http://www.youtube.com/embed/M744uEvvWck"
              />
            </Col>
            <Col md={4} className="project-card">
              <ProjectCard
                isBlog={false}
                imgPath = {jobmatcher}
                title="Vibe Coded Job Matcher"
                description=""
                ghLink="https://github.com/salgarg/vibecode-jobmatcher"
                demoLink="https://youtu.be/Q2UitryZogk"
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Projects;
