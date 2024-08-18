import React, { useEffect, useState } from "react";
import { primary_color } from "../../constants";
import { Button } from "../ui/button";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export default function WalletCard() {
  const [accounts, setAccounts] = useState(0);
  const [publicKey, setPublicKey] = useState("");
  const [currentAccount, setCurrentAccount] = useState(0);

  const [balance, setBalance] = useState(0);

  const fetchBalance = async (key: string) => {
    const url =
      "https://solana-devnet.g.alchemy.com/v2/FTVhm9J81YMr36MnogkAxgl5IyBCdr1_"; // Replace with your actual RPC endpoint
    const requestData = {
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [key],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Balance data:", data.result.context.value);
      setBalance(data.result.value / 1000000000);
      // Process the data as needed
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };
  const fetchInfo = async (key: string) => {
    const url =
      "https://solana-devnet.g.alchemy.com/v2/FTVhm9J81YMr36MnogkAxgl5IyBCdr1_"; // Replace with your actual RPC endpoint
    const requestData = {
      jsonrpc: "2.0",
      id: 1,
      method: "getAccountInfo",
      params: [key],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Info data:", data);
      // setBalance(data.result.value / 1000000000);
      // Process the data as needed
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    const publicKeys = localStorage.getItem("public");
    // const account = localStorage.getItem("account") as string;
    const publicKeyArray: [string] = publicKeys && JSON.parse(publicKeys);
    setAccounts(publicKeyArray.length - 1);

    const publicKey = publicKeyArray[currentAccount];
    fetchBalance(publicKey);
    fetchInfo(publicKey);
    setPublicKey(publicKey);
  }, [currentAccount]);

  const shortenKey = (key: string) => {
    if (key.length <= 16) return key;
    return `${key.substring(0, 8)}..${key.substring(key.length - 8)}`;
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(publicKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  };

  const addNewWallet = async () => {
    const newAccount = accounts + 1;
    const mnemonic = localStorage.getItem("mnemonic") as string;
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${newAccount}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    const privateKeys = localStorage.getItem("private");
    if (privateKeys) {
      const privateArray = JSON.parse(privateKeys);
      privateArray.push(keypair.secretKey);
      localStorage.setItem("private", JSON.stringify(privateArray));
    }
    const publicKeys = localStorage.getItem("public");
    if (publicKeys) {
      const publicArray = JSON.parse(publicKeys);
      publicArray.push(keypair.publicKey.toBase58());
      localStorage.setItem("public", JSON.stringify(publicArray));
    }
    setCurrentAccount(newAccount);
  };

  return (
    <div className="flex justify-evenly">
      {/* Accounts  */}
      <div style={{ height: "60vh" }} className=" w-16 mt-10">
        {Array.from({ length: accounts + 1 }).map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentAccount(index)}
            className={`cursor-pointer p-2 m-2 rounded-full text-center ${
              currentAccount === index
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } rounded-lg`}
          >
            A {index}
          </div>
        ))}

        <Button onClick={() => addNewWallet()} className="mt-1">
          +
        </Button>
      </div>

      <div
        style={{
          height: "60vh",
          width: "50vw",
          boxShadow: "#070606 0px 0px 25px 0px",
        }}
        className=" m-auto mt-10 pt-6"
      >
        <div className="flex justify-between">
          <p
            style={{ color: primary_color }}
            className="font-bold text-xl text-left ml-6"
          >
            Account {currentAccount}
          </p>
          <div className="flex items-center space-x-1 mr-4">
            <span className="font-mono text-sm text-gray-500 mr-2">
              Address: {shortenKey(publicKey)}
            </span>
            <button
              onClick={handleCopy}
              className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
        <div className=" justify-start flex mt-10 ml-6">
          <p className="text-gray-400 mr-4 text-5xl "> {balance} SOL</p>
        </div>
        <div className="justify-start flex">
          <Button className="m-2 ml-5 mt-5"> Send </Button>
          <Button className="m-2 mt-5 ml-2"> Recieve</Button>
        </div>
        <br />
        <hr className="ml-4 mr-4 opacity-70" />
        <p className="text-left ml-5 mt-3 text-lg">Recent Activity</p>
      </div>

      {/* Details - get private key */}
      <div></div>
    </div>
  );
}
