const frame = document.querySelector('section');
const tit_len = 30;

//API 설정
const api_key = 'AIzaSyBzu-DiHzM7s-z6s-Elyy24zf2bBrf6ckk';
const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const pid = 'PL2pfG9YtKxMJVwlAjAIV9TBF5-44WnQ-q';
const num = 5;
const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

//이벤트 위임 (event delegation)
//동적으로 생성되는 요소에 이벤트 연결이 불가, 이벤트 연결 시점에는 해당 돔이 생성되지 않았기 때문
//항상 존재하는 body요소에 이벤트를 위임해서 추후 동적 dom이 생성되면 이벤트를 전달받도록 처리

window.addEventListener('click', (e) => {
	//e.currentTarget : 이벤트가 연결되어있는 선택자를 반환
	//e.target : 실제화면상에서 이벤트가 발생한 요소를 반환
	if (e.target.nodeName === 'IMG') {
		console.log('You clicked Pic');
	}
});

fetch(resultURL)
	.then((data) => data.json())
	.then((json) => {
		console.log(json);
		let tags = '';

		json.items.map((data) => {
			let desc = data.snippet.description;
			desc.length > 120 ? (desc = desc.substr(0, 120) + '...') : desc;

			let date = data.snippet.publishedAt.split('T')[0];
			date = date.split('-').join('.');

			tags += `
      <article>
        <h2>${
					data.snippet.title.length > tit_len
						? data.snippet.title.substr(0, tit_len) + '...'
						: data.snippet.title
				}</h2>
        <div class='txt'>
          <p>${desc}</p>
          <span>${date}</span>
        </div>
        <div class='pic'>
          <img src='${data.snippet.thumbnails.standard.url}'
        </div>
      </article>
      `;
		});
		frame.innerHTML = tags;
	});
