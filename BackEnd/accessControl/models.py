from djongo import models
import datetime

# Create your models here.

class User_detail(models.Model):
    # user_id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=50)
    user_password = models.CharField(max_length=200)
    create_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    # signal_strength = models.CharField(max_length=200)
