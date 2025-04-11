import Goal from "./goal.mjs";
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
	
	init()
	{
		const goalList = Goal.getGoalsFromStorage();
		this.goals = goalList.map((goal) => {
			const trackedGoal = new TrackedGoal(goal, []);
			const goalDay = new GoalDay(1, false);
			trackedGoal.addGoalDay(goalDay);
			return trackedGoal;
		});
		
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
	static getTrackedGoalListFromStorage()
	{
		
		const goalListObject = localStorage.getItem('tracked-goals');
		if (goalListObject)
		{
			const jsonData = JSON.parse(goalListObject);
			const trackedGoalList = new TrackedGoalList();
			trackedGoalList.goals = jsonData.goals.map(jsonGoal => 
			{
				const goal = new Goal(jsonGoal.goal.name);
				const goalDays = jsonGoal.goalDays.map(jsonDay => new GoalDay(jsonDay.day, jsonDay.completed));

				return new TrackedGoal(goal, goalDays);
			}
			);
			return trackedGoalList;
		}

		const trackedGoalList = new TrackedGoalList();
		trackedGoalList.init();
		return trackedGoalList;
	}
	static saveTrackedGoalsToStorage(goalList)
	{
		localStorage.setItem('tracked-goals', JSON.stringify(goalList));		
	}
	createGoalListTemplate(goalDialog)
	{
		console.log('this.goals =', this.goals);
		if (Array.isArray(this.goals)) {
		console.log('here');
		}
		const fragment = document.createDocumentFragment();

		const goalCards = this.goals.map(trackedGoal => 
		{
			const div = document.createElement('div');
			div.className = 'goal-card';
			const h3 = document.createElement('h3');
			h3.textContent = trackedGoal.goal.name;
			div.appendChild(h3);
			div.addEventListener('click', () => showGoalDialog(trackedGoal, goalDialog));
			return div;
		});
		goalCards.forEach(card => fragment.appendChild(card));
		return fragment;
		// for (const trackedGoal of this.goals)
		// {
		// 	const div = document.createElement('div');
		// 	div.className = 'goal-card';
		// 	const h3 = document.createElement('h3');
		// 	h3.textContent = trackedGoal.goal.name;
		// 	div.appendChild(h3);
		// 	div.addEventListener('click', () => showGoalDialog(trackedGoal, goalDialog));
			
		// }
		// const goalTemplateHtml = this.goals.map(trackedGoal => 
		// {
		// 	const div = document.createElement('div');
		// 	const 

		// })
	}
	//this sends in a tracked goal
	showGoalDialog(trackedGoal, goalDialog)
	{
		try{
			const title = goalDialog.querySelector("h2");
			title.textContent = trackedGoal.goal.name;
			let divElement = document.querySelector("#goal-details-modal");
			const goalHtml = trackedGoal.createGoalDetailsHtml();
			divElement.className="goal-details-modal";
			divElement.innerHTML = goalHtml;
			goalDialog.showModal();
		}catch(error){
			console.log(error);
		}
	}
}
