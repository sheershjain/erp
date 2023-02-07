import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Routes } from "./Routes/Routes";
import { Sidebar } from "./components/sidebar";
import { AppStateContext } from "./state/AppState";
import { defaultAppState } from "./state/AppState";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";
import { Layout } from "antd";
import { Login } from "./pages/login";
import { LeaveApprovalRequests } from "./pages/leaveApprovalRequests";
import UserDetails from "./pages/userDetails";
import { WindowsFilled } from "@ant-design/icons";
const client = new QueryClient();
function App() {
  const [appState, setAppState] = useState({
    ...defaultAppState,
  });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    let localState = null;
    try {
      localState = localStorage.getItem("erp-appState");
      if (localState) {
        localState = JSON.parse(localState);
      }
    } catch (error) {}

    if (localState) {
      if (
        localState.signedIn &&
        localState.userId &&
        localState.role &&
        localState.name &&
        localState.email &&
        localState.token
        // &&
        // localState.refreshToken &&
        // localState.expiresAt &&
        // localState.expiresAt > Date.now()
      ) {
        setAppState({ ...localState });
      }
    }
    setLoading(false);
  }, []);
  return (
    <QueryClientProvider client={client}>
      {loading ? (
        "loading..."
      ) : (
        <BrowserRouter>
          <AppStateContext.Provider value={{ appState, setAppState }}>
            
              <Layout style={{ minHeight: "100vh" }}>
                {appState.signedIn && <Sidebar />}
                <Routes />
               </Layout>
          </AppStateContext.Provider>
        </BrowserRouter>
      )}
    </QueryClientProvider>
  );
}

export default App;
