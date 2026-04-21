<script>
	import { onMount } from "svelte";
	import { base } from "$app/paths";

	export let data;

	$: project = data.project;
	$: activeImage = activeImages[activeImageIndex];

	let scrollProgress = 0;
	let lightboxOpen = false;
	let activeImages = [];
	let activeImageIndex = 0;
	let revealObserver;

	const runHighlight = () => {
		if (window.hljs) {
			window.hljs.highlightAll();
		}
	};

	const updateScrollProgress = () => {
		const scrollableHeight =
			document.documentElement.scrollHeight -
			window.innerHeight;

		if (scrollableHeight <= 0) {
			scrollProgress = 0;
			return;
		}

		scrollProgress = Math.min(
			100,
			Math.max(0, (window.scrollY / scrollableHeight) * 100),
		);
	};

	const openLightbox = (images, index) => {
		activeImages = images;
		activeImageIndex = index;
		lightboxOpen = true;
		document.body.classList.add("lightbox-open");
	};

	const closeLightbox = () => {
		lightboxOpen = false;
		document.body.classList.remove("lightbox-open");
	};

	const showPrevImage = () => {
		if (activeImages.length === 0) return;
		activeImageIndex =
			(activeImageIndex - 1 + activeImages.length) %
			activeImages.length;
	};

	const showNextImage = () => {
		if (activeImages.length === 0) return;
		activeImageIndex = (activeImageIndex + 1) % activeImages.length;
	};

	const handleGlobalKeydown = (event) => {
		if (!lightboxOpen) return;

		if (event.key === "Escape") {
			closeLightbox();
		}

		if (event.key === "ArrowLeft") {
			event.preventDefault();
			showPrevImage();
		}

		if (event.key === "ArrowRight") {
			event.preventDefault();
			showNextImage();
		}
	};

	onMount(() => {
		runHighlight();
		const timer = window.setTimeout(runHighlight, 140);

		revealObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add(
							"is-visible",
						);
						revealObserver.unobserve(
							entry.target,
						);
					}
				});
			},
			{ threshold: 0.01, rootMargin: "0px 0px -10% 0px" },
		);

		document.querySelectorAll(".reveal").forEach((element) => {
			revealObserver.observe(element);
		});

		updateScrollProgress();
		window.addEventListener("scroll", updateScrollProgress, {
			passive: true,
		});
		window.addEventListener("resize", updateScrollProgress);
		window.addEventListener("keydown", handleGlobalKeydown);

		return () => {
			window.clearTimeout(timer);
			revealObserver?.disconnect();
			window.removeEventListener(
				"scroll",
				updateScrollProgress,
			);
			window.removeEventListener(
				"resize",
				updateScrollProgress,
			);
			window.removeEventListener(
				"keydown",
				handleGlobalKeydown,
			);
			document.body.classList.remove("lightbox-open");
		};
	});
</script>

<svelte:head>
	<title>{project.title} | Girgis Emad - Backend Software Engineer</title>
	<meta name="description" content={project.description} />
	<link
		href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css"
	/>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"
	></script>
</svelte:head>

