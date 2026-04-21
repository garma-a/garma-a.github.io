<script>
	import { base } from "$app/paths";

	export let codeforcesUrl =
		"https://codeforces.com/profile/GIRGIS_EMAD_";
	export let leetcodeUrl = "https://leetcode.com/u/Hard-Work/";
	export let neetcodeUrl = "https://neetcode.io/practice";

	export let skillCategories = [
		{
			title: "Backend",
			icon: "bx-server",
			highlight: true,
			skills: [
				{ name: "Node.js", icon: "bxl-nodejs" },
				{ name: "Express", icon: "bx-network-chart" },
				{ name: "NestJS", icon: "bx-layer" },
				{ name: "Go", icon: "bxl-go-lang" },
			],
		},
		{
			title: "Databases",
			icon: "bx-data",
			skills: [
				{ name: "PostgreSQL", icon: "bxl-postgresql" },
				{ name: "MongoDB", icon: "bxl-mongodb" },
				{ name: "Redis", icon: "bx-memory-card" },
				{ name: "Prisma", icon: "bx-diamond" },
				{ name: "Drizzle", icon: "bx-droplet" },
			],
		},
		{
			title: "DevOps & Tools",
			icon: "bx-cog",
			skills: [
				{ name: "Docker", icon: "bxl-docker" },
				{ name: "CI/CD", icon: "bx-git-merge" },
				{ name: "Linux", icon: "bx-terminal" },
				{ name: "Bash", icon: "bx-code-block" },
				{ name: "Nginx", icon: "bx-server" },
				{ name: "Git", icon: "bxl-git" },
			],
		},
	];

	let cpStats = [
		{
			platform: "Codeforces",
			count: "443",
			label: "problems solved",
			url: codeforcesUrl,
			color: "#22d3ee",
			icon: "bx-code",
		},
		{
			platform: "LeetCode",
			count: "131",
			label: "problems solved",
			url: leetcodeUrl,
			color: "#fbbf24",
			icon: "bx-code-curly",
		},
		{
			platform: "NeetCode 150",
			count: "5×",
			label: "completed all 150",
			url: neetcodeUrl,
			color: "#a855f7",
			icon: "bx-brain",
		},
	];
</script>

