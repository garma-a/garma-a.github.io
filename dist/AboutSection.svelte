<script>
	import { base } from "$app/paths";

	export let aboutImage = `${base}/imgs/myImage.jpg`;
	export let title = "Full Stack Web Developer";
	export let aboutText =
		"I'm a Full Stack Web Developer 👨‍💻 with professional experience at Magdi Yacoub Heart Center and NTI/ITIDA in Egypt. I graduated from the Faculty of Computing & Information Technology at Arab Academy Aswan. I'm passionate about building robust web applications and always pushing myself to grow 🔥 My goal is to create impactful solutions that make a difference 🌟";
</script>

<section class="about" id="about">
	<div class="container">
		<h2 class="heading">About <span>Me</span></h2>
		<div class="about-wrapper">
			<div class="about-img">
				<div class="img-container">
					<img src={aboutImage} alt="About me" />
					<div class="img-border"></div>
					<div class="img-glow"></div>
				</div>
			</div>

			<div class="about-content">
				<div class="about-badge">
					<i class="bx bx-code-alt"></i>
					<span>{title}</span>
				</div>
				<p>{aboutText}</p>
				<div class="about-stats">
					<div class="stat-item">
						<span class="stat-number"
							>2+</span
						>
						<span class="stat-label"
							>Years Experience</span
						>
					</div>
					<div class="stat-item">
						<span class="stat-number"
							>10+</span
						>
						<span class="stat-label"
							>Projects Completed</span
						>
					</div>
					<div class="stat-item">
						<span class="stat-number"
							>2</span
						>
						<span class="stat-label"
							>Companies Worked</span
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--sec-bg-color);
		position: relative;
		overflow: hidden;
	}

	.about::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(
				ellipse 50% 50% at 20% 20%,
				rgba(99, 102, 241, 0.08),
				transparent
			),
			radial-gradient(
				ellipse 40% 40% at 80% 80%,
				rgba(168, 85, 247, 0.06),
				transparent
			);
		pointer-events: none;
	}

	.container {
		max-width: 120rem;
		width: 100%;
		margin: 0 auto;
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

	.about-wrapper {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		gap: 6rem;
		align-items: center;
	}

	.about-img {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.img-container {
		position: relative;
		width: 30rem;
		height: 30rem;
	}

	.img-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 2rem;
		position: relative;
		z-index: 2;
	}

	.img-border {
		position: absolute;
		top: 2rem;
		left: 2rem;
		width: 100%;
		height: 100%;
		border: 3px solid var(--primary);
		border-radius: 2rem;
		z-index: 1;
		transition: all 0.4s ease;
	}

	.img-container:hover .img-border {
		top: 1rem;
		left: 1rem;
	}

	.img-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80%;
		height: 80%;
		background: var(--gradient-primary);
		filter: blur(60px);
		opacity: 0.3;
		z-index: 0;
	}

	.about-content {
		position: relative;
		z-index: 2;
	}

	.about-badge {
		display: inline-flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 2rem;
		background: rgba(99, 102, 241, 0.1);
		border: 1px solid rgba(99, 102, 241, 0.3);
		border-radius: 5rem;
		margin-bottom: 2rem;
	}

	.about-badge i {
		font-size: 2rem;
		color: var(--primary-light);
	}

	.about-badge span {
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--primary-light);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.about-content p {
		font-size: 1.7rem;
		line-height: 1.8;
		color: var(--text-color);
		margin-bottom: 4rem;
	}

	.about-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}

	.stat-item {
		text-align: center;
		padding: 2rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border-color);
		border-radius: 1.5rem;
		transition: all 0.3s ease;
	}

	.stat-item:hover {
		background: rgba(99, 102, 241, 0.05);
		border-color: var(--primary);
		transform: translateY(-5px);
	}

	.stat-number {
		display: block;
		font-size: 3.5rem;
		font-weight: 700;
		background: var(--gradient-primary);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 1.3rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Mobile responsiveness */
	@media (max-width: 991px) {
		.about {
			padding: 8rem 4%;
		}

		.about-wrapper {
			grid-template-columns: 1fr;
			gap: 4rem;
		}

		.img-container {
			width: 25rem;
			height: 25rem;
		}

		.about-content {
			text-align: center;
		}

		.about-stats {
			justify-content: center;
		}
	}

	@media (max-width: 768px) {
		.heading {
			font-size: 3.5rem;
		}

		.about-content p {
			font-size: 1.5rem;
		}

		.about-stats {
			grid-template-columns: 1fr;
			max-width: 30rem;
			margin: 0 auto;
		}
	}

	@media (max-width: 520px) {
		.heading {
			font-size: 3rem;
		}

		.img-container {
			width: 20rem;
			height: 20rem;
		}

		.stat-number {
			font-size: 2.8rem;
		}
	}
</style>
