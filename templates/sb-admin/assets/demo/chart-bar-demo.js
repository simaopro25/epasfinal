const renderBarChart = async () => {
  const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/loginsPorMes");
  const dataArray = await response.json();

  var labels = dataArray.map(d => d.data);
  var valores = dataArray.map(d => d.numAcesso);

  var ctx = document.getElementById("myBarChart");
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: "Logins",
              backgroundColor: "rgba(2,117,216,0.8)",
              borderColor: "rgba(2,117,216,1)",
              data: valores
          }]
      },
      options: {
          scales: {
              xAxes: [{ gridLines: { display: false } }],
              yAxes: [{ ticks: { min: 0 } }]
          },
          legend: { display: false }
      }
  });
};

renderBarChart();