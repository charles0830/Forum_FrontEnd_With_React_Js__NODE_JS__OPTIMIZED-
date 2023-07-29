import React, { Component } from 'react';

class CircularChartComponent extends Component {
  chartRef = React.createRef();
  chartInstance = null;

  componentDidMount() {
    this.createChart();
  }

  componentWillUnmount() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  createChart() {
    const data = {
      labels: ['Male', 'Female'],
      datasets: [
        {
          label: 'User Percentage',
          data: [65, 35], // Replace these values with your actual data for male and female
          backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'], // Set background color for each data item
          borderColor: 'white',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Male Vs Female User Statistics ...',
          color: 'white', // Change font color of the title
          font: {
            family: 'Lugrasimo',
            size: 16,
          },
        },
      },
      legend: {
        labels: {
          color: 'white', // Change font color of the legend
          font: {
            family: 'Verdana', // Change the font family here
            size: 12,
            color: 'white',
          },
        },
      },
      scales: {
        x: {
          display: false, // Hide x-axis
          ticks: {
            color: 'white', // Change font color of y-axis tick labels to white
          },
        },
        y: {
          display: false, // Hide y-axis
          ticks: {
            color: 'white', // Change font color of y-axis tick labels to white
          },
        },
      },
    };

    const ctx = this.chartRef.current.getContext('2d');

    // Destroy previous chart instance if exists
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    // Create the new chart instance
    this.chartInstance = new window.Chart(ctx, {
      type: 'doughnut', // Use 'doughnut' for a circular chart
      data: data,
      options: options,
    });
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default CircularChartComponent;