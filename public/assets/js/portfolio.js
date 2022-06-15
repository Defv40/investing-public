const logoutButton = document.querySelector('.logout-button');
const portfolioCost = document.querySelector('#portfolio_cost');
const portfolioContent = document.querySelector('#portfolio_content');
const updateModal = document.querySelector('#update_modal');
const searchInput = document.querySelector('#search_input');
const searchResultBlock = document.querySelector('#search_result');
const closeModalButton = document.querySelector('#close_modal');
const updateButton = document.querySelector('#update_button');
const removeButton = document.querySelector('#remove_button');
const closeUpdateModalButton = document.querySelector('#close_updateModal');
const modal = document.querySelector('#crypto_modal');
const addButton = document.querySelector('#add_button');
const updateModalCryptocurrencyAmount = document.querySelector('#updateCryptocurrency_amount');
const dropdownBlock = document.querySelector('#nav_username');
const dropdownButton = document.querySelector('#dropdown_button');
const dropdownMenu = document.querySelector('#dropdown_menu');
const username = document.querySelector('#username');
const preloader = document.querySelector('.preloader');
let summ = 0;

dropdownBlock.addEventListener('click', (event) => {
	event.preventDefault();
	if (dropdownButton.style.transform != 'rotate(0deg)') {
		dropdownButton.style.transform = 'rotate(0deg)';
		dropdownMenu.style.display = 'flex';
		dropdownMenu.style.animation = 'dropdown 0.6s linear';
		dropdownMenu.style.transform = 'translateY(3em)';
		dropdownMenu.style.opacity = '1';
	} else {
		dropdownButton.style.transform = 'rotate(90deg)';
		dropdownMenu.style.animation = 'dropup 0.3s linear';
		dropdownMenu.style.opacity = '0';
		setTimeout((event) => {
			dropdownMenu.style.display = 'none';
		}, 800);
		
	}
})

window.onload = (event) => {
	fetch('https://investing-portfolios.netlify.app/api/getLogin', {
		method: 'GET',
	})
	.then((response) => response.json())
	.then((data) => {
		username.textContent = data.login;
	})
	portfolioCost.textContent = '0';
	fetch('https://investing-portfolios.netlify.app/api/portfolio', {
		method: 'GET',
	})
	.then((response) => response.json())
	.then((data) => {
		getActives(data['id']);
	})
}

function getActives(portfolioId){
	fetch('https://investing-portfolios.netlify.app/api/showCryptocurrency', {
		method: 'POST',
		body: JSON.stringify({'portfolio_id': portfolioId}),
		headers: {
			'Content-Type': 'application/json; charset="UTF-8"',
		},
	})
	.then((response) => response.json())
	.then((data) => {
			showCryptocurrency(data);
	})
}

function showCryptocurrency(CryptocurrencyInfo){
	if (CryptocurrencyInfo.length == 0) {
		preloader.style.display = 'none';
		portfolioContent.innerHTML += `
			<div class="no__actives">
				<p>В вашем портфеле нет активов</p>
			</div>
		`;
	}
	preloader.style.display = 'none';
	for (key in CryptocurrencyInfo) {
		portfolioContent.innerHTML += `
			<div class="portfolio__crypto">
				<div class="portfolio__crypto-logo">
					<img src="../assets/images/crypto/Solana.png" alt="Cryptocurrency logo">
				</div>
				<div class="portfolio__crypto-info">
					<p class="crypto__name">${CryptocurrencyInfo[key].name}</p>
					<p class="crypto__amount" data-uniq-id="${CryptocurrencyInfo[key].unique_id}">${CryptocurrencyInfo[key].amount} шт.</p>
				</div>
				<div class="portfolio__crypto-cost">
					<p class="crypto__cost" data-uniq-id="${CryptocurrencyInfo[key].unique_id}">Прогружаем...</p>
				</div>
			</div>
		`;
	}
	setUpdateCall();
	getCryptocurrencyCost(CryptocurrencyInfo);
}

