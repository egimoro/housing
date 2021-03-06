from django.urls import path
from . import views


urlpatterns = [
    path('houses', views.house_list),
    path('houses/<int:pk>', views.house_detail)
]