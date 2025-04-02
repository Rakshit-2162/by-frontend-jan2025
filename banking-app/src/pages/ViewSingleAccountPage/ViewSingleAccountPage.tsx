import { useParams } from "react-router-dom";
import MyNavBar from "../../components/MyNavBar";
import { useEffect, useState } from "react";
import { Account, Transaction } from "../../models/Models";
import axios from "axios";
import AccountInfoCard from "../../components/AccountInfoCard";
import TransactionDetaildsCard from "../../components/TransactionDetaildsCard";
import UpdateAccountForm from "../../components/forms/UpdateAccountForm";
import CreateTransactionForm from "../../components/forms/CreateTransactionForm";
import { colors } from "../../assets/colors";

export const formatDate_ddMMyyyy = (dateString?: string | Date) => {
  if (!dateString) return "N/A"; // Handle undefined or null values safely

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date"; // Handle invalid dates

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`; // Returns "dd-mm-yyyy"
};

const ViewSingleAccountPage = () => {
  const { accountId } = useParams();
  const [account, setAccount] = useState<Account | null>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showTransactionForm, setCreateTransactionForm] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    fetchAccount();
    fetchTransactions();
  }, []);

  const fetchAccount = () => {
    axios
      .get(`http://localhost:8000/account_service/accounts/${accountId}`)
      .then((response) => {
        setAccount(response.data);
      })
      .catch((e) => {
        console.log("Error fetching account:" + e);
      });
  };

  const fetchTransactions = () => {
    axios
      .get(
        `http://localhost:8000/transaction_service/transactions/${accountId}`
      )
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((e) => {
        console.log("Error fetching transactions:" + e);
      });
  };

  return (
    <>
      <MyNavBar title={`${account?.name}`} />
      <div style={{ paddingTop: "50px" }} />

      <section className="d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <AccountInfoCard
                title="Account Type"
                content={account?.type ?? "N/A"}
                active={account?.active ?? false}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <AccountInfoCard
                title="Balance"
                content={"₹: " + account?.balance.toLocaleString()}
                active={account?.active ?? false}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <AccountInfoCard
                title="Rate of Interest"
                content={account?.roi + " %"}
                active={account?.active ?? false}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <AccountInfoCard
                title="Created At"
                content={formatDate_ddMMyyyy(account?.createTimeStamp)}
                active={account?.active ?? false}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="d-flex align-items-center my-4">
          <div className="flex-grow-1 border-bottom border-1 border-secondary"></div>
          <h4 className="mx-3 text-light fw-bold">My Transactions</h4>
          <div className="flex-grow-1 border-bottom border-1 border-secondary"></div>
        </div>
      </section>

      <section>
        <div className="container-fluid p-2">
          {transactions.map((transaction) => (
            <div key={transaction.id}>
              <TransactionDetaildsCard
                transaction={transaction}
                show_acc_id={false}
              />
            </div>
          ))}
        </div>
      </section>

      <div
        className="position-fixed bottom-0 end-0 m-4 d-flex roun"
        style={{ zIndex: 1050 }}
      >
        <button
          className="btn btn-light rounded-start-pill px-4 py-2 w-50 fs-5 fw-bolder"
          onClick={() => {
            if (!account?.active) {
              setShowDialog(true);
              return;
            }
            setCreateTransactionForm(true);
          }}
        >
          <i className="bi bi-arrow-down-up ms-2"></i>
        </button>
        <button
          className="btn btn-light rounded-end-pill px-4 py-2 w-50 fs-5 fw-bolder"
          onClick={() => setShowEditForm(true)}
        >
          <i className="bi bi-pencil-square me-2"></i>
        </button>
      </div>

      {showDialog && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog">
            <div className="modal-content" style={{background: colors.secondary}}>
              <div className="modal-header">
                <h5 className="modal-title">Account Disabled</h5>
                <button
                  className="btn-close bg-light"
                  onClick={() => setShowDialog(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>This account is disabled and cannot perform transactions.</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-light"
                  onClick={() => setShowDialog(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show UpdateAccountForm as a Modal */}
      {showEditForm && account && (
        <UpdateAccountForm
          account={account}
          onClose={() => setShowEditForm(false)}
          onAccountUpdated={() => {
            fetchAccount(); // Refresh account details
            setShowEditForm(false);
          }}
        />
      )}

      {/* Create Transaction form */}
      {showTransactionForm && account && (
        <CreateTransactionForm
          accountId={account.id}
          onClose={() => setCreateTransactionForm(false)}
          onTransactionCompleted={() => {
            fetchAccount();
            setCreateTransactionForm(false);
            fetchTransactions();
          }}
        />
      )}
    </>
  );
};

export default ViewSingleAccountPage;
