import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { colors } from "../../assets/colors";

const CreateTransactionForm = ({
  accountId,
  onClose,
  onTransactionCompleted,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [deposit, setDeposit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const onSubmit = async (data: any) => {
    try {
      setErrorMessage(""); // Clear previous errors

      const response = await fetch(
        `http://127.0.0.1:8000/account_service/accounts/${accountId}/${
          deposit ? "deposit" : "withdraw"
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Transaction failed");
      }

      await response.json();
      onTransactionCompleted(); // Refresh account list
      reset();
      onClose(); // Close modal only on success
    } catch (error) {
      console.error("Error updating account:", error);
      setErrorMessage(error.message); // Set the error message
    }
  };

  return (
    <div>
      <div
        className="modal d-block"
        tabIndex={-1}
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ background: colors.secondary, color: "white" }}
          >
            <div className="modal-header border-0">
              <h5 className="modal-title">Deposit / Withdraw</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Amount */}
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control border-0 text-light px-3 py-2"
                    placeholder="Amount"
                    style={{ background: colors.primary }}
                    part="0.01"
                    {...register("amount", {
                      required: "Amount is required",
                      valueAsNumber: true,
                      min: { value: 1, message: "Amount must be at least 1" },
                    })}
                  />
                  {errors.amount && (
                    <p className="text-danger">
                      {errors.amount.message?.toString()}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control border-0 text-light px-3 py-2"
                    placeholder="Description"
                    style={{ background: colors.primary }}
                    part="0.01"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.amount && (
                    <p className="text-danger">
                      {errors.description?.message?.toString()}
                    </p>
                  )}
                </div>

                {/* Active/Inactive switch */}
                <div
                  className="d-flex justify-content-between align-items-center mb-3 p-2 px-3 rounded"
                  style={{ background: colors.primary }}
                >
                  <span className="text-light">
                    {deposit ? "Deposit" : "Withdraw"}
                  </span>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="accountStatus"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setDeposit(!deposit);
                      }}
                    />
                  </div>
                </div>

                {/* Hidden Create Timestamp (Read-Only) */}
                <input type="hidden" {...register("id")} value={accountId} />

                {/* Error Message */}
                {errorMessage && (
                  <div className="d-flex justify-content-between align-items-center mb-3 p-2 px-3 rounded bg-danger bg-opacity-50">
                    <span className="text-light">
                      <i className="bi bi-exclamation-circle-fill">
                        {" "}
                        Error: {errorMessage}
                      </i>
                    </span>
                  </div>
                )}

                <div className="modal-footer border-0">
                  <button
                    type="submit"
                    className="btn btn-light rounded-pill w-100"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTransactionForm;
