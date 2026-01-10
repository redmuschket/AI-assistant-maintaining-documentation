from django.urls import path
from . import views

app_name = 'relationship'

urlpatterns = [
    path('', views.page, name='home'),
]