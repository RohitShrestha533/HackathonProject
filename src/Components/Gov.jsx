import React, { useState, useEffect } from "react";
import Web3 from "web3";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Contract Address and ABI
const contractAddress = "0x06BcB1800B1575ffa48DeFaeE3510333B282Db73";
const abi = [
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "central",
    outputs: [{ internalType: "address", name: "", type: "address" }],
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "province1",
    outputs: [{ internalType: "address", name: "", type: "address" }],
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "province2",
    outputs: [{ internalType: "address", name: "", type: "address" }],
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const Gov = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [addresses, setAddresses] = useState([]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        const accountBalance = await web3.eth.getBalance(accounts[0]);

        setAccount(accounts[0]);
        setBalance(web3.utils.fromWei(accountBalance, "ether"));
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to continue.");
    }
  };

  const fetchAddresses = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abi, contractAddress);

      const central = await contract.methods.central().call();
      const province1 = await contract.methods.province1().call();
      const province2 = await contract.methods.province2().call();

      setAddresses([
        { name: "Central", address: central },
        { name: "Province 1", address: province1 },
        { name: "Province 2", address: province2 },
      ]);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const transferTokens = async () => {
    if (!recipient || !amount) {
      alert("Please enter recipient address and amount.");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abi, contractAddress);
      const valueInWei = web3.utils.toWei(amount.toString(), "ether");

      const receipt = await contract.methods
        .transfer(recipient, valueInWei)
        .send({
          from: account,
          gas: 200000,
        });

      console.log("Transaction successful:", receipt);
      alert("Tokens transferred successfully!");
    } catch (error) {
      console.error("Error transferring tokens:", error);
      alert("Transaction failed.");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      connectWallet();
      fetchAddresses();
    }
  }, []);

  return (
    <Container className="mt-5 mb-5 ">
      <Row className="mb-5"></Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="govcard p-4" style={{ background: "#1A1D30" }}>
            <Card.Body>
              <Card.Title className="text-center text-white">
                Smart Contract Interaction
              </Card.Title>
              {!account ? (
                <Button
                  variant="success"
                  className="w-100 mt-4"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </Button>
              ) : (
                <>
                  <Alert variant="info" className="text-center">
                    <strong>Connected Account:</strong> {account}
                  </Alert>
                  <Alert variant="secondary" className="text-center">
                    <strong>Balance:</strong> {balance} BNB
                  </Alert>
                  <h5 className="mt-4 text-white">Transfer NPRX</h5>
                  <Form>
                    <Form.Group className="mb-3 text-white">
                      <Form.Label>Select Recipient</Form.Label>
                      <Form.Select
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                      >
                        <option value="">Choose an address</option>
                        {addresses.map((addr, index) => (
                          <option key={index} value={addr.address}>
                            {addr.name} ({addr.address})
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 text-white">
                      <Form.Label>Amount in NPRX</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={transferTokens}
                    >
                      Transfer
                    </Button>
                  </Form>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Gov;
