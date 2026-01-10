from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('homepage.urls')),
    path('file/', include('file.urls')),
    path('relationship/', include('relationship.urls')),
    path('user/', include('user.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
]