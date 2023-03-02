const mySeries = [
  {
    name: "В программе ИТ П.",
    type: "bar",
    stack: "Ad",
    data: [191, 182, 234, 290, 330, 310],
  },
  {
    name: "В программе ЦП П.",
    type: "bar",
    stack: "Ad",
    data: [120, 120, 120, 120, 120, 120],
  },

  {
    name: "Вне программ ИТ П.",
    type: "bar",
    stack: "Search Engine",
    data: [101, 132, 134, 290, 230, 220],
  },

  {
    name: "Вне программ ЦП П.",
    type: "bar",
    stack: "Search Engine",
    data: [701, 732, 734, 1090, 1130, 1120],
  },
];

const seriesHandler = (series) => {
  return series.map((serie, index) => {
    if (index === series.length - 1) {
      return {
        ...serie,
        label: {
          normal: {
            show: true,
            fontSize: 20,
            color: "black",
            position: "top",
            formatter: (params) => {
              let total = 0;
              series.forEach((s) => {
                total += s.data[params.dataIndex];
              });
              return total;
            },
          },
        },
      };
    } else {
      return serie;
    }
  });
};

const handleLegendSelectChanged = (event, series) => {
  const includedSeriesNames = [];
  for (const [name, value] of Object.entries(event.selected)) {
    if (value) {
      includedSeriesNames.push(name);
    }
  }

  const includedSeries = series.filter((serie) => {
    return includedSeriesNames.includes(serie.name);
  });

  return seriesHandler(includedSeries);
};

const dom = document.getElementById("container");
const myChart = echarts.init(dom);

const option = {
  tooltip: {
    trigger: "axis",
    textStyle: {
      color: "#002033",
      fontWeight: "bold",
    },
    backgroundColor: "rgba(255, 255, 255, 1)",
  },

  grid: {
    left: "3%",
    right: "4%",
    bottom: "8%",
    containLabel: true,
  },
  yAxis: {
    type: "value",
  },
  xAxis: {
    type: "category",
    data: ["Май", "Апрель", "Июнь", "Июль", "Август", "Сентябрь"],
  },
  legend: {
    bottom: 0,
    data: [
      "В программе ИТ П.",
      "В программе ЦП П.",
      "Вне программ ИТ П.",
      "Вне программ ЦП П.",
    ],
    textStyle: {
      color: "rgba(0, 32, 51, 0.6)",
    },
    icon: "circle",
  },
  backgroundColor: "#FFFFFF",
  textStyle: {
    color: "rgba(0, 32, 51, 0.6)",
  },
  color: ["#56B9F2", "#0078D2", "#22C38E", "#00724C"],
};

myChart.setOption({
  ...option,
  series: seriesHandler(mySeries),
});

myChart.on("legendselectchanged", (event) => {
  myChart.setOption({
    series: handleLegendSelectChanged(event, mySeries),
  });
});

{
  /* <script
      src="https://cdnjs.cloudflare.com/ajax/libs/echarts/4.8.0/echarts.js"
      integrity="sha512-5/8+cwsZ4fICxk706J4H0/UMZT2LKivISN26mgN86wCD4AHFvdFOBm/95z3dKLpnaHNzzwKuoBtrbKv+++SLTg=="
      crossorigin="anonymous"
    ></script>
    <script src="./js/app.js"></script> */
}
