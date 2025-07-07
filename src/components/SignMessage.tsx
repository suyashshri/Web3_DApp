import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { ed25519 } from "@noble/curves/ed25519";
import bs58 from "bs58";

const SignMessage = () => {
  const [message, setMessage] = useState("");
  const { publicKey, signMessage } = useWallet();
  async function onClick() {
    if (!publicKey) throw new Error("Wallet Not connected");
    if (!signMessage)
      throw new Error("Wallet does not support signing of message");

    const encodeMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodeMessage);

    if (!ed25519.verify(signature, encodeMessage, publicKey.toBytes())) {
      throw new Error("Message Signature is Invalid");
    }
    alert(`Success Message signature: ${bs58.encode(signature)}`);
  }
  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message to Sign"
      />
      <button onClick={onClick}>Sign Message</button>
    </div>
  );
};

export default SignMessage;
