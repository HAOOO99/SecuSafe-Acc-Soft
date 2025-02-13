from django.urls import path
from . import views


urlpatterns = [
    path('', views.get_remittances, name='getRemittances'),
    path('years/', views.get_years, name='getYears'),
]