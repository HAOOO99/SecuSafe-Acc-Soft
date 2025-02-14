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

from .models import CI

@csrf_exempt
@require_http_methods(["GET"])
def get_CIs(request):
    response = {}

    try:
        current_brand = request.GET.get("brand")
        year = request.GET.get("year")
        if request.GET.get("CI_no") == None or request.GET.get("CI_no")=="":
            
            cis = CI.objects.all().filter(brand = current_brand, date__year = year).order_by('date')
        else:
            ci = request.GET.get("CI_no")
            cis = CI.objects.all().filter(brand = current_brand, date__year = year,CI_no=ci).order_by('date')

        print(cis.values())
        ci_list = []
        for each in cis.values():
            ci_list.append(each)
        print(ci_list)
        response["status"] = "success"
        response["CIs"] = ci_list

    except Exception as e:
        response["status"] = "failed"
        response["msg"] = "failed to show"
        print(e)

    print(response)
    return JsonResponse(response)

@csrf_exempt
@require_http_methods(["GET"])
def get_total_values(request):
    response = {}
    try:
        current_brand = request.GET.get("brand")
        year = request.GET.get("year")
        current_year_cis = CI.objects.filter(brand = current_brand, date__year = year)
        total_usd = current_year_cis.aggregate(total_usd=Sum('value_USD'))
        total_aud = current_year_cis.aggregate(total_aud=Sum('value_AUD'))

        if total_usd["total_usd"] == None:
            total_usd["total_usd"] = 0
        if total_aud["total_aud"] == None:
            total_aud["total_aud"] = 0
        print(total_usd,total_aud)

        values_map = [total_usd,total_aud]

        response["status"] = "success"
        response["total_CI"] = values_map

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

        cis = CI.objects.filter(brand = current_brand)
        print(cis.values().count())
        years_list = []
        if cis.values().count() != 0:
            for each in cis.values() :
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
@require_http_methods(["GET"])
def category_cis(request):
    response = {}
    try:
        current_brand = request.GET.get("brand")
        year = request.GET.get("year")
        cis = CI.objects.all().filter(brand = current_brand,date__year = year)
        print(cis.values())
        cis_list = []
        if cis.values().count() != 0:
            for each in cis.values():
                cis_list.append(each["CI_no"])
                print(each["CI_no"])
                cis_list = list(dict.fromkeys(cis_list))
        
        response["status"] = "success"
        response["category_cis"] = cis_list

    except Exception as e:
        response["status"] = "failed"
        response["msg"] = "failed to show"
        print(e)

    print(response)
    return JsonResponse(response)

@csrf_exempt
@require_http_methods(["GET"])
def select_cis(request):
    response = {}
    try:
        current_brand = request.GET.get("brand")
        year = request.GET.get("year")
        chosen_Ci = request.GET.get("ciNo")
        cis = CI.objects.all().filter(brand = current_brand,date__year = year,CI_no=chosen_Ci)
        print(cis.values())
        cis_list = []
        for each in cis.values():
            cis_list.append(each)

        # cis_list = list(dict.fromkeys(cis_list))
        response["status"] = "success"
        response["selected_cis"] = cis_list

    except Exception as e:
        response["status"] = "failed"
        response["msg"] = "failed to show"
        print(e)

    print(response)
    return JsonResponse(response)

@csrf_exempt
@require_http_methods(["POST"])
def add_CI(request):
    response = {}
    try:
        if not request.body:
            response["status"] = "failed"
            response["msg"] = "Empty request body"
            return JsonResponse(response)
        if request.content_type == 'application/json':
            payload = json.loads(request.body.decode())
        
            print("Payload:", payload)  # Debugging statement

            company_name = payload["company_name"]
            supplier_name = payload["supplier"]
            PO_number = payload["PO_number"]
            CI_number = payload["CI_number"]
            date = payload["date"]
            USD = payload["USD"]
            AUD = payload["AUD"]
            freight = payload["Freight"]
            
        else:
            company_name = request.POST.get("company_name")
            supplier_name = request.POST.get("supplier_name")
            PO_number = request.POST.get("PO_number")
            CI_number = request.POST.get("CI_number")
            date = request.POST.get("date")
            USD = request.POST.get("USD")
            AUD = request.POST.get("AUD")
            freight = request.POST.get("Freight")
           


        CI.objects.create(
            brand=company_name,
            supplier=supplier_name,
            PO_no=PO_number,
            CI_no=CI_number,
            date=date,
            value_USD=USD,
            value_AUD=AUD,
            freight=freight
            
        )
        print(CI.objects.filter(brand = company_name).values())
        response["status"] = "success"
        response["msg"] = "CI added"
    except json.JSONDecodeError as e:
        response["status"] = "failed"
        response["msg"] = "Invalid JSON"
        print("JSONDecodeError:", e)
    except Exception as e:
        response["status"] = "failed"
        response["msg"] = "failed to add CI"
        print(e)

    print(response)
    return JsonResponse(response)