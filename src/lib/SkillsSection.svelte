<script>
	import { base } from "$app/paths";
	import { onMount } from "svelte";

	export let codeforcesUrl = "https://codeforces.com/profile/GIRGIS_EMAD_";
	export let leetcodeUrl = "https://leetcode.com/u/Hard-Work/";
	export let neetcodeUrl = "https://neetcode.io/practice";

	let cpStats = []; // Replaced by static image cards
	let expandedImage = null;

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
		{id:'pg',       name:'PostgreSQL',  ab:['Postgres'],   x:.50, y:.60, c:'#3b82f6', cat:'Database',   d:'Primary database for QC System — complex joins, views, and constraints.',             d2:'Handled multi-table relations with foreign keys and indexes.'},
		{id:'redis',    name:'Redis',       ab:['Redis'],      x:.40, y:.40, c:'#3b82f6', cat:'Database',   d:'Built RedisGo clone from scratch; used Redis for caching in production APIs.',        d2:'Implemented SET/GET with TTL, lists with BLPOP, and streams.'},
		{id:'drizzle',  name:'Drizzle ORM', ab:['Drizzle'],    x:.30, y:.20, c:'#3b82f6', cat:'ORM',        d:'Lightweight ORM for Next.js full-stack apps with edge compatibility.',                 d2:'Preferred for serverless deployments due to small bundle size.'},

		// Frontend
		{id:'nextjs',   name:'Next.js',     ab:['Next.js'],    x:.80, y:.40, c:'#06b6d4', cat:'Frontend',   d:'Full-stack React framework for SSR, API routes, and static generation.',              d2:'Built SprintSync AI dashboard with real-time Kanban boards.'},
		{id:'tailwind', name:'Tailwind',    ab:['Tailwind'],   x:.92, y:.60, c:'#06b6d4', cat:'Frontend',   d:'Utility-first styling for frontend UI development.',               d2:'Used for responsive layouts and dark mode implementations.'},

		// DevOps & Cloud
		{id:'docker',   name:'Docker',      ab:['Docker'],     x:.55, y:.20, c:'#f43f5e', cat:'DevOps',     d:'Containerized Node.js and Go services with multi-stage builds.',                      d2:'Created docker-compose setups for local dev with Postgres + Redis.'},
		{id:'aws',      name:'AWS EC2',     ab:['AWS', 'EC2'], x:.70, y:.20, c:'#f43f5e', cat:'Cloud',      d:'Deployed production APIs on EC2 with Nginx reverse proxy and SSL.',                   d2:'Managed security groups, SSH access, and instance scaling.'},
		{id:'supabase', name:'Supabase',    ab:['Supabase'],   x:.85, y:.20, c:'#f43f5e', cat:'BaaS',       d:'Backend-as-a-service for auth, real-time DB, and row-level security.',                 d2:'Used for the AASTMT Booking System with role-based access.'},
	];

	const L = [
		{f:'js', t:'node'}, {f:'ts', t:'node'}, {f:'ts', t:'nextjs'},
		{f:'node', t:'express'}, {f:'node', t:'nest'}, {f:'ts', t:'nest'},
		{f:'node', t:'redis'}, {f:'go', t:'redis'},
		{f:'sql', t:'pg'}, {f:'pg', t:'drizzle'},
		{f:'nest', t:'drizzle'},
		{f:'tailwind', t:'nextjs'},
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
						Consistently solving complex algorithmic challenges. Over <strong>680+</strong> problems solved across multiple platforms to manually master every coding pattern.
					</p>
				</div>
			</div>

			<div class="cp-stats vertical-layout">
				<!-- Codeforces -->
				<div class="cp-card vertical-card" style="--accent: #22d3ee">
                    <div class="cp-info-side">
                        <div class="cp-card-top">
                            <i class="bx bx-code"></i>
                            <a href={codeforcesUrl} target="_blank" class="cp-platform">Codeforces</a>
                        </div>
                        <div class="cp-count">443</div>
                        <div class="cp-label">Problems Solved</div>
                        <div class="cp-user"><a href={codeforcesUrl} target="_blank">@GIRGIS_EMAD_</a></div>
                    </div>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div class="cp-image-side" on:click={() => expandedImage = `${base}/imgs/Problem_solving/codeForces_solved_443_proplem.png`}>
                        <img src="{base}/imgs/Problem_solving/codeForces_solved_443_proplem.png" alt="Codeforces Stats" />
                        <div class="expand-overlay"><i class="bx bx-expand-alt"></i></div>
                    </div>
				</div>
				
                <!-- LeetCode -->
				<div class="cp-card vertical-card" style="--accent: #fbbf24">
                    <div class="cp-info-side">
                        <div class="cp-card-top">
                            <i class="bx bx-code-curly" style="color: #fbbf24"></i>
                            <a href={leetcodeUrl} target="_blank" class="cp-platform">LeetCode</a>
                        </div>
                        <div class="cp-count">131</div>
                        <div class="cp-label">Problems Solved (Python, JS, C++)</div>
                        <div class="cp-user"><a href={leetcodeUrl} target="_blank">@Hard-Work</a></div>
                    </div>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div class="cp-image-side" on:click={() => expandedImage = `${base}/imgs/Problem_solving/leetCode_Solved_131.png`}>
                        <img src="{base}/imgs/Problem_solving/leetCode_Solved_131.png" alt="LeetCode Stats" />
                        <div class="expand-overlay"><i class="bx bx-expand-alt"></i></div>
                    </div>
				</div>

                <!-- NeetCode 150 -->
				<div class="cp-card vertical-card" style="--accent: #a855f7">
                    <div class="cp-info-side">
                        <div class="cp-card-top">
                            <i class="bx bx-brain" style="color: #a855f7"></i>
                            <a href={neetcodeUrl} target="_blank" class="cp-platform">NeetCode 150</a>
                        </div>
                        <div class="cp-count">106</div>
                        <div class="cp-label">Problems Solved (Multiple passes)</div>
                        <div class="cp-user"><a href={neetcodeUrl} target="_blank">Mastered core patterns</a></div>
                    </div>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div class="cp-image-side" on:click={() => expandedImage = `${base}/imgs/Problem_solving/neetCode150.png`}>
                        <img src="{base}/imgs/Problem_solving/neetCode150.png" alt="NeetCode Stats" />
                        <div class="expand-overlay"><i class="bx bx-expand-alt"></i></div>
                    </div>
				</div>
			</div>
		</div>

		<!-- No API Mention Card in this section anymore -->

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

{#if expandedImage}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="lightbox" on:click={() => expandedImage = null}>
		<span class="close-lightbox">&times;</span>
		<img src={expandedImage} alt="Expanded view" on:click|stopPropagation />
	</div>
{/if}

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

	/* CP Stats Cards - Vertical Stacking */
	.cp-stats.vertical-layout {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.cp-card.vertical-card {
		display: flex;
		align-items: stretch;
		background: rgba(15, 23, 42, 0.6);
		border: 1px solid var(--border-color);
		border-radius: 1.5rem;
		overflow: hidden;
		position: relative;
		transition: all 0.4s ease;
		min-height: 200px;
	}

	.cp-card.vertical-card::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 4px;
		height: 100%;
		background: var(--accent);
		opacity: 0.8;
		z-index: 3;
	}

	.cp-card.vertical-card:hover {
		border-color: var(--accent);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3),
			0 0 30px color-mix(in srgb, var(--accent) 15%, transparent);
		transform: translateY(-3px);
	}

	.cp-info-side {
		width: 40%;
		flex: none;
		padding: 3.5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		z-index: 2;
	}

	.cp-image-side {
		width: 60%;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		border-left: 1px solid rgba(255, 255, 255, 0.05);
		background: rgba(0, 0, 0, 0.15); /* Soft background for contain mode letterboxing */
	}

	.cp-image-side img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
		opacity: 0.9;
	}

	.cp-image-side:hover img {
		transform: scale(1.1);
		opacity: 1;
	}

	.expand-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(15, 23, 42, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: all 0.3s ease;
	}

	.expand-overlay i {
		font-size: 4rem;
		color: var(--white);
		transform: scale(0.5);
		transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	.cp-image-side:hover .expand-overlay {
		opacity: 1;
	}

	.cp-image-side:hover .expand-overlay i {
		transform: scale(1);
	}

	.cp-card-top {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 1.2rem;
		margin-bottom: 2rem;
	}

	.cp-card-top i {
		font-size: 2.8rem;
		color: var(--accent);
	}

	.cp-platform {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--white);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.cp-platform:hover {
		color: var(--accent);
	}

	.cp-count {
		font-size: 5.5rem;
		font-weight: 800;
		color: var(--accent);
		line-height: 1;
		margin-bottom: 0.5rem;
		text-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
	}

	.cp-label {
		font-size: 1.6rem;
		color: var(--text-color);
		opacity: 0.9;
	}
	
	.cp-user {
		margin-top: 1.5rem;
		font-size: 1.4rem;
		font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
		color: var(--accent);
		opacity: 0.8;
	}

	.cp-user a {
		text-decoration: none;
		color: inherit;
		transition: all 0.3s ease;
	}

	.cp-user a:hover {
		opacity: 1;
		color: var(--white);
		text-decoration: underline;
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

	/* ═══ Lightbox ═══ */
	.lightbox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(15, 23, 42, 0.95);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(10px);
		cursor: zoom-out;
		animation: lightboxFade 0.3s ease;
	}

	@keyframes lightboxFade {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.lightbox img {
		max-width: 90%;
		max-height: 90vh;
		object-fit: contain;
		border-radius: 1rem;
		box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
		animation: lightboxZoom 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		cursor: default;
	}

	@keyframes lightboxZoom {
		from { transform: scale(0.9); opacity: 0; }
		to { transform: scale(1); opacity: 1; }
	}

	.close-lightbox {
		position: absolute;
		top: 3rem;
		right: 4rem;
		font-size: 5rem;
		color: var(--white);
		cursor: pointer;
		opacity: 0.7;
		transition: opacity 0.3s ease;
	}

	.close-lightbox:hover {
		opacity: 1;
	}

	/* ═══ Responsive ═══ */
	@media (max-width: 991px) {
		.skills {
			padding: 8rem 4%;
		}

		.cp-stats.vertical-layout {
			gap: 2rem;
		}
	}

	@media (max-width: 768px) {
		.heading {
			font-size: 3.5rem;
		}

		.cp-card.vertical-card {
			flex-direction: column;
		}

		.cp-card.vertical-card::before {
			width: 100%;
			height: 4px;
		}

		.cp-image-side {
			width: 100%;
			height: 250px;
			border-left: none;
			border-top: 1px solid rgba(255, 255, 255, 0.05);
		}

		.cp-info-side {
			width: 100%;
			padding: 2.5rem;
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