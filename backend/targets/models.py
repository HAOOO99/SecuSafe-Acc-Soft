from django.db import models
from brands.common import get_brands
from django.core.exceptions import ObjectDoesNotExist
class Target(models.Model):
    HARDCODED_CHOICES = [("AJAX", "AJAX")]
    brand = models.CharField(max_length=100,choices=HARDCODED_CHOICES, default="AJAX")

    def __init__(self, *args, **kwargs):
        """Force brand choices to update at runtime."""
        super().__init__(*args, **kwargs)
        try:
            from brands.models import Brand
            self._meta.get_field("brand").choices = [(b.company_name, b.company_name) for b in Brand.objects.all()]
        except ObjectDoesNotExist:
            pass  # If no data, avoid breaking

    year = models.IntegerField(null=False, blank=False)
    PI_targetA = models.IntegerField(null=False, blank=False)
    PI_targetB = models.IntegerField(null=False, blank=False)
    
    default_currency = models.CharField(max_length=10,null=False,blank=False,default="")

    # def formfield(self, **kwargs):
    #     """Dynamically update choices in forms and admin."""
    #     from brands.models import Brand
    #     kwargs["choices"] = [(b.company_name, b.company_name) for b in Brand.objects.all()]
    #     return super().formfield(**kwargs)

    def __str__(self):
        return f"{self.brand}"