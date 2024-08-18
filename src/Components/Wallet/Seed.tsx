import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export default function Seed({ mnemonic }: { mnemonic: string[] }) {
  const navigate = useNavigate();
  const handleCopy = () => {
    const mnemonicString = mnemonic?.join(" ");
    if (mnemonicString) {
      navigator.clipboard.writeText(mnemonicString).then(() => {
        alert("Mnemonic copied to clipboard!");
      });
    }
  };

  const handleDownload = () => {
    const mnemonicString = mnemonic?.join(" ");
    if (mnemonicString) {
      const blob = new Blob([mnemonicString], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "seed.txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // creating a solana wallet
  const handleCreateWallet = async () => {
    const mnemonicString = mnemonic?.join(" ");
    console.log("mnemonic=>", mnemonicString);
    const seed = await mnemonicToSeed(mnemonicString);
    // console.log("seed=>", seed);

    const path = `m/44'/501'/0'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    // console.log("secret=>", secret);

    const keypair = Keypair.fromSecretKey(secret);
    // console.log("keypair=>", keypair);
    // console.log("keypair public=>", keypair.publicKey.toBase58());

    localStorage.setItem("account", "0");
    localStorage.setItem("private", JSON.stringify([keypair.secretKey]));
    localStorage.setItem(
      "public",
      JSON.stringify([keypair.publicKey.toBase58()])
    );

    navigate("/wallet");
  };

  return (
    <div>
      <div className="mt-20">
        <p className="font-extrabold text-2xl">Seed Phrase</p>

        <div className="grid grid-cols-4 gap-4 w-2/4 mt-10 m-auto">
          {mnemonic &&
            mnemonic.map((d) => (
              <div
                className="bg-black rounded-lg text-white p-2 flex items-center justify-center"
                key={d}
              >
                {d}
              </div>
            ))}
        </div>
        <br />
        <p className="opacity-60">
          Your only way to save your cryptos! So keep it very safe
        </p>
        <div className="flex justify-center">
          <Button
            onClick={() => handleCopy()}
            className="w-48 m-2"
            variant="outline"
          >
            Copy
          </Button>
          <Button
            onClick={() => handleDownload()}
            className="w-48 m-2"
            variant="outline"
          >
            Download
          </Button>
          <Button
            onClick={() => handleCreateWallet()}
            className="w-48 m-2"
            variant="outline"
          >
            Next ➡️
          </Button>
        </div>
      </div>
    </div>
  );
}
