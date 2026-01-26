<script>
	export let educationData = [
		{
			year: '2022 - 2026',
			title: 'B.Sc. Computing & Information Technology',
			description: 'Arab Academy for Science, Technology and Maritime Transport (AAST) - Aswan Branch'
		},
		{
			year: '2020 - 2021',
			title: 'UI/UX Design Certificate - Google',
			description: 'Completed 230 hours online course mastering UI/UX design principles using Figma'
		},
		{
			year: '2025',
			title: 'API Design Certificate',
			description: 'Professional certification in RESTful API design and best practices'
		}
	];

	export let experienceData = [
		{
			year: '2025',
			title: 'Full Stack Developer - Magdi Yacoub Heart Center',
			description: 'Developed web applications for healthcare management systems, contributing to the digital transformation of medical services'
		},
		{
			year: '2025',
			title: 'Full Stack Developer - NTI & ITIDA',
			description: 'Worked on national technology initiatives in Egypt, building scalable web solutions for government and enterprise clients'
		},
		{
			year: '2022 - 2024',
			title: 'Freelance Web Developer',
			description: 'Built full-stack applications using React, Next.js, NestJS, and Express with Docker for deployment. Projects available on GitHub'
		}
	];
</script>

<section class="education" id="education">
	<div class="container">
		<h2 class="heading">My <span>Journey</span></h2>

		<div class="education-row">
			<div class="education-column">
				<div class="column-header">
					<i class='bx bxs-graduation'></i>
					<h3>Education</h3>
				</div>

				<div class="timeline">
					{#each educationData as item, index}
						<div class="timeline-item" style="--delay: {index * 0.1}s">
							<div class="timeline-dot"></div>
							<div class="timeline-content">
								<span class="year">
									<i class='bx bx-calendar'></i>
									{item.year}
								</span>
								<h4>{item.title}</h4>
								<p>{item.description}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="education-column">
				<div class="column-header">
					<i class='bx bxs-briefcase'></i>
					<h3>Experience</h3>
				</div>

				<div class="timeline">
					{#each experienceData as item, index}
						<div class="timeline-item" style="--delay: {index * 0.1}s">
							<div class="timeline-dot"></div>
							<div class="timeline-content">
								<span class="year">
									<i class='bx bx-calendar'></i>
									{item.year}
								</span>
								<h4>{item.title}</h4>
								<p>{item.description}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.education {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		background: var(--bg-color);
		position: relative;
	}

	.education::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: 
			radial-gradient(ellipse 60% 40% at 80% 20%, rgba(34, 211, 238, 0.06), transparent),
			radial-gradient(ellipse 50% 50% at 20% 80%, rgba(99, 102, 241, 0.08), transparent);
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
		margin-bottom: 6rem;
		color: var(--white);
	}

	.heading span {
		background: var(--gradient-primary);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.education-row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 5rem;
	}

	.education-column {
		position: relative;
	}

	.column-header {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 3rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border-color);
	}

	.column-header i {
		font-size: 3rem;
		color: var(--primary-light);
		background: rgba(99, 102, 241, 0.1);
		padding: 1rem;
		border-radius: 1rem;
	}

	.column-header h3 {
		font-size: 2.4rem;
		font-weight: 600;
		color: var(--white);
	}

	.timeline {
		position: relative;
		padding-left: 3rem;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 2px;
		height: 100%;
		background: linear-gradient(180deg, var(--primary) 0%, var(--accent) 100%);
		border-radius: 2px;
	}

	.timeline-item {
		position: relative;
		margin-bottom: 3rem;
		animation: fadeInUp 0.6s ease forwards;
		animation-delay: var(--delay);
	}

	.timeline-dot {
		position: absolute;
		left: -3.5rem;
		top: 0.5rem;
		width: 1.2rem;
		height: 1.2rem;
		background: var(--primary);
		border-radius: 50%;
		box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
		transition: all 0.3s ease;
	}

	.timeline-item:hover .timeline-dot {
		transform: scale(1.3);
		box-shadow: 0 0 0 8px rgba(99, 102, 241, 0.2);
	}

	.timeline-content {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border-color);
		border-radius: 1.5rem;
		padding: 2.5rem;
		transition: all 0.4s ease;
	}

	.timeline-content:hover {
		background: rgba(99, 102, 241, 0.05);
		border-color: rgba(99, 102, 241, 0.3);
		transform: translateX(10px);
		box-shadow: var(--shadow-md);
	}

	.year {
		display: inline-flex;
		align-items: center;
		gap: 0.8rem;
		font-size: 1.3rem;
		font-weight: 500;
		color: var(--primary-light);
		background: rgba(99, 102, 241, 0.1);
		padding: 0.5rem 1.2rem;
		border-radius: 5rem;
		margin-bottom: 1.5rem;
	}

	.year i {
		font-size: 1.4rem;
	}

	.timeline-content h4 {
		font-size: 1.8rem;
		font-weight: 600;
		color: var(--white);
		margin-bottom: 1rem;
		line-height: 1.4;
	}

	.timeline-content p {
		font-size: 1.5rem;
		color: var(--text-color);
		line-height: 1.7;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Mobile responsiveness */
	@media(max-width: 991px) {
		.education {
			padding: 8rem 4%;
		}

		.education-row {
			grid-template-columns: 1fr;
			gap: 4rem;
		}
	}

	@media(max-width: 768px) {
		.heading {
			font-size: 3.5rem;
		}

		.column-header h3 {
			font-size: 2rem;
		}

		.timeline-content h4 {
			font-size: 1.6rem;
		}

		.timeline-content p {
			font-size: 1.4rem;
		}
	}

	@media(max-width: 520px) {
		.heading {
			font-size: 3rem;
		}

		.timeline {
			padding-left: 2.5rem;
		}

		.timeline-dot {
			left: -3rem;
			width: 1rem;
			height: 1rem;
		}

		.timeline-content {
			padding: 2rem;
		}
	}
</style>