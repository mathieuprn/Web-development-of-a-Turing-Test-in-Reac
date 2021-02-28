from django.core.management.base import BaseCommand
from rest_framework_api_key.models import APIKey

class Command(BaseCommand):
    """ """
    def handle(self, *args, **options):
        api_key, key = APIKey.objects.create_key(name="my")
        self.stdout.write(key)


