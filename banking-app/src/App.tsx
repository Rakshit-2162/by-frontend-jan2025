import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../src/pages/LandingPage/LandingPage";
import "./theme/theme.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Dashboard from "./pages/Dashboard/dashboard";
import ViewAllAccountsPage from "./pages/ViewAllAccountsPage/ViewAllAccountsPage";
import ViewAllTransactionsPage from "./pages/ViewAllTransactionsPage/ViewAllTransactionsPage";
import ViewAllFundTransfersPage from "./pages/ViewAllFundTransfersPage/ViewAllFundTransfersPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ViewSingleAccountPage from "./pages/ViewSingleAccountPage/ViewSingleAccountPage";
import ProtectedRoute from "./pages/ProtectedRoute"; // Import the new component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/signUpPage" element={<SignUpPage />} />

        {/* Protected Routes (Only for Logged-in Users) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/viewAllAccounts" element={<ViewAllAccountsPage />} />
          <Route path="/dashboard/viewAllAccounts/:accountId" element={<ViewSingleAccountPage />} />
          <Route path="/dashboard/viewAllTransactions" element={<ViewAllTransactionsPage />} />
          <Route path="/dashboard/viewAllFundTransfers" element={<ViewAllFundTransfersPage />} />
          <Route path="/dashboard/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
