import React, { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

let categoryData = {
  labels: ["01", "02", "03", "04", "05"],
  datasets: [
    {
      label: "Electronics",
      data: [20, 50, 40, 70, 10],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Apparel",
      data: [15, 5, 8, 30, 10],
      backgroundColor: "rgba(54, 162, 235, 0.5)",
    },
    {
      label: "Home & Garden",
      data: [5, 3, 4, 6, 1],
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
  ],
};

let productData = {};
let totalData = {};

export const ContextProvider = ({ children }) => {
  const [filter, setFilter] = useState("UnitsSold");
  const [year, setYear] = useState(2024);
  const [lineChartFilter, setLineChartFilter] = useState("Revenue");
  const [doughnutChartFilter, setDoughnutChartFilter] = useState("Revenue");
  const [originaldata, setOriginaldata] = useState();
  const [compareByYearLineChart, setCompareByyearLineChart] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await fetch("http://localhost:8000/ecommerceMetrics");

        let data = await res.json();

        let arr = data.filter((ele) => {
          return ele.Year == year;
        });

        if (year == 12) {
          arr = data.filter((ele, index) => {
            return index < 12;
          });
        }

        categoryData = {
          labels: arr.map((ele) => {
            return ele.Month;
          }),
          datasets: [
            {
              label: "Electronics",
              data: arr.map((ele) => {
                return ele.Category.Electronics.reduce(
                  (acc, cur) => acc + cur[filter],
                  0
                );
              }),
              backgroundColor: "rgb(255, 99, 132)",
            },
            {
              label: "Apparel",
              data: arr.map((ele) => {
                return ele.Category.Apparel.reduce(
                  (acc, cur) => acc + cur[filter],
                  0
                );
              }),
              backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
            {
              label: "HomeGarden",
              data: arr.map((ele) => {
                return ele.Category.HomeGarden.reduce(
                  (acc, cur) => acc + cur[filter],
                  0
                );
              }),
              backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
          ],
        };
        setOriginaldata(data);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, [filter, year]);

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await fetch("http://localhost:8000/ecommerceMetrics");

        let data = await res.json();
        let arr = data;

        let productsobj = {};

        arr.forEach((ele) => {
          ele.Category.Electronics.forEach((ele) => {
            if (productsobj[ele.Product] == undefined) {
              productsobj[ele.Product] = ele[lineChartFilter];
            } else {
              productsobj[ele.Product] += ele[lineChartFilter];
            }
          });
          ele.Category.Apparel.forEach((ele) => {
            if (productsobj[ele.Product] == undefined) {
              productsobj[ele.Product] = ele[lineChartFilter];
            } else {
              productsobj[ele.Product] += ele[lineChartFilter];
            }
          });
          ele.Category.HomeGarden.forEach((ele) => {
            if (productsobj[ele.Product] == undefined) {
              productsobj[ele.Product] = ele[lineChartFilter];
            } else {
              productsobj[ele.Product] += ele[lineChartFilter];
            }
          });
        });

        let keys = Object.keys(productsobj);
        let values = Object.values(productsobj);

        for (let i = 0; i < values.length; i++) {
          for (let j = 0; j < values.length - 1; j++) {
            if (values[j] > values[j + 1]) {
              [values[j], values[j + 1]] = [values[j + 1], values[j]];
              [keys[j], keys[j + 1]] = [keys[j + 1], keys[j]];
            }
          }
        }
        keys = keys.reverse();
        values = values.reverse();
        productData = {
          labels: keys,
          datasets: [
            {
              label: lineChartFilter,
              data: values,
              backgroundColor: "rgba(255, 9, 9, 0.5)",
              borderColor: "rgba(255, 9, 9, 0.5)",
            },
          ],
        };
        setOriginaldata(data);
      } catch (e) {}
    };
    getData();
  }, [lineChartFilter]);

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await fetch("http://localhost:8000/ecommerceMetrics");

        let data = await res.json();
        let arr = data;

        let productsobj = { Electronics: 0, Apparel: 0, HomeGarden: 0 };

        arr.forEach((ele) => {
          ele.Category.Electronics.forEach((ele) => {
            productsobj.Electronics += ele[doughnutChartFilter];
          });
          ele.Category.Apparel.forEach((ele) => {
            productsobj.Apparel += ele[doughnutChartFilter];
          });
          ele.Category.HomeGarden.forEach((ele) => {
            productsobj.HomeGarden += ele[doughnutChartFilter];
          });
        });

        let keys = Object.keys(productsobj);
        let values = Object.values(productsobj);

        for (let i = 0; i < values.length; i++) {
          for (let j = 0; j < values.length - 1; j++) {
            if (values[j] > values[j + 1]) {
              [values[j], values[j + 1]] = [values[j + 1], values[j]];
              [keys[j], keys[j + 1]] = [keys[j + 1], keys[j]];
            }
          }
        }

        keys = keys.reverse();
        values = values.reverse();

        totalData = {
          labels: keys,
          datasets: [
            {
              label: "value",
              data: values,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
            },
          ],
        };
        setOriginaldata(data);
      } catch (e) {}
    };
    getData();
  }, [doughnutChartFilter]);

  function compareByYear() {
    productData = [];
    let arr = originaldata;
    let productsobj3 = {};
    let productsobj4 = {};

    arr.forEach((ele) => {
      if (ele.Year == 2023) {
        ele.Category.Electronics.forEach((ele) => {
          if (productsobj3[ele.Product] == undefined) {
            productsobj3[ele.Product] = ele[lineChartFilter];
          } else {
            productsobj3[ele.Product] += ele[lineChartFilter];
          }
        });
        ele.Category.Apparel.forEach((ele) => {
          if (productsobj3[ele.Product] == undefined) {
            productsobj3[ele.Product] = ele[lineChartFilter];
          } else {
            productsobj3[ele.Product] += ele[lineChartFilter];
          }
        });
        ele.Category.HomeGarden.forEach((ele) => {
          if (productsobj3[ele.Product] == undefined) {
            productsobj3[ele.Product] = ele[lineChartFilter];
          } else {
            productsobj3[ele.Product] += ele[lineChartFilter];
          }
        });
      } else {
        ele.Category.Electronics.forEach((ele) => {
          if (productsobj4[ele.Product] == undefined) {
            productsobj4[ele.Product] = ele[lineChartFilter];
          } else {
            productsobj4[ele.Product] += ele[lineChartFilter];
          }
        });
        ele.Category.Apparel.forEach((ele) => {
          if (productsobj4[ele.Product] == undefined) {
            productsobj4[ele.Product] = ele[lineChartFilter];
          } else {
            productsobj4[ele.Product] += ele[lineChartFilter];
          }
        });
        ele.Category.HomeGarden.forEach((ele) => {
          if (productsobj4[ele.Product] == undefined) {
            productsobj4[ele.Product] = ele[lineChartFilter];
          } else {
            productsobj4[ele.Product] += ele[lineChartFilter];
          }
        });
      }
      productData = {
        labels: Object.keys(productsobj3),
        datasets: [
          {
            label: 2023,
            data: Object.values(productsobj3),
            backgroundColor: "rgba(255, 9, 9, 0.5)",
            order: 2,
            borderColor: "rgba(255, 9, 9, 0.5)",
          },
          {
            label: 2024,
            data: Object.values(productsobj4),
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            order: 1,
            borderColor: "rgba(54, 162, 235, 0.5)",
          },
        ],
      };
    });
    setCompareByyearLineChart(!compareByYearLineChart);
  }

  return (
    <MyContext.Provider
      value={{
        setFilter,
        categoryData,
        productData,
        setYear,
        setLineChartFilter,
        compareByYear,
        totalData,
        setDoughnutChartFilter,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
