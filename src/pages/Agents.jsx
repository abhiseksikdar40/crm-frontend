import { useState } from "react";
import AddAgent from "../components/AddAgent";

export default function Agents() {
  const agents = [
    { id: 1, uniqueId: "AGT-001", name: "Alice Johnson", email: "alice.johnson@example.com", numberOfLeads: 6 },
    { id: 2, uniqueId: "AGT-002", name: "Bob Smith", email: "bob.smith@example.com", numberOfLeads: 4 },
    { id: 3, uniqueId: "AGT-003", name: "Charlie Brown", email: "charlie.brown@example.com", numberOfLeads: 2 },
    { id: 4, uniqueId: "AGT-004", name: "Diana Adams", email: "diana.adams@example.com", numberOfLeads: 5 },
    { id: 5, uniqueId: "AGT-005", name: "Ethan Wright", email: "ethan.wright@example.com", numberOfLeads: 3 },
    { id: 6, uniqueId: "AGT-006", name: "Fiona Clark", email: "fiona.clark@example.com", numberOfLeads: 1 },
    { id: 7, uniqueId: "AGT-007", name: "George Martin", email: "george.martin@example.com", numberOfLeads: 2 },
    { id: 8, uniqueId: "AGT-008", name: "Hannah Lee", email: "hannah.lee@example.com", numberOfLeads: 3 },
    { id: 9, uniqueId: "AGT-009", name: "Ian Thomas", email: "ian.thomas@example.com", numberOfLeads: 1 },
    { id: 10, uniqueId: "AGT-010", name: "Jasmine Hall", email: "jasmine.hall@example.com", numberOfLeads: 2 },
    { id: 11, uniqueId: "AGT-011", name: "Kevin Moore", email: "kevin.moore@example.com", numberOfLeads: 10 },
    { id: 12, uniqueId: "AGT-012", name: "Laura Scott", email: "laura.scott@example.com", numberOfLeads: 1 },
    { id: 13, uniqueId: "AGT-013", name: "Mark Wilson", email: "mark.wilson@example.com", numberOfLeads: 12 },
    { id: 14, uniqueId: "AGT-014", name: "Nina Turner", email: "nina.turner@example.com", numberOfLeads: 16 },
    { id: 15, uniqueId: "AGT-015", name: "Oscar Perez", email: "oscar.perez@example.com", numberOfLeads: 1 },
    { id: 16, uniqueId: "AGT-016", name: "Paula Reed", email: "paula.reed@example.com", numberOfLeads: 1 },
    { id: 17, uniqueId: "AGT-017", name: "Quinn Brooks", email: "quinn.brooks@example.com", numberOfLeads: 1 },
    { id: 18, uniqueId: "AGT-018", name: "Rachel Bell", email: "rachel.bell@example.com", numberOfLeads: 1 },
    { id: 19, uniqueId: "AGT-019", name: "Sam Diaz", email: "sam.diaz@example.com", numberOfLeads: 13 },
    { id: 20, uniqueId: "AGT-020", name: "Tina Evans", email: "tina.evans@example.com", numberOfLeads: 15 },
    { id: 21, uniqueId: "AGT-021", name: "Uma Patel", email: "uma.patel@example.com", numberOfLeads: 1 },
    { id: 22, uniqueId: "AGT-022", name: "Victor Hayes", email: "victor.hayes@example.com", numberOfLeads: 12 },
    { id: 23, uniqueId: "AGT-023", name: "Wendy Ross", email: "wendy.ross@example.com", numberOfLeads: 1 },
    { id: 24, uniqueId: "AGT-024", name: "Xavier Green", email: "xavier.green@example.com", numberOfLeads: 17 },
    { id: 25, uniqueId: "AGT-025", name: "Yara Simmons", email: "yara.simmons@example.com", numberOfLeads: 1 },
  ];

  const [selectedAgent, setSelectedAgent] = useState(null);

  const agentDetailsHandler = (agent) => {
    setSelectedAgent(agent);
  };

  const closeDetailsHandler = () => {
    setSelectedAgent(null);
  };

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="agents-container">
      <div className="agents-cards">
        <h2>Agents</h2>
        <ul>
          {agents.map((agent) => (
            <li key={agent.id}>
              <div className="card-body">
                <div>
                  <p><strong>Agent:</strong> {agent.name}</p>
                  <p><strong>Agent ID:</strong> {agent.uniqueId}</p>
                </div>
                <button onClick={() => agentDetailsHandler(agent)}>
                  <img src="/information.svg" alt="information" />
                </button>
              </div>
            </li>
          ))}
        </ul>
          <button className="add-agent-btn btn btn-success" onClick={handleOpenModal}>Add Agent</button>
          {showModal && ( <AddAgent onClose={handleCloseModal}/>)}
        {selectedAgent && (
          <div className="agent-details">
            <div>
            <button className="close-btn" onClick={closeDetailsHandler}>X</button>
            <h3>Agent Details</h3>
            <p><strong>Name:</strong> {selectedAgent.name}</p>
            <p><strong>Email:</strong> {selectedAgent.email}</p>
            <p><strong>Agent ID:</strong> {selectedAgent.uniqueId}</p>
            <p><strong>Leads:</strong> {selectedAgent.numberOfLeads}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
