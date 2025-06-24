import { useState, useEffect, useRef } from "react";

export default function Sales() {
  const STATUSES = ["Closed", "New", "Contacted", "Qualified", "Proposal Sent"];

  const initialLeads = [
  { id: 1, name: "Alice Johnson", status: "New", agent: "John", country: "USA", phone: "+1 202-555-0101" },
  { id: 2, name: "Bob Smith", status: "Contacted", agent: "Jane", country: "Canada", phone: "+1 416-555-0123" },
  { id: 3, name: "Charlie Liu", status: "Qualified", agent: "Sara", country: "UK", phone: "+44 20 7946 0030" },
  { id: 4, name: "David Kim", status: "New", agent: "Michael", country: "Australia", phone: "+61 2 9374 4000" },
  { id: 5, name: "Eva Müller", status: "Proposal Sent", agent: "John", country: "Germany", phone: "+49 30 901820" },
  { id: 6, name: "Fatima Khan", status: "New", agent: "Rob", country: "India", phone: "+91 98765 43210" },
  { id: 7, name: "George Okoro", status: "Contacted", agent: "Amara", country: "Nigeria", phone: "+234 803 123 4567" },
  { id: 8, name: "Hiroshi Tanaka", status: "New", agent: "Yuki", country: "Japan", phone: "+81 3-1234-5678" },
  { id: 9, name: "Isabella Rossi", status: "New", agent: "Marco", country: "Italy", phone: "+39 06 12345678" },
  { id: 10, name: "Jin Woo", status: "New", agent: "Soojin", country: "South Korea", phone: "+82 10-1234-5678" },
  { id: 11, name: "Karen Lopez", status: "New", agent: "Carlos", country: "Mexico", phone: "+52 55 1234 5678" },
  { id: 12, name: "Liam O'Connor", status: "New", agent: "Patrick", country: "Ireland", phone: "+353 1 123 4567" },
  { id: 13, name: "Maya Singh", status: "New", agent: "Arjun", country: "India", phone: "+91 98456 78901" },
  { id: 14, name: "Nina Petrov", status: "New", agent: "Oleg", country: "Russia", phone: "+7 495 123-4567" },
];


  const [pipelineData, setPipelineData] = useState({});
  const [isTrashActive, setIsTrashActive] = useState(false);
  const dragItem = useRef();
  const dragContainer = useRef();

  useEffect(() => {
    const grouped = {};
    STATUSES.forEach((status) => {
      grouped[status] = initialLeads.filter((lead) => lead.status === status);
    });
    setPipelineData(grouped);
  }, []);

  const handleDragStart = (e, lead, heading) => {
    dragItem.current = lead;
    dragContainer.current = heading;
    e.target.style.opacity = 0.5;
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = 1;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    const item = dragItem.current;
    const sourceStatus = dragContainer.current;

    if (!item || !sourceStatus || targetStatus === sourceStatus) return;

    setPipelineData((prev) => {
      const newData = { ...prev };
      newData[sourceStatus] = newData[sourceStatus].filter((i) => i !== item);
      newData[targetStatus] = [...newData[targetStatus], item];
      return newData;
    });
  };

  const handleDropToTrash = () => {
    const item = dragItem.current;
    const source = dragContainer.current;
    if (!item || !source) return;


    setIsTrashActive(true);

  
    setTimeout(() => {
      setPipelineData((prev) => {
        const newData = { ...prev };
        newData[source] = newData[source].filter((i) => i.id !== item.id);
        return newData;
      });
      setIsTrashActive(false);
    }, 2500);
  };

  return (
    <div className="sales-container">
      <div className="sales-div">
        <div
          className="closed-div"
          onDrop={handleDropToTrash}
          onDragOver={handleDragOver}
        >
          {isTrashActive ? (
            <img className="trash-gif" src="/waste.gif" alt="Trash Animation" width="50" />
          ) : (
            <img className="trash-can" src="/trash.svg" alt="Trash Icon" width="50" />
          )}
        </div>

        <div className="status-grid">
          {STATUSES.filter((s) => s !== "Closed").map((status) => (
            <div
              key={status}
              className="status-heading"
              onDrop={(e) => handleDrop(e, status)}
              onDragOver={handleDragOver}
            >
              <h4>{status}</h4>
              {pipelineData[status]?.map((lead) => (
                <div
                  key={lead.id}
                  className="leads-div"
                  draggable
                  onDragStart={(e) => handleDragStart(e, lead, status)}
                  onDragEnd={handleDragEnd}
                >
                  <p><strong>Name:</strong> {lead.name}</p>
                  <p><strong>Agent:</strong> {lead.agent}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
