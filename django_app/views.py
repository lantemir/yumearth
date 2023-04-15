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
from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions #повторно вызвался
from rest_framework.views import APIView
from django.contrib.auth.models import User 

# Create your views here.
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
# почта
import smtplib
import os
import environ
from email.mime.text import MIMEText

# redis
from . import tasks

#paswordGenerate
import random
import string

#confirm email
from django.core.mail import send_mail
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from django.http import HttpResponseRedirect

from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode



def index(request):
    context={}

    print("index")
    return render(request=request, template_name = 'build/index.html', context=context, status=status.HTTP_200_OK)

def users(request):
    return JsonResponse({"response": "Ok!"})


# isstaff
@api_view(http_method_names=["POST"])
@permission_classes([IsAuthenticated])
def isstaff(request):
    try:
        print (request.user.is_staff)

        return Response( data={"is_staff": request.user.is_staff }, status=status.HTTP_200_OK)

    except Exception as error:
        print(error)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# @api_view(http_method_names=["POST"])
# @permission_classes([IsAuthenticated , AllowAny])
# def LogoutView(request):
#     try:
#         print('refresh_token')
#         refresh_token = request.data["refresh"]

#         return Response( data={"refresh_token": refresh_token }, status=status.HTTP_200_OK)

#     except Exception as error:
#         print(error)
#         return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(http_method_names=["POST", "GET"])
@permission_classes([AllowAny])
def registration(request):
    if request.method == "POST":
        username = request.data.get("username", None)
        password = request.data.get("password", None)

        # print(f"\nGET {request.GET}")
        # print(f"POST {request.POST}")
        # print(f"data {request.data}")
        # print(f"FILES {request.FILES}\n")

        print(username)
        print(password)

        if username and password:

            if User.objects.filter(username = username).exists():

                return Response( {"errormessage": "пользователь уже существует" }, status=status.HTTP_400_BAD_REQUEST)
            else:
                User.objects.create_user(
                    username=username,                    
                    password=password
                )

                return Response( {"user":  username},  status=status.HTTP_201_CREATED)
        else:

            return Response(status=status.HTTP_400_BAD_REQUEST)
       
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

class LogoutView(APIView):
    # permission_classes = (IsAuthenticated)

    def post(self, request, format=None):
        try:
            print('refresh_token')
            refresh_token = request.data["refresh"]
            print('refresh_token')
            print(refresh_token)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(http_method_names=["POST", "GET"])
@permission_classes([IsAuthenticated])
def managerorder(request, orderid = None):
    try:


        if request.user.is_staff:
            orderid = request.GET.get('orderid')
            
            # print (request.user.is_staff)
            if request.method == "GET":

                if orderid is not None:
                    print('есть id заказа')

                    order_products =  models.OrderProduct.objects.filter(order=orderid)

                    # ord_listid =  models.OrderProduct.objects.values_list('order_id', flat=True).distinct().order_by('order_id')

                    # ord_list = models.Order.objects.filter(id__in=ord_listid).order_by('-id')

                    serialized_obj = serializers.OrderProductCountSerializer(instance=order_products, many = True).data

                    orderbyid = models.Order.objects.get(pk = orderid)
                    serialized_orderbyid = serializers.OrderSerializer(instance=orderbyid).data

                    # print("order_products")
                    # print(order_products)
                    # for order_product in order_products:
                    #     print(order_product.product)

                    return Response( data={"managerorder": serialized_obj, "orderbyid": serialized_orderbyid }, status=status.HTTP_200_OK)
                    

                else:    
                    page = int(request.GET.get("currentPage", 1 ))
                    limit = int(request.GET.get("pageSize", 3))

                    print("currentPage")
                    print(page)

                    print("pageSize")
                    print(limit)
                

                    ord_listid =  models.OrderProduct.objects.values_list('order_id', flat=True).distinct().order_by('order_id')

                    ord_list = models.Order.objects.filter(id__in=ord_listid).order_by('-id')

                    print(ord_list)

                    for order in ord_list:
                        print(order.order_status )
                        # print(f"Order ID: {order.pk}, Order Date: {order.total_price}")


                    # serialized_obj = serializers.OrderSerializer(instance=ord_list, many = True).data

                    # print(serialized_obj)

                    serialized_obj = serializers.OrderSerializer(instance=ord_list, many = True).data
                    paginator_obj = Paginator(serialized_obj, limit)
                    current_page = paginator_obj.get_page(page).object_list
                    # serialized_obj = serializers.OrderSerializer(instance=ord_list, many = True).data
                    # paginator_obj = Paginator(serialized_obj, limit)
                    # current_page = paginator_obj.get_page(page).object_list

                    return Response( data={"managerorders": current_page, "x_total_count": len(ord_list)  }, status=status.HTTP_200_OK)

            if request.method == "POST":
                
                data = json.loads(request.body)
                statusid = int(data.get('statusid'))                
                status_obj = models.OrderStatus.objects.get(pk = statusid )
                orderid = data.get('orderid')
                adres = data.get('adres')
                note = data.get('note')
                
                

                order_obj = models.Order.objects.get(pk = orderid)

                order_obj.notes = note
                order_obj.shipping_address = adres
                order_obj.order_status = status_obj

                order_obj.save()

                serialized_obj = serializers.OrderSerializer(instance = order_obj).data

                

                return Response( data={"managerorderbyid": serialized_obj, "statusid": statusid }, status=status.HTTP_200_OK)
        
        return Response( data={"managerorders": "not Staff" }, status=status.HTTP_423_LOCKED)

    except Exception as error:
        print(error)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(http_method_names=["POST"])
