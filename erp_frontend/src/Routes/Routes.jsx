import {
  Routes as RRoutes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import App from "../App";
import { CreateUser } from "../pages/CreateUser";
import { ListUser } from "../pages/ListUser";
import { Login } from "../pages/login";
import { CreateLeave } from "../pages/createLeave";
import { LeaveHistory } from "../pages/leaveHistory";
import { LeaveApprovalRequests } from "../pages/leaveApprovalRequests";
import UserDetails from "../pages/userDetails";
import { useAppState } from "../state/AppState";
import { useEffect } from "react";

export const Routes = () => {
  const { appState } = useAppState();

  return appState.signedIn ? (
    <RRoutes>
      {appState.role == "ADMIN" && (
        <>
          <Route path="/listUsers" element={<ListUser />} />

          <Route
            path="/leaveApprovalRequests"
            element={<LeaveApprovalRequests />}
          />
          <Route path="/createUser" element={<CreateUser />} />
        </>
      )}
      <Route path="/" element={<UserDetails />} />
      <Route path="/applyLeave" element={<CreateLeave />} />
      <Route path="/leaveHistory" element={<LeaveHistory />} />
      <Route path="/login" element={<Navigate to="/" />} />
    </RRoutes>
  ) : (
    <RRoutes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </RRoutes>
  );
};
