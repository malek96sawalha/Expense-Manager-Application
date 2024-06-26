import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import axios from "../../api/axios";

const MyComponent = ({ tran, type }) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  console.log(tran);
  useEffect(() => {
    fetchTransactionData();
    setData(tran);
  }, [tran]);

  const fetchTransactionData = async () => {
    const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
      return (
        <text
          x={x + width / 2}
          y={y}
          fill="#666"
          textAnchor="middle"
          dy={-6}
        >{`value: ${value}`}</text>
      );
    };
  };

  return (
    <div>
      <p className="midd">{type}</p>

      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Bar dataKey="Total" barSize={30} fill="#8884d8" stroke="#000" />
      </BarChart>
      {/* <p>Weekly</p> */}
    </div>
  );
};

export default MyComponent;
