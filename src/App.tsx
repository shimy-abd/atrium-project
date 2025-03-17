import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import PieChart from './components/PieChart';

enum DevPlanGoalStatus {
  NOT_STARTED = 'NS',
  IN_PROGRESS = 'IP',
  COMPLETE = 'C',
  ASSESSMENT = 'A'
}

interface DevPlanGoal {
  name: string;
  status: DevPlanGoalStatus;
}

function App() {
  const [goals, setGoals] = useState<DevPlanGoal[]>([]);

  useEffect(() => {
    const goalListUrl = 'http://localhost:8000/atrium/';
    axios.get<DevPlanGoal[]>(goalListUrl)
      .then(response => setGoals(response.data))
      .catch(error => console.error('Error fetching goals:', error));
  }, []);

  return (
    <>
      <h1>Participant Progress</h1>
      <PieChart goals={goals} />
    </>
  );
}

export default App;
