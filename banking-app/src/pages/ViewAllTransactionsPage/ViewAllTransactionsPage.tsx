import { useEffect, useState } from "react";
import MyNavBar from "../../components/MyNavBar";
import { Transaction } from "../../models/Models";
import axios from "axios";
import { formatDate_ddMMyyyy } from "../ViewSingleAccountPage/ViewSingleAccountPage";
import { colors } from "../../assets/colors";
import "../../theme/theme.css";

const ViewAllTransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    console.log("3. Fetching started...`");
    axios
      .get("http://localhost:8000/transaction_service/transactions")
      .then((response) => {
        setTransactions(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log("Error fetching transactions:" + e);
      });
  }, []);

  return (
    <>
      <MyNavBar title="Transactions" />

      <div style={{ paddingTop: "50px" }} />
      <div className="m-4 rounded-4 overflow-hidden">
        <table className="table table-dark rounded-4 text-center">
          <thead>
            <tr>
              <th scope="col" style={{ background: colors.secondary}}>#</th>
              <th scope="col" style={{ background: colors.secondary}}>Transaction ID</th>
              <th scope="col" style={{ background: colors.secondary}}>Account ID</th>
              <th scope="col" style={{ background: colors.secondary}}>Description</th>
              <th scope="col" style={{ background: colors.secondary}}>Amount</th>
              <th scope="col" style={{ background: colors.secondary}}>DateTime</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id} style={{ background: "transparent" }}>
                <td style={{background: "transparent"}}>{index + 1}</td>
                <td style={{background: "transparent"}}>{"# " + transaction.id}</td>
                <td style={{background: "transparent"}}>{transaction.accountId}</td>
                <td style={{background: "transparent"}}>{transaction.description}</td>
                <td
                  style={{
                    color:
                      transaction.type === "Credit"
                        ? colors.activeGreen
                        : colors.activeRed,
                        background: "transparent",
                  }}
                >
                  {transaction.amount}
                </td>
                <td style={{background: "transparent"}}>{formatDate_ddMMyyyy(transaction.transactionTimeStamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewAllTransactionsPage;
