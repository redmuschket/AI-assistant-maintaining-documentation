from django.urls import path
from . import views

app_name = 'file'

urlpatterns = [
    path('loader', views.loader_page, name='loader'),
    path('api/upload/', views.upload_api, name='upload_api'),
    path('<int:pk>/delete/', views.delete_file, name='delete_api'),
]