import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  Cell,
} from "recharts";

const goalColors = ["#b6cb1a", "#f87c01", "#0481f7", "#3cbcb6", "#e34c00"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1d2e]/95 text-slate-200 p-3 border border-[#2a2f45] rounded-lg shadow-lg backdrop-blur-sm">
        <p className="font-bold text-slate-100">{`Year: ${label}`}</p>
        {payload.map((pld) => (
          <div
            key={pld.dataKey}
            className="flex items-center"
            style={{ color: pld.fill }}
          >
            <span
              className="inline-block mr-2 w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: pld.fill }}
            ></span>
            <span>
              {pld.name}: {parseFloat(pld.value).toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const BarChart = ({ data, title, dataKey, xAxisKey, yAxisLabel }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2f45" />
        <XAxis dataKey={xAxisKey} tick={{ fill: "#94a3b8" }}>
          <Label
            value={xAxisKey.charAt(0).toUpperCase() + xAxisKey.slice(1)}
            offset={-15}
            position="insideBottom"
            fill="#94a3b8"
          />
        </XAxis>
        <YAxis tick={{ fill: "#94a3b8" }}>
          <Label
            value={yAxisLabel}
            angle={-90}
            position="insideLeft"
            style={{ textAnchor: "middle" }}
            fill="#94a3b8"
          />
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="top"
          height={36}
          wrapperStyle={{ color: "#e2e8f0", fontWeight: "bold" }}
        />
        <Bar dataKey={dataKey} name={title}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={goalColors[index % goalColors.length]}
            />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