function getCryptocurrencyCost(CryptocurrencyInfo){

	let ws = new WebSocket('wss://stream.binance.com/stream');

	ws.onopen = (event) => {
		for (key in CryptocurrencyInfo) {
			ws.send(CryptocurrencyInfo[key].request_link);
		}
	}


	ws.onmessage = (event) => {
		if ((JSON.parse(event?.data)?.data?.p) && (JSON.parse(event.data).data.p != undefined))
		{
			summ = 0
			let binanceUniqueId = JSON.parse(event.data).data.s.toLowerCase();
			let CryptocurrencyAmount = document.querySelector(`p.crypto__amount[data-uniq-id="${binanceUniqueId.replace('usdt', '')}"]`).textContent;
			let activeSum = (+JSON.parse(event.data).data.p) * (+(CryptocurrencyAmount.replace(' шт.', '')));

			activeSum = activeSum.toFixed(7);

			document.querySelector(`p.crypto__cost[data-uniq-id="${binanceUniqueId.replace('usdt', '')}"]`).textContent = `${activeSum.replace(/(0{1}$)|(0{2}$)|(0{3}$)|(0{4}$)|(0{5}$)/g, '')} $`;

			let costs = document.querySelectorAll(`p.crypto__cost`);

			costs.forEach(function callback(element, index) {
				summ += +(element.textContent.replace(' $', ''));
			});
			summ = summ.toFixed(7);
			portfolioCost.textContent = `${summ.replace(/(0{1}$)|(0{2}$)|(0{3}$)|(0{4}$)|(0{5}$)/g, '')} $`;
		}
	}
}

function setUpdateCall(cryptocurrencyUniqueId){
	let cryptocurrencyList = document.getElementsByClassName('portfolio__crypto');
	for (let element of cryptocurrencyList) {
		element.addEventListener('click', (event) => {
			updateModal.style.display = 'flex';
			let cryptocurrencyName = event.target.querySelector('.crypto__name').textContent;
			let cryptocurrencyAmount = event.target.querySelector('.crypto__amount').textContent.replace(' шт.', '');
			const cryptocurrencyModalName = document.querySelector('#updateModal__cryptocurrency-name');
			cryptocurrencyModalName.textContent = cryptocurrencyName;
			updateModalCryptocurrencyAmount.value = +cryptocurrencyAmount;
			updateModalCryptocurrencyAmount.focus();
			updateModalCryptocurrencyAmount.select();
			updateModalCryptocurrencyAmount.addEventListener('click', (event) => {
				updateModalCryptocurrencyAmount.select();
			});
			updateCryptocurrencyAmount(event.target.querySelector('.crypto__amount').getAttribute('data-uniq-id'));
			removeCryptocurrency(event.target.querySelector('.crypto__amount').getAttribute('data-uniq-id'));
		});
	}
}

function updateCryptocurrencyAmount(cryptocurrencyUniqueId) {
	updateButton.addEventListener('click', (event) => {
		event.preventDefault();
		fetch('https://investing-portfolios.netlify.app/api/updateActive', {
			method: 'POST',
			body: JSON.stringify({
				cryptocurrencyUniqueId: cryptocurrencyUniqueId,
				cryptocurrencyAmount: updateModalCryptocurrencyAmount.value
			}),
			headers: {
				'Content-Type': 'application/json; charset="UTF-8"',
			},
		})
		.then((response) => {
			response.json();
			if (response.ok) {
				document.querySelector('#update_form').innerHTML = `
				<div class="form__success-action">
					<p>Успешно обновлено</p>
				</div>
				`;
				setTimeout(location.reload(), 2000);
			}
		})
	})
}

function removeCryptocurrency(cryptocurrencyUniqueId) {
	removeButton.addEventListener('click', (event) => {
		event.preventDefault();
		fetch('https://investing-portfolios.netlify.app/api/removeActive', {
			method: 'POST',
			body: JSON.stringify({
				cryptocurrencyUniqueId: cryptocurrencyUniqueId,
			}),
			headers: {
				'Content-Type': 'application/json; charset="UTF-8"',
			},
		})
		.then((response) => {
			response.json();
			if (response.ok) {
				document.querySelector('#update_form').innerHTML = `
				<div class="form__success-action">
					<p>Успешно удалено</p>
				</div>
				`;
				setTimeout(location.reload(), 2000);
			}
		})
	})
}

