import json

from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from django.http import JsonResponse
from .models import Target

@csrf_exempt
@require_http_methods(["GET"])
def get_targets(request):
    response = {}
    try:
        # payload = json.loads(request.body.decode())
        targets = Target.objects.all()
        current_brand = request.GET.get("brand")
        current_year = datetime.now().year
        target = Target.objects.all().filter(brand = current_brand,year = current_year)
        print(target.values()[0])
        # for each in target :

        PItargetA = target.values()[0].get("PI_targetA")
        PItargetB = target.values()[0].get("PI_targetB")
        currency = target.values()[0].get("default_currency")
        target_list = []
        target_list.append({"PItargetA":PItargetA,"PItargetB":PItargetB,"defaultCurrency":currency})
        response["status"] = "success"
        response["targets"] = target_list

    except Exception as e:
        response["status"] = "failed"
        response["msg"] = "failed to show"
        print(e)
    print(response)
    return JsonResponse(response)


