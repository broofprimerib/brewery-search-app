from django.db import models

class Favorite(models.Model):
  brewery_id = models.CharField(max_length=1000)
  data = models.CharField(max_length=100000)

class Search(models.Model):
  is_current_location = models.BooleanField()
  city = models.CharField(max_length=100)
  country = models.CharField(max_length=100)
  lat = models.CharField(max_length=100)
  long = models.CharField(max_length=100)
  query = models.CharField(max_length=1000)
  request_date = models.DateTimeField(auto_now_add=True)
