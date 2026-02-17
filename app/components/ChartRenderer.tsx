"use client";

import React, { useState, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';
import StackedBarChart from '../charts/StackedBarChart';
import ComposedChart from '../charts/ComposedChart';

interface ChartRendererProps {
  measure: string;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ measure }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggledLegends, setToggledLegends] = useState<Record<string, boolean>>({});

  const handleLegendClick = (dataKey: string) => {
    setToggledLegends((prevState) => ({
      ...prevState,
      [dataKey]: !prevState[dataKey],
    }));
  };

  const dataSources: Record<string, string> = {
    "Travel Times": "/data/1_tti_am_pm.csv",
    "Travel Time Reliability": "/data/3_pti_am_pm.csv",
    "Fatalities": "/data/10_14_safety.csv",
    "Trip Length": "/data/7_trip_length.csv",
    "Delay": "/data/18_pehd.csv",
    "Freight Reliability": "/data/5_tttr.csv",
    "Non-SOV Travel": "/data/27_commute_non_sov.csv",
  };

  useEffect(() => {
    const fetchData = async () => {
      const source = dataSources[measure];
      if (!source) {
        setLoading(false);
        return;
      }

      try {
        const csvData = await d3.csv(source);
        csvData.forEach((d: any) => {
          for (const prop in d) {
            if (!isNaN(d[prop]) && d[prop] !== "") d[prop] = +d[prop];
          }
        });
        setChartData(csvData);
      } catch (error) {
        console.error(`Error loading data for ${measure}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [measure]);

  const chartConfig = useMemo(() => {
    const configs: any = {
      "Travel Times": {
        component: LineChart,
        props: {
          data: chartData,
          title: "Average Travel Time Index (TTI)",
          lines: [
            { key: "AM", name: "AM Peak", color: "#a8a4e8" },
            { key: "PM", name: "PM Peak", color: "#82ca9d" },
          ].filter((line) => !toggledLegends[line.key]),
          xAxisKey: "year",
          yAxisLabel: "Travel Time Index",
          onLegendClick: handleLegendClick,
          toggledLegends: toggledLegends,
          originalLines: [
            { key: "AM", name: "AM Peak", color: "#a8a4e8" },
            { key: "PM", name: "PM Peak", color: "#82ca9d" },
          ],
        },
      },
      "Travel Time Reliability": {
        component: LineChart,
        props: {
          data: chartData,
          title: "Planning Time Index (PTI)",
          lines: [
            { key: "AM", name: "AM Peak", color: "#a8a4e8" },
            { key: "PM", name: "PM Peak", color: "#82ca9d" },
          ].filter((line) => !toggledLegends[line.key]),
          xAxisKey: "year",
          yAxisLabel: "Travel Time Index",
          onLegendClick: handleLegendClick,
          toggledLegends: toggledLegends,
          originalLines: [
            { key: "AM", name: "AM Peak", color: "#a8a4e8" },
            { key: "PM", name: "PM Peak", color: "#82ca9d" },
          ],
        },
      },
      "Freight Reliability": {
        component: LineChart,
        props: {
          data: chartData,
          title: "Truck Travel Time Reliability Index (TTTR)",
          lines: [
            { key: "AM", name: "AM", color: "#a8a4e8" },
            { key: "Midday", name: "Midday", color: "#82ca9d" },
            { key: "PM", name: "PM", color: "#ffc658" },
            { key: "Weekend", name: "Weekend", color: "#ff7300" },
            { key: "Overnight", name: "Overnight", color: "#d0ed57" },
          ].filter((line) => !toggledLegends[line.key]),
          xAxisKey: "year",
          yAxisLabel: "Truck Travel Time Reliability Index",
          onLegendClick: handleLegendClick,
          toggledLegends: toggledLegends,
          originalLines: [
            { key: "AM", name: "AM", color: "#a8a4e8" },
            { key: "Midday", name: "Midday", color: "#82ca9d" },
            { key: "PM", name: "PM", color: "#ffc658" },
            { key: "Weekend", name: "Weekend", color: "#ff7300" },
            { key: "Overnight", name: "Overnight", color: "#d0ed57" },
          ],
        },
      },
      "Delay": {
        component: ComposedChart,
        props: {
          data: chartData,
          title: "Annual Peak Hours of Excessive Delay (PHED)",
          bars: [
            { key: "PHED", name: "PHED", color: "#a8a4e8" },
            { key: "TotalPopulation", name: "TotalPopulation", color: "#82ca9d" },
          ].filter((bar) => !toggledLegends[bar.key]),
          lines: [
            { key: "PHEDperCapita", name: "PHEDperCapita", color: "#ff7300", yAxisId: "right" },
          ].filter((line) => !toggledLegends[line.key]),
          xAxisKey: "year",
          yAxisLabel: "PHED per Capita",
          yAxisLabelRight: "Hours Per Capita",
          onLegendClick: handleLegendClick,
          toggledLegends: toggledLegends,
          originalSeries: [
            { key: "PHED", name: "PHED", color: "#a8a4e8", type: "bar" },
            { key: "TotalPopulation", name: "TotalPopulation", color: "#82ca9d", type: "bar" },
            { key: "PHEDperCapita", name: "PHEDperCapita", color: "#ff7300", type: "line" },
          ],
        },
      },
      "Non-SOV Travel": {
        component: LineChart,
        props: {
          data: chartData,
          title: "Percent of Non-Single Occupant Vehicle (SOV) Travel",
          lines: [
            { key: "Chesterfield", name: "Chesterfield", color: "#a8a4e8" },
            { key: "ColonialHeights", name: "Colonial Heights", color: "#82ca9d" },
            { key: "Dinwiddie", name: "Dinwiddie", color: "#ffc658" },
            { key: "Hopewell", name: "Hopewell", color: "#ff7300" },
            { key: "Petersburg", name: "Petersburg", color: "#d0ed57" },
            { key: "PrinceGeorge", name: "Prince George", color: "#a4de6c" },
            { key: "MPO", name: "MPO", color: "#387908" },
          ].filter((line) => !toggledLegends[line.key]),
          xAxisKey: "year",
          yAxisLabel: "Non-SOV Commute Time (minutes)",
          isPercentage: true,
          onLegendClick: handleLegendClick,
          toggledLegends: toggledLegends,
          originalLines: [
            { key: "Chesterfield", name: "Chesterfield", color: "#a8a4e8" },
            { key: "ColonialHeights", name: "Colonial Heights", color: "#82ca9d" },
            { key: "Dinwiddie", name: "Dinwiddie", color: "#ffc658" },
            { key: "Hopewell", name: "Hopewell", color: "#ff7300" },
            { key: "Petersburg", name: "Petersburg", color: "#d0ed57" },
            { key: "PrinceGeorge", name: "Prince George", color: "#a4de6c" },
            { key: "MPO", name: "MPO", color: "#387908" },
          ],
        },
      },
      "Trip Length": {
        component: ComposedChart,
        props: {
          data: chartData,
          title: "Average Trip Length by Mode",
          bars: [
            { key: "DA", name: "Drive Alone", color: "#b6cb1a", stackId: "a" },
            { key: "cp", name: "Carpool", color: "#f87c01", stackId: "a" },
            { key: "pt", name: "Public Transit", color: "#0481f7", stackId: "a" },
          ].map((bar) => ({
            ...bar,
            fill: toggledLegends[bar.key] ? "transparent" : bar.color,
          })),
          lines: [
            { key: "overall", name: "Overall", color: "#333333", yAxisId: "left" },
          ].filter((line) => !toggledLegends[line.key]),
          xAxisKey: "year",
          yAxisLabel: "Commute Time (minutes)",
          onLegendClick: handleLegendClick,
          toggledLegends: toggledLegends,
          originalSeries: [
            { key: "DA", name: "Drive Alone", color: "#b6cb1a", type: "bar", stackId: "a" },
            { key: "cp", name: "Carpool", color: "#f87c01", type: "bar", stackId: "a" },
            { key: "pt", name: "Public Transit", color: "#0481f7", type: "bar" },
            { key: "overall", name: "Overall", color: "#333333", type: "line" },
          ],
        },
      },
      "Fatalities": {
        component: ComposedChart,
        props: {
          data: chartData,
          title: "Safety Performance",
          bars: [
            { key: "Fatalities", name: "Fatalities", color: "#a8a4e8" },
            { key: "SI", name: "Serious Injuries", color: "#82ca9d" },
            { key: "nm_fsi", name: "Non-Motorized FSI", color: "#ffc658" },
          ].filter((bar) => !toggledLegends[bar.key]),
          lines: [
            { key: "fat_rate", name: "Fatality Rate", color: "#ff7300", yAxisId: "right" },
            { key: "si_rate", name: "Serious Injury Rate", color: "#387908", yAxisId: "right" },
          ].filter((line) => !toggledLegends[line.key]),
          xAxisKey: "year",
          yAxisLabel: "Fatalities / Serious Injuries",
          yAxisLabelRight: "Rate",
          onLegendClick: handleLegendClick,
          toggledLegends: toggledLegends,
          originalSeries: [
            { key: "Fatalities", name: "Fatalities", color: "#a8a4e8", type: "bar" },
            { key: "SI", name: "Serious Injuries", color: "#82ca9d", type: "bar" },
            { key: "nm_fsi", name: "Non-Motorized FSI", color: "#ffc658", type: "bar" },
            { key: "fat_rate", name: "Fatality Rate", color: "#ff7300", type: "line" },
            { key: "si_rate", name: "Serious Injury Rate", color: "#387908", type: "line" },
          ],
        },
      },
    };
    return configs;
  }, [chartData, toggledLegends]);

  if (loading) return <div className="h-[400px] flex items-center justify-center text-gray-400">Loading chart data...</div>;
  
  const config = (chartConfig as any)[measure];
  if (!config) return <div className="p-4 bg-red-50 text-red-500 rounded-lg">No chart configuration found for: {measure}</div>;

  const ChartComponent = config.component;
  return (
    <div className="w-full h-[500px] p-6 my-8 overflow-hidden">
      <ChartComponent {...config.props} />
    </div>
  );
};

export default ChartRenderer;
