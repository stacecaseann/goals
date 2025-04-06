export async function createReferenceList()
{
    const element = document.getElementById('resources');
    const booksJson = await loadBooks();
    const bookHtml = booksJson.books.map(
        (book) => createBookTemplate(book)
    );
    element.innerHTML = bookHtml.join("");
}

async function loadBooks()
{
    try{
        const response = await fetch('/json/books.json');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(data);
        return data;
    }
    catch(error)
    {
        console.error('Unable to load books',error);
    }
}

function createBookTemplate(book)
{
    return `<p>${book.title}</p>
    <p>${book.author}</p>
    <p>${book.synopsis}</p>
    <img src="/images/books/${book.image}" class="icon" width="32" height="32" alt="Flower Icon">
    `;
       
}