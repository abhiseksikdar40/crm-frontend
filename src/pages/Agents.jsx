import { useState } from "react";
import AddAgent from "../components/AddAgent";
import { useFetch } from "../context/CRMContext";

export default function Agents() {
  const {
    data: agents = [],
    loading,
    error,
    refetch
  } = useFetch("https://crm-backend-sooty-one.vercel.app/v1/agents");

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const agentDetailsHandler = (agent) => {
    setSelectedAgent(agent);
  };

  const closeDetailsHandler = () => {
    setSelectedAgent(null);
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="agents-container">
      <div className="agents-cards">
        <h2>Agents</h2>

        {/* Show loader or error if applicable */}
        {loading && <p className="text-success fw-bold text-center">Loading agents...</p>}
        {error && <p className="text-danger">Error: {error}</p>}

        {/* Agent list */}
        <ul>
          {agents.map((agent) => (
            <li key={agent._id}>
              <div className="card-body">
                <div>
                  <p><strong>Agent:</strong> {agent.fullname}</p>
                  <p><strong>Agent ID:</strong> {agent.agentid}</p>
                </div>
                <button onClick={() => agentDetailsHandler(agent)}>
                  <img src="/information.svg" alt="info" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Add Agent Modal */}
        <button className="add-agent-btn btn btn-success" onClick={handleOpenModal}>
          Add Agent
        </button>

        {showModal && (
          <AddAgent
            onClose={handleCloseModal}
            onAgentAdded={refetch}
          />
        )}

        {/* Selected Agent Detail View */}
        {selectedAgent && (
          <div className="agent-details">
            <div>
              <button className="close-btn" onClick={closeDetailsHandler}>X</button>
              <h3>Agent Details</h3>
              <p><strong>Name:</strong> {selectedAgent.fullname}</p>
              <p><strong>Email:</strong> {selectedAgent.email}</p>
              <p><strong>Agent ID:</strong> {selectedAgent.agentid}</p>
              <p><strong>Leads:</strong> {selectedAgent.leads?.length || 0}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
