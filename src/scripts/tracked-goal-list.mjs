import GoalDay from "./goal-day.mjs";
import TrackedGoal from "./tracked-goal.mjs";

export default class TrackedGoalList
{
    //set goals initially when they sign up for the challenge
    //pass in a list of goals nd create the 
    constructor()
    {
		//This will be a list of tracked goals
        this.goals = [];
        //this.startDate = 
    }
	//TODO look up wdd231 meal-plan loadFromStorage

	// static fromJSON(jsonData) {
	// 	return new TrackedGoalList(jsonData.id, jsonData.name, jsonData.progress);
	//   }
    //init from storage
    markOffGoal(goalId, day, completed)
    {
		const trackedGoal = this.goals.find(x => x.id === goalId);
		if (!trackedGoal)
		{
			const trackedGoal = new TrackedGoal(goalId);
			const goalDay = new GoalDay(day, completed);
			trackedGoal.addGoalDay(goalDay);
		}
		else
		{
			const goalDay = trackedGoal.find(x => x.day === day);
			if (!goalDay)
			{
				trackedGoal.addGoalDay(new GoalDay(day, completed));
			}
			else
			{
				goalDay.setCompleted(completed);
			}
		}
    }
}

