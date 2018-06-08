# Generated by Django 2.0.3 on 2018-06-07 10:56

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('salon', '0029_auto_20180607_0642'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stylistservice',
            name='service_origin_uuid',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
        migrations.AlterField(
            model_name='stylistservice',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
        ),
    ]