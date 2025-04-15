export default class TrackedGoal
{
    //this needs the id, and the date and if it has been completed
    constructor(goal, goalDays)
    {
        //Goal class
        this.goal = goal;
        //GoalDay class
        if (goalDays)
            this.days = goalDays;
        else
            this.days = [];
        
    }

    init()
    {
        //set from storage
    }
    addGoalDay(goalDay)
    {
        this.days.push(goalDay);
    }
}

