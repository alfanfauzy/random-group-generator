import "./App.css";
import { ThemeProvider } from "./context/providerContext";
import GroupRandomizer from "./pages/GroupRandomizer";

function App() {
  return (
    <ThemeProvider>
      <GroupRandomizer />
    </ThemeProvider>
  );
}

export default App;
