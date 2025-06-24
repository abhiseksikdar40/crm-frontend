import { useState } from "react";

export default function Leads() {
  const leadDetails = [
    {
      id: 1,
      customerid: 521478,
      name: "Alice Jonshon",
      source: "Cold Call",
      closetime: 7,
      priority: "High",
      status: "New",
      agent: "John",
      country: "USA",
      phone: "+1 202-555-0101",
    },
  ];

  const agentWise = [
    {
      id: 1,
      customerid: 521478,
      name: "Alice Johnson",
      source: "Cold Call",
      closetime: 7,
      priority: "High",
      status: "New",
      agent: "John",
      country: "USA",
      phone: "+1 202-555-0101",
    },
    {
      id: 2,
      customerid: 521479,
      name: "Bob Smith",
      source: "Referral",
      closetime: 10,
      priority: "Medium",
      status: "New",
      agent: "John",
      country: "Canada",
      phone: "+1 416-555-0123",
    },
    {
      id: 3,
      customerid: 521480,
      name: "Charlie Zhang",
      source: "Web Form",
      closetime: 5,
      priority: "Low",
      status: "New",
      agent: "John",
      country: "UK",
      phone: "+44 20 7946 0030",
    },
    {
      id: 4,
      customerid: 521481,
      name: "Diana Müller",
      source: "Email Campaign",
      closetime: 9,
      priority: "High",
      status: "New",
      agent: "John",
      country: "Germany",
      phone: "+49 30 901820",
    },
    {
      id: 5,
      customerid: 521482,
      name: "Ethan Lee",
      source: "LinkedIn",
      closetime: 4,
      priority: "Medium",
      status: "New",
      agent: "John",
      country: "South Korea",
      phone: "+82 10-1234-5678",
    },
    {
      id: 6,
      customerid: 521483,
      name: "Fatima Khan",
      source: "Cold Call",
      closetime: 6,
      priority: "High",
      status: "New",
      agent: "John",
      country: "India",
      phone: "+91 98765 43210",
    },
    {
      id: 7,
      customerid: 521484,
      name: "George Okoro",
      source: "Networking Event",
      closetime: 8,
      priority: "Low",
      status: "New",
      agent: "John",
      country: "Nigeria",
      phone: "+234 803 123 4567",
    },
  ];

  const [customerIdMatched, setCustomerIdMatched] = useState(false);
  const [agentNameMatched, setAgentNameMatched] = useState(false);
  const [matchedAgents, setMatchedAgents] = useState([]);
  const [matchedAgentName, setMatchedAgentName] = useState("");
  const [inputId, setInputId] = useState("");
  const [inputAgentName, setInputAgentName] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const triggerPopup = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const closePopup = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  const customerIdHandler = () => {
    if (inputId === leadDetails[0].customerid.toString()) {
      setCustomerIdMatched(true);
    } else {
      setCustomerIdMatched(false);
      triggerPopup("Please Insert Correct Customer Id");
    }
  };

  const agentnameHandler = () => {
    const filtered = agentWise.filter(
      (lead) =>
        lead.agent.toLowerCase().trim() ===
        inputAgentName.toLowerCase().trim()
    );

    if (filtered.length > 0) {
      setMatchedAgents(filtered);
      setMatchedAgentName(filtered[0].agent);
      setAgentNameMatched(true);
    } else {
      triggerPopup("Please Insert Correct Agent Name");
      setMatchedAgents([]);
      setMatchedAgentName("");
      setAgentNameMatched(false);
    }
  };

  return (
    <div className="leads-container">
      <div className="searching-area">
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            placeholder="Customer ID (e.g., 123456)"
            onChange={(e) => setInputId(e.target.value)}
          />
          <button className="btn btn-primary" onClick={customerIdHandler}>
            <img src="/search.svg" alt="search icon" />
          </button>
        </div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Agent Name"
            onChange={(e) => setInputAgentName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={agentnameHandler}>
            <img src="/search.svg" alt="search icon" />
          </button>
        </div>
      </div>

      {showAlert && (
        <div className="custom-alert">
          <p>{alertMessage}</p>
          <button className="close-alert" onClick={closePopup}>
            ×
          </button>
        </div>
      )}

      {customerIdMatched && (
        <div className="customer-details-container">
          <fieldset>
            <legend>Lead Details</legend>
            <p>
              <strong>Lead Name:</strong> {leadDetails[0].name}
            </p>
            <p>
              <strong>Sales Agent:</strong> {leadDetails[0].agent}
            </p>
            <p>
              <strong>Lead Source:</strong> {leadDetails[0].source}
            </p>
            <p>
              <strong>Lead Status:</strong> {leadDetails[0].status}
            </p>
            <p>
              <strong>Priority:</strong> {leadDetails[0].priority}
            </p>
            <p>
              <strong>Time to Close:</strong> {leadDetails[0].closetime}{" "}
              {leadDetails[0].closetime > 1 ? "days" : "day"}
            </p>
            <button className="btn btn-success">Edit Lead</button>
          </fieldset>
        </div>
      )}

      {agentNameMatched && matchedAgents.length > 0 && (
        <div className="agent-wise-details">
          <h3>
            Agent <strong>{matchedAgentName}</strong> has{" "}
            <strong>{matchedAgents.length}</strong>{" "}
            {matchedAgents.length === 1 ? "lead" : "leads"}
          </h3>
          <ul>
            {matchedAgents.map((lead) => (
              <li className="customer-div" key={lead.id}>
                <p>
                  <strong>Customer Name:</strong> {lead.name}
                </p>
                <p>
                  <strong>Customer ID:</strong> {lead.customerid}
                </p>
                <button>
                  <img
                    className="edit-icon"
                    src="/pencil-square.svg"
                    alt="edit"
                  />
                </button>
                <button>
                  <img
                    className="delete-icon"
                    src="/trash-fill.svg"
                    alt="delete"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
