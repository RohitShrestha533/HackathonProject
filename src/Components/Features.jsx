import React from "react";
import "./Features.css";
import { Container, Card, Row, Col, Button } from "react-bootstrap";

function Features() {
  const features = [
    {
      title: "NPR-Pegged Stablecoin",
      description:
        "A stable currency that ensures 1:1 value with the Nepalese Rupee, providing reliability and trust.",
      buttonText: "Learn More",
      buttonLink: "#",
      icon: "🔗",
    },
    {
      title: "Blockchain Transparency",
      description:
        "Track every transaction in real-time with complete transparency using our integration with BSCScan API.",
      buttonText: "Get Started",
      buttonLink: "#",
      icon: "📷",
    },
    {
      title: "Decentralized & Secure",
      description:
        "No intermediaries, no corruption. All transactions are stored on the Binance Smart Chain, making it impossible to tamper with.",
      buttonText: "Download App",
      buttonLink: "#",
      icon: "📲",
    },
  ];

  return (
    <div className="features-section text-white">
      <Container>
        <Row className="justify-content-center">
          {features.map((feature, index) => (
            <Col md={4} key={index} className="mb-4 d-flex">
              <Card className="feature-card text-center flex-grow-1">
                <Card.Body>
                  <div className="feature-icon mx-auto">{feature.icon}</div>
                  <Card.Title style={{ color: "white" }}>
                    {feature.title}
                  </Card.Title>
                  <Card.Text>{feature.description}</Card.Text>
                  <Button href={feature.buttonLink} className="feature-button">
                    {feature.buttonText} →
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Features;
