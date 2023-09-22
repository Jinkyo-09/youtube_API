const frame = document.querySelector('section');

//API 설정
const api_key = 'AIzaSyBzu-DiHzM7s-z6s-Elyy24zf2bBrf6ckk';
const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const pid = 'PL2pfG9YtKxMJVwlAjAIV9TBF5-44WnQ-q';
const num = 5;
const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

fetch(resultURL)
	.then((data) => data.json())
	.then((json) => {
		console.log(json);
		let tags = '';

		json.items.map((data) => {
			tags += `
      <article>
        <h2>${data.snippet.title}</h2>
        <div class='txt'>
          <p>${data.snippet.description}</p>
          <span>${data.snippet.publishedAt}</span>
        </div>
        <div class='pic'>
          <img src='${data.snippet.thumbnails.standard.url}'
      </article>
      `;
		});
		frame.innerHTML = tags;
	});
