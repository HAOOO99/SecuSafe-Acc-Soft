from django.urls import path
from . import views


urlpatterns = [
    path('', views.get_targets, name='getTargets'),

]