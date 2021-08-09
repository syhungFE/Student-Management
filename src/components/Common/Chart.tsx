import React from "react";
import {
  Bar, BarChart, CartesianGrid, Label, Legend, Tooltip, XAxis,
  YAxis,ResponsiveContainer
} from "recharts";
import { GenderbyCity } from '../../features/dashboard/dashboardSlice';

export interface ChartProps{
  data : GenderbyCity[];
}
export function Chart({data}: ChartProps) {
  return (
    <ResponsiveContainer width={600} height="100%">
      <BarChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="name">
            <Label value="The number of men and women per city" offset={-3} position="insideBottom" />
          </XAxis>
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" align='right' height={36}/>
          <Bar dataKey="male" fill="#9BD1E9" />
          <Bar dataKey="female" fill="#FFBC70" />
        </BarChart>
    </ResponsiveContainer>
  );
}
