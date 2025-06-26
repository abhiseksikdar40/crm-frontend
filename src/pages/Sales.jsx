import { useState, useEffect, useRef } from "react";
import { useCrmContext, useFetch } from "../context/CRMContext";

export default function Sales() {
  const STATUSES = ["Closed-Lost", "New", "Contacted", "Qualified", "Proposal Sent", "Closed-Won"];
  const { updateLead, } = useCrmContext();
  const { data: leads } = useFetch("https://crm-backend-sooty-one.vercel.app/v1/leads");

  const [pipelineData, setPipelineData] = useState({});
  const [isTrashActive, setIsTrashActive] = useState(false);
  const dragItem = useRef();
  const dragContainer = useRef();

  useEffect(() => {
    if (!leads || !Array.isArray(leads)) return;

    const grouped = {};
    STATUSES.forEach((status) => {
      grouped[status] = leads.filter((lead) => lead.leadstatus === status);
    });
    setPipelineData(grouped);
  }, [leads]);

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

  const handleDrop = async (e, targetStatus) => {
    const item = dragItem.current;
    const sourceStatus = dragContainer.current;

    if (!item || !sourceStatus || targetStatus === sourceStatus) return;

    try {
      const updated = await updateLead(item._id, {
        ...item,
        leadstatus: targetStatus,
      });

      if (!updated) return;

      setPipelineData((prev) => {
        const newData = { ...prev };
        newData[sourceStatus] = newData[sourceStatus].filter((i) => i._id !== item._id);
        newData[targetStatus] = [...newData[targetStatus], { ...item, leadstatus: targetStatus }];
        return newData;
      });
    } catch (err) {
      console.error("Failed to update lead status:", err);
    }
  };

  const handleDropToTrash = async () => {
  const item = dragItem.current;
  const source = dragContainer.current;
  if (!item || !source) return;

  setIsTrashActive(true);

  try {
    const updated = await updateLead(item._id, {
      ...item,
      leadstatus: "Closed-Lost"
    });

    if (!updated) return;

    setPipelineData((prev) => {
      const newData = { ...prev };
      newData[source] = newData[source].filter((i) => i._id !== item._id);
      newData["Closed-Lost"] = [...(newData["Closed-Lost"] || []), { ...item, leadstatus: "Closed-Lost" }];
      return newData;
    });
  } catch (err) {
    console.error("Failed to move to Closed-Lost:", err);
  } finally {
    setTimeout(() => {
      setIsTrashActive(false);
    }, 2500);
  }
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
          {STATUSES.filter((s) => s !== "Closed-Lost").map((status) => (
            <div
              key={status}
              className="status-heading"
              onDrop={(e) => handleDrop(e, status)}
              onDragOver={handleDragOver}
            >
              <h4>{status}</h4>
              {pipelineData[status]?.map((lead) => (
                <div
                  key={lead._id}
                  className="leads-div"
                  draggable
                  onDragStart={(e) => handleDragStart(e, lead, status)}
                  onDragEnd={handleDragEnd}
                >
                  <p><strong>Name:</strong> {lead.fullname}</p>
                  <p><strong>Agent:</strong> {lead.salesagent?.fullname || "Unknown"}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
