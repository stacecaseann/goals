export default class GoalDay
{
    constructor(day, completed)
    {
        //int day of the challenge
        this.day = day;
        //bool true or false
        this.completed = completed;
    }
    setCompleted()
    {
        if (this.completed)
            this.completed = false;
        else
            this.completed = true;
    }
}