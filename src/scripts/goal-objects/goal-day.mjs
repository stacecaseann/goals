export default class GoalDay
{
    constructor(day, completed)
    {
        //int day of the challenge
        this.day = day;
        //bool true or false
        this.completed = completed;
    }
    setCompleted(completed)
    {
        this.completed = completed;
    }
}