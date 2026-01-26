<script>
	import { base } from '$app/paths';

	export let achievements = [
		{
			image: `${base}/imgs/magdiYacoubCertificate.png`,
			title: 'Full Stack Developer - Magdi Yacoub Heart Foundation',
			description: 'Completed professional training and development work at Magdi Yacoub Heart Foundation, one of Egypt\'s leading healthcare institutions. Contributed to building web applications for healthcare management systems.',
			year: '2024'
		},
		{
			image: `${base}/imgs/ITIDA_NTI_certificate.png`,
			title: 'Full Stack Web Development - NTI & ITIDA',
			description: 'Intensive full-stack web development program by the National Telecommunication Institute (NTI) and Information Technology Industry Development Agency (ITIDA). Mastered modern web technologies including React, Next.js, Node.js, NestJS, and database management.',
			year: '2025'
		},
		{
			image: `${base}/imgs/ApiDesignv4Certificate.png`,
			title: 'API Design Professional Certificate',
			description: 'Earned professional certification in RESTful API design, covering best practices for building scalable, secure, and well-documented APIs. Learned industry standards for API versioning, authentication, and documentation.',
			year: '2025'
		},
		{
			image: `${base}/imgs/GoogleUIUXCertificate1.png`,
			title: 'Google UX Design Professional Certificate',
			description: 'Completed Google\'s comprehensive UX Design course on Coursera. Learned the foundations of UX design, including user research, wireframing, prototyping, and usability testing. Mastered industry-standard tools like Figma.',
			year: '2021'
		},
		{
			image: `${base}/imgs/GoogleUIUXCertificate2.png`,
			title: 'Google UI Design Specialization',
			description: 'Advanced UI design certification from Google covering visual design principles, design systems, responsive design, and creating high-fidelity mockups. Applied design thinking methodologies to real-world projects.',
			year: '2021'
		},
		{
			image: `${base}/imgs/GDSGCertificate.png`,
			title: 'Google Developer Student Club',
			description: 'Active member and contributor at Google Developer Student Club (GDSC). Participated in workshops, hackathons, and collaborative projects focusing on Google technologies and modern development practices.',
			year: '2024'
		},
		{
			image: `${base}/imgs/ICPCCertificate.png`,
			title: 'ICPC Competitive Programming',
			description: 'Participated in the International Collegiate Programming Contest (ICPC), one of the most prestigious programming competitions worldwide. Demonstrated strong problem-solving skills and algorithmic thinking.',
			year: '2024'
		}
	];

	export let stats = [
		{
			icon: 'bx-code-alt',
			number: '500+',
			label: 'Problems Solved',
			description: 'LeetCode & Codeforces'
		},
		{
			icon: 'bx-git-branch',
			number: '10+',
			label: 'Projects Built',
			description: 'Full Stack Applications'
		},
		{
			icon: 'bx-server',
			number: '15+',
			label: 'APIs Designed',
			description: 'RESTful Services'
		},
		{
			icon: 'bx-trophy',
			number: '7+',
			label: 'Certificates',
			description: 'Professional Training'
		}
	];

	export let allCertificatesUrl = 'https://docs.google.com/document/d/1UFKDcUgKgdAGvXF_iDyX_5ImvwMhxF0QYllSwsUHT8o/edit?usp=sharing';
	export let codeforcesUrl = 'https://codeforces.com/profile/GIRGIS_EMAD_';
	export let leetcodeUrl = 'https://leetcode.com/u/Hard-Work/';
</script>

