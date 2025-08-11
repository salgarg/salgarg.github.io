import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function PasswordProtected({ children, correctPassword = "saloniresume29" }) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <Container fluid className="password-section">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={6} lg={4}>
            <div className="password-card">
              <p className="password-subtitle">enter password</p>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="type password here"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="password-input"
                    autoFocus
                  />
                </Form.Group>
                
                {error && <div className="password-error">{error}</div>}
                
                <Button
                  type="submit"
                  variant="primary"
                  className="password-button w-100"
                  disabled={!password}
                >
                  see resume
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default PasswordProtected;