
from django.urls import path, include, re_path
from django_app import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView, TokenVerifyView, TokenBlacklistView
)
#from django_app.views import MyPostViewSet#для класов
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.index, name="index"),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('logout/', views.LogoutView.as_view(), name='logout'),

  

    

    path('isstaff/', view=views.isstaff, name="isstaff"),
    

    re_path(route=r'^users/$', view=views.users, name="users"),
    re_path(route=r'^chat/(?P<sms_id>\d+)/$', view=views.chat, name="chat_id"),
    re_path(route=r'^chat/$', view=views.chat, name="chat"),

    # re_path(route=r'^product/(?P<productid>\d+)/$', view=views.product, name="product"),
    re_path(route=r'^product/$', view=views.product, name="product"),

    re_path(route=r'^basketproducts/$', view=views.basketproducts, name="basketproducts"),

    re_path(route=r'^productcategory/$', view=views.prod_category, name="prod_category"),

    re_path(route=r'^orders/$', view=views.orders, name="orders"),

    re_path(route=r'^getallstatus/$', view=views.getallstatus, name="getallstatus"),
    

    re_path(route=r'^deliveryandpaymenttype/$', view=views.deliverypayment, name="deliverypayment"),

    re_path(route=r'^managerorder/$', view=views.managerorder, name="managerorder"),

    
]
