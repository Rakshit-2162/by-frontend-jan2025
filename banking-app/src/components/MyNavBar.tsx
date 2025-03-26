import { colors } from "../assets/colors";
import logo from "../assets/banking-app-logo.png";

const MyNavBar = ({ title }: { title: string }) => {
  return (
    <>
      <header>
        <nav
          className="navbar navbar-expand-lg p-3 pb-2 fixed-top"
          style={{ color: "white", background: colors.primary }}
        >
          <div className="container d-flex justify-content-between align-items-center">
            <img
              src={logo}
              alt="Logo"
              className="rounded-3"
              style={{ width: "200px" }}
            />

            <div className="text-light fst-italic fw-semibold fs-4">
              {title}
            </div>
          </div>
        </nav>
        <hr />
      </header>
    </>
  );
};

export default MyNavBar;
