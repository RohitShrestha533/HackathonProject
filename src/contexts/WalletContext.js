import React, { createContext, useState, useEffect, useContext } from "react";
import Web3 from "web3";

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(localStorage.getItem("walletAccount"));
  const [balance, setBalance] = useState(localStorage.getItem("walletBalance"));

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        const accountBalance = await web3.eth.getBalance(accounts[0]);

        const walletAddress = accounts[0];
        const walletBalance = web3.utils.fromWei(accountBalance, "ether");

        setAccount(walletAddress);
        setBalance(walletBalance);

        // Save to localStorage
        localStorage.setItem("walletAccount", walletAddress);
        localStorage.setItem("walletBalance", walletBalance);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert(
        "MetaMask is not installed. Please install MetaMask to use this feature."
      );
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    localStorage.removeItem("walletAccount");
    localStorage.removeItem("walletBalance");
    alert("Wallet disconnected!");
  };

  useEffect(() => {
    // Restore wallet on app load if it was previously connected
    if (account) {
      connectWallet();
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{ account, balance, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};
