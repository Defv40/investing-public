const modal = document.querySelector('#register_modal');
const openModalRegisterButton = document.querySelector('#open_modal_register');
const openModalLoginButton = document.querySelector('#open_modal_login');
const registerContent = `
	<div class="form__close">
	<img class="close" id="close_modal_button" src="../assets/images/svg-icons/cross-white.svg" alt="close">
	</div>
	<div class="form__title">
	<h3>Регистрация</h3>
	</div>
	<div class="form__register-data">
		<div class="pad-top-20">
			<input type="email" name="email" placeholder="Введите email">
			<p class="input-error" id="email_error">Для ввода доступны только символы латинского алфавита, цифры и следующие символы: #@{}().</p>
		</div>
		<div class="pad-top-20">
			<input type="text" name="login" placeholder="Введите login">
			<p class="input-error" id="login_error">Для ввода доступны только символы латинского алфавита, цифры и следующие символы: #@{}()</p>
		</div>
		<div class="pad-top-20">
			<input type="password" name="password" placeholder="Введите пароль">
			<p class="input-error" id="password_error">Для ввода доступны только символы латинского алфавита, цифры и следующие символы: #@{}()</p>
		</div>
		<div class="pad-top-20"><button name="register_button">Зарегистрироваться</button></div>
		<div class="form__bottom">
			<p>Уже зарегистрированы?</p>
			<a id="login_ref">Войдите</a>
		</div>
	</div>
`;
const formContent = document.querySelector('#form_content');
const loginContent = `
	<div class="form__close">
	<img class="close" id="close_modal_button" src="../assets/images/svg-icons/cross-white.svg" alt="close">
	</div>
	<div class="form__title">
	<h3>Вход</h3>
	</div>
	<div class="form__register-data">
	<div class="pad-top-20">
		<input type="text" name="login" placeholder="Введите login">
		<p class="input-error" id="login_error"></p>
	</div>
	<div class="pad-top-20">
		<input type="password" name="password" placeholder="Введите пароль">
		<p class="input-error" id="password_error"></p>
	</div>
	<div class="pad-top-20"><button name="login_button">Войти</button></div>
	<div class="form__bottom">
		<p>Нет аккаунта?</p>
		<a id="register_ref">Зарегистрируйтесь</a>
	</div>
	</div>
`;
const wrapper = document.querySelector('.wrapper');

openModalRegisterButton.addEventListener('click', (event) => {
	event.preventDefault();
	modal.style.display = 'flex';
	wrapper.classList.add('blur');
	formContent.innerHTML = registerContent;
	register();
	loginLink();
	closeModal();

});

openModalLoginButton.addEventListener('click', (event) => {
	event.preventDefault();
	modal.style.display = 'flex';
	wrapper.classList.add('blur');
	formContent.innerHTML = loginContent;
	login();
	registerLink();
	closeModal();
});

function loginLink(){
	const loginRef = document.querySelector('#login_ref');
	loginRef.addEventListener('click', (event) => {
		event.preventDefault();
		changeModalFormContentToLogin();		
		login();
		closeModal();
	});
}

function login(){
	const loginButton = document.querySelector('button[name="login_button"]');
		loginButton.addEventListener('click', (event) => {
			event.preventDefault();
			let login = document.querySelector('input[name="login"]').value;
			let password = document.querySelector('input[name="password"]').value;
			const data = {
				login,
				password
			};
			fetch('https://investing-portfolios.netlify.app/api/login', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json; charset="UTF-8"',
				},
			})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				document.cookie = `token=${data.data.token}`;
				window.location = "https://investing-portfolios.netlify.app/portfolio";
			})
		})
}

modal.onclick = (event) => {
	if(event.target.classList.contains('modal')) {
		wrapper.classList.remove('blur');
		modal.style.display = 'none';
	} 
}

function changeModalFormContentToLogin(){
	formContent.innerHTML = loginContent;
	registerLink();
}

function changeModalFormContentToRegister(){
	formContent.innerHTML = registerContent;
	loginLink();
}

function register() {
	const emailError = document.querySelector('#email_error');
	const loginError = document.querySelector('#login_error');
	const passwordError = document.querySelector('#password_error');
	const email = document.querySelector('input[name="email"]');
	const login = document.querySelector('input[name="login"]');
	const password = document.querySelector('input[name="password"]');
	email.addEventListener('input', (event) => {
		if (email.value.match(/^([A-Za-z]+)([A-Za-z0-9\./{}()#*@]+)/g)) {
			emailError.style.display = 'none';
		} else {
			emailError.style.display = 'block';
		}
	})
	login.addEventListener('input', (event) => {
		if (login.value.match(/^([A-Za-z]+)([A-Za-z0-9\./{}()#*@]+)/g)) {
			loginError.style.display = 'none';
		} else {
			loginError.style.display = 'block';
		}
	})
	password.addEventListener('input', (event) => {
		if (password.value.match(/^([A-Za-z]+)([A-Za-z0-9\./{}()#*@]+)/g)) {
			passwordError.style.display = 'none';
		} else {
			passwordError.style.display = 'block';
		}
	})
	const registerButton = document.querySelector('button[name="register_button"]');
	registerButton.addEventListener('click', (event) => {
		event.preventDefault();
		const data = {};
		if (email.value.match(/^([A-Za-z]+)([A-Za-z0-9\./{}()#*]+)+([A-Za-z0-9])\@([a-z]{3}|[a-z]{4}|[a-z]{5})\.(([a-z]{2})$|([a-z]{3})$)/g) 
		&& login.value.match(/^([A-Za-z]+)([A-Za-z0-9\./{}()#*@]+)/g) 
		&& password.value.match(/^([A-Za-z]+)([A-Za-z0-9\./{}()#*@]+)/g)) {
			data.email = email.value;
			data.login = login.value;
			data.password = password.value;
			fetch('https://investing-portfolios.netlify.app/api/register', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					"Content-type": "application/json;charset=UTF-8",
				},
			})
			.then((response) => response.json())
			.then((data) => {
				document.cookie = `token=${data.data.token}`;
				window.location = "https://investing-portfolios.netlify.app/portfolio";
			})
		} else {
			passwordError.textContent = 'Введите все поля корректно';
			passwordError.style.display = 'block';
		}
	});
}

function registerLink(){
	const registerRef = document.querySelector('#register_ref');

	registerRef.addEventListener('click', (event) => {
		event.preventDefault();
		changeModalFormContentToRegister();
		register();
		closeModal();
	});
}

function closeModal(){
	const closeModalButton = document.querySelector('#close_modal_button');
	closeModalButton.addEventListener('click', (event) => {
		event.preventDefault();
		wrapper.classList.remove('blur');
		modal.style.display = 'none';
	});
}

function checkInput(){
	const emailInput = document.querySelector("input[name='email']");
	const loginInput = document.querySelector("input[name='login']");
	const passwordInput = document.querySelector("input[name='password']");


}