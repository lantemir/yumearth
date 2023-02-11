from rest_framework import serializers
from django_app import models

class TextModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TextModel
        fields = "__all__"

class ProductsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = "__all__"