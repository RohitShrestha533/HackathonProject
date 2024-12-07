import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Account() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const fetchWalletDetails = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const accountBalance = await web3.eth.getBalance(accounts[0]);
        setAccount(accounts[0]);
        setBalance(web3.utils.fromWei(accountBalance, "ether"));
        await fetchTransactions(accounts[0]);
      } catch (error) {
        console.error("Error fetching wallet details:", error);
      }
    }
  };

  const fetchTransactions = async (walletAddress) => {
    const etherscanApiKey = "YourEtherscanAPIKey"; // Replace with your actual API key
    const apiUrl = `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${etherscanApiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.status === "1") {
        setTransactions(data.result);
      } else {
        console.error("No transactions found.");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchWalletDetails();
  }, []);

  return (
    <Container
      className="mt-5 pt-0 text-white"
      style={{
        height: "auto",
        width: "100vw",
        color: "white",
      }}
    >
      <Row>
        <Col>
          <h1>Account Details</h1>
          {account ? (
            <>
              <div>
                <p>
                  <span>Wallet Address:</span> {account}
                </p>
                <p>
                  <span>Balance:</span> {balance} BNB
                </p>
              </div>

              <div>
                <h1>Transaction History</h1>
                {transactions.length > 0 ? (
                  <Table
                    bordered
                    responsive
                    variant="dark"
                    className="text-white"
                  >
                    <thead>
                      <tr>
                        <th>Hash</th>
                        <th>Block</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx.hash}>
                          <td>
                            <a
                              href={`https://testnet.bscscan.com/tx/${tx.hash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "none",
                                color: "#1E90FF",
                              }}
                            >
                              {tx.hash.slice(0, 10)}...
                            </a>
                          </td>
                          <td>{tx.blockNumber}</td>
                          <td>{tx.from.slice(0, 10)}...</td>
                          <td>{tx.to.slice(0, 10)}...</td>
                          <td>{Web3.utils.fromWei(tx.value, "ether")} BNB</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>No transactions found.</p>
                )}
              </div>
            </>
          ) : (
            <p>Loading wallet details...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Account;
