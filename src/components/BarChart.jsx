import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { MyContext } from "../context";
import { Box, Heading, Select } from "@chakra-ui/react";

const options = {
  scales: {
    x: {
      type: "category",
    },
    y: {},
  },
};

const BarChart = () => {
  const { categoryData } = useContext(MyContext);
  const { setFilter, setYear } = useContext(MyContext);

  return (
    <Box w={["300px", "450px", "600px"]}>
      <Heading size={"lg"} style={{ textAlign: "center" }} mb={"10px"}>
        Category Chart
      </Heading>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginBlock: "10px",
        }}
      >
        <Select
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          w={"150px"}
        >
          <option value="UnitsSold">UnitsSold</option>
          <option value="Revenue">Revenue</option>
          <option value="UserActivity">UserActivity</option>
        </Select>
        <Select
          onChange={(e) => {
            setYear(e.target.value);
          }}
          w={"160px"}
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="12">last 12 months</option>
        </Select>
      </div>
      <Bar data={categoryData} options={options} />
    </Box>
  );
};

export default BarChart;
