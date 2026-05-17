//el api
async function market_dashboard() {
    try{
        const response = await fetch(`/api/${currentAsset}/`);
        const data = await response.json();

        if (!response.ok){
            throw new Error('API Error')

        }

        const price = document.getElementById('price');
        const trend = document.getElementById('trend');
        

        const color = data.difference > 0 ? 'green' : 'red';
        marketchart.data.datasets[0].borderColor = color;
        marketchart.data.datasets[0].label = `Precio ${data.symbol}`

        
        const now = new Date().toLocaleTimeString();

        if (marketchart.data.labels.length  > 20){
            marketchart.data.labels.shift();
            marketchart.data.datasets[0].data.shift();
        }

        marketchart.data.datasets[0].data.push(data.price)
        marketchart.data.labels.push(now)

        price.textContent = `$${data.price.toFixed(2)}`;
        applyFlash(price, data.difference);
        
        trend.textContent =data.trend === 'uptrend'
        ? '📈 UPTREND'
        : '📉 DOWNTREND';
        
        marketchart.update();
    } catch (error){
        console.error("Error en la connexion:", error)
    }
    
}
market_dashboard();
setInterval(market_dashboard,1000)