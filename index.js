const COUNTDOWN_SECONDS = 10;
const EMBEDDED_FLAG = "embedded=1";
const MISSING_PAGE_URL = "./pagina.html";

document.addEventListener("DOMContentLoaded", main);

function main() {
	if (isEmbeddedMode()) {
		renderEmbeddedPage();
		return;
	}

	renderShell();
	startCountdown();
}

function isEmbeddedMode() {
	const params = new URLSearchParams(window.location.search);
	return params.get("embedded") === "1";
}

function renderShell() {
	document.body.innerHTML = `
		<div class="app-shell">
			<iframe
				id="content-frame"
				class="content-frame"
				src="./index.html?${EMBEDDED_FLAG}"
				title="Conteudo carregado no iframe"
			></iframe>
			<div class="countdown-overlay" aria-live="polite">
				<div class="countdown-card">
					<span class="countdown-label">Abrindo pagina.html em</span>
					<strong id="countdown-value" class="countdown-value">${COUNTDOWN_SECONDS}</strong>
				</div>
			</div>
		</div>
	`;
}

function renderEmbeddedPage() {
	document.body.innerHTML = `
		<div class="embedded-page">
			<div class="embedded-card">
				<span class="embedded-badge">iframe</span>
				<h1>index.html carregado dentro do iframe</h1>
				<p>
					Esta e a visualizacao inicial. Quando a contagem terminar,
					o mesmo iframe vai tentar abrir pagina.html, que nao existe.
				</p>
			</div>
		</div>
	`;
}

function startCountdown() {
	const countdownElement = document.getElementById("countdown-value");
	const iframeElement = document.getElementById("content-frame");
	let remainingSeconds = COUNTDOWN_SECONDS;

	const timer = window.setInterval(() => {
		remainingSeconds -= 1;

		if (remainingSeconds <= 0) {
			countdownElement.textContent = "0";
			window.clearInterval(timer);
			iframeElement.src = MISSING_PAGE_URL;
			return;
		}

		countdownElement.textContent = String(remainingSeconds);
	}, 1000);
}

