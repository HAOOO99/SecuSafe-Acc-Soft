from django.urls import path
from . import views


urlpatterns = [
    path('', views.get_PIs, name='getPIs'),
    path('values/', views.get_total_values, name='getTotalValues'),
    path('years/', views.get_years, name='getYears'),
    path('update', views.update_comment, name='updateComment'),
    path('add', views.add_PI, name='addPI'),

]