from django.db import models

# Create your models here.
from djongo import models
import datetime

# Create your models here.

class candleStickData(models.Model):
    symbol = models.CharField(max_length=50)
    adj_close = models.FloatField()
    close = models.FloatField()
    high = models.FloatField()
    low = models.FloatField()
    open = models.FloatField()
    volume = models.FloatField()
    time = models.CharField(max_length=20)

    