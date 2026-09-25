from django.apps import AppConfig

from django.db.models.signals import post_migrate
from django.db import connection

def update_brand_choices(sender, **kwargs):
    """Fetch brand names after migration and update choices."""
    from brands.common import get_brands
    from remittances.models import Remittance

    # ✅ Ensure the brands table exists before querying
    with connection.cursor() as cursor:
        cursor.execute("SHOW TABLES LIKE 'brands_brand';")
        if cursor.fetchone():
            choices = [(k, v) for k, v in get_brands().items()]
            Remittance._meta.get_field('brand').choices = choices  # ✅ Set choices dynamically
            print(Remittance._meta.get_field('brand').choices)

class RemittancesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'remittances'

    def ready(self):
        post_migrate.connect(update_brand_choices, sender=self)