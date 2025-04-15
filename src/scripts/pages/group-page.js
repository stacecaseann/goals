import { loadHeaderFooter, populateRandomQuoteElement } from '../utils.mjs';
import { getGroupMembers } from '../groups/group-api.mjs';

async function setupGroup() {
  const groupMembers = await getGroupMembers();
  const groupMemberElement = document.querySelector('.group-members');
  groupMembers.forEach((member) => {
    const node = member.createGroupMember();
    groupMemberElement.appendChild(node);
  });

  setupGroupChat(groupMembers);
}
function setupGroupChat(groupMembers) {
  document
    .getElementById('chat-form')
    .addEventListener('submit', function (event) {
      event.preventDefault(); // 🔥 This stops the form from going to a new page

      addMessageToChat();
    });
  const userInputElement = document.getElementById('chat-question');
  const chatElement = document.getElementById('chat-box');
  if (chatElement && userInputElement) {
    const messages = [];
    groupMembers.forEach((member) => {
      member.chat.forEach((chat) => {
        messages.push({
          member: member.name,
          message: chat.message,
          date: chat.date,
        });
      });
    });
    messages.sort((a, b) => new Date(a.date) - new Date(b.date));
    messages.forEach((message) => {
      createChatMessage(chatElement, userInputElement, message, 'chat-ai'); //Change
      //TODO could have a color for each person
    });
  }
}

async function addMessageToChat() {
  const userInputElement = document.getElementById('chat-question');
  const chatElement = document.getElementById('chat-box');
  if (chatElement && userInputElement) {
    let userInput = userInputElement.value;
    createMyChatMessage(chatElement, userInputElement, userInput, 'chat-user');
  }
  // const formData = new FormData(event.target);
  // const userInput = formData.get("ai-question");
}
function createMyChatMessage(
  chatElement,
  userInputElement,
  message,
  className
) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `${className} chat`;
  messageDiv.innerHTML = message;

  chatElement.appendChild(messageDiv);
  userInputElement.value = '';
  userInputElement.focus();
  //todo add to ai, right now add text
  chatElement.scrollTop = chatElement.scrollHeight;
}
function createChatMessage(
  chatElement,
  userInputElement,
  chatMessage,
  className
) {
  const senderDiv = document.createElement('div');
  senderDiv.className = 'sender-name';
  senderDiv.textContent = chatMessage.member;

  const messageDiv = document.createElement('div');
  messageDiv.className = `${className} group-chat`;
  messageDiv.textContent = chatMessage.message;
  chatElement.appendChild(senderDiv);
  chatElement.appendChild(messageDiv);
  userInputElement.value = '';
  userInputElement.focus();
  //todo add to ai, right now add text
  chatElement.scrollTop = chatElement.scrollHeight;
}
async function initializePage() {
  await loadHeaderFooter('group');
  await setupGroup();
  await populateRandomQuoteElement();
}

initializePage();
