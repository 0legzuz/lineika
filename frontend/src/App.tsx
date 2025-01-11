import { GlobalStyle } from "./AppStyles";
import AppRoutes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
