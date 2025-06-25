import { useState } from "react";
import { useCrmContext, useFetch } from "../context/CRMContext";

export default function Leads() {
  const { data, loading, error } = useFetch('https://crm-backend-sooty-one.vercel.app/v1/leads')
  const { agents } = useCrmContext()


  const [customerIdMatched, setCustomerIdMatched] = useState(false);
  const [agentNameMatched, setAgentNameMatched] = useState(false);
  const [matchedAgents, setMatchedAgents] = useState([]);
  const [matchedAgentName, setMatchedAgentName] = useState("");
  const [inputId, setInputId] = useState("");
  const [inputAgentName, setInputAgentName] = useState("");
  const [matchedLead, setMatchedLead] = useState(null);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);


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
  const matchedLead = data?.find((lead) => lead.leadid === inputId);

  if (matchedLead) {
    setCustomerIdMatched(true);
    setMatchedLead(matchedLead);
    fetchComments(matched.leadid);
  } else {
    setCustomerIdMatched(false);
    triggerPopup("Please Insert Correct Customer Id");
  }
};

// const fetchComments = async (leadId) => {
//     try {
//       setCommentLoading(true);
//       const res = await fetch(`https://crm-backend-sooty-one.vercel.app/v1/comments?leadid=${leadId}`);
//       const data = await res.json();
//       setComments(data);
//     } catch (err) {
//       console.error("Error fetching comments:", err);
//     } finally {
//       setCommentLoading(false);
//     }
//   };

  // const handleSubmit = async () => {
  //   if (!input.trim() || !matchedLead?.leadid) return;

  //   const newComment = {
  //     text: input.trim(),
  //     author: "John", // Replace with dynamic user later
  //     leadid: matchedLead.leadid,
  //   };

  //   try {
  //     const res = await fetch("https://crm-backend-sooty-one.vercel.app/v1/comments", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newComment),
  //     });

  //     if (!res.ok) throw new Error("Failed to post comment");

  //     const savedComment = await res.json();
  //     setComments((prev) => [...prev, savedComment]);
  //     setInput("");
  //   } catch (err) {
  //     console.error("Error posting comment:", err);
  //   }
  // };



 const agentnameHandler = () => {
  if (!data?.length || !agents?.length) return;

  const inputName = inputAgentName.trim().toLowerCase();

  const matchedAgent = agents.find((agent) =>
    agent.fullname.toLowerCase().includes(inputName)
  );

  if (matchedAgent) {
    const filtered = data.filter(
      (lead) => lead.salesagent?._id === matchedAgent._id
    );

    setMatchedAgents(filtered);
    setMatchedAgentName(matchedAgent.fullname);
    setAgentNameMatched(true);
  } else {
    // If agent not found
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

      {customerIdMatched && matchedLead && (
        <>
  <div className="customer-details-container">
    <fieldset>
      <legend>Lead Details</legend>
      <p><strong>Lead Name:</strong> {matchedLead.fullname}</p>
      <p><strong>Customer ID:</strong> {matchedLead.leadid}</p>
      <p><strong>Sales Agent:</strong> {matchedLead.salesagent?.fullname || "N/A"}</p>
      <p><strong>Lead Source:</strong> {matchedLead.leadsource}</p>
      <p><strong>Lead Status:</strong> {matchedLead.leadstatus}</p>
      <p><strong>Priority:</strong> {matchedLead.priority}</p>
      <p><strong>Time to Close:</strong> {matchedLead.timetoclose} {matchedLead.timetoclose > 1 ? "days" : "day"}</p>
      <button className="btn btn-success">Edit Lead</button>
    </fieldset>
  </div>

  {/* <div className="comment-box">
      <h3>Comments</h3>

      {commentLoading ? (
        <p>Loading comments...</p>
      ) : (
        <div className="comments-list">
          {comments.map((comment, idx) => (
            <div className="comment-card" key={comment._id || idx}>
              <p>{comment.text}</p>
              <p><strong>{comment.author}</strong></p>
              <span className="timestamp">
                {new Date(comment.createdAt).toLocaleString("en-GB")}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="comment-input">
        <input
          type="text"
          placeholder="Drop your comment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSubmit}>
          <img src="/send-fill.svg" alt="send" />
        </button>
      </div>
    </div> */}
    </>
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
              <li className="customer-div" key={lead._id}>
                <p><strong>Customer Name:</strong> {lead.fullname}</p>
                <p><strong>Customer ID:</strong> {lead.leadid}</p>
                <button><img className="edit-icon" src="/pencil-square.svg" alt="edit" /></button>
                <button><img className="delete-icon" src="/trash-fill.svg" alt="delete" /></button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