<section class="skills scroll-reveal" id="skills">
	<div class="container">
		<h2 class="heading">My <span>Skills</span></h2>
		<p class="section-subtitle">
			Deep problem-solving ability meets backend engineering expertise
		</p>

		<!-- ═══ DSA & Competitive Programming ═══ -->
		<div class="dsa-section scroll-reveal-child">
			<div class="dsa-header">
				<div class="dsa-icon-wrap">
					<i class="bx bx-brain"></i>
				</div>
				<div>
					<h3>Algorithm & Data Structure Mastery</h3>
					<p>
						Completed the <strong>NeetCode 150</strong> more
						than <strong>5 times</strong> to manually master
						every algorithm and data structure pattern.
					</p>
				</div>
			</div>

			<div class="cp-stats">
				{#each cpStats as stat}
					<a
						href={stat.url}
						target="_blank"
						class="cp-card"
						style="--accent: {stat.color}"
					>
						<div class="cp-card-top">
							<i class="bx {stat.icon}"></i>
							<span class="cp-platform"
								>{stat.platform}</span
							>
						</div>
						<div class="cp-count">{stat.count}</div>
						<div class="cp-label">{stat.label}</div>
					</a>
				{/each}
			</div>
		</div>

		<!-- ═══ Beautiful Mention - API Design ═══ -->
		<div class="api-card scroll-reveal-child">
			<div class="api-glow"></div>
			<div class="api-content">
				<div class="api-badge">
					<i class="bx bx-star"></i>
					Complete Backend Expertise
				</div>
				<h3>Full API Design & Backend Architecture</h3>
				<p>
					End-to-end experience building production-ready
					APIs — from database schema design to
					authentication flows, middleware architecture, and
					deployment. Proficient in the complete backend
					lifecycle.
				</p>
				<div class="api-tech-grid">
					{#each ["Express.js", "NestJS", "Prisma", "MongoDB", "PostgreSQL", "JWT", "Authorization", "Docker", "CI/CD", "Redis"] as tech}
						<span class="api-tech">{tech}</span>
					{/each}
				</div>
			</div>
		</div>

		<!-- ═══ Tech Stack Grid ═══ -->
		<div class="skills-grid">
			{#each skillCategories as category}
				<div
					class="skill-category scroll-reveal-child"
					class:highlighted={category.highlight}
					class:secondary={category.secondary}
				>
					<div class="category-header">
						<i class="bx {category.icon}"></i>
						<h3>{category.title}</h3>
						{#if category.highlight}
							<span class="primary-badge"
								>Primary</span
							>
						{/if}
					</div>
					<div class="skills-icons">
						{#each category.skills as skill}
							<div
								class="skill-item"
								title={skill.name}
							>
								<div class="skill-icon">
									<i
										class="bx {skill.icon}"
									></i>
								</div>
								<span class="skill-name"
									>{skill.name}</span
								>
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
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(
				ellipse 50% 40% at 10% 50%,
				rgba(168, 85, 247, 0.08),
				transparent
			),
			radial-gradient(
				ellipse 60% 50% at 90% 30%,
				rgba(34, 211, 238, 0.06),
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

	/* ═══ DSA Section ═══ */
	.dsa-section {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border-color);
		border-radius: 2rem;
		padding: 3.5rem;
		margin-bottom: 3rem;
	}

	.dsa-header {
		display: flex;
		align-items: flex-start;
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.dsa-icon-wrap {
		width: 6rem;
		height: 6rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(168, 85, 247, 0.15);
		border-radius: 1.5rem;
		flex-shrink: 0;
	}

	.dsa-icon-wrap i {
		font-size: 3rem;
		color: var(--accent-secondary);
	}

	.dsa-header h3 {
		font-size: 2.2rem;
		font-weight: 700;
		color: var(--white);
		margin-bottom: 0.8rem;
	}

	.dsa-header p {
		font-size: 1.5rem;
		color: var(--text-color);
		line-height: 1.7;
	}

	.dsa-header p strong {
		color: var(--accent-secondary);
	}

	/* CP Stats Cards */
	.cp-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}

	.cp-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border-color);
		border-radius: 1.5rem;
		padding: 2.5rem;
		text-align: center;
		transition: all 0.4s ease;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.cp-card::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 3px;
		background: var(--accent);
		opacity: 0.5;
	}

	.cp-card:hover {
		border-color: var(--accent);
		transform: translateY(-5px);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3),
			0 0 30px color-mix(in srgb, var(--accent) 15%, transparent);
	}

	.cp-card-top {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.8rem;
		margin-bottom: 1.5rem;
	}

	.cp-card-top i {
		font-size: 2rem;
		color: var(--accent);
	}

	.cp-platform {
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--text-color);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.cp-count {
		font-size: 4rem;
		font-weight: 800;
		color: var(--accent);
		line-height: 1;
		margin-bottom: 0.5rem;
	}

	.cp-label {
		font-size: 1.3rem;
		color: var(--text-muted);
	}

	/* ═══ API Design Beautiful Mention ═══ */
	.api-card {
		position: relative;
		background: linear-gradient(
			135deg,
			rgba(255, 0, 85, 0.08) 0%,
			rgba(112, 0, 255, 0.08) 50%,
			rgba(168, 85, 247, 0.08) 100%
		);
		border: 1px solid rgba(255, 0, 85, 0.2);
		border-radius: 2rem;
		padding: 4rem;
		margin-bottom: 4rem;
		overflow: hidden;
		transition: all 0.4s ease;
	}

	.api-card:hover {
		border-color: rgba(255, 0, 85, 0.4);
		box-shadow: 0 0 60px rgba(255, 0, 85, 0.1),
			0 0 120px rgba(112, 0, 255, 0.05);
	}

	.api-glow {
		position: absolute;
		top: -50%;
		right: -20%;
		width: 40rem;
		height: 40rem;
		background: radial-gradient(
			circle,
			rgba(255, 0, 85, 0.12) 0%,
			transparent 70%
		);
		pointer-events: none;
		animation: glowPulse 6s ease-in-out infinite;
	}

	@keyframes glowPulse {
		0%,
		100% {
			opacity: 0.5;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.1);
		}
	}

	.api-content {
		position: relative;
		z-index: 2;
	}

	.api-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--primary-light);
		background: rgba(255, 0, 85, 0.15);
		padding: 0.6rem 1.6rem;
		border-radius: 5rem;
		margin-bottom: 2rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.api-badge i {
		font-size: 1.4rem;
	}

	.api-content h3 {
		font-size: 2.8rem;
		font-weight: 700;
		color: var(--white);
		margin-bottom: 1.5rem;
		line-height: 1.3;
	}

	.api-content p {
		font-size: 1.6rem;
		color: var(--text-color);
		line-height: 1.8;
		margin-bottom: 2.5rem;
		max-width: 70rem;
	}

	.api-tech-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.api-tech {
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--white);
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.12);
		padding: 0.7rem 1.6rem;
		border-radius: 5rem;
		transition: all 0.3s ease;
	}

	.api-tech:hover {
		background: rgba(255, 0, 85, 0.15);
		border-color: var(--primary);
		transform: translateY(-2px);
	}

	/* ═══ Skills Grid ═══ */
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2.5rem;
	}

	.skill-category {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border-color);
		border-radius: 1.5rem;
		padding: 2.5rem;
		transition: all 0.4s ease;
	}

	.skill-category.highlighted {
		border-color: rgba(255, 0, 85, 0.3);
		background: rgba(255, 0, 85, 0.03);
	}

	.skill-category.secondary {
		opacity: 0.7;
	}

	.skill-category:hover {
		background: rgba(99, 102, 241, 0.03);
		border-color: rgba(99, 102, 241, 0.2);
		transform: translateY(-5px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
		opacity: 1;
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
		flex: 1;
	}

	.primary-badge {
		font-size: 1rem;
		font-weight: 700;
		color: var(--primary-light);
		background: rgba(255, 0, 85, 0.15);
		padding: 0.3rem 1rem;
		border-radius: 5rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
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

	/* ═══ Responsive ═══ */
	@media (max-width: 1200px) {
		.skills-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 991px) {
		.skills {
			padding: 8rem 4%;
		}

		.cp-stats {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 768px) {
		.heading {
			font-size: 3.5rem;
		}

		.skills-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.cp-stats {
			grid-template-columns: 1fr;
		}

		.dsa-header {
			flex-direction: column;
		}

		.api-content h3 {
			font-size: 2.2rem;
		}

		.api-card {
			padding: 3rem 2rem;
		}

		.skill-category {
			padding: 2rem;
		}

		.skills-icons {
			grid-template-columns: repeat(
				auto-fill,
				minmax(6rem, 1fr)
			);
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

	@media (max-width: 520px) {
		.heading {
			font-size: 3rem;
		}

		.dsa-section {
			padding: 2.5rem 2rem;
		}

		.dsa-header h3 {
			font-size: 1.8rem;
		}

		.cp-count {
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
