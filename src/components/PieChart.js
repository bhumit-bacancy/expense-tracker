import React from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

export default function PieChart(props) {
  let labels = []
  let values = []
  if (props.value === "Category"){
    labels = Object.keys(JSON.parse(localStorage.getItem("category_wise_data")))
    values = Object.values(JSON.parse(localStorage.getItem("category_wise_data")))
  } else {
    labels = Object.keys(JSON.parse(localStorage.getItem("bank_wise_data")))
    values = Object.values(JSON.parse(localStorage.getItem("bank_wise_data")))
  }
  
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Expenses",
        backgroundColor: [
          "#00A6B4",
          "#2E4057",
          "#FFD662",
          "#DD1C1A",
          "#FF8600",
          "#0E2F44",
        ],
        borderColor: "#fff",
        borderWidth: 1,
        hoverBackgroundColor: [
          "#003e4f",
          "#4c5b5c",
          "#946c2f",
          "#6b0f12",
          "#b25800",
          "#041f2b",
        ],
        hoverBorderColor: "#000",
        data: values,
      },
    ],
  };
  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">{props.value} Wise Expenses (Vaules are in Rupees)</h5>
        <hr />
        {labels.length !== 0 ?
        <Pie data={data} /> : <div className="text-center" style={{height: "250px"}}><p>No data</p></div> }
      </div>
    </div>
  );
}
