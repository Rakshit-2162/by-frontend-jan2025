import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { colors } from "../../assets/colors";

const AddAccountForm = ({ onClose, onAccountAdded }) => {
  const {
    register,
    handleSubmit,
    watch,
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

      const response = await fetch(
        "http://127.0.0.1:8000/account_service/accounts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to add account");
      }

      await response.json();
      onAccountAdded(); // Refresh account list
      reset();
      onClose(); // Close modal only on success
    } catch (error) {
      console.error("Error adding account:", error);
      setErrorMessage(error.message); // Set error message
    }
  };

  return (
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
            <h5 className="modal-title">Add Account</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
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

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Account ID */}
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Account ID"
                  className="form-control border-0 text-light px-3 py-2"
                  style={{ background: colors.primary }}
                  {...register("id", {
                    required: "Account ID is required",
                    valueAsNumber: true,
                  })}
                />
                {errors.id && (
                  <p className="text-danger">{errors.id.message + ""}</p>
                )}
              </div>

              {/* Account Name */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control border-0 text-light px-3 py-2"
                  style={{ background: colors.primary }}
                  {...register("name", {
                    required: "Account Name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-danger">{errors.name.message + ""}</p>
                )}
              </div>

              {/* Account Type */}
              <div className="mb-3">
                <select
                  className="form-select border-0 text-light px-3 py-2"
                  style={{ background: colors.primary }}
                  {...register("type", {
                    required: "Account Type is required",
                  })}
                >
                  <option value="">Select Type</option>
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                  <option value="Loan">Loan</option>
                </select>
                {errors.type && (
                  <p className="text-danger">{errors.type.message + ""}</p>
                )}
              </div>

              {/* Rate of Interest */}
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control border-0 text-light px-3 py-2"
                  placeholder="Rate of Interest"
                  step="0.01"
                  style={{ background: colors.primary }}
                  {...register("roi", {
                    required: "Rate of Interest is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "ROI must be at least 0" },
                  })}
                />
                {errors.roi && (
                  <p className="text-danger">{errors.roi.message + ""}</p>
                )}
              </div>

              {/* Balance */}
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control border-0 text-light px-3 py-2"
                  placeholder="Initial Balance"
                  style={{ background: colors.primary }}
                  {...register("balance", {
                    required: "Balance is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Balance must be at least 0" },
                  })}
                />
                {errors.balance && (
                  <p className="text-danger">{errors.balance.message + ""}</p>
                )}
              </div>

              {/* Active/Inactive switch */}
              <div
                className="d-flex justify-content-between align-items-center mb-3 p-2 px-3 rounded"
                style={{ background: colors.primary }}
              >
                <span className="text-light">
                  {watch("active") ? "Active" : "Inactive"}
                </span>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="accountStatus"
                    style={{ cursor: "pointer" }}
                    {...register("active")}
                  />
                </div>
              </div>

              {/* Hidden Date Inputs */}
              <input
                type="hidden"
                {...register("createTimeStamp")}
                value={new Date().toISOString()}
              />
              <input
                type="hidden"
                {...register("updateTimeStamp")}
                value={new Date().toISOString()}
              />

              {/* Submit Button (Full Width) */}
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
  );
};

export default AddAccountForm;
