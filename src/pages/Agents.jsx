import { useState, useEffect } from "react";
import AddAgent from "../components/AddAgent";
import { useFetch } from "../context/CRMContext";

export default function Agents() {
  const {
    data: agents = [],
    loading: loadingAgents,
    error: errorAgents,
    refetch
  } = useFetch("https://crm-backend-sooty-one.vercel.app/v1/agents");

  const {
    data: leads = [],
    loading: loadingLeads,
    error: errorLeads
  } = useFetch("https://crm-backend-sooty-one.vercel.app/v1/leads");

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [leadCounts, setLeadCounts] = useState({});

  useEffect(() => {
    const countMap = {};
    leads.forEach((lead) => {
      const agentId = lead.salesagent?._id;
      if (agentId) {
        countMap[agentId] = (countMap[agentId] || 0) + 1;
      }
    });
    setLeadCounts(countMap);
  }, [leads]);

  const agentDetailsHandler = (agent) => {
    setSelectedAgent(agent);
  };

  const closeDetailsHandler = () => setSelectedAgent(null);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="agents-container">
      <div className="agents-cards">
        <h2>Agents</h2>

        {(loadingAgents || loadingLeads) && (
          <p className="text-success fw-bold text-center">Loading...</p>
        )}
        {errorAgents && <p className="text-danger">Error: {errorAgents}</p>}
        {errorLeads && <p className="text-danger">Error: {errorLeads}</p>}

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

        <button className="add-agent-btn btn btn-success" onClick={handleOpenModal}>
          Add Agent
        </button>

        {showModal && (
          <AddAgent
            onClose={handleCloseModal}
            onAgentAdded={refetch}
          />
        )}

        {selectedAgent && (
          <div className="agent-details">
            <div>
              <button className="close-btn" onClick={closeDetailsHandler}>X</button>
              <h3>Agent Details</h3>
              <p><strong>Name:</strong> {selectedAgent.fullname}</p>
              <p><strong>Email:</strong> {selectedAgent.email}</p>
              <p><strong>Agent ID:</strong> {selectedAgent.agentid}</p>
              <p><strong>Leads:</strong> {leadCounts[selectedAgent._id] || 0}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
