const items =
[
    { key: "home", url:"index.html", description:"Home"},
    { key: "goals", url:"goals.html", description: "How to Set Goals"},
    { key: "setup-goals", url:"setup-goals.html", description: "Setup Goals"},
    { key: "challenge", url:"challenge.html", description: "Challenge"},
    { key: "group", url:"group.html", description: "Group"}
];
export function createNavigation(active)
{
    let html = "<ul>"
    const htmlString = items.map(item => createListItem(item, active));
    html += htmlString.join("");
    html += "</ul>";
    return html;
}

function createListItem(item, active)
{
    const activeClass = item.key == active ? ` class="active"` : "";
    return `<li><a href="${item.url}"${activeClass}>${item.description}</a></li>`;
}
export function setupMenuButton()
{
    const menuButton = document.querySelector("#menu");
    const navigation = document.querySelector("#navigation");

    menuButton.addEventListener('click', () => 
    {
        menuButton.classList.toggle('open');
        navigation.classList.toggle('open');
    });

}
