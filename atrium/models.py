from django.db import models

class User(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)


class DevelopmentPlan(models.Model):
    id = models.AutoField(primary_key=True)
    created = models.DateField(auto_now_add=True)
    leader_id = models.ForeignKey('User', on_delete=models.DO_NOTHING)

class DevPlanGoal(models.Model):
    class Status(models.TextChoices):
        NOT_STARTED = 'NS', 'Onboarding'
        IN_PROGRESS = 'IP', '1:1 sessions'
        COMPLETE = 'C', 'Complete'
        ASSESSMENT = 'A', 'Impact Assessment'

    id = models.AutoField(primary_key=True)
    dev_plan_id = models.ForeignKey('DevelopmentPlan', on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(
        max_length=2,
        choices=Status.choices,
        default=Status.NOT_STARTED,
    )

    def __str__(self):
        return self.name