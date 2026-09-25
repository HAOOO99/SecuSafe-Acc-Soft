from .models import Brand

def get_brands():
    brands = Brand.objects.all().values()
    BRANDS={}
    for each in brands:
        BRANDS[each['company_name']] = each['company_name']
    return BRANDS