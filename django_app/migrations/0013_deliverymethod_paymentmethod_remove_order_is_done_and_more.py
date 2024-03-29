# Generated by Django 4.1.6 on 2023-03-11 13:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('django_app', '0012_orderstatus_alter_order_order_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='DeliveryMethod',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, help_text='<small class="text-muted">Способ доставки</small><hr><br>', max_length=250, verbose_name='Способ доставки')),
            ],
            options={
                'verbose_name': 'Способ доставки',
                'verbose_name_plural': 'Способ доставки',
            },
        ),
        migrations.CreateModel(
            name='PaymentMethod',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, help_text='<small class="text-muted">Способ оплаты</small><hr><br>', max_length=250, verbose_name='Способ оплаты')),
            ],
            options={
                'verbose_name': 'Способ оплаты',
                'verbose_name_plural': 'Способ оплаты',
            },
        ),
        migrations.RemoveField(
            model_name='order',
            name='is_done',
        ),
        migrations.AlterField(
            model_name='order',
            name='delivery_method',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='django_app.deliverymethod', verbose_name='Способ доставки'),
        ),
        migrations.AlterField(
            model_name='order',
            name='payment_method',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='django_app.paymentmethod', verbose_name='Способ оплаты'),
        ),
    ]
