from django.db import models
from django.conf import settings

class File(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='uploaded_files'
    )
    file = models.FileField(upload_to='uploads/%Y/%m/%d/')
    original_name = models.CharField(max_length=255)
    file_size = models.BigIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    mime_type = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.original_name

    class Meta:
        ordering = ['-uploaded_at', '-created_at']