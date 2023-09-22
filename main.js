const frame = document.querySelector('section');
const tit_len = 30;

//API 설정
const api_key = 'AIzaSyBzu-DiHzM7s-z6s-Elyy24zf2bBrf6ckk';
const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const pid = 'PL2pfG9YtKxMJVwlAjAIV9TBF5-44WnQ-q';
const num = 5;
const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

//일정 글자수 이살일때 글자 자르고 말줄임표 붙이기
//문자열.substr(시작위치,자를글자수)

//beef-lettuce-tomato --> Beef Lettuce Tomato
let text = 'beef-lettuce-tomato';
text = text
	.split('-') //기존 문자열에서 -를 기준으로 분리
	.map((el) => el.charAt(0).toUpperCase() + el.slice(1)) //분리된 문자값을 반복돌면서 첫번째 글자만 대문자변경+첫번째를 제외한 나머지 문자를 이어붙힘 (각 단어의 첫글자만 대문자로 변경되서 배열로 변환)
	.join(' '); //첫글자만 대문자로 변경된 단어들을 다시 빈칸으로 이어붙이기
console.log(text);

fetch(resultURL)
	.then((data) => data.json())
	.then((json) => {
		console.log(json);
		let tags = '';

		json.items.map((data) => {
			let desc = data.snippet.description;
			desc.length > 120 ? (desc = desc.substr(0, 120) + '...') : desc;

			//날짜값 가공
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
      </article>
      `;
		});
		frame.innerHTML = tags;
	});
