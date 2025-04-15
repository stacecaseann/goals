export default class GroupMember
{
    constructor(name, icon, iconAttribution, percent, chat)
    {
        this.name = name;
        this.icon = icon;
        this.iconAttribution = iconAttribution;
        this.percent = percent;
        this.chat = chat;
        this.currentMember = null;

    }
    
    createGroupMember(groupMember)
    {
        const groupMemberDiv = document.createElement('div');
        groupMemberDiv.className = 'group-member';
        const img = document.createElement('img');
        img.src = `images/avatars/${groupMember.icon}`;
        img.alt = `${groupMember.name}`;
        img.height = 64;
        img.width = 64;
        groupMemberDiv.appendChild(img);

        img.addEventListener('click', () => 
        {
            const images = document.querySelectorAll('.group-member img');
            images.forEach(img => img.classList.remove('selected-image'));
            const percentElement = document.getElementById('group-percentage');
            let goalChartElement = document.querySelector('.goal-fill');    

            const isSameImage = (this.currentlySelectedImg === img);
            if(isSameImage)
            {
                this.currentlySelectedImg = null;
                percentElement.classList.remove('open');   
            }
            else            
            {
                goalChartElement.style.width = `${groupMember.percent}%`;
                img.classList.add('selected-image');
                percentElement.classList.add('open');
                this.currentlySelectedImg = img;
            }

        });
        //Set the attribution as iconAttribution
        //percent
        return groupMemberDiv;
    }
}