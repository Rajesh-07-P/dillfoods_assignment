import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { MyContext } from "../context";
import { Box, Button, Heading, Select } from "@chakra-ui/react";

const options = {
  scales: {
    x: {
      type: "category",
    },
    y: {},
  },
};

const LineChart = () => {
  const { productData, setLineChartFilter, compareByYear } =
    useContext(MyContext);
  return (
    <Box w={["300px", "450px", "600px"]}>
      <Heading size={"lg"} style={{ textAlign: "center" }} mb={"10px"}>
        Products Comparison
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
            setLineChartFilter(e.target.value);
          }}
          w="150px"
        >
          <option value="Revenue">Revenue</option>
          <option value="UnitsSold">UnitsSold</option>
          <option value="UserActivity">UserActivity</option>
        </Select>
        <div>
          <Button
            onClick={() => {
              compareByYear();
            }}
          >
            compare by year
          </Button>
        </div>
      </div>
      {productData.labels ? (
        <Line data={productData} options={options} />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default LineChart;
