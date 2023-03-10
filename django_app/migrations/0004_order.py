# Generated by Django 4.1.6 on 2023-03-08 06:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('django_app', '0003_alter_product_options_alter_productcategory_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_datetime', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Время создания')),
                ('order_status', models.CharField(choices=[('pending', 'В ожидании'), ('processing', 'Обработка'), ('shipped', 'Отправленный'), ('delivered', 'Доставленный'), ('cancelled', 'Отменено')], max_length=20)),
                ('shipping_address', models.TextField()),
                ('billing_address', models.TextField()),
                ('payment_method', models.CharField(choices=[('credit_card', 'Кредитная карта'), ('cash', 'Наличными')], max_length=20)),
                ('is_done', models.BooleanField(default=False, help_text='<small class="text-muted">Заказ выполенен</small><hr><br>', verbose_name='Заказ выполенен?')),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('notes', models.TextField(blank=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Автор')),
                ('pproduct', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='django_app.product', verbose_name='Товар')),
            ],
            options={
                'verbose_name': 'Заказы',
                'verbose_name_plural': 'Заказы',
            },
        ),
    ]
