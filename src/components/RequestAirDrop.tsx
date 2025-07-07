import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import SendToken from "./SendToken";
import SignMessage from "./SignMessage";

const RequestAirDrop = () => {
  const [amount, setAmount] = useState<string>();
  const [balance, setBalance] = useState<number | null>(null);
  const wallet = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    const fetchBalance = async () => {
      if (wallet.publicKey) {
        const bal = await connection.getBalance(wallet.publicKey);
        setBalance(bal / LAMPORTS_PER_SOL);
      }
    };
    fetchBalance();
  }, [wallet.publicKey, connection]);

  function requestAirdrop() {
    const publicKey = wallet.publicKey!;
    if (!amount) {
      throw new Error("Enter the amount first");
    }
    connection.requestAirdrop(publicKey, parseInt(amount) * LAMPORTS_PER_SOL);
  }
  return (
    <div>
      <div className="">
        <p>Public key for the account is {wallet.publicKey?.toBase58()}</p>
        <p>Solana Balance: {balance}</p>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <button onClick={requestAirdrop}>Request devnet AirDrop</button>
      </div>
      <div style={{ marginTop: "16px" }}>
        <SendToken />
      </div>
      <div style={{ marginTop: "16px" }}>
        <SignMessage />
      </div>
    </div>
  );
};

export default RequestAirDrop;
