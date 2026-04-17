import PlatformPage from "./components/platformPage";
import SecurityPage from "./components/securityPage";
import StatusPage from "./components/statusPage";
import VaultPage from "./components/vaultPage";

export default function App() {
  return (
    <div className="flex flex-col gap-16 w-full">
      <section id="platform">
        <PlatformPage />
      </section>

      <section id="vault">
        <VaultPage />
      </section>

      <section id="security">
        <SecurityPage />
      </section>

      <section id="status">
        <StatusPage />
      </section>
    </div>
  );
}