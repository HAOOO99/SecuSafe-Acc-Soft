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

from .models import PI

@csrf_exempt
@require_http_methods(["GET"])
def get_PIs(request):
    response = {}
    try:
        current_brand = request.GET.get("brand")
        year = request.GET.get("year")
        if(request.GET.get("brand") == 'UNV'):
            brands_name = ['UNV', 'Uniview']
            pis = PI.objects.all().filter(brand__in = brands_name, date__year = year).order_by('date')

        else:
            pis = PI.objects.all().filter(brand = current_brand, date__year = year).order_by('date')
        print(pis.values())
        pi_list = []
        for each in pis.values() :
            pi_list.append(each)
        print(pi_list)
        response["status"] = "success"
        response["PIs"] = pi_list

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

        if(request.GET.get("brand") == 'UNV'):
            brands_name = ['UNV', 'Uniview']
            current_year_pis = PI.objects.filter(brand__in = brands_name, date__year = year)
        else:
            current_year_pis = PI.objects.filter(brand = current_brand, date__year = year)
        total_usd = current_year_pis.aggregate(total_usd=Sum('USD'))
        # total_aud = current_year_pis.aggregate(total_aud=Sum('AUD'))
        total_aud_local = current_year_pis.filter(AUD_counted = True).aggregate(total_aud_local=Sum('AUD_local'))
        total_discount = current_year_pis.aggregate(total_discount=Sum('discount'))
        if total_aud_local["total_aud_local"] == None:
            total_aud_local["total_aud_local"] = 0
            aud_value = "0"
        
        usd_value = total_usd["total_usd"] - total_discount["total_discount"]
        aud_value = total_aud_local["total_aud_local"]- total_discount["total_discount"]
        
        # else:
        #     aud_value = total_aud["total_aud"] + total_aud_local["total_aud_local"]
        print(total_aud_local)
        values_map = [{"USD":usd_value,"AUD":aud_value}]

        response["status"] = "success"
        response["total_values"] = values_map


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
            pis = PI.objects.filter(brand__in = brands_name)
        else:
            pis = PI.objects.filter(brand = current_brand)
        print(pis.values().count())
        years_list = []
        if pis.values().count() != 0:
            for each in pis.values() :
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


# @csrf_exempt
# @require_http_methods(["GET"])
# def search_years(request):
#     response = {}
#     try:
        
#         current_brand = request.GET.get("brand")
#         target_year = request.GET.get("year")
       
#         response["status"] = "success"
#         response["total_years"] = target_year


#     except Exception as e:
#         response["status"] = "failed"
#         response["msg"] = "failed to show"
#         print(e)

#     print(response)
#     return JsonResponse(response)

@csrf_exempt
@require_http_methods(["POST"])
def update_comment(request):
    response = {}
    # print(11111111111,request.body)
    try:
        payload = json.loads(request.body.decode())
        pi_number = payload["PI_number"]
        comment = payload["comment"]
        PI.objects.filter(PI_number=pi_number).update(comment=comment)

        # Send the update to WebSocket group
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "comments",
            {
                "type": "comment_update",
                "message": {"PI_number": pi_number, "comment": comment},
            },
        )

        response["status"] = "success"
        response["msg"] = comment

    except Exception as e:
        response["status"] = "failed"
        response["msg"] = "failed to update"
        print(e)

    print(response)
    return JsonResponse(response)

@csrf_exempt
@require_http_methods(["POST"])
def add_PI(request):
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
            supplier_name = payload["supplier_name"]
            PI_number = payload["PI_number"]
            date = payload["date"]
            USD = payload["USD"]
            # AUD = payload["AUD"]
            AUD_local = payload["AUD_local"]
            AUD_counted = payload["AUD_counted"]
            if AUD_counted == "true":
                AUD_counted = True
            else:
                AUD_counted = False
            discount = payload["discount"]
            comment = payload["comment"]
            link = payload["link"]
        print(AUD_counted)
        print(PI_number)

        PI.objects.create(
            brand=company_name,
            supplier_name=supplier_name,
            PI_number=PI_number,
            date=date,
            USD=USD,
            # AUD=AUD,
            AUD_local=AUD_local,
            AUD_counted=AUD_counted,
            discount=discount,
            comment=comment,
            link=link,
        )
        print(PI.objects.filter(brand = company_name).values())
        response["status"] = "success"
        response["msg"] = "PI added"
    except json.JSONDecodeError as e:
        response["status"] = "failed"
        response["msg"] = "Invalid JSON"
        print("JSONDecodeError:", e)
    except Exception as e:
        response["status"] = "failed"
        response["msg"] = "failed to add PI"
        print(e)

    print(response)
    return JsonResponse(response)