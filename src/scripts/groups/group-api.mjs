import GroupMember from "./group-member.mjs";

async function getGroupMembersApi()
{
    try{
        const response = await fetch('/json/group-members.json');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(data);
        return Object.values(data.members);
    }
    catch(error)
    {
        console.error('Unable to load member data',error);
    }
}

export async function getGroupMembers()
{
    const jsonData = await getGroupMembersApi();
    const members = jsonData.map(jsonMember => 
    {
        return new GroupMember(jsonMember.name,
            jsonMember.icon, 
            jsonMember.iconAttribution,
            jsonMember.percent,
            Object.values(jsonMember.chat)
        )
    });
    return members;
}