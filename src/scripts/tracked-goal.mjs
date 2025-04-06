export default class TrackedGoal
{
    //this needs the id, and the date and if it has been completed
    constructor(goalId)
    {
        this.goalId = goalId;
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

