import { useEffect, useState } from "react";
import MyNavBar from "../../components/MyNavBar";
import { Account } from "../../models/Models";
import AccountDetailsCard from "../../components/AccountDetailsCard";
import AddAccountForm from "../../components/forms/AddAccountForm";

const ViewAllAccountsPage = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = () => {
    fetch("http://127.0.0.1:8000/account_service/accounts")
      .then((response) => response.json())
      .then((data) => setAccounts(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <>
      <MyNavBar title="Accounts" />
      <div style={{ paddingTop: "50px" }} />

      <div className="container-fluid">
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-light me-4 px-4 rounded-pill"
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-person-plus-fill me-2 fs-5"></i>Add
          </button>
        </div>

        {accounts.map((account) => (
          <div key={account.id}>
            <AccountDetailsCard account={account} />
          </div>
        ))}
      </div>

      {showModal && (
        <AddAccountForm
          onClose={() => setShowModal(false)}
          onAccountAdded={fetchAccounts}
        />
      )}
    </>
  );
};

export default ViewAllAccountsPage;
