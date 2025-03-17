from .models import User, DevelopmentPlan, DevPlanGoal
from .serializers import serialize_dev_plan_goals
from django.http import JsonResponse

def goal_list(request):
    goals = DevPlanGoal.objects.all()
    return JsonResponse(serialize_dev_plan_goals(goals), safe=False)