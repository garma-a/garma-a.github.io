<script>
	export let skillCategories = [
		{
			title: 'Frontend',
			icon: 'bx-palette',
			skills: [
				{ name: 'HTML', icon: 'bxl-html5' },
				{ name: 'CSS', icon: 'bxl-css3' },
				{ name: 'React', icon: 'bxl-react' },
				{ name: 'Next.js', icon: 'bx-right-arrow-circle' },
				{ name: 'TailwindCSS', icon: 'bxl-tailwind-css' },
				{ name: 'MUI', icon: 'bx-square-rounded' },
				{ name: 'shadcn/ui', icon: 'bx-cube' }
			]
		},
		{
			title: 'Backend',
			icon: 'bx-server',
			skills: [
				{ name: 'Node.js', icon: 'bxl-nodejs' },
				{ name: 'Express', icon: 'bx-network-chart' },
				{ name: 'NestJS', icon: 'bx-layer' },
				{ name: 'Python', icon: 'bxl-python' },
				{ name: 'Flask', icon: 'bxs-flask' }
			]
		},
		{
			title: 'Databases',
			icon: 'bx-data',
			skills: [
				{ name: 'PostgreSQL', icon: 'bxl-postgresql' },
				{ name: 'MySQL', icon: 'bx-table' },
				{ name: 'MongoDB', icon: 'bxl-mongodb' },
				{ name: 'Redis', icon: 'bx-memory-card' },
				{ name: 'Prisma', icon: 'bx-diamond' },
				{ name: 'Drizzle', icon: 'bx-droplet' }
			]
		},
		{
			title: 'DevOps & Tools',
			icon: 'bx-cog',
			skills: [
				{ name: 'Docker', icon: 'bxl-docker' },
				{ name: 'Linux', icon: 'bx-terminal' },
				{ name: 'Bash', icon: 'bx-code-block' },
				{ name: 'Nginx', icon: 'bx-server' },
				{ name: 'Git', icon: 'bxl-git' },
				{ name: 'Vim', icon: 'bx-edit' }
			]
		},
		{
			title: 'Architecture & Design',
			icon: 'bx-sitemap',
			skills: [
				{ name: 'Design Patterns', icon: 'bx-shape-polygon' },
				{ name: 'System Design', icon: 'bx-git-repo-forked' },
				{ name: 'Load Balancer', icon: 'bx-transfer-alt' },
				{ name: 'API Design', icon: 'bx-plug' }
			]
		},
		{
			title: 'Networking & Security',
			icon: 'bx-shield-quarter',
			skills: [
				{ name: 'Networking', icon: 'bx-globe' },
				{ name: 'Security', icon: 'bx-lock-alt' },
				{ name: 'HTTPS/SSL', icon: 'bx-certification' },
				{ name: 'Authentication', icon: 'bx-key' }
			]
		}
	];
</script>

<section class="skills" id="skills">
	<div class="container">
		<h2 class="heading">My <span>Skills</span></h2>
		<p class="section-subtitle">Technologies and tools I work with</p>

		<div class="skills-grid">
			{#each skillCategories as category}
				<div class="skill-category">
					<div class="category-header">
						<i class='bx {category.icon}'></i>
						<h3>{category.title}</h3>
					</div>
					<div class="skills-icons">
						{#each category.skills as skill}
							<div class="skill-item" title={skill.name}>
								<div class="skill-icon">
									<i class='bx {skill.icon}'></i>
								</div>
								<span class="skill-name">{skill.name}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.skills {
		background: var(--sec-bg-color);
		position: relative;
		overflow: hidden;
	}

	.skills::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: 
			radial-gradient(ellipse 50% 40% at 10% 50%, rgba(168, 85, 247, 0.08), transparent),
			radial-gradient(ellipse 60% 50% at 90% 30%, rgba(34, 211, 238, 0.06), transparent);
		pointer-events: none;
	}

	.container {
		max-width: 130rem;
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

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3rem;
	}

	.skill-category {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border-color);
		border-radius: 1.5rem;
		padding: 2.5rem;
		transition: all 0.4s ease;
	}

	.skill-category:hover {
		background: rgba(99, 102, 241, 0.03);
		border-color: rgba(99, 102, 241, 0.2);
		transform: translateY(-5px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
	}

	.category-header {
		display: flex;
		align-items: center;
		gap: 1.2rem;
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border-color);
	}

	.category-header i {
		font-size: 2.8rem;
		color: var(--primary-light);
		background: rgba(99, 102, 241, 0.1);
		padding: 1rem;
		border-radius: 1rem;
	}

	.category-header h3 {
		font-size: 1.8rem;
		font-weight: 600;
		color: var(--white);
	}

	.skills-icons {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
		gap: 1.5rem;
	}

	.skill-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.8rem;
		padding: 1.2rem;
		border-radius: 1rem;
		transition: all 0.3s ease;
		cursor: default;
	}

	.skill-item:hover {
		background: rgba(99, 102, 241, 0.1);
	}

	.skill-item:hover .skill-icon {
		transform: scale(1.1);
		border-color: var(--primary);
		background: rgba(99, 102, 241, 0.15);
	}

	.skill-item:hover .skill-icon i {
		color: var(--primary-light);
	}

	.skill-icon {
		width: 5rem;
		height: 5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border-color);
		border-radius: 1rem;
		transition: all 0.3s ease;
	}

	.skill-icon i {
		font-size: 2.4rem;
		color: var(--text-color);
		transition: all 0.3s ease;
	}

	.skill-name {
		font-size: 1.2rem;
		color: var(--text-muted);
		text-align: center;
		font-weight: 500;
		transition: color 0.3s ease;
	}

	.skill-item:hover .skill-name {
		color: var(--white);
	}

	/* Mobile responsiveness */
	@media(max-width: 1200px) {
		.skills-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media(max-width: 991px) {
		.skills {
			padding: 8rem 4%;
		}
	}

	@media(max-width: 768px) {
		.heading {
			font-size: 3.5rem;
		}

		.skills-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.skill-category {
			padding: 2rem;
		}

		.skills-icons {
			grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
			gap: 1rem;
		}

		.skill-icon {
			width: 4.5rem;
			height: 4.5rem;
		}

		.skill-icon i {
			font-size: 2rem;
		}

		.skill-name {
			font-size: 1.1rem;
		}
	}

	@media(max-width: 520px) {
		.heading {
			font-size: 3rem;
		}

		.category-header h3 {
			font-size: 1.6rem;
		}

		.skills-icons {
			grid-template-columns: repeat(3, 1fr);
		}

		.skill-item {
			padding: 0.8rem;
		}

		.skill-icon {
			width: 4rem;
			height: 4rem;
		}

		.skill-icon i {
			font-size: 1.8rem;
		}

		.skill-name {
			font-size: 1rem;
		}
	}
</style>
