export async function fetchNews() {
  const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=e69e125b72c84e71bb400dc2fcca1225`);

  if (res.status === 200) {
    const data = await res.json();
    return data.articles || [];
  } else {
    console.log('Error Fetching news');
    return [];
  }
}


export async function fetchNewsByName(name) {
  // Fixed URL by removing trailing slash
  const res = await fetch(`https://newsapi.org/v2/everything?q=${name}&sortBy=popularity&apiKey=e69e125b72c84e71bb400dc2fcca1225`);

  if (res.status === 200) {
    const data = await res.json();
    return data.articles || [];
  } else {
    console.log('Error Fetching news by name:', name);
    return null;
  }
}