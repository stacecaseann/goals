import TrackedGoalList from "../goal-objects/tracked-goal-list.mjs";
import { loadHeaderFooter } from "../utils.mjs";
import { populateRandomQuoteElement } from "../utils.mjs";

//TODO move this out of here
function setupGoalCards()
{
    let trackedGoalList = TrackedGoalList.getTrackedGoalListFromStorage();

    //Keep this here
    const goalDialog = document.querySelector("#goal-dialog");
    const goalCloseButton = document.querySelector("#goal-dialog button");
    goalCloseButton.addEventListener("click", () => 
        {
            const goal = goalDialog.querySelector('h2');
            const goalCard = document.getElementById(goal.textContent);
            const trackedGoal = trackedGoalList.goals.find(x => x.goal.name == goal.textContent);
            const goalDetails = trackedGoalList.createGoalCardDetails(trackedGoal)
            goalCard.replaceChildren(goalDetails);
            goalDialog.close();            

        });
    
    const goalCardElement = document.getElementById('goal-details');

    goalCardElement.appendChild(trackedGoalList.createGoalListTemplate(goalDialog));
    
    //Add a button that will let you add a day to test how the challenge would work
    const testAddButton = document.getElementById('add-goal-day');
    testAddButton.addEventListener('click', () => 
    {
        trackedGoalList.addDay();    
    });

    //Add a button that will let you add a day to test how the challenge would work
    const resetButton = document.getElementById('reset-goals');
    resetButton.addEventListener('click', () => 
    {
        localStorage.removeItem('tracked-goals');
        trackedGoalList = TrackedGoalList.getTrackedGoalListFromStorage();
        goalCardElement.replaceChildren(trackedGoalList.createGoalListTemplate(goalDialog));

        TrackedGoalList.saveTrackedGoalsToStorage(trackedGoalList);
        trackedGoalList.calculateTotalPercent();
    });
    trackedGoalList.calculateTotalPercent();
}

async function initializePage() {
    await loadHeaderFooter('challenge');
    setupGoalCards();
    populateRandomQuoteElement();
  }

initializePage(); 
