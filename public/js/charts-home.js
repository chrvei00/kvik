document.addEventListener("DOMContentLoaded", function () {
  // ------------------------------------------------------- //
  // Line Chart
  // ------------------------------------------------------ //
  var list = [];
  var b = document
    .getElementById("chartScript")
    .getAttribute("chartData")
    .split(",");
  for (var i = 0; i < b.length; i++) {
    list.push(parseInt(b[i]));
  }
  var lineChart1 = new Chart(document.getElementById("lineChart1"), {
    type: "line",
    options: {
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              max: list.max,
              min: 0,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
      },

      legend: {
        display: false,
      },
    },
    data: {
      labels: [
        "Januar",
        "Februar",
        "Mars",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      datasets: [
        {
          label: "Reklamasjoner",
          fill: true,
          lineTension: 0.4,
          backgroundColor: "transparent",
          borderColor: window.colors.blue,
          pointBorderColor: window.colors.blue,
          pointHoverBackgroundColor: window.colors.blue,
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          borderWidth: 3,
          pointBackgroundColor: "blue",
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 1,
          pointRadius: 0,
          pointHitRadius: 1,
          data: list,
          spanGaps: false,
        },
      ],
    },
  });
  // ------------------------------------------------------- //
  // Pie Chart
  // ------------------------------------------------------ //

  var data = [];
  var b = document
    .getElementById("chartScript")
    .getAttribute("solvedData")
    .split(",");
  for (var i = 0; i < b.length; i++) {
    data.push(parseInt(b[i]));
  }
  var pieChartSolved = new Chart(document.getElementById("pieChartSolved"), {
    type: "doughnut",
    options: {
      cutoutPercentage: 90,
      legend: {
        display: false,
      },
    },
    data: {
      labels: ["Arkiverte", "Åpne"],
      datasets: [
        {
          data: data,
          borderWidth: [0, 0],
          backgroundColor: [window.colors.green, "#eee"],
          hoverBackgroundColor: [window.colors.green, "#eee"],
        },
      ],
    },
  });
  var data = [];
  var b = document
    .getElementById("chartScript")
    .getAttribute("finishedData")
    .split(",");
  for (var i = 0; i < b.length; i++) {
    data.push(parseInt(b[i]));
  }
  var pieChartFinishedInTime = new Chart(
    document.getElementById("pieChartFinishedInTime"),
    {
      type: "doughnut",
      options: {
        cutoutPercentage: 90,
        legend: {
          display: false,
        },
      },
      data: {
        labels: ["Fullført innen tidsfrist", "Fullført etter tidsfrist"],
        datasets: [
          {
            data: data,
            borderWidth: [0, 0],
            backgroundColor: [window.colors.green, "#eee"],
            hoverBackgroundColor: [window.colors.green, "#eee"],
          },
        ],
      },
    }
  );
});
