<script>
	import { base } from '$app/paths';

	export let books = [
		{
			image: `${base}/imgs/cleanCodeBookImage.png`,
			title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
			author: 'Robert C. Martin',
			description: 'A legendary book that revolutionized how I write code. Uncle Bob teaches the principles of writing clean, readable, and maintainable code that any developer can understand and work with.'
		},
		{
			image: `${base}/imgs/celanArchitectureBookCover(sameauthorOfCleanCodeBook).jpeg`,
			title: 'Clean Architecture: A Craftsman\'s Guide to Software Structure and Design',
			author: 'Robert C. Martin',
			description: 'Essential reading for building scalable systems. This book taught me how to design software architectures that are independent of frameworks, databases, and external agencies, making systems flexible and testable.'
		},
		{
			image: `${base}/imgs/AlexanderShvets-DiveIntoDesignPatterns(2019)BookCover.jpg`,
			title: 'Dive Into Design Patterns',
			author: 'Alexander Shvets',
			description: 'A comprehensive guide to software design patterns. This book helped me understand how to write more maintainable, scalable, and elegant code by applying proven solutions to common programming challenges.'
		},
		{
			image: `${base}/imgs/unitTestsBookCover.jpeg`,
			title: 'Unit Testing: Principles, Practices, and Patterns',
			author: 'Vladimir Khorikov',
			description: 'An essential resource for writing effective unit tests. This book transformed my approach to testing, teaching me how to write tests that provide real value and improve code quality.'
		},
		{
			image: `${base}/imgs/theGoProgrammingLanguageBook_.jpg`,
			title: 'The Go Programming Language',
			author: 'Alan A. A. Donovan & Brian W. Kernighan',
			description: 'The definitive guide to Go programming. This book taught me the fundamentals of Go, from its unique approach to concurrency to building robust and efficient applications.'
		},
		{
			image: `${base}/imgs/theRustProgramminLanguageBookCover.jpg`,
			title: 'The Rust Programming Language',
			author: 'Steve Klabnik & Carol Nichols',
			description: 'The official guide to Rust, covering everything from basic concepts to advanced features. This book taught me how to write safe, concurrent, and performant systems programming code.'
		}
	];
</script>

<section class="books" id="books">
	<div class="container">
		<h2 class="heading">Books I <span>Recommend</span></h2>
		<p class="section-subtitle">Essential reads that shaped my development journey</p>

		<div class="books-grid">
			{#each books as book, index}
				<div class="book-card" style="--delay: {index * 0.15}s">
					<div class="book-cover">
						<img src={book.image} alt={book.title}>
						<div class="book-overlay">
							<i class='bx bx-book-open'></i>
						</div>
					</div>
					<div class="book-content">
						<h3 class="book-title">{book.title}</h3>
						<span class="book-author">
							<i class='bx bx-user'></i>
							{book.author}
						</span>
						<p class="book-description">{book.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.books {
		background: var(--sec-bg-color);
		position: relative;
		overflow: hidden;
	}

	.books::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: 
			radial-gradient(ellipse 50% 40% at 20% 30%, rgba(99, 102, 241, 0.08), transparent),
			radial-gradient(ellipse 60% 50% at 80% 70%, rgba(168, 85, 247, 0.06), transparent);
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

	.books-grid {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.book-card {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 3rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border-color);
		border-radius: 1.5rem;
		padding: 2.5rem;
		transition: all 0.4s ease;
		animation: fadeInUp 0.6s ease forwards;
		animation-delay: var(--delay);
	}

	.book-card:hover {
		background: rgba(99, 102, 241, 0.05);
		border-color: rgba(99, 102, 241, 0.3);
		transform: translateY(-5px);
		box-shadow: var(--shadow-lg);
	}

	.book-cover {
		position: relative;
		width: 18rem;
		flex-shrink: 0;
		border-radius: 1rem;
		overflow: hidden;
		box-shadow: var(--shadow-md);
	}

	.book-cover img {
		width: 100%;
		height: auto;
		display: block;
		transition: transform 0.4s ease;
	}

	.book-card:hover .book-cover img {
		transform: scale(1.05);
	}

	.book-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(99, 102, 241, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.book-card:hover .book-overlay {
		opacity: 1;
	}

	.book-overlay i {
		font-size: 4rem;
		color: var(--white);
	}

	.book-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.book-title {
		font-size: 2.2rem;
		font-weight: 600;
		color: var(--white);
		margin-bottom: 1rem;
		line-height: 1.3;
	}

	.book-author {
		display: inline-flex;
		align-items: center;
		gap: 0.8rem;
		font-size: 1.4rem;
		color: var(--primary-light);
		margin-bottom: 1.5rem;
	}

	.book-author i {
		font-size: 1.6rem;
	}

	.book-description {
		font-size: 1.5rem;
		color: var(--text-color);
		line-height: 1.8;
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
		.books {
			padding: 8rem 4%;
		}
	}

	@media(max-width: 768px) {
		.heading {
			font-size: 3.5rem;
		}

		.book-card {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.book-cover {
			width: 16rem;
			margin: 0 auto;
		}

		.book-author {
			justify-content: center;
		}

		.book-description {
			font-size: 1.4rem;
		}
	}

	@media(max-width: 520px) {
		.heading {
			font-size: 3rem;
		}

		.book-card {
			padding: 2rem;
		}

		.book-cover {
			width: 14rem;
		}

		.book-title {
			font-size: 1.8rem;
		}

		.book-description {
			font-size: 1.3rem;
		}
	}
</style>
