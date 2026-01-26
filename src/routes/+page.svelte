<script>
	import { Portfolio } from "$lib";
	let title = "Garma | Girgis Emad - Full Stack Developer";
	let description =
		"Portfolio of Garma (Girgis Emad), a Full Stack Developer from Egypt specializing in React, Node.js, SvelteKit, Go, Rust and Modern Web Technologies. Hire a skilled developer for your next project.";
	let url = "https://garmaa.me";
	let imageUrl = "https://garmaa.me/og-image.jpg";

	// SEO Keywords
	let keywords =
		"Garma, garma-a, Girgis Emad, Full Stack Developer, Web Developer, React Developer, Node.js Developer, SvelteKit, Go Developer, Rust Developer, Egypt Developer, Frontend Developer, Backend Developer, Software Engineer, garmaa.me, Express.js Developer, Nest.je, Developer, python Developer, FastAPI Developer, Flask Developer";
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content="Girgis Emad (Garma)" />
	<meta name="robots" content="index, follow" />
	<meta name="googlebot" content="index, follow" />

	<!-- Additional SEO meta tags -->
	<meta name="subject" content="Full Stack Web Development Portfolio" />
	<meta name="copyright" content="Girgis Emad" />
	<meta name="language" content="EN" />
	<meta name="rating" content="General" />
	<meta name="revisit-after" content="7 days" />
	<meta name="distribution" content="Global" />

	<!-- Geo tags for Egypt -->
	<meta name="geo.region" content="EG" />
	<meta name="geo.country" content="Egypt" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:alt" content="Garma - Full Stack Developer" />
	<meta property="og:site_name" content="Garma Portfolio" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:image:alt" content="Garma - Full Stack Developer" />
	<meta name="twitter:creator" content="@garma" />

	<!-- Canonical URL -->
	<link rel="canonical" href={url} />

	<!-- Alternate language -->
	<link rel="alternate" hreflang="en" href={url} />
	<link rel="alternate" hreflang="x-default" href={url} />

	<!-- JSON-LD Structured Data - Person -->
	{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"@id": "https://garmaa.me/#person",
			"name": "Girgis Emad",
			"alternateName": ["Garma", "garma-a", "GARMA-A"],
			"url": "https://garmaa.me",
			"image": "https://garmaa.me/og-image.jpg",
			"jobTitle": "Full Stack Developer",
			"description": "Full Stack Developer specializing in React, Node.js, SvelteKit, Go, and Rust",
			"telephone": "+201278203355",
			"email": "girgisemad74@gmail.com",
			"address": {
				"@type": "PostalAddress",
				"addressCountry": "EG",
				"addressRegion": "Egypt"
			},
			"sameAs": [
				"https://github.com/GARMA-A",
				"https://www.linkedin.com/in/girgis-emad-garma-96943a258/",
				"https://www.instagram.com/girgisyt/"
			],
			"knowsAbout": [
				"JavaScript",
				"TypeScript",
				"React",
				"SvelteKit",
				"Node.js",
				"Go",
				"Rust",
				"Full Stack Development",
				"Web Development",
				"Frontend Development",
				"Backend Development",
				"API Design",
				"UI/UX Design"
			],
			"alumniOf": {
				"@type": "EducationalOrganization",
				"name": "Arab Academy for Science, Technology and Maritime Transport - Aswan"
			},
			"worksFor": [
				{
					"@type": "Organization",
					"name": "Magdi Yacoub Heart Center"
				},
				{
					"@type": "Organization",
					"name": "NTI/ITIDA"
				}
			]
		}
	</script>`}

	<!-- JSON-LD Structured Data - WebSite -->
	{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebSite",
			"@id": "https://garmaa.me/#website",
			"url": "https://garmaa.me",
			"name": "Garma Portfolio",
			"description": "Portfolio of Garma (Girgis Emad), a Full Stack Developer",
			"publisher": {
				"@id": "https://garmaa.me/#person"
			},
			"potentialAction": {
				"@type": "SearchAction",
				"target": "https://garmaa.me/?q={search_term_string}",
				"query-input": "required name=search_term_string"
			}
		}
	</script>`}

	<!-- JSON-LD Structured Data - ProfilePage -->
	{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "ProfilePage",
			"@id": "https://garmaa.me/#profilepage",
			"url": "https://garmaa.me",
			"name": "Garma | Full Stack Developer Portfolio",
			"description": "Professional portfolio showcasing Full Stack Development work",
			"mainEntity": {
				"@id": "https://garmaa.me/#person"
			}
		}
	</script>`}
</svelte:head>

<Portfolio />
