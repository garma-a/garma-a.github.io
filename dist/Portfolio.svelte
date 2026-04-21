<script>
	import { base } from "$app/paths";
	import { onMount } from "svelte";
	import Header from "./Header.svelte";
	import HomeSection from "./HomeSection.svelte";
	import AboutSection from "./AboutSection.svelte";
	import SkillsSection from "./SkillsSection.svelte";
	import ProjectsSection from "./ProjectsSection.svelte";
	import AchievementsSection from "./AchievementsSection.svelte";
	import BooksSection from "./BooksSection.svelte";
	import Footer from "./Footer.svelte";

	// Props for customization
	export let name = "Girgis Emad";
	export let title = "Backend Software Engineer";
	export let motto = "THE ONLY WAY IS UP";
	export let resumeUrl =
		"https://drive.google.com/file/d/1LCC_zAmOp0bQ9BzS1mdbP-4MHNGbBMSD/view?usp=sharing";
	export let linkedinUrl =
		"https://www.linkedin.com/in/girgis-emad-garma-96943a258/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BxoJJYBM%2BTSuJAh3pxNX2AA%3D%3D";
	export let githubUrl = "https://github.com/GARMA-A";
	export let instagramUrl = "https://www.instagram.com/girgisyt/?hl=ar#";
	export let whatsappUrl = "https://wa.me/qr/I5I632ZU54YCH1";
	export let aboutImage = `${base}/myImage.jpg`;
	export let aboutText =
		"I'm a Backend Software Engineer 👨‍💻 with professional experience at Magdi Yacoub Heart Center and NTI/ITIDA in Egypt. I specialize in designing and building robust backend systems, APIs, and infrastructure using Node.js, NestJS, Go, PostgreSQL, and Docker. I'm passionate about clean architecture, system design, and solving complex problems 🔥 My goal is to engineer reliable, scalable backend solutions that make a real impact 🌟";

	onMount(() => {
		const revealElements = document.querySelectorAll('.scroll-reveal');

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('revealed');
						// Also reveal child elements with staggered delay
						const children = entry.target.querySelectorAll('.scroll-reveal-child');
						children.forEach((child, index) => {
							child.style.transitionDelay = `${index * 0.1}s`;
							child.classList.add('revealed');
						});
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0,
				rootMargin: '0px 0px -10% 0px'
			}
		);

		revealElements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<link
		href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Header {resumeUrl} {githubUrl} {linkedinUrl} />

<HomeSection
	{name}
	{title}
	{motto}
	{resumeUrl}
	{linkedinUrl}
	{githubUrl}
	{instagramUrl}
	{whatsappUrl}
/>

<AboutSection {aboutImage} {aboutText} title="Backend Software Engineer" />

<SkillsSection />

<ProjectsSection />

<AchievementsSection />

<BooksSection />

