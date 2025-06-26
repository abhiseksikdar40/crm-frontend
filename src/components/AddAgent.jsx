import { useState } from "react";
import { useCrmContext } from "../context/CRMContext";

export default function AddAgent({ onClose, onAgentAdded }) {
  const { addAgent } = useCrmContext();

  const [newAgent, setNewAgent] = useState({
    fullname: "",
    email: "",
    agentid: "",
  });

  const [btnLoading, setBtnLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAgent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const result = await addAgent(newAgent);

    if (result) {
      setShowSuccess(true);
      await onAgentAdded();
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 800);
    } else {
      alert("Failed to add agent.");
    }

    setBtnLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <button className="close-btn" onClick={onClose}>X</button>
        <p className="addlead-heading">Add New Agent</p>
        <form className="add-lead-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="agentName">Full Name:</label>
            <input
              type="text"
              id="agentName"
              name="fullname"
              value={newAgent.fullname}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="agentEmail">Email:</label>
            <input
              type="email"
              id="agentEmail"
              name="email"
              value={newAgent.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="agentId">Agent ID:</label>
            <input
              type="text"
              id="agentId"
              name="agentid"
              value={newAgent.agentid}
              onChange={handleChange}
              placeholder="Enter Agent Id (e.g., AG-000)"
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={btnLoading}>
            {btnLoading ? "Adding..." : "Add Agent"}
          </button>
          {showSuccess && <p className="success-msg">Agent Added Successfully!</p>}
        </form>
      </div>
    </div>
  );
}
