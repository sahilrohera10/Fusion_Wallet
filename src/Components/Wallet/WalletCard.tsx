import React, { useEffect, useState } from "react";
import { primary_color } from "../../constants";
import { PublicKey } from "@solana/web3.js";

export default function WalletCard() {
  const [currentAccount, setCurrentAccount] = useState(0);
  const [publicKey, setPublicKey] = useState<PublicKey>();

  useEffect(() => {
    const publicKeys = localStorage.getItem("public");

    const publicKeyArray = publicKeys && JSON.parse(publicKeys);

    const publicKey = publicKeyArray[currentAccount];

    setPublicKey(publicKey);
  }, [currentAccount]);

  return (
    <div>
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
            className="font-bold text-3xl text-left ml-6"
          >
            Account {currentAccount}
          </p>

          <p> {publicKey?.toBase58()} </p>
        </div>
      </div>
    </div>
  );
}
