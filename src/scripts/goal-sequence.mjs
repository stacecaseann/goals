export default class GoalSequence{
    constructor()
    {
        this.sequence = 1;        
    }
    static getInstance(){
        if (!GoalSequence.instance)
        {
            GoalSequence.instance = new GoalSequence();
        }
        return GoalSequence.instance;
    }
    getNewSequence()
    {
        this.sequence = this.sequence += 1;
    }
}