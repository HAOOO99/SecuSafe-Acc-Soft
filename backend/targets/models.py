from django.db import models
from brands.common import get_brands

class Target(models.Model):
    company_name = models.CharField(max_length=100,choices=get_brands(),default=next(iter(get_brands())))
    year = models.IntegerField(null=False, blank=False)
    PI_targetA = models.IntegerField(null=False, blank=False)
    PI_targetB = models.IntegerField(null=False, blank=False)
    CI_targetA = models.IntegerField(null=False, blank=False)
    CI_targetB = models.IntegerField(null=False, blank=False)

    def __str__(self):
        return f"{self.company_name}"