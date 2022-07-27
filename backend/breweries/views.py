from django.http import HttpResponseBadRequest
from django.http.response import JsonResponse
from rest_framework.decorators import api_view

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
    print(request.data)
    try:
      existing = Favorite.objects.filter(brewery_id=request.data['id'])
      if existing:
        existing.delete()
      else:
        Favorite.objects.create(brewery_id=request.data['id'], data=request.data['data'])
    except:
      return HttpResponseBadRequest('Invalid data.')

  data = Favorite.objects.all()
  serialized = FavoriteSerializer(data, many=True)
  return JsonResponse(serialized.data, safe=False)

@api_view(['GET', 'POST'])
def search(request):
  if request.method == 'POST':
    try:
      Search.objects.create(lat=request.data['lat'], long=request.data['long'])
    except:
      return HttpResponseBadRequest('Invalid data.')

  data = Search.objects.all()
  serialized = SearchSerializer(data, many=True)
  return JsonResponse(serialized.data, safe=False)
