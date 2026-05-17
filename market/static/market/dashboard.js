// diseno del dashboard
const chartlinea = document.getElementById('marketchart').getContext('2d');
const marketchart = new Chart(chartlinea, {
    type : 'line',
    data:{
        labels:[],
        datasets:[{
            label:'Market Price',
            data:[],
            borderColor:'#3498db',
            borderWidth:2,
            pointRadius:0,
            fill:false,
            tension:0.4
        }]
        
    },
    options:{
        scales:{y: {beginAtZero:false} },
        animation:false
    }
});

let currentAsset = document.body.dataset.symbol
function switchMarket(newAsset){
    currentAsset = newAsset;

    marketchart.data.labels = [];
    marketchart.data.datasets[0].data = [];
    marketchart.update();

    document.getElementById('active-symbol').innerText = newAsset

    market_dashboard()
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("active-symbol").innerText = currentAsset
})