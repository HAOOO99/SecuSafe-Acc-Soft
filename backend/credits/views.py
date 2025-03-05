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

from .models import CN

@csrf_exempt
@require_http_methods(["GET"])
def get_CNs(request):
    response = {}
    try:
        current_brand = request.GET.get("brand")
        year = request.GET.get("year")
        if(request.GET.get("brand") == 'UNV'):
            brands_name = ['UNV', 'Uniview']
            cns = CN.objects.all().filter(brand__in = brands_name, date__year = year).order_by('date')

        else:
            cns = CN.objects.all().filter(brand = current_brand, date__year = year).order_by('date')
        print(cns.values())
        cn_list = []
        for each in cns.values():
            cn_list.append(each)
        print(cn_list)
        response["status"] = "success"
        response["CNs"] = cn_list

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
        if(request.GET.get("brand") == 'UNV'):
            brands_name = ['UNV', 'Uniview']
            cns = CN.objects.filter(brand__in = brands_name)

        else:
            cns = CN.objects.filter(brand = current_brand)
        print(cns.values().count())
        years_list = []
        if cns.values().count() != 0:
            for each in cns.values() :
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
def updateCN(request):
    response={}
    try:
        payload = json.loads(request.body.decode())
        print(request.body.decode())
        current_brand=payload["brand"]
        supplier=payload["supplier"]
        id = payload["id"]
        supplier_cn = payload["supplierCN"]
        received_amount = payload["received"]
        currency = payload["currency"]
        ss_cn = payload["ssCN"]
        # status = payload["status"]

        cn = CN.objects.filter(brand=current_brand,id=id,supplier=supplier)
        
        cn.update(supplier_CN=supplier_cn,received=received_amount,received_currency=currency,ss_CN=ss_cn)
        print(cn.values())
        response["status"] = "success"
        # response["msg"] = json.dumps(cn.values())
    except Exception as e:
        response["status"] = "failed"
        response["msg"] = "failed to show"
        print(e)

    print(response)
    return JsonResponse(response)



@csrf_exempt
@require_http_methods(["POST"])
def updateStatus(request):
    response={}
    try:
        payload = json.loads(request.body.decode())
        print(request.body.decode())
        current_brand=payload["brand"]
        id = payload["id"]
        status = payload["status"]

        cn = CN.objects.filter(brand=current_brand,id=id)
        
        cn.update(status=status)
        print(cn.values())
        response["status"] = "success"
        # response["msg"] = json.dumps(cn.values())
    except Exception as e:
        response["status"] = "failed"
        response["msg"] = "failed to show"
        print(e)

    print(response)
    return JsonResponse(response)

@csrf_exempt
@require_http_methods(["POST"])
def add_CN(request):
    response = {}
    print(request.body.decode())
    try:
        if request.content_type == 'application/json':
            payload = json.loads(request.body.decode())
        
       
            company_name = payload["brand"]
            supplier_name = payload["supplier_name"]
            date = payload["date"]
            description =payload["description"]
            estimate = payload["estimateCN"]           
            estimateCurrency =payload["estimateCurrency"]
            type = payload["CNType"]
        
        CN.objects.create(
            brand=company_name,
            supplier=supplier_name,
            date=date,
            description=description,
            estimate=estimate,
            estimate_currency=estimateCurrency,
            type=type,
            
        )
        print(payload)
        # print(CN.objects.all().filter(company_name = company_name, date__year = date).order_by('date'))
        response["status"] = "success"
        response["msg"] = "CN added"

    except Exception as e:
        response["status"] = "failed"
        response["msg"] = "failed to add CN"
        print(e)

    print(response)
    return JsonResponse(response)


@csrf_exempt
@require_http_methods(["GET"])
def get_marketing(request):
    response = {}
    print(request.body.decode())
    try:
        
        current_brand = request.GET.get("brand")
        year = request.GET.get("year")
        if(request.GET.get("brand") == 'UNV'):
            brands_name = ['UNV', 'Uniview']
            cns = CN.objects.all().filter(brand__in = brands_name, date__year = year,type="marketing").order_by('date')

        else:
            cns = CN.objects.all().filter(brand = current_brand, date__year = year,type="marketing").order_by('date')
        
        print(12313123, CN.objects.filter(brand = current_brand, date__year = year,type="marketing").order_by('date'))

        cn_list = []
        for each in cns.values():
            cn_list.append(each)
        print(cn_list)
        # print(CN.objects.all().filter(company_name = company_name, date__year = date).order_by('date'))
        response["status"] = "success"
        response["msg"] = cn_list
    except json.JSONDecodeError as e:
        response["status"] = "failed"
        response["msg"] = "Invalid JSON"
        print("JSONDecodeError:", e)
    except Exception as e:
        response["status"] = "failed"
        response["msg"] = "failed to get marketing CN"
        print(e)

    print(response)
    return JsonResponse(response)