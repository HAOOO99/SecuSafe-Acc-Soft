from django.db import models
from brands.common import get_brands
from remittances.models import Remittance
from django.core.exceptions import ObjectDoesNotExist

# Create your models here.
class CI(models.Model):

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
    
    PO_no = models.CharField(primary_key=True, unique = True,max_length=100)
    CI_no = models.CharField(max_length=100)
    supplier = models.CharField(max_length=100)
    date = models.DateField()
    value_USD = models.DecimalField(max_digits=10,decimal_places=2,default=0)
    value_AUD = models.DecimalField(max_digits=10,decimal_places=2,default=0)
    freight = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    isComplete = models.BooleanField(default=False)

    remittance = models.ForeignKey(
        Remittance,  # ✅ Link to Remittance Model
        on_delete=models.CASCADE,
        related_name="invoices",
        null=True,
        blank=True
    )
          
    def __str__(self):
        return f"{self.brand} - {self.CI_no}"
    