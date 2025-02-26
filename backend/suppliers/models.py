from django.db import models
from brands.common import get_brands

# Create your models here.
class Supplier(models.Model):

    brand_choices = []  # Empty list initially

    @classmethod
    def set_choices(cls, brands_dict):
        """Update brand choices dynamically after migration"""
        cls.brand_choices = [(k, v) for k, v in brands_dict.items()]

    brand_name = models.CharField(max_length=100,choices=[],default='')

    supplier_name = models.CharField(max_length=100)

    def __str__(self):
        return self.supplier_name + " - " + self.brand_name