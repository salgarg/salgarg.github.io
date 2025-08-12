import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SidebarNav from "../SidebarNav";
import ProjectCard from "./ProjectCards";
import boot from "../../Assets/Projects/boot.png";

function Projects() {
  return (
    <>
      <SidebarNav />
      <Container fluid className="project-section">
        <Container>
          <h1 className="project-heading">
            projects
          </h1>
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>

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
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Projects;
