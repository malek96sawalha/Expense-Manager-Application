import { useEffect, useState } from "react";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "../../api/axios";

const linecompnent = ({ data }) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Line
            dataKey="Total"
            type="monotone"
            barSize={30}
            fill="#8884d8"
            stroke="#000"
          />
        </LineChart>
      </ResponsiveContainer>
      <p>Weekly</p>
    </div>
  );
};

export default linecompnent;
