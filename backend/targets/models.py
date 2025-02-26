from django.db import models
from brands.common import get_brands

class Target(models.Model):

    brand_choices = []  # Empty list initially

    @classmethod
    def set_choices(cls, brands_dict):
        """Update brand choices dynamically after migration"""
        cls.brand_choices = [(k, v) for k, v in brands_dict.items()]

    brand = models.CharField(max_length=100,choices=brand_choices,default='')
    year = models.IntegerField(null=False, blank=False)
    PI_targetA = models.IntegerField(null=False, blank=False)
    PI_targetB = models.IntegerField(null=False, blank=False)
    
    default_currency = models.CharField(max_length=10,null=False,blank=False,default="")

    def __str__(self):
        return f"{self.brand}"