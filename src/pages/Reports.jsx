import { Chart as ChartJs } from "chart.js/auto";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";

export default function Reports() {
  const closedVsPipelineData = {
    labels: ["Closed", "In Pipeline"],
    datasets: [
      {
        label: "Leads",
        data: [37, 60],
        backgroundColor: ["#4CAF50", "#FF9800"],
        borderWidth: 1,
      },
    ],
  };

  const leadStatusDistributionData = {
    labels: [
      "New",
      "Contacted",
      "Qualified",
      "Proposal Sent",
      "Closed - Won",
      "Closed - Lost",
    ],
    datasets: [
      {
        data: [23, 17, 10, 6, 25, 12],
        backgroundColor: [
          "#2196F3",
          "#03A9F4",
          "#00BCD4",
          "#009688",
          "#8BC34A",
          "#F44336",
        ],
        borderWidth: 1,
      },
    ],
  };

  const closedLeadsByAgentData = {
    labels: [
      "Alice Johnson",
      "Bob Smith",
      "Charlie Davis",
      "John Doe",
      "Rebeca Scott",
      "Victor Morris",
    ],
    datasets: [
      {
        label: "Closed - Won",
        data: [10, 7, 8, 10, 12, 11],
        backgroundColor: "#4CAF50",
      },
      {
        label: "Closed - Lost",
        data: [3, 2, 4, 2, 4, 1],
        backgroundColor: "#F44336",
      },
    ],
  };

  const leadsByStatusLineData = {
    labels: [
      "Alice Johnson",
      "Bob Smith",
      "Charlie Davis",
      "John Doe",
      "Rebeca Scott",
      "Victor Morris",
    ],
    datasets: [
      {
        label: "New",
        data: [5, 3, 4, 6, 2, 5],
        borderColor: "#42A5F5",
        backgroundColor: "#42A5F5",
        tension: 0.3,
      },
      {
        label: "Contacted",
        data: [4, 5, 3, 4, 3, 2],
        borderColor: "#66BB6A",
        backgroundColor: "#66BB6A",
        tension: 0.3,
      },
      {
        label: "Qualified",
        data: [2, 1, 3, 2, 2, 3],
        borderColor: "#FFA726",
        backgroundColor: "#FFA726",
        tension: 0.3,
      },
      {
        label: "Proposal Sent",
        data: [1, 2, 1, 1, 3, 2],
        borderColor: "#AB47BC",
        backgroundColor: "#AB47BC",
        tension: 0.3,
      },
      {
        label: "Closed - Won",
        data: [10, 7, 8, 6, 5, 9],
        borderColor: "#4CAF50",
        backgroundColor: "#4CAF50",
        tension: 0.3,
      },
      {
        label: "Closed - Lost",
        data: [3, 2, 4, 2, 1, 3],
        borderColor: "#F44336",
        backgroundColor: "#F44336",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
  };

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
