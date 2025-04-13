import React, { useState, useEffect } from 'react';
import { PlusCircle, CheckCircle, XCircle, Activity, Target, Award, BarChart3, Dumbbell, Flame } from 'lucide-react';
type Workout = {
  id: number;
  name: string;
  type: string;
  weight: string;
  sets: string;
  reps: string;
  completed: boolean;
};

export default function WorkoutTracker() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [stats, setStats] = useState({
    steps: 0,
    caloriesBurned: 0,
    caloriesConsumed: 0
  });
  const [goals, setGoals] = useState({
    weight: 0,
    steps: 10000,
    calories: 2000
  });
  const [currentWeight, setCurrentWeight] = useState(0);
  const [activeTab, setActiveTab] = useState('workouts');
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    type: 'strength',
    weight: '',
    sets: '',
    reps: '',
    completed: false
  });

  // Calculate calories burned from steps (approximately 0.04 calories per step)
  useEffect(() => {
    setStats(prev => ({
      ...prev,
      caloriesBurned: Math.round(prev.steps * 0.04)
    }));
  }, [stats.steps]);

  const handleAddWorkout = () => {
    if (newWorkout.name && newWorkout.sets && newWorkout.reps) {
      setWorkouts([...workouts, { ...newWorkout, id: Date.now() }]);
      setNewWorkout({
        name: '',
        type: 'strength',
        weight: '',
        sets: '',
        reps: '',
        completed: false
      });
    }
  };

  const toggleWorkoutCompletion = (id: number) => {
    setWorkouts(workouts.map(workout =>
        workout.id === id ? { ...workout, completed: !workout.completed } : workout
    ));
  };

  const deleteWorkout = (id: number) => {
    setWorkouts(workouts.filter(workout => workout.id !== id));
  };

  const handleStatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStats(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const handleGoalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGoals(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-4 max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-purple-400 mb-2">Fitness Tracker</h1>
          <div className="h-1 w-24 bg-purple-500 rounded"></div>
        </header>

        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="flex border-b border-gray-700">
            <button
                className={`px-4 py-3 flex-1 font-medium flex items-center justify-center ${activeTab === 'workouts' ? 'bg-gray-700 text-purple-400' : ''}`}
                onClick={() => setActiveTab('workouts')}
            >
              <Dumbbell size={18} className="mr-2" /> Workouts
            </button>
            <button
                className={`px-4 py-3 flex-1 font-medium flex items-center justify-center ${activeTab === 'stats' ? 'bg-gray-700 text-purple-400' : ''}`}
                onClick={() => setActiveTab('stats')}
            >
              <BarChart3 size={18} className="mr-2" /> Stats
            </button>
            <button
                className={`px-4 py-3 flex-1 font-medium flex items-center justify-center ${activeTab === 'goals' ? 'bg-gray-700 text-purple-400' : ''}`}
                onClick={() => setActiveTab('goals')}
            >
              <Target size={18} className="mr-2" /> Goals
            </button>
          </div>

          {activeTab === 'workouts' && (
              <div className="p-4">
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-4 text-purple-300">Add New Workout</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">Exercise Name</label>
                        <input
                            type="text"
                            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={newWorkout.name}
                            onChange={(e) => setNewWorkout({...newWorkout, name: e.target.value})}
                            placeholder="Exercise name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">Type</label>
                        <select
                            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={newWorkout.type}
                            onChange={(e) => setNewWorkout({...newWorkout, type: e.target.value})}
                        >
                          <option value="strength">Strength</option>
                          <option value="cardio">Cardio</option>
                          <option value="flexibility">Flexibility</option>
                          <option value="balance">Balance</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">Weight (lbs)</label>
                        <input
                            type="number"
                            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={newWorkout.weight}
                            onChange={(e) => setNewWorkout({...newWorkout, weight: e.target.value})}
                            placeholder="Weight"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">Sets</label>
                        <input
                            type="number"
                            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={newWorkout.sets}
                            onChange={(e) => setNewWorkout({...newWorkout, sets: e.target.value})}
                            placeholder="Sets"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">Reps</label>
                        <input
                            type="number"
                            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={newWorkout.reps}
                            onChange={(e) => setNewWorkout({...newWorkout, reps: e.target.value})}
                            placeholder="Reps"
                        />
                      </div>
                    </div>
                    <button
                        className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors"
                        onClick={handleAddWorkout}
                    >
                      <PlusCircle size={18} className="mr-2" /> Add Workout
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-4 text-purple-300">Your Workouts</h3>
                {workouts.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      No workouts added yet. Add your first workout above!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                      {workouts.map(workout => (
                          <div key={workout.id} className={`bg-gray-700 p-4 rounded-lg border-l-4 ${
                              workout.completed ? 'border-green-500' : 'border-yellow-500'
                          }`}>
                            <div className="flex justify-between mb-2">
                              <h4 className="font-medium">{workout.name}</h4>
                              <span className="px-2 py-1 text-xs rounded bg-gray-900 text-gray-300">
                        {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
                      </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mb-3 text-sm text-gray-300">
                              <div>Weight: {workout.weight ? `${workout.weight} lbs` : 'N/A'}</div>
                              <div>Sets: {workout.sets}</div>
                              <div>Reps: {workout.reps}</div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                  className={`flex items-center px-3 py-1 rounded text-sm ${
                                      workout.completed
                                          ? 'bg-green-900 text-green-300'
                                          : 'bg-gray-600 text-gray-300 hover:bg-green-900 hover:text-green-300'
                                  }`}
                                  onClick={() => toggleWorkoutCompletion(workout.id)}
                              >
                                <CheckCircle size={16} className="mr-1" />
                                {workout.completed ? 'Completed' : 'Mark Complete'}
                              </button>
                              <button
                                  className="flex items-center px-3 py-1 rounded text-sm bg-red-900 text-red-300 hover:bg-red-800"
                                  onClick={() => deleteWorkout(workout.id)}
                              >
                                <XCircle size={16} className="mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                      ))}
                    </div>
                )}
              </div>
          )}

          {activeTab === 'stats' && (
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4 text-purple-300">Daily Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <label className="font-medium text-gray-300 flex items-center">
                        <Activity size={18} className="mr-2 text-blue-400" />
                        Steps Today
                      </label>
                      {goals.steps > 0 && (
                          <span className="text-sm text-gray-400">
                      Goal: {goals.steps.toLocaleString()}
                    </span>
                      )}
                    </div>
                    <input
                        type="number"
                        name="steps"
                        className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={stats.steps}
                        onChange={handleStatsChange}
                        placeholder="Enter steps"
                    />
                    {goals.steps > 0 && (
                        <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                          <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${Math.min(100, (stats.steps / goals.steps) * 100)}%` }}
                          ></div>
                        </div>
                    )}
                    <div className="text-sm text-gray-400">
                      Calories burned: {stats.caloriesBurned.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <label className="font-medium text-gray-300 flex items-center">
                        <Flame size={18} className="mr-2 text-orange-400" />
                        Calories Consumed
                      </label>
                      {goals.calories > 0 && (
                          <span className="text-sm text-gray-400">
                      Goal: {goals.calories.toLocaleString()}
                    </span>
                      )}
                    </div>
                    <input
                        type="number"
                        name="caloriesConsumed"
                        className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={stats.caloriesConsumed}
                        onChange={handleStatsChange}
                        placeholder="Enter calories consumed"
                    />
                    {goals.calories > 0 && (
                        <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                          <div
                              className="bg-orange-500 h-2 rounded-full"
                              style={{ width: `${Math.min(100, (stats.caloriesConsumed / goals.calories) * 100)}%` }}
                          ></div>
                        </div>
                    )}
                    <div className="text-sm text-gray-400">
                      Net calories: {stats.caloriesConsumed - stats.caloriesBurned}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-md font-medium mb-4 text-purple-300 flex items-center">
                    <Award size={18} className="mr-2" />
                    Today's Progress
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Steps Progress</div>
                      <div className="text-2xl font-bold">
                        {goals.steps > 0
                            ? `${Math.round((stats.steps / goals.steps) * 100)}%`
                            : 'No goal set'}
                      </div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Calorie Balance</div>
                      <div className="text-2xl font-bold">
                        {stats.caloriesConsumed - stats.caloriesBurned}
                      </div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Workouts Completed</div>
                      <div className="text-2xl font-bold">
                        {workouts.filter(w => w.completed).length}/{workouts.length}
                      </div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Current Weight</div>
                      <div className="text-2xl font-bold">
                        {currentWeight > 0 ? `${currentWeight} lbs` : 'Not set'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          )}

          {activeTab === 'goals' && (
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4 text-purple-300">Set Your Goals</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <label className="block text-sm font-medium mb-1 text-gray-300">Current Weight (lbs)</label>
                    <input
                        type="number"
                        className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={currentWeight}
                        onChange={(e) => setCurrentWeight(parseInt(e.target.value) || 0)}
                        placeholder="Enter your current weight"
                    />

                    <label className="block text-sm font-medium mb-1 text-gray-300">Goal Weight (lbs)</label>
                    <input
                        type="number"
                        name="weight"
                        className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={goals.weight}
                        onChange={handleGoalsChange}
                        placeholder="Enter goal weight"
                    />

                    <label className="block text-sm font-medium mb-1 text-gray-300">Daily Step Goal</label>
                    <input
                        type="number"
                        name="steps"
                        className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={goals.steps}
                        onChange={handleGoalsChange}
                        placeholder="Enter daily step goal"
                    />

                    <label className="block text-sm font-medium mb-1 text-gray-300">Daily Calorie Goal</label>
                    <input
                        type="number"
                        name="calories"
                        className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={goals.calories}
                        onChange={handleGoalsChange}
                        placeholder="Enter daily calorie goal"
                    />
                  </div>

                  {currentWeight > 0 && goals.weight > 0 && (
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 text-purple-300">Weight Progress</h4>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">Current: {currentWeight} lbs</span>
                          <span className="text-sm text-gray-400">Goal: {goals.weight} lbs</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                          <div
                              className={`h-3 rounded-full ${currentWeight > goals.weight ? 'bg-red-500' : 'bg-green-500'}`}
                              style={{ width: currentWeight > goals.weight
                                    ? `${Math.min(100, (1 - ((currentWeight - goals.weight) / currentWeight)) * 100)}%`
                                    : `${Math.min(100, (currentWeight / goals.weight) * 100)}%`
                              }}
                          ></div>
                        </div>
                        <div className="text-center text-sm text-gray-400">
                          {currentWeight > goals.weight
                              ? `${currentWeight - goals.weight} lbs to lose`
                              : currentWeight < goals.weight
                                  ? `${goals.weight - currentWeight} lbs to gain`
                                  : "You've reached your goal weight!"}
                        </div>
                      </div>
                  )}
                </div>
              </div>
          )}
        </div>
      </div>
  );
}