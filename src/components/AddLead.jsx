import { useState } from "react";
import { useCrmContext } from "../context/CRMContext";

export default function AddLead({ onClose, setCreatedLeadId }) {
  const { agents, addLead } = useCrmContext();

  const [newLead, setNewLead] = useState({
    fullname: "",
    leadsource: "",
    salesagent: "",
    leadstatus: "",
    priority: "",
    timetoclose: 0,
    tags: [],
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [successId, setSuccessId] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewLead((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setNewLead((prev) => ({
      ...prev,
      tags: checked
        ? [...prev.tags, value]
        : prev.tags.filter((tag) => tag !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addLead(newLead);
    const created = result?.lead;
    if (created?.leadid) {
      setCreatedLeadId(created.leadid);
      setSuccessId(created.leadid);
      setShowSuccess(true);
      setNewLead({
        fullname: "",
        leadsource: "",
        salesagent: "",
        leadstatus: "",
        priority: "",
        timetoclose: 0,
        tags: [],
      });
    } else {
      console.log("Lead not created or missing `leadid` in response.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        {!showSuccess ? (
          <>
            <button className="close-btn" onClick={onClose}>X</button>
            <p className="addlead-heading">Add New Lead</p>
              <form className="add-lead-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="text"
              id="fullname"
              value={newLead.fullname}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="leadsource">Lead Source:</label>
            <select id="leadsource" value={newLead.leadsource} onChange={handleChange} required>
              <option value="">Select Source</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="salesagent">Sales Agent:</label>
            <select id="salesagent" value={newLead.salesagent} onChange={handleChange} required>
              <option value="">Select Agent</option>
              {agents?.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.fullname}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="leadstatus">Lead Status:</label>
            <select id="leadstatus" value={newLead.leadstatus} onChange={handleChange} required>
              <option value="">Select Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority:</label>
            <select id="priority" value={newLead.priority} onChange={handleChange} required>
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="timetoclose">Time to Close (in days):</label>
            <input
              type="number"
              id="timetoclose"
              value={newLead.timetoclose}
              onChange={handleChange}
              placeholder="e.g. 7"
              min={1}
              required
            />
          </div>

          <div className="form-group">
            <label>Tags:</label>
            <label><input type="checkbox" value="High-Value" onChange={handleCheckbox} checked={newLead.tags.includes("High-Value")} /> High-Value</label>
            <label><input type="checkbox" value="Follow-Up" onChange={handleCheckbox} checked={newLead.tags.includes("Follow-Up")} /> Follow-Up</label>
          </div>
              <button type="submit" className="submit-btn">Add Lead</button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <p>✅ Lead created successfully!</p>
            <p>Lead ID: <strong>{successId}</strong></p>
            <button className="close-btn mt-3" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

