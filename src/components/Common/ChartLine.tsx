import React from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GenderbyCity } from '../../features/dashboard/dashboardSlice';

interface ChartProps{
  data : GenderbyCity[];
}
export function ChartLine({data}: ChartProps) {
  return (
    <ResponsiveContainer width={600} height="100%">
        <LineChart data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value="The number of men and women per city" offset={-3} position="insideBottom" />
          </XAxis>
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" align='right' height={36}/>
          <Line type="monotone" dataKey="male" stroke="#9BD1E9" />
          <Line type="monotone" dataKey="female" stroke="#FFBC70" />
        </LineChart>
    </ResponsiveContainer>
  );
}
