export const OPTIONS_CHART = {
  maintainAspectRatio: false,
  scales: {
    x: { offset: true },
    y: { offset: true }
  },
  plugins: {
    legend: { display: false },
    datalabels: {
      labels: [
        {
          anchor: 'end',
          align: 'top',
          offset: 0,
          color: 'rgb(255 255 255 / 0.75)',
          formatter: (value) => (value > 0 ? value : '')
        }
      ]
    }
  }
};
