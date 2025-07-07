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

  const [receiverInput, setReceiverInput] = useState<string>("");
  const [reciever, setReceiver] = useState<PublicKey | undefined>();
  const [amount, setAmount] = useState<string>();

  async function sendToken() {
    if (!amount || !reciever || !wallet.publicKey) {
      alert("Please enter valid inputs.");
      return;
    }

    const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

    if (isNaN(lamports) || lamports <= 0) {
      alert("Invalid amount");
      return;
    }
    console.log(lamports);

    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: reciever,
        lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
      })
    );

    await wallet.sendTransaction(transaction, connection);
  }

  return (
    <div>
      <div style={{ display: "flex", gap: "15px" }}>
        <input
          type="text"
          value={receiverInput}
          onChange={(e) => {
            const input = e.target.value;
            setReceiverInput(input);
            try {
              setReceiver(new PublicKey(input));
            } catch {
              setReceiver(undefined);
            }
          }}
          placeholder="Reciver's Address"
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
