from django.db import models

class favorite(models.Model):
  data = models.CharField(max_length=100000)

class search(models.Model):
  lat = models.CharField(max_length=100)
  long = models.CharField(max_length=100)
  request_date = models.DateTimeField(auto_now_add=True)
