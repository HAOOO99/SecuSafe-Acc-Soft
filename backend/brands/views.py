import json
from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Brand
from django.middleware.csrf import get_token
from django.http import JsonResponse
from productSys import settings
# from rest_framework.permissions import IsAuthenticated


@csrf_exempt
@require_http_methods(["GET"])
def show(request):

    response = {}
    try:
        companys = Brand.objects.all().values()
        print(companys)  # Converts the QuerySet to a list
        compnay_list = []
        for each in companys:
            print(each)
            compnay_list.append({
                "name":each["company_name"]
                })
        response["company"] = compnay_list
        response["status"] = "success"
       
    except Exception as e:
        response["status"] = "failed"
        response["msg"] = "failed to show"
        print(e)
    print(response)
    return JsonResponse(response)