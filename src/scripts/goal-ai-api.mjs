const apiKey = "b0e4337af9msh58c47d67545d9f4p1d2fa4jsnb47ad5943664";//import.meta.env.VITE_API_KEY;
              
console.log(apiKey);
const apiHost = 'chat-gpt26.p.rapidapi.com';
const baseUrl = 'https://chat-gpt26.p.rapidapi.com/';

// export async function getRandomQuoteApi()
// {
//     try{
//         const response = await fetch('/json/random-quote.json');
//         const data = await response.json();
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         console.log(data);
//         return data;
//     }
//     catch(error)
//     {
//         console.error('Unable to load flower image',error);
//     }
// }

//TODO Add this back at the end so I don't use up quote limit
export async function sendContentToChatGPT(content)
{
        const bodyJson = JSON.stringify(
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: content
                    }
                    ]
        }
        );
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost,
                'Content-Type': 'application/json'
            },
            	body: bodyJson
        };
    try
    {
        const response = await fetch(baseUrl, options);
            
        if (response.ok)
        {
            const data = await response.json();
            const answer = data.choices[0].message.content;
            const formattedContent = answer.replace(/\n/g, "<br>");
            console.log(formattedContent);
            return formattedContent;

        }
    }
    catch(error)
    {
        console.log(error);
    }
}