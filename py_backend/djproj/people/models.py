from django.db import models

# Create your models here.
class Person(models.Model):
    name = models.textField(maxlength=25)
    age = models.IntegerField()


    def __str__(self):
        return f"{self.name} ({self.age})"
    