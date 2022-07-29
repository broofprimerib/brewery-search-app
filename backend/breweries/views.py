from django.http import HttpResponseBadRequest
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
import json

from .models import Search, Favorite
from .serializers import SearchSerializer, FavoriteSerializer
from . import constants

@api_view(['GET'])
def capitals(request):
  return JsonResponse(constants.BREWERIES_STATE_MAP)

@api_view(['GET'])
def countries(request):
  return JsonResponse(constants.BREWERIES_COUNTRY_MAP)

@api_view(['GET', 'POST'])
def favorite(request):
  if request.method == 'POST':
    try:
      existing = Favorite.objects.filter(brewery_id=request.data['id'])
      if existing:
        existing.delete()
      else:
        Favorite.objects.create(brewery_id=request.data['id'], data=str(request.data['data']))
    except Exception as e:
      print(e)
      return HttpResponseBadRequest('Invalid data.')

  data = Favorite.objects.all()
  serialized = FavoriteSerializer(data, many=True)
  return JsonResponse(serialized.data, safe=False)

@api_view(['GET', 'POST'])
def search(request):
  if request.method == 'POST':
    try:
      Search.objects.create(
        lat=request.data['lat'],
        long=request.data['long'],
        city=request.data['city'],
        country=request.data['country'],
        query=request.data['query'],
        is_current_location=request.data['is_current_location']
      )
    except:
      return HttpResponseBadRequest('Invalid data.')

  data = Search.objects.all()
  serialized = SearchSerializer(data, many=True)
  return JsonResponse(serialized.data, safe=False)
