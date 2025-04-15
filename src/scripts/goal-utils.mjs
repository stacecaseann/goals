import Goal from "./goal-objects/goal.mjs";
// export async function createTrackedGoalsList()
// {
//     const goalList = await getGoalsListTemp();
//     goalList.markOffGoal(3,1,true);//new goal
//     goalList.markOffGoal(2,4,true);//new goal day
//     goalList.markOffGoal(1,1,false);//existing goal day
// }

export async function getGoalsTemp()
{
    //temporary from file, set from local storage
    try{
        const response = await fetch('/json/goals-test.json');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(data);
        const goalsArray = data.goals.map(goal => new Goal(goal.goalName));
        console.log(goalsArray);
        return goalsArray;
    }
    catch(error)
    {
        console.error('Unable to goals',error);
    }
}

// export function setGoalsToStorage()
// {

// }

// export function getGoalsFromStorage()
// {
//     const goalStorage = window.localStorage.getItem('goals');
//     const goalsArray = goalStorage.

// }