from django.db import models

from brands.common import get_brands
from django.core.exceptions import ObjectDoesNotExist

# Create your models here.
class Remittance(models.Model):

    CURRENCYS = {
            "AUD":"AUD",
            "USD":"USD",
        }

    ALL_STATUS = {
        "Bank Transfer" : "Bank Transfer",
        "Offset Statement" : "Offset Statement",
        "Pending" : "Pending",
    }

    HARDCODED_CHOICES = [("AJAX", "AJAX")]

    

    def __init__(self, *args, **kwargs):
        """Force brand choices to update at runtime."""
        super().__init__(*args, **kwargs)
        try:
            from brands.models import Brand
            self._meta.get_field("brand").choices = [(b.company_name, b.company_name) for b in Brand.objects.all()]
        except ObjectDoesNotExist:
            pass  # If no data, avoid breaking

    brand = models.CharField(max_length=100,choices=HARDCODED_CHOICES, default="AJAX")
    id = models.AutoField(primary_key=True)
    date = models.DateField()
    bank = models.CharField(max_length=100,null=True,blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=100, default="AUD",choices=CURRENCYS)
    status = models.CharField(max_length=100,choices=ALL_STATUS)
    PO = models.TextField(default="")

    def __str__(self):
        return f"{self.brand} - {self.id}"
    