# @permission_classes([IsAuthenticated, ])
@permission_classes([AllowAny])
# @csrf_exempt
def orders(request):
    
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            products = data.get('basketProducts')

            phone_number = data.get('phoneNumber')
            adres = data.get('adres')
            pay_option_id =  data.get('payOption')
            delivery_option_id = data.get('deliveryOption')
            totalcount = data.get('totalcount')
           



            user = None

            if(request.user.pk):
                user = User.objects.get(pk = request.user.pk) 
                print("user_id:")
                print(user)

            order_status =  models.OrderStatus.objects.get(title='В ожидании')

            pay_option = models.PaymentMethod.objects.get(pk = pay_option_id)
            delivery_option = models.DeliveryMethod.objects.get(pk = delivery_option_id)


                   

            order = models.Order.objects.create(author = user, order_status = order_status, shipping_address = adres, 
             payment_method = pay_option,  phone_number =  phone_number, delivery_method = delivery_option, total_price= totalcount)

            print(order)

            for ord in products:

                product_obj = models.Product.objects.get(pk = ord["id"])

                # print(ord['id']  )
                # print(ord['count'])

                models.OrderProduct.objects.create(order = order, product= product_obj, count_product= ord['count'])

            #products_in_order = order.pproduct.all.prefetch_related('orderproduct_set')

            print("ord_prod")
            ord_prod = models.OrderProduct.objects.filter(order = order.pk)

            print("ord_prod")
            print(ord_prod)

            for pr in ord_prod:
                # print( pr.order + pr.product + pr.count_product )

                print(f'{pr.order}: {pr.product} : {pr.count_product}')

                

            # products_in_order2 = models.Order.objects.prefetch_related('pproduct')

            # print("products_in_order2")
            # print(products_in_order2)

            # products_in_order3 = models.OrderProduct.objects.prefetch_related('product')

            # print("products_in_order3")
            # print(products_in_order3)

                # print('products_in_order')
                # print(products_in_order)
                # for product in products_in_order:
                #     order_product = product.orderproduct_set.first()
                #     print(f'{product.id}: {order_product.count}')


            


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

            return Response( data={"orders": products, "orderid": str(order.pk)   }, status=status.HTTP_200_OK)

    except Exception as error:
        print(error)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(http_method_names=["GET", "POST"])
def deliverypayment(request):
    try:
        if request.method == "GET":
            deliveryObj = models.DeliveryMethod.objects.all()
            deliverySerialized_obj = serializers.DeliveryMethodSerializer(instance=deliveryObj, many = True).data

            paymentObj = models.PaymentMethod.objects.all()
            paymentSerialized_obj = serializers.PaymentMethodSerializer(instance=paymentObj, many = True).data

            return Response( data={"delivery": deliverySerialized_obj, "payment": paymentSerialized_obj }, status=status.HTTP_200_OK)


    except Exception as error:
        print(error)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(http_method_names=["GET", "POST"])
def getallstatus(request):
    try:
        if request.method == "GET":
            orderstatus = models.OrderStatus.objects.all()
            orderstatusserialized = serializers.OrderStatusSerializer(instance=orderstatus, many = True).data

            return Response( data={"orderstatus": orderstatusserialized}, status=status.HTTP_200_OK)
    
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
                    print("нет категории")

                    

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


@api_view(http_method_names=["POST", "GET", "PUT"])
@permission_classes([IsAuthenticated])
def getuser(request): 
    try:
        if request.user.pk:

            print(request.user.pk)

            obj_user = models.Profile.objects.get(user = request.user.pk)

            serialized_obj = serializers.ProfileSerializer(instance = obj_user).data

            return Response( data={"user": serialized_obj }, status=status.HTTP_200_OK)

        else: 
            return Response( data={"user": "no user" }, status=status.HTTP_200_OK)
            

    except Exception as error:
        print(error)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(http_method_names=["POST"])
