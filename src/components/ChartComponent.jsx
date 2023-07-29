import React, { Component } from 'react';

class ChartComponent extends Component {
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
      labels: ['Emotional', 'Study Related', 'Travel', 'Coding', 'Relationship', 'Joblife', 'Motivational','Marketing','Medical Issues','Food'],
      datasets: [
        {
          label: 'Posts per Problems ...',
          data: [65, 59, 80, 81, 56, 55, 40,41,91,21],
          color: 'rgba(255, 255, 255, 0.8)',
          backgroundColor: 'rgba(255, 255, 255, 1)', // Set background color to white with 20% opacity
          borderColor: 'rgba(255, 255, 255, 1)', // Set border color to white
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
          text: 'Posts per Problems ...',
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
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false, // Hide x-axis grid lines
          },
          ticks: {
            color: 'white', // Change font color of y-axis tick labels to white
          },
          barPercentage: 0.5,
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.7)', // Set y-axis grid lines color to white with 20% opacity
          },
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
      type: 'bar', // Change to 'bar' for a bar chart
      data: data,
      options: options,
    });
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default ChartComponent;




