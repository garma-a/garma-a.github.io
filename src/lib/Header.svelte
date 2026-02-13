<script>
	import { onMount } from 'svelte';

	let isSticky = false;

	onMount(() => {
		const handleScroll = () => {
			isSticky = window.scrollY > 100;
		};

		window.addEventListener('scroll', handleScroll);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

</script>

<header class="header" class:sticky={isSticky}>
	<a href="#home" class="logo" aria-label="Home">
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
				<polyline points="30,40 50,60 30,80" fill="none" stroke="#ffffff" stroke-width="8"
					stroke-linecap="square" />
				<rect x="60" y="70" width="16" height="8" fill="#ff0055" class="cursor-block" />
			</g>

			<g class="letter-a1" transform="translate(160, 10)">
				<line x1="55" y1="0" x2="0" y2="100" stroke="#ffffff" stroke-width="10"
					stroke-linecap="round" />
				<line x1="55" y1="0" x2="110" y2="100" stroke="#ffffff" stroke-width="10"
					stroke-linecap="round" />
				<path d="M 25 70 Q 55 70 55 55 Q 55 70 85 70" fill="none"
					stroke="#ffffff" stroke-width="6" stroke-linecap="round" />
			</g>

			<g class="letter-r" transform="translate(300, 10)">
				<line x1="10" y1="0" x2="10" y2="100" stroke="#ffffff" stroke-width="10"
					stroke-linecap="round" />
				<path d="M 10 0 L 60 0 Q 100 0 100 35 Q 100 65 60 65 L 10 65" fill="none" stroke="#ffffff"
					stroke-width="10" stroke-linecap="round" />
				<line x1="60" y1="65" x2="100" y2="100" stroke="#ffffff" stroke-width="10"
					stroke-linecap="round" />
			</g>

			<g class="letter-m" transform="translate(440, 10)">
				<line x1="10" y1="0" x2="10" y2="100" stroke="#ffffff" stroke-width="10"
					stroke-linecap="round" />
				<line x1="110" y1="0" x2="110" y2="100" stroke="#ffffff" stroke-width="10"
					stroke-linecap="round" />
				<polyline points="10,20 60,80 110,20" fill="none" stroke="#ffffff" stroke-width="10"
					stroke-linecap="round" stroke-linejoin="round" />
			</g>

			<g class="letter-a2" transform="translate(590, 10)">
				<line x1="55" y1="0" x2="0" y2="100" stroke="#ffffff" stroke-width="10"
					stroke-linecap="round" />
				<line x1="55" y1="0" x2="110" y2="100" stroke="#ffffff" stroke-width="10"
					stroke-linecap="round" />
				<path d="M 25 70 Q 55 70 55 55 Q 55 70 85 70" fill="none"
					stroke="#ffffff" stroke-width="6" stroke-linecap="round" />
			</g>
		</svg>
		<span class="animate" style="--i:1;"></span>
	</a>
	<nav id="primary-navigation" class="navbar">
		<a href="#about">About</a>
		<a href="#education">Journey</a>
		<a href="#skills">Skills</a>
		<a href="#achievements">Achievements</a>
		<a href="#books">Books</a>
		<a href="#contact">Contact</a>

		<span class="active-nav"></span>
		<span class="animate" style="--i:2;"></span>
	</nav>
</header>

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding: 2rem 9%;
		background: transparent;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 1000;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.header.sticky {
		background: rgba(10, 10, 15, 0.85);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-bottom: 1px solid var(--border-color);
		box-shadow: var(--shadow-md);
	}

	.logo {
		position: relative;
		display: flex;
		align-items: center;
		height: 50px;
	}

	.brand-logo {
		height: 100%;
		width: auto;
		max-width: 150px;
		transition: transform 0.3s ease;
	}

	.logo:hover .brand-logo {
		transform: scale(1.05);
	}

	/* Logo Animation Styles */
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

	/* Typing animation for each letter - total cycle: 10s */
	/* Type in: 0-2.5s, Wait: 2.5-4.5s, Type out: 4.5-6s, Wait: 6-8s, then repeat */
	
	/* Letter G - always visible (first letter never disappears) */
	:global(.letter-g) * { 
		animation: typeLetter 10s cubic-bezier(0.25, 1, 0.5, 1) infinite;
		animation-delay: 0s;
	}

	/* Letter A1 - types in/out */
	:global(.letter-a1) * { 
		animation: typeLetterWithReverse 10s cubic-bezier(0.25, 1, 0.5, 1) infinite;
		animation-delay: 0.5s;
	}

	/* Letter R - types in/out */
	:global(.letter-r) * { 
		animation: typeLetterWithReverse 10s cubic-bezier(0.25, 1, 0.5, 1) infinite;
		animation-delay: 1.0s;
	}

	/* Letter M - types in/out */
	:global(.letter-m) * { 
		animation: typeLetterWithReverse 10s cubic-bezier(0.25, 1, 0.5, 1) infinite;
		animation-delay: 1.5s;
	}

	/* Letter A2 - types in/out */
	:global(.letter-a2) * { 
		animation: typeLetterWithReverse 10s cubic-bezier(0.25, 1, 0.5, 1) infinite;
		animation-delay: 2.0s;
	}

	/* Animation for first letter (G) - stays visible, only types in once at start */
	@keyframes typeLetter {
		0% { 
			stroke-dashoffset: 600;
		}
		5% { 
			stroke-dashoffset: 0;
		}
		100% {
			stroke-dashoffset: 0;
		}
	}

	/* Animation for other letters - type in, wait, type out fast, wait */
	@keyframes typeLetterWithReverse {
		/* Type in phase: 0-25% (0-2.5s) */
		0% { 
			stroke-dashoffset: 600;
		}
		20% { 
			stroke-dashoffset: 0;
		}
		
		/* Wait phase: 25-45% (2.5-4.5s) */
		45% {
			stroke-dashoffset: 0;
		}
		
		/* Fast type out (reverse): 45-55% (4.5-5.5s) - very fast */
		55% {
			stroke-dashoffset: 600;
		}
		
		/* Wait phase: 55-100% (5.5-10s) */
		100% {
			stroke-dashoffset: 600;
		}
	}

	@keyframes cursorBlink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	.navbar {
		position: relative;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.navbar a {
		font-size: 1.5rem;
		color: var(--text-color);
		font-weight: 500;
		padding: 0.8rem 1.6rem;
		border-radius: 0.8rem;
		transition: all 0.3s ease;
		position: relative;
	}

	.navbar a::before {
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

	.navbar a:hover,
	.navbar a.active {
		color: var(--white);
	}

	.navbar a:hover::before,
	.navbar a.active::before {
		width: 60%;
	}

	.logo .animate,
	.navbar .animate {
		pointer-events: none;
	}

	/* Mobile responsiveness */
	@media(max-width: 768px) {
		.header {
			background: rgba(10, 10, 15, 0.95);
			backdrop-filter: blur(20px);
			justify-content: center;
		}

		.brand-logo {
			max-width: 120px;
			height: 32px;
		}

		.navbar {
			display: none;
		}

		.navbar a {
			display: block;
			font-size: 1.8rem;
			padding: 1.5rem 2rem;
			width: 100%;
			text-align: center;
		}

		.navbar a::before {
			display: none;
		}

		.navbar a:hover,
		.navbar a.active {
			background: rgba(255, 0, 85, 0.1);
		}
	}
</style>
