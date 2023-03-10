from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from django.core.paginator import Paginator
from django_app import models
from django_app import serializers
import json
from rest_framework.permissions import AllowAny, IsAuthenticated
# Create your views here.


def index(request):
    context={}

    print("index")
    return render(request=request, template_name = 'build/index.html', context=context, status=status.HTTP_200_OK)

def users(request):
    return JsonResponse({"response": "Ok!"})

@api_view(http_method_names=["POST"])
@permission_classes([IsAuthenticated, AllowAny])
def orders(request):
    
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            orders = data.get('basketProducts')

            user_id = request.user.pk

            print('user_id')
            print(user_id)

            # order = models.Order.objects.create()

            # for ord in orders:

                

            #     # print(ord['id']  )
            #     # print(ord['count'])

            #     models.OrderProduct.objects.create(order = order, product= ord['id'], cont= ord['count'])

            #     products_in_order = order.pproduct.all.prefetch_related('orderproduct_set')

            #     print('products_in_order')
            #     print(products_in_order)
            #     for product in products_in_order:
            #         order_product = product.orderproduct_set.first()
            #         print(f'{product.id}: {order_product.count}')


            


            # models.OrderProduct.objects.create

            # create an order
# order = Order.objects.create()

# # create products and add them to the order with counts
# product1 = Product.objects.create(name='Product 1')
# product2 = Product.objects.create(name='Product 2')

# OrderProduct.objects.create(order=order, product=product1, count=2)
# OrderProduct.objects.create(order=order, product=product2, count=1)

# # retrieve the products in the order with their counts
# products_in_order = order.products.all().prefetch_related('orderproduct_set')
# for product in products_in_order:
#     order_product = product.orderproduct_set.first()
#     print(f'{product.name}: {order_product.count}')


            # print(orders)

            return Response( data={"orders": orders }, status=status.HTTP_200_OK)

    except Exception as error:
        print(error)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(http_method_names=["POST"])
def basketproducts(request):
    try:

        # basket_local_storage = request.GET.get("basketlocalstorage" )

        

        data = json.loads(request.body)
        basket_local_storage = data.get('basketlocalstorage')

        new_products_id = []

        for prodid in basket_local_storage:
            new_prodid = prodid["product_id"]            
            new_products_id.append(new_prodid)

        objs = models.Product.objects.filter(id__in = new_products_id)     

        serialized_obj = serializers.ProductsModelSerializer(instance=objs, many = True).data      
        

        # print("data")
        # print(data)
       

        # print("basket_local_storage")
        # print(basket_local_storage)

        return Response( data={"product": serialized_obj }, status=status.HTTP_200_OK)

    except Exception as error:
        print(error)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(http_method_names=["GET"])
def product(request, productid=None):
    try:
        

        productid = request.GET.get("productid" )
        # print(productid)
        if productid is not None:      
            productid = int(request.GET.get("productid" ))

            if request.method == "GET":
                obj_list = models.Product.objects.filter(pk = productid)
                serialized_obj = serializers.ProductsModelSerializer(instance=obj_list, many = True).data[0]






                return Response( data={"product": serialized_obj }, status=status.HTTP_200_OK)
        

        
            

        else:
            
            if request.method == "GET":
                page = int(request.GET.get("currentPage", 1 ))
                limit = int(request.GET.get("pageSize", 3))
                categoryid = int(request.GET.get("categoryid", 0))

                print("categoryid")
                print(categoryid)

                print("currentPage")
                print(page)

                print("pageSize")
                print(limit)
                if categoryid > 0:
                    obj_list =  models.Product.objects.filter(productCategory = categoryid)
                    serialized_obj = serializers.ProductsModelSerializer(instance=obj_list, many = True).data
                    paginator_obj = Paginator(serialized_obj, limit)
                    current_page = paginator_obj.get_page(page).object_list
                    # serialized_obj_list = serializers.TextModelSerializer(instance=current_page, many=True).data

                    return Response(data={"List": current_page, "x_total_count": len(obj_list)}, status=status.HTTP_200_OK)
                
                else:
                    print("?????? ??????????????????")

                    

                    page = int(request.GET.get("currentPage", 1 ))
                    limit = int(request.GET.get("pageSize", 3))
                    categoryid = int(request.GET.get("categoryid", 0))


                    obj_list =  models.Product.objects.all()
                    serialized_obj = serializers.ProductsModelSerializer(instance=obj_list, many = True).data
                    paginator_obj = Paginator(serialized_obj, limit)
                    current_page = paginator_obj.get_page(page).object_list
                    # serialized_obj_list = serializers.TextModelSerializer(instance=current_page, many=True).data

                    return Response(data={"List": current_page, "x_total_count": len(obj_list)}, status=status.HTTP_200_OK)

        return Response( {"res": "Ok" }, status=status.HTTP_200_OK)


    except Exception as error:
        print(error)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(http_method_names=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"])
def prod_category(request):

    try:
        if request.method == "GET":
            obj_list =  models.ProductCategory.objects.all()
            serialized_obj = serializers.ProductCategoryModelSerializer(instance=obj_list, many = True).data
            return Response(data={"category": serialized_obj}, status=status.HTTP_200_OK)

    except  Exception as error:
        print(error)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(http_method_names=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"])
def chat(request, sms_id = None):
    try:
        if sms_id:
            if request.method == "GET":
                return Response(status=status.HTTP_200_OK)
                
            elif request.method == "PUT" or "PATCH":
                return Response(status=status.HTTP_200_OK)
            elif request.method == "DELETE":
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        else:
            if request.method == "GET":

                page = int( request.GET.get("page", 1))
                limit = int(request.GET.get("limit", 3))


                obj_list =  models.TextModel.objects.all()
                serialized_obj = serializers.TextModelSerializer(instance=obj_list, many = True).data
                paginator_obj = Paginator(serialized_obj, limit)
                current_page = paginator_obj.get_page(page).object_list
                # serialized_obj_list = serializers.TextModelSerializer(instance=current_page, many=True).data

                return Response(data={"List": current_page, "x_total_count": len(obj_list)}, status=status.HTTP_200_OK)
                # return Response ({"page": page, "limit": limit }, status=status.HTTP_200_OK )
                
            elif request.method == "POST":
                text =  request.GET.get("text", "")
                if text:
                    models.TextModel.objects.create(
                        text = text
                    )
                    return Response(status=status.HTTP_201_CREATED)
                return Response(status=status.HTTP_204_NO_CONTENT)
        
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    except Exception as error:
        print(error)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)