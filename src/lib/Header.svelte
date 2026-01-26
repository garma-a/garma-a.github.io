<script>
	import { onMount } from 'svelte';

	let menuActive = false;
	let header;

	onMount(() => {
		const handleScroll = () => {
			if (header) {
				header.classList.toggle('sticky', window.scrollY > 100);
			}
		};

		window.addEventListener('scroll', handleScroll);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function toggleMenu() {
		menuActive = !menuActive;
	}

	function closeMenu() {
		menuActive = false;
	}
</script>

<header class="header" bind:this={header}>
	<button id="menu-icon" type="button" on:click|stopPropagation={toggleMenu} aria-label="Toggle navigation">
		<i class='bx bx-menu'></i>
		<span class="animate" style="--i:2;"></span>
	</button>
	<a href="#home" class="logo">GARMA<span class="animate" style="--i:1;"></span></a>
	<nav class="navbar" class:active={menuActive} on:click={closeMenu}>
		<a href="#home" class="active">Home</a>
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
		font-size: 2.8rem;
		color: var(--white);
		font-weight: 700;
		letter-spacing: 0.05em;
		background: var(--gradient-text);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
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

	#menu-icon {
		font-size: 3.5rem;
		color: var(--primary-light);
		cursor: pointer;
		display: none;
		padding: 0.5rem;
		border-radius: 0.5rem;
		transition: all 0.3s ease;
		background: transparent;
		border: none;
		outline: none;
		-webkit-tap-highlight-color: transparent;
	}

	#menu-icon:hover {
		background: rgba(99, 102, 241, 0.1);
	}

	/* Mobile responsiveness */
	@media(max-width: 768px) {
		.header {
			background: rgba(10, 10, 15, 0.95);
			backdrop-filter: blur(20px);
		}

		#menu-icon {
			display: block;
			position: absolute;
			right: 4%;
			z-index: 1001;
			pointer-events: auto;
		}

		.navbar {
			position: absolute;
			top: 100%;
			left: 0;
			width: 100%;
			padding: 2rem 4%;
			background: rgba(10, 10, 15, 0.98);
			backdrop-filter: blur(20px);
			border-bottom: 1px solid var(--border-color);
			box-shadow: var(--shadow-lg);
			flex-direction: column;
			gap: 0;
			transform: translateY(-10px);
			opacity: 0;
			visibility: hidden;
			transition: all 0.3s ease;
		}

		.navbar.active {
			transform: translateY(0);
			opacity: 1;
			visibility: visible;
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
			background: rgba(99, 102, 241, 0.1);
		}
	}
</style>
