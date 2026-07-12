import React from "react";
import {
  ComposedChart as RechartsComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1d2e]/95 text-slate-200 p-3 border border-[#2a2f45] rounded-lg shadow-lg backdrop-blur-sm">
        <p className="font-bold text-slate-100">{`Year: ${label}`}</p>
        {payload.map((pld) => (
          <div
            key={pld.dataKey}
            className="flex items-center"
            style={{ color: pld.color || pld.fill }}
          >
            <span
              className="inline-block mr-2 w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: pld.color || pld.fill }}
            ></span>
            <span>
              {pld.name}:{" "}
              {pld.yAxisId === "right"
                ? parseFloat(pld.value).toFixed(3)
                : parseFloat(pld.value).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ComposedChart = ({
  data,
  title,
  bars = [],
  lines = [],
  xAxisKey,
  yAxisLabel,
  yAxisLabelRight,
  yAxisTickFormatter,
  yAxisTickFormatterRight,
  onLegendClick,
  toggledLegends = {},
  originalSeries,
}) => {
  const legendPayload = (originalSeries || [...bars, ...lines]).map((item) => ({
    value: item.name,
    type: item.type === "line" ? "line" : "square",
    id: item.key,
    color: toggledLegends[item.key] ? "#4a5568" : item.color,
  }));

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-3xl font-bold text-center text-[var(--chart-title-color)] mb-4">
        {title}
      </h3>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsComposedChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 60, // Increased left margin
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2f45" />
            <XAxis
              dataKey={xAxisKey}
              tickFormatter={(tick) => tick.toString()}
              tick={{ fill: "#94a3b8" }}
            >
              <Label
                value={xAxisKey.charAt(0).toUpperCase() + xAxisKey.slice(1)}
                offset={-15}
                position="insideBottom"
                fill="#94a3b8"
              />
            </XAxis>
            <YAxis
              yAxisId="left"
              tickFormatter={yAxisTickFormatter}
              tick={{ fill: "#94a3b8" }}
            >
              <Label
                value={yAxisLabel}
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
                offset={-20}
                fill="#94a3b8"
              />
            </YAxis>
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={yAxisTickFormatterRight}
              tick={{ fill: "#94a3b8" }}
            >
              <Label
                value={yAxisLabelRight}
                angle={-90}
                position="insideRight"
                style={{ textAnchor: "middle" }}
                fill="#94a3b8"
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              payload={legendPayload}
              onClick={(e) => onLegendClick && onLegendClick(e.id)}
              wrapperStyle={{ color: "#e2e8f0", fontWeight: "bold" }}
            />
            {bars.map((bar) => (
              <Bar
                key={bar.key}
                yAxisId="left"
                dataKey={bar.key}
                name={bar.name}
                fill={bar.color}
                stackId={bar.stackId}
              />
            ))}
            {lines.map((line) => (
              <Line
                key={line.key}
                yAxisId={line.yAxisId || "left"}
                type="cardinal"
                dataKey={line.key}
                name={line.name}
                stroke={line.color}
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            ))}
          </RechartsComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComposedChart;
