import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useWallet } from "../contexts/WalletContext"; // Import the custom wallet hook
import { useState, useEffect } from "react";
import "./Nav.css";

function Navs() {
  const { account, balance, connectWallet, disconnectWallet } = useWallet(); // Use context
  const navigate = useNavigate();
  const [role, setRole] = useState("User");

  // Predefined addresses for different roles
  const central = "0xDb9Be34Fb2C03102f36CD3F647fB2c1C9dB3Cc6f";
  const province1 = "0x62A900ef7834B4D02E3fF730a93857F94a70c817";
  const province2 = "0xb13A0a95c4bb2852748f260E42197804201Fe3cD";
  const loginverify = (account) => {
    if (account.toLowerCase() === central.toLowerCase()) {
      setRole("Central");
    } else if (account.toLowerCase() === province1.toLowerCase()) {
      setRole("Province 1");
    } else if (account.toLowerCase() === province2.toLowerCase()) {
      setRole("Province 2");
    } else {
      setRole("User"); // Default role
    }
  };
  // Call loginverify whenever account changes
  useEffect(() => {
    if (account) {
      loginverify(account);
    }
  }, [account]);
  return (
    <Navbar fixed="top" className="custom-navbar">
      <Container>
        <Navbar.Brand href="/">Defix X</Navbar.Brand>
        <Nav className="nav-links mx-auto">
          <Nav.Link href="/token">Token</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/gov-funding">Government Funding</Nav.Link>
          <Nav.Link href="/transparency">Transparency</Nav.Link>
          <Nav.Link href="/support">Support</Nav.Link>
        </Nav>
        <Form className="d-flex justify-content-end">
          {/* Dropdown Button */}
          <Dropdown>
            <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
              {account ? `Welcome ${role}` : "Connect Wallet"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {!account ? (
                <Dropdown.Item onClick={connectWallet}>
                  Connect Wallet
                </Dropdown.Item>
              ) : (
                <>
                  <Dropdown.Item>
                    <strong>Balance:</strong> {balance} BNB
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/account")}>
                    View Account Details
                  </Dropdown.Item>
                  <Dropdown.Item onClick={disconnectWallet}>
                    Disconnect Wallet
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Container>
    </Navbar>
  );
}

export default Navs;
