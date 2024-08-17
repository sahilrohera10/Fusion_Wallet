import { Card, CardContent, CardHeader } from "../ui/card";
import { generateMnemonic } from "bip39";

import { Button } from "../ui/button";
import { useState } from "react";
import Seed from "./Seed";

export default function ChooseCard() {
  const [mnemonic, setMnemonic] = useState<string[]>();
  const handleCreateSeed = () => {
    const mnemonic = generateMnemonic();
    localStorage.setItem("mnemonic", mnemonic);
    console.log("Generated Mnemonic:", mnemonic);
    setMnemonic(mnemonic.split(" "));
  };

  return (
    <div>
      {!mnemonic && (
        <Card>
          <CardHeader>Create</CardHeader>
          <CardContent>
            <Button onClick={() => handleCreateSeed()} variant="outline">
              Create a New Wallet
            </Button>
          </CardContent>
        </Card>
      )}

      {mnemonic && <Seed mnemonic={mnemonic} />}
    </div>
  );
}
