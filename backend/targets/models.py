from django.db import models
from brands.common import get_brands

class Target(models.Model):
    brand = models.CharField(max_length=100,choices=get_brands(),default=next(iter(get_brands())))
    year = models.IntegerField(null=False, blank=False)
    PI_targetA = models.IntegerField(null=False, blank=False)
    PI_targetB = models.IntegerField(null=False, blank=False)
    
    default_currency = models.CharField(max_length=10,null=False,blank=False,default="")

    def __str__(self):
        return f"{self.brand}"