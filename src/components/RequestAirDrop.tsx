import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

const RequestAirDrop = () => {
  const [amount, setAmount] = useState<string>();
  const wallet = useWallet();
  const { connection } = useConnection();

  function requestAirdrop() {
    const publicKey = wallet.publicKey!;
    if (!amount) {
      throw new Error("Enter the amount first");
    }
    connection.requestAirdrop(publicKey, parseInt(amount) * LAMPORTS_PER_SOL);
  }
  return (
    <div>
      <p>Public key for the account is {wallet.publicKey?.toBase58()}</p>
      {/* <p>
        Solana Balance:{" "}
        {wallet.publicKey ? connection.getBalance(wallet.publicKey) : "0"}
      </p> */}
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={requestAirdrop}>Request devnet AirDrop</button>
    </div>
  );
};

export default RequestAirDrop;