<Footer />

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		border: none;
		outline: none;
		scroll-behavior: smooth;
		font-family: "Poppins", sans-serif;
		text-decoration: none;
	}

	:global(:root) {
		--bg-color: #0a0a0f;
		--sec-bg-color: #12121a;
		--card-bg: rgba(255, 255, 255, 0.03);
		--text-color: #94a3b8;
		--text-muted: #64748b;
		--white: #f8fafc;
		--primary: #ff0055;
		--primary-light: #ff3377;
		--primary-dark: #cc0044;
		--accent: #7000ff;
		--accent-secondary: #a855f7;
		--gradient-primary: linear-gradient(
			135deg,
			#ff0055 0%,
			#a855f7 50%,
			#7000ff 100%
		);
		--gradient-text: linear-gradient(
			135deg,
			#ff0055 0%,
			#7000ff 100%
		);
		--gradient-card: linear-gradient(
			135deg,
			rgba(255, 0, 85, 0.1) 0%,
			rgba(112, 0, 255, 0.05) 100%
		);
		--border-color: rgba(255, 255, 255, 0.08);
		--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
		--shadow-md: 0 4px 20px rgba(0, 0, 0, 0.4);
		--shadow-lg: 0 8px 40px rgba(0, 0, 0, 0.5);
		--shadow-glow: 0 0 40px rgba(255, 0, 85, 0.3);
	}

	:global([data-theme="light"]) {
		--bg-color: #fafaf9;
		--sec-bg-color: #f5f3ef;
		--card-bg: rgba(255, 255, 255, 0.8);
		--text-color: #334155;
		--text-muted: #64748b;
		--white: #1e293b;
		--primary: #e60050;
		--primary-light: #ff1a6c;
		--primary-dark: #b8003f;
		--accent: #5b00d4;
		--accent-secondary: #8b5cf6;
		--gradient-primary: linear-gradient(
			135deg,
			#e60050 0%,
			#8b5cf6 50%,
			#5b00d4 100%
		);
		--gradient-text: linear-gradient(
			135deg,
			#e60050 0%,
			#5b00d4 100%
		);
		--gradient-card: linear-gradient(
			135deg,
			rgba(230, 0, 80, 0.06) 0%,
			rgba(91, 0, 212, 0.03) 100%
		);
		--border-color: rgba(0, 0, 0, 0.08);
		--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
		--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
		--shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.1);
		--shadow-glow: 0 0 30px rgba(230, 0, 80, 0.12);
	}

	/* Light mode: body background overlay */
	:global([data-theme="light"] body::before) {
		background: radial-gradient(
				ellipse 80% 50% at 50% -10%,
				rgba(230, 0, 80, 0.04),
				transparent
			),
			radial-gradient(
				ellipse 60% 40% at 100% 50%,
				rgba(91, 0, 212, 0.03),
				transparent
			),
			radial-gradient(
				ellipse 60% 40% at 0% 80%,
				rgba(139, 92, 246, 0.02),
				transparent
			);
	}

	/* Light mode: sticky header glass */
	:global([data-theme="light"] .header.sticky) {
		background: rgba(250, 250, 249, 0.88) !important;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
	}

	/* Light mode: icons and buttons */
	:global([data-theme="light"] .icon-btn:hover),
	:global([data-theme="light"] .theme-toggle:hover),
	:global([data-theme="light"] .nav-link:hover) {
		background: rgba(0, 0, 0, 0.05);
	}

	/* Light mode: card backgrounds */
	:global([data-theme="light"]) .scroll-reveal {
		transition: background-color 0.3s ease;
	}

	:global(html) {
		font-size: 62.5%;
		overflow-x: hidden;
	}

	:global(body) {
		background-color: var(--bg-color);
		color: var(--white);
		line-height: 1.6;
		transition: background-color 0.3s ease, color 0.3s ease;
	}

	:global(body::before) {
		content: "";
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(
				ellipse 80% 50% at 50% -20%,
				rgba(255, 0, 85, 0.15),
				transparent
			),
			radial-gradient(
				ellipse 60% 40% at 100% 50%,
				rgba(112, 0, 255, 0.1),
				transparent
			),
			radial-gradient(
				ellipse 60% 40% at 0% 80%,
				rgba(168, 85, 247, 0.08),
				transparent
			);
		pointer-events: none;
		z-index: -1;
	}

	:global(section) {
		min-height: 100vh;
		padding: 10rem 9% 6rem;
		position: relative;
	}

	:global(::selection) {
		background: var(--primary);
		color: var(--white);
	}

	:global(::-webkit-scrollbar) {
		width: 8px;
	}

	:global(::-webkit-scrollbar-track) {
		background: var(--bg-color);
	}

	:global(::-webkit-scrollbar-thumb) {
		background: var(--primary);
		border-radius: 4px;
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background: var(--primary-light);
	}

	/* Scroll Reveal Animation */
	:global(.scroll-reveal) {
		opacity: 0;
		transform: translateY(60px);
		transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
			transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	:global(.scroll-reveal.revealed) {
		opacity: 1;
		transform: translateY(0);
	}

	:global(.scroll-reveal-child) {
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
			transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	:global(.scroll-reveal-child.revealed) {
		opacity: 1;
		transform: translateY(0);
	}

	/* Reduce motion for accessibility */
	@media (prefers-reduced-motion: reduce) {
		:global(.scroll-reveal),
		:global(.scroll-reveal-child) {
			transition: none;
			opacity: 1;
			transform: none;
		}
	}
</style>
