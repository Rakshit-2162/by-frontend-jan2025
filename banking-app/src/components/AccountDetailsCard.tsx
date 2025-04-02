import { Link } from "react-router-dom";
import { colors } from "../assets/colors";
import { Account } from "../models/Models";

const AccountDetailsCard = ({ account }: { account: Account }) => {
  return (
    <>
      <div className="container-fluid">
        <div
          className="card p-3 m-3 rounded-4"
          style={{ background: colors.secondary, color: "white" }}
        >
          <div className="row g-0">
            {/* Account Number */}
            <div className="col me-3 text-center">
              <div
                className="p-2 rounded-3 fw-semibold fs-5"
                style={{ background: colors.primary }}
              >
                {account.id}
              </div>
              <div
                className={`container p-1 mt-2 rounded-pill ${
                  account.active ? "bg-primary" : "bg-danger"
                }`}
                style={{ width: 20 }}
              />
            </div>

            {/* Account holder name & balance */}
            <div className="col-10">
              <div className="fw-medium fs-4 pb-2"> {account.name}</div>
              <div className="row">
                <div className="col-2 text-light text-opacity-75">
                  ₹: {account.balance.toLocaleString()}
                </div>
                |
                <div className="col-3 text-light text-opacity-75 text-uppercase">
                  {account.type}
                </div>
              </div>
            </div>

            {/* Icon */}
            <div className="col d-flex align-items-center justify-content-center">
              <Link to={`/dashboard/viewAllAccounts/${account.id}`}>
                <button
                  className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "50px", height: "50px", fontWeight: "bold" }}
                >
                  <i
                    className="bi bi-chevron-right"
                    style={{ fontSize: "1.3rem", fontWeight: "bold" }}
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetailsCard;
