<script>
	import { base } from "$app/paths";
	import Header from "./Header.svelte";
	import HomeSection from "./HomeSection.svelte";
	import AboutSection from "./AboutSection.svelte";
	import EducationSection from "./EducationSection.svelte";
	import SkillsSection from "./SkillsSection.svelte";
	import AchievementsSection from "./AchievementsSection.svelte";
	import BooksSection from "./BooksSection.svelte";
	import Footer from "./Footer.svelte";

	// Props for customization
	export let name = "Girgis Emad";
	export let title = "Full Stack Web Developer";
	export let motto = "THE ONLY WAY IS UP";
	export let resumeUrl =
		"https://drive.google.com/file/d/1Mz-Q39gGaI_WwB5oiTdP5hRElMGkfJgC/view?usp=sharing";
	export let linkedinUrl =
		"https://www.linkedin.com/in/girgis-emad-garma-96943a258/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BxoJJYBM%2BTSuJAh3pxNX2AA%3D%3D";
	export let githubUrl = "https://github.com/GARMA-A";
	export let instagramUrl = "https://www.instagram.com/girgisyt/?hl=ar#";
	export let whatsappUrl = "https://wa.me/qr/I5I632ZU54YCH1";
	export let aboutImage = `${base}/imgs/me.jpeg`;
	export let aboutText =
		"I'm a Full Stack Web Developer 👨‍💻 with professional experience at Magdi Yacoub Heart Center and NTI/ITIDA in Egypt. I graduated from the Faculty of Computing & Information Technology at Arab Academy Aswan. I'm passionate about building robust web applications and always pushing myself to grow 🔥 My goal is to create impactful solutions that make a difference 🌟";
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

<Header />

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

<AboutSection {aboutImage} {aboutText} title="Full Stack Web Developer" />

<EducationSection />

<SkillsSection />

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
		--primary: #6366f1;
		--primary-light: #818cf8;
		--primary-dark: #4f46e5;
		--accent: #22d3ee;
		--accent-secondary: #a855f7;
		--gradient-primary: linear-gradient(
			135deg,
			#6366f1 0%,
			#a855f7 50%,
			#22d3ee 100%
		);
		--gradient-text: linear-gradient(
			135deg,
			#6366f1 0%,
			#22d3ee 100%
		);
		--gradient-card: linear-gradient(
			135deg,
			rgba(99, 102, 241, 0.1) 0%,
			rgba(34, 211, 238, 0.05) 100%
		);
		--border-color: rgba(255, 255, 255, 0.08);
		--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
		--shadow-md: 0 4px 20px rgba(0, 0, 0, 0.4);
		--shadow-lg: 0 8px 40px rgba(0, 0, 0, 0.5);
		--shadow-glow: 0 0 40px rgba(99, 102, 241, 0.3);
	}

	:global(html) {
		font-size: 62.5%;
		overflow-x: hidden;
	}

	:global(body) {
		background-color: var(--bg-color);
		color: var(--white);
		line-height: 1.6;
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
				rgba(99, 102, 241, 0.15),
				transparent
			),
			radial-gradient(
				ellipse 60% 40% at 100% 50%,
				rgba(168, 85, 247, 0.1),
				transparent
			),
			radial-gradient(
				ellipse 60% 40% at 0% 80%,
				rgba(34, 211, 238, 0.08),
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
</style>
