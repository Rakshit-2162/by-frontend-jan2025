import { colors } from "../../assets/colors";
import logo from "../../assets/banking-app-logo.png";
import DashboardCard from "../../components/DashboardCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate(); // React Router navigation hook
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/"); // Redirect to landing page
  };

  return (
    <>
      <header>
        <nav
          className="navbar navbar-expand-lg p-3"
          style={{ color: "white", background: colors.primary }}
        >
          <div className="container d-flex justify-content-between align-items-center">
            <img
              src={logo}
              alt="Logo"
              className="rounded-3"
              style={{ width: "200px" }}
            />

            <button
              className="btn btn-outline-light fw-semibold"
              onClick={handleLogout}
            >
              <i className="bi bi-power"></i>
            </button>
          </div>
        </nav>
      </header>

      <section
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center g-4">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <DashboardCard
                title="My Accounts"
                subtitle="View and manage your bank accounts efficiently."
                iconClass="bi bi-bank"
                route="/dashboard/viewAllAccounts"
              />
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <DashboardCard
                title="My Transactions"
                subtitle="Track and monitor your recent transactions securely."
                iconClass="bi bi-receipt"
                route="/dashboard/viewAllTransactions"
              />
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <DashboardCard
                title="Fund Transfer"
                subtitle="Easily transfer funds between accounts or to others."
                iconClass="bi bi-arrow-left-right"
                route="/dashboard/viewAllFundTransfers"
              />
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <DashboardCard
                title="About"
                subtitle="Learn more about our services and banking features."
                iconClass="bi bi-info-circle"
                route="/dashboard/about"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
