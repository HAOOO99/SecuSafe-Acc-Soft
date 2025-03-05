from django.urls import path
from . import views


urlpatterns = [
    path('', views.get_CNs, name='getCNs'),
    path('years/',views.get_years,name='getYears'),
    path('update/',views.updateCN,name='updateCN'),
    path('status/',views.updateStatus,name="updateStatus"),
    path('addCN/',views.add_CN,name='addNewCN'),
    path('marketing/',views.get_marketing,name="getMarketingCN"),
]