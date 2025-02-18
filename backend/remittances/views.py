import json

from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from django.http import JsonResponse
from django.db.models import Sum

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from .models import Remittance

@csrf_exempt
@require_http_methods(["GET"])
def get_remittances(request):
    response = {}
    try:
        current_brand = request.GET.get("brand")
        year = request.GET.get("year")
        remittances = Remittance.objects.all().filter(brand = current_brand, date__year = year).order_by('date')
        print(remittances.values())
        re_list = []
        for each in remittances.values():
            re_list.append(each)
        print(re_list)
        response["status"] = "success"
        response["REs"] = re_list

    except Exception as e:
        response["status"] = "failed"
        response["msg"] = "failed to show"
        print(e)

    print(response)
    return JsonResponse(response)



@csrf_exempt
@require_http_methods(["GET"])
def get_years(request):
    response = {}
    try:
        current_brand = request.GET.get("brand")

        res = Remittance.objects.filter(brand = current_brand)
        print(res.values().count())
        years_list = []
        if res.values().count() != 0:
            for each in res.values() :
                years_list.append(each["date"].year)
                print(each["date"].year)
                years_list = list(dict.fromkeys(years_list))
        else:
            years_list.append(datetime.now().year)

        
        response["status"] = "success"
        response["total_years"] = years_list

    except Exception as e:
        response["status"] = "failed"
        response["msg"] = "failed to show"
        print(e)

    print(response)
    return JsonResponse(response)



@csrf_exempt
@require_http_methods(["POST"])
def add_Pos(request):
    response = {}
    try:
        payload = json.loads(request.body.decode())
        print(payload)
        id = payload.get("id")

        res = Remittance.objects.filter(id = id)
        pos = payload.get("pos")
        res.update(PO=pos)
        print(Remittance.objects.filter(id=id))
        response["status"] = "success"
        # response["total_years"] = res.values()

    except Exception as e:
        response["status"] = "failed"
        response["msg"] = "failed to show"
        print(e)

    print(response)
    return JsonResponse(response)
