"""
URL configuration for productSys project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path('admin/', admin.site.urls),
    path('brands/', include('brands.urls')),
    path('login/', include('users.urls')),
    path('target/', include('targets.urls')),
    path('pi/', include('products.urls')),
    path('supplier/', include('suppliers.urls')),
    path('ci/', include('invoices.urls')),
    path('cn/',include('credits.urls')),
    path('remittance/',include('remittances.urls')),
]
