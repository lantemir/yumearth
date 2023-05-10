from django.contrib.auth.models import User
from django.db import models
from django.dispatch import receiver 
from django.db.models.signals import post_save
# from django.core.validators import FileExtensionValidator

# Create your models here.

from django.utils import timezone

class TextModel(models.Model):
    author = models.ForeignKey(
        verbose_name='Автор',
        to=User,
        on_delete=models.CASCADE,
    )
    text = models.CharField(
        verbose_name='Текст',
        max_length=500,
    )
    created_datetime = models.DateTimeField(
        default=timezone.now,
        verbose_name='Время создания',
    )

class ProductCategory(models.Model):
    title = models.CharField (
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,

        verbose_name="Заголовок категории товара",
        help_text='<small class="text-muted">это наш заголовок категории товара</small><hr><br>',
        max_length=250,
    )

    class Meta:
        app_label = 'django_app' # для отображения в админке и ещё надо изменить и добавить в apps.py
        # ordering = ('title') # сортировка сначала по title потом по dexcription
        verbose_name = 'Категории товаров'    
        verbose_name_plural = 'Категории товара'

    def __str__(self) -> str:
        return f'{self.pk}{self.title}'

# для картинок когда с фронта
# def upload_to (instance, filename):
#     return 'images/{filename}'.format(filename=filename)
def upload_to_product (instance, filename):
    return '/'.join(['products', filename])



    

class Product(models.Model):
    title = models.CharField(
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
       
        default="заголовок",
        verbose_name="Заголовок",
        help_text='<small class="text-muted">это наш заголовок</small><hr><br>',
        max_length=300,
    )

    

    image = models.ImageField(       
        unique=False,
        editable=True,
        blank=True, #отображение в модельке админ
        
        default="products/noprod.jpg",
        verbose_name="Заставка:",
        help_text='<small class="text-muted">это наш заставка</small><hr><br>',
        
        # validators=[FileExtensionValidator(['jpg', 'png'])],
        upload_to= upload_to_product,
        max_length=100,
    )

    price = models.IntegerField(
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default="0",
        verbose_name="Цена",
        help_text='<small class="text-muted">Цена</small><hr><br>',
    )

    description = models.TextField(           
        editable=True,
        blank=True, #можно оставить пустым       
        default="Описание",
        verbose_name="Описание",        
    )

    productCategory= models.ManyToManyField(        
        primary_key=False,      
        unique=False,
        editable=True,
        blank=True,
       
        default= None,
        verbose_name="Категория товара",
        help_text='<small class="text-muted">Категория товара</small><hr><br>',

        to=ProductCategory,       
        
    )

    isactive = models.BooleanField(
        default=False,

        verbose_name="Активировать товар",
        help_text='<small class="text-muted">Активация товара</small><hr><br>',
    )

    instock = models.BooleanField(
        default=True,
        verbose_name="Есть в наличии",
        help_text='<small class="text-muted">наличие товара</small><hr><br>',
    )     

    cost_price = models.IntegerField(
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,        
        verbose_name="Себестоимость",
        help_text='<small class="text-muted">Цена</small><hr><br>',
    )

     

    stock_contact = models.CharField(
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,   
        
        verbose_name="Контакты продовца",
        help_text='<small class="text-muted">Контакты склада</small><hr><br>',
        max_length=500,
    )

    class Meta:
        app_label = 'django_app' # для отображения в админке и ещё надо изменить и добавить в apps.py
        # ordering = ('title') # сортировка сначала по title потом по dexcription
        verbose_name = 'Товары'    
        verbose_name_plural = 'товары'

    def __str__(self) -> str:
        return f'{self.pk}'



# для картинок
# def upload_to_avatar (instance, filename):
#     return 'avatars/{filename}'.format(filename=filename)

def upload_to_avatar (instance, filename):
    return '/'.join(['avatars', filename])

class Profile(models.Model):
    user = models.OneToOneField(
        primary_key=True,
        editable=True,
        blank=True,
        null=False,
        default=None,
        verbose_name='Аккаунт',

        to=User,
        on_delete=models.CASCADE,
    )

    avatar = models.ImageField(
        null=True,       
        blank=True,       
        upload_to=upload_to_avatar,
        default='avatars/ava.jpg'
    )    

    delivary_adres = models.CharField(
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
       
        
        verbose_name="адрес доставки",
        help_text='<small class="text-muted">это адрес доставки</small><hr><br>',
        max_length=500,
    )

    is_confirmed_email = models.BooleanField(
        default=False,

        verbose_name="имэйл подтверждён?",
        help_text='<small class="text-muted">имэйл подтверждён</small><hr><br>',
    )




    class Meta:
        app_label = 'auth'
        ordering =('user',)
        verbose_name = 'Профиль пользователя'
        verbose_name_plural = 'Профили пользователей'
    
    def __str__(self):
        return f'профиль: {self.user.username}'

#сигнал при создании юзера автоматом создаст таблицу profile 
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        # тут происходит первое создание модели
        Profile.objects.get_or_create(user=instance)
    else:
        Profile.objects.get_or_create(user=instance)



