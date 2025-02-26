from django.db import models

from brands.common import get_brands
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

    brand_choices = []  # Empty list initially

    @classmethod
    def set_choices(cls, brands_dict):
        """Update brand choices dynamically after migration"""
        cls.brand_choices = [(k, v) for k, v in brands_dict.items()]


    id = models.AutoField(primary_key=True)
    brand = models.CharField(max_length=100,choices=[],default='')
    date = models.DateField()
    bank = models.CharField(max_length=100,null=True,blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=100, default="AUD",choices=CURRENCYS)
    status = models.CharField(max_length=100,choices=ALL_STATUS)
    PO = models.TextField(default="")

    def __str__(self):
        return f"{self.brand} - {self.id}"
    