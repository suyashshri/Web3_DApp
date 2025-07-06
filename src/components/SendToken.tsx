import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

const SendToken = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [sender, setSender] = useState(wallet.publicKey?.toBase58());
  const [reciever, setReceiver] = useState<PublicKey>();
  const [amount, setAmount] = useState<string>();

  async function sendToken() {
    if (!amount || !reciever || !wallet.publicKey) {
      throw new Error("Unvalid input's");
    }
    console.log(wallet.publicKey);
    console.log(reciever);
    console.log(amount);

    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: reciever,
        lamports: parseInt(amount) * LAMPORTS_PER_SOL,
      })
    );

    await wallet.sendTransaction(transaction, connection);
  }

  return (
    <div>
      <div style={{ display: "flex", gap: "15px" }}>
        <input
          type="text"
          value={reciever ? reciever.toBase58() : ""}
          onChange={(e) => {
            try {
              const pubkey = new PublicKey(e.target.value);
              setReceiver(pubkey);
            } catch {
              setReceiver(undefined);
            }
          }}
          placeholder="Reciver's Address"
        />
        <input
          type="text"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          placeholder="Sender's Address"
        />
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount(SOL) to send"
        />
      </div>
      <button style={{ marginTop: "16px" }} onClick={sendToken}>
        Send
      </button>
    </div>
  );
};

export default SendToken;
