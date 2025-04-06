
export async function createTrackedGoalsList()
{
    const goalList = await getGoalsListTemp();
    goalList.markOffGoal(3,1,true);//new goal
    goalList.markOffGoal(2,4,true);//new goal day
    goalList.markOffGoal(1,1,false);//existing goal day


}

async function getGoalsListTemp()
{
    //temporary from file, set from local storage
    try{
        const response = await fetch('/json/goal-tracking-test.json');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(data);
        return data;
    }
    catch(error)
    {
        console.error('Unable to load flower image',error);
    }
}
