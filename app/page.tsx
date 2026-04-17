import PlatformPage from "./components/platformPage";
import SecurityPage from "./components/securityPage";
import StatusPage from "./components/statusPage";
import VaultPage from "./components/vaultPage";

export default function App() {
  return (
    <>
      <PlatformPage/>
      <br/>
      <SecurityPage/>
      <br/>
      <StatusPage/>
      <br/>
      <VaultPage/>
      <br/>
    </>
  );
}
