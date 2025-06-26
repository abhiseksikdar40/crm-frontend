import { useState } from "react";
import AddLead from "../components/AddLead";
import { useFetch } from "../context/CRMContext";

export default function Dashboard() {
  const { data, loading, error, refetch } = useFetch('https://crm-backend-sooty-one.vercel.app/v1/leads');

  const [showModal, setShowModal] = useState(false);
  const [createdLeadId, setCreatedLeadId] = useState(null);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  const lead = (data || []).filter(l => l.leadstatus !== "Closed-Lost");

  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 6;
  const totalPages = Math.ceil(lead.length / leadsPerPage);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * leadsPerPage;
  const displayedLeads = lead.slice(startIndex, startIndex + leadsPerPage);

  return (
    <div className="dashboard-container">
      <p className="greet">Hello Roger👋🏻,</p>

      <div className="lead-status">
        <ul>
          <li>
            <div className="img-div"><img src="/profile-user.svg" alt="Customer" /></div>
            <div className="text-div">
              <p className="p1">New Lead</p>
              <p className="p2">{lead.filter(l => l.leadstatus === "New").length}</p>
            </div>
          </li>
          <li>
            <div className="img-div"><img src="/monitor.svg" alt="Contacted-Customer" /></div>
            <div className="text-div">
              <p className="p1">Contacted</p>
              <p className="p2">{lead.filter(l => l.leadstatus === "Contacted").length}</p>
            </div>
          </li>
          <li>
            <div className="img-div"><img src="/Proposal-sent.svg" alt="Proposal-Sent" className="proposal-sent" /></div>
            <div className="text-div">
              <p className="p1">Proposal Sent</p>
              <p className="p2">{lead.filter(l => l.leadstatus === "Proposal Sent").length}</p>
            </div>
          </li>
          <li>
            <div className="img-div"><img src="/profile-tick.svg" alt="Qualified-Customer" /></div>
            <div className="text-div">
              <p className="p1">Qualified</p>
              <p className="p2">{lead.filter(l => l.leadstatus === "Qualified").length}</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="leads position-relative">
        <div className="heading-filters">
          <div className="shorting-leads">
            <label htmlFor="leadStatus">Sort by: </label>
            <select id="leadStatus">
              <option value="New">Newest</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
            </select>
          </div>
          <button className="create-lead-btn" onClick={handleOpenModal}>Create Lead</button>
        </div>

        <div className="list-head">
          <span>Customer Name</span>
          <span>Lead Source</span>
          <span>Agent</span>
          <span>Priority</span>
          <span>Status</span>
        </div>
        <hr />

        <ul className="lead-list-details">
          {loading ? (
            <div className="position-absolute top-50 start-50">
              <div className="spinner-border text-success"></div>
              <span className='px-2'>Loading...</span>
            </div>
          ) : (
            displayedLeads.map((lead) => (
              <li key={lead.leadid}>
                <span>{lead.fullname}</span>
                <span>{lead.leadsource}</span>
                <span>{lead.salesagent?.fullname || "N/A"}</span>
                <span>{lead.priority}</span>
                <span
                  className={`status-tab ${
                    lead.leadstatus === "New"
                      ? "badge-new"
                      : lead.leadstatus === "Contacted"
                      ? "badge-contacted"
                      : lead.leadstatus === "Qualified"
                      ? "badge-qualified"
                      : lead.leadstatus === "Proposal Sent"
                      ? "badge-proposal"
                      : lead.leadstatus === "Closed-Won"
                      ? "badge-closed"
                      : ""
                  }`}
                >
                  {lead.leadstatus}
                </span>
              </li>
            ))
          )}
        </ul>

        {/* Pagination */}
        <nav className="d-flex justify-content-between align-items-center mt-4">
          <p className="mb-0">
            Showing {displayedLeads.length} Data Per Page Out of {lead.length} Entries
          </p>
          <ul className="pagination mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
              >Previous</button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
              >Next</button>
            </li>
          </ul>
        </nav>
      </div>

      {showModal && (
        <AddLead onClose={handleCloseModal} setCreatedLeadId={setCreatedLeadId} onAddLead={refetch} />
      )}
    </div>
  );
}
