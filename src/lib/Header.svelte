<script>
	import { base } from "$app/paths";
	import { onMount } from "svelte";

	export let resumeUrl =
		"https://drive.google.com/file/d/1LCC_zAmOp0bQ9BzS1mdbP-4MHNGbBMSD/view?usp=sharing";
	export let githubUrl = "https://github.com/GARMA-A";
	export let linkedinUrl =
		"https://www.linkedin.com/in/girgis-emad-garma-96943a258/";
	export let email = "girgisemad74@gmail.com";

	let isSticky = false;
	let menuOpen = false;
	let isDark = true;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	function toggleTheme() {
		isDark = !isDark;
		document.documentElement.setAttribute(
			"data-theme",
			isDark ? "dark" : "light"
		);
		localStorage.setItem("theme", isDark ? "dark" : "light");
	}

	onMount(() => {
		const saved = localStorage.getItem("theme");
		if (saved === "light") {
			isDark = false;
			document.documentElement.setAttribute(
				"data-theme",
				"light"
			);
		}

		const handleScroll = () => {
			isSticky = window.scrollY > 80;
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});
</script>

<header class="header" class:sticky={isSticky}>
	<div class="header-inner">
		<!-- Brand with animated GARMA logo -->
		<a href="{base}/" class="brand" on:click={closeMenu}>
			<svg class="brand-logo" viewBox="0 0 750 160" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<linearGradient id="terminalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" style="stop-color:#ff0055;stop-opacity:1" />
						<stop offset="100%" style="stop-color:#7000ff;stop-opacity:1" />
					</linearGradient>
				</defs>

				<g class="letter-g" transform="translate(10, 10)">
					<path d="M 110 0 L 0 0 L 0 100 L 110 100 L 110 60" fill="none"
						stroke="url(#terminalGradient)" stroke-width="14" stroke-linecap="square" />
					<polyline points="30,40 50,60 30,80" fill="none" stroke="currentColor" stroke-width="8"
						stroke-linecap="square" />
					<rect x="60" y="70" width="16" height="8" fill="#ff0055" class="cursor-block" />
				</g>

				<g class="letter-a1" transform="translate(160, 10)">
					<line x1="55" y1="0" x2="0" y2="100" stroke="currentColor" stroke-width="10"
						stroke-linecap="round" />
					<line x1="55" y1="0" x2="110" y2="100" stroke="currentColor" stroke-width="10"
						stroke-linecap="round" />
					<path d="M 25 70 Q 55 70 55 55 Q 55 70 85 70" fill="none"
						stroke="currentColor" stroke-width="6" stroke-linecap="round" />
				</g>

				<g class="letter-r" transform="translate(300, 10)">
					<line x1="10" y1="0" x2="10" y2="100" stroke="currentColor" stroke-width="10"
						stroke-linecap="round" />
					<path d="M 10 0 L 60 0 Q 100 0 100 35 Q 100 65 60 65 L 10 65" fill="none" stroke="currentColor"
						stroke-width="10" stroke-linecap="round" />
					<line x1="60" y1="65" x2="100" y2="100" stroke="currentColor" stroke-width="10"
						stroke-linecap="round" />
				</g>

				<g class="letter-m" transform="translate(440, 10)">
					<line x1="10" y1="0" x2="10" y2="100" stroke="currentColor" stroke-width="10"
						stroke-linecap="round" />
					<line x1="110" y1="0" x2="110" y2="100" stroke="currentColor" stroke-width="10"
						stroke-linecap="round" />
					<polyline points="10,20 60,80 110,20" fill="none" stroke="currentColor" stroke-width="10"
						stroke-linecap="round" stroke-linejoin="round" />
				</g>

				<g class="letter-a2" transform="translate(590, 10)">
					<line x1="55" y1="0" x2="0" y2="100" stroke="currentColor" stroke-width="10"
						stroke-linecap="round" />
					<line x1="55" y1="0" x2="110" y2="100" stroke="currentColor" stroke-width="10"
						stroke-linecap="round" />
					<path d="M 25 70 Q 55 70 55 55 Q 55 70 85 70" fill="none"
						stroke="currentColor" stroke-width="6" stroke-linecap="round" />
				</g>
			</svg>
		</a>

		<!-- Desktop Nav (center) -->
		<nav class="nav-desktop" aria-label="Main navigation">
			<a href="#about" class="nav-link">About</a>
			<a href="#achievements" class="nav-link">Experience</a>
			<a href="#projects" class="nav-link">Projects</a>
			<a href="#skills" class="nav-link">Skills</a>
			<a href="#contact" class="nav-link">Contact</a>
		</nav>

		<!-- Right actions -->
		<div class="header-actions">
			<div class="social-icons">
				<a href={githubUrl} target="_blank" aria-label="GitHub" class="icon-btn">
					<i class="bx bxl-github"></i>
				</a>
				<a href={linkedinUrl} target="_blank" aria-label="LinkedIn" class="icon-btn">
					<i class="bx bxl-linkedin-square"></i>
				</a>
				<a href="mailto:{email}" aria-label="Email" class="icon-btn">
					<i class="bx bx-envelope"></i>
				</a>
			</div>

			<a href={resumeUrl} target="_blank" class="resume-btn">
				<i class="bx bx-download"></i>
				Resume
			</a>

			<button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
				<i class="bx {isDark ? 'bx-sun' : 'bx-moon'}"></i>
			</button>

			<button class="hamburger" on:click={toggleMenu} aria-label="Toggle menu" aria-expanded={menuOpen}>
				<i class="bx {menuOpen ? 'bx-x' : 'bx-menu'}"></i>
			</button>
		</div>
	</div>

	<!-- Mobile drawer -->
	{#if menuOpen}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="mobile-backdrop" on:click={closeMenu}></div>
	{/if}
	<div class="mobile-drawer" class:open={menuOpen}>
		<nav class="mobile-nav" aria-label="Mobile navigation">
			<a href="#about" class="mobile-link" on:click={closeMenu}><i class="bx bx-user"></i> About</a>
			<a href="#achievements" class="mobile-link" on:click={closeMenu}><i class="bx bx-briefcase"></i> Experience</a>
			<a href="#projects" class="mobile-link" on:click={closeMenu}><i class="bx bx-folder-open"></i> Projects</a>
			<a href="#skills" class="mobile-link" on:click={closeMenu}><i class="bx bx-code-alt"></i> Skills</a>
			<a href="#contact" class="mobile-link" on:click={closeMenu}><i class="bx bx-chat"></i> Contact</a>
		</nav>

		<div class="mobile-social">
			<a href={githubUrl} target="_blank" aria-label="GitHub" class="icon-btn">
				<i class="bx bxl-github"></i>
			</a>
			<a href={linkedinUrl} target="_blank" aria-label="LinkedIn" class="icon-btn">
				<i class="bx bxl-linkedin-square"></i>
			</a>
			<a href="mailto:{email}" aria-label="Email" class="icon-btn">
				<i class="bx bx-envelope"></i>
			</a>
		</div>

		<a href={resumeUrl} target="_blank" class="mobile-resume" on:click={closeMenu}>
			<i class="bx bx-download"></i>
			Download Resume
		</a>
	</div>
</header>

<style>
	/* ═══ Header ═══ */
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		padding: 0 5%;
		background: transparent;
		transition: all 0.4s ease;
	}

	.header.sticky {
		background: rgba(10, 10, 15, 0.85);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-bottom: 1px solid var(--border-color);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
	}

	.header-inner {
		max-width: 140rem;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 7rem;
	}

	/* ═══ Brand / Animated Logo ═══ */
	.brand {
		display: flex;
		align-items: center;
		height: 5rem;
		text-decoration: none;
		flex-shrink: 0;
	}

	.brand-logo {
		height: 100%;
		width: auto;
		max-width: 15rem;
		color: var(--white);
		transition: transform 0.3s ease;
	}

	.brand:hover .brand-logo {
		transform: scale(1.05);
	}

	/* Logo typing animation */
	:global(.brand-logo path),
	:global(.brand-logo line),
	:global(.brand-logo polyline) {
		stroke-dasharray: 600;
		stroke-dashoffset: 600;
	}

	:global(.cursor-block) {
		opacity: 0;
		animation: cursorBlink 1s step-end infinite;
	}

	:global(.letter-g) * {
		animation: typeLetter 10s cubic-bezier(0.25, 1, 0.5, 1) infinite;
		animation-delay: 0s;
	}

	:global(.letter-a1) * {
		animation: typeLetterWithReverse 10s cubic-bezier(0.25, 1, 0.5, 1) infinite;
		animation-delay: 0.5s;
	}

	:global(.letter-r) * {
		animation: typeLetterWithReverse 10s cubic-bezier(0.25, 1, 0.5, 1) infinite;
		animation-delay: 1.0s;
	}

	:global(.letter-m) * {
		animation: typeLetterWithReverse 10s cubic-bezier(0.25, 1, 0.5, 1) infinite;
		animation-delay: 1.5s;
	}

	:global(.letter-a2) * {
		animation: typeLetterWithReverse 10s cubic-bezier(0.25, 1, 0.5, 1) infinite;
		animation-delay: 2.0s;
	}

	@keyframes typeLetter {
		0% { stroke-dashoffset: 600; }
		5% { stroke-dashoffset: 0; }
		100% { stroke-dashoffset: 0; }
	}

	@keyframes typeLetterWithReverse {
		0% { stroke-dashoffset: 600; }
		20% { stroke-dashoffset: 0; }
		45% { stroke-dashoffset: 0; }
		55% { stroke-dashoffset: 600; }
		100% { stroke-dashoffset: 600; }
	}

	@keyframes cursorBlink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	/* ═══ Desktop Nav ═══ */
	.nav-desktop {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.nav-link {
		font-size: 1.4rem;
		font-weight: 500;
		color: var(--text-color);
		padding: 0.6rem 1.4rem;
		border-radius: 0.8rem;
		transition: all 0.3s ease;
		text-decoration: none;
		position: relative;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 2px;
		background: var(--gradient-primary);
		transition: width 0.3s ease;
		border-radius: 2px;
	}

	.nav-link:hover {
		color: var(--white);
	}

	.nav-link:hover::after {
		width: 60%;
	}

	/* ═══ Actions ═══ */
	.header-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.social-icons {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.icon-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3.6rem;
		height: 3.6rem;
		border-radius: 0.8rem;
		color: var(--text-muted);
		transition: all 0.3s ease;
		text-decoration: none;
	}

	.icon-btn:hover {
		color: var(--white);
		background: rgba(255, 255, 255, 0.06);
	}

	.icon-btn i {
		font-size: 2rem;
	}

	.resume-btn {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--white);
		padding: 0.7rem 1.8rem;
		border-radius: 0.8rem;
		border: 1px solid var(--border-color);
		transition: all 0.3s ease;
		text-decoration: none;
		white-space: nowrap;
	}

	.resume-btn:hover {
		border-color: var(--primary);
		background: rgba(255, 0, 85, 0.1);
		box-shadow: 0 0 20px rgba(255, 0, 85, 0.15);
	}

	.resume-btn i {
		font-size: 1.5rem;
	}

	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3.6rem;
		height: 3.6rem;
		border-radius: 0.8rem;
		background: none;
		color: var(--text-muted);
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: inherit;
		border: none;
	}

	.theme-toggle:hover {
		color: var(--white);
		background: rgba(255, 255, 255, 0.06);
	}

	.theme-toggle i {
		font-size: 2rem;
	}

	/* ═══ Hamburger ═══ */
	.hamburger {
		display: none;
		align-items: center;
		justify-content: center;
		width: 3.6rem;
		height: 3.6rem;
		border-radius: 0.8rem;
		background: none;
		color: var(--white);
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: inherit;
		border: none;
	}

	.hamburger i {
		font-size: 2.6rem;
	}

	/* ═══ Mobile ═══ */
	.mobile-backdrop {
		display: none;
	}

	.mobile-drawer {
		display: none;
	}

	@media (max-width: 768px) {
		.nav-desktop { display: none; }
		.social-icons { display: none; }
		.resume-btn { display: none; }
		.hamburger { display: flex; }

		.brand-logo {
			max-width: 12rem;
			height: 3.5rem;
		}

		.mobile-backdrop {
			display: block;
			position: fixed;
			inset: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 998;
		}

		.mobile-drawer {
			display: flex;
			flex-direction: column;
			position: fixed;
			top: 0;
			right: -100%;
			width: 28rem;
			height: 100vh;
			background: var(--sec-bg-color);
			border-left: 1px solid var(--border-color);
			padding: 8rem 2.5rem 3rem;
			z-index: 999;
			transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
			overflow-y: auto;
		}

		.mobile-drawer.open { right: 0; }

		.mobile-nav {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			margin-bottom: 3rem;
		}

		.mobile-link {
			display: flex;
			align-items: center;
			gap: 1.2rem;
			font-size: 1.6rem;
			font-weight: 500;
			color: var(--text-color);
			padding: 1.2rem 1.5rem;
			border-radius: 1rem;
			transition: all 0.3s ease;
			text-decoration: none;
		}

		.mobile-link:hover {
			color: var(--white);
			background: rgba(255, 255, 255, 0.06);
		}

		.mobile-link i {
			font-size: 2rem;
			color: var(--primary-light);
		}

		.mobile-social {
			display: flex;
			justify-content: center;
			gap: 1rem;
			margin-bottom: 2rem;
			padding-top: 2rem;
			border-top: 1px solid var(--border-color);
		}

		.mobile-social .icon-btn {
			width: 4.5rem;
			height: 4.5rem;
			background: rgba(255, 255, 255, 0.04);
		}

		.mobile-social .icon-btn i {
			font-size: 2.2rem;
		}

		.mobile-resume {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.8rem;
			font-size: 1.4rem;
			font-weight: 600;
			color: #f8fafc;
			padding: 1.2rem 2rem;
			border-radius: 1rem;
			background: var(--gradient-primary);
			transition: all 0.3s ease;
			text-decoration: none;
		}

		.mobile-resume:hover {
			transform: translateY(-2px);
			box-shadow: 0 8px 25px rgba(255, 0, 85, 0.3);
		}

		.mobile-resume i { font-size: 1.8rem; }
	}

	@media (max-width: 520px) {
		.header { padding: 0 4%; }
		.brand-logo { max-width: 10rem; }
		.mobile-drawer { width: 100%; }
	}
</style>
