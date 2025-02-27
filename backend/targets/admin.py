from django.contrib import admin
from .models import Target
from brands.models import Brand

# Register your models here.


class targetAdmin(admin.ModelAdmin):
    def get_form(self, request, obj=None, **kwargs):
        """Dynamically update choices when rendering the form in Admin."""
        form = super().get_form(request, obj, **kwargs)
        form.base_fields["brand"].choices = [(b.company_name, b.company_name) for b in Brand.objects.all()]
        return form
    
admin.site.register(Target,targetAdmin)