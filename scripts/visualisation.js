import { dataArray } from "./dataset.js";

document.addEventListener("DOMContentLoaded", function () {
  // Get the container element
  const chartContainer = document.getElementById("chartContainer");
  const chartContainer2 = document.getElementById("chartContainer2");

  // Create scatter chart with dynamic size
  createScatterChart(dataArray, chartContainer);
  createScatterChart2(dataArray, chartContainer2);

  // Function to create scatter chart with zoom and drag
  function createScatterChart(data, container) {
    // Create a canvas element
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    // Set canvas size based on container size
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const ctx = canvas.getContext("2d");

    // Extract data from the array of objects
    const labels = data.map((item) => item.label);
    const uniqueLabels = [...new Set(labels)]; // Get unique labels

    // Generate random colors for each unique label
    const labelColors = generateRandomColors(uniqueLabels.length);

    // Create scatter dataset
    const scatterDataset = data.map((item, index) => ({
      x: item.width,
      y: item.height,
      label: item.label,
      color: labelColors[uniqueLabels.indexOf(item.label)],
    }));

    // Create scatter chart with zoom and drag options
    const scatterChart = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            data: scatterDataset,
            pointBackgroundColor: scatterDataset.map((point) => point.color),
          },
        ],
      },
      options: {
        animation: false,
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            title: {
              display: true,
              text: "Width",
            },
          },
          y: {
            type: "linear",
            position: "left",
            title: {
              display: true,
              text: "Height",
            },
          },
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: "xy",
            },
            zoom: {
              drag: {
                enabled: true,
                borderColor: "rgb(54, 162, 235)",
                borderWidth: 1,
                backgroundColor: "rgba(54, 162, 235, 0.3)",
              },
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: "xy",
            },
          },
          legend: {
            display: true,
            position: "right", // Default position for desktop
            labels: {
              generateLabels: function (chart) {
                const legendLabels = [];
                uniqueLabels.forEach((label, index) => {
                  legendLabels.push({
                    text: label,
                    fillStyle: labelColors[index],
                  });
                });
                return legendLabels;
              },
            },
          },
        },
        tooltips: {
          callbacks: {
            label: (context) => {
              const dataPoint = context.parsed;
              return `Label: ${dataPoint.label}`;
            },
          },
        },
      },
    });

    // Adjust legend position for mobile devices
    if (window.innerWidth <= 600) {
      scatterChart.options.plugins.legend.position = "bottom";
    } else {
      scatterChart.options.plugins.legend.position = "right";
    }

    // Resize the chart when the window is resized
    window.addEventListener("resize", function () {
      // Adjust legend position for mobile devices
      if (window.innerWidth <= 600) {
        scatterChart.options.plugins.legend.position = "bottom";
      } else {
        scatterChart.options.plugins.legend.position = "right";
      }
    });
  }
  //
  function createScatterChart2(data, container) {
    // Create a canvas element
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    // Set canvas size based on container size
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const ctx = canvas.getContext("2d");

    // Extract data from the array of objects
    const labels = data.map((item) => item.label);
    const uniqueLabels = [...new Set(labels)]; // Get unique labels

    // Generate random colors for each unique label
    const labelColors = generateRandomColors(uniqueLabels.length);

    // Create scatter dataset
    const scatterDataset = data.map((item, index) => ({
      x: item.pathCount,
      y: item.pointCount,
      label: item.label,
      color: labelColors[uniqueLabels.indexOf(item.label)],
    }));

    // Create scatter chart with zoom and drag options
    const scatterChart = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            data: scatterDataset,
            pointBackgroundColor: scatterDataset.map((point) => point.color),
          },
        ],
      },
      options: {
        animation: false,
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            title: {
              display: true,
              text: "pathCount",
            },
          },
          y: {
            type: "linear",
            position: "left",
            title: {
              display: true,
              text: "pointCount",
            },
          },
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: "xy",
            },
            zoom: {
              mode: "xy",
              drag: {
                enabled: true,
                borderColor: "rgb(54, 162, 235)",
                borderWidth: 1,
                backgroundColor: "rgba(54, 162, 235, 0.3)",
                threshold: 100,
              },
              pinch: {
                enabled: true,
              },
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: "xy",
            },
          },
          legend: {
            display: true,
            position: "right", // Default position for desktop
            labels: {
              generateLabels: function (chart) {
                const legendLabels = [];
                uniqueLabels.forEach((label, index) => {
                  legendLabels.push({
                    text: label,
                    fillStyle: labelColors[index],
                  });
                });
                return legendLabels;
              },
            },
          },
        },
        tooltips: {
          callbacks: {
            label: (context) => {
              const dataPoint = context.parsed;
              return `Label: ${dataPoint.label}`;
            },
          },
        },
      },
    });

    // Adjust legend position for mobile devices
    if (window.innerWidth <= 600) {
      scatterChart.options.plugins.legend.position = "bottom";
    } else {
      scatterChart.options.plugins.legend.position = "right";
    }

    // Resize the chart when the window is resized
    window.addEventListener("resize", function () {
      // Adjust legend position for mobile devices
      if (window.innerWidth <= 600) {
        scatterChart.options.plugins.legend.position = "bottom";
      } else {
        scatterChart.options.plugins.legend.position = "right";
      }
    });
  }
  //

  // Function to generate random colors
  function generateRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const randomColor = `rgba(${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, 0.7)`;
      colors.push(randomColor);
    }
    return colors;
  }
});
