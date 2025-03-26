import { colors } from "../../assets/colors";
import "../../theme/theme.css";
import logo from "../../assets/banking-app-logo.png";
import ServiceCard from "../../components/ServiceCard";
import { Link } from "react-router-dom";

const LandingPage = () => {
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

            {/* Hamburger menu button */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon">
                <i className="bi bi-list text-white fs-2"></i>
              </span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item mx-5">
                <Link to={"/"}>
                  <button className="btn btn-outline-light border-0">
                    Home
                  </button>
                </Link>
              </li>
              <li className="nav-item mx-5">
                <Link to={"/"}>
                  <button className="btn btn-outline-light border-0">
                    Services
                  </button>
                </Link>
              </li>
              <li className="nav-item mx-5">
                <Link to={"/dashboard"}>
                  <button className="btn btn-outline-light border-0">
                    Dashboard
                  </button>
                </Link>
              </li>
            </ul>
          </div>

          <Link to={"/loginPage"}>
            <button className="btn btn-outline-light fw-semibold">Login</button>
          </Link>
        </nav>
      </header>

      {/* Banner */}
      <section id="home">
        <div className="container-fluid">
          <div className="row ps-5 pe-5">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="mb-5 mt-5" style={{ fontSize: 45 }}>
                <b>Smart Banking to Manage your Money & Transactions</b>
              </div>
              <div className="mb-5" style={{ color: colors.lightText }}>
                We will help you manage your money and transactions easily,
                follow the instructions you can manage your money here.
              </div>
              <div className="row">
                <Link to={"/signUpPage"}>
                  <button className="btn btn-light col-6 p-3 rounded-pill">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
              <i className="bi bi-bank" style={{ fontSize: "150px" }}></i>{" "}
              {/* Larger icon */}
            </div>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section id="service">
        <div className="container-fluid text-center p-5">
          <div className="fw-bold" style={{ fontSize: 40 }}>
            We Provide Quality Service
          </div>
          <div className="pt-3 pb-5" style={{ color: colors.lightText }}>
            We will provide the best service to you so that you understand how
            to use and get to know the features that we provide
          </div>

          <div className="container-fluid">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
              <ServiceCard
                iconClass="bi bi-shield-lock"
                title="Protect Payment"
                subtitle="We will provide protection so that your transaction is safe."
              />
              <ServiceCard
                iconClass="bi bi-puzzle-fill"
                title="Easy to Use"
                subtitle="We will make it easier for you to use the existing features"
              />
              <ServiceCard
                iconClass="bi bi-lock-fill"
                title="Security First"
                subtitle="The main thing is your safety. We will use high security for you"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer
        className="text-light py-4 mt-5"
        style={{ background: colors.primary }}
      >
        <div className="container">
          <div className="row">
            {/* Company Info */}
            <div className="col-md-4 text-center text-md-start">
              <h4>Bank Of Gujarat</h4>
              <p className="small text-light text-opacity-75">
                Your trusted banking solution for seamless transactions and
                financial management.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-md-4 text-center">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link
                    to="/"
                    className="text-light text-opacity-75 text-decoration-none"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-light text-opacity-75 text-decoration-none"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-light text-opacity-75 text-decoration-none"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/loginPage"
                    className="text-light text-opacity-75 text-decoration-none"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div className="col-md-4 text-center text-md-end">
              <h5>Follow Us</h5>
              <div>
                <i className="bi bi-twitter fs-4 text-light text-opacity-75 me-3"></i>
                <i className="bi bi-facebook fs-4 text-light text-opacity-75 me-3"></i>
                <i className="bi bi-linkedin fs-4 text-light text-opacity-75"></i>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-3">
            <small>
              &copy; {new Date().getFullYear()} BankOfGujarat | All Rights
              Reserved.
            </small>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
