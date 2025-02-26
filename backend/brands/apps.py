from django.apps import AppConfig


from django.db.models.signals import post_migrate

def my_post_migrate(sender, **kwargs):
    from brands.common import get_brands  # ✅ Import inside the function
    sender.brand_choices = [(k, v) for k, v in get_brands().items()]  # Convert to list of tuples

class BrandConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'brands'

    def ready(self):
        post_migrate.connect(my_post_migrate, sender=self)