from django.db import models

class Favorite(models.Model):
  brewery_id = models.CharField(max_length=1000)
  data = models.CharField(max_length=100000)

class Search(models.Model):
  lat = models.CharField(max_length=100)
  long = models.CharField(max_length=100)
  request_date = models.DateTimeField(auto_now_add=True)
