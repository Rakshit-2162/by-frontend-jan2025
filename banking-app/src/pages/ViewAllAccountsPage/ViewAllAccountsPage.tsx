import { useEffect, useState, useMemo, useCallback } from "react";
import _ from "lodash"; // Import lodash for debouncing
import MyNavBar from "../../components/MyNavBar";
import { Account } from "../../models/Models";
import AccountDetailsCard from "../../components/AccountDetailsCard";
import AddAccountForm from "../../components/forms/AddAccountForm";
import { colors } from "../../assets/colors";

const ViewAllAccountsPage = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 10; // Show 10 accounts per page

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = () => {
    fetch("http://127.0.0.1:8000/account_service/accounts")
      .then((response) => response.json())
      .then((data) => setAccounts(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const debouncedSearch = useCallback(
    _.debounce((term: string) => setSearchTerm(term), 300),
    []
  );

  // Filter accounts based on search term
  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) =>
      account.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, accounts]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredAccounts.length / accountsPerPage);

  // Slice accounts for pagination
  const paginatedAccounts = useMemo(() => {
    const startIndex = (currentPage - 1) * accountsPerPage;
    return filteredAccounts.slice(startIndex, startIndex + accountsPerPage);
  }, [filteredAccounts, currentPage]);

  return (
    <>
      <MyNavBar title="Accounts" />
      <div style={{ paddingTop: "50px" }} />

      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Search Bar */}
          <div className="col-auto ms-4">
            <div
              className="input-group rounded-pill"
              style={{ backgroundColor: colors.secondary, padding: "5px" }}
            >
              <span className="input-group-text bg-transparent border-0">
                <i className="bi bi-search text-white"></i>
              </span>
              <input
                type="text"
                className="form-control bg-transparent border-0 text-white"
                placeholder="Search..."
                onChange={(e) => {
                  debouncedSearch(e.target.value);
                  setCurrentPage(1); // Reset to page 1 on search
                }}
              />
            </div>
          </div>

          {/* Add Button */}
          <div className="col d-flex justify-content-end">
            <button
              className="btn btn-light me-4 px-4 rounded-pill"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-person-plus-fill me-2 fs-5"></i>Add
            </button>
          </div>
        </div>

        {/* Display Accounts */}
        <div className="mt-3">
          {paginatedAccounts.length > 0 ? (
            paginatedAccounts.map((account) => (
              <AccountDetailsCard key={account.id} account={account} />
            ))
          ) : (
            <p className="text-white text-center mt-3">No accounts found.</p>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <nav className="mt-4">
            <ul className="pagination justify-content-center gap-2">
              {" "}
              {/* Added gap */}
              {/* Previous Button */}
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link bg-transparent text-white border-0"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  <i className="bi bi-arrow-left" />
                </button>
              </li>
              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className={`page-link border-0 px-3 fw-bold rounded-2 ${
                      currentPage === index + 1
                        ? "bg-light text-dark" // Active page
                        : "bg-transparent text-white" // Non-active pages
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              {/* Next Button */}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link bg-transparent text-white border-0"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  <i className="bi bi-arrow-right" />
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Modal */}
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
