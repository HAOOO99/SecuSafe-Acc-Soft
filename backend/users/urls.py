from django.urls import path
from . import views


urlpatterns = [
    path('', views.login, name='login'),
    # path('send-email/',views.send_verification_email,name='sendEmail'),
    path('verify/',views.verify_otp_and_login,name='verify')

]