import { loadHeaderFooter, populateRandomQuoteElement } from "../utils.mjs";
import { createReferenceList } from "../books.mjs";

async function initializePage() {
    await loadHeaderFooter('home');
    createReferenceList();
    await populateRandomQuoteElement();
  }

initializePage(); 
