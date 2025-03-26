import { useEffect, useState } from "react";
import { colors } from "../../assets/colors";
import MyNavBar from "../../components/MyNavBar";
import { formatDate_ddMMyyyy } from "../ViewSingleAccountPage/ViewSingleAccountPage";
import { FundTransfer } from "../../models/Models";
import axios from "axios";
import FundTransferForm from "../../components/forms/FundTransferForm";

const ViewAllFundTransfersPage = () => {
  const [transfers, setTransfers] = useState<FundTransfer[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchFundTransfers()
  }, []);

  const fetchFundTransfers = () => {
    axios
      .get("http://localhost:8000/fund_transfer_service/fundTransfers")
      .then((response) => setTransfers(response.data))
      .catch((e) => console.log("Error fetching transactions:" + e));
  };

  return (
    <>
      <MyNavBar title="Fund Transfers" />

      <div style={{ paddingTop: "50px" }} />

      <div className="d-flex justify-content-end">
          <button
            className="btn btn-light me-4 px-4 rounded-pill"
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-currency-rupee me-2 fs-5"></i>Transfer
          </button>
        </div>
      <div className="m-4 rounded-4 overflow-hidden">
        <table className="table table-dark rounded-4 text-center">
          <thead>
            <tr>
              <th scope="col" style={{ background: colors.secondary }}>
                #
              </th>
              <th scope="col" style={{ background: colors.secondary }}>
                Source
              </th>
              <th scope="col" style={{ background: colors.secondary }}></th>{" "}
              {/* Empty column for arrow */}
              <th scope="col" style={{ background: colors.secondary }}>
                Target
              </th>
              <th scope="col" style={{ background: colors.secondary }}>
                Description
              </th>
              <th scope="col" style={{ background: colors.secondary }}>
                Amount
              </th>
              <th scope="col" style={{ background: colors.secondary }}>
                DateTime
              </th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((transfer, index) => (
              <tr key={index} style={{ background: "transparent" }}>
                <td style={{ background: "transparent" }}>{index + 1}</td>
                <td style={{ background: "transparent" }}>
                  {transfer.sourceAccountId}
                </td>

                {/* Arrow Icon Column */}
                <td style={{ background: "transparent" }}>
                  <i className="bi bi-arrow-right fs-5 text-light"></i>
                </td>

                <td style={{ background: "transparent" }}>
                  {transfer.targetAccountId}
                </td>
                <td style={{ background: "transparent" }}>
                  {transfer.description}
                </td>
                <td style={{ background: "transparent" }}>{transfer.amount}</td>
                <td style={{ background: "transparent" }}>
                  {formatDate_ddMMyyyy(transfer.transactionTimestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {showModal && (
        <FundTransferForm
          onClose={() => setShowModal(false)}
          onTransferComplete={fetchFundTransfers}
        />
      )}
    </>
  );
};

export default ViewAllFundTransfersPage;
