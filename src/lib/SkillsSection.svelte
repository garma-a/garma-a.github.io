<script>
	import { base } from "$app/paths";
	import { onMount } from "svelte";

	export let codeforcesUrl = "https://codeforces.com/profile/GIRGIS_EMAD_";
	export let leetcodeUrl = "https://leetcode.com/u/Hard-Work/";
	export let neetcodeUrl = "https://neetcode.io/practice";

	let cpStats = [
		{
			platform: "Codeforces",
			count: "443+",
			label: "problems solved",
			url: codeforcesUrl,
			color: "#22d3ee",
			icon: "bx-code",
		},
		{
			platform: "LeetCode",
			count: "250+",
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

	// Graph State
	let canvasElement;
	let graphContainer;
	let hoveredNode = null;
	
	// Graph Data aligned with the CV
	const N = [
		// Languages
		{id:'js',       name:'JavaScript',  ab:['JS'],         x:.15, y:.85, c:'#eab308', cat:'Language',   d:'Built REST APIs and full-stack apps with vanilla JS and Node.js.',                   d2:'Primary language for backend services and server-side logic.'},
		{id:'ts',       name:'TypeScript',  ab:['TS'],         x:.30, y:.85, c:'#eab308', cat:'Language',   d:'Used TypeScript across NestJS and Next.js projects for type safety.',                 d2:'Enforced strict typing in DTOs, service layers, and API contracts.'},
		{id:'go',       name:'Golang',      ab:['Go'],         x:.45, y:.85, c:'#eab308', cat:'Language',   d:'Built a full Redis clone from scratch — TCP server, RESP parser, in-memory store.',   d2:'Leveraged goroutines, channels, and sync.RWMutex for concurrency.'},
		{id:'sql',      name:'SQL',         ab:['SQL'],        x:.60, y:.85, c:'#eab308', cat:'Language',   d:'Wrote complex queries for QC reporting, analytics, and data aggregation.',            d2:'Designed relational schemas with constraints, indexes, and migrations.'},
		{id:'linux',    name:'Linux',       ab:['Linux'],      x:.75, y:.85, c:'#eab308', cat:'OS/Tool',    d:'Daily driver for development — scripting, server admin, and Docker hosting.',         d2:'Configured Ubuntu servers for production deployments on EC2.'},
		{id:'git',      name:'Git/GitHub',  ab:['Git'],        x:.90, y:.85, c:'#eab308', cat:'Tool',       d:'Version control for all projects with branching, PRs, and CI/CD pipelines.',          d2:'Maintained clean commit history and collaborative workflows.'},

		// Backend
		{id:'node',     name:'Node.js',     ab:['Node.js'],    x:.22, y:.60, c:'#a855f7', cat:'Backend',    d:'Core runtime for all backend services — Express, NestJS, and custom servers.',        d2:'Built production APIs handling auth, RBAC, and real-time features.'},
		{id:'express',  name:'Express.js',  ab:['Express'],    x:.10, y:.40, c:'#a855f7', cat:'Backend',    d:'Built the QC System backend with middleware chains and route handlers.',              d2:'Implemented JWT auth, error handling, and file upload pipelines.'},
		{id:'nest',     name:'NestJS',      ab:['NestJS'],     x:.30, y:.40, c:'#a855f7', cat:'Backend',    d:'Enterprise-grade APIs with modules, guards, interceptors, and Swagger docs.',         d2:'Used decorators and dependency injection for clean architecture.'},

		// Databases & ORM
		{id:'mongo',    name:'MongoDB',     ab:['MongoDB'],    x:.40, y:.60, c:'#3b82f6', cat:'Database',   d:'Used for flexible document storage in early projects and prototyping.',                d2:'Designed schemas with Mongoose for user profiles and sessions.'},
		{id:'pg',       name:'PostgreSQL',  ab:['Postgres'],   x:.60, y:.60, c:'#3b82f6', cat:'Database',   d:'Primary database for QC System — complex joins, views, and constraints.',             d2:'Handled multi-table relations with foreign keys and indexes.'},
		{id:'redis',    name:'Redis',       ab:['Redis'],      x:.45, y:.40, c:'#3b82f6', cat:'Database',   d:'Built RedisGo clone from scratch; used Redis for caching in production APIs.',        d2:'Implemented SET/GET with TTL, lists with BLPOP, and streams.'},
		{id:'prisma',   name:'Prisma',      ab:['Prisma'],     x:.20, y:.20, c:'#3b82f6', cat:'ORM',        d:'Type-safe database access in NestJS and Express projects.',                           d2:'Used schema-first approach with migrations and generated types.'},
		{id:'drizzle',  name:'Drizzle ORM', ab:['Drizzle'],    x:.35, y:.20, c:'#3b82f6', cat:'ORM',        d:'Lightweight ORM for Next.js full-stack apps with edge compatibility.',                 d2:'Preferred for serverless deployments due to small bundle size.'},

		// Frontend
		{id:'react',    name:'React.js',    ab:['React'],      x:.80, y:.60, c:'#06b6d4', cat:'Frontend',   d:'Built interactive dashboards and admin panels with component architecture.',          d2:'Used hooks, context, and state management for complex UIs.'},
		{id:'nextjs',   name:'Next.js',     ab:['Next.js'],    x:.80, y:.40, c:'#06b6d4', cat:'Frontend',   d:'Full-stack React framework for SSR, API routes, and static generation.',              d2:'Built SprintSync AI dashboard with real-time Kanban boards.'},
		{id:'tailwind', name:'Tailwind',    ab:['Tailwind'],   x:.92, y:.60, c:'#06b6d4', cat:'Frontend',   d:'Utility-first styling for rapid UI development across React projects.',               d2:'Used for responsive layouts and dark mode implementations.'},

		// DevOps & Cloud
		{id:'docker',   name:'Docker',      ab:['Docker'],     x:.55, y:.20, c:'#f43f5e', cat:'DevOps',     d:'Containerized Node.js and Go services with multi-stage builds.',                      d2:'Created docker-compose setups for local dev with Postgres + Redis.'},
		{id:'aws',      name:'AWS EC2',     ab:['AWS', 'EC2'], x:.70, y:.20, c:'#f43f5e', cat:'Cloud',      d:'Deployed production APIs on EC2 with Nginx reverse proxy and SSL.',                   d2:'Managed security groups, SSH access, and instance scaling.'},
		{id:'supabase', name:'Supabase',    ab:['Supabase'],   x:.85, y:.20, c:'#f43f5e', cat:'BaaS',       d:'Backend-as-a-service for auth, real-time DB, and row-level security.',                 d2:'Used for the AASTMT Booking System with role-based access.'},
	];

	const L = [
		{f:'js', t:'node'}, {f:'js', t:'react'}, {f:'ts', t:'node'}, {f:'ts', t:'react'}, 
		{f:'node', t:'express'}, {f:'node', t:'nest'}, {f:'ts', t:'nest'},
		{f:'node', t:'mongo'}, {f:'node', t:'redis'}, {f:'go', t:'redis'},
		{f:'sql', t:'pg'}, {f:'pg', t:'prisma'}, {f:'pg', t:'drizzle'},
		{f:'express', t:'prisma'}, {f:'nest', t:'prisma'}, {f:'nest', t:'drizzle'},
		{f:'react', t:'nextjs'}, {f:'tailwind', t:'nextjs'},
		{f:'pg', t:'supabase'}, {f:'node', t:'docker'}, {f:'go', t:'docker'}, 
		{f:'linux', t:'docker'}, {f:'docker', t:'aws'}, {f:'git', t:'aws'}
	];

	onMount(() => {
		let W, H, dpr, reqFrame;
		let currentHover = null;
		
		function setup() {
			if (!canvasElement || !graphContainer) return;
			dpr = window.devicePixelRatio || 1;
			W = graphContainer.getBoundingClientRect().width;
			H = Math.min(500, Math.max(350, W * 0.55));
			canvasElement.style.width = W + 'px';
			canvasElement.style.height = H + 'px';
			canvasElement.width = W * dpr;
			canvasElement.height = H * dpr;
			canvasElement.getContext('2d').scale(dpr, dpr);
		}

		function qp(x1, y1, cx, cy, x2, y2, t) {
			const m = 1 - t;
			return {
				x: m * m * x1 + 2 * m * t * cx + t * t * x2,
				y: m * m * y1 + 2 * m * t * cy + t * t * y2
			};
		}

		function draw() {
			if (!canvasElement) return;
			const ctx = canvasElement.getContext('2d');
			const t = Date.now() * 0.001;
			ctx.clearRect(0, 0, W, H);

			L.forEach((lk, i) => {
				const fn = N.find(n => n.id === lk.f);
				const tn = N.find(n => n.id === lk.t);
				if (!fn || !tn) return;
				
				const x1 = fn.x * W, y1 = fn.y * H, x2 = tn.x * W, y2 = tn.y * H;
				const cx = (x1 + x2) / 2, cy = Math.min(y1, y2) - 30;
				const hl = currentHover === lk.f || currentHover === lk.t;

				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.quadraticCurveTo(cx, cy, x2, y2);
				ctx.strokeStyle = hl ? fn.c + 'AA' : 'rgba(168, 85, 247, 0.15)';
				ctx.lineWidth = hl ? 2 : 0.8;
				ctx.stroke();

				// Particles along the paths
				const tp = ((t * 0.2 + i * 0.21) % 1);
				const dp = qp(x1, y1, cx, cy, x2, y2, tp);
				ctx.beginPath();
				ctx.arc(dp.x, dp.y, hl ? 3.5 : 1.5, 0, Math.PI * 2);
				ctx.fillStyle = hl ? fn.c : 'rgba(168, 85, 247, 0.4)';
				ctx.fill();
				if (hl) {
					ctx.beginPath();
					ctx.arc(dp.x, dp.y, 8, 0, Math.PI * 2);
					ctx.fillStyle = fn.c + '33';
					ctx.fill();
				}
			});

			N.forEach(nd => {
				const x = nd.x * W, y = nd.y * H;
				const r = W < 600 ? 18 : 24;
				const hl = currentHover === nd.id;

				if (hl) {
					const grad = ctx.createRadialGradient(x, y, 0, x, y, r + 15);
					grad.addColorStop(0, nd.c + '44');
					grad.addColorStop(1, nd.c + '00');
					ctx.beginPath();
					ctx.arc(x, y, r + 15, 0, Math.PI * 2);
					ctx.fillStyle = grad;
					ctx.fill();
				}

				ctx.beginPath();
				ctx.arc(x, y, r, 0, Math.PI * 2);
				ctx.fillStyle = hl ? nd.c + '22' : 'rgba(15, 23, 42, 0.8)';
				ctx.fill();
				
				ctx.beginPath();
				ctx.arc(x, y, r, 0, Math.PI * 2);
				ctx.strokeStyle = hl ? nd.c : 'rgba(255, 255, 255, 0.1)';
				ctx.lineWidth = hl ? 2 : 1;
				ctx.stroke();

				ctx.fillStyle = hl ? '#ffffff' : 'rgba(255, 255, 255, 0.8)';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.font = `${hl ? '600' : '400'} ${W < 600 ? 9 : 11}px "Segoe UI", sans-serif`;

				const lines = nd.ab;
				const lh = W < 600 ? 10 : 13;
				const off = (lines.length - 1) * lh / 2;
				lines.forEach((l, i) => ctx.fillText(l, x, y - off + i * lh));

				if (hl) {
					ctx.fillStyle = nd.c + '99';
					ctx.font = `400 ${W < 600 ? 7 : 9}px "Segoe UI", sans-serif`;
					ctx.fillText('●', x, y + r + 8);
				}
			});

			reqFrame = requestAnimationFrame(draw);
		}

		function handleMouseMove(e) {
			const rect = canvasElement.getBoundingClientRect();
			const mx = e.clientX - rect.left;
			const my = e.clientY - rect.top;
			const rNode = W < 600 ? 18 : 24;
			
			let found = null;
			for (const nd of N) {
				if (Math.hypot(mx - nd.x * W, my - nd.y * H) < rNode + 5) {
					found = nd;
					break;
				}
			}
			
			currentHover = found ? found.id : null;
			hoveredNode = found;
			canvasElement.style.cursor = found ? 'pointer' : 'crosshair';
		}

		function handleMouseLeave() {
			currentHover = null;
			hoveredNode = null;
		}

		setup();
		draw();

		canvasElement.addEventListener('mousemove', handleMouseMove);
		canvasElement.addEventListener('mouseleave', handleMouseLeave);
		window.addEventListener('resize', () => {
			setup();
		});

		return () => {
			cancelAnimationFrame(reqFrame);
			if (canvasElement) {
				canvasElement.removeEventListener('mousemove', handleMouseMove);
				canvasElement.removeEventListener('mouseleave', handleMouseLeave);
			}
			window.removeEventListener('resize', setup);
		};
	});

	$: requiresNodes = hoveredNode ? L.filter(l => l.t === hoveredNode.id).map(l => N.find(n => n.id === l.f)) : [];
	$: unlocksNodes = hoveredNode ? L.filter(l => l.f === hoveredNode.id).map(l => N.find(n => n.id === l.t)) : [];

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
						every algorithm and data structure pattern. Over <strong>700+</strong> problems solved.
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
					{#each ["Node.js", "Express.js", "NestJS", "Golang", "Prisma", "MongoDB", "PostgreSQL", "JWT/RBAC", "Docker", "AWS EC2"] as tech}
						<span class="api-tech">{tech}</span>
					{/each}
				</div>
			</div>
		</div>

		<!-- ═══ Interactive Graph ═══ -->
		<div class="graph-section scroll-reveal-child">
			<div class="graph-header">
				<div class="graph-title-area">
					<p class="graph-overline">Software Engineer</p>
					<h3 class="graph-title">Tech Stack Graph</h3>
				</div>
				<div class="graph-legend">
					<span class="legend-item"><span class="dot" style="background:#eab308"></span>Languages</span>
					<span class="legend-item"><span class="dot" style="background:#a855f7"></span>Backend</span>
					<span class="legend-item"><span class="dot" style="background:#3b82f6"></span>Databases</span>
					<span class="legend-item"><span class="dot" style="background:#06b6d4"></span>Frontend</span>
					<span class="legend-item"><span class="dot" style="background:#f43f5e"></span>DevOps</span>
				</div>
			</div>

			<div class="canvas-container" bind:this={graphContainer}>
				<canvas bind:this={canvasElement}></canvas>
			</div>

			<div class="graph-details">
				{#if !hoveredNode}
					<p class="graph-msg">Hover a node to explore connections</p>
				{:else}
					<div class="details-panel">
						<div class="details-main">
							<div class="details-top">
								<span class="node-name" style="color: {hoveredNode.c}">{hoveredNode.name}</span>
								<span class="node-cat" style="color: {hoveredNode.c}; border-color: {hoveredNode.c}40; background: {hoveredNode.c}15">{hoveredNode.cat}</span>
							</div>
							<p class="node-desc">{hoveredNode.d}</p>
							<p class="node-desc-2">{hoveredNode.d2}</p>
						</div>
						<div class="details-sidebar">
							<div class="relations-group">
								<span class="rel-title">Requires</span>
								<div class="rel-tags">
									{#if requiresNodes.length === 0}
										<span class="rel-empty">—</span>
									{:else}
										{#each requiresNodes as rn}
											<span class="rel-tag" style="color: {rn.c}; border-color: {rn.c}40; background: {rn.c}10">{rn.name}</span>
										{/each}
									{/if}
								</div>
							</div>
							<div class="relations-group">
								<span class="rel-title">Unlocks</span>
								<div class="rel-tags">
									{#if unlocksNodes.length === 0}
										<span class="rel-empty">—</span>
									{:else}
										{#each unlocksNodes as un}
											<span class="rel-tag" style="color: {un.c}; border-color: {un.c}40; background: {un.c}10">{un.name}</span>
										{/each}
									{/if}
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>

	</div>
</section>

<style>
	.skills {
		background: var(--sec-bg-color);
		position: relative;
		overflow: hidden;
		padding-bottom: 6rem;
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
		text-decoration: none;
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
			rgba(34, 211, 238, 0.08) 0%,
			rgba(168, 85, 247, 0.08) 50%,
			rgba(59, 130, 246, 0.08) 100%
		);
		border: 1px solid rgba(168, 85, 247, 0.2);
		border-radius: 2rem;
		padding: 4rem;
		margin-bottom: 4rem;
		overflow: hidden;
		transition: all 0.4s ease;
	}

	.api-card:hover {
		border-color: rgba(168, 85, 247, 0.4);
		box-shadow: 0 0 60px rgba(34, 211, 238, 0.1),
			0 0 120px rgba(168, 85, 247, 0.1);
	}

	.api-glow {
		position: absolute;
		top: -50%;
		right: -20%;
		width: 40rem;
		height: 40rem;
		background: radial-gradient(
			circle,
			rgba(168, 85, 247, 0.15) 0%,
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
		color: #e879f9;
		background: rgba(168, 85, 247, 0.15);
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
		background: rgba(168, 85, 247, 0.15);
		border-color: #e879f9;
		transform: translateY(-2px);
	}

	/* ═══ Graph Section ═══ */
	.graph-section {
		background: rgba(15, 23, 42, 0.6);
		border: 1px solid var(--border-color);
		border-radius: 2rem;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
	}

	.graph-header {
		padding: 2rem 2.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		flex-wrap: wrap;
		gap: 1.5rem;
	}

	.graph-title-area {
		display: flex;
		flex-direction: column;
	}

	.graph-overline {
		font-size: 1.1rem;
		letter-spacing: 0.2em;
		color: var(--text-muted);
		text-transform: uppercase;
		margin: 0 0 0.4rem;
	}

	.graph-title {
		color: var(--white);
		font-size: 1.8rem;
		font-weight: 600;
		margin: 0;
	}

	.graph-legend {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 1.2rem;
		color: var(--text-color);
		letter-spacing: 0.05em;
	}

	.legend-item .dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		display: inline-block;
	}

	.canvas-container {
		width: 100%;
		position: relative;
		background: radial-gradient(circle at center, rgba(30, 41, 59, 0.5) 0%, transparent 100%);
	}

	canvas {
		display: block;
		width: 100%;
		outline: none;
	}

	.graph-details {
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		padding: 2rem 2.5rem;
		min-height: 12rem;
		background: rgba(15, 23, 42, 0.8);
	}

	.graph-msg {
		color: var(--text-muted);
		font-size: 1.4rem;
		text-align: center;
		padding: 3rem 0;
		margin: 0;
	}

	.details-panel {
		display: flex;
		gap: 3rem;
		align-items: flex-start;
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(5px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.details-main {
		flex: 1;
		min-width: 0;
	}

	.details-top {
		display: flex;
		align-items: center;
		gap: 1.2rem;
		margin-bottom: 1rem;
	}

	.node-name {
		font-size: 2rem;
		font-weight: 600;
	}

	.node-cat {
		font-size: 1.1rem;
		padding: 0.3rem 1.2rem;
		border-radius: 5rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		border: 1px solid;
	}

	.node-desc {
		font-size: 1.4rem;
		color: var(--text-color);
		margin: 0 0 0.6rem;
		line-height: 1.6;
	}

	.node-desc-2 {
		font-size: 1.3rem;
		color: var(--text-muted);
		margin: 0;
		line-height: 1.6;
		font-style: italic;
	}

	.details-sidebar {
		width: 22rem;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.relations-group {
		display: flex;
		flex-direction: column;
	}

	.rel-title {
		font-size: 1.1rem;
		color: var(--text-muted);
		margin: 0 0 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.rel-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	.rel-tag {
		font-size: 1.1rem;
		padding: 0.3rem 1rem;
		border-radius: 5rem;
		border: 1px solid;
		font-weight: 500;
	}

	.rel-empty {
		font-size: 1.2rem;
		color: var(--text-muted);
	}

	/* ═══ Responsive ═══ */
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
		
		.details-panel {
			flex-direction: column;
			gap: 2rem;
		}
		
		.details-sidebar {
			width: 100%;
			flex-direction: row;
			gap: 2rem;
		}
		
		.relations-group {
			flex: 1;
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

		.graph-header {
			padding: 1.5rem;
		}
		
		.graph-details {
			padding: 1.5rem;
		}

		.details-sidebar {
			flex-direction: column;
			gap: 1.5rem;
		}
	}
</style>