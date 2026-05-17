from django.urls import path
from market import views

urlpatterns = [
    path('api/<str:symbol>/',views.generate_market_price),
    path('dashboard/<str:symbol>/',views.dashboard),
]
