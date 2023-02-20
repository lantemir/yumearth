
from django.urls import path, include, re_path
from django_app import views

urlpatterns = [
    path('', views.index, name="index"),

    re_path(route=r'^users/$', view=views.users, name="users"),
    re_path(route=r'^chat/(?P<sms_id>\d+)/$', view=views.chat, name="chat_id"),
    re_path(route=r'^chat/$', view=views.chat, name="chat"),

    # re_path(route=r'^product/(?P<productid>\d+)/$', view=views.product, name="product"),
    re_path(route=r'^product/$', view=views.product, name="product"),

    re_path(route=r'^productcategory/$', view=views.prod_category, name="prod_category"),

    
]
