import { base } from "$app/paths";

const qcProjectCodeSnippets = [
	{
		title: "Authentication flow with Argon2 and JWT",
		file: "apps/backend/src/auth/auth.service.ts",
		language: "typescript",
		insight:
			"The auth service validates credentials with Argon2, blocks inactive users, and issues signed JWT claims (`userId`, `role`) consumed by guards.",
		code: `async login(loginDto: LoginDto) {
  const user = await this.authRepository.findByEmail(loginDto.email);

  if (!user) throw new UnauthorizedException('Invalid credentials');

  const passwordMatches = await argon2.verify(
    user.passwordHash,
    loginDto.password,
  );
  if (!passwordMatches)
    throw new UnauthorizedException('Invalid credentials');

  if (!user.isActive) {
    throw new UnauthorizedException('Account is deactivated');
  }

  const payload = { userId: user.id, role: user.role };
  return { accessToken: this.jwtService.sign(payload) };
}`,
	},
	{
		title: "API bootstrap: validation, versioning, Swagger",
		file: "apps/backend/src/main.ts",
		language: "typescript",
		insight:
			"The runtime enforces strict DTO validation (`whitelist`, `forbidNonWhitelisted`, `transform`), exposes versioned routes, and auto-generates interactive OpenAPI docs.",
		code: `const app = await NestFactory.create(AppModule);
app.enableCors();
app.setGlobalPrefix('api/v1');

app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);

const config = new DocumentBuilder()
  .setTitle('QC-Project API')
  .setDescription('The Full documnetation to the QC-Project API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/v1/docs', app, document);`,
	},
	{
		title: "QC evaluation engine: z-score classification and alerting",
		file: "apps/backend/src/qc-results/qc-results.service.ts",
		language: "typescript",
		insight:
			"Each measured value is normalized against lot statistics, converted into PASS/WARNING/FAIL, then escalated to section users for rapid incident handling.",
		code: `const zScore =
  (createQcResultDto.measuredValue - lot.mean) / lot.standardDeviation;

let status = QcStatus.PASS;
if (Math.abs(zScore) > 3) status = QcStatus.FAIL;
else if (Math.abs(zScore) > 2) status = QcStatus.WARNING;

const [result] = await this.qcResultsRepository.createQcResult(
  createQcResultDto,
  status,
  userId,
);

if (status === QcStatus.WARNING || status === QcStatus.FAIL) {
  const absZScore = Number(Math.abs(zScore).toFixed(2));
  const alertPriority =
    status === QcStatus.FAIL ? AlertPriority.HIGH : AlertPriority.MEDIUM;
  const ruleViolated =
    status === QcStatus.FAIL ? '1_3s (Violation)' : '1_2s (Warning)';

  await this.alertsService.createForUsers(
    {
      resultId: result.id,
      type: 'QC_DEVIATION',
      priority: alertPriority,
      message: \`QC result for lot \${lot.lotNumber} is \${status} (|Z|=\${absZScore}).\`,
      ruleViolated,
      suggestedSolution,
    },
    sectionUserIds,
  );
}`,
	},
	{
		title: "Alert fan-out: one alert, many recipients",
		file: "apps/backend/src/alerts/alerts.repository.ts",
		language: "typescript",
		insight:
			"A single domain alert can be materialized once and linked to multiple users through `users_to_alerts`, reducing duplication while keeping per-user status tracking.",
		code: `async createForUsers(
  createAlertDto: typeof alerts.$inferInsert,
  userIds: number[],
) {
  const uniqueUserIds = [...new Set(userIds)];

  if (uniqueUserIds.length === 0) {
    return await this.create(createAlertDto);
  }

  const [alert] = await this.databaseService.db
    .insert(alerts)
    .values(createAlertDto)
    .returning();

  await this.databaseService.db.insert(usersToAlerts).values(
    uniqueUserIds.map((id) => ({
      userId: id,
      alertId: alert.id,
    })),
  );

  return alert;
}`,
	},
	{
		title: "Resilient service layer: database error mapping",
		file: "apps/backend/src/machines/machines.service.ts",
		language: "typescript",
		insight:
			"The service translates PostgreSQL error codes into business-grade API exceptions, improving client feedback and keeping persistence details out of controllers.",
		code: `private handleDbError(error: any) {
  if (error.code === '23503') {
    throw new BadRequestException(
      'Invalid Section ID: The specified section does not exist.',
    );
  }
  if (error.code === '23505') {
    throw new ConflictException(
      'A machine with these details already exists.',
    );
  }
  throw new InternalServerErrorException(
    'An unexpected database error occurred.',
  );
}`,
	},
	{
		title: "Data model boundaries with Drizzle schema",
		file: "apps/backend/src/drizzle/schema.ts",
		language: "typescript",
		insight:
			"The schema encodes enum constraints, relational links, and many-to-many mappings (`users_to_sections`, `users_to_alerts`) that drive scoped notifications and access.",
		code: `export const usersToAlerts = pgTable(
  'users_to_alerts',
  {
    userId: integer('user_id')
      .references(() => users.id)
      .notNull(),
    alertId: integer('alert_id')
      .references(() => alerts.id)
      .notNull(),
    status: userAlertStatusEnum('status').notNull().default('UNSEEN'),
    seenAt: timestamp('seen_at'),
    resolvedAt: timestamp('resolved_at'),
    resolutionNote: text('resolution_note'),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.alertId] }),
  }),
);

export const usersToSections = pgTable(
  'users_to_sections',
  {
    userId: integer('user_id')
      .references(() => users.id)
      .notNull(),
    sectionId: integer('section_id')
      .references(() => sections.id)
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.sectionId] }),
  }),
);`,
	},
];

