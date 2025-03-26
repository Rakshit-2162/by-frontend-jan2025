import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { colors } from "../../assets/colors";

const UpdateAccountForm = ({ account, onClose, onAccountUpdated }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: account.id,
      name: account.name,
      type: account.type,
      roi: account.roi,
      balance: account.balance,
      active: account.active,
      createTimeStamp: account.createTimeStamp,
      updateTimeStamp: new Date().toISOString(), // New timestamp for update
    },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const onSubmit = (data: any) => {
    fetch(`http://127.0.0.1:8000/account_service/accounts/${account.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        onAccountUpdated(); // Refresh account list
        reset();
        onClose(); // Close modal
      })
      .catch((error) => console.error("Error updating account:", error));
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
            <h5 className="modal-title">Update Account</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Account ID (Read-Only) */}
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control border-0 text-light px-3 py-2"
                  style={{ background: colors.primary }}
                  {...register("id")}
                  readOnly
                />
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
                  placeholder="Balance"
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

              {/* Hidden Create Timestamp (Read-Only) */}
              <input
                type="hidden"
                {...register("createTimeStamp")}
                value={account.createTimeStamp}
              />

              {/* Hidden Update Timestamp */}
              <input
                type="hidden"
                {...register("updateTimeStamp")}
                value={new Date().toISOString()}
              />

              <div className="modal-footer border-0">
                <button
                  type="submit"
                  className="btn btn-light rounded-pill w-100"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAccountForm;
