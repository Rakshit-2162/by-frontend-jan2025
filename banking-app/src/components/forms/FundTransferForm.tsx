import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { colors } from "../../assets/colors";

const FundTransferForm = ({ onClose, onTransferComplete }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const onSubmit = async (data: any) => {
    try {
      setErrorMessage("");
  
      // Log request payload
      console.log("Submitting Data:", JSON.stringify(data));
  
      const response = await fetch("http://127.0.0.1:8000/fund_transfer_service/fundTransfers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        throw new Error(errorData.detail || "Fund Transfer failed");
      }
  
      await response.json();
      onTransferComplete();
      reset();
      onClose();
    } catch (error) {
      console.error("Error processing transfer:", error);
      setErrorMessage(error.message);
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
              <h5 className="modal-title">Transfer Fund</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Source Account ID */}
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control border-0 text-light px-3 py-2"
                    placeholder="Source Account ID"
                    style={{ background: colors.primary }}
                    {...register("sourceAccountId", {
                      required: "Source Account ID is required",
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

                {/* Amount */}
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control border-0 text-light px-3 py-2"
                    placeholder="Target Account ID"
                    style={{ background: colors.primary }}
                    {...register("targetAccountId", {
                      required: "Target Account ID is required",
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

                {/* Hidden Transaction Timestamp */}
                <input
                  type="hidden"
                  {...register("transactionTimestamp")}
                  value={new Date().toISOString()}
                />

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

export default FundTransferForm;
