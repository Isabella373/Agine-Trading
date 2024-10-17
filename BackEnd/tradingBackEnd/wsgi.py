"""
WSGI config for tradingBackEnd project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

from accessControl.models import User_detail
from django.core.management import call_command
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tradingBackEnd.settings')

application = get_wsgi_application()
# def initGuestUser():
#     # search if the guest user already exist in the database
#     guest_record_search = User_detail.objects.filter(user_name = "guest").all()
#     if guest_record_search.exists():
#         print("exists")
#     else:
#         record = User_detail(user_name='guest', user_password="xxxxx")
#         record.save()

# initGuestUser()
# call_command("writeEveryDayCandleStick")