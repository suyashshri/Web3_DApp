import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import RequestAirDrop from "./components/RequestAirDrop";

function App() {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div
            style={{ display: "flex", gap: "15px", flexDirection: "column" }}
          >
            <div className="walletButton">
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>

            <RequestAirDrop />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
