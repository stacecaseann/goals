import { getRandomQuoteApi } from "./quote-api.mjs";

export async function getRandomQuote()
{
    const quote = await getRandomQuoteApi();
   
    const quoteTemplate = await createRandomQuoteTemplate(quote);
    return quoteTemplate;    
}

async function createRandomQuoteTemplate(quote)
{
    const text = quote.quote;
    const by = quote.by;
    const flowerImage = await getRandomFlowerIcon();
    return `<p>${text}</p><p>${by}</p>
    <img src="${flowerImage}" class="icon" width="32" height="32" alt="Flower Icon">`;
}

async function getRandomFlowerIcon()
{
    const data = await loadFlowerJson();
    const randomInt = getRandomInt(data.flowers.length);
    const flower = data.flowers[randomInt];
    setAttributionOnFooter(flower.attribution);
    return `/images/flowers/${flower.filename}`;
}
function getRandomInt(length)
{
    const randomInt = Math.floor(Math.random() * (length + 1));
    return randomInt;
}
async function loadFlowerJson()
{
    try{
        const response = await fetch('/json/flower-icons.json');
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

function setAttributionOnFooter(attribution)
{
    const flowerElement = document.getElementById("flowerAttribution");
    if (flowerElement)
    {
        flowerElement.innerHTML = attribution;
    }
}

