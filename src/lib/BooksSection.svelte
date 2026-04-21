<script>
	import { base } from '$app/paths';

	export let books = [
		{
			image: `${base}/imgs/AlexanderShvets-DiveIntoDesignPatterns(2019)BookCover.jpg`,
			title: 'Dive Into Design Patterns',
			author: 'Alexander Shvets',
		},
		{
			image: `${base}/imgs/unitTestsBookCover.jpeg`,
			title: 'Unit Testing',
			author: 'Vladimir Khorikov',
		},
		{
			image: `${base}/imgs/theGoProgrammingLanguageBook_.jpg`,
			title: 'The Go Programming Language',
			author: 'Donovan & Kernighan',
		},
		{
			image: `${base}/imgs/theRustProgramminLanguageBookCover.jpg`,
			title: 'The Rust Programming Language',
			author: 'Klabnik & Nichols',
		}
	];
</script>

<section class="books scroll-reveal" id="books">
	<div class="container">
		<h2 class="heading">Books I <span>Recommend</span></h2>

		<div class="books-grid">
			{#each books as book, index}
				<div class="book-card scroll-reveal-child" style="--delay: {index * 0.1}s">
					<div class="book-cover">
						<img src={book.image} alt={book.title} loading="lazy">
						<div class="book-overlay">
							<i class='bx bx-book-open'></i>
						</div>
					</div>
					<div class="book-info">
						<h3 class="book-title">{book.title}</h3>
						<span class="book-author">{book.author}</span>
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
		min-height: auto;
		padding: 6rem 9% 6rem;
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
		max-width: 80rem;
		width: 100%;
		margin: 0 auto;
		position: relative;
		z-index: 2;
	}

	.heading {
		font-size: 3.5rem;
		font-weight: 700;
		text-align: center;
		margin-bottom: 3rem;
		color: var(--white);
	}

	.heading span {
		background: var(--gradient-primary);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* 2x2 Grid */
	.books-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
	}

	.book-card {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border-color);
		border-radius: 1.2rem;
		padding: 1.5rem;
		transition: all 0.4s ease;
	}

	.book-card:hover {
		background: rgba(99, 102, 241, 0.05);
		border-color: rgba(99, 102, 241, 0.3);
		transform: translateY(-3px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
	}

	.book-cover {
		position: relative;
		width: 8rem;
		flex-shrink: 0;
		border-radius: 0.8rem;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
		inset: 0;
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
		font-size: 2.5rem;
		color: var(--white);
	}

	.book-info {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		min-width: 0;
	}

	.book-title {
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--white);
		line-height: 1.3;
	}

	.book-author {
		font-size: 1.2rem;
		color: var(--text-muted);
	}

	/* Responsive */
	@media(max-width: 768px) {
		.books {
			padding: 5rem 4%;
		}

		.heading {
			font-size: 3rem;
		}

		.books-grid {
			grid-template-columns: 1fr;
		}
	}

	@media(max-width: 520px) {
		.heading {
			font-size: 2.5rem;
		}

		.book-cover {
			width: 6.5rem;
		}

		.book-title {
			font-size: 1.3rem;
		}
	}
</style>
