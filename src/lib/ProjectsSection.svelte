<script>
	import { base } from "$app/paths";

	export let projects = [
		{
			slug: "healthcare-management",
			title: "Healthcare Management System",
			description:
				"Full-stack healthcare platform built for Magdi Yacoub Heart Center. Features patient management, appointment scheduling, lab results tracking, and role-based access control.",
			stack: ["NestJS", "PostgreSQL", "Docker", "Prisma"],
			image: `${base}/imgs/projects/healthcare-demo.png`,
			featured: true,
		},
		{
			slug: "restful-api-platform",
			title: "RESTful API Platform",
			description:
				"Production-ready REST API with comprehensive authentication, authorization middleware, rate limiting, and API versioning. Built with Express.js and MongoDB.",
			stack: ["Express.js", "MongoDB", "JWT", "Prisma"],
			image: `${base}/imgs/projects/api-platform-demo.png`,
		},
		{
			slug: "realtime-chat-backend",
			title: "Real-time Chat Backend",
			description:
				"High-performance chat server handling real-time messaging with WebSocket connections, message persistence, and Redis pub/sub for horizontal scaling.",
			stack: ["Go", "WebSocket", "Redis", "Docker"],
			image: `${base}/imgs/projects/chat-backend-demo.png`,
		},
		{
			slug: "smart-safety",
			title: "SmartSafety — UEA7 Winner",
			description:
				"Award-winning safety monitoring platform that secured 2nd place at Upper Egypt in Action 7 competition and ITIDA funding. IoT integration with real-time alerting.",
			stack: ["Node.js", "PostgreSQL", "Express.js", "CI/CD"],
			image: `${base}/imgs/projects/smart-safety-demo.png`,
		},
	];

	function handleProjectClick(slug) {
		window.location.href = `${base}/projects/${slug}`;
	}
</script>

<section class="projects scroll-reveal" id="projects">
	<div class="container">
		<h2 class="heading">My <span>Projects</span></h2>
		<p class="section-subtitle">
			Backend systems and APIs built to solve real problems
		</p>

		<div class="projects-grid">
			{#each projects as project, index}
				<button
					class="project-card scroll-reveal-child"
					class:featured={project.featured}
					style="--delay: {index * 0.12}s"
					on:click={() =>
						handleProjectClick(project.slug)}
					type="button"
				>
					<div class="card-image-area">
						<div
							class="card-image-bg"
							style="background-image: url('{project.image}');"
						></div>
						<div class="card-image-fallback">
							<i class="bx bx-server"></i>
							<span>{project.title}</span>
						</div>
						<div class="card-overlay">
							<span class="view-project">
								<i
									class="bx bx-right-arrow-alt"
								></i>
								View Project
							</span>
						</div>
					</div>
					<div class="card-info-area">
						<h3 class="project-title">
							{project.title}
						</h3>
						<div class="stack-badges">
							{#each project.stack as tech}
								<span class="stack-badge"
									>{tech}</span
								>
							{/each}
						</div>
					</div>
				</button>
			{/each}
		</div>
	</div>
</section>

<style>
	.projects {
		background: var(--bg-color);
		position: relative;
		overflow: hidden;
	}

	.projects::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(
				ellipse 50% 40% at 70% 20%,
				rgba(255, 0, 85, 0.06),
				transparent
			),
			radial-gradient(
				ellipse 60% 50% at 30% 80%,
				rgba(112, 0, 255, 0.06),
				transparent
			);
		pointer-events: none;
	}

	.container {
		max-width: 120rem;
		width: 100%;
		margin: 0 auto;
		position: relative;
		z-index: 2;
	}

	.heading {
		font-size: 4.5rem;
		font-weight: 700;
		text-align: center;
		margin-bottom: 1.5rem;
		color: var(--white);
	}

	.heading span {
		background: var(--gradient-primary);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.section-subtitle {
		text-align: center;
		font-size: 1.6rem;
		color: var(--text-muted);
		margin-bottom: 5rem;
	}

	/* Grid */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 3rem;
	}

	/* Card */
	.project-card {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border-color);
		border-radius: 1.5rem;
		overflow: hidden;
		cursor: pointer;
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		flex-direction: column;
		text-align: left;
		padding: 0;
		color: inherit;
		font-family: inherit;
	}

	.project-card:hover {
		border-color: rgba(255, 0, 85, 0.3);
		transform: translateY(-8px);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3),
			0 0 40px rgba(255, 0, 85, 0.08);
	}

	.project-card.featured {
		border-color: rgba(255, 0, 85, 0.15);
	}

	/* Image area - 80% */
	.card-image-area {
		position: relative;
		width: 100%;
		padding-top: 60%;
		overflow: hidden;
	}

	.card-image-bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		transition: transform 0.5s ease;
	}

	.project-card:hover .card-image-bg {
		transform: scale(1.05);
	}

	.card-image-fallback {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		background: linear-gradient(
			135deg,
			rgba(255, 0, 85, 0.08) 0%,
			rgba(112, 0, 255, 0.12) 100%
		);
	}

	.card-image-fallback i {
		font-size: 5rem;
		color: var(--primary);
		opacity: 0.6;
	}

	.card-image-fallback span {
		font-size: 1.6rem;
		font-weight: 600;
		color: var(--text-muted);
		text-align: center;
		max-width: 80%;
	}

	.card-overlay {
		position: absolute;
		inset: 0;
		background: rgba(10, 10, 15, 0.7);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.project-card:hover .card-overlay {
		opacity: 1;
	}

	.view-project {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 1.2rem 2.5rem;
		background: var(--gradient-primary);
		color: var(--white);
		border-radius: 5rem;
		font-size: 1.5rem;
		font-weight: 600;
		transition: transform 0.3s ease;
	}

	.view-project i {
		font-size: 2rem;
	}

	.project-card:hover .view-project {
		transform: scale(1.05);
	}

	/* Info area - 20% */
	.card-info-area {
		padding: 2rem 2.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		border-top: 1px solid var(--border-color);
	}

	.project-title {
		font-size: 1.6rem;
		font-weight: 600;
		color: var(--white);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.stack-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		flex-shrink: 0;
	}

	.stack-badge {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--primary-light);
		background: rgba(255, 0, 85, 0.1);
		border: 1px solid rgba(255, 0, 85, 0.2);
		padding: 0.3rem 1rem;
		border-radius: 5rem;
	}

	/* Responsive */
	@media (max-width: 991px) {
		.projects {
			padding: 8rem 4%;
		}

		.projects-grid {
			grid-template-columns: 1fr;
			max-width: 60rem;
			margin: 0 auto;
		}
	}

	@media (max-width: 768px) {
		.heading {
			font-size: 3.5rem;
		}

		.card-info-area {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	@media (max-width: 520px) {
		.heading {
			font-size: 3rem;
		}

		.card-image-area {
			padding-top: 55%;
		}

		.card-info-area {
			padding: 1.5rem 2rem;
		}

		.project-title {
			font-size: 1.4rem;
		}

		.stack-badge {
			font-size: 1rem;
		}
	}
</style>
