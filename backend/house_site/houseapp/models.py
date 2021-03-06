from django.db import models

class House(models.Model):
    seller = models.CharField(max_length=250)
    price = models.FloatField()
    house_type = models.CharField(max_length=3)

    def __str__(self):
        return self.seller