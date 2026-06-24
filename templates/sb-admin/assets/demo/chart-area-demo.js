// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

let datalida=[]
let etiqlida=[]
//let maximo=0

const contarArtigos = async () => {
      let strHtml = ``
      const response = await fetch("https://epas.alunos.esmonserrate.org/public//api/noticias/contar")
      const dataArray= await response.json()
      for (const dataRecord of dataArray) {
        /* if(maximo<dataRecord.NUMERO*1){
          maximo=dataRecord.NUMERO*1
          alert(maximo)
        } */
        datalida.push(dataRecord.NUMERO)
        etiqlida.push(dataRecord.DATAS)
        //console.log(etiqlida);
        strHtml += `
        
                   `
      }
      //document.getElementById("caixas").innerHTML = strHtml;
}

contarArtigos()
console.log(datalida)
console.log(etiqlida)
/* maximo=Math.max(datalida)
console.log(maximo) */

// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: etiqlida,
    datasets: [{
      label: "Sessions",
      lineTension: 0.3,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: datalida,
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          //max: 4,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
