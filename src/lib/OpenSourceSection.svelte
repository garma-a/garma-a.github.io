<script>
	import { base } from "$app/paths";
	
	const repoName = "99 Repository — ThePrimeagen";
	const stars = "4.5K";
	const repoLink = "https://github.com/ThePrimeagen/99";
	const issueLink = "https://github.com/ThePrimeagen/99/issues/59";
	const prLink = "https://github.com/ThePrimeagen/99/pull/81";

	const dashboardImg = `${base}/imgs/openSourceContribution/repositoryHomePage.png`;
    const listImg = `${base}/imgs/openSourceContribution/my_name_on_top_10_contributors.png`;
</script>

<section class="opensource scroll-reveal" id="opensource">
	<div class="container">
		<h2 class="heading">Open Source <span>Contributions</span></h2>
		<p class="section-subtitle">
			Giving back to the community and making an impact
		</p>

		<div class="os-card scroll-reveal-child">
			<div class="glowing-border-anim"></div>
			<div class="glowing-blur-anim"></div>
			<div class="card-inner">
				<div class="images-container">
					<div class="img-wrapper">
						<img src={dashboardImg} alt="99 Repository Dashboard" loading="lazy" />
                        <div class="image-hover">
                            <a href={dashboardImg} target="_blank" class="view-link">
                                <i class="bx bx-expand"></i> View
                            </a>
                        </div>
					</div>
					<div class="img-wrapper list-img">
						<img src={listImg} alt="Top 10 Contributors" loading="lazy" />
                        <div class="image-hover">
                            <a href={listImg} target="_blank" class="view-link">
                                <i class="bx bx-expand"></i> View
                            </a>
                        </div>
					</div>
				</div>
                
				<div class="info-container">
					<div class="title-row">
						<h3>{repoName}</h3>
						<span class="stars"><i class='bx bxs-star'></i> {stars} Stars</span>
					</div>
					<a href={repoLink} target="_blank" class="repo-link">
                        <i class='bx bxl-github' ></i> View Repository
                    </a>
					
					<p class="description">
						This repository is called <strong>99</strong> and it is a Neovim IDE plugin written in Lua. The idea is to enable AI in the code editor but with high restriction so that you can run multiple AI prompts at once, focusing each prompt on a specific function or class. The AI models cannot edit anything outside the area you selected. The AI collects the current project context and performs requested edits within this specific range. It's a great tool to have full control over the AI model, requesting specific edits in specific areas of the codebase without the risk of unwanted changes.
					</p>

					<div class="buttons-container">
						<a href={prLink} target="_blank" class="btn primary-btn">
							<i class='bx bx-git-pull-request'></i> Merged Pull Request
						</a>
						<a href={issueLink} target="_blank" class="btn secondary-btn">
							<i class='bx bx-file'></i> Issue Documentation
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.opensource {
		background: var(--bg-color);
		position: relative;
		overflow: hidden;
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

	/* Card Wrapper & Glow */
	.os-card {
		position: relative;
		border-radius: 2rem;
		z-index: 1;
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        margin: 0 auto;
	}

	.card-inner {
		background: var(--sec-bg-color);
		border-radius: 2rem;
		overflow: hidden;
		position: relative;
		z-index: 2;
        display: flex;
        flex-direction: column;
	}

	.glowing-border-anim {
		position: absolute;
		inset: -2px;
		background: linear-gradient(
			90deg,
			#ff0055,
			#a855f7,
			#7000ff,
			#00d2ff,
			#ff0055,
			#a855f7
		);
		background-size: 500%;
		border-radius: 2.2rem;
		z-index: 0;
		animation: glowMove 8s linear infinite;
	}

	.glowing-blur-anim {
		position: absolute;
		inset: -2px;
		background: linear-gradient(
			90deg,
			#ff0055,
			#a855f7,
			#7000ff,
			#00d2ff,
			#ff0055,
			#a855f7
		);
		background-size: 500%;
		border-radius: 2.2rem;
		z-index: -1;
		animation: glowMove 8s linear infinite;
		filter: blur(8px);
		opacity: 0.3;
		transition: opacity 0.3s ease;
	}

	.os-card:hover .glowing-blur-anim {
		opacity: 0.5;
		filter: blur(12px);
	}

	@keyframes glowMove {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 500% 0;
		}
	}

    /* Images */
    .images-container {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: 2rem;
        padding: 2.5rem 2.5rem 0 2.5rem;
    }

    .img-wrapper {
        border-radius: 1rem;
        overflow: hidden;
        border: 1px solid var(--border-color);
        position: relative;
    }

    .img-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.5s ease;
    }

    .list-img {
        /* Maintain good aspect for the list */
    }

    .os-card:hover .img-wrapper img {
        transform: scale(1.03);
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

	.img-wrapper:hover .image-hover {
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

    /* Content */
    .info-container {
        padding: 3rem 2.5rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .title-row h3 {
        font-size: 2.4rem;
        font-weight: 700;
        color: var(--white);
    }

    .stars {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.4rem;
        font-weight: 600;
        color: #fbbf24;
        background: rgba(251, 191, 36, 0.1);
        padding: 0.5rem 1.5rem;
        border-radius: 5rem;
    }

    .stars i {
        font-size: 1.8rem;
    }

    .repo-link {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        font-size: 1.4rem;
        color: var(--primary-light);
        font-weight: 500;
        transition: color 0.3s ease;
        width: fit-content;
    }

    .repo-link:hover {
        color: var(--primary);
        text-decoration: underline;
    }

    .description {
        font-size: 1.5rem;
        color: var(--text-color);
        line-height: 1.8;
    }

    .description strong {
        color: var(--white);
    }

    /* Buttons */
    .buttons-container {
        display: flex;
        gap: 1.5rem;
        margin-top: 1.5rem;
        flex-wrap: wrap;
    }

    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
        padding: 1.2rem 2.5rem;
        border-radius: 5rem;
        font-size: 1.4rem;
        font-weight: 600;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .btn i {
        font-size: 1.8rem;
    }

    .primary-btn {
        background: var(--gradient-primary);
        color: var(--white);
        box-shadow: 0 4px 15px rgba(255, 0, 85, 0.3);
    }

    .primary-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(255, 0, 85, 0.4);
    }

    .secondary-btn {
        background: transparent;
        color: var(--white);
        border: 1px solid var(--border-color);
    }

    .secondary-btn:hover {
        border-color: var(--primary);
        color: var(--primary-light);
        transform: translateY(-3px);
    }

    @media (max-width: 900px) {
        .images-container {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 768px) {
        .heading {
            font-size: 3.5rem;
        }
        .title-row h3 {
            font-size: 2rem;
        }
        .buttons-container {
            flex-direction: column;
        }
        .btn {
            width: 100%;
        }
        .images-container {
            padding: 1.5rem 1.5rem 0 1.5rem;
        }
        .info-container {
            padding: 2rem 1.5rem;
        }
    }
</style>
