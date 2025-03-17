from .models import User, DevelopmentPlan, DevPlanGoal
from typing import Iterable, List, Dict, Any

def serialize_dev_plan_goals(goals: Iterable[DevPlanGoal]) -> List[Dict[str, Any]]:
    data = []
    for goal in goals:
        data.append({
            'name': goal.name,
            'description': goal.description,
            'status': goal.status,
        })
    return data
