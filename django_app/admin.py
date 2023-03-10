from django.contrib import admin

# Register your models here.
from django_app import models

admin.site.site_header = 'Панель 1'
admin.site.index_title = 'Панель 2'
admin.site.site_title = 'Панель 3'



class ProductAdmin(admin.ModelAdmin):
    """Product"""
    list_display = (
        'title',
        'image',
        'price',
        'description',
        
    )
    filter_horizontal = ('productCategory',) # только для полей флрмата many to many fields


class TextModelAdmin(admin.ModelAdmin):
    """Text Model"""

    list_display = (
        'author',
        'text',
        'author',
        'created_datetime',
    )

    list_display_links = (
        'author',
        'created_datetime',
    )

    list_editable = (
        'text',      
    )

    list_filter = (
        'author', 
        'text',
        'created_datetime',  
    )

    fieldsets = (
        (
            'Основное',{
                "fields": (
                    'author',
                    'text',
                    'created_datetime',
                )
            }
        ) ,
    )

    search_fields = [
        'author',
        'text',
        'created_datetime',

    ]



class OrderAdmin(admin.ModelAdmin):
    list_display =( # поля для отображения
        'id',
        'author',
        'created_datetime',
        'order_status',       
        'shipping_address',
        'billing_address',
        'payment_method',
        'is_done',
        'notes',

        
    )
    filter_horizontal = ('pproduct',) # только для полей флрмата many to many fields
    list_display_links = ( # поля ссылка
        'created_datetime',
             
    )
    list_editable = ( # поля для редактирование объекта на лету
        # 'category',
      
    )
    list_filter = ( 
        'created_datetime',
        'order_status',
        'author',
        
        
       
    )
    # fieldsets = ( # подзаголовки для визуального отделения блоков друг от друга
    #     ('Основное', {'fields': (
    #         'author',            
            
           
    #     )}),
    #     ('Дополнительно', {'fields': (
          
    #         'author',
    #     )}),
    # )
    search_fields =[ # поле для поиска
       'created_datetime',
        'order_status',
        'author',
        
    ]



admin.site.register(models.TextModel, TextModelAdmin)
admin.site.register(models.ProductCategory)
admin.site.register(models.Product, ProductAdmin)
admin.site.register(models.Profile)
# admin.site.register(models.Order)
admin.site.register(models.Order, OrderAdmin)
admin.site.register(models.OrderProduct)