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
        return f'{self.title}'

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

    class Meta:
        app_label = 'django_app' # для отображения в админке и ещё надо изменить и добавить в apps.py
        # ordering = ('title') # сортировка сначала по title потом по dexcription
        verbose_name = 'Товары'    
        verbose_name_plural = 'товары'

    def __str__(self) -> str:
        return f'{self.title}'



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
        verbose_name='Адрес доставки',
        max_length=500,
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