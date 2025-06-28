import { Chart as ChartJs } from "chart.js/auto";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import { useFetch } from "../context/CRMContext";

export default function Reports() {
  const { data: leads = [], loading, error } = useFetch("https://crm-backend-sooty-one.vercel.app/v1/leads");

  const statuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed-Won", "Closed-Lost"];

  // Fixed logic
  const pipelineCount = leads.filter(
    l => l.leadstatus !== "Closed-Won" && l.leadstatus !== "Closed-Lost"
  ).length;

  const closedCount = leads.filter(
    l => l.leadstatus === "Closed-Won" || l.leadstatus === "Closed-Lost"
  ).length;

  const leadStatusCounts = statuses.map(status =>
    leads.filter(l => l.leadstatus === status).length
  );

  const agents = [...new Set(leads.map(l => l.salesagent?.fullname || "N/A"))];

  const closedLeadsByAgent = agents.map(agent => {
    const agentLeads = leads.filter(l => (l.salesagent?.fullname || "N/A") === agent);
    const closedWon = agentLeads.filter(l => l.leadstatus === "Closed-Won").length;
    const closedLost = agentLeads.filter(l => l.leadstatus === "Closed-Lost").length;
    return { agent, closedWon, closedLost };
  });

  const leadsByAgentAndStatus = statuses.map(status => ({
    label: status,
    data: agents.map(agent =>
      leads.filter(
        l => l.leadstatus === status && (l.salesagent?.fullname || "N/A") === agent
      ).length
    ),
    borderColor: getColorForStatus(status),
    backgroundColor: getColorForStatus(status),
    tension: 0.3,
  }));

  function getColorForStatus(status) {
    const map = {
      "New": "#2196F3",
      "Contacted": "#03A9F4",
      "Qualified": "#00BCD4",
      "Proposal Sent": "#009688",
      "Closed-Won": "#8BC34A",
      "Closed-Lost": "#F44336",
    };
    return map[status] || "#999";
  }

  const closedVsPipelineData = {
    labels: ["Closed", "In Pipeline"],
    datasets: [
      {
        label: "Leads",
        data: [closedCount, pipelineCount],
        backgroundColor: ["#4CAF50", "#FF9800"],
        borderWidth: 1,
      },
    ],
  };

  const leadStatusDistributionData = {
    labels: statuses,
    datasets: [
      {
        data: leadStatusCounts,
        backgroundColor: statuses.map(getColorForStatus),
        borderWidth: 1,
      },
    ],
  };

  const closedLeadsByAgentData = {
    labels: agents,
    datasets: [
      {
        label: "Closed-Won",
        data: closedLeadsByAgent.map(a => a.closedWon),
        backgroundColor: "#4CAF50",
      },
      {
        label: "Closed-Lost",
        data: closedLeadsByAgent.map(a => a.closedLost),
        backgroundColor: "#F44336",
      },
    ],
  };

  const leadsByStatusLineData = {
    labels: agents,
    datasets: leadsByAgentAndStatus,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
  };

  if (loading) return <p className="text-center mt-5">Loading reports...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="reports-container">
      <div className="reports-row">
        <div className="report-box">
          <h4>Leads Closed vs Pipeline</h4>
          <Pie data={closedVsPipelineData} options={chartOptions} />
        </div>

        <div className="report-box">
          <h4>Lead Status Distribution</h4>
          <Doughnut data={leadStatusDistributionData} options={chartOptions} />
        </div>
      </div>

      <div className="reports-row">
        <div className="report-box">
          <h4>Closed Leads by Agent</h4>
          <Bar data={closedLeadsByAgentData} options={chartOptions} />
        </div>

        <div className="report-box">
          <h4>Leads by Agent and Status</h4>
          <Line data={leadsByStatusLineData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
