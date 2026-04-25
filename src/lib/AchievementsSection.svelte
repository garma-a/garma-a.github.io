<script>
	import { base } from "$app/paths";

	export let journeyItems = [
		{
			image: `${base}/imgs/ITIDA_NTI_certificate.png`,
			title: "Full Stack Web Development — NTI & ITIDA",
			description:
				"Intensive full-stack web development program by the National Telecommunication Institute (NTI) and Information Technology Industry Development Agency (ITIDA). Mastered modern web technologies including React, Next.js, Node.js, NestJS, and database management.",
			year: "2025",
			tags: ["NTI Certified", "ITIDA Funded", "Full Stack"],
		},
		{
			image: `${base}/imgs/magdiYacoubCertificate.png`,
			title: "Software Developer — Magdi Yacoub Heart Foundation",
			description:
				"Completed professional training and development work at Magdi Yacoub Heart Foundation, one of Egypt's leading healthcare institutions. Contributed to building web applications for healthcare management systems.",
			year: "2024",
			tags: ["Healthcare", "Real-World Impact", "Backend Dev"],
		},
		{
			image: `${base}/imgs/arab_academy_GPA_Above_3.5_certificte.jpg`,
			title: "Academic Excellence — Arab Academy for Science & Technology",
			description:
				"Achieved a GPA above 3.5 across multiple semesters in Computing & Information Technology at Arab Academy for Science, Technology and Maritime Transport — Aswan Branch. Recognized for consistent academic distinction.",
			year: "2024",
			tags: ["GPA Above 3.5", "CS Student", "AAST"],
		},
	];
</script>

<section class="journey scroll-reveal" id="achievements">
	<div class="container">
		<h2 class="heading">My <span>Journey</span></h2>
		<p class="section-subtitle">
			Milestones and certifications along my path
		</p>

		<div class="journey-timeline">
			{#each journeyItems as item, index}
				<div
					class="journey-card scroll-reveal-child"
					style="--delay: {index * 0.15}s"
				>
					<div class="card-accent"></div>
					<div class="card-body">
						<div class="card-info">
							<span class="card-year">
								<i class="bx bx-calendar"></i>
								{item.year}
							</span>
							<h3 class="card-title">{item.title}</h3>
							<p class="card-description">
								{item.description}
							</p>
							<div class="card-tags">
								{#each item.tags as tag}
									<span class="tag">{tag}</span>
								{/each}
							</div>
						</div>
						<div class="card-image">
							<img
								src={item.image}
								alt={item.title}
								loading="lazy"
							/>
							<div class="image-hover">
								<a
									href={item.image}
									target="_blank"
									class="view-link"
								>
									<i class="bx bx-expand"></i>
									View
								</a>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.journey {
		background: var(--bg-color);
		position: relative;
		overflow: hidden;
	}

	.journey::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(
				ellipse 50% 40% at 80% 20%,
				rgba(99, 102, 241, 0.08),
				transparent
			),
			radial-gradient(
				ellipse 60% 50% at 20% 80%,
				rgba(34, 211, 238, 0.06),
				transparent
			);
		pointer-events: none;
	}

	.container {
		max-width: 100rem;
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

	/* Timeline */
	.journey-timeline {
		display: flex;
		flex-direction: column;
		gap: 3.5rem;
		position: relative;
		padding-left: 4rem;
	}

	.journey-timeline::before {
		content: "";
		position: absolute;
		left: 1rem;
		top: 0;
		width: 2px;
		height: 100%;
		background: linear-gradient(
			180deg,
			var(--primary) 0%,
			var(--accent) 50%,
			transparent 100%
		);
		border-radius: 2px;
	}

	/* Card */
	.journey-card {
		position: relative;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border-color);
		border-radius: 1.5rem;
		overflow: hidden;
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.journey-card::before {
		content: "";
		position: absolute;
		left: -3.5rem;
		top: 2.5rem;
		width: 1.4rem;
		height: 1.4rem;
		background: var(--primary);
		border-radius: 50%;
		box-shadow: 0 0 0 4px rgba(255, 0, 85, 0.2),
			0 0 20px rgba(255, 0, 85, 0.3);
		z-index: 2;
		transition: all 0.3s ease;
	}

	.journey-card:hover::before {
		transform: scale(1.4);
		box-shadow: 0 0 0 6px rgba(255, 0, 85, 0.3),
			0 0 30px rgba(255, 0, 85, 0.4);
	}

	.journey-card:hover {
		border-color: rgba(255, 0, 85, 0.3);
		transform: translateX(8px);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3),
			0 0 60px rgba(255, 0, 85, 0.08);
	}

	.card-accent {
		height: 3px;
		background: var(--gradient-primary);
	}

	.card-body {
		display: flex;
		align-items: stretch;
		gap: 3rem;
		padding: 2.5rem;
	}

	.card-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 0;
	}

	.card-year {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--primary-light);
		background: rgba(255, 0, 85, 0.1);
		padding: 0.5rem 1.4rem;
		border-radius: 5rem;
		margin-bottom: 1.5rem;
		width: fit-content;
	}

	.card-year i {
		font-size: 1.4rem;
	}

	.card-title {
		font-size: 2rem;
		font-weight: 700;
		color: var(--white);
		margin-bottom: 1rem;
		line-height: 1.4;
	}

	.card-description {
		font-size: 1.4rem;
		color: var(--text-color);
		line-height: 1.8;
		margin-bottom: 1.5rem;
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
	}

	.tag {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--accent-secondary);
		background: rgba(168, 85, 247, 0.12);
		padding: 0.4rem 1.2rem;
		border-radius: 5rem;
		border: 1px solid rgba(168, 85, 247, 0.2);
		letter-spacing: 0.02em;
	}

	/* Image */
	.card-image {
		position: relative;
		width: 22rem;
		min-height: 16rem;
		flex-shrink: 0;
		border-radius: 1rem;
		overflow: hidden;
		border: 1px solid var(--border-color);
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	.journey-card:hover .card-image img {
		transform: scale(1.05);
	}

	.image-hover {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.card-image:hover .image-hover {
		opacity: 1;
	}

	.view-link {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.8rem 1.8rem;
		background: var(--gradient-primary);
		color: var(--white);
		border-radius: 5rem;
		font-size: 1.3rem;
		font-weight: 600;
		transition: transform 0.3s ease;
	}

	.view-link:hover {
		transform: scale(1.08);
	}

	.view-link i {
		font-size: 1.6rem;
	}

	/* Responsive */
	@media (max-width: 991px) {
		.journey {
			padding: 8rem 4%;
		}
	}

	@media (max-width: 768px) {
		.heading {
			font-size: 3.5rem;
		}

		.card-body {
			flex-direction: column;
		}

		.card-image {
			width: 100%;
			min-height: 20rem;
		}

		.card-title {
			font-size: 1.8rem;
		}

		.journey-timeline {
			padding-left: 3rem;
		}

		.journey-card::before {
			left: -2.5rem;
			width: 1.2rem;
			height: 1.2rem;
		}
	}

	@media (max-width: 520px) {
		.heading {
			font-size: 3rem;
		}

		.card-body {
			padding: 2rem;
		}

		.card-image {
			min-height: 16rem;
		}

		.card-title {
			font-size: 1.6rem;
		}

		.card-description {
			font-size: 1.3rem;
		}

		.journey-timeline {
			padding-left: 2.5rem;
		}

		.journey-timeline::before {
			left: 0.8rem;
		}

		.journey-card::before {
			left: -2.2rem;
			width: 1rem;
			height: 1rem;
		}
	}
</style>
