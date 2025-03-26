import { colors } from "../assets/colors";
import { Transaction } from "../models/Models";

const formatDate = (dateString: Date) => {
  if (!dateString) return "N/A"; // Handle undefined case

  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const TransactionDetaildsCard = ({
  transaction,
  show_acc_id,
}: {
  transaction: Transaction;
  show_acc_id: boolean;
}) => {
  return (
    <>
      <div className="container-fluid">
        <div
          className={`card p-2 m-1 rounded-3 text-light`}
          style={{ background: colors.secondary }}
        >
          <div className="row g-0">
            {show_acc_id && (
              <div className="col-1 text-center">
                <div
                  className="p-1 rounded-3 fw-semibold fs-5"
                  style={{ background: colors.primary }}
                >
                  {transaction.accountId}
                </div>
              </div>
            )}

            <div className="col-2 d-flex align-items-center p-2">
              <div className="text-secondary fs-6"> {"#" + transaction.id}</div>
            </div>

            <div className="col d-flex align-items-center">
              <div className="text-light text-start fs-5">
                {transaction.description}
              </div>
            </div>

            <div
              className="col-2 d-flex align-items-center"
              style={{
                color:
                  transaction.type == "Credit" ? colors.activeGreen : colors.activeRed,
              }}
            >
              {transaction.type == "Credit" ? "+" : "-"} {'₹ ' + transaction.amount}
            </div>

            <div className="col-2 d-flex align-items-center text-light text-opacity-75">
              {formatDate(transaction.transactionTimeStamp)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionDetaildsCard;