<section class="achievements" id="achievements">
	<div class="container">
		<h2 class="heading">My <span>Achievements</span></h2>
		<p class="section-subtitle">Certifications, competitions, and milestones in my journey</p>

		<!-- Stats Grid -->
		<div class="stats-grid">
			{#each stats as stat}
				<div class="stat-card">
					<div class="stat-icon">
						<i class='bx {stat.icon}'></i>
					</div>
					<div class="stat-info">
						<span class="stat-number">{stat.number}</span>
						<span class="stat-label">{stat.label}</span>
						<span class="stat-desc">{stat.description}</span>
					</div>
				</div>
			{/each}
		</div>

		<!-- Certificates Grid -->
		<h3 class="sub-heading">
			<i class='bx bx-medal'></i>
			Certificates & Recognition
		</h3>
		
		<div class="certificates-grid">
			{#each achievements as achievement, index}
				<div class="certificate-card" style="--delay: {index * 0.1}s">
					<div class="certificate-image">
						<img src={achievement.image} alt={achievement.title}>
						<div class="image-overlay">
							<a href={achievement.image} target="_blank" class="view-btn">
								<i class='bx bx-expand'></i>
								View Certificate
							</a>
						</div>
					</div>
					<div class="certificate-content">
						<span class="certificate-year">
							<i class='bx bx-calendar'></i>
							{achievement.year}
						</span>
						<h4>{achievement.title}</h4>
						<p>{achievement.description}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- View All Certificates Button -->
		<div class="view-all-section">
			<a href={allCertificatesUrl} target="_blank" class="view-all-btn">
				<i class='bx bx-link-external'></i>
				View All Certificates in High Quality
			</a>
			<p class="view-all-desc">See all my certificates with detailed descriptions on Google Docs</p>
		</div>

		<!-- Competitive Programming Section -->
		<div class="competitive-section">
			<div class="competitive-content">
				<div class="competitive-icon">
					<i class='bx bx-code-block'></i>
				</div>
				<div class="competitive-text">
					<h3>Competitive Programming</h3>
					<p>Solved <strong>500+ problems</strong> on platforms like <strong>Codeforces</strong> and <strong>LeetCode</strong>. Continuously improving algorithmic thinking, data structures knowledge, and problem-solving speed.</p>
					<div class="platform-badges">
						<a href={codeforcesUrl} target="_blank" class="platform-badge">
							<i class='bx bx-code'></i> Codeforces
						</a>
						<a href={leetcodeUrl} target="_blank" class="platform-badge">
							<i class='bx bx-code-curly'></i> LeetCode
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.achievements {
		background: var(--bg-color);
		position: relative;
		overflow: hidden;
	}

	.achievements::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: 
			radial-gradient(ellipse 50% 40% at 80% 20%, rgba(99, 102, 241, 0.08), transparent),
			radial-gradient(ellipse 60% 50% at 20% 80%, rgba(34, 211, 238, 0.06), transparent);
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

	/* Stats Grid */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
		margin-bottom: 6rem;
	}

	.stat-card {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border-color);
		border-radius: 1.5rem;
		padding: 2.5rem;
		text-align: center;
		transition: all 0.4s ease;
	}

	.stat-card:hover {
		background: rgba(99, 102, 241, 0.05);
		border-color: var(--primary);
		transform: translateY(-5px);
		box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
	}

	.stat-icon {
		width: 6rem;
		height: 6rem;
		margin: 0 auto 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(99, 102, 241, 0.1);
		border-radius: 50%;
	}

	.stat-icon i {
		font-size: 3rem;
		color: var(--primary-light);
	}

	.stat-info {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.stat-number {
		font-size: 3rem;
		font-weight: 700;
		background: var(--gradient-primary);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.stat-label {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--white);
	}

	.stat-desc {
		font-size: 1.2rem;
		color: var(--text-muted);
	}

	/* Sub Heading */
	.sub-heading {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		font-size: 2.4rem;
		font-weight: 600;
		color: var(--white);
		margin-bottom: 4rem;
	}

	.sub-heading i {
		font-size: 3rem;
		color: var(--accent);
	}

	/* Certificates Grid */
	.certificates-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 3rem;
		margin-bottom: 5rem;
	}

	.certificate-card {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border-color);
		border-radius: 1.5rem;
		overflow: hidden;
		transition: all 0.4s ease;
		animation: fadeInUp 0.6s ease forwards;
		animation-delay: var(--delay);
	}

	.certificate-card:hover {
		border-color: rgba(99, 102, 241, 0.3);
		transform: translateY(-5px);
		box-shadow: var(--shadow-lg);
	}

	.certificate-image {
		position: relative;
		overflow: hidden;
		aspect-ratio: 4/3;
	}

	.certificate-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease;
	}

	.certificate-card:hover .certificate-image img {
		transform: scale(1.05);
	}

	.image-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.certificate-card:hover .image-overlay {
		opacity: 1;
	}

	.view-btn {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 1rem 2rem;
		background: var(--primary);
		color: var(--white);
		border-radius: 5rem;
		font-size: 1.4rem;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.view-btn:hover {
		background: var(--primary-light);
		transform: scale(1.05);
	}

	.view-btn i {
		font-size: 1.8rem;
	}

	.certificate-content {
		padding: 2.5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.certificate-year {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.3rem;
		color: var(--primary-light);
		background: rgba(99, 102, 241, 0.1);
		padding: 0.5rem 1.2rem;
		border-radius: 5rem;
		margin-bottom: 1.5rem;
		width: fit-content;
	}

	.certificate-year i {
		font-size: 1.4rem;
	}

	.certificate-content h4 {
		font-size: 1.8rem;
		font-weight: 600;
		color: var(--white);
		margin-bottom: 1rem;
		line-height: 1.4;
	}

	.certificate-content p {
		font-size: 1.4rem;
		color: var(--text-color);
		line-height: 1.7;
	}

	/* View All Certificates Section */
	.view-all-section {
		text-align: center;
		margin-bottom: 5rem;
		padding: 3rem;
		background: rgba(99, 102, 241, 0.05);
		border: 1px dashed rgba(99, 102, 241, 0.3);
		border-radius: 1.5rem;
	}

	.view-all-btn {
		display: inline-flex;
		align-items: center;
		gap: 1rem;
		padding: 1.5rem 3.5rem;
		background: var(--gradient-primary);
		color: var(--white);
		border-radius: 5rem;
		font-size: 1.6rem;
		font-weight: 600;
		transition: all 0.4s ease;
		box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
	}

	.view-all-btn:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
	}

	.view-all-btn i {
		font-size: 2rem;
	}

	.view-all-desc {
		margin-top: 1.5rem;
		font-size: 1.4rem;
		color: var(--text-muted);
	}

	/* Competitive Programming Section */
	.competitive-section {
		background: var(--gradient-card);
		border: 1px solid var(--border-color);
		border-radius: 2rem;
		padding: 4rem;
		margin-top: 2rem;
	}

	.competitive-content {
		display: flex;
		align-items: center;
		gap: 3rem;
	}

	.competitive-icon {
		width: 10rem;
		height: 10rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(99, 102, 241, 0.15);
		border-radius: 50%;
		flex-shrink: 0;
	}

	.competitive-icon i {
		font-size: 5rem;
		color: var(--primary-light);
	}

	.competitive-text h3 {
		font-size: 2.4rem;
		font-weight: 600;
		color: var(--white);
		margin-bottom: 1.5rem;
	}

	.competitive-text p {
		font-size: 1.6rem;
		color: var(--text-color);
		line-height: 1.8;
		margin-bottom: 2rem;
	}

	.competitive-text p strong {
		color: var(--primary-light);
	}

	.platform-badges {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.platform-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.8rem;
		padding: 1rem 2rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--border-color);
		border-radius: 5rem;
		font-size: 1.4rem;
		color: var(--white);
		transition: all 0.3s ease;
	}

	.platform-badge:hover {
		background: rgba(99, 102, 241, 0.1);
		border-color: var(--primary);
		transform: translateY(-3px);
	}

	.platform-badge i {
		font-size: 1.8rem;
		color: var(--accent);
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

	/* Mobile Responsiveness */
	@media(max-width: 991px) {
		.achievements {
			padding: 8rem 4%;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.certificates-grid {
			grid-template-columns: 1fr;
		}

		.certificate-card {
			grid-template-columns: 1fr;
		}

		.certificate-image {
			aspect-ratio: 16/9;
		}

		.competitive-content {
			flex-direction: column;
			text-align: center;
		}

		.platform-badges {
			justify-content: center;
		}
	}

	@media(max-width: 768px) {
		.heading {
			font-size: 3.5rem;
		}

		.stats-grid {
			gap: 1.5rem;
		}

		.stat-card {
			padding: 2rem;
		}

		.stat-number {
			font-size: 2.4rem;
		}

		.stat-icon {
			width: 5rem;
			height: 5rem;
		}

		.stat-icon i {
			font-size: 2.4rem;
		}

		.competitive-section {
			padding: 3rem 2rem;
		}

		.competitive-icon {
			width: 8rem;
			height: 8rem;
		}

		.competitive-icon i {
			font-size: 4rem;
		}
	}

	@media(max-width: 520px) {
		.heading {
			font-size: 3rem;
		}

		.stats-grid {
			grid-template-columns: 1fr;
			max-width: 30rem;
			margin: 0 auto 5rem;
		}

		.sub-heading {
			font-size: 2rem;
		}

		.certificate-content h4 {
			font-size: 1.6rem;
		}

		.certificate-content p {
			font-size: 1.3rem;
		}

		.competitive-text h3 {
			font-size: 2rem;
		}

		.competitive-text p {
			font-size: 1.4rem;
		}
	}
</style>
