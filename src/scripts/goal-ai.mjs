import { sendContentToChatGPT } from "./goal-ai-api.mjs";
export async function setupGoalAIChat()
{
    document.getElementById("ai-form").addEventListener("submit", function(event) {
        event.preventDefault(); // 🔥 This stops the form from going to a new page
        console.log("Form submitted via JS, not page reload!");
        addMessageToChat();
        // You can handle the form data here instead (e.g., with fetch/AJAX)
      });

}
async function addMessageToChat()
{
    const userInputElement = document.getElementById("ai-question");
    const chatElement = document.getElementById("chat-box");
    if (chatElement && userInputElement)
    {
        let userInput = userInputElement.value;
        createChatMessage(chatElement,userInputElement, userInput, 'chat-user');
        
        //TODO temporary ... while waiting
        await addAnswer(chatElement, userInputElement, userInput);
    }

    // const formData = new FormData(event.target);
    // const userInput = formData.get("ai-question");
}

async function createChatMessage(chatElement, userInputElement, message, className)
{
    const messageDiv = document.createElement("div");
    messageDiv.className =  `${className} chat`;
    messageDiv.innerHTML = message;

    chatElement.appendChild(messageDiv);
    userInputElement.value = "";
    userInputElement.focus();
    //todo add to ai, right now add text
    chatElement.scrollTop = chatElement.scrollHeight;
}
async function addAnswer(chatElement, userInputElement, userInput)
{
    const result = await sendContentToChatGPT(userInput);

    createChatMessage(chatElement, userInputElement, result, 'chat-ai');
}