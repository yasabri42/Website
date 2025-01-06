from django.urls import path, include
from . import views

app_name = 'home'

urlpatterns = [

    path('', include('apps.user.urls')),

    path('', views.home_view, name='home_view'),
    # path('home_partial/', views.home_partial_view, name='home_partial_view'),
]