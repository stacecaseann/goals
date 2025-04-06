const apiKey = 'b0e4337af9msh58c47d67545d9f4p1d2fa4jsnb47ad5943664';//import.meta.env.VITE_QUOTE_API_KEY;
const apiHost = 'pquotes.p.rapidapi.com';
const baseUrl = 'https://pquotes.p.rapidapi.com/api/quote';

export async function getRandomQuoteApi()
{
    try{
        const response = await fetch('/json/random-quote.json');
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
//TODO Add this back at the end so I don't use up quote limit
export async function getRandomQuoteApiOLD()
{
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ topic: 'motivation' })
        };
    try
    {
        const response = await fetch(baseUrl, options);
            
        if (response.ok)
        {
            const data = await response.json();
            console.log(data);
            return data;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}