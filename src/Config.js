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
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "muncipalities",
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
