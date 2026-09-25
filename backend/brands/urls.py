from django.urls import path

from . import views

app_name = "brands"


urlpatterns = [
    path('', views.show, name="show_brand"),
]