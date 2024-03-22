import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import DoughnutChart from "./components/Doughnut";
import React, { useContext } from "react";
import { MyContext } from "./context";
import { Box, Heading } from "@chakra-ui/react";

function App() {
  return (
    <Box mt="20px" mb={"200px"}>
      <Heading style={{ color: "green", textAlign: "center" }} mb={"10px"}>
        E-Commerce Metrics
      </Heading>
      <div
        style={{
          borderTop: "1px solid black",
          width: "100%",
          marginBottom: "10px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          flexWrap: "wrap",
          rowGap: "20px",
        }}
      >
        <BarChart />
        <LineChart />
        <div
          style={{
            minWidth: "400px",
            maxWidth: "800px",
            height: "400px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <DoughnutChart />
        </div>
      </div>
    </Box>
  );
}

export default App;
