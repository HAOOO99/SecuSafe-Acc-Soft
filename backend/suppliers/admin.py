from django.contrib import admin
from .models import Supplier
from brands.models import Brand

class supplierAdmin(admin.ModelAdmin):
   def get_form(self, request, obj=None, **kwargs):
        """Dynamically update choices when rendering the form in Admin."""
        form = super().get_form(request, obj, **kwargs)

        # 🚀 Debugging: Print choices in the console
        brand_choices = [(b.company_name, b.company_name) for b in Brand.objects.all()]
        print("🚀 Brand Choices:", brand_choices)  

        form.base_fields["brand"].choices = brand_choices
        return form

# Register your models here.
admin.site.register(Supplier,supplierAdmin)