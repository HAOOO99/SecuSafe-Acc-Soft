from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from django.http import JsonResponse

from .models import Supplier

@csrf_exempt
@require_http_methods(["GET"])
def get_suppliers(request):
    response = {}
    try:
        current_brand = request.GET.get("brand")
        if(request.GET.get("brand") == 'UNV'):
            brands_name = ['UNV', 'Uniview']
            suppliers = Supplier.objects.all().filter(brand__in = brands_name)
        else:
            suppliers = Supplier.objects.all().filter(brand = current_brand)
        print(suppliers.values())
        supplier_list = []
        for each in suppliers.values():
            if (each["supplier_name"] == current_brand):
                supplier_list.insert(0,each["supplier_name"])
            else:
                supplier_list.append(each["supplier_name"])
            
        print(supplier_list)
        response["status"] = "success"
        response["suppliers"] = supplier_list
    except Exception as e:
        response["status"] = "failed"
        response["msg"] = "failed to show"
        print(e)
    return JsonResponse(response)