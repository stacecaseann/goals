import { setupMenuButton, createNavigation } from './menu.js';
import { populateFooterWithDates } from './footer.js';

export async function loadHeaderFooter()
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
  navigationElement.innerHTML = createNavigation("home");

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