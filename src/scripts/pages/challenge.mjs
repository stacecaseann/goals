import TrackedGoalList from "../goal-objects/tracked-goal-list.mjs";

//TODO move this out of here
function setupGoalCards()
{
    const trackedGoalList = TrackedGoalList.getTrackedGoalListFromStorage();


    //Keep this here
    const goalDialog = document.querySelector("#goal-dialog");
    const goalCloseButton = document.querySelector("#goal-dialog button");
    goalCloseButton.addEventListener("click", () => goalDialog.close());
    
    const goalCardElement = document.getElementById('goal-details');
    goalCardElement.appendChild(trackedGoalList.createGoalListTemplate(goalDialog));
    
}


setupGoalCards();
