<script>
	export let copyrightText = '© 2026 Girgis Emad. All Rights Reserved.';
</script>

<footer class="footer" id="contact">
	<div class="footer-container">
		<div class="footer-content">
			<div class="footer-brand">
				<a href="#home" class="footer-logo">GARMA</a>
				<p>Full Stack Web Developer passionate about creating impactful digital solutions.</p>
			</div>
			
			<div class="footer-links">
				<h4>Quick Links</h4>
				<nav>
					<a href="#home">Home</a>
					<a href="#about">About</a>
					<a href="#education">Journey</a>
					<a href="#skills">Skills</a>
				</nav>
			</div>

			<div class="footer-contact">
				<h4>Get In Touch</h4>
				<div class="contact-info">
					<a href="mailto:girgisemad74@gmail.com">
						<i class='bx bx-envelope'></i>
						girgisemad74@gmail.com
					</a>
					<a href="https://github.com/GARMA-A" target="_blank">
						<i class='bx bxl-github'></i>
						GitHub
					</a>
					<a href="https://www.linkedin.com/in/girgis-emad-garma-96943a258/" target="_blank">
						<i class='bx bxl-linkedin'></i>
						LinkedIn
					</a>
				</div>
			</div>
		</div>

		<div class="footer-bottom">
			<p>{copyrightText}</p>
			<a href="#home" class="scroll-top" aria-label="Scroll to top">
				<i class='bx bx-chevron-up'></i>
			</a>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--bg-color);
		padding: 6rem 9% 2rem;
		position: relative;
	}

	.footer::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--primary), var(--accent), transparent);
	}

	.footer-container {
		max-width: 120rem;
		margin: 0 auto;
	}

	.footer-content {
		display: grid;
		grid-template-columns: 2fr 1fr 1.5fr;
		gap: 4rem;
		padding-bottom: 4rem;
		border-bottom: 1px solid var(--border-color);
	}

	.footer-brand {
		max-width: 35rem;
	}

	.footer-logo {
		font-size: 3rem;
		font-weight: 700;
		background: var(--gradient-primary);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		display: inline-block;
		margin-bottom: 1.5rem;
	}

	.footer-brand p {
		font-size: 1.5rem;
		color: var(--text-color);
		line-height: 1.8;
	}

	.footer-links h4,
	.footer-contact h4 {
		font-size: 1.8rem;
		font-weight: 600;
		color: var(--white);
		margin-bottom: 2rem;
	}

	.footer-links nav {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	.footer-links nav a {
		font-size: 1.5rem;
		color: var(--text-color);
		transition: all 0.3s ease;
	}

	.footer-links nav a:hover {
		color: var(--primary-light);
		transform: translateX(5px);
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	.contact-info a {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 1.5rem;
		color: var(--text-color);
		transition: all 0.3s ease;
	}

	.contact-info a i {
		font-size: 2rem;
		color: var(--primary-light);
	}

	.contact-info a:hover {
		color: var(--primary-light);
	}

	.footer-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 2rem;
	}

	.footer-bottom p {
		font-size: 1.4rem;
		color: var(--text-muted);
	}

	.scroll-top {
		width: 4.5rem;
		height: 4.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(99, 102, 241, 0.1);
		border: 1px solid var(--primary);
		border-radius: 50%;
		transition: all 0.3s ease;
	}

	.scroll-top i {
		font-size: 2.4rem;
		color: var(--primary-light);
		transition: all 0.3s ease;
	}

	.scroll-top:hover {
		background: var(--primary);
		transform: translateY(-5px);
		box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
	}

	.scroll-top:hover i {
		color: var(--white);
	}

	/* Mobile responsiveness */
	@media(max-width: 991px) {
		.footer {
			padding: 6rem 4% 2rem;
		}

		.footer-content {
			grid-template-columns: 1fr 1fr;
		}

		.footer-brand {
			grid-column: span 2;
		}
	}

	@media(max-width: 768px) {
		.footer-content {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.footer-brand {
			grid-column: auto;
			text-align: center;
			max-width: none;
		}

		.footer-links,
		.footer-contact {
			text-align: center;
		}

		.footer-links nav,
		.contact-info {
			align-items: center;
		}

		.footer-bottom {
			flex-direction: column-reverse;
			gap: 2rem;
			text-align: center;
		}
	}

	@media(max-width: 520px) {
		.footer-logo {
			font-size: 2.5rem;
		}

		.footer-brand p {
			font-size: 1.4rem;
		}
	}
</style>