logoutButton.addEventListener('click', (event) => {
	event.preventDefault();
	fetch('https://investing-portfolios.netlify.app/api/logout', {
		method: 'PUT',
	})
	.then((response) => {
		response.json();
		if (response.ok) {
			document.cookie = 'token=;max-age=0';
			window.location = 'https://investing-portfolios.netlify.app/';
		}
	})
});

// Search Form

searchInput.addEventListener('input', (event) => {
	searchResultBlock.innerHTML = '';
	const data = {
		'name': ''
	};
	if (event.target.value != '') {
		data.name = event.target.value;
		fetch('https://investing-portfolios.netlify.app/api/searchCryptocurrency', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json; charset="UTF-8"',
			},
		})
		.then((response) => response.json())
		.then((data) => {
			if (data != '') {
				showSearchResult(data);
				openCryptoModal(data);
			}
		})
	} else {
		searchResult.style.display = 'none';
	}
});
addCryptocurrency();

function showSearchResult(cryptocurrency) {
	searchResultBlock.style.display = 'block';
	for (key in cryptocurrency) {
		searchResultBlock.innerHTML += (`
			<div class="search__result-crypto" id="result_crypto" data-unique-id="${cryptocurrency[key]['unique_id']}">
				<div class="search__result-logo">
					<!-- <img src="" alt="" class="result-logo"> -->
				</div>
				<div class="search__result-name">
					<p class="result-name">${cryptocurrency[key]['name']}</p>
				</div>
			</div>
		`)
	}
}

function openCryptoModal(cryptocurrency) {
	const resultCryptocurrency = document.querySelectorAll('#result_crypto');
	resultCryptocurrency.forEach(function setEventListener(currentValue) {
		currentValue.addEventListener('click', (event) => {
			modal.style.display = 'flex';
			const currentCryptocurrency = currentValue.getAttribute('data-unique-id');
			const cryptocurrencyName = document.querySelector('.modal__crypto-name');
			const cryptocurrencyAmount = document.querySelector('#cryptocurrency_amount');
			cryptocurrencyAmount.focus();
			cryptocurrencyAmount.select();
			cryptocurrencyAmount.addEventListener('click', (event) => {
				cryptocurrencyAmount.select();
			})
			for (key in cryptocurrency) {
				if (cryptocurrency[key]['unique_id'] == currentCryptocurrency) {
					cryptocurrencyName.textContent = cryptocurrency[key]['name'];
					cryptocurrencyName.setAttribute('data-unique-id', currentCryptocurrency);
				}
			}
		})
	});
}

function addCryptocurrency() {
	addButton.addEventListener('click', (event) => {
		event.preventDefault();
		let cryptocurrencyUniqueId = document.querySelector('p.modal__crypto-name').getAttribute('data-unique-id');
		const cryptocurrencyAmount = document.querySelector('#cryptocurrency_amount');
		console.log(cryptocurrencyUniqueId);
		const data = {
			cryptocurrencyAmount: cryptocurrencyAmount.value,
			cryptocurrencyUniqueId,
		}
		fetch('https://investing-portfolios.netlify.app/api/addActive', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-type': 'application/json; charset="UTF-8"',
			}
		})
		.then((response) => {
			response.json();
			if (response.ok) {
				document.querySelector('#add_form').innerHTML = `
				<div class="form__success-action">
					<p>Успешно добавлено</p>
				</div>
				`;
				setTimeout(location.reload(), 2000);
			}
		})
	});
}

closeModalButton.onclick = (event) => {
	event.preventDefault();
	modal.style.display = 'none';
}

closeUpdateModalButton.onclick = (event) => {
	event.preventDefault();
	updateModal.style.display = 'none';
}

modal.onclick = (event) => {
	if(event.target.classList.contains('modal')) modal.style.display = 'none';
}

updateModal.onclick = (event) => {
	if(event.target.classList.contains('modal')) updateModal.style.display = 'none';
}