// Function to create and append HTML elements
function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (text) element.textContent = text;
  return element;
}

// Function to fetch brewery data
async function fetchBreweries() {
  try {
    const response = await fetch('https://api.openbrewerydb.org/breweries');
    if (!response.ok) {
      throw new Error('Failed to fetch breweries');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Function to display breweries
function displayBreweries(breweries) {
  const breweriesList = document.getElementById('breweriesList');
  breweriesList.innerHTML = '';

  breweries.forEach((brewery) => {
    const name = createElement('li', 'brewery-name', brewery.name);
    const type = createElement('li', 'brewery-type', `Type: ${brewery.brewery_type}`);
    const address = createElement('li', 'brewery-address', `Address: ${brewery.street}, ${brewery.city}, ${brewery.state}`);
    const website = createElement('li', 'brewery-website', `Website: ${brewery.website_url}`);
    const phone = createElement('li', 'brewery-phone', `Phone: ${brewery.phone}`);

    const breweryItem = createElement('ul', 'brewery-item');
    breweryItem.append(name, type, address, website, phone);

    breweriesList.appendChild(breweryItem);
  });
}

// Function to filter breweries based on search input
function filterBreweries(breweries, searchText) {
  return breweries.filter((brewery) =>
    brewery.name.toLowerCase().includes(searchText.toLowerCase())
  );
}

// Function to handle search input changes
async function handleSearchInput() {
  const searchInput = document.getElementById('searchInput');
  const searchText = searchInput.value;
  const breweries = await fetchBreweries();
  const filteredBreweries = filterBreweries(breweries, searchText);
  displayBreweries(filteredBreweries);
}

// Add event listener for search input changes
document.getElementById('searchInput').addEventListener('input', handleSearchInput);

// Initial display of breweries
fetchBreweries().then(displayBreweries).catch(console.error);
