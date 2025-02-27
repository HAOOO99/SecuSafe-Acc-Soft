from django.db import models
# from brands.common import get_brands
# Create your models here.
class PI(models.Model):

    # brand_choices = []  # Empty list initially


    brand = models.CharField(max_length=100,choices=[],default='')
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

    def formfield(self, **kwargs):
        """Dynamically update choices in Django Forms"""
        from brands.common import get_brands
        kwargs['choices'] = [(k, v) for k, v in get_brands().items()]
        return super().formfield(**kwargs)

    # class Meta:
    #     ordering = ['date']  # Default ordering by date in ascending order

    def __str__(self):
        return  f"{self.brand} - {self.PI_number}"
    
