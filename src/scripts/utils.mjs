import { setupMenuButton, createNavigation } from './menu.js';
import { populateFooterWithDates } from './footer.mjs';
import { getRandomQuote } from './quote.mjs';

export async function loadHeaderFooter(page)
{
  const headerPath = 'partials/header.html';
  const footerPath = 'partials/footer.html';

  const headerTemplate = await loadTemplate(headerPath);
  const footerTemplate = await loadTemplate(footerPath);

  const headerElement = document.querySelector('.main-header');
  const footerElement = document.querySelector('.main-footer');
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  setupMenuButton();
  populateFooterWithDates();

  const navigationElement = document.querySelector("#navigation");
  navigationElement.innerHTML = createNavigation(page);

}

async function loadTemplate(path){
    const results = await fetch(path);
    const template = await results.text();
    return template;
  }

  function renderWithTemplate(
    template, 
    parentElement,
    data,
    callback)
  {
     //var html = productList.map((product) => productCardTemplate(product));
      parentElement.innerHTML = template;
      if (callback)
      {
        callback(data);
      }
  }

  export async function populateRandomQuoteElement()
  {
    const quoteElement = document.getElementById("random-quote");
    if (quoteElement)
    {
      const quoteTemplate = await getRandomQuote();
      quoteElement.innerHTML = quoteTemplate;
    }

  }