export default class Goal{
    constructor(name)
    {
        //this.id = id; TODO Could add id
        this.name = name;
    }
    init() {
        //this.list = getLocalStorage('so-cart');
        //this.calculateItemSummary();
    }
    saveGoal()
    {
        let goals = Goal.getGoalsFromStorage();
        goals.push(this);
        Goal.saveGoalsToStorage(goals);
    }
    static getGoalsFromStorage()
    {
        const goals = localStorage.getItem('goals');
        if (goals) {
            // Parse the JSON string and return an array of Goal objects
            return JSON.parse(goals).map(goalData => new Goal(goalData.name));
        }
        return [];
    }
    static saveGoalsToStorage(goals)
    {
        localStorage.setItem('goals', JSON.stringify(goals));  // Save as JSON string
    }
}