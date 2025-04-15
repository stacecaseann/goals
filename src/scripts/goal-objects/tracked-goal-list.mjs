import Goal from "./goal.mjs";
import GoalDay from "./goal-day.mjs";
import TrackedGoal from "./tracked-goal.mjs";
import { days } from "../constants.mjs";
import showConfetti from "./confetti.mjs";
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
		this.currentDay = 1;
		//Set up test data
		this.goals = goalList.map((goal) => {
			const trackedGoal = new TrackedGoal(goal, []);
			const goalDay = new GoalDay(1,false);
			trackedGoal.addGoalDay(goalDay);
			
			return trackedGoal;
		});
		
	}
	//this would be called each day that you got on and the day was different than the day before
	//now it's just a test to add a day to each goal
	addDay()
	{
		if (this.currentDay === 21)
		{
			console.log('no more days to add');
		}
		let maxDays = 0;
		this.currentDay +=1;
		if (this.goals.length > 0)
		{
			maxDays = this.goals[0].days.length;
		}
		if (this.currentDay > maxDays)
		{
			this.goals.map( (goal) => 
			{
				const newGoalDay = new GoalDay(this.currentDay, false);
				goal.addGoalDay(newGoalDay);			
			});
			//now refresh the goals 
			const goalCardElement = document.getElementById('goal-details');
			if (goalCardElement)
			{
				const goalDialog = document.querySelector("#goal-dialog");
				goalCardElement.replaceChildren(this.createGoalListTemplate(goalDialog));
			}
			TrackedGoalList.saveTrackedGoalsToStorage(this);
		}
		this.calculateTotalPercent();
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
				const goalDays = jsonGoal.days.map(jsonDay => new GoalDay(jsonDay.day, jsonDay.completed));

				return new TrackedGoal(goal, goalDays);
			}
			);
			if (jsonData.currentDay)
				trackedGoalList.currentDay = jsonData.currentDay;
			else
				trackedGoalList.currentDay = 1;
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
	calculateTotalPercent()
	{
		const totalNumber = this.currentDay * this.goals.length;
		console.log(totalNumber);
		const totalComplete = this.goals.reduce( (sum, goal) => 
		{
			return sum + goal.days.filter(day => day.completed).length;
		},0);
		console.log(totalComplete);
		let goalChartElement = document.querySelector('.goal-fill');
        if (totalNumber !== 0)
        {
			const percent = totalComplete/totalNumber * 100;
            goalChartElement.style.width =  `${percent}%`;
			if (percent === 100)
			{
				showConfetti();
			}
        }
		
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
			div.id = trackedGoal.goal.name;
			div.appendChild(this.createGoalCardDetails(trackedGoal));
			div.addEventListener('click', () => this.showGoalDialog(trackedGoal, goalDialog));

			return div;
		});
		goalCards.forEach(card => fragment.appendChild(card));
		return fragment;
	}
	createGoalCardDetails(trackedGoal)
	{
		const fragment = document.createDocumentFragment();
		const h3 = document.createElement('h3');
		h3.textContent = trackedGoal.goal.name;
		fragment.appendChild(h3);
		const cardDiv = document.createElement('div');
		cardDiv.classList = 'goal-card-days';
		const goalDayButtons = trackedGoal.days
		.slice(-7).map(goalDay => 
		{
			return this.getGoalDayButton(trackedGoal.goal.name, goalDay);
		}
		);
		goalDayButtons.forEach(button => cardDiv.appendChild(button));
		
		const placeholderGoals = [];
		for (let i=0; i < 7- trackedGoal.days.length; i++)
		{
			placeholderGoals.push(this.getPlaceholderGoalDayButton());
		}
		placeholderGoals.forEach(button => cardDiv.appendChild(button));
		fragment.appendChild(cardDiv);
		return fragment;
	}
	getGoalDayButton(goalName, goalDay)
	{
		const dayOfWeek = this.getDayOfWeek(goalDay.day);
		const goalButton = document.createElement('button');
		goalButton.classList.add('day-button');
		if (goalDay.completed)
		{
			goalButton.classList.add('selected');
		}
		const buttonId = `${goalName}~${goalDay.day}`
		goalButton.id = buttonId;
		goalButton.type = 'submit';
		goalButton.name = buttonId;
		goalButton.value = `${goalName}~${goalDay.day}`;
		goalButton.textContent = dayOfWeek;

		goalButton.addEventListener('submit', (event) =>
		{
			event.preventDefault();
		});
		goalButton.addEventListener('click', (event) => 
		{
			//this stops the parent div's click to be called here
			event.stopPropagation();
			goalButton.classList.toggle('selected');
			goalDay.setCompleted();
			TrackedGoalList.saveTrackedGoalsToStorage(this);
			//update the goal completed.
			this.calculateTotalPercent();
		});
		return goalButton;
	}
	getPlaceholderGoalDayButton()
	{
		const goalButton = document.createElement('button');
		goalButton.classList.add('day-button');
		goalButton.classList.add('placeholder');
		
		return goalButton;
	}
	//Pass in int day and get the day of week of the challenge
	//Assume for now it starts on a monday
	getDayOfWeek(day)
	{
		//the day will start at 1, so i want to get the array of day-1
		let currentDay = day-1%7;
		while(currentDay >= 7)
		{
			currentDay = currentDay - 7;
		}
		//if currentday > 7, divide by 7
		return days[currentDay];
	}
	//this sends in a tracked goal
	showGoalDialog(trackedGoal, goalDialog)
	{
		try{
			const title = goalDialog.querySelector("h2");
			title.textContent = trackedGoal.goal.name;
			let divElement = document.querySelector("#goal-details-modal");
			const goalDiv = this.createGoalDialogDetails(trackedGoal);			
			divElement.className="goal-details-modal";
			divElement.replaceChildren(goalDiv);
			goalDialog.showModal();
		}catch(error){
			console.log(error);
		}
	}
	createGoalDialogDetails(trackedGoal)
	{
		const fragment = document.createDocumentFragment();
		const goalDayButtons = trackedGoal.days
		.map(goalDay => 
		{
			return this.getGoalDayButton(trackedGoal.goal.name, goalDay);
		}
		);
		goalDayButtons.forEach(button => fragment.appendChild(button));
		return fragment;
	}

}
