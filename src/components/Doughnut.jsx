import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { MyContext } from "../context";
import { Heading, Select } from "@chakra-ui/react";

const options = {
  scales: {
    x: {
      type: "category",
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const DoughnutChart = () => {
  let { setDoughnutChartFilter, totalData } = useContext(MyContext);

  return (
    <div style={{ width: "100%", flexShrink: "0" }}>
      <Heading size={"lg"} style={{ textAlign: "center" }}>
        Total
      </Heading>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <Select
          onChange={(e) => {
            setDoughnutChartFilter(e.target.value);
          }}
          w={"150px"}
        >
          <option value="Revenue">Revenue</option>
          <option value="UnitsSold">UnitsSold</option>
          <option value="UserActivity">UserActivity</option>
        </Select>
      </div>
      {totalData.labels ? (
        <Doughnut data={totalData} options={options} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default DoughnutChart;
