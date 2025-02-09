from django.urls import path
from . import views


urlpatterns = [
    path('', views.get_CIs, name='getCIs'),
    path('values', views.get_total_values, name='getTotalValues'),
    path('years/', views.get_years, name='getYears'),

    path('cis',views.category_cis,name='getCIs'),
    path('select',views.select_cis,name="getSelectedCis"),
    path('addCI',views.add_CI,name='addNewCI'),
]