class OrderStatus(models.Model):
    title = models.CharField (
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,

        verbose_name="Статусы заказа",
        help_text='<small class="text-muted">Статусы заказа</small><hr><br>',
        max_length=250,
    )

    class Meta:
        app_label = 'django_app' # для отображения в админке и ещё надо изменить и добавить в apps.py
        # ordering = ('title') # сортировка сначала по title потом по dexcription
        verbose_name = 'Статусы заказа'    
        verbose_name_plural = 'Статусы заказа'

    def __str__(self) -> str:
        return f'{self.pk } {self.title}'


class PaymentMethod(models.Model):
    title = models.CharField (
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,

        verbose_name="Способ оплаты",
        help_text='<small class="text-muted">Способ оплаты</small><hr><br>',
        max_length=250,
    )

    class Meta:
        app_label = 'django_app' # для отображения в админке и ещё надо изменить и добавить в apps.py
        # ordering = ('title') # сортировка сначала по title потом по dexcription
        verbose_name = 'Способ оплаты'    
        verbose_name_plural = 'Способ оплаты'

    def __str__(self) -> str:
        return f'{self.pk } {self.title}'




class DeliveryMethod(models.Model):
    title = models.CharField (
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,

        verbose_name="Способ доставки",
        help_text='<small class="text-muted">Способ доставки</small><hr><br>',
        max_length=250,
    )

    class Meta:
        app_label = 'django_app' # для отображения в админке и ещё надо изменить и добавить в apps.py
        # ordering = ('title') # сортировка сначала по title потом по dexcription
        verbose_name = 'Способ доставки'    
        verbose_name_plural = 'Способ доставки'

    def __str__(self) -> str:
        return f'{self.pk } {self.title}'



# до Order 0003 миграция последняя
class Order(models.Model):
    # title = models.CharField (
    #     primary_key=False,
    #     unique=False,
    #     editable=True,
    #     blank=True,

    #     verbose_name="Заголовок категории товара",
    #     help_text='<small class="text-muted">это наш заголовок категории товара</small><hr><br>',
    #     max_length=250,
    # )

    author = models.ForeignKey(
        verbose_name='Автор',
        blank=True,
        null=True,
        to=User,
        on_delete=models.CASCADE,  # on_delete=models.SET_NULL, #CASCADE - удаляет всю запись при удаление связаной (родительской) записи.    SET_NULL - зануляет превращает в null    DO_NOTHING
    )

    
    # удалил 
    # pproduct= models.ManyToManyField(       
    #     primary_key=False,      
    #     unique=False,
    #     editable=True,
    #     blank=True,
       
    #     default= None,
    #     verbose_name="товары",
    #     help_text='<small class="text-muted">товары заказанные</small><hr><br>',

    #     to=Product,       
        
    # )


    
    created_datetime = models.DateTimeField(
        default=timezone.now,        
        verbose_name='Время создания',
    )

    order_status = models.ForeignKey(
        verbose_name='Статус заказа',
        blank=True,
        null=True,
        to=OrderStatus,
        on_delete=models.CASCADE,  # on_delete=models.SET_NULL, #CASCADE - удаляет всю запись при удаление связаной (родительской) записи.    SET_NULL - зануляет превращает в null    DO_NOTHING
    )

    shipping_address = models.TextField(
        blank=True)

    billing_address = models.TextField(
        blank=True
    )    

    payment_method = models.ForeignKey(
        verbose_name='Способ оплаты',
        blank=True,
        null=True,
        to=PaymentMethod,
        on_delete=models.CASCADE,  # on_delete=models.SET_NULL, #CASCADE - удаляет всю запись при удаление связаной (родительской) записи.    SET_NULL - зануляет превращает в null    DO_NOTHING
    )

    delivery_method = models.ForeignKey(
        verbose_name='Способ доставки',
        blank=True,
        null=True,
        to=DeliveryMethod,
        on_delete=models.CASCADE,  # on_delete=models.SET_NULL, #CASCADE - удаляет всю запись при удаление связаной (родительской) записи.    SET_NULL - зануляет превращает в null    DO_NOTHING
    )  

    phone_number = models.TextField(
        blank=True
    )


    # is_done = models.BooleanField(
    #     default=False,

    #     verbose_name="Заказ выполенен?",
    #     help_text='<small class="text-muted">Заказ выполенен</small><hr><br>',
    # )

    

    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True)

    notes = models.TextField(blank=True)

    class Meta:
        app_label = 'django_app' # для отображения в админке и ещё надо изменить и добавить в apps.py
        # ordering = ('title') # сортировка сначала по title потом по dexcription
        verbose_name = 'Заказы'    
        verbose_name_plural = 'Заказы'

    def __str__(self) -> str:
        return f'{self.pk}'


# много ко многому
class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    count_product = models.IntegerField()

def __str__(self) -> str:
        return f'{self.order} {self.product} {self.count_product}'






#  ('pending', 'В ожидании'),
#         ('processing', 'Обработка'),
#         ('shipped', 'Отправленный'),
#         ('delivered', 'Доставленный'),
#         ('cancelled', 'Отменено'),




# Логика во wiew

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
