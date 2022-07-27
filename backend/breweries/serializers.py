from rest_framework import serializers
from .models import Search, Favorite

class SearchSerializer(serializers.ModelSerializer):
  class Meta:
    model = Search
    fields = ('__all__')

class FavoriteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Favorite
    fields = ('__all__')