const projectsData = {
	"healthcare-management": {
		title: "Healthcare Management System",
		subtitle: "Built for Magdi Yacoub Heart Foundation",
		description:
			"A full-stack healthcare platform developed during my time at Magdi Yacoub Heart Center. Features include patient management, appointment scheduling, lab results tracking with Westgard rule validation, and role-based access control for medical staff.",
		stack: ["NestJS", "PostgreSQL", "Docker", "Prisma", "TypeScript", "Redis"],
		highlights: [
			"Patient record management with HIPAA-aligned security",
			"Real-time lab results with Westgard rule violation detection",
			"Role-based access control (Admin, Doctor, Lab Technician)",
			"Dockerized microservice architecture",
			"CI/CD pipeline for automated testing and deployment",
		],
		images: [],
		videoUrl: "",
		githubUrl: "https://github.com/GARMA-A",
		year: "2024-2025",
	},
	"restful-api-platform": {
		title: "RESTful API Platform",
		subtitle: "Production-Ready API Architecture",
		description:
			"A comprehensive REST API demonstrating best practices in API design, featuring JWT authentication, role-based authorization, rate limiting, request validation, and comprehensive error handling. Built to serve as a reference architecture for scalable backend systems.",
		stack: ["Express.js", "MongoDB", "JWT", "Prisma", "Node.js", "Jest"],
		highlights: [
			"JWT-based authentication with refresh token rotation",
			"Middleware-based authorization with role hierarchy",
			"Rate limiting and request throttling",
			"Comprehensive input validation with Joi/Zod",
			"API versioning and OpenAPI documentation",
			"Integration and unit test coverage",
		],
		images: [],
		videoUrl: "",
		githubUrl: "https://github.com/GARMA-A",
		year: "2025",
	},
	"realtime-chat-backend": {
		title: "Real-time Chat Backend",
		subtitle: "High-Performance Go Server",
		description:
			"A high-performance chat server built in Go, handling real-time messaging through WebSocket connections with message persistence and Redis pub/sub for horizontal scaling across multiple server instances.",
		stack: ["Go", "WebSocket", "Redis", "Docker", "PostgreSQL"],
		highlights: [
			"Concurrent WebSocket connection handling in Go",
			"Redis pub/sub for cross-instance message broadcast",
			"Message persistence with PostgreSQL",
			"Horizontal scaling with Docker Compose",
			"Graceful connection management and reconnection",
		],
		images: [],
		videoUrl: "",
		githubUrl: "https://github.com/GARMA-A",
		year: "2025",
	},
	"smart-safety": {
		title: "SmartSafety — UEA7 Winner",
		subtitle: "Award-Winning Safety Platform",
		description:
			"An award-winning safety monitoring platform that secured 2nd place at the Upper Egypt in Action 7 competition and received ITIDA funding. Combines IoT sensor integration with real-time alerting and analytics dashboards.",
		stack: ["Node.js", "PostgreSQL", "Express.js", "CI/CD", "Docker"],
		highlights: [
			"2nd place at Upper Egypt in Action 7 competition",
			"Secured ITIDA funding for further development",
			"IoT sensor data ingestion pipeline",
			"Real-time alerting and notification system",
			"Analytics dashboard with historical data",
		],
		images: [],
		videoUrl: "",
		githubUrl: "https://github.com/GARMA-A",
		year: "2025",
	},
	"qc-project": {
		title: "Quality Control (QC) Project",
		subtitle: "Enterprise Laboratory QC Monitoring and Alerting System",
		description:
			"A production-oriented quality control platform that centralizes machine tracking, QC statistical validation, and role-scoped alert handling for laboratory teams.",
		year: "2024",
		githubUrl: "https://github.com/garma-a/QC_project",
		stack: [
			"NestJS",
			"TypeScript",
			"PostgreSQL",
			"Drizzle ORM",
			"Swagger/OpenAPI",
			"JWT + Passport",
			"Argon2",
			"Jest",
			"Next.js",
			"Bun",
		],
		mainIdea:
			"Build a reliable QC operations backbone where every test result is traceable, statistically interpreted, and escalated to the correct technical staff with minimal delay.",
		coreFunctionality: [
			{
				title: "Identity and access security",
				points: [
					"JWT authentication with role claims (`ADMIN`, `TECHNICIAN`) and Passport strategy guards.",
					"Argon2 password hashing/verification and active-account checks before token issuance.",
					"Controller-level guard composition (`JwtAuthGuard`, `RolesGuard`) to enforce endpoint contracts.",
				],
			},
			{
				title: "Machine and QC domain lifecycle",
				points: [
					"Machine registry linked to sections with status modeling (`IDLE`, `RUNNING`, `MAINTENANCE`, `OFFLINE`, `ERROR`).",
					"QC test catalog per machine and control-lot lifecycle management with warning/control limits.",
					"QC result ingestion with server-side z-score classification (`PASS`, `WARNING`, `FAIL`).",
				],
			},
			{
				title: "Alerting and workflow closure",
				points: [
					"Automatic alert generation on statistical drift, with priority and rule metadata (`1_2s`, `1_3s`).",
					"Section-aware recipient resolution through many-to-many user/section mapping.",
					"Per-user alert state transitions (`UNSEEN`, `SEEN`, `RESOLVED`) with audit timestamps and notes.",
				],
			},
			{
				title: "Operational user administration",
				points: [
					"Admin-driven user creation/update flows with section assignments and role constraints.",
					"Soft deactivation safeguards (including self-deactivation prevention for admins).",
					"Repository-layer section joins to provide assignment-aware API responses.",
				],
			},
		],
		techStackByLayer: [
			{
				layer: "API and contract layer",
				technologies: ["NestJS", "Swagger/OpenAPI", "DTO validation"],
				rationale:
					"NestJS modules and decorators keep endpoint boundaries explicit, while Swagger and DTO metadata produce discoverable, self-documented contracts.",
			},
			{
				layer: "Application and domain layer",
				technologies: [
					"Service/Repository pattern",
					"Dependency injection",
					"Custom guards",
				],
				rationale:
					"Business rules stay inside services, persistence details stay in repositories, and cross-cutting security concerns remain reusable across modules.",
			},
			{
				layer: "Data and persistence layer",
				technologies: ["PostgreSQL", "Drizzle ORM", "Neon serverless driver"],
				rationale:
					"Strong relational constraints plus explicit schema typing reduce runtime drift and preserve integrity across QC, alerts, and assignments.",
			},
			{
				layer: "Security layer",
				technologies: ["JWT", "Passport-JWT", "Argon2", "RBAC"],
				rationale:
					"Token-based auth plus role checks and password hardening provide a practical baseline for production API protection.",
			},
			{
				layer: "Quality and delivery layer",
				technologies: ["Jest", "Nest testing module", "GitHub Actions", "Bun"],
				rationale:
					"Unit tests cover core services and edge cases; CI runs backend tests on pull requests for regression control.",
			},
			{
				layer: "Frontend and visualization layer",
				technologies: ["Next.js", "React", "Tailwind", "Zustand", "Recharts"],
				rationale:
					"The UI provides dashboards and operational pages that consume documented APIs and visualize QC trends and alerts.",
			},
		],
		systemDesign: [
			{
				module: "Auth module",
				responsibility:
					"Credential verification, JWT issuing, and request identity hydration via strategy guards.",
				notes:
					"`AuthService` + `JwtStrategy` + auth decorators/guards enforce authenticated request context.",
			},
			{
				module: "Users module",
				responsibility:
					"Staff lifecycle management, role filtering, section assignments, and safe profile responses.",
				notes:
					"Handles admin-only mutations and joins user-section relations for permission-aware workflows.",
			},
			{
				module: "Machines and QC tests modules",
				responsibility:
					"Machine inventory, machine-test linking, and validation that tests only bind to known devices.",
				notes:
					"Service guards against orphan QC tests by checking machine existence before creation.",
			},
			{
				module: "Control lots and QC results modules",
				responsibility:
					"Lot threshold modeling, result ingestion, statistical grading, and contextual result retrieval.",
				notes:
					"Result endpoints return enriched lot/test/machine context for faster investigation.",
			},
			{
				module: "Alerts module",
				responsibility:
					"Alert persistence, recipient fan-out, and user-level state transitions (seen/resolved).",
				notes:
					"`users_to_alerts` decouples alert creation from per-user acknowledgement lifecycle.",
			},
			{
				module: "Infrastructure and platform layer",
				responsibility:
					"Database wiring, environment config, global exception shaping, and OpenAPI exposure.",
				notes:
					"Global `ValidationPipe` and exception filter standardize response quality across modules.",
			},
		],
		dataFlow: [
			{
				step: "1. Authentication handshake",
				description:
					"User posts credentials to `/auth/login`; service validates hash and returns a signed bearer token.",
			},
			{
				step: "2. Authorized API usage",
				description:
					"Client includes `Authorization: Bearer <token>`; JWT strategy injects `userId` and `role` into request context.",
			},
			{
				step: "3. QC result submission",
				description:
					"Technician submits measured value tied to a control lot; service fetches lot statistics and validates prerequisites.",
			},
			{
				step: "4. Statistical interpretation",
				description:
					"Service computes z-score and maps value into PASS/WARNING/FAIL thresholds.",
			},
			{
				step: "5. Alert generation and routing",
				description:
					"Warning/fail events produce alerts with severity, violated rule, and corrective recommendation, then assign recipients by section.",
			},
			{
				step: "6. User acknowledgement lifecycle",
				description:
					"Assigned users query alerts, mark them seen/resolved, and attach resolution notes for audit traceability.",
			},
		],
		engineeringChallenges: [
			{
				challenge:
					"Converting raw QC numerical deviations into actionable operational events.",
				approach:
					"Encoded statistical thresholds in the service layer and attached rule metadata plus suggested remediations to each alert.",
				outcome:
					"Technicians receive context-rich notifications instead of ambiguous out-of-range numbers.",
			},
			{
				challenge:
					"Routing alerts to the right people without hardcoded recipient lists.",
				approach:
					"Used section-to-user relationships (`users_to_sections`) and many-to-many alert mappings (`users_to_alerts`).",
				outcome:
					"Alert fan-out scales with staffing changes and supports per-user acknowledgement state.",
			},
			{
				challenge:
					"Keeping API behavior predictable during validation and DB constraint failures.",
				approach:
					"Centralized request validation and mapped PostgreSQL error codes into explicit HTTP exceptions.",
				outcome:
					"Frontend receives deterministic error contracts suitable for robust UX handling.",
			},
		],
		imageGroups: {
			uiScreenshots: [
				{
					src: `${base}/imgs/Qc_project_imges/001_login_page.png`,
					title: "Secure Login Interface",
					caption:
						"Role-oriented entry point for Admin and Technician users, aligned with JWT-based protected API access.",
				},
				{
					src: `${base}/imgs/Qc_project_imges/002_admin_dashboard.png`,
					title: "Admin Dashboard",
					caption:
						"Operations overview for active systems, giving leadership-level visibility into QC throughput and risk signals.",
				},
				{
					src: `${base}/imgs/Qc_project_imges/003_monitor_machines_Top_Part.png`,
					title: "Machine Monitoring (Top View)",
					caption:
						"Live machine inventory section showing device states and contextual operational metadata.",
				},
				{
					src: `${base}/imgs/Qc_project_imges/003_monitor_machines_bottom_Part.png`,
					title: "Machine Monitoring (Detailed Grid)",
					caption:
						"Expanded machine table used by technicians to correlate equipment context with QC activity.",
				},
				{
					src: `${base}/imgs/Qc_project_imges/004_QC_Managment.png`,
					title: "QC Management Workspace",
					caption:
						"Main operational surface for control-lot selection, QC result entry, and test status tracking.",
				},
				{
					src: `${base}/imgs/Qc_project_imges/005_Alerts.png`,
					title: "Alerts and Escalation Inbox",
					caption:
						"Prioritized incident list with state transitions (unseen/seen/resolved) to support accountable closure.",
				},
				{
					src: `${base}/imgs/Qc_project_imges/006_User_Managment.png`,
					title: "User and Role Management",
					caption:
						"Administrative controls for lifecycle operations, role assignment, and section-scoped permissions.",
				},
			],
			swaggerScreenshots: [
				{
					src: `${base}/imgs/Qc_project_imges/007_swagger_overview.png`,
					title: "Swagger Overview",
					caption:
						"Global API catalog generated from Nest decorators, exposing tags, schemas, and secured route contracts.",
				},
				{
					src: `${base}/imgs/Qc_project_imges/008_swagger_machine_routes_create_machine_p1.png`,
					title: "Machines API - Create Endpoint",
					caption:
						"Request DTO contract for machine creation, including required section linkage and validation constraints.",
				},
				{
					src: `${base}/imgs/Qc_project_imges/008_swagger_machine_routes_create_machine_p2_status_codes_returned_in_different_senarios.png`,
					title: "Machines API - Status Code Matrix",
					caption:
						"Demonstrates explicit success/error contracts (`201`, `400`, `409`) mapped by service-level exception handling.",
				},
				{
					src: `${base}/imgs/Qc_project_imges/008_swagger_machine_routes_Get_ALL_machine_p1.png`,
					title: "Machines API - List Endpoint",
					caption:
						"Collection endpoint contract used by monitoring dashboards to retrieve full machine inventory.",
				},
				{
					src: `${base}/imgs/Qc_project_imges/008_swagger_machine_routes_Get_ALL_machine_p2.png`,
					title: "Machines API - Response Schema",
					caption:
						"Typed response model documenting fields consumed by frontend monitoring and admin views.",
				},
				{
					src: `${base}/imgs/Qc_project_imges/009_swagger_Login_p1.png`,
					title: "Auth API - Login Request",
					caption:
						"Login endpoint contract with DTO validation requirements and credential payload shape.",
				},
				{
					src: `${base}/imgs/Qc_project_imges/009_swagger_Login_p2.png`,
					title: "Auth API - Login Responses",
					caption:
						"Documents token response and failure states (`400`, `401`) for frontend auth flow handling.",
				},
			],
		},
		codeSnippets: qcProjectCodeSnippets,
		impact: [
			{
				title: "Operational impact",
				points: [
					"Faster anomaly detection by converting raw QC readings into severity-ranked actionable alerts.",
					"Cleaner technician workflow through section-aware routing and explicit alert lifecycle updates.",
					"Improved auditability with timestamps and resolution notes attached to every handled incident.",
				],
			},
			{
				title: "Engineering impact",
				points: [
					"Modular NestJS architecture that isolates controller contracts, domain logic, and data access responsibilities.",
					"Typed schema and DTO boundaries that reduce accidental contract drift between backend and frontend.",
					"Automated unit tests and CI hooks that protect critical QC and authentication logic from regressions.",
				],
			},
		],
		highlights: [
			"JWT-secured API with role-based authorization and Argon2 password verification",
			"Statistical QC engine using z-score thresholds and automatic deviation alerting",
			"Section-aware alert fan-out with per-user seen/resolved tracking",
			"Modular NestJS + Drizzle architecture with explicit DTO and schema boundaries",
			"Swagger-documented API contracts and Jest-based service-level testing",
		],
		images: [
			`${base}/imgs/Qc_project_imges/001_login_page.png`,
			`${base}/imgs/Qc_project_imges/002_admin_dashboard.png`,
			`${base}/imgs/Qc_project_imges/003_monitor_machines_Top_Part.png`,
			`${base}/imgs/Qc_project_imges/003_monitor_machines_bottom_Part.png`,
			`${base}/imgs/Qc_project_imges/004_QC_Managment.png`,
			`${base}/imgs/Qc_project_imges/005_Alerts.png`,
			`${base}/imgs/Qc_project_imges/006_User_Managment.png`,
		],
	},
	redisgo: {
		title: "RedisGo",
		subtitle: "Redis Database Server Built from Scratch in Go",
		description:
			"A fully functional Redis-compatible in-memory database server implemented from the ground up in Go. Handles TCP connections, parses the RESP wire protocol, and supports strings with TTL expiry, linked lists with blocking pop semantics, and append-only streams with monotonic ID validation — all under concurrent access controlled by sync.RWMutex.",
		year: "2026",
		githubUrl: "https://github.com/garma-a/redisgo",
		stack: [
			"Go",
			"TCP/Networking",
			"RESP Protocol",
			"Goroutines",
			"sync.RWMutex",
			"Channels",
			"In-Memory Storage",
		],
		mainIdea:
			"Build a Redis-compatible server entirely from scratch to deeply understand TCP networking, binary protocol parsing (RESP), in-memory data structure design, and Go's concurrency primitives — goroutines, mutexes, and channels — without any external dependencies.",
		coreFunctionality: [
			{
				title: "RESP Protocol Parser",
				points: [
					"Full RESP array-of-bulk-strings parser that tokenizes raw TCP bytes into command slices.",
					"Strict validation of array markers (*), bulk string prefixes ($), and declared vs actual payload lengths.",
					"Handles malformed and incomplete frames gracefully with typed errors.",
				],
			},
			{
				title: "String Commands with TTL",
				points: [
					"SET key value with optional EX (seconds) and PX (milliseconds) expiry options.",
					"GET with lazy TTL enforcement — expired keys are purged on read, not by background sweep.",
					"Read-then-upgrade locking pattern minimizes write-lock duration for non-expired keys.",
				],
			},
			{
				title: "List Operations with Blocking Pop",
				points: [
					"LPUSH, RPUSH, LPOP, LRANGE, LLEN with full Redis-compatible negative index semantics.",
					"BLPOP blocking pop using Go channels — waiter channels are registered atomically under the lock.",
					"Direct handoff: RPUSH/LPUSH delivers to waiting BLPOP consumers without storing to the list.",
				],
			},
			{
				title: "Stream Engine (XADD/XRANGE)",
				points: [
					"Append-only stream entries with monotonic ID validation (milliseconds-sequence pairs).",
					"Auto-generated IDs using * wildcard with clock-based millisecond and auto-incrementing sequence.",
					"XRANGE with inclusive bounds, negative/positive infinity shortcuts (- and +), and partial ID matching.",
				],
			},
		],
		techStackByLayer: [
			{
				layer: "Networking layer",
				technologies: ["Go net package", "TCP listener", "Goroutine-per-connection"],
				rationale:
					"The standard library net package provides production-grade TCP primitives. One goroutine per connection is idiomatic Go and sufficient for this workload.",
			},
			{
				layer: "Protocol layer",
				technologies: ["RESP parser", "Custom wire format", "String splitting"],
				rationale:
					"A hand-written RESP parser validates frame integrity before command dispatch, keeping protocol concerns isolated from business logic.",
			},
			{
				layer: "Command dispatch layer",
				technologies: ["Switch-based routing", "Handler functions", "Arity validation"],
				rationale:
					"Centralized switch statement routes parsed commands to specialized handlers, each validating argument counts before accessing the store.",
			},
			{
				layer: "Storage engine layer",
				technologies: ["sync.RWMutex", "Go maps", "Go slices", "Go channels"],
				rationale:
					"Separate typed maps (strings, lists, streams) avoid interface{} casting. A single RWMutex provides consistent concurrency control across all data types.",
			},
		],
		systemDesign: [
			{
				module: "TCP Server (cmd/main.go)",
				responsibility:
					"Process bootstrap, TCP listener binding, and connection accept loop dispatching each client to a dedicated goroutine.",
				notes:
					"A single shared *store.DB is created once in main() and passed to every connection handler, simulating Redis global keyspace semantics.",
			},
			{
				module: "Command Handler (internal/server/)",
				responsibility:
					"Per-connection request loop: read bytes, parse RESP, validate arity, route to command-specific handlers, write RESP responses.",
				notes:
					"Handlers are thin protocol adapters — they translate between wire format and store API calls, keeping business logic in the store package.",
			},
			{
				module: "RESP Parser (internal/resp/)",
				responsibility:
					"Converts raw RESP byte slices into typed command token slices with strict frame validation.",
				notes:
					"Table-driven unit tests cover valid commands, malformed frames, incomplete data, and edge cases to ensure parsing reliability.",
			},
			{
				module: "In-Memory Store (internal/store/)",
				responsibility:
					"Central keyspace managing string values (with TTL), linked lists (with BLPOP waiter queues), and append-only streams (with monotonic ID enforcement).",
				notes:
					"Co-locating list data and waiter channels enables atomic push/pop/waiter decisions under one lock — the key primitive that makes BLPOP reliable.",
			},
		],
		dataFlow: [
			{
				step: "1. TCP Connection",
				description:
					"Client connects to port 6379. The accept loop spawns a dedicated goroutine via go server.HandleClient(conn, db).",
			},
			{
				step: "2. Byte Reading",
				description:
					"The handler reads raw bytes into a 1024-byte buffer from the TCP socket using conn.Read(buf).",
			},
			{
				step: "3. RESP Parsing",
				description:
					"Raw bytes are passed to resp.Parse() which splits by \\r\\n, validates RESP framing (* arrays, $ bulk strings), and returns a []string of command tokens.",
			},
			{
				step: "4. Command Dispatch",
				description:
					"The command verb is uppercased and matched via switch. Arity is checked before delegation to the specific handler function.",
			},
			{
				step: "5. Store Operation",
				description:
					"The handler calls methods on *store.DB (e.g., db.Set, db.GetWithTTL, db.RPush) which acquire appropriate locks (RLock for reads, Lock for writes) and mutate/read in-memory maps.",
			},
			{
				step: "6. RESP Response",
				description:
					"The handler formats the result as a RESP response (+OK, $-1, :integer, *array) and writes it back to the client socket.",
			},
		],
		engineeringChallenges: [
			{
				challenge:
					"Implementing blocking list pops (BLPOP) without polling or busy-waiting.",
				approach:
					"Used Go channels as per-waiter mailboxes. When a list is empty, BLPOP atomically registers a chan string under the lock. RPUSH/LPUSH checks for waiters first and delivers directly to the channel instead of appending to the list.",
				outcome:
					"Zero-polling blocking semantics with clean timeout cleanup via select + time.After, and explicit waiter removal on expiration.",
			},
			{
				challenge:
					"Enforcing monotonic stream ID ordering with support for auto-generated IDs.",
				approach:
					"Implemented a three-mode ID resolver (fully explicit, explicit-ms with auto-sequence, fully auto) that validates against the last entry's parsed numeric components under the write lock.",
				outcome:
					"Stream entries are always strictly ordered, supporting both user-specified and server-generated IDs with correct sequence auto-increment.",
			},
			{
				challenge:
					"Handling lazy TTL expiration without a background sweeper thread.",
				approach:
					"GetWithTTL uses a read-then-upgrade locking pattern: acquires RLock to check expiry, releases it, then acquires full Lock only if deletion is needed.",
				outcome:
					"Non-expired key reads stay fast (read-lock only), while expired keys are cleaned up transparently on access without background goroutine overhead.",
			},
		],
		architectureImages: [
			{
				src: `${base}/imgs/RedisGo/architecture.png`,
				title: "System Architecture",
				caption:
					"Layered architecture from TCP listener through RESP parser, command dispatcher, to the in-memory store with three typed data maps.",
			},
			{
				src: `${base}/imgs/RedisGo/dataflow.png`,
				title: "Request Lifecycle",
				caption:
					"How a client command travels through the pipeline: TCP → buffer → RESP parse → dispatch → mutex-protected store → response.",
			},
			{
				src: `${base}/imgs/RedisGo/concurrency.png`,
				title: "BLPOP Concurrency Model",
				caption:
					"Channel-based blocking pop pattern: waiter registration, direct push handoff, and timeout cleanup using Go's select statement.",
			},
			{
				src: `${base}/imgs/RedisGo/resp_protocol.png`,
				title: "RESP Protocol Parsing",
				caption:
					"Step-by-step breakdown of how raw RESP wire bytes are tokenized into command slices through array markers, length prefixes, and payload extraction.",
			},
		],
		demoGifs: [
			{
				title: "String Commands",
				description: "PING connectivity check, SET/GET key-value storage, and SET with EX expiry demonstrating lazy TTL enforcement.",
				src: `${base}/imgs/RedisGo/demo-strings.gif`,
				commands: ["PING", "SET", "GET", "SET...EX", "TYPE"],
			},
			{
				title: "List Operations",
				description: "RPUSH/LPUSH for list building, LRANGE for range queries with negative indices, LLEN for length, and LPOP for head removal.",
				src: `${base}/imgs/RedisGo/demo-lists.gif`,
				commands: ["RPUSH", "LPUSH", "LRANGE", "LLEN", "LPOP"],
			},
			{
				title: "Stream Engine",
				description: "XADD with explicit and auto-generated IDs, XRANGE with inclusive bounds and infinity shortcuts, and TYPE introspection.",
				src: `${base}/imgs/RedisGo/demo-streams.gif`,
				commands: ["XADD", "XRANGE", "TYPE"],
			},
		],
		codeSnippets: [
			{
				title: "RESP Protocol Parser",
				file: "internal/resp/parser.go",
				language: "go",
				insight:
					"The parser splits raw RESP bytes by \\r\\n, validates array markers (*) and bulk string prefixes ($), checks declared vs actual payload lengths, and returns a clean []string of command tokens.",
				code: `func Parse(data []byte) ([]string, error) {
  if len(data) == 0 {
    return nil, fmt.Errorf("empty input")
  }

  str := string(data)
  parts := strings.Split(str, "\\r\\n")
  if len(parts) == 0 || len(parts[0]) == 0 {
    return nil, fmt.Errorf("empty input")
  }
  if parts[0][0] == '*' {
    numElements, err := strconv.Atoi(parts[0][1:])
    if err != nil {
      return nil, fmt.Errorf("invalid array format")
    }
    result := []string{}
    idx := 1
    for range numElements {
      if parts[idx][0] != '$' {
        return nil, fmt.Errorf("expected bulk string")
      }
      bulkLen, _ := strconv.Atoi(parts[idx][1:])
      idx++
      if len(parts[idx]) != bulkLen {
        return nil, fmt.Errorf("invalid bulk string length")
      }
      result = append(result, parts[idx])
      idx++
    }
    return result, nil
  }
  return nil, fmt.Errorf("unsupported format")
}`,
			},
			{
				title: "Command Dispatch Loop",
				file: "internal/server/handler.go",
				language: "go",
				insight:
					"Each TCP connection runs in its own goroutine. The handler reads bytes, parses RESP, uppercases the command verb, and routes via switch — keeping protocol concerns centralized while delegating data operations to specialized handlers.",
				code: `func HandleClient(conn net.Conn, db *store.DB) {
  defer conn.Close()
  buf := make([]byte, 1024)
  for {
    n, err := conn.Read(buf)
    if err != nil {
      if err != io.EOF {
        fmt.Println("Read error:", err)
      }
      break
    }
    parts, err := resp.Parse(buf[:n])
    if err != nil { continue }
    if len(parts) == 0 { continue }

    command := strings.ToUpper(parts[0])
    switch command {
    case "PING":
      conn.Write([]byte("+PONG\\r\\n"))
    case "SET":
      handleSet(conn, db, parts)
    case "GET":
      handleGet(conn, db, parts)
    case "RPUSH":
      handleRPush(conn, db, parts)
    case "BLPOP":
      handleBLPOP(conn, db, parts)
    case "XADD":
      handleXAdd(conn, db, parts)
    // ... more commands
    }
  }
}`,
			},
			{
				title: "In-Memory Store with Concurrency Control",
				file: "internal/store/database.go",
				language: "go",
				insight:
					"The DB type uses separate typed maps (strings, lists, streams) to avoid interface{} casting. A single sync.RWMutex provides consistent concurrency — reads use RLock, mutations use Lock. Lazy TTL uses a read-then-upgrade pattern.",
				code: `type DB struct {
  mu      sync.RWMutex
  data    map[string]value
  lists   map[string]*list
  streams map[string]*stream
}

func (db *DB) GetWithTTL(key string) (string, bool) {
  db.mu.RLock()
  val, exists := db.data[key]
  db.mu.RUnlock()

  if exists && !val.ExpiresAt.IsZero() &&
     time.Now().After(val.ExpiresAt) {
    db.mu.Lock()
    delete(db.data, key)
    db.mu.Unlock()
    exists = false
  }

  if exists {
    return val.Data, true
  }
  return "", false
}`,
			},
			{
				title: "BLPOP: Channel-Based Blocking Pop",
				file: "internal/store/database.go",
				language: "go",
				insight:
					"BLPOP atomically checks if the list has data. If empty, it registers a waiter channel under the lock. When RPUSH/LPUSH later pushes a value, it's delivered directly to the channel — no polling, no busy-waiting.",
				code: `func (db *DB) BLPOPWithOk(key string, ch chan string) (string, bool) {
  db.mu.Lock()
  defer db.mu.Unlock()
  lst := db.getOrCreateList(key)
  if len(lst.values) == 0 {
    lst.waiters = append(lst.waiters, ch)
    return "", false
  }
  val := lst.values[0]
  lst.values = lst.values[1:]
  return val, true
}

func (lst *list) isSendToWaiter(value string) bool {
  if len(lst.waiters) == 0 {
    return false
  }
  ch := lst.waiters[0]
  lst.waiters[0] = nil
  lst.waiters = lst.waiters[1:]
  ch <- value
  return true
}`,
			},
		],
		impact: [
			{
				title: "Learning impact",
				points: [
					"Deep understanding of how Redis handles TCP connections, protocol parsing, and in-memory data management at the implementation level.",
					"Hands-on experience with Go's concurrency primitives: goroutines for connection handling, sync.RWMutex for thread-safe state, and channels for blocking consumer patterns.",
					"Protocol-level knowledge of RESP framing that transfers directly to working with any Redis-compatible system.",
				],
			},
			{
				title: "Engineering impact",
				points: [
					"Clean layered architecture separating networking, protocol parsing, command dispatch, and storage concerns into independent packages.",
					"Zero external dependencies — entire implementation uses only Go standard library, demonstrating self-reliance on language primitives.",
					"Table-driven tests for the RESP parser ensuring correctness across valid, malformed, and edge-case inputs.",
				],
			},
		],
		highlights: [
			"Full RESP protocol parser with strict frame validation and error handling",
			"String commands (SET/GET) with lazy TTL expiration using read-then-upgrade locking",
			"List operations with blocking pop (BLPOP) using Go channels for zero-polling waiter semantics",
			"Append-only stream engine with monotonic ID validation and auto-generation",
			"Goroutine-per-connection concurrency with a single shared RWMutex-protected store",
			"Zero external dependencies — built entirely on Go standard library",
		],
	},
>>>>>>> complete_version1.0
};

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const project = projectsData[params.slug];

	if (!project) {
		return {
			status: 404,
			error: "Project not found",
		};
	}

	return {
		project,
		slug: params.slug,
	};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return Object.keys(projectsData).map((slug) => ({ slug }));
}