@permission_classes([AllowAny])
def mysendmail(request):

    data = json.loads(request.body)
    user_name = data.get('userName')
    forgeten_email = data.get('forgetenEmail')
    print(user_name)
    print(forgeten_email)

    
    if User.objects.filter(username = user_name).exists():

        if User.objects.filter(email = forgeten_email).exists():

                   

            charecter = string.ascii_letters + string.digits + string.punctuation
            newpassword = ''.join(random.choice(charecter) for i in range(8))

            message= "Ваш новый пароль: " +  newpassword
            sender = "emailsenderinform@gmail.com"   

           

            env = environ.Env()
            environ.Env.read_env()
            password = env('EMAIL_PASSWORD_GM') #код от приложения

            
            

            server = smtplib.SMTP("smtp.gmail.com", 587)
            server.starttls()

            try:
                server.login(sender, password)
                msg = MIMEText(message)
                msg["Subject"] = "Авторизация"
                server.sendmail(sender, 'temiros@mail.ru', msg.as_string() )
                

                return Response( data={"emailMessage": "The message was sent successfuly!" }, status=status.HTTP_200_OK)
            except Exception as _ex:

                return Response( data={"error": "f{_ex} Check your login or password please!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            







        
        return Response( data={"emailMessage": "Не заполнили почту в личном кабинете, либо не верный имэйл. Создайте новый логин!" }, status=status.HTTP_200_OK)

    return Response( data={"emailMessage": "Данного пользователя не существует" }, status=status.HTTP_200_OK)




@api_view(http_method_names=["POST"])
@permission_classes([IsAuthenticated])
def change_adres(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # user_name = data.get('userName')
        adres = data.get('adres')

        profile = models.Profile.objects.get(user= request.user)
        profile.delivary_adres = adres
        profile.save()

        

        return Response( data={"adres": adres }, status=status.HTTP_200_OK)




@api_view(http_method_names=["POST"])
@permission_classes([IsAuthenticated])
def email_confirmation_view(request):
    if request.method == 'POST':

        data = json.loads(request.body)
        # user_name = data.get('userName')
        email = data.get('userEmail')

        user = request.user     

        if user:

            user.email = email
            user.save()
            

            print (user.email)

            token_generator = PasswordResetTokenGenerator()
            
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = token_generator.make_token(user)
            confirmation_url = f'http://localhost:8000/api/email-confirmation/{uid}/{token}/'

            html_body = f'<p>Пройдите по ссылке <a href="{confirmation_url}"> yumearth </a> для подтверждения почты.</p>'

            env = environ.Env()
            environ.Env.read_env()
            password = env('EMAIL_PASSWORD_GM') #код от приложения

            # message = 'test'
            sender = "emailsenderinform@gmail.com" 


            server = smtplib.SMTP("smtp.gmail.com", 587)
            server.starttls()

            try:
                server.login(sender, password)
                msg = MIMEText(html_body, 'html')
                msg["Subject"] = "Ссылка для подтверждение почты на сайте yumearth.kz"
                server.sendmail(sender, user.email, msg.as_string() )
                

                return Response( data={"emailMessage": "Письмо подтверждения отправлено на почту" }, status=status.HTTP_200_OK)
            except Exception as error:
                print(error)
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            

            

        else:
            return JsonResponse({'success': False, 'error': 'User not found'})

        # if request.user.email:
        #     print(request.user.email)

        #     request.user.email = email
        #     return JsonResponse({'success': 'есть имэйл'})
        # else:

        #     request.user.email = email
        #     request.user.save()
             
        #     print(request.user.email)
    
        
      

        

        return JsonResponse({'success': 'ок'})
        

        # user = User.objects.get(email=email)
        


@api_view(http_method_names=["POST", "GET"])
@permission_classes([AllowAny])
def email_confirmation_confirm(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))

        print('uid')
        print(uid)
        user = User.objects.get(pk=uid)
        print(user)

        print('token')
        print(token)

        try:
            token_generator = PasswordResetTokenGenerator()

            result = token_generator.check_token(user, token)
            print('result')
            print(result)
            if result:

                profile = models.Profile.objects.get(user= user)
                profile.is_confirmed_email = True
                profile.save()

                return HttpResponseRedirect('http://localhost:3000/')

                return JsonResponse({'success': 'Your email address has been confirmed!'})

            else: 
                return JsonResponse({'success': 'Your email address has not been confirmed!'})
        except Exception as error:
          print(error)
          return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

       

    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
        return JsonResponse({'success': False, 'error': 'Invalid confirmation link'})
        
    
    # if user and PasswordResetTokenGenerator.check_token(user, token):
    #     print("email_confirmation_confirm")
    #     print(user)

    #     return JsonResponse({'success': 'Your email address has been confirmed!'})
    # else:
    #     return JsonResponse({'success': False, 'error': 'Invalid confirmation link'})

    
    
# реализация подтверждения пароля:


# from django.core.mail import send_mail
# from django.contrib.auth.tokens import default_token_generator
# from django.utils.encoding import force_bytes
# from django.utils.http import urlsafe_base64_encode
# from django.views.decorators.csrf import csrf_exempt
# from django.http import JsonResponse

# @csrf_exempt
# def email_confirmation_view(request):
#     if request.method == 'POST':
#         email = request.POST.get('email')
#         user = User.objects.get(email=email)
#         if user:
#             token_generator = default_token_generator()
#             uid = urlsafe_base64_encode(force_bytes(user.pk))
#             token = token_generator.make_token(user)
#             confirmation_url = f'http://localhost:8000/api/email-confirmation/{uid}/{token}/'

#             send_mail(
#                 'Confirm your email address',
#                 f'Click this link to confirm your email address: {confirmation_url}',
#                 'noreply@example.com',
#                 [email],
#                 fail_silently=False,
#             )

#             return JsonResponse({'success': True})
#         else:
#             return JsonResponse({'success': False, 'error': 'User not found'})


# урл

# from django.urls import path
# from .views import email_confirmation_confirm

# urlpatterns = [
#     path('api/email-confirmation/<uidb64>/<token>/', email_confirmation_confirm, name='email_confirmation_confirm'),
# ]


# дальше

# from django.contrib.auth import get_user_model
# from django.contrib.auth.tokens import default_token_generator
# from django.utils.encoding import force_text
# from django.utils.http import urlsafe_base64_decode
# from django.http import HttpResponse

# User = get_user_model()

# def email_confirmation_confirm(request, uidb64, token):
#     try:
#         uid = force_text(urlsafe_base64_decode(uidb64))
#         user = User.objects.get(pk=uid)
#     except (TypeError, ValueError, OverflowError, User.DoesNotExist):
#         user = None

#     if user and default_token_generator.check_token(user, token):
#         user.email_confirmed = True
#         user.save()

#         return HttpResponse('Your email address has been confirmed!')
#     else:
#         return HttpResponse('Invalid confirmation link')

# завершение реализации подтверждения пароля

    

# Отправка как html письмо

# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart

# # Create the email message
# sender = 'your_email@example.com'
# receiver = user.email
# subject = 'Confirm your email address'
# confirmation_url = f'http://localhost:8000/api/email-confirmation/{uid}/{token}/'
# message = MIMEMultipart('alternative')
# message['Subject'] = subject
# message['From'] = sender
# message['To'] = receiver
# html_body = f'<p>Please click <a href="{confirmation_url}">here</a> to confirm your email address.</p>'
# message.attach(MIMEText(html_body, 'html'))

# # Send the email using SMTP
# with smtplib.SMTP('smtp.gmail.com', 587) as server:
#     server.starttls()
#     server.login(sender, 'your_email_password')
#     server.sendmail(sender, receiver, message.as_string())
       

@api_view(http_method_names=["POST"])
@permission_classes([AllowAny])
def celerytasks(request):

    tasks.mysendmailcellery.delay()
    return Response( data={"emailMessage": "The message was sent by cellery successfuly!" }, status=status.HTTP_200_OK)



@api_view(http_method_names=["POST", "GET"])
@permission_classes([IsAuthenticated])
def get_order_by_user(request):
    if request.method == 'GET':

        page = int(request.GET.get("currentPage", 1))
        limit = int(request.GET.get("pageSize", 1))


        
        user = User.objects.get(pk=request.user.pk)
        orders = models.Order.objects.filter(author=user).prefetch_related('orderproduct_set__product').order_by('-id')


        # Пример sql:
        # SELECT "orders"."id", "orders"."author_id"
        # FROM "orders"
        # WHERE "orders"."author_id" = user_id

        # SELECT "order_product"."id", "order_product"."order_id", "order_product"."product_id", "order_product"."count_product",
        #     "product"."id", "product"."title"
        # FROM "order_product"
        # LEFT OUTER JOIN "product" ON ("order_product"."product_id" = "product"."id")
        # WHERE "order_product"."order_id" IN (list_of_order_ids)

        

        # serialized_obj = serializers.OrderSerializer(instance=orders, many = True).data

        serialized_obj = serializers.OrderCabinetSerializer(instance=orders, many=True).data

        paginator_obj = Paginator(serialized_obj, limit)
        current_page = paginator_obj.get_page(page).object_list

        return Response( data={"orders": current_page, "x_total_count": len(orders) }, status=status.HTTP_200_OK)
