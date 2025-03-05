from django.db import models
from django.core.exceptions import ObjectDoesNotExist

# Create your models here.

class CN(models.Model):

    ALL_STATUS = {
        "Cancelled" : "Cancelled",
        "Approved" : "Approved",
        "Pending" : "Pending",
    }
    CURRENCYS = {
        "AUD":"AUD",
        "USD":"USD",
    }

    TYPES = {
        "Marketing":"Marketing",
        "Compensation":"Compensation",
        "Discount":"Discount",
        "Bank Transfer" : "Bank Transfer",
        "Offset Statement" : "Offset Statement",
    }
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
    
    date = models.DateField()
    supplier = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    type = models.CharField(max_length=100,choices=TYPES,default="Compensation") 
    estimate = models.DecimalField(max_digits=10, decimal_places=2)
    estimate_currency = models.CharField(max_length=100,choices=CURRENCYS,default="AUD")
    supplier_CN = models.CharField(max_length=100, null=True,blank=True)
    received = models.DecimalField(max_digits=10,decimal_places=2,null=True, blank=True)
    received_currency = models.CharField(max_length=100,null=True, default="AUD",choices=CURRENCYS,blank=True)

    ss_CN = models.CharField(max_length=100,null=True,blank=True)
    status = models.CharField(max_length=100,null=True,choices=ALL_STATUS,blank=True)
    

    def __str__(self):
        return f"{self.supplier}-CN-{self.id}"
    
    def save(self, *args, **kwargs):
        """Ensure the default brand is set correctly"""
        if not self.brand and self.brand_choices:
            self.brand = self.brand_choices[0][0]  # First available brand
        super().save(*args, **kwargs)
    