
export default function AddAgent({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <button className="close-btn" onClick={onClose}>X</button>
       <p className="addlead-heading">Add New Agent</p>
        <form className="add-lead-form">
  <div className="form-group">
    <label htmlFor="agentName">Full Name:</label>
    <input type="text" id="agentName" placeholder="Enter full name" />
  </div>
    <div className="form-group">
    <label htmlFor="agentEmail">Email:</label>
    <input type="email" id="agentEmail" placeholder="Enter your email" />
  </div>
   <div className="form-group">
    <label htmlFor="agentId">Agent ID:</label>
    <input type="text" id="agentId" placeholder="Enter Agent Id (e.g., AGT-000)" />
  </div>
  <button type="submit" className="submit-btn">Add Agent</button>
</form>

      </div>
    </div>
  );
}
