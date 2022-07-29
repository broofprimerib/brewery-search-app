from django.test import TestCase

from .models import Favorite, Search

class FavoriteTestCase(TestCase):
  def setUp(self):
    Favorite.objects.create(
      brewery_id='1001',
      data='{"Hello":"World"}'
    )
  
  def test_favorite_creation(self):
    item = Favorite.objects.get(brewery_id='1001')
    self.assertEqual(item.data, '{"Hello":"World"}')

class SearchTestCase(TestCase):
  def setUp(self):
    Search.objects.create(
      is_current_location=True,
      city='ID',
      country='DE',
      lat='765.4321',
      long='123.4567',
      query='QWERTY'
    )
  
  def test_search_creation(self):
    item = Search.objects.get(city='ID')
    self.assertEqual(item.is_current_location, True)
    self.assertEqual(item.country, 'DE')
    self.assertEqual(item.lat, '765.4321')
    self.assertEqual(item.long, '123.4567')
    self.assertEqual(item.query, 'QWERTY')
