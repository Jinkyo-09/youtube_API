//유튜브 접근 API
const api_key = 'AIzaSyBzu-DiHzM7s-z6s-Elyy24zf2bBrf6ckk';
const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const pid = 'PL2pfG9YtKxMJVwlAjAIV9TBF5-44WnQ-q';
const num = 4;
const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

fetch(resultURL)
	.then((data) => data.json())
	.then((json) => {
		console.log(json);
	});
