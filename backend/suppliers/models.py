from django.db import models
from brands.common import get_brands

# Create your models here.
class Supplier(models.Model):
    brand_name = models.CharField(max_length=100,choices=get_brands(),default=next(iter(get_brands())))

    supplier_name = models.CharField(max_length=100)

    def __str__(self):
        return self.supplier_name + " - " + self.brand_name