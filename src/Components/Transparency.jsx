// export default TokenTransactions;
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Table } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const TokenTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [totals, setTotals] = useState({
    budget: 0,
    health: 0,
    education: 0,
    development: 0,
  });

  const tokenAddress = "0x06BcB1800B1575ffa48DeFaeE3510333B282Db73"; // Token contract address
  const etherscanApiKey = "YOUR_ETHERSCAN_API_KEY"; // Replace with your Etherscan API key

  const COLORS = ["#ff6666", "#82ca9d", "#ffc658"];
  const walletRoles = {
    "0xdb9be34fb2c03102f36cd3f647fb2c1c9db3cc6f": "Central",
    "0x62a900ef7834b4d02e3ff730a93857f94a70c817": "Province 1",
    "0xb13a0a95c4bb2852748f260e42197804201fe3cd": "Province 2",
  };

  const subjects = ["Health", "Education", "Development"];
  const colors = ["#ff6666", "#82ca9d", "#ffc658"]; // Colors for pie chart segments

  const fetchTokenTransactions = async () => {
    const apiUrl = `https://api-testnet.bscscan.com/api?module=account&action=tokentx&contractaddress=${tokenAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${etherscanApiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.status === "1") {
        // Create an array with each subject repeated at least twice
        let subjectsList = [];
        subjects.forEach((subject) => {
          subjectsList.push(subject, subject); // Add each subject twice
        });

        // Shuffle the subjects array to randomize assignment
        subjectsList = subjectsList.sort(() => Math.random() - 0.5);

        const transactionsWithRoles = data.result.map((tx, index) => {
          const subject = subjectsList[index % subjectsList.length]; // Assign subject from the shuffled list

          return {
            ...tx,
            fromRole: walletRoles[tx.from.toLowerCase()] || "Unknown",
            toRole: walletRoles[tx.to.toLowerCase()] || "Unknown",
            subject: subject, // Assign the subject to the transaction
          };
        });

        setTransactions(transactionsWithRoles);

        const centralTransfers = transactionsWithRoles.filter(
          (tx) => tx.fromRole === "Central"
        );

        const provinceData = ["Province 1", "Province 2"].map((province) => {
          const provinceTransfers = centralTransfers.filter(
            (tx) => tx.toRole === province
          );

          const subjectTotals = subjects.reduce((acc, subject) => {
            acc[subject] = provinceTransfers
              .filter((tx) => tx.subject === subject)
              .reduce(
                (sum, tx) =>
                  sum + parseFloat(Web3.utils.fromWei(tx.value, "ether")),
                0
              );
            return acc;
          }, {});

          return {
            name: province,
            total: Object.values(subjectTotals).reduce((a, b) => a + b, 0),
            ...subjectTotals,
          };
        });

        const totals = {
          budget: centralTransfers.reduce(
            (sum, tx) =>
              sum + parseFloat(Web3.utils.fromWei(tx.value, "ether")),
            0
          ),
          health: provinceData.reduce((sum, p) => sum + p.Health, 0),
          education: provinceData.reduce((sum, p) => sum + p.Education, 0),
          development: provinceData.reduce((sum, p) => sum + p.Development, 0),
        };

        setRoleData(provinceData);
        setTotals(totals);
      } else {
        console.error("No token transactions found.");
      }
    } catch (error) {
      console.error("Error fetching token transactions:", error);
    }
  };

  useEffect(() => {
    fetchTokenTransactions();
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px 0",
        height: "auto",
        margin: "50px 0",
      }}
    >
      {/* Dashboard Cards */}
      <div
        className="dashboard"
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <div
          className="card"
          style={{
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            width: "200px",
            textAlign: "center",
          }}
        >
          <h4>Total Budget</h4>
          <p>{totals.budget.toFixed(2)} NPRX</p>
        </div>
        <div
          className="card"
          style={{
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            width: "200px",
            textAlign: "center",
          }}
        >
          <h4>Total Health</h4>
          <p>{totals.health.toFixed(2)} NPRX</p>
        </div>
        <div
          className="card"
          style={{
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            width: "200px",
            textAlign: "center",
          }}
        >
          <h4>Total Education</h4>
          <p>{totals.education.toFixed(2)} NPRX</p>
        </div>
        <div
          className="card"
          style={{
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            width: "200px",
            textAlign: "center",
          }}
        >
          <h4>Total Development</h4>
          <p>{totals.development.toFixed(2)} NPRX</p>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "20px 0",
          height: "auto",
          margin: "50px 0",
        }}
      >
        <h3 style={{ color: "white" }}>Transactions Summary</h3>

        {/* BarChart and PieCharts side by side */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <ResponsiveContainer width="50%" height={400}>
            <BarChart
              data={roleData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="total"
                fill="#8884d8"
                name="Total Amount Transferred"
              />
              <Bar dataKey="Education" fill="#82ca9d" name="Education Amount" />
              <Bar
                dataKey="Development"
                fill="#ffc658"
                name="Development Amount"
              />
              <Bar dataKey="Health" fill="#ff6666" name="Health Amount" />
            </BarChart>
          </ResponsiveContainer>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "50%",
            }}
          >
            {roleData.map((province, index) => (
              <div key={index} style={{ textAlign: "center", width: "45%" }}>
                <h5 style={{ color: "white", marginBottom: "10px" }}>
                  {province.name}
                </h5>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Education", value: province.Education },
                        { name: "Development", value: province.Development },
                        { name: "Health", value: province.Health },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label={({ name, value }) =>
                        `${name}: ${value.toFixed(2)} NPRX`
                      }
                    >
                      {COLORS.map((color, i) => (
                        <Cell key={i} fill={color} />
                      ))}
                    </Pie>
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      height={36}
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </div>

        {/* Table below the charts */}
        <Table
          bordered
          responsive
          variant="dark"
          className="text-white"
          style={{
            width: "75%",
            margin: "20px auto",
            border: "1px solid white",
            backgroundColor: "transparent",
            color: "white",
            borderCollapse: "collapse",
            borderSpacing: "0",
            padding: "20px",
          }}
        >
          <thead>
            <tr>
              <th>Hash</th>
              <th>From (Role)</th>
              <th>To (Role)</th>
              <th>Subject</th>
              <th>Amount (in NPR)</th>
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
                    style={{ textDecoration: "none", color: "#1E90FF" }}
                  >
                    {tx.hash.slice(0, 10)}...
                  </a>
                </td>
                <td>{tx.fromRole}</td>
                <td>{tx.toRole}</td>
                <td>{tx.subject}</td>
                <td>{Web3.utils.fromWei(tx.value, "ether")} NPRX</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TokenTransactions;
