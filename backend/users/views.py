import json
import random
import smtplib
from django.core.mail import send_mail

from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login,logout

from django.http import JsonResponse

from django.contrib.auth.models import User
from productSys import settings
from rest_framework_simplejwt.tokens import RefreshToken


OTP_STORAGE = {}  # ✅ Temporary store OTPs (Consider using Redis for production)


# @csrf_exempt
# @require_http_methods(["POST"])
# def send_verification_email(request):
#     payload = json.loads(request.body.decode())
#     print(payload)
#     email = payload['email']
#     # print(email)
#     try:
#         user = User.objects.filter(email=email).values().first()
        
#     except user.DoesNotExist:
#         return JsonResponse({"error": "User not found"}, status=400)

#     otp = str(random.randint(100000, 999999))  # ✅ Generate 6-digit OTP
#     OTP_STORAGE[email] = otp  # ✅ Store OTP (Use a more secure storage in production)
#     print(OTP_STORAGE)
#     send_mail(
#         'Your Login Verification Code',
#         f'Your OTP code is {otp}. It is valid for 5 minutes.',
#         settings.EMAIL_HOST_USER,  # Change to your email
#         [email],
#         fail_silently=False,
#     )

#     return JsonResponse({"message": "Verification email sent","otp":otp}, status=200)


@csrf_exempt
@require_http_methods(["POST"])
def verify_otp_and_login(request):
    response = {}
    payload = json.loads(request.body.decode())
    email =payload['email']
    otp = payload['otp']
    print(OTP_STORAGE)
    if OTP_STORAGE.get(email) == otp:  # ✅ Verify OTP
        user = User.objects.filter(email=email).values().first()
        
        print(user['username'])
        print(user['password'])

        user = authenticate(username=user['username'], password=user['password'])

        if user:
            refresh = RefreshToken.for_user(user)
            del OTP_STORAGE[email]  # ✅ Remove OTP after use

            response["status"] = "success"
            response["msg"] = "Login successful"
            response["user"] = {"id": user.id, "username": user.username, "email": user.email}
            response["token"] = str(refresh.access_token)

        else:
            response["status"] = "failed"
            response["msg"] = "Invalid username or password"
        # login(request)
        
        return JsonResponse(response, status=200)
    
    return JsonResponse({"error": "Invalid OTP"}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def login(request):
    response = {}
    try:
       
        payload = json.loads(request.body.decode())
        username = payload.get("username")
        password = payload.get("password")
       
        user = authenticate(username=username, password=password)
        if user is not None:
            user_data = user.__dict__
            del user_data["_state"]  # Optional: Remove Django's internal state metadata
            print(user_data)
        else:
            print("Authentication failed.")

        email = user_data["email"]
        print(email)
        # try:
        #     user = User.objects.filter(email=email).values().first()
            
        # except user.DoesNotExist:
        #     return JsonResponse({"error": "User not found"}, status=400)

        otp = str(random.randint(100000, 999999))  # ✅ Generate 6-digit OTP
        OTP_STORAGE[email] = otp  # ✅ Store OTP (Use a more secure storage in production)
        print(OTP_STORAGE)
        send_mail(
            'Your Login Verification Code',
            f'Your OTP code is {otp}. It is valid for 5 minutes.',
            settings.EMAIL_HOST_USER,  # Change to your email
            [email],
            fail_silently=False,
        )

        return JsonResponse({"status":"success","message": "Verification email sent","otp":otp}, status=200)


        
       
    except Exception as e:
        response["status"] = "failed"
        response["msg"] = "failed to show"
        print(e)
    print(response)
    return JsonResponse(response)


@csrf_exempt
@require_http_methods(["POST"])
def uesr_exit(request):
    logout(request)
    response = {"status": "success", "msg": "the user have been logged out"}
    return JsonResponse(response)