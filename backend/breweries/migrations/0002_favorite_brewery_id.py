# Generated by Django 3.0 on 2022-07-27 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('breweries', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='favorite',
            name='brewery_id',
            field=models.CharField(default='abc', max_length=1000),
            preserve_default=False,
        ),
    ]
