from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields.files import ImageField
from django.utils import timezone
import datetime
from dateutil.relativedelta import relativedelta


class User(AbstractUser):
    postion = models.CharField(blank=False, default='client', max_length=256)
    # def __str__(self):
    #     return self.user


class Classes(models.Model):

    name = models.CharField(blank=False, default='', max_length=256)
    coach = models.ForeignKey(User, on_delete=models.CASCADE, default='')
    # user = models.ManyToManyField(
    #     User, through='userGymInfo', related_name='classes')
    date_start = models.DateTimeField(
        default=timezone.now)
    date_end = models.DateTimeField(blank=True, default='')


class User_Class(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    className = models.ForeignKey(
        Classes, on_delete=models.CASCADE, default='')
    # perf_rate = models.IntegerField(default=0, blank=True)


class Membership(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    date_start = models.DateTimeField(
        default=timezone.now)
    date_end = models.DateTimeField(blank=True, default='')


# class Post(models.Model):
#     creator = models.ForeignKey(
#         "User", on_delete=models.PROTECT, related_name="posts")
#     body = models.TextField(blank=False)
#     timestamp = models.DateTimeField(auto_now_add=True)
#     likes = models.ManyToManyField("User", related_name="likes")
#     likes_counter = models.IntegerField(default=0)


# class Followers(models.Model):
#     followee = models.ForeignKey(
#         "User", on_delete=models.CASCADE, related_name="followers")
#     following = models.ForeignKey(
#         "User", on_delete=models.PROTECT, related_name="following")

#     def serialize(self):
#         return {
#             'user': self,
#             "id": self.id,
#             "creator": self.creator,
#             # "recipients": [user.email for user in self.recipients.all()],
#             # "subject": self.subject,
#             "body": self.body,
#             "timestamp": self.timestamp.strftime("%m/%d/%Y"),
#             "likes_counter": self.likes_counter,
#             # "archived": self.archived
#         }
