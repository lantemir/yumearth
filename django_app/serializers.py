from rest_framework import serializers
from django_app import models
from django.contrib.auth.models import User


class TextModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TextModel
        fields = "__all__"



class ProductCategoryModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductCategory
        fields = "__all__"

class  ProductsModelSerializer(serializers.ModelSerializer):

    
    class Meta:
        model = models.Product
        fields = "__all__"


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PaymentMethod
        fields = ('id', 'title')


class DeliveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DeliveryMethod
        fields = ('id', 'title')


class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderStatus
        # fields = "__all__"

        fields = ('id', 'title')






class OrderSerializer(serializers.ModelSerializer):
    #books = serializers.StringRelatedField(many=True, source='book_set')
    # order_status = serializers.SerializerMethodField(read_only=True)

    # order_status = serializers.PrimaryKeyRelatedField(many=True, queryset = models.OrderStatus.objects.all())

    # order_statuss = models.OrderStatus.objects.all()
    # order_status = OrderStatusSerializer(order_statuss, many=True) 
    order_status = OrderStatusSerializer()  
    payment_method = PaymentMethodSerializer()
    delivery_method = DeliveryMethodSerializer()

    class Meta:
        model = models.Order
        fields = "__all__"

    

    # def get_order_status(self, obj):

        # list1 = []

        # list1 = []
        # obj.order_status.get(pk = )
        # status_ord = models.OrderStatus.objects.get(pk = "1")

        # for obj in obj.order_status.all():
        #     serialized_obj_list = OrderStatusSerializer(instance=obj, many =False).data
        #     list1.append(serialized_obj_list)
        
        # status_objs = obj.order_status.all()

        # print("objobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobj")
        # print(obj.order_status)

        # list1 = models.OrderStatus.objects.get(pk = obj.order_status.pk)

        # print(list1)

        # serialized_data = OrderStatusSerializer(instance=list1, many=True).data

        # print(serialized_data)
    
        # return list1



    

    




class OrderProductSerializer(serializers.ModelSerializer):
    product = ProductsModelSerializer()
    class Meta:
        model = models.OrderProduct
        fields = "__all__"
        # fields = ('order', 'product', 'count_product')

class OrderProductCountSerializer(serializers.ModelSerializer):
    product = ProductsModelSerializer()
   
    order = OrderSerializer()

    class Meta:
        model = models.OrderProduct
        # fields = "__all__"
        fields = ('product', 'count_product', 'order',)

class UserSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = User
        # fields = "__all__"
        fields = ('id', 'email', 'username', 'first_name', 'last_name')


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = models.Profile
        fields = "__all__"





class OrderCabinetSerializer(serializers.ModelSerializer):
    orderproduct_set = OrderProductSerializer(many=True)
    class Meta:
        model = models.Order
        fields = "__all__"
        # fields = ('order', 'product', 'count_product')
