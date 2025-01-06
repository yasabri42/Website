from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    bio = models.TextField(blank=True, null=True)
    score = models.IntegerField(default=0)
    status_2fa = models.BooleanField(default=False)

    def __str__(self):
        return self.username