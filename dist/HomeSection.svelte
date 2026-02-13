<script>
	import { base } from "$app/paths";
	export let name = "Girgis Emad";
	export let title = "Full Stack Web Developer";
	export let motto = "THE ONLY WAY IS UP";
	export let resumeUrl =
		"https://drive.google.com/file/d/1Mz-Q39gGaI_WwB5oiTdP5hRElMGkfJgC/view?usp=sharing";
	export let linkedinUrl = "#";
	export let githubUrl = "#";
	export let instagramUrl = "#";
	export let whatsappUrl = "#";
</script>

<section class="home show-animate" id="home">
	<div
		class="home-bg"
		style="background-image: url('{base}/imgs/HEADER.jpeg');"
	></div>
	<div class="home-content">
		<span class="greeting">Hello, I'm</span>
		<h1><span class="name-gradient">{name}</span></h1>
		<div class="text-animate">
			<h3>{title}</h3>
		</div>
		<p class="motto">{motto}</p>
		<div class="btn-box">
			<a
				href={resumeUrl}
				class="btn btn-primary"
				target="_blank"
			>
				<i class="bx bx-download"></i> Resume
			</a>
			<a
				href={linkedinUrl}
				class="btn btn-outline"
				target="_blank"
			>
				<i class="bx bxl-linkedin"></i> LinkedIn
			</a>
		</div>
		<div class="home-sci-mobile">
			<a href={githubUrl} target="_blank" aria-label="GitHub"
				><i class="bx bxl-github"></i></a
			>
			<a
				href={instagramUrl}
				target="_blank"
				aria-label="Instagram"
				><i class="bx bxl-instagram"></i></a
			>
			<a
				href={whatsappUrl}
				target="_blank"
				aria-label="WhatsApp"
				><i class="bx bxl-whatsapp"></i></a
			>
		</div>
	</div>

	<div class="home-sci">
		<a href={githubUrl} target="_blank" aria-label="GitHub"
			><i class="bx bxl-github"></i></a
		>
		<a href={instagramUrl} target="_blank" aria-label="Instagram"
			><i class="bx bxl-instagram"></i></a
		>
		<a href={whatsappUrl} target="_blank" aria-label="WhatsApp"
			><i class="bx bxl-whatsapp"></i></a
		>
	</div>

	<div class="scroll-indicator">
		<span></span>
		<p>Scroll Down</p>
	</div>
</section>

<style>
	.home {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 9%;
		position: relative;
		overflow: hidden;
		background: linear-gradient(
			135deg,
			var(--bg-color) 0%,
			#0f0f1a 100%
		);
	}

	.home-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
		opacity: 0.15;
		filter: blur(2px);
	}

	.home-bg::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			180deg,
			transparent 0%,
			var(--bg-color) 100%
		);
	}

	.home-content {
		max-width: 80rem;
		z-index: 10;
		text-align: center;
	}

	.greeting {
		display: inline-block;
		font-size: 1.8rem;
		font-weight: 500;
		color: var(--primary-light);
		margin-bottom: 1rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}

	.home-content h1 {
		font-size: 7rem;
		font-weight: 800;
		line-height: 1.1;
		margin-bottom: 1.5rem;
		color: var(--white);
	}

	.name-gradient {
		background: var(--gradient-primary);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.home-content .text-animate h3 {
		font-size: 2.8rem;
		font-weight: 600;
		color: var(--text-color);
		margin-bottom: 2rem;
	}

	.motto {
		font-size: 1.6rem;
		color: var(--text-muted);
		margin-bottom: 4rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
	}

	.btn-box {
		display: flex;
		justify-content: center;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 1.4rem 3.5rem;
		font-size: 1.6rem;
		font-weight: 600;
		border-radius: 5rem;
		cursor: pointer;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		text-decoration: none;
	}

	.btn i {
		font-size: 2rem;
	}

	.btn-primary {
		background: var(--gradient-primary);
		color: var(--white);
		box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
	}

	.btn-primary:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 30px rgba(99, 102, 241, 0.5);
	}

	.btn-outline {
		background: transparent;
		color: var(--white);
		border: 2px solid var(--border-color);
		backdrop-filter: blur(10px);
	}

	.btn-outline:hover {
		border-color: var(--primary);
		background: rgba(99, 102, 241, 0.1);
		transform: translateY(-3px);
	}

	.home-sci {
		position: absolute;
		left: 5%;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.home-sci a {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 5rem;
		height: 5rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border-color);
		border-radius: 50%;
		font-size: 2.2rem;
		color: var(--text-color);
		transition: all 0.4s ease;
	}

	.home-sci a:hover {
		color: var(--white);
		border-color: var(--primary);
		background: rgba(99, 102, 241, 0.1);
		transform: translateY(-3px);
		box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
	}

	.home-sci-mobile {
		display: none;
		justify-content: center;
		gap: 2rem;
		margin-top: 4rem;
	}

	.home-sci-mobile a {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 5rem;
		height: 5rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border-color);
		border-radius: 50%;
		font-size: 2.2rem;
		color: var(--text-color);
		transition: all 0.4s ease;
	}

	.home-sci-mobile a:hover {
		color: var(--white);
		border-color: var(--primary);
		background: rgba(99, 102, 241, 0.1);
		transform: translateY(-3px);
		box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
	}

	.scroll-indicator {
		position: absolute;
		bottom: 4rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		animation: bounce 2s infinite;
	}

	.scroll-indicator span {
		width: 2.5rem;
		height: 4rem;
		border: 2px solid var(--border-color);
		border-radius: 2rem;
		position: relative;
	}

	.scroll-indicator span::before {
		content: "";
		position: absolute;
		top: 0.8rem;
		left: 50%;
		transform: translateX(-50%);
		width: 0.6rem;
		height: 0.6rem;
		background: var(--primary);
		border-radius: 50%;
		animation: scroll-dot 2s infinite;
	}

	.scroll-indicator p {
		font-size: 1.2rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.2em;
	}

	@keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateX(-50%) translateY(0);
		}
		40% {
			transform: translateX(-50%) translateY(-10px);
		}
		60% {
			transform: translateX(-50%) translateY(-5px);
		}
	}

	@keyframes scroll-dot {
		0% {
			opacity: 1;
			top: 0.8rem;
		}
		100% {
			opacity: 0;
			top: 2rem;
		}
	}

	/* Mobile responsiveness */
	@media (max-width: 991px) {
		.home-sci {
			display: none;
		}

		.home-sci-mobile {
			display: flex;
		}

		.scroll-indicator {
			display: none;
		}
	}

	@media (max-width: 768px) {
		.home-content h1 {
			font-size: 5rem;
		}

		.home-content .text-animate h3 {
			font-size: 2.2rem;
		}

		.greeting {
			font-size: 1.5rem;
		}
	}

	@media (max-width: 520px) {
		.home-content h1 {
			font-size: 4rem;
		}

		.btn-box {
			flex-direction: column;
			align-items: center;
		}

		.btn {
			width: 100%;
			max-width: 28rem;
		}
	}

	@media (max-width: 420px) {
		.home {
			padding: 0 5%;
		}

		.home-content {
			padding: 2rem 0;
		}

		.greeting {
			font-size: 1.3rem;
			letter-spacing: 0.15em;
		}

		.home-content h1 {
			font-size: 3.2rem;
			word-break: break-word;
		}

		.home-content .text-animate h3 {
			font-size: 1.8rem;
		}

		.motto {
			font-size: 1.2rem;
			letter-spacing: 0.15em;
			margin-bottom: 3rem;
		}

		.btn {
			padding: 1.2rem 2.5rem;
			font-size: 1.4rem;
			max-width: 24rem;
		}

		.btn i {
			font-size: 1.6rem;
		}

		.home-sci-mobile {
			margin-top: 3rem;
			gap: 1.5rem;
		}

		.home-sci-mobile a {
			width: 4.5rem;
			height: 4.5rem;
			font-size: 2rem;
		}
	}
</style>
