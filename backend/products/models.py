from django.db import models
from django.core.exceptions import ObjectDoesNotExist

# from brands.common import get_brands
# Create your models here.
class PI(models.Model):

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
    PI_number = models.CharField(primary_key=True, unique = True,max_length=100)
    date = models.DateField()
    USD = models.DecimalField(max_digits=10, decimal_places=2)
    # AUD = models.DecimalField(max_digits=10, decimal_places=2)
    AUD_local = models.DecimalField(max_digits=10, decimal_places=2)
    AUD_counted= models.BooleanField()
    discount = models.DecimalField(max_digits=10, decimal_places=2)
    comment = models.TextField(null=True, blank=True)
    link = models.CharField(max_length=100)

    
    # class Meta:
    #     ordering = ['date']  # Default ordering by date in ascending order

    def __str__(self):
        return  f"{self.brand} - {self.PI_number}"
    
