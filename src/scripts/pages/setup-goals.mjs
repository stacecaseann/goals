import { loadHeaderFooter } from "../utils.mjs";
import { WeekButtons } from "../week-utils.mjs";
import { createTrackedGoalsList, getGoalsTemp } from "../goal-utils.mjs";
import Goal from "../goal-objects/goal.mjs";

loadHeaderFooter();
setupGoalForm();

function setupGoalForm()
{
    loadExistingGoals();
    //add listeners to goal button
    const addGoalButton = document.getElementById("add-goal-button");
    const goalContainer = document.getElementById('goal-container');
    if (addGoalButton && goalContainer)
    {
        addGoalButton.addEventListener('click', () => 
        {
            //get the last element and take off the hidden X
            let goalInputs = document.querySelectorAll('input[name="enter-goal"]');
            //We need to remove the hidden X every time a new goal i s added 
            let lastGoalInput = goalInputs[goalInputs.length-1];            
            if (lastGoalInput)
            {
                const parentDiv = lastGoalInput.parentElement;
                const button = parentDiv.querySelector('button');
                button.classList.toggle('hidden');
            }

            //This is the last element added each time you press Add
            const input = createGoalInput(null, true);     
            // const input = document.createElement('input');
            // input.text = 'text';
            // input.name = 'enter-goal';
            // input.placeholder = 'Enter a goal';
            goalContainer.appendChild(input);
            goalInputs = document.querySelectorAll('input[name="enter-goal"]');
            //We need to remove the hidden X every time a new goal i s added 
            lastGoalInput = goalInputs[goalInputs.length-1];            
            if (lastGoalInput)
            {
                lastGoalInput.focus();
            }
        })
    }
    //Add listener to submit the form
    createSubmitButtonListener();

}
function createSubmitButtonListener()//TODO move outside of here
{
    //This will save all of the goals to storage
    document.getElementById('setup-form').addEventListener('submit', (event) => 
    {
        event.preventDefault();
        const goalInputs = document.querySelectorAll('input[name="enter-goal"]');
        let goals = [];
        goalInputs.forEach(input => {
            const goalText = input.value.trim();
            if (goalText) {
                const goal = new Goal(goalText);
                goals.push(goal);
            }
        });
        Goal.saveGoalsToStorage(goals);

    });
}

function loadExistingGoals()
{
    const goals = Goal.getGoalsFromStorage();
    const goalContainer = document.getElementById('goal-container');
    goals.forEach((goal) => {
        const div = createGoalInput(goal.name, false);
        goalContainer.appendChild(div);
    });
    //This creates the last input
    const input = createGoalInput(null, true);
    // const input = document.createElement('input');
    // input.type = 'text';
    // input.id = 'last-goal-field';
    // input.name = 'enter-goal';
    // input.placeholder = 'Enter a goal';
    goalContainer.appendChild(input);

    //Add event listeners to each button
    const buttons = document.querySelectorAll("#goal-container button");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const parentDiv = this.parentElement;
            parentDiv.remove();
        });
    });
}

function createGoalInput(goalText, newGoal)
{
    const div = document.createElement('div');  
    const input = document.createElement('input');
    if (goalText)
    {
        input.value = `${goalText}`;
    }
    input.name = 'enter-goal';
    div.appendChild(input);
    const button = document.createElement('button');
    button.type='button';
    button.className='delete-button';
    if (newGoal)
        button.classList.add("hidden");
    button.textContent='X';
    div.appendChild(button);
    button.addEventListener('click', () => 
    {
        div.remove();
    });
    return div;
}
    // document.getElementById("setup-form").addEventListener("submit", function(event) {
    //     event.preventDefault(); 
    //     console.log("Form submitted via JS, not page reload!");
    //     const formData = new FormData(event.target);
    //     const formObject = {};
    //     formData.forEach((value, key) => {
    //         formObject[key] = value;
    //     });
    
    //     console.log(formObject); 
    //     console.log(formObject['enter-goal']);
    //     const goalText = formObject['enter-goal'];
    //     const goal = new Goal(goalText);
    //     goal.saveGoal();

    //     // You can handle the form data here instead (e.g., with fetch/AJAX)
    //     });

// function createAddGoalTemplate()
// {
//     <form id="setup-form" class="setup-form">
//     <fieldset>
//         <input type="text" name="enter-goal" id="enter-goal"></input>
//         <div id="print-days"></div>                        
//         <input type="submit" value="Add"></input>
//     </fieldset>
// </form>  
// }

// const goalsTemp = getGoalsTemp();

// const weekButtons = new WeekButtons(0);
// weekButtons.setupWeekButtons();




//1. Create a way to enter these goals - on setup page, save to storage after every goal added?
//2. Once the goals are setup, initialize the goal list 
//      a. Add day one for every goal
//      b. add a temp button that adds a goal and initializes each day
//3. Save the list to storage look at goal-tracking-test.json for information
//      a. need a way to save and retrieve the list
//4. Need a function that will take a day that exists (Or any day) and add complete or not
//5. Show last 7 days of each day
//    a. each card should be a goal like recipe,with modal
//6. Check or uncheck the goals - start gray, check is green
//7. Modal for when I click on the goal name, it will show the history of the entire challenge
//const goalListTemp = getGoalListTemp();
//createTrackedGoalsList();

