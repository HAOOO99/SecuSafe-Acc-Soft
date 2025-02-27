from django.db import models
from brands.common import get_brands
from django.core.exceptions import ObjectDoesNotExist

# Create your models here.
class Supplier(models.Model):

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
    supplier_name = models.CharField(max_length=100)

    def __str__(self):
        return self.supplier_name + " - " + self.brand