<div class="project-page">
	<div class="reading-progress" aria-hidden="true">
		<span style={`width: ${scrollProgress}%;`}></span>
	</div>
	<div class="ambient-orb orb-a" aria-hidden="true"></div>
	<div class="ambient-orb orb-b" aria-hidden="true"></div>
	<div class="ambient-orb orb-c" aria-hidden="true"></div>

	<nav class="project-nav">
		<a href={`${base}/#projects`} class="back-btn">
			<i class="bx bx-arrow-back"></i>
			Back to Portfolio
		</a>
	</nav>

	<header class="project-hero">
		<div class="hero-content">
			<span class="project-year">
				<i class="bx bx-calendar"></i>
				{project.year}
			</span>
			<h1>{project.title}</h1>
			<p class="project-subtitle">{project.subtitle}</p>
			<div class="hero-stack">
				{#each project.stack as tech}
					<span class="hero-badge">{tech}</span>
				{/each}
			</div>
			{#if project.githubUrl}
				<a
					href={project.githubUrl}
					target="_blank"
					rel="noreferrer"
					class="github-btn"
				>
					<i class="bx bxl-github"></i>
					View on GitHub
				</a>
			{/if}
		</div>
	</header>

	<section class="project-section reveal">
		<div class="section-inner">
			<h2>
				<i class="bx bx-info-circle"></i>
				About This Project
			</h2>
			<p class="description-text">{project.description}</p>
		</div>
	</section>

	{#if project.mainIdea}
		<section class="project-section alt-bg reveal">
			<div class="section-inner">
				<h2>
					<i class="bx bx-bulb"></i>
					Main Idea
				</h2>
				<div class="main-idea-card">
					<p>{project.mainIdea}</p>
				</div>
			</div>
		</section>
	{/if}

	{#if project.imageGroups?.uiScreenshots && project.imageGroups.uiScreenshots.length > 0}
		<section class="project-section reveal">
			<div class="section-inner">
				<h2>
					<i class="bx bx-image"></i>
					UI Product Walkthrough
				</h2>
				<p class="gallery-helper">
					Click any screenshot to open full-screen
					view and use arrow keys to navigate.
				</p>
				<div class="gallery-grid">
					{#each project.imageGroups.uiScreenshots as image, index}
						<figure class="gallery-item">
							<button
								type="button"
								class="gallery-trigger"
								on:click={() =>
									openLightbox(
										project
											.imageGroups
											.uiScreenshots,
										index,
									)}
								aria-label={`Open ${image.title}`}
							>
								<div
									class="gallery-image-wrap"
								>
									<img
										src={image.src}
										alt={image.title}
										loading="lazy"
									/>
									<span
										class="expand-hint"
									>
										<i
											class="bx bx-search-alt-2"

										></i>
										Click
										to
										expand
									</span>
								</div>
							</button>
							<figcaption>
								<h3>
									{image.title}
								</h3>
								<p>
									{image.caption}
								</p>
							</figcaption>
						</figure>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	{#if project.imageGroups?.swaggerScreenshots && project.imageGroups.swaggerScreenshots.length > 0}
		<section class="project-section alt-bg reveal">
			<div class="section-inner">
				<h2>
					<i class="bx bx-book-open"></i>
					Swagger/API Walkthrough
				</h2>
				<p class="gallery-helper">
					Open images in full screen to inspect
					request/response schema details clearly.
				</p>
				<div class="gallery-grid">
					{#each project.imageGroups.swaggerScreenshots as image, index}
						<figure class="gallery-item">
							<button
								type="button"
								class="gallery-trigger"
								on:click={() =>
									openLightbox(
										project
											.imageGroups
											.swaggerScreenshots,
										index,
									)}
								aria-label={`Open ${image.title}`}
							>
								<div
									class="gallery-image-wrap"
								>
									<img
										src={image.src}
										alt={image.title}
										loading="lazy"
									/>
									<span
										class="expand-hint"
									>
										<i
											class="bx bx-search-alt-2"

										></i>
										Click
										to
										expand
									</span>
								</div>
							</button>
							<figcaption>
								<h3>
									{image.title}
								</h3>
								<p>
									{image.caption}
								</p>
							</figcaption>
						</figure>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	{#if project.architectureImages && project.architectureImages.length > 0}
		<section class="project-section alt-bg reveal">
			<div class="section-inner">
				<h2>
					<i class="bx bx-sitemap"></i>
					Architecture Visuals
				</h2>
				<p class="gallery-helper">
					Click any diagram to expand the full view.
				</p>
				<div class="gallery-grid">
					{#each project.architectureImages as image, index}
						<figure class="gallery-item">
							<button
								type="button"
								class="gallery-trigger"
								on:click={() =>
									openLightbox(
										project.architectureImages,
										index,
									)}
								aria-label={`Open ${image.title}`}
							>
								<div class="gallery-image-wrap">
									<img
										src={image.src}
										alt={image.title}
										loading="lazy"
									/>
									<span class="expand-hint">
										<i class="bx bx-search-alt-2"></i>
										Click to expand
									</span>
								</div>
							</button>
							<figcaption>
								<h3>{image.title}</h3>
								<p>{image.caption}</p>
							</figcaption>
						</figure>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	{#if project.demoGifs && project.demoGifs.length > 0}
		<section class="project-section reveal">
			<div class="section-inner">
				<h2>
					<i class="bx bx-terminal"></i>
					Live Terminal Demos
				</h2>
				<p class="gallery-helper">
					Recorded with VHS — deterministic terminal recordings rendered as GIFs.
				</p>
				<div class="demo-gifs-grid">
					{#each project.demoGifs as demo}
						<article class="demo-gif-card">
							<header>
								<h3>
									<i class="bx bx-terminal"></i>
									{demo.title}
								</h3>
								<p class="demo-description">{demo.description}</p>
							</header>
							<div class="demo-gif-wrap">
								<img
									src={demo.src}
									alt={demo.title}
									loading="lazy"
								/>
							</div>
							{#if demo.commands && demo.commands.length > 0}
								<footer class="demo-commands">
									<span class="commands-label">Commands shown:</span>
									{#each demo.commands as cmd}
										<code>{cmd}</code>
									{/each}
								</footer>
							{/if}
						</article>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	{#if project.highlights && project.highlights.length > 0}
		<section class="project-section reveal">
			<div class="section-inner">
				<h2>
					<i class="bx bx-check-shield"></i>
					Key Features
				</h2>
				<ul class="highlights-list">
					{#each project.highlights as highlight}
						<li>
							<i
								class="bx bx-check-circle"
							></i>
							{highlight}
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/if}

	{#if project.coreFunctionality && project.coreFunctionality.length > 0}
		<section class="project-section alt-bg reveal">
			<div class="section-inner">
				<h2>
					<i class="bx bx-grid-alt"></i>
					Core Functionality
				</h2>
				<div class="functional-grid">
					{#each project.coreFunctionality as capability}
						<article
							class="functional-card"
						>
							<h3>
								{capability.title}
							</h3>
							<ul>
								{#each capability.points as point}
									<li>
										{point}
									</li>
								{/each}
							</ul>
						</article>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	{#if project.techStackByLayer && project.techStackByLayer.length > 0}
		<section class="project-section reveal">
			<div class="section-inner">
				<h2>
					<i class="bx bx-chip"></i>
					Technology Stack by Layer
				</h2>
				<div class="layer-grid">
					{#each project.techStackByLayer as layer}
						<article class="layer-card">
							<header>
								<h3>
									{layer.layer}
								</h3>
							</header>
							<div
								class="layer-badges"
							>
								{#each layer.technologies as technology}
									<span
										>{technology}</span
									>
								{/each}
							</div>
							<p>{layer.rationale}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	{#if project.systemDesign && project.systemDesign.length > 0}
		<section class="project-section alt-bg reveal">
			<div class="section-inner">
				<h2>
					<i class="bx bx-sitemap"></i>
					System Design
				</h2>
				<div class="system-grid">
					{#each project.systemDesign as module}
						<article class="system-card">
							<h3>{module.module}</h3>
							<p
								class="system-purpose"
							>
								{module.responsibility}
							</p>
							<p class="system-note">
								{module.notes}
							</p>
						</article>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	{#if project.dataFlow && project.dataFlow.length > 0}
		<section class="project-section reveal">
			<div class="section-inner">
				<h2>
					<i class="bx bx-transfer-alt"></i>
					Flow of Data
				</h2>
				<ol class="flow-list">
					{#each project.dataFlow as flowStep}
						<li>
							<h3>{flowStep.step}</h3>
							<p>
								{flowStep.description}
							</p>
						</li>
					{/each}
				</ol>
			</div>
		</section>
	{/if}

	{#if project.engineeringChallenges && project.engineeringChallenges.length > 0}
		<section class="project-section alt-bg reveal">
			<div class="section-inner">
				<h2>
					<i class="bx bx-wrench"></i>
					Engineering Challenges and Solutions
				</h2>
				<div class="challenge-grid">
					{#each project.engineeringChallenges as item}
						<article class="challenge-card">
							<h3>
								{item.challenge}
							</h3>
							<p>
								<span
									>Approach:</span
								>
								{item.approach}
							</p>
							<p>
								<span
									>Outcome:</span
								>
								{item.outcome}
							</p>
						</article>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	{#if project.codeSnippets && project.codeSnippets.length > 0}
		<section class="project-section reveal">
			<div class="section-inner">
				<h2>
					<i class="bx bx-code-alt"></i>
					Code Snippets from Repository
				</h2>
				<div class="snippet-grid">
					{#each project.codeSnippets as snippet}
						<article class="snippet-card">
							<header>
								<h3>
									{snippet.title}
								</h3>
								<p
									class="snippet-file"
								>
									{snippet.file}
								</p>
							</header>
							<p
								class="snippet-insight"
							>
								{snippet.insight}
							</p>
							<pre><code
									class={`language-${snippet.language || "plaintext"}`}
									>{snippet.code}</code
								></pre>
						</article>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	{#if project.impact && project.impact.length > 0}
		<section class="project-section alt-bg reveal">
			<div class="section-inner">
				<h2>
					<i class="bx bx-line-chart"></i>
					Impact
				</h2>
				<div class="impact-grid">
					{#each project.impact as item}
						<article class="impact-card">
							<h3>{item.title}</h3>
							<ul>
								{#each item.points as point}
									<li>
										{point}
									</li>
								{/each}
							</ul>
						</article>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	{#if project.videoUrl}
		<section class="project-section reveal">
			<div class="section-inner">
				<h2>
					<i class="bx bx-play-circle"></i>
					Demo Video
				</h2>
				<div class="video-container">
					<iframe
						src={project.videoUrl}
						title={`${project.title} Demo`}
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>
			</div>
		</section>
	{/if}

	{#if lightboxOpen && activeImage}
		<div
			class="lightbox-backdrop"
			role="dialog"
			aria-modal="true"
			aria-label={`Expanded image: ${activeImage.title}`}
			tabindex="-1"
			on:click|self={closeLightbox}
			on:keydown={(event) => {
				if (event.key === "Escape") closeLightbox();
			}}
		>
			<button
				type="button"
				class="lightbox-control close"
				on:click={closeLightbox}
				aria-label="Close expanded image"
			>
				<i class="bx bx-x"></i>
			</button>

			{#if activeImages.length > 1}
				<button
					type="button"
					class="lightbox-control prev"
					on:click={showPrevImage}
					aria-label="Show previous image"
				>
					<i class="bx bx-chevron-left"></i>
				</button>
			{/if}

			<figure class="lightbox-content">
				<img
					src={activeImage.src}
					alt={activeImage.title}
				/>
				<figcaption>
					<h3>{activeImage.title}</h3>
					<p>{activeImage.caption}</p>
					{#if activeImages.length > 1}
						<span class="lightbox-counter"
							>{activeImageIndex + 1} /
							{activeImages.length}</span
						>
					{/if}
				</figcaption>
			</figure>

			{#if activeImages.length > 1}
				<button
					type="button"
					class="lightbox-control next"
					on:click={showNextImage}
					aria-label="Show next image"
				>
					<i class="bx bx-chevron-right"></i>
				</button>
			{/if}
		</div>
	{/if}

	<footer class="project-footer reveal">
		<a href={`${base}/#projects`} class="back-link">
			<i class="bx bx-left-arrow-alt"></i>
			Back to all projects
		</a>
	</footer>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: #0a0a0f;
		color: #f8fafc;
		font-family: "Poppins", sans-serif;
		line-height: 1.6;
		overflow-x: hidden;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(html) {
		font-size: 62.5%;
		overflow-x: hidden;
	}

	:global(body.lightbox-open) {
		overflow: hidden;
	}

	.project-page {
		min-height: 100vh;
		position: relative;
	}

	.reading-progress {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 3px;
		z-index: 250;
		background: rgba(255, 255, 255, 0.08);
	}

	.reading-progress span {
		display: block;
		height: 100%;
		background: linear-gradient(
			90deg,
			#22d3ee,
			#ff3377 45%,
			#ff9f1a
		);
		box-shadow: 0 0 16px rgba(255, 0, 85, 0.55);
		transition: width 0.1s linear;
	}

	.ambient-orb {
		position: fixed;
		border-radius: 50%;
		filter: blur(80px);
		pointer-events: none;
		opacity: 0.24;
		z-index: 0;
		mix-blend-mode: screen;
		animation: orbDrift 16s ease-in-out infinite alternate;
	}

	.orb-a {
		top: 14rem;
		left: -8rem;
		width: 28rem;
		height: 28rem;
		background: rgba(255, 0, 85, 0.4);
	}

	.orb-b {
		top: 48vh;
		right: -10rem;
		width: 34rem;
		height: 34rem;
		background: rgba(34, 211, 238, 0.32);
		animation-delay: 1.8s;
	}

	.orb-c {
		bottom: -12rem;
		left: 32vw;
		width: 32rem;
		height: 32rem;
		background: rgba(255, 173, 51, 0.25);
		animation-delay: 3.4s;
	}

	.project-nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding: 2rem 5%;
		background: rgba(10, 10, 15, 0.9);
		backdrop-filter: blur(20px);
		z-index: 100;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		animation: navSlideDown 0.7s ease-out;
	}

	.back-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.8rem;
		font-size: 1.5rem;
		font-weight: 500;
		color: #94a3b8;
		transition: all 0.3s ease;
		text-decoration: none;
	}

	.back-btn:hover {
		color: #f8fafc;
	}

	.back-btn i {
		font-size: 2rem;
	}

	.project-hero {
		padding: 14rem 5% 8rem;
		position: relative;
		overflow: hidden;
		background: linear-gradient(
			135deg,
			#0a0a0f 0%,
			#12121a 50%,
			#0a0a0f 100%
		);
		z-index: 1;
	}

	.project-hero::before {
		content: "";
		position: absolute;
		top: -30%;
		right: -10%;
		width: 50rem;
		height: 50rem;
		background: radial-gradient(
			circle,
			rgba(255, 0, 85, 0.1) 0%,
			transparent 70%
		);
		pointer-events: none;
	}

	.hero-content {
		max-width: 90rem;
		margin: 0 auto;
		position: relative;
		z-index: 2;
		animation: heroRise 0.85s ease-out;
	}

	.project-year {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 1.3rem;
		font-weight: 600;
		color: #ff3377;
		background: rgba(255, 0, 85, 0.1);
		padding: 0.5rem 1.4rem;
		border-radius: 5rem;
		margin-bottom: 2rem;
	}

	.project-year i {
		font-size: 1.4rem;
	}

	.hero-content h1 {
		font-size: 5rem;
		font-weight: 800;
		color: #f8fafc;
		margin-bottom: 1rem;
		line-height: 1.2;
	}

	.project-subtitle {
		font-size: 2rem;
		color: #94a3b8;
		margin-bottom: 3rem;
	}

	.hero-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 3rem;
	}

	.hero-badge {
		font-size: 1.3rem;
		font-weight: 600;
		color: #f8fafc;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.12);
		padding: 0.6rem 1.6rem;
		border-radius: 5rem;
	}

	.github-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.8rem;
		padding: 1.2rem 2.5rem;
		background: linear-gradient(135deg, #ff0055, #7000ff);
		color: #f8fafc;
		border-radius: 5rem;
		font-size: 1.5rem;
		font-weight: 600;
		transition: all 0.4s ease;
		text-decoration: none;
		box-shadow: 0 4px 20px rgba(255, 0, 85, 0.3);
	}

	.github-btn:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 30px rgba(255, 0, 85, 0.4);
	}

	.github-btn i {
		font-size: 2rem;
	}

	.project-section {
		padding: 6rem 5%;
		position: relative;
		z-index: 1;
	}

	.reveal {
		opacity: 0;
		transform: translateY(26px) scale(0.992);
		transition:
			opacity 0.75s ease,
			transform 0.75s ease;
	}

	.reveal.is-visible {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	.project-section.alt-bg {
		background: #12121a;
	}

	.section-inner {
		max-width: 110rem;
		margin: 0 auto;
	}

	.section-inner h2 {
		display: flex;
		align-items: center;
		gap: 1.2rem;
		font-size: 2.4rem;
		font-weight: 700;
		color: #f8fafc;
		margin-bottom: 3rem;
	}

	.section-inner h2 i {
		font-size: 2.8rem;
		color: #ff3377;
	}

	.description-text {
		font-size: 1.7rem;
		color: #94a3b8;
		line-height: 1.9;
	}

	.main-idea-card {
		padding: 2.4rem;
		border-radius: 1.4rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: linear-gradient(
			135deg,
			rgba(34, 211, 238, 0.08),
			rgba(255, 0, 85, 0.06)
		);
	}

	.main-idea-card p {
		margin: 0;
		font-size: 1.7rem;
		line-height: 1.8;
		color: #dbe5f2;
	}

	.highlights-list {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.highlights-list li {
		display: flex;
		align-items: flex-start;
		gap: 1.2rem;
		font-size: 1.5rem;
		color: #94a3b8;
		line-height: 1.7;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 1rem;
		padding: 1.5rem 2rem;
		transition: all 0.3s ease;
	}

	.highlights-list li:hover {
		border-color: rgba(255, 0, 85, 0.2);
		background: rgba(255, 0, 85, 0.03);
	}

	.highlights-list li i {
		font-size: 2rem;
		color: #22d3ee;
		flex-shrink: 0;
		margin-top: 0.2rem;
	}

	.functional-grid,
	.layer-grid,
	.system-grid,
	.challenge-grid,
	.impact-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(27rem, 1fr));
		gap: 1.8rem;
	}

	.functional-card,
	.layer-card,
	.system-card,
	.challenge-card,
	.impact-card {
		padding: 2rem;
		border-radius: 1.2rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		transition:
			transform 0.25s ease,
			border-color 0.25s ease,
			background-color 0.25s ease;
	}

	.functional-card:hover,
	.layer-card:hover,
	.system-card:hover,
	.challenge-card:hover,
	.impact-card:hover {
		transform: translateY(-3px);
		border-color: rgba(34, 211, 238, 0.35);
		background: rgba(34, 211, 238, 0.06);
	}

	.functional-card h3,
	.layer-card h3,
	.system-card h3,
	.challenge-card h3,
	.impact-card h3,
	.flow-list h3,
	.gallery-item h3,
	.snippet-card h3 {
		margin: 0 0 1rem;
		font-size: 1.8rem;
		color: #f8fafc;
	}

	.functional-card ul,
	.impact-card ul {
		margin: 0;
		padding-left: 1.8rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.functional-card li,
	.impact-card li,
	.layer-card p,
	.system-purpose,
	.system-note,
	.challenge-card p {
		font-size: 1.45rem;
		line-height: 1.7;
		color: #a9b9cb;
	}

	.layer-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
		margin-bottom: 1.2rem;
	}

	.layer-badges span {
		padding: 0.5rem 1.1rem;
		border-radius: 999px;
		font-size: 1.2rem;
		font-weight: 600;
		background: rgba(255, 255, 255, 0.07);
		border: 1px solid rgba(255, 255, 255, 0.14);
		color: #dce8f7;
	}

	.system-purpose {
		margin: 0 0 0.9rem;
	}

	.system-note {
		margin: 0;
		color: #8da4bc;
	}

	.challenge-card p {
		margin: 0 0 1rem;
	}

	.challenge-card p span {
		color: #d5e4f4;
		font-weight: 600;
	}

	.flow-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1.3rem;
	}

	.flow-list li {
		padding: 1.7rem 2rem;
		border-radius: 1.2rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: rgba(255, 255, 255, 0.03);
	}

	.flow-list p {
		margin: 0;
		font-size: 1.5rem;
		color: #a4b5c8;
		line-height: 1.75;
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
		gap: 2rem;
	}

	.gallery-helper {
		margin: -1.2rem 0 2rem;
		font-size: 1.4rem;
		color: #9eb4cb;
	}

	.gallery-item {
		margin: 0;
		overflow: hidden;
		border-radius: 1.2rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: rgba(255, 255, 255, 0.02);
		transition:
			transform 0.25s ease,
			border-color 0.25s ease,
			box-shadow 0.25s ease;
	}

	.gallery-trigger {
		display: block;
		width: 100%;
		padding: 0;
		border: 0;
		background: transparent;
		cursor: zoom-in;
		text-align: left;
	}

	.gallery-trigger:focus-visible {
		outline: 0;
	}

	.gallery-item:focus-within {
		border-color: rgba(34, 211, 238, 0.65);
		box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.28);
	}

	.gallery-item:hover {
		transform: translateY(-4px);
		border-color: rgba(255, 0, 85, 0.5);
		box-shadow: 0 16px 34px rgba(0, 0, 0, 0.35);
	}

	.gallery-image-wrap {
		position: relative;
		overflow: hidden;
	}

	.gallery-item img {
		display: block;
		width: 100%;
		height: auto;
		max-height: 34rem;
		object-fit: cover;
		transition: transform 0.35s ease;
	}

	.gallery-item:hover img,
	.gallery-item:focus-within img {
		transform: scale(1.035);
	}

	.expand-hint {
		position: absolute;
		right: 1.1rem;
		bottom: 1.1rem;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.45rem 0.75rem;
		font-size: 1.2rem;
		font-weight: 600;
		color: #e5f3ff;
		border-radius: 999px;
		background: rgba(0, 0, 0, 0.62);
		border: 1px solid rgba(255, 255, 255, 0.26);
		opacity: 0;
		transform: translateY(8px);
		transition:
			opacity 0.22s ease,
			transform 0.22s ease;
	}

	.gallery-item:hover .expand-hint,
	.gallery-item:focus-within .expand-hint {
		opacity: 1;
		transform: translateY(0);
	}

	.gallery-item figcaption {
		padding: 1.4rem 1.5rem 1.6rem;
	}

	.gallery-item h3 {
		font-size: 1.55rem;
		margin-bottom: 0.8rem;
	}

	.gallery-item p {
		margin: 0;
		font-size: 1.35rem;
		line-height: 1.7;
		color: #9fb2c7;
	}

	.snippet-grid {
		display: grid;
		gap: 2rem;
	}

	.snippet-card {
		border-radius: 1.2rem;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: #1e1e24;
		transition:
			transform 0.3s ease,
			border-color 0.3s ease,
			box-shadow 0.3s ease;
	}

	.snippet-card:hover {
		transform: translateY(-2px);
		border-color: rgba(255, 0, 85, 0.35);
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.28);
	}

	.snippet-card header {
		padding: 1.4rem 1.6rem 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		background: rgba(0, 0, 0, 0.2);
	}

	.snippet-card h3 {
		font-size: 1.6rem;
		margin: 0;
	}

	.snippet-file {
		margin: 0.7rem 0 0;
		font-family: monospace;
		font-size: 1.25rem;
		color: #84a9c8;
	}

	.snippet-insight {
		margin: 0;
		padding: 1.2rem 1.6rem;
		font-size: 1.4rem;
		line-height: 1.75;
		color: #c9d7e6;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		background: rgba(255, 255, 255, 0.02);
	}

	.snippet-card pre {
		margin: 0;
		padding: 1.8rem;
		overflow-x: auto;
		font-size: 1.3rem;
		font-family: "Fira Code", Consolas, Monaco, "Andale Mono",
			"Ubuntu Mono", monospace;
	}

	.snippet-card :global(code) {
		font-family: inherit;
	}

	.video-container {
		position: relative;
		padding-top: 56.25%;
		border-radius: 1.2rem;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.video-container iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.lightbox-backdrop {
		position: fixed;
		inset: 0;
		display: grid;
		align-items: center;
		justify-items: center;
		padding: 3rem;
		background: rgba(7, 8, 14, 0.9);
		backdrop-filter: blur(9px);
		z-index: 350;
		animation: fadeIn 0.25s ease;
	}

	.lightbox-content {
		margin: 0;
		width: min(110rem, 100%);
		max-height: calc(100vh - 10rem);
		border-radius: 1.4rem;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.18);
		background: rgba(13, 16, 26, 0.95);
		box-shadow: 0 28px 62px rgba(0, 0, 0, 0.5);
		animation: lightboxRise 0.28s ease;
	}

	.lightbox-content img {
		display: block;
		width: 100%;
		max-height: calc(100vh - 22rem);
		object-fit: contain;
		background: #0d111d;
	}

	.lightbox-content figcaption {
		padding: 1.5rem 1.8rem 1.7rem;
	}

	.lightbox-content h3 {
		margin: 0 0 0.6rem;
		font-size: 1.7rem;
		color: #f4f8fd;
	}

	.lightbox-content p {
		margin: 0;
		font-size: 1.4rem;
		line-height: 1.65;
		color: #b4c7db;
	}

	.lightbox-counter {
		display: inline-block;
		margin-top: 0.9rem;
		font-size: 1.25rem;
		color: #89a4bf;
	}

	.lightbox-control {
		position: fixed;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 4.8rem;
		height: 4.8rem;
		border: 1px solid rgba(255, 255, 255, 0.28);
		border-radius: 50%;
		background: rgba(10, 12, 20, 0.86);
		color: #f2f8ff;
		cursor: pointer;
		transition:
			transform 0.2s ease,
			background-color 0.2s ease,
			border-color 0.2s ease;
		z-index: 360;
	}

	.lightbox-control:hover {
		transform: scale(1.06);
		background: rgba(255, 0, 85, 0.32);
		border-color: rgba(255, 255, 255, 0.55);
	}

	.lightbox-control i {
		font-size: 2.4rem;
	}

	.lightbox-control.close {
		top: 2rem;
		right: 2rem;
	}

	.lightbox-control.prev {
		left: 2rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.lightbox-control.next {
		right: 2rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.lightbox-control.prev:hover,
	.lightbox-control.next:hover {
		transform: translateY(-50%) scale(1.06);
	}

	.project-footer {
		padding: 4rem 5%;
		text-align: center;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.8rem;
		font-size: 1.5rem;
		font-weight: 600;
		color: #ff3377;
		transition: all 0.3s ease;
		text-decoration: none;
	}

	.back-link:hover {
		gap: 1.2rem;
	}

	.back-link i {
		font-size: 2rem;
	}

	@keyframes heroRise {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes navSlideDown {
		from {
			opacity: 0;
			transform: translateY(-18px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes orbDrift {
		from {
			transform: translate3d(0, 0, 0) scale(0.98);
		}
		to {
			transform: translate3d(22px, -16px, 0) scale(1.04);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes lightboxRise {
		from {
			opacity: 0;
			transform: translateY(14px) scale(0.985);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@media (max-width: 920px) {
		.ambient-orb {
			display: none;
		}

		.hero-content h1 {
			font-size: 4rem;
		}

		.project-subtitle {
			font-size: 1.75rem;
		}

		.section-inner h2 {
			font-size: 2.15rem;
		}

		.section-inner h2 i {
			font-size: 2.4rem;
		}
	}

	@media (max-width: 768px) {
		.project-hero {
			padding: 12rem 5% 5.5rem;
		}

		.hero-content h1 {
			font-size: 3.2rem;
		}

		.project-subtitle {
			font-size: 1.55rem;
		}

		.description-text,
		.main-idea-card p {
			font-size: 1.55rem;
		}

		.functional-grid,
		.layer-grid,
		.system-grid,
		.challenge-grid,
		.impact-grid,
		.gallery-grid {
			grid-template-columns: 1fr;
		}

		.lightbox-backdrop {
			padding: 1.4rem;
		}

		.lightbox-content {
			max-height: calc(100vh - 7rem);
		}

		.lightbox-content img {
			max-height: calc(100vh - 18rem);
		}

		.lightbox-control {
			width: 4.1rem;
			height: 4.1rem;
		}

		.lightbox-control.close {
			top: 1rem;
			right: 1rem;
		}

		.lightbox-control.prev {
			left: 0.8rem;
		}

		.lightbox-control.next {
			right: 0.8rem;
		}

		.flow-list li,
		.functional-card,
		.layer-card,
		.system-card,
		.challenge-card,
		.impact-card {
			padding: 1.6rem;
		}

		.snippet-card pre {
			font-size: 1.2rem;
			padding: 1.4rem;
		}
	}

	@media (max-width: 520px) {
		.reading-progress {
			height: 2px;
		}

		.hero-content h1 {
			font-size: 2.7rem;
		}

		.hero-stack {
			gap: 0.7rem;
		}

		.hero-badge {
			font-size: 1.15rem;
			padding: 0.45rem 1rem;
		}

		.github-btn {
			padding: 1rem 1.8rem;
			font-size: 1.3rem;
		}

		.section-inner h2 {
			font-size: 1.9rem;
		}

		.gallery-helper {
			font-size: 1.3rem;
		}

		.lightbox-content figcaption {
			padding: 1.2rem 1.3rem 1.35rem;
		}

		.lightbox-content h3 {
			font-size: 1.45rem;
		}

		.lightbox-content p {
			font-size: 1.25rem;
		}
	}

	/* Demo GIF Section */
	.demo-gifs-grid {
		display: grid;
		gap: 2.5rem;
	}

	.demo-gif-card {
		border-radius: 1.4rem;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: #15151d;
		transition:
			transform 0.3s ease,
			border-color 0.3s ease,
			box-shadow 0.3s ease;
	}

	.demo-gif-card:hover {
		transform: translateY(-3px);
		border-color: rgba(34, 211, 238, 0.4);
		box-shadow: 0 18px 38px rgba(0, 0, 0, 0.32),
			0 0 24px rgba(34, 211, 238, 0.06);
	}

	.demo-gif-card header {
		padding: 1.6rem 2rem 1.2rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		background: rgba(0, 0, 0, 0.25);
	}

	.demo-gif-card header h3 {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		margin: 0 0 0.6rem;
		font-size: 1.7rem;
		color: #f8fafc;
	}

	.demo-gif-card header h3 i {
		font-size: 2rem;
		color: #22d3ee;
	}

	.demo-description {
		margin: 0;
		font-size: 1.4rem;
		line-height: 1.7;
		color: #a9b9cb;
	}

	.demo-gif-wrap {
		position: relative;
		background: #0d0d15;
	}

	.demo-gif-wrap img {
		display: block;
		width: 100%;
		height: auto;
	}

	.demo-commands {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.7rem;
		padding: 1.2rem 1.8rem;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		background: rgba(0, 0, 0, 0.2);
	}

	.commands-label {
		font-size: 1.2rem;
		font-weight: 600;
		color: #6b7b8d;
		margin-right: 0.4rem;
	}

	.demo-commands code {
		font-family: "Fira Code", Consolas, monospace;
		font-size: 1.15rem;
		padding: 0.35rem 0.9rem;
		border-radius: 0.6rem;
		background: rgba(34, 211, 238, 0.1);
		border: 1px solid rgba(34, 211, 238, 0.2);
		color: #22d3ee;
		font-weight: 600;
	}
</style>
