<script>
	import { Portfolio } from "$lib";
	let title = "Garma | Girgis Emad - Backend Software Engineer";
	let description =
		"Portfolio of Garma (Girgis Emad), a Backend Software Engineer from Egypt specializing in NestJS, Express.js, PostgreSQL, Docker, Go, CI/CD, and API Design. Hire a skilled backend engineer for your next project.";
	let url = "https://garmaa.me";
	let imageUrl = "https://garmaa.me/fullLogo.svg";

	// SEO Keywords
	let keywords =
		"Garma, garma-a, Girgis Emad, Backend Software Engineer, Backend Developer, NestJS Developer, Express.js Developer, PostgreSQL, Docker, Go Developer, CI/CD, API Design, Node.js Developer, Software Engineer, Egypt Developer, System Design, garmaa.me";
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content="Girgis Emad (Garma)" />
	<meta name="robots" content="index, follow" />
	<meta name="googlebot" content="index, follow" />

	<!-- Additional SEO meta tags -->
	<meta name="subject" content="Backend Software Engineering Portfolio" />
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
	<meta property="og:image:alt" content="Garma - Backend Software Engineer" />
	<meta property="og:site_name" content="Garma Portfolio" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:image:alt" content="Garma - Backend Software Engineer" />
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
			"jobTitle": "Backend Software Engineer",
			"description": "Backend Software Engineer specializing in NestJS, Express.js, PostgreSQL, Docker, Go, and API Design",
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
				"NestJS",
				"Express.js",
				"PostgreSQL",
				"Docker",
				"Go",
				"CI/CD",
				"Node.js",
				"API Design",
				"System Design",
				"Backend Development",
				"MongoDB",
				"Redis",
				"Prisma"
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
			"name": "Garma | Backend Software Engineer Portfolio",
			"description": "Professional portfolio showcasing Backend Software Engineering work",
			"mainEntity": {
				"@id": "https://garmaa.me/#person"
			}
		}
	</script>`}
</svelte:head>

<Portfolio />
