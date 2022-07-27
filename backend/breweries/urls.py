from django.urls import path
from django.contrib import admin

from . import views

urlpatterns = [
  path('admin/', admin.site.urls),
  path('api/capitals/', views.capitals),
  path('api/countries/', views.countries),
  path('api/search/', views.search),
  path('api/favorite/', views.favorite)
]
