from rest_framework import serializers
from django_app import models

class TextModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TextModel
        fields = "__all__"

class  ProductsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = "__all__"

class ProductCategoryModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductCategory
        fields = "__all__"




class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PaymentMethod
        fields = "__all__"


class DeliveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DeliveryMethod
        fields = "__all__"


