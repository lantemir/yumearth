# Generated by Django 4.1.6 on 2023-02-20 12:59

from django.db import migrations, models
import django_app.models


class Migration(migrations.Migration):

    dependencies = [
        ('django_app', '0002_productcategory_product'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='product',
            options={'verbose_name': 'Товары', 'verbose_name_plural': 'товары'},
        ),
        migrations.AlterModelOptions(
            name='productcategory',
            options={'verbose_name': 'Категории товаров', 'verbose_name_plural': 'Категории товара'},
        ),
        migrations.AddField(
            model_name='product',
            name='isactive',
            field=models.BooleanField(default=False, help_text='<small class="text-muted">Активация товара</small><hr><br>', verbose_name='Активировать товар'),
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='products/noprod.jpg', help_text='<small class="text-muted">это наш заставка</small><hr><br>', upload_to=django_app.models.upload_to_product, verbose_name='Заставка:'),
        ),
    ]
