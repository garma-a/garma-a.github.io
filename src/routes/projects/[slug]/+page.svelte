<script>
	import { base } from "$app/paths";

	export let data;

	$: project = data.project;
	$: slug = data.slug;
</script>

<svelte:head>
	<title
		>{project.title} | Girgis Emad - Backend Software
		Engineer</title
	>
	<meta name="description" content={project.description} />
	<link
		href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="project-page">
	<!-- Navigation -->
	<nav class="project-nav">
		<a href="{base}/#projects" class="back-btn">
			<i class="bx bx-arrow-back"></i>
			Back to Portfolio
		</a>
	</nav>

	<!-- Hero -->
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
					class="github-btn"
				>
					<i class="bx bxl-github"></i>
					View on GitHub
				</a>
			{/if}
		</div>
	</header>

	<!-- Description -->
	<section class="project-section">
		<div class="section-inner">
			<h2>
				<i class="bx bx-info-circle"></i>
				About This Project
			</h2>
			<p class="description-text">{project.description}</p>
		</div>
	</section>

	<!-- Highlights -->
	{#if project.highlights && project.highlights.length > 0}
		<section class="project-section alt-bg">
			<div class="section-inner">
				<h2>
					<i class="bx bx-check-shield"></i>
					Key Features
				</h2>
				<ul class="highlights-list">
					{#each project.highlights as highlight}
						<li>
							<i class="bx bx-check-circle"></i>
							{highlight}
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/if}

	<!-- Tech Stack Detail -->
	<section class="project-section">
		<div class="section-inner">
			<h2>
				<i class="bx bx-code-alt"></i>
				Technology Stack
			</h2>
			<div class="tech-detail-grid">
				{#each project.stack as tech}
					<div class="tech-detail-card">
						<i class="bx bx-server"></i>
						<span>{tech}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Image Gallery Placeholder -->
	{#if project.images && project.images.length > 0}
		<section class="project-section alt-bg">
			<div class="section-inner">
				<h2>
					<i class="bx bx-image"></i>
					Screenshots
				</h2>
				<div class="gallery-grid">
					{#each project.images as image}
						<div class="gallery-item">
							<img
								src={image}
								alt="{project.title} screenshot"
								loading="lazy"
							/>
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- Video Placeholder -->
	{#if project.videoUrl}
		<section class="project-section">
			<div class="section-inner">
				<h2>
					<i class="bx bx-play-circle"></i>
					Demo Video
				</h2>
				<div class="video-container">
					<iframe
						src={project.videoUrl}
						title="{project.title} Demo"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>
			</div>
		</section>
	{/if}

	<!-- Footer -->
	<footer class="project-footer">
		<a href="{base}/#projects" class="back-link">
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
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(html) {
		font-size: 62.5%;
	}

	.project-page {
		min-height: 100vh;
	}

	/* Nav */
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

	/* Hero */
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
		max-width: 80rem;
		margin: 0 auto;
		position: relative;
		z-index: 2;
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

	/* Sections */
	.project-section {
		padding: 6rem 5%;
	}

	.project-section.alt-bg {
		background: #12121a;
	}

	.section-inner {
		max-width: 80rem;
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

	/* Highlights */
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

	/* Tech Grid */
	.tech-detail-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
		gap: 1.5rem;
	}

	.tech-detail-card {
		display: flex;
		align-items: center;
		gap: 1.2rem;
		padding: 2rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1.2rem;
		transition: all 0.3s ease;
	}

	.tech-detail-card:hover {
		border-color: rgba(255, 0, 85, 0.3);
		background: rgba(255, 0, 85, 0.05);
		transform: translateY(-3px);
	}

	.tech-detail-card i {
		font-size: 2.4rem;
		color: #ff3377;
	}

	.tech-detail-card span {
		font-size: 1.5rem;
		font-weight: 600;
		color: #f8fafc;
	}

	/* Gallery */
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
		gap: 2rem;
	}

	.gallery-item {
		border-radius: 1.2rem;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.gallery-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease;
	}

	.gallery-item:hover img {
		transform: scale(1.05);
	}

	/* Video */
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

	/* Footer */
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

	/* Responsive */
	@media (max-width: 768px) {
		.hero-content h1 {
			font-size: 3.5rem;
		}

		.project-subtitle {
			font-size: 1.6rem;
		}

		.section-inner h2 {
			font-size: 2rem;
		}

		.description-text {
			font-size: 1.5rem;
		}

		.highlights-list li {
			font-size: 1.4rem;
		}

		.tech-detail-grid {
			grid-template-columns: repeat(
				auto-fill,
				minmax(12rem, 1fr)
			);
		}
	}

	@media (max-width: 520px) {
		.hero-content h1 {
			font-size: 2.8rem;
		}

		.project-hero {
			padding: 12rem 5% 5rem;
		}
	}
</style>
