import json

from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login,logout

from django.http import JsonResponse

from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken



@csrf_exempt
@require_http_methods(["POST"])
def login(request):
    response = {}
    try:
        print(request.POST)
        if request.content_type == 'application/json':
            payload = json.loads(request.body.decode())
            username = payload.get("username")
            password = payload.get("password")
        else:
            username = request.POST.get("username")
            password = request.POST.get("password")
        user = authenticate(username=username, password=password)

        print(user)  # Converts the QuerySet to a list

        if user:
            refresh = RefreshToken.for_user(user)

            response["status"] = "success"
            response["msg"] = "Login successful"
            response["user"] = {"id": user.id, "username": user.username, "email": user.email}
            response["token"] = str(refresh.access_token)

        else:
            response["status"] = "failed"
            response["msg"] = "Invalid username or password"
       
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