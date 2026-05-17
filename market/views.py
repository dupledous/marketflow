from django.shortcuts import render
import random
from django.http import JsonResponse

# Create your views here.
#dashbord
def dashboard(request,symbol):
    contexto={
        'symbol': symbol.upper()
    }
    return render(request,"market/index.html",contexto)



#una funcion que genere un precio aleatorio y devuelva JSON
markets={'ORO':{'price':300,'history':[],'vol':0.005},
            'SP500':{'price':100,'history':[],'vol':0.001}

    }
def generate_market_price(request,symbol):
    global markets
    asset = markets.get(symbol.upper())
    if not asset:
        return JsonResponse({'error':'market not found'},
                            status=404)
    last_price = asset['price']
    variation = asset['price'] * random.uniform(-asset['vol'],asset['vol'])
    asset['price']  =round(asset['price'] + variation, 2)
    asset['history'].append(asset['price'])
    if len(asset['history']) > 20:
        asset['history'].pop(0)
    difference = round(asset['price']- last_price, 2)
    velocity = abs(difference)
    if difference > 0:
        trend = "uptrend"
    elif difference <  0:
        trend = "downtrend"
    else:
        trend = "neutral"
    data = {
        'symbol':symbol,
        'price':asset['price'],
        'trend':trend,
        'difference':difference,
        'velocity':velocity,
        'history':asset['history'][-20:]

    }
    return JsonResponse(data)