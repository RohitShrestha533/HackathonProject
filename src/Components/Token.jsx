import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import "./Token.css";
import NOBG from "../images/nobglogo.png";

function Token() {
  const features = [
    {
      title: "1:1 With NPR",
      icon: "🔗",
      description:
        "Ensures that the digital currency is always equivalent to the Nepalese Rupee (NPR), providing stability and trust for users.",
    },
    {
      title: "Inside Wallet Only",
      icon: "📷",
      description:
        "Transactions and usage are restricted to the platform's wallet, enhancing security and simplifying money management.",
    },
    {
      title: "BlockChain Based",
      icon: "📲",
      description:
        "Built on blockchain technology, ensuring transparency, security, and traceability for all transactions.",
    },
  ];

  // Combined description
  const combinedDescription = `NPRX ensures that the digital currency is always equivalent to the Nepalese Rupee (NPR), providing stability and trust for users.
    Transactions and usage are restricted to the platform's wallet, enhancing security and simplifying money management.
    Built on blockchain technology, NPRX ensures transparency, security, and traceability for all transactions, making it a reliable and cutting-edge solution for Nepal's digital economy.`;

  return (
    <div className="tokenpage mb-4">
      <div className="tokenpage">
        <div className="tokentop">
          <Container className="justify-contain-center">
            <Row className="align-items-center justify-content-between">
              {/* Empty space (sm-2) */}
              <Col sm={1}></Col>

              {/* Text section (sm-4) */}
              <Col sm={5}>
                <div className="detailtoken ">
                  <h1>NPRX: Nepal's First Digital Currency</h1>
                  <p>{combinedDescription}</p>
                </div>
              </Col>
              <Col sm={1}></Col>

              {/* Logo section (sm-4) */}
              <Col sm={4}>
                <div
                  className="tokenimg"
                  style={{
                    display: "flex",
                    justifyContent: "center", // Centers the image horizontally
                    alignItems: "center", // Centers the image vertically
                    height: "100%", // Ensures vertical centering works
                  }}
                >
                  <img
                    src={NOBG}
                    alt="NPRX logo"
                    style={{
                      height: "300px", // Set the height you desire
                      width: "auto", // Maintain aspect ratio
                    }}
                  />
                </div>
              </Col>

              {/* Empty space (sm-2) */}
              <Col sm={1}></Col>
            </Row>
          </Container>
        </div>
      </div>

      <Container className=" mb-2">
        <Row className="justify-content-center">
          <div className=" container mb-5 justify-content-center">
            {" "}
            <h1>Token Features</h1>
          </div>

          {features.map((feature, index) => (
            <Col md={4} key={index} className="mb-4 d-flex">
              <Card className="tokenpage-card text-center flex-grow-1">
                <Card.Body>
                  <div className="tokenpage-icon mx-auto">{feature.icon}</div>
                  <Card.Title style={{ color: "white" }}>
                    {feature.title}
                  </Card.Title>
                  <Card.Text>{feature.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Token;
