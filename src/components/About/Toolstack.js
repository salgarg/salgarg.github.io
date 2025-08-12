import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiSlack,
  SiVercel,
  SiMacos,
  SiFigma,
  SiGoogledrive,
  SiMixpanel,
  SiDatadog,
  SiLooker,
} from "react-icons/si";
import { TbBrandMixpanel } from "react-icons/tb";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} sm={4} md={3} className="tech-icons">
        <SiFigma />
      </Col>
      <Col xs={4} sm={4} md={3} className="tech-icons">
        <SiSlack />
      </Col>
      <Col xs={4} sm={4} md={3} className="tech-icons">
        <SiVisualstudiocode />
      </Col>
      <Col xs={4} sm={4} md={3} className="tech-icons">
        <SiMixpanel />
      </Col>
      <Col xs={4} sm={4} md={3} className="tech-icons">
        <SiDatadog/>
      </Col>
      <Col xs={4} sm={4} md={3} className="tech-icons">
        <SiLooker/>
      </Col>
    </Row>
  );
}

export default Toolstack;
