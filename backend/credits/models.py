from django.db import models

# Create your models here.

class CN(models.Model):

    ALL_STATUS = {
        "Bank Transfer" : "Bank Transfer",
        "Offset Statement" : "Offset Statement",
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
    }

    brand_choices = []  # Empty list initially

    @classmethod
    def set_choices(cls, brands_dict):
        """Update brand choices dynamically after migration"""
        cls.brand_choices = [(k, v) for k, v in brands_dict.items()]


    brand = models.CharField(max_length=100,choices=[],default='')
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
    