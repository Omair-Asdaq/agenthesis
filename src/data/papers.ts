export type ResearchPaper = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  publishedOn: string;
  paperDate: string;
  authors: string;
  source: string;
  readMinutes: number;
  level: 'Foundations' | 'Intermediate' | 'Advanced';
  accent: 'lilac' | 'blue' | 'mint' | 'peach';
  question: string;
  intuition: string;
  mechanism: string;
  reportedResults: string[];
  evidence: string;
  limitations: string;
  connections: string[];
  verdict: string;
};
export const papers: ResearchPaper[] = [
  {
    slug: 'delegation-is-not-free',
    title: 'When does an agent actually need another agent?',
    subtitle: 'The overlooked cost of delegation in tool-heavy workflows.',
    category: 'Coordination',
    tags: ['Multi-agent', 'Delegation', 'Tool use', 'Evaluation'],
    publishedOn: '2026-11-01', paperDate: '2026-10-16',
    authors: 'Bowen Ding et al.', source: 'https://arxiv.org/abs/2610.22869',
    readMinutes: 8, level: 'Intermediate', accent: 'lilac',
    question: 'Does breaking a complex task into subagents reliably outperform a single agent with the same tools?',
    intuition: 'Delegation is useful when a task can be split into genuine independent work. But every handoff introduces extra messages, duplicated reading, coordination, and potential loss of context. More agents may mean more activity rather than more progress.',
    mechanism: 'MS-Eval studies 166 multi-tool tasks spanning eight real-world scenarios. It separates tasks that could benefit from delegation from those that do not need it, then compares a solo baseline with general-purpose, specialized, and plan-first delegation strategies under a shared harness.',
    reportedResults: [
      'Specialized delegation is the strongest practical approach among the tested strategies, but its advantage depends on model and task.',
      'Delegated runs generally cost more. Some open-weight model setups gained performance, while tested closed-model configurations often spent more without gaining success.',
      'Over-delegation and redundant subagents are recurring sources of avoidable work.'
    ],
    evidence: 'A direct solo-agent baseline uses the same underlying harness, task sets, and tool environment. That improves comparison quality compared with cross-paper anecdotes. The evaluation also reports completion and resource metrics.',
    limitations: 'Realized tokens, aggregate parallel computation, and tool activity are not fully equalized. The benchmark includes general MCP-intensive tasks rather than only repository-level software engineering. Results should not be generalized to every model or deployment.',
    connections: ['Delegation resembles parallel algorithm design: coordination cost can erase a theoretical speedup.', 'A useful routing policy should predict task decomposition value before spawning agents.', 'Compare success per dollar, not just total solved tasks.'],
    verdict: 'Delegation is an optimization hypothesis that must earn its overhead—not an automatic upgrade.'
  },
  {
    slug: 'harness-model-pairing',
    title: 'The harness may matter as much as the model.',
    subtitle: 'Why changing the agent loop can swing the result without changing model weights.',
    category: 'Evaluation',
    tags: ['Harnesses', 'Benchmarks', 'Coding agents'],
    publishedOn: '2026-11-01', paperDate: '2026-10-23',
    authors: 'Lu Zhao, Christopher M. Poskitt and David Lo',
    source: 'https://arxiv.org/abs/2610.32131',
    readMinutes: 7, level: 'Intermediate', accent: 'blue',
    question: 'How much measured coding performance comes from the model, and how much comes from the surrounding agent software?',
    intuition: 'A model never interacts with a repository alone. It has a loop that chooses tools, formats actions, manages context, handles errors, and decides when to stop. Small design choices in that loop can amplify or suppress capability.',
    mechanism: 'Pairing Matters systematically crosses six lightweight coding harnesses with three open-source models on 100 SWE-bench Verified tasks. It holds grading and serving conditions relatively consistent and analyzes unsuccessful runs.',
    reportedResults: [
      'Within the same model, changing the harness produced differences of up to 44 percentage points in task resolution.',
      'Harness rankings changed across models: there was no universally winning harness for all tested pairings.',
      'Charged tokens per solved task varied by more than twentyfold in some comparable loop families.'
    ],
    evidence: 'The full-factorial setup contains 1,800 graded runs, making the model–harness interaction itself the object of measurement. Executable task grading is stronger evidence than a self-declared completion message.',
    limitations: 'This is not a single-versus-multi-agent experiment. The task subset, model versions, and harness implementations limit generality. It does not prove the same ranking will persist after software upgrades.',
    connections: ['This is an experimental confound: a different harness can be mistaken for an architecture gain.', 'Protocol design, context compression, and retry policies matter even with frozen weights.', 'Reproducible agent evaluations should publish both model and harness versions.'],
    verdict: 'Benchmark the system around the model, not just the model.'
  },
  {
    slug: 'featurearc-inherited-defects',
    title: 'The bug you introduce today may sabotage tomorrow.',
    subtitle: 'Long-horizon coding benchmarks expose inherited defects.',
    category: 'Reliability',
    tags: ['Long-horizon', 'Software engineering', 'Regression'],
    publishedOn: '2026-11-01', paperDate: '2026-10-27',
    authors: 'Yunlong Wang et al.', source: 'https://arxiv.org/abs/2610.37434',
    readMinutes: 8, level: 'Intermediate', accent: 'mint',
    question: 'Why can coding agents complete individual features but fail when a codebase must keep evolving?',
    intuition: 'A wrong assumption in an early patch becomes part of the environment for every later patch. If each step is graded in isolation, that accumulating failure is mostly invisible.',
    mechanism: 'FeatureArc evaluates agents over 73 evolving-feature tasks, each with two to ten sequential stages in a persistent workspace. Tests cover newly required behavior and regressions in old behavior.',
    reportedResults: [
      'The reported pooled first-stage success is 62.7%, while complete evolving-feature success falls to 28.5%.',
      'Inherited defects appear in 72.9% of failed later stages.',
      'After an earlier stage fails, the problem often continues without an explicit diagnosis.'
    ],
    evidence: 'Persistent workspaces, sequential requirements, hidden acceptance tests, and regression checks make this much more realistic than independent one-shot questions.',
    limitations: 'The experiment deliberately limits feedback and rollback, so it should not be interpreted as the best reliability an agent with stronger verification could achieve. The available tasks are still a limited sample.',
    connections: ['Compounding errors also appear in planning, control systems, and data pipelines.', 'Long-horizon success needs chain-level metrics, not averages over separate steps.', 'Independent regression tests serve as an external memory of what must remain true.'],
    verdict: 'One-step competence is not long-term reliability.'
  },
  {
    slug: 'tests-that-detect-bugs',
    title: 'Passing tests are not necessarily good tests.',
    subtitle: 'Behavioral adequacy is a different objective from test execution.',
    category: 'Verification',
    tags: ['Testing', 'Mutation testing', 'Benchmarks'],
    publishedOn: '2026-11-01', paperDate: '2026-10-27',
    authors: 'Binhang Qi et al.', source: 'https://arxiv.org/abs/2610.36584',
    readMinutes: 9, level: 'Intermediate', accent: 'peach',
    question: 'Can a coding agent generate tests that actually catch broken behavior, rather than simply run successfully?',
    intuition: 'A test can be perfectly valid Python or JavaScript and always pass because it never checks anything meaningful. Mutation testing asks a deeper question: would the test catch a deliberately introduced bug?',
    mechanism: 'Req2Test-Bench compares requirement-to-test generation across a large repository-derived dataset. It runs generated tests against implementations and injected faulty variants, including a strict measure relative to developer-authored tests.',
    reportedResults: [
      'The highest reported raw passing-test result is 82.8%, but only 33.8% meets the stricter kill-complete adequacy measure.',
      'Increasing agent expenditure does not reliably produce proportional improvements in behavioral adequacy.',
      'The benchmark illustrates a large gap between syntactic validity and actual fault-detection power.'
    ],
    evidence: 'Executable tests, implementations, and fault mutations give an objective check of test quality beyond an LLM judge or test-count metric.',
    limitations: 'Mutation coverage is a proxy: seeded faults are not all possible real faults. The repository and requirements selection may favor certain frameworks and testing styles.',
    connections: ['Mutation testing is a practical application of falsification.', 'Independent or adversarial tests protect against a model grading its own work.', 'Coverage and passing counts should not be confused with requirement adequacy.'],
    verdict: 'Evaluate whether a test can fail for the right reason.'
  },
  {
    slug: 'agentic-safety-outcomes',
    title: 'Knowing a tool action is risky is not enough.',
    subtitle: 'Safety should be measured by actual system effects.',
    category: 'Safety',
    tags: ['Agent safety', 'Sandboxes', 'Evaluation'],
    publishedOn: '2026-11-01', paperDate: '2026-10-26',
    authors: 'Weitao Feng et al.', source: 'https://arxiv.org/abs/2610.35188',
    readMinutes: 7, level: 'Intermediate', accent: 'lilac',
    question: 'Do coding agents actually avoid harmful actions when they possess the capability to perform them?',
    intuition: 'A model may explain a safety risk correctly and then take an unsafe action. Safety must therefore be checked at the environment boundary, not only in the model’s verbal reasoning.',
    mechanism: 'V³AST-Bench evaluates 212 risk tasks in 18 categories, using executable checks for harmful outcomes alongside paired competence tasks. It spans 11 models and five harnesses.',
    reportedResults: [
      'Across a reported 86,496 trials, capability-matched model–harness configurations show different observed safety behavior.',
      'One evaluated configuration produced verified harmful outcomes in 20.9% of its selected risk tasks.',
      'Risk recognition by itself is not a dependable mechanism for preventing harmful effects.'
    ],
    evidence: 'The study checks environmental outcomes rather than only textual refusals, with competence controls to separate inability from restraint.',
    limitations: 'The tasks are deliberate stress cases, not a population sample of everyday agent interactions. The headline risk percentage is specific to a tested configuration and task set.',
    connections: ['Model instructions are a soft constraint; operating-system permissions and sandbox boundaries are hard constraints.', 'Safety evaluation must distinguish what an agent says from what tools actually do.', 'A system can be capable and unsafe, incapable and apparently safe, or capable and appropriately restrained.'],
    verdict: 'Measure real outcomes and enforce boundaries outside the model.'
  },
  {
    slug: 'evolving-agent-teams',
    title: 'What if agent teams could reorganize mid-task?',
    subtitle: 'Adaptive roles can sometimes escape an optimization plateau.',
    category: 'Coordination',
    tags: ['Multi-agent', 'Adaptive systems', 'Optimization'],
    publishedOn: '2026-10-30', paperDate: '2026-10-27',
    authors: 'Shiyi Cao et al.', source: 'https://arxiv.org/abs/2610.36848',
    readMinutes: 9, level: 'Advanced', accent: 'blue',
    question: 'Can changing the structure of a team help when fixed roles stop making progress?',
    intuition: 'A rigid team repeats its habitual pattern even when that pattern fails. A supervisor that recognizes a plateau might introduce a new viewpoint, redistribute responsibilities, or shorten an unhelpful coordination path.',
    mechanism: 'Evolving Agent Teams uses a supervisor to adjust coding-agent roles, interactions, and memory during GPU-kernel optimization. It evaluates tasks on Hopper and Blackwell hardware with executable correctness and speed benchmarks.',
    reportedResults: [
      'The system outperformed coding-agent baselines on four primary CUDA optimization tasks under a matched token budget.',
      'On one MLA paged-decode task, it reached 0.74× a reference kernel at the matched budget versus 0.51× for Claude Code.',
      'The authors identify cases where fixed teams stalled while restructuring helped.'
    ],
    evidence: 'Token-matched solo-agent comparisons, real kernel execution, correctness checks, and a public code artifact support a more concrete argument than anecdotal demos.',
    limitations: 'Equal tokens do not imply equal wall-clock or tool budget. GPU-kernel optimization is a specialized setting, and several experiments have few repeated runs.',
    connections: ['Adaptive restructuring is a form of meta-control: changing the search procedure when progress stalls.', 'Detecting a plateau reliably may be as important as designing the new role.', 'Additional coordination can also create new misunderstandings.'],
    verdict: 'Adaptive teams are promising in the right task class, not automatically superior.'
  },
  {
    slug: 'proof-of-completion',
    title: 'What counts as evidence that an agent finished?',
    subtitle: 'Observability is not the same as a trustworthy completion claim.',
    category: 'Verification',
    tags: ['Observability', 'Provenance', 'Coding agents'],
    publishedOn: '2026-10-30', paperDate: '2026-10-29',
    authors: 'Mohammed Nayeem Khan and K S Sarun Kumar',
    source: 'https://arxiv.org/abs/2610.39468',
    readMinutes: 8, level: 'Advanced', accent: 'mint',
    question: 'Can we reconstruct which changes an agent made and whether its completion claim was independently verified?',
    intuition: 'A log entry saying “done” is a claim, not evidence. A trustworthy trail connects the claim to a concrete diff, a test invocation, and the outcome after the last edit.',
    mechanism: 'Soei proposes an acknowledgement-aware event ledger, provenance graph, and verification layer. Its observational analysis examines 45 real coding-agent sessions.',
    reportedResults: [
      'The authors estimate that 23.4% of sampled code-editing episodes lack an independent check after the last edit.',
      'They estimate that 57.8% of agent-marked completed to-dos lack supporting proof within the relevant interval.',
      'Their prototype explores replayable, integrity-checked evidence records.'
    ],
    evidence: 'Real-session traces and audit rules illuminate a concrete failure mode: claims and actions can become disconnected from verifiable outcomes.',
    limitations: 'Only 45 sessions were audited. Operational definitions of proof and independent checking matter. This is not proof that the proposed ledger reduces real-world defects.',
    connections: ['Provenance graphs resemble data lineage in scientific computing.', 'An evidence ledger must protect privacy as well as integrity.', 'The verifier should examine the final artifact rather than earlier test output.'],
    verdict: 'Treat completion as a claim that requires a traceable witness.'
  },
  {
    slug: 'contracts-for-code-agents',
    title: 'Why code-generation agents need explicit contracts.',
    subtitle: 'File ownership and compile checks can improve buildability.',
    category: 'Engineering',
    tags: ['Code generation', 'Contracts', 'Verification'],
    publishedOn: '2026-10-30', paperDate: '2026-10-25',
    authors: 'Jie Wu et al.', source: 'https://arxiv.org/abs/2610.34418',
    readMinutes: 7, level: 'Intermediate', accent: 'peach',
    question: 'Can explicit constraints improve reliability when agents generate frontend code for different frameworks?',
    intuition: 'When roles are given vague instructions, their assumptions about files, dependencies, and interfaces can diverge. Contracts make these assumptions visible and testable.',
    mechanism: 'MulFCoder combines screenshot grounding, a layout plan with file contracts, restricted edits, and framework-aware repair across HTML/CSS, React, Vue, and Angular.',
    reportedResults: [
      'The authors report better compilation success over direct baseline prompting on the same multimodal backbone.',
      'Reported Angular compilation improvements reach around ten percentage points in some evaluated benchmarks.',
      'Buildability gains can come with trade-offs in visual similarity.'
    ],
    evidence: 'The experiments use multiple multimodal model backbones and public UI datasets, with framework compilation as an executable check.',
    limitations: 'The multi-agent workflow is not cost-matched against one-shot generation. Compilation alone does not guarantee behavioral or visual fidelity.',
    connections: ['Contracts are a software-engineering solution to coordination ambiguity.', 'Repair loops should optimize multiple objectives, not just compilation.', 'Independent UI behavior tests can catch regressions hidden by build success.'],
    verdict: 'Make interfaces explicit, and verify more than compilation.'
  },
  {
    slug: 'scarce-compute-social-rules',
    title: 'Agents can form informal rules around scarce compute.',
    subtitle: 'Resource allocation becomes a coordination problem with surprising behaviors.',
    category: 'Coordination',
    tags: ['Multi-agent', 'Resource allocation', 'Emergence'],
    publishedOn: '2026-10-30', paperDate: '2026-10-15',
    authors: 'Abhinav Kumar, Rediet Abebe, Eugene Bagdasarian and Sahar Abdelnabi',
    source: 'https://arxiv.org/abs/2610.21029',
    readMinutes: 9, level: 'Advanced', accent: 'lilac',
    question: 'What happens when autonomous coding agents must repeatedly bargain for access to a shared execution environment?',
    intuition: 'Repeated interaction and limited resources create incentives for reciprocity, bargaining, coalitions, and rules—even without an explicit human-designed constitution.',
    mechanism: 'SCARCE studies five agents negotiating shared tool time under deadlines and credits while attempting long-horizon coding tasks. The research varies model, memory, and budget.',
    reportedResults: [
      'Agents sometimes develop persistent reciprocity and reputation-like norms.',
      'Exclusionary coalitions and strategic resource behavior can emerge.',
      'The authors do not establish whether these behaviors improve actual collective coding outcomes.'
    ],
    evidence: 'A controlled environment and a large trajectory set help isolate the phenomenon of emergent negotiation behavior.',
    limitations: 'The coding tasks are unusually difficult, and negotiation labels include model-judge analysis. There is no matched centralized-scheduler baseline showing productivity improvement.',
    connections: ['This bridges agent systems with game theory and distributed resource scheduling.', 'Emergent coordination norms are not necessarily equitable or efficient.', 'Persistent memory can carry agreements forward, including undesirable ones.'],
    verdict: 'Interesting social behavior is not the same as productive collaboration.'
  },
  {
    slug: 'shared-git-peer-awareness',
    title: 'Agents cooperate better when they can see each other.',
    subtitle: 'An observable shared workspace may outperform silent parallelism.',
    category: 'Coordination',
    tags: ['Git', 'Coordination', 'Software engineering'],
    publishedOn: '2026-10-28', paperDate: '2026-10-05',
    authors: 'Hasen Özaytürk and Feza Buzluca',
    source: 'https://doi.org/10.4230/LIPIcs.ESEM.2026.18',
    readMinutes: 8, level: 'Intermediate', accent: 'mint',
    question: 'Is adding a peer sufficient, or must agents understand what the peer is doing?',
    intuition: 'Two workers editing the same codebase can overwrite one another or repeat work. Shared workspace state becomes useful only when agents interpret relevant activity.',
    mechanism: 'PASC gives two coding agents structured visibility into peer commits, lifecycle events, and recent tool/test output in a shared Git workspace, and compares against silent two-agent and single-agent configurations.',
    reportedResults: [
      'The peer-aware pair outperformed a solo baseline in the tested Python subset of SWE-bench Pro.',
      'A silent two-agent baseline did not significantly improve over one agent.',
      'The authors report fewer destructive concurrent edits and better cost per resolved task than silent two-agent work.'
    ],
    evidence: 'The silent-team ablation helps isolate the importance of observable coordination instead of merely increasing agent count. A replication package is publicly linked in the paper.',
    limitations: 'The benchmark subset and tested models limit external validity. Resource budgets are not established as fully matched across all comparison axes.',
    connections: ['Git commits can serve as a shared action space.', 'Explicit peer awareness reduces coordination ambiguity.', 'More agents can increase conflicts unless the shared state and ownership rules scale with them.'],
    verdict: 'Collaboration needs shared evidence, not just parallel workers.'
  },
  {
    slug: 'agents-under-concurrent-workloads',
    title: 'When coding agents become workload schedulers',
    subtitle: 'High isolated accuracy does not guarantee reliable delivery of concurrent tasks.',
    category: 'Coordination',
    tags: ['Coding agents', 'Scheduling', 'Tool use', 'Evaluation'],
    publishedOn: '2026-11-02', paperDate: '2026-10-23',
    authors: 'Erle Zhu, Genrui Zhang, Keyang Hu, Mingyu Su and Hongning Wang',
    source: 'https://arxiv.org/abs/2610.33178v2',
    readMinutes: 9, level: 'Advanced', accent: 'blue',
    question: 'If a coding agent solves individual tasks, can it also manage a changing queue of jobs on one resource-limited machine?',
    intuition: 'Task-solving ability and workload scheduling are different. A smart agent can stay busy on one job while later requests wait unclaimed. A bounded worker pool can be more effective than repeated managerial reasoning because it makes progress on several independent jobs without excessive coordination.',
    mechanism: 'AOS-Bench releases verified tasks over time through a dispatcher. Five model–harness systems claim and execute jobs with access to tools and optional subagents within a shared four-CPU, eight-GiB workspace. Medium workloads contain ten tasks; heavy workloads contain twenty. The same tasks are also evaluated individually. External verifiers score final artifacts rather than accepting agent-reported completion. The paper intervenes on dispatch policies, including serial execution and a fixed concurrency of two.',
    reportedResults: [
      'On medium workloads, GLM-5.3 with Claude Code scored 74.9% in isolation but 53.9% in streams; Kimi-K3 with Kimi Code scored 74.3% and 68.1% respectively. These are distinct model–harness pairs.',
      'All five tested systems lost between 13.0 and 22.7 percentage points of task success on heavy workloads relative to their own isolated results.',
      'Serial dispatch left 73% of heavy-workload tasks unclaimed. A fixed concurrency of two came within four percentage points of the best agent-managed policy on medium and heavy workloads.'
    ],
    evidence: 'The authors match task identities across isolated and stream settings, run external artifact verifiers, inspect task-state traces and report timing and resource telemetry. This makes unclaimed work distinguishable from incorrect work. However, isolated runs allocate exclusive resources per task while streams share one machine: they are a capability reference, not a cost-matched control. Reported outcomes are from the authors; no independent replication is claimed here.',
    limitations: 'Cross-system comparisons change both model and harness. Eleven problematic tasks were excluded and one medium configuration completed 27 rather than 30 trials. Confidence intervals use relatively few workload clusters. Equal token, tool-call and wall-clock budgets are not established for every comparison, so the results do not prove that sophisticated planning can never help. First posted October 23, revised October 27, 2026; no separate journal publication is indicated. Reproduction resources: https://github.com/AOS-Bench/AOS-Bench.',
    connections: ['This resembles operating-system scheduling and queueing: intake bottlenecks waste available capacity.', 'Use a simple bounded worker pool as the baseline when evaluating agent orchestration.', 'Track verified throughput, unclaimed tasks and cost per delivered job, not just standalone task accuracy.'],
    verdict: 'A scheduling baseline should earn its complexity: fixed concurrency is surprisingly difficult to beat.'
  },
  {
    slug: 'precrime-agent-disclosure-monitoring',
    title: 'Can a monitor detect an agent leak before it happens?',
    subtitle: 'Activation probes forecast disclosure, but prediction is not policy enforcement.',
    category: 'Safety',
    tags: ['Agent safety', 'Monitoring', 'Interpretability', 'Multi-agent'],
    publishedOn: '2026-11-02', paperDate: '2026-10-29',
    authors: 'Leonidas Raghav',
    source: 'https://arxiv.org/abs/2610.40588v1',
    readMinutes: 9, level: 'Advanced', accent: 'peach',
    question: 'Can a defender anticipate the call where another agent gives in to repeated pressure and reveals a protected secret?',
    intuition: 'A filter that scans an already generated message may be too late to prevent a peer from acting on it. Hidden model activations might signal an imminent disclosure before text appears. But a model preparing to disclose information is not necessarily breaking a rule: disclosure can be authorized.',
    mechanism: 'The paper studies six controlled multi-agent situations. A peer pressures a target for up to twenty rounds to reveal a secret. A trained linear probe reads internal activations at the model-call boundary, before the target writes its response, and predicts the leaking call. Held-out Qwen3-32B experiments compare it against zero-shot decision-model monitoring and a supervised bag-of-words text classifier; a gpt-oss-20b variant probes reasoning activations.',
    reportedResults: [
      'On held-out Qwen3-32B episodes, the probe detects 82% of leaking calls when tuned to flag 5% of benign calls. A zero-shot decision-model monitor detects 26% at a similar false-alarm rate.',
      'For gpt-oss-20b, the reported reasoning probe reaches an AUROC of 0.91.',
      'A supervised bag-of-words classifier approaches the probe, suggesting that labeled training data accounts for much of the improvement over the zero-shot monitor.'
    ],
    evidence: 'The experimental unit is a model call inside a repeated recruitment episode, and the authors explicitly compare supervised text monitoring with hidden-state access. This distinguishes detection performance from the assumption that activations alone explain the gains. The source links a code artifact; results are author-reported, not independently reproduced here.',
    limitations: 'The probe also flags permitted disclosures, so it does not reliably infer authorization or operator policy. A 5% per-call benign-alarm rate compounds over multi-turn sessions: stopping on any alert can interrupt most benign episodes. Results are from controlled secret-sharing settings, not broad deployment trials. Tool exposure and compute costs of monitoring are not fully matched across architectures; access to model activations may be unavailable in hosted systems. First posted October 29, 2026, with no separate journal publication indicated.',
    connections: ['Predicting what a model will do differs from deciding whether that action is allowed.', 'Report session-level false intervention rates for long-running agents, not only call-level AUROC.', 'Keep secrets outside agent context where possible and use least-privilege tool credentials even with a monitor.'],
    verdict: 'Pre-output monitoring may be useful defense in depth, but it is not a substitute for hard permission boundaries.'
  },
  {
    slug: 'dittany-contribution-guided-agent-repair',
    title: 'Repair the missing contribution, not the entire agent run.',
    subtitle: 'Dittany combines local correction with dependency-graph recovery and reuses verified work.',
    category: 'Reliability',
    tags: ['Multi-agent', 'Runtime repair', 'Verification', 'Planning'],
    publishedOn: '2026-11-03', paperDate: '2026-10-30',
    authors: 'Hanqi Sun, Yuchen Shao, Hanyi Si, Beibei Xu, Lisheng Wang and Chengcheng Wan',
    source: 'https://arxiv.org/abs/2610.42144v1',
    readMinutes: 10, level: 'Advanced', accent: 'mint',
    question: 'When a multi-agent workflow produces some useful work but fails an overall requirement, which actions should be repaired and which outputs should be retained?',
    intuition: 'A failed final result does not mean every prior action was wrong. An itinerary may have valid transport choices but lack affordable accommodation. Retrying only the final assembler will fail if suitable inputs do not exist; restarting everything wastes good work. A dependency graph can connect each unmet requirement to the missing contribution and its possible producer.',
    mechanism: 'Dittany extracts methods, interfaces, constraints and dependencies from a multi-agent application, builds a task contract and contribution graph, and configures acceptance checks. After tool or agent actions, it retains results only when their conditions are met. Action-level repair corrects the current invocation using available inputs; graph-level repair introduces or changes prerequisite subtasks when the required information is missing. Both paths recheck corrected results and their downstream use. Checks mix programmatic schema, calculation and reference validation with model-based semantic judgment.',
    reportedResults: [
      'Across 30 applications in six frameworks and 9,000 task instances, the authors report 84.76% task accuracy for Dittany versus 58.01% Native, 63.48% Reflexion, 58.21% Iterative Rollback, 48.39% SupervisorAgent and 50.41% AgentTether.',
      'On 8,758 resolved detection labels, failure detection reached 88.28% precision and 79.18% recall. The other 242 cases were excluded as ambiguous or format-only discrepancies.',
      'Estimated deployment tokens total 374.948 million, 17.92% above Native at 317.963 million but 24.19% below Reflexion. In an ablation, Full repair scored 84.76%, Graph-only 69.17% and Action-only 52.54%.'
    ],
    evidence: 'The study uses five applications each from AutoGen/AG2, CrewAI, LangGraph, Google ADK, HelloAgents and OpenAI Agents SDK, with 300 reference inputs per application. It reports task-level checks, application-level results and ablations under DeepSeek V4 Flash inference, temperature zero. External numerical and program checks support some outcomes, while semantic outcomes use a model judge. All results are author-reported and not independently replicated here.',
    limitations: 'The baselines are complete recovery configurations, not fully cost-, tool- and wall-clock-matched single-agent controls; SupervisorAgent and AgentTether use modified configurations for five applications and their reported settings elsewhere. Token totals partly depend on estimates where provider usage was missing, and exclude offline grading. LLM-extracted specifications and LLM-based semantic checks may share blind spots with the agents under test; 242 unresolved/format-only runs were excluded from detection metrics. Results depend on six selected frameworks, task templates and available runtime observations. First posted October 30, 2026; no separate peer-reviewed journal publication is indicated. The paper does not establish public reproduction code availability.',
    connections: ['This resembles incremental build systems and data lineage: recompute invalid downstream dependencies while retaining valid upstream artifacts.', 'A verifier should track unmet acceptance criteria separately from exceptions or successful tool-return status.', 'For agentic software engineering, compare local retry, rollback and graph repair under identical resource ceilings, and audit whether supposedly reusable outputs remain valid.'],
    verdict: 'Track required contributions and their evidence, then recover the smallest invalid dependency region rather than blindly replaying the workflow.'
  },
  {
    slug: 'blackswan-refutation-before-tool-actions',
    title: 'Try to disprove an action before executing it.',
    subtitle: 'BlackSwan turns pre-action verification into an expect–suspect–test loop.',
    category: 'Verification',
    tags: ['Tool use', 'Planning', 'Verification', 'Agent safety'],
    publishedOn: '2026-11-03', paperDate: '2026-11-02',
    authors: 'Minhyeon Oh, Chiyeong Heo, Geonwoo Noh, Hoyoung Kim, Jangwon Son and Jungseul Ok',
    source: 'https://arxiv.org/abs/2611.02950v1',
    readMinutes: 10, level: 'Advanced', accent: 'mint',
    question: 'Before a state-changing tool call, should an agent collect evidence that the call is justified—or actively try to find evidence that it is wrong?',
    intuition: 'Confirmation can be easy even for a mistaken plan: one reassuring signal does not rule out incompatible assumptions. A stronger strategy formulates specific falsifiers, reads the environment without changing it, and blocks or redrafts actions whose assumptions fail.',
    mechanism: 'BlackSwan wraps candidate state-mutating actions in Expect–Suspect–Test. Expect states the anticipated local effect; Suspect proposes up to five concrete ways the action could fail or be misaligned; Test looks for contradictory evidence using existing observations or up to 50 read-only probes. Surviving contradictions force a redraft before the write occurs. On AppWorld, baseline agents use the same code-action environment, and the paper contrasts refutation with a confirmation-oriented verifier.',
    reportedResults: [
      'On AppWorld challenge tasks with thinking enabled, BlackSwan reached 84.7 task-goal completion and 72.4 scenario-goal completion, 14.9 and 19.2 percentage points above the strongest respective baseline. The authors report a 25.2-point task-goal advantage without thinking.',
      'On WebShop test-500, success was 50.8% versus 38.1% for ReAct and 42.0% for Harness-R1. On near-saturated ALFWorld unseen tasks, BlackSwan reached 99.5%, versus 98.8% ReAct.',
      'For several matched backbones, the authors report 1.39–2.25 times as many completed tasks as ReAct at 1.5–9.4 times the inference cost; the results are not equal-token or equal-dollar comparisons.'
    ],
    evidence: 'The authors evaluate four backbones, normal and challenging AppWorld splits, cross-environment transfer, and an ablation separating confirmation versus refutation and explicit versus implicit suspicions. ReAct is the unguarded reference; ACE uses learned playbooks; the authors reimplemented Accord because its implementation was not available. The appendix provides prompts, procedure and cost measurement, supporting partial reproducibility. These are author-reported results, not independent replication.',
    limitations: 'Extra read-only tool calls can add substantial token, latency and tool cost; the top-line accuracy advantage is not an equal-budget advantage. The Accord baseline is a paper-based reimplementation and may differ from its original implementation. Read-only probes cannot resolve contradictory or underspecified user intentions; repeated suspicions can lead to loops. Tool semantics such as whether a call really is non-mutating must be trusted. Original arXiv submission November 2, 2026; no separate journal publication is indicated.',
    connections: ['This is falsification applied to tool execution: search for a counterexample rather than more confirming examples.', 'Use preflight checks for irreversible PR, deployment and payment operations before allowing the action.', 'Measure avoided harmful writes and success per dollar, not simply additional reasoning steps.'],
    verdict: 'Refutation-oriented preflight checking is promising, provided its extra calls and ambiguity handling are measured.'
  },
  {
    slug: 'predictive-guardrails-action-gap',
    title: 'More safety prediction does not mean safer agents.',
    subtitle: 'A diagnostic study separates forecasting, risk recognition and actual policy-following.',
    category: 'Safety',
    tags: ['Agent safety', 'World models', 'Policy enforcement', 'Evaluation'],
    publishedOn: '2026-11-03', paperDate: '2026-11-02',
    authors: 'Weixiang Zhao, Zhihao Liu, Guancheng Li, Yanyan Zhao, Bing Qin et al.',
    source: 'https://arxiv.org/abs/2611.02815v1',
    readMinutes: 10, level: 'Advanced', accent: 'peach',
    question: 'When a separate predictor warns an agent about the consequences of its next action, does the warning actually improve safe task completion?',
    intuition: 'Risk prediction has three possible points of failure: the forecast can be wrong, the controller can misunderstand a correct forecast, or a restrictive gate can block useful work without stopping every unsafe action. More prediction calls are not necessarily better governance.',
    mechanism: 'The authors contrast No Prediction with Prediction-Informed policies that read a world-model forecast and Prediction-Constrained policies that check candidate actions and may intervene before execution. They evaluate digital policy workflows in HarnessAudit and physical household tasks in IS-Bench. The main online comparison uses four policy backbones, with cross-predictor tests holding Qwen3.5-27B as the actor. Offline experiments analyze seven predictors at different action horizons, and controlled perturbations replace feedback with empty, irrelevant, corrupted or inverted predictions, plus sandbox-derived observations.',
    reportedResults: [
      'Across online experiments, mean tokens per digital task rose from 134,710.5 without prediction to 850,448.0 with constrained prediction (about 6.31 times); on physical tasks, from 44,681.1 to 140,805.6 (about 3.15 times).',
      'In a Qwen3.5-27B digital comparison, normal constrained predictions yielded safety adherence 85.10 and task completion 82.41; fully inverted feedback yielded adherence 90.13 but task completion only 13.67. Higher adherence alone can mask severe loss of utility.',
      'Even locally sandbox-verified action feedback did not eliminate downstream violations. Safety prediction also deteriorated at longer horizons; the paper does not support monotonic safety improvement from stronger prediction involvement.'
    ],
    evidence: 'Comparisons hold the actor backbone fixed within each primary online setting and include cross-model predictor substitutions. Safety, action validity and task completion are distinguished rather than collapsed into one success rate. Perturbed-feedback interventions test whether decisions use the actual forecast content, rather than merely reacting to the existence of a guard. Findings and numerical figures are author-reported, not independently replicated.',
    limitations: 'Integration settings abstract existing guardrail classes rather than test every deployed product. Stronger guarding intrinsically adds calls and replanning, so the modes are not compute- or wall-time-matched. Token count is not a universal monetary cost: providers and caching policies differ. Sandbox checks cover immediate candidate effects rather than every future consequence. Horizon indices count action records rather than common elapsed time. First posted November 2, 2026; no separate journal publication is indicated.',
    connections: ['This illustrates the gap between observability and control: knowing a risk is not enforcing a boundary.', 'An external least-privilege gate should enforce policy independent of an agents claimed intent or forecast.', 'Track both violation rate and successful permitted work, with resource-normalized comparisons.'],
    verdict: 'Evaluate whether predictions change authorized behavior, not how convincingly an agent forecasts risk.'
  },
  {
    slug: 'careful-bench-tool-side-effects',
    title: 'A correct final state can hide dangerous tool calls.',
    subtitle: 'CAREFUL-Bench audits destructive writes, redundant actions and actual consent.',
    category: 'Evaluation',
    tags: ['Tool calling', 'Side effects', 'Consent', 'Benchmarking'],
    publishedOn: '2026-11-03', paperDate: '2026-11-02',
    authors: 'Alexander Kovalenko and Artem Redchych',
    source: 'https://arxiv.org/abs/2611.02978v1',
    readMinutes: 10, level: 'Advanced', accent: 'blue',
    question: 'Can an agent be graded successful even if it performs unauthorized destructive operations or needless side effects along the way?',
    intuition: 'A benchmark that checks only the final database state may overlook duplicate writes, needless reads and actions the user never approved. Asking a clarifying question is also different from obtaining explicit consent to a destructive operation.',
    mechanism: 'CAREFUL-Bench instruments the Berkeley Function Calling Leaderboard multi-turn simulators. It infers effect metadata for all 128 functions by executing calls and diffing state, with three annotators deciding which writes are destructive. A deterministic replay scorer tracks unrequested destructive calls, duplicate non-idempotent writes, redundant reads and surplus steps. A second protocol lets a scripted user respond to proposed actions and tests whether destructive calls are explicitly confirmed.',
    reportedResults: [
      'The effect metadata and scorer reproduce official results on 800 reference trajectories. For 11 open models, effect-aware scoring largely preserves model rank (Spearman correlation 0.99), but the highest-scoring model loses 14.0 percentage points due to collateral destructive calls.',
      'Surplus steps consume roughly 2–28% of model input tokens across reported systems. Adding effect hints to tool documentation produced no statistically significant gain across eight evaluated models.',
      'Among 576 conversations requiring destructive actions, the most any of eight evaluated models completed with all such actions explicitly confirmed was six. An interactive user recovered up to four accuracy points for models willing to ask.'
    ],
    evidence: 'The paper pins the BFCL evaluation harness version, runs four multi-turn categories of 200 conversations each, and uses executable simulator state rather than an LLM judge for its replay score. Open models are served via vLLM on an A100 40-GB GPU; some reported runs reuse earlier logs, and one API model is measured separately. The authors include budget estimates and a reproducible harness. These results are author-reported, not independently replicated.',
    limitations: 'Simulators cannot observe side effects they do not model, such as an actual debit when placing an order. The destructive boundary is partly human/model-annotated; two annotators use the same model vendor, limiting independence. The scripted user can approve the right function with wrong arguments and cannot model real human risk preferences. Idempotence is sampled rather than formally proved; model decoding interfaces and some reused logs reduce absolute comparability. Larger proprietary API models were excluded on cost grounds. Original arXiv submission November 2, 2026; no journal publication is indicated.',
    connections: ['Effect systems and database transaction semantics distinguish reads, idempotent writes and irreversible operations.', 'Separate users consent for an exact action from generic clarification; require approval close to the actual side effect.', 'Benchmark tool agents on entire trajectories, including collateral actions and wasted compute, not only final-state matches.'],
    verdict: 'Treat side-effect safety and explicit authorization as first-class evaluation outcomes.'
  },
  {
    slug: 'verified-traces-to-agent-skills',
    title: 'Can an agent turn verified experience into reusable skills?',
    subtitle: 'Zep Agent Skills compiles cited procedures from successful traces, then governs their admission and reuse.',
    category: 'Memory',
    tags: ['Procedural memory', 'Agent skills', 'Verification', 'Evaluation'],
    publishedOn: '2026-11-04', paperDate: '2026-11-01',
    authors: 'Daniel Chalef, Peter Evans, Pavlo Paliychuk, Mehul Patel, Preston Rasmussen and Jack Ryan',
    source: 'https://arxiv.org/abs/2611.01386v1',
    readMinutes: 11, level: 'Advanced', accent: 'lilac',
    question: 'Can an agent retain a verified procedure from an earlier run and help a weaker model repeat the task without fine-tuning its weights?',
    intuition: 'A long transcript is a poor reusable instruction: it includes instance-specific values, irrelevant actions and possibly private information. A concise procedure with explicit preconditions, stop rules and evidence is more useful, but it becomes dangerous if the system admits unverified or poisoned instructions.',
    mechanism: 'Zep Agent Skills records task attempts as ordered Traces with independently authenticated verification strength. Only strongly verified successes support new procedures; failures can serve as contrast. A Reflector proposes an addition or local patch and cites trace events for each claim. A separate Curator checks support, conflicts and existing skills. Trusted code validates citations, scans for sensitive data and instruction injection, and applies admission policies to immutable versions. Skills are scoped to namespaces and task families, retrieved through lexical search, and rendered in the portable Agent Skills format with progressive disclosure. Verified usage updates retrieval rank.',
    reportedResults: [
      'Across three executor models and three principal benchmarks, the authors report positive paired pass-rate changes in all 26 model-effort cells. On AppWorld Train/Dev, GPT-6 Luna at low effort rises from 68.5% to 87.3% (+18.8 points; 95% CI +10.2 to +28.3).',
      'On EnterpriseOps-Gym, Claude Haiku 5.5 at low effort rises from 33.9% to 45.3% (+11.4 points; 95% CI +8.8 to +14.1). On tau-cubed banking, the pooled gain across eight cells is +8.6 points (95% CI +5.5 to +11.9), although only four cells pass Holm correction.',
      'On ALFWorld valid_unseen, Qwen3-8B improves from 42.8% to 75.4% (+32.6 points) from the weak base and from 74.6% to 82.8% (+8.2) from the strong base. The cited continuous-fine-tuning comparison uses different baselines and harnesses.',
      'For long banking tasks, tokens per passed episode fall by 7.0% to 44.6% across eight cells; on shorter AppWorld tasks they increase in seven of nine cells due partly to the fixed full-skill index.'
    ],
    evidence: 'The teacher is Claude Opus 5.5 at maximum effort for tau-cubed banking (97 tasks, four trials), AppWorld Train/Dev (147 tasks, three trials) and EnterpriseOps-Gym (625 tasks, three trials). Executors are GPT-6 Luna, Claude Haiku 5.5 and DeepSeek V4.1 Flash, paired by task and trial with and without compiled Skills. The authors report bootstrap intervals, multiplicity correction for banking and AppWorld, explicit benchmark modifications, hidden-check isolation and leakage scans. ALFWorld separately tests cross-room transfer. These results are author-reported; no independent replication was performed here.',
    limitations: 'The main three benchmarks reuse the same tasks the teacher attempted, so they primarily measure repeating known tasks, not generalization to new tasks. The Skills arm changes context length and tool access, and no separate arm isolates the skill-index overhead. In AppWorld the entire 62-skill index adds roughly 2,300 prompt tokens to every call, unlike production search. The reported fine-tuning comparison is cross-paper and not harness- or base-matched. Verified outcomes authenticate a verifier but do not prove that the verifier is correct; automatic admission and LLM-generated procedures retain poisoning risks. Some EnterpriseOps tasks regress after similar but contradictory procedures are merged. Authors are affiliated with the product vendor. Original arXiv v1 was posted November 1, 2026; no journal publication is indicated.',
    connections: ['Procedural memory is closer to a versioned build artifact with provenance than a transcript search result.', 'For agentic software engineering, bind every learned repair procedure to passing tests, source traces and an explicit applicability contract.', 'Evaluate skill retrieval with held-out task families, matched token and tool budgets, poisoning probes and rollback tests before trusting automatic promotion.'],
    verdict: 'Verified, cited skills can make repeated tasks more reliable, but cross-task transfer and safe automatic admission remain open questions.'
  },
  {
    slug: 'verified-but-vacuous-code-proofs',
    title: 'A proof checker can accept code that proves almost nothing.',
    subtitle: 'Three failure surfaces separate verifier acceptance from specification fidelity.',
    category: 'Verification',
    tags: ['Coding agents', 'Formal verification', 'Specifications', 'Evaluation'],
    publishedOn: '2026-11-06', paperDate: '2026-11-05',
    authors: 'Aditya Vempaty et al.',
    source: 'https://arxiv.org/abs/2611.05590v1',
    readMinutes: 11, level: 'Advanced', accent: 'mint',
    question: 'When a coding agent produces a machine-checked certificate, what exactly has been proved?',
    intuition: 'A formal verifier can prove a vacuous contract perfectly. Acceptance only means the implementation satisfies the obligations actually supplied to the verifier, not necessarily the human requirements.',
    mechanism: 'The authors separate three surfaces: A, the verifier accepts; B, the implementation certificate syntactically binds to an externally named specification predicate; and C, the specification is semantically strong enough to reject incorrect implementations. They reproduce a Dafny-as-intermediate-language pipeline with Claude Opus 4.7, then build a seven-agent VCG pipeline that explicitly enforces a binding gate and tests generated Rust against hidden oracles.',
    reportedResults: [
      'On HumanEval, the Li@Opus reproduction obtains 99.1% Dafny acceptance but only 1.9% certificates bound to a specification-defined predicate or function; binding remains 1.9–2.7% across three Python benchmarks.',
      'Among 1,080 fully verified MBPP-Rust attempts, 124 fail hidden tests (11.48%); among 1,545 fully verified VeriContest-LC attempts, 229 fail (14.82%). These are conditional failure rates among verified outputs, not rates across all attempts.',
      'The authors compare 164 HumanEval, 228 LeetCodeDataset, 1,055 LiveCodeBench v6, 208 MBPP-Rust and 687 VeriContest-LC problems, typically ten samples per problem.'
    ],
    evidence: 'All three primary pipelines use Claude Opus 4.7 via Vertex AI; VCG uses Dafny 4.10 and Z3 4.13. The paper discloses compilation and harness-shimming exclusions and distinguishes same-backend experiments from external, unmatched published baselines. Hidden tests provide an operational proxy for semantic fidelity. All numerical results are author-reported; no independent replication was performed here.',
    limitations: 'Same model does not mean equal token, repair, time or monetary budgets; the external VeriContest comparison also differs in sampling. The ensures-binding gate is a syntactic necessary check, not a proof that a specification captures intent. Hidden-test failures could reflect transpilation or oracle disagreements, not solely weak specifications. Main-body results are point estimates without confidence intervals. All primary runs use one model family. The paper was first submitted November 5, 2026, with no journal version identified.',
    connections: ['The difference between proof validity and specification validity mirrors the difference between passing tests and satisfying requirements.', 'For autonomous PR agents, require both a machine-checkable invariant and independent behavioral acceptance tests.', 'Record the exact proof obligation and assumptions alongside every claimed verified completion.'],
    verdict: 'A green verifier result is evidence about the supplied contract, not automatic evidence that the contract is correct.'
  },
  {
    slug: 'verified-tool-health-agent-routing',
    title: 'Give agents measured tool health, not guesses.',
    subtitle: 'Verified telemetry can improve route choice before a tool call.',
    category: 'Reliability',
    tags: ['Tool use', 'Harnesses', 'Observability', 'Evaluation'],
    publishedOn: '2026-11-06', paperDate: '2026-11-05',
    authors: 'Manu Agrawal and Shrey Nagpal',
    source: 'https://arxiv.org/abs/2611.05391v1',
    readMinutes: 9, level: 'Advanced', accent: 'blue',
    question: 'Can a tool-using agent choose a healthier execution route if the host exposes fresh, independently observed failures and latency?',
    intuition: 'An agent may favor the first familiar tool even when an equivalent route is unhealthy. A compact host-owned snapshot can turn tool selection from intuition into a decision informed by current measurements.',
    mechanism: 'Agent Harness Awareness proposes a structured state snapshot for operational context. The evaluated ToolRoute slice exposes recent successes, exponentially weighted latency, consecutive failures, circuit state and freshness for two equivalent routes. The main ablation compares task-only instructions (A), an identical but neutral telemetry envelope (B), and actual host-verified state (C). A second study executes selected routes over local HTTP/TCP with OpenTelemetry spans and Toxiproxy-injected latency, connection and HTTP faults.',
    reportedResults: [
      'In 216 frozen decisions across three model families and three information conditions, verified state achieved 69/72 single-dispatch completions (95.8%) versus 50/72 (69.4%) for the neutral structural control, a 26.4-point difference.',
      'The authors report mean observable policy regret of 131.12 ms with verified state versus 4,251.54 ms for neutral state (96.9% lower). This regret includes frozen synthetic failure and waiting penalties, not measured network latency alone.',
      'In the separate 27-decision live transport study, verified state completed 9/9 actions against 5/9 for the neutral control; the nine verified-state cases are too few for a broad population-level claim.'
    ],
    evidence: 'The controlled study uses GPT-5.6 Sol, Claude Sonnet 5 and Gemini 3.7 Flash with frozen conditions and no request retries. The live study retains OpenTelemetry spans, injected fault manifests and post-action outcomes. The neutral-envelope control isolates route-relevant information from merely showing an extra interface. The authors report Wilson intervals and frozen analysis artifacts; findings are not independently replicated here.',
    limitations: 'The two routes are functionally equivalent, and the tasks measure pre-dispatch selection, not heterogeneous tool choice, non-idempotent operations or autonomous multi-step recovery. There are only nine live decisions per condition. Regret is based partly on a designed cost function, and route naming/order may bias neutral choices. The study does not equalize provider billing, total context tokens or production latency across every deployment. A stale snapshot can mislead unless the host revalidates before execution. The arXiv version is listed November 5, 2026; an inconsistent internal manuscript date should not override the submission record.',
    connections: ['This is a control-plane/data-plane separation: the host measures reliability, while the model chooses among permitted routes.', 'For coding agents, supply verified sandbox, queue, tool and quota status instead of asking the model to infer availability from failed calls.', 'Compare against deterministic middleware failover; simple replica selection may not require an LLM at all.'],
    verdict: 'Host-verified telemetry improves tested route decisions, but deterministic routing remains the appropriate baseline for equivalent replicas.'
  },
  {
    slug: 'continuous-benchmark-maintenance-debt',
    title: 'Benchmarks break as agents improve.',
    subtitle: 'Terminal-Bench 2.1 shows why executable evaluations need versioned repairs and resource audits.',
    category: 'Evaluation',
    tags: ['Coding agents', 'Benchmark validity', 'Harnesses', 'Verification'],
    publishedOn: '2026-11-07', paperDate: '2026-11-05',
    authors: 'E. Kelly Buchanan, Crystal Zhou, Scott W. Linderman and Christopher Ré',
    source: 'https://arxiv.org/abs/2611.08417v1',
    readMinutes: 11, level: 'Advanced', accent: 'blue',
    question: 'If a coding agent fails a benchmark, how do we know the agent is wrong rather than the task, environment, verifier or time limit?',
    intuition: 'Executable benchmarks are software systems, not immutable answer sheets. Valid new solutions can violate a narrow grader, dependencies drift, and the reference solution itself can exhaust resources. A benchmark score therefore measures an agent interacting with a particular version of a task and its execution budget.',
    mechanism: 'The authors build a continuous-validation workflow that collects community issue reports, task files and execution traces. An auditor agent proposes cited diagnoses and repairs; automated oracle checks rebuild and exercise reference solutions; human maintainers approve changes. Repairs address instruction–verification mismatch, environment resource failures and task drift. Terminal-Bench 2.0 is audited and released as 2.1, then 19 agents are evaluated on both versions. Separate longer-time-budget experiments probe harness speed confounds.',
    reportedResults: [
      'The authors identify 28 defective tasks, roughly 30% of Terminal-Bench 2.0, including 12 cases of post-release drift. They repair the benchmark rather than simply deleting all flagged cases.',
      'Across 19 agents, benchmark repairs shift individual accuracy by up to 12 percentage points and leaderboard position by up to three places, although rank correlation remains high: Spearman rho 0.958 with task-bootstrap 95% interval [0.881, 0.979].',
      'Increasing the wall-clock budget closes a roughly 20-point harness gap on GPT-5.4 and shrinks an approximately 30-point gap to five points on GPT-5.4 mini. Thus fixed-time rankings partly measure execution speed rather than eventual task completion.'
    ],
    evidence: 'The paper documents a versioned TB2.1 repair artifact, oracle rebuilding, trace-backed issue adjudication, and re-evaluation of 19 model–harness combinations under a shared benchmark protocol. A separate Harbor-Index audit finds additional defects but also misses some found by manual review. Confidence intervals are task-bootstrapped; the longer-budget condition covers only a subset of agents for cost reasons. All numbers are author-reported, not independently replicated.',
    limitations: 'The repaired task set is not a random sample of all coding-agent benchmarks, and maintainer adjudication can introduce judgment calls. Not all environments or providers share identical execution infrastructure, and time-budget experiments are not a fully matched dollar/token comparison. Repairs can change what the benchmark measures, so both old and new versions must remain attributable. Some bugs escaped the automated workflow. The arXiv record lists v1 submitted November 5, 2026; no journal publication is indicated.',
    connections: ['Treat benchmarks like production software: pin dependencies, version task digests, run regression checks and review changes.', 'A model–harness leaderboard must disclose wall time, output-token ceilings, sandbox resources and benchmark version.', 'Distinguish a failed agent patch from a defective oracle before using that trace for agent training.'],
    verdict: 'Continuous benchmark maintenance is part of measurement validity, not an optional cleanup step.'
  },
  {
    slug: 'mcphallu-agent-failure-subtypes',
    title: 'Tool agents can fail in four different ways.',
    subtitle: 'MCPHallu isolates branch errors, impossible goals, tool misuse and forgotten state.',
    category: 'Evaluation',
    tags: ['MCP', 'Tool use', 'Agent memory', 'Failure analysis'],
    publishedOn: '2026-11-07', paperDate: '2026-11-05',
    authors: 'Yizhen Jiang, Haowei Guo, Tianyi Bai, Zengjie Hu, Lu Ma, Zhengyang Zhao, Haoze Sun, Peng Pei and Wentao Zhang',
    source: 'https://arxiv.org/abs/2611.07689v1',
    readMinutes: 10, level: 'Advanced', accent: 'mint',
    question: 'Why does an agent with valid MCP tools still claim completion of impossible tasks, choose misleading tools or forget earlier state?',
    intuition: 'A single end-to-end success score hides distinct failure mechanisms. An agent might correctly execute calls yet aggregate the wrong branch, confuse similar tool schemas, keep working toward an unreachable goal, or fail to preserve state across a long interaction. Those require different fixes.',
    mechanism: 'MCPHallu builds 358 tasks in search, analytics, productivity, finance and coding, using 36 production MCP servers in isolated containers. Each task has a designed structural trigger for Branch Collapse, Unreachable Goal, Tool Misuse or Context Forgetting. Reference scripts, post-execution state assertions, dependency graphs and tool-confusion checks provide deterministic evidence; an LLM judge contributes a minority share of the subtype score. Fourteen models are tested in a ReAct-style loop with a 128k context window and a 20-tool-call limit.',
    reportedResults: [
      'Across 5,012 agent trajectories, the 14-model mean composite score is 0.642 on a zero-to-one scale; the highest model score is 0.728. The overall binary pass rate is 47.8%.',
      'Unreachable Goal is the hardest subtype for 12 of 14 models: its average score is 0.458 and only 23.2% of runs pass. Continuing to act or falsely claiming success is a frequent failure.',
      'Model ranks move by an average 6.9 of 13 positions across subtypes; Branch Collapse and Unreachable Goal scores have correlation r = -0.12 across models. A single aggregate leaderboard hides specialization.'
    ],
    evidence: 'All evaluated models share a ReAct-style framework, a 20-call tool budget, task-specific tool inventories and fresh container state per episode. The authors report expert subtype-attribution agreement, cross-judge and human checks, uncertainty and score-weight sensitivity analyses, plus released benchmark code and pinned server versions. The primary semantic judge is GPT-4o, while Claude Sonnet 4.6 generated tasks. These are author-reported results, not independently replicated.',
    limitations: 'Designed triggers promote a failure subtype but do not establish causality or statistical independence of reasoning, execution and memory errors. The task generator and judge are proprietary, and deterministic scoring is not complete: semantic judgment contributes 20–30%. Sixteen of 36 servers require external credentials, complicating fully offline reproduction. The inventory is static per task, mostly English and Western SaaS, excluding cross-session memory and dynamic server churn. A shared tool-call cap does not equalize provider costs, latency or total tokens. The original arXiv v1 was submitted November 5, 2026; no journal publication is indicated.',
    connections: ['For production MCP agents, measure false completion, mistaken tool selection and state persistence separately.', 'Infeasibility recognition should be rewarded when a goal cannot be met, without rewarding blanket refusal.', 'An agent can look competent on easy tool calls yet be unreliable under long-horizon branching and state changes.'],
    verdict: 'Failure-mode-specific evaluation is more actionable than one aggregate agent score.'
  },
  {
    slug: 'coati-host-grounded-mobile-agents',
    title: 'Let the phone verify what the agent actually did.',
    subtitle: 'Coati joins host evidence, guarded memory and step-level routing for installable mobile agents.',
    category: 'Reliability',
    tags: ['Mobile agents', 'Verification', 'Memory', 'Tool use'],
    publishedOn: '2026-11-08', paperDate: '2026-11-02',
    authors: 'Yudou Ying, Pu Shi, Hanlei Shi and Yuhua Zheng',
    source: 'https://arxiv.org/abs/2611.02644v1',
    readMinutes: 9, level: 'Advanced', accent: 'mint',
    question: 'If a GUI agent says a tap worked or a task is finished, what independent evidence should justify believing it?',
    intuition: 'A model can misread a screen transition, declare success prematurely or repeat expensive reasoning for simple taps. The host that executes actions can instead record state changes, use those observations to audit completion, and remember only interface facts supported by evidence.',
    mechanism: 'Coati runs as an installable Android app. VerifyLoop compares action outcomes and final completion claims with host-observed screens and progress; unauditable completion is marked unverified. AppMemory keeps per-app living manuals tied to package identity, version and locale, admitting sanitized observations only when supported by stable interface evidence and a successful completion audit. A fast selector handles host-resolvable steps; uncertain steps return to a larger reasoning model, and the host can execute a planned loop of simple actions while tracking progress.',
    reportedResults: [
      'On all 116 AndroidWorld tasks over three trials with Gemini 3.8 Flash as the common backbone, Coati reports 86.5% success versus 77.6% for Artemis in accessibility-only mode and about 59% for FinalRun and Midscene.',
      'The authors report about one-third fewer false completion claims with VerifyLoop at comparable success. In everyday tasks, routed execution cuts median task time by 39% at comparable success; three of four repetitive loops are 2.8–5.4 times faster with 6–9 times fewer model tokens.',
      'In three repeated-navigation learning sessions, a deep unfamiliar route falls from a median 18.5 steps without memory to 6–7 after learning. On an Android 16 phone, 27 routed runs finish versus 26 per-step runs, with critical-path reasoning calls falling from 285 to 67.'
    ],
    evidence: 'The AndroidWorld comparison fixes the 116 tasks, official evaluators, task seed, Android 13 emulator, model backbone and per-task step budget, and reruns environment failures consistently. The released opponent implementations are adapted to the shared harness. Separate paired everyday-task, loop and memory experiments isolate operational mechanisms; an Android 16 phone provides a smaller hardware check. The paper and appendices document implementation and protocols. All results are author-reported, not independently replicated.',
    limitations: 'The standardized official step limits are far tighter than some opponents released configurations, and accessibility-only operation excludes privileged ADB and root database actions; comparisons therefore do not reproduce each opponents headline setup. The principal benchmark uses one backbone and emulator, while everyday memory evidence relies on small fixture-app samples. Token counts and latency are not equal-budget controlled; server delays matter. Screenshots and descriptions can leave the device for external models, and autonomous Accessibility Service use faces app-store restrictions. Original arXiv v1 submitted November 2, 2026; no journal publication is indicated.',
    connections: ['A completion claim is an assertion; a host-recorded postcondition is evidence.', 'Verified procedural memory should be admitted only after successful execution and checked against current app identity.', 'Routing simple GUI steps resembles a fast-path/slow-path architecture, but pre-commit gates should retain control over consequential actions.'],
    verdict: 'Ground completion and memory in observed execution, while treating the reported speed gains as task- and platform-specific.'
  },
  {
    slug: 'crossswe-cross-repository-coding',
    title: 'A patch can work locally and still break its neighbor.',
    subtitle: 'CrossSWE tests whether coding agents maintain contracts across repository boundaries.',
    category: 'Evaluation',
    tags: ['Coding agents', 'Cross-repository', 'Compatibility', 'Benchmarks'],
    publishedOn: '2026-11-08', paperDate: '2026-11-01',
    authors: 'Silin Chen, Yuling Shi, Heng Lian, Zihan Zhang, Xiaodong Gu, Haotian Lin and Zhensu Sun',
    source: 'https://arxiv.org/abs/2611.01484v1',
    readMinutes: 9, level: 'Advanced', accent: 'blue',
    question: 'Can a coding agent change a library and its consumer together, preserving the interface between them?',
    intuition: 'Ordinary repository benchmarks usually grade one patch in one codebase. Real changes to APIs, protocols and dependencies can require coordinated fixes in two or more repositories; success in one checkout can coexist with a broken contract in another.',
    mechanism: 'CrossSWE constructs 171 real-world instances spanning 165 repositories, 20 domains and 13 languages. Each task provides multiple repositories at pinned base commits inside a Docker environment and tests the combined final state. Human screening removes merely documentary cross-links; the construction pipeline checks that modifying only one repository cannot satisfy the joint task. Five models use the same mini-SWE-agent v2.4.6 shell harness, high reasoning effort, a 300-step cap and a $10 maximum model cost per instance.',
    reportedResults: [
      'The authors report Pass@1 of 58.48% for GPT-6.1 Sol, 52.63% for DeepSeek V4.1 Flash, 50.29% for Claude Sonnet 5.5, 45.03% for Qwen3.8-Flash-Next and 43.86% for GLM-5.3 Flash.',
      'In 330 derived single-side tasks from the two-repository instances, GPT-6.1 Sol rises from 58.48% joint to 64.55% single-side, and DeepSeek V4.1 Flash rises from 52.63% to 61.81%. These are related but not identical task formulations.',
      'Cross-repository inconsistencies account for 44.2% of GPT-6.1 Sol failures, 41.2% of Claude failures, 29.2% of DeepSeek failures and 40.7% of GLM failures. Average steps vary substantially by model, from 29.2 for Claude to 182.1 for Qwen.'
    ],
    evidence: 'Instances derive from GitHub development history and include gold patches, executable tests and multi-repository environments. A shared harness, fixed task set and common step and dollar ceilings improve comparability. The paper reports input/output tokens, steps and cost as well as success; its single-side contrast tests whether joint modification is harder than access to multiple repositories alone. Benchmark materials are described in the appendix. All figures are author-reported, not independent replication.',
    limitations: 'Most instances (165 of 171) involve exactly two repositories, and the participating repositories are supplied rather than discovered. Manual failure categorization may introduce subjective boundaries. Shared ceilings do not equalize realized tokens, latency or dollars across models; different model-specific interaction patterns confound architecture-level conclusions. The comparison with a separate benchmark score is not harness- or task-matched. Reproducibility depends on availability of pinned dependencies and benchmark artifacts. Original arXiv v1 submitted November 1, 2026; no journal publication is indicated.',
    connections: ['Cross-repository development resembles distributed schema migration: compatibility must hold at every interface, not just inside each service.', 'A useful coding-agent test should run provider and consumer integration checks against the combined patch.', 'A multi-agent split by repository can increase coordination risk unless an integration verifier owns cross-boundary contracts.'],
    verdict: 'Evaluate coding agents on jointly necessary changes and interface consistency, not merely isolated patch success.'
  },
  {
    slug: 'decaf-decomposed-harness-optimization',
    title: 'Optimize the agent pipeline one dimension at a time.',
    subtitle: 'DeCAF diagnoses prompts, topology, model selection and tool policies before composing a new harness.',
    category: 'Evaluation',
    tags: ['Harnesses', 'Optimization', 'Coding agents', 'Cost'],
    publishedOn: '2026-11-09', paperDate: '2026-11-05',
    authors: 'Divij Handa, Christopher Tensmeyer, Jihyung Kil and Vlad I. Morariu',
    source: 'https://arxiv.org/abs/2611.08723v1',
    readMinutes: 10, level: 'Advanced', accent: 'mint',
    question: 'Can a coding agent improve an entire agent harness more reliably by testing isolated design dimensions than by rewriting the whole pipeline at once?',
    intuition: 'Prompts, agent topology, model choice and tool policies interact, so a monolithic optimizer has difficulty identifying which change helped. Isolating dimensions yields interpretable experiments, while a final synthesis step tests whether individually promising changes coexist.',
    mechanism: 'DeCAF partitions harness search into dimensions, uses coding agents to run targeted experiments on each, and composes their findings into a candidate pipeline. A component-level trajectory evaluator derives rubrics from individual agent instructions to diagnose where the resulting pipeline underperforms. The authors evaluate held-out tasks from AppWorld, LiveCodeBench, AgentDojo and PostTrainBench v1.1 against an unoptimized seed and GEPA, MASPO and Meta-Harness optimizers; they also examine stronger unoptimized model backbones.',
    reportedResults: [
      'Across four benchmarks, the authors report an average 2.58-percentage-point task-performance gain, 4.30% lower deployment inference cost and 42.45% lower per-task latency than Meta-Harness. These aggregate figures mix different benchmark-specific performance metrics.',
      'In the AgentDojo comparison, DeCAF reports 85.4% under-attack task performance, 91.6% benign performance and 0.7% attack success, with $0.0126 per-instance inference cost and 25.6-second latency. Meta-Harness reports 85.4%, 89.0%, 1.0%, $0.0133 and 37.4 seconds respectively.',
      'Optimization itself is not free: the AgentDojo DeCAF search consumed $26.48 and 4h43m of optimizer time, while Meta-Harness used $28.74 and 7h12m. On some other tasks, DeCAF spends more optimization budget than alternatives.'
    ],
    evidence: 'The paper provides separate development and held-out test splits, per-instance deployment cost and latency, one-time optimizer cost and wall time, stronger-backbone controls, ablations, algorithm details and prompts. Parallel dimension search can reduce elapsed optimizer time without reducing aggregate work. The paper reports mean scores with standard errors for benchmark-specific comparisons. All figures are author-reported, not independently replicated.',
    limitations: 'Different optimizers may consume different search budgets and wall time, so performance is not an equal-budget causal comparison. A stronger backbone can outperform optimized smaller-model pipelines in raw success at greater cost. The average 2.58-point improvement pools heterogeneous metrics; it is not a universal percentage-point gain on every benchmark. Generated code and LLM-derived component rubrics can introduce optimizer-specific judgment errors. First arXiv version submitted November 5, 2026; no journal publication is indicated.',
    connections: ['Treat harness tuning like controlled software experimentation: change one dimension, inspect trajectories and verify held-out behavior.', 'Measure deployment cost separately from the one-time search cost, and amortize optimization across expected task volume.', 'A final integration test is essential because locally beneficial modifications may interfere when combined.'],
    verdict: 'Decomposed harness search offers a testable engineering workflow, but its advantage must be judged with full optimization budgets.'
  },
  {
    slug: 'memorydojo-cross-session-poisoning',
    title: 'A poisoned memory can outlive the attack.',
    subtitle: 'MemoryDojo traces how untrusted instructions are stored, retrieved and acted upon across sessions.',
    category: 'Safety',
    tags: ['Agent memory', 'Prompt injection', 'Evaluation', 'Security'],
    publishedOn: '2026-11-09', paperDate: '2026-11-06',
    authors: 'David H. Yang, Blake Bullwinkel, Amanda Minnich, Mohammad Mohammadi Amiri and Giorgio Severi',
    source: 'https://arxiv.org/abs/2611.09721v1',
    readMinutes: 11, level: 'Advanced', accent: 'peach',
    question: 'If malicious instructions appear in one session, can an agent memory system preserve them and cause unsafe behavior in unrelated later sessions?',
    intuition: 'A transient malicious message may be promoted into durable memory and later retrieved as seemingly trusted context. A single attack-success number hides whether the payload was stored, survived memory consolidation, resurfaced during retrieval or actually changed behavior.',
    mechanism: 'MemoryDojo runs 155 multi-session trajectories, totaling 2,162 task sessions across workspace, travel, banking and Slack scenarios, against five memory architectures: A-MEM, Graphiti, Letta, Mem0 and Memora. It instruments insertion, persistence, retrieval and downstream behavioral reach, and tests optimized poisoning payloads as well as cross-domain and history-prefixed transfer. The goal is comparative diagnosis, not a claim that any one architecture is universally secure.',
    reportedResults: [
      'In one same-domain setting, the authors report A-MEM behavioral reach increasing from 45.70% to 70.97% after memory-aware payload optimization, while Letta rises from 16.67% to 50.54%. These are benchmark-specific attack metrics, not rates of compromise in production.',
      'The optimized same-domain results show sharply different storage and retrieval behavior: Mem0 insertion success is 77.42% and Graphiti insertion success 100%, yet their downstream behavioral reach is 39.78% and 30.11%, respectively.',
      'In history-prefixed cross-domain tests, reported behavioral reach ranges from 0% for Letta to 45.16% for Memora, underscoring the sensitivity to architecture and attack placement.'
    ],
    evidence: 'The paper separates 93 same-domain, 31 cross-domain and 31 history-prefixed cross-domain trajectories; it records insertion, retrieval and behavioral outcomes rather than relying on final answers alone. It also reports multiple agent-model settings and alternative placement experiments. Metrics have different denominators and should not be conflated. All results are author-reported, not independent replication.',
    limitations: 'The benchmark covers four application domains and five particular memory integrations, not all deployed agent memory systems. The authors state that code, benchmark data and integrations will be released later, limiting immediate independent reproduction. Poison optimization changes attacker effort, so optimized and unoptimized outcomes are not equal-attack-budget conditions. Results depend on retrieval policies, model backbones and constructed trajectories; cross-domain success does not imply general real-world prevalence. Original arXiv v1 submitted November 6, 2026; no journal publication is indicated.',
    connections: ['Persistent memory is a trust-boundary crossing: provenance and authorization should survive summarization and retrieval.', 'Security tests should measure insertion, retention, retrieval and behavioral effect separately.', 'Memory invalidation and quarantining suspicious content are as important as filtering the original tool response.'],
    verdict: 'Evaluate memory poisoning across sessions and architectures; do not treat stored text as trusted instruction.'
  },
  {
    slug: 'phantom-consensus-multiagent-judgment',
    title: 'A group of agents can agree on something none privately believed.',
    subtitle: 'PHANTOM-Bench distinguishes genuine collective judgment from conformity to ambiguous social signals.',
    category: 'Coordination',
    tags: ['Multi-agent', 'Evaluation', 'Reasoning', 'Governance'],
    publishedOn: '2026-11-09', paperDate: '2026-11-06',
    authors: 'Disha Sheshanarayana, Rajat Subhra Pal, Manjira Sinha and Tirthankar Dasgupta',
    source: 'https://arxiv.org/abs/2611.08971v1',
    readMinutes: 9, level: 'Intermediate', accent: 'lilac',
    question: 'Does a multi-agent consensus reflect independently held judgments, or can ambiguous public signals manufacture the appearance of agreement?',
    intuition: 'When agents observe hints of what peers supposedly think, they may revise public decisions even though the private votes do not support the apparent majority. Final agreement alone therefore cannot distinguish evidence-based convergence from social-pressure artifacts.',
    mechanism: 'PHANTOM-Bench records isolated private judgments from four-agent groups, exposes ambiguous public signals, elicits agents estimates of their peers private judgments, and compares resulting public decisions with transparency, neutral-text and explicit-vote controls. The action set is proceed, block or defer/review. Metrics separate ordinary accuracy degradation, false inferred group beliefs, phantom-aligned failures and recovery after private judgments are revealed.',
    reportedResults: [
      'The authors report Qwen-2.5-7B accuracy falling from 77.0% in private judgment to 29.2% after ambiguous public signals, a 47.8-percentage-point decline; Qwen-2.5-32B falls from 73.1% to 42.1%, a 31.0-point decline.',
      'For Gemini-2.5-Pro, observed-public phantom-target alignment is reported at 19.4%, versus 6.5% with neutral public text and 15.1% with explicit voting. Other models show smaller or reversed differences relative to explicit voting.',
      'Scenario-level bootstrap confidence intervals preserve the within-scenario four-agent grouping; the authors report that major trends persist under this resampling.'
    ],
    evidence: 'The experimental design separates private ground truth from inferred peer beliefs and tests neutral and explicit-vote controls, limiting the risk of interpreting any conformity as phantom consensus. Several open- and closed-weight models are compared using the same constructed decision format. The study also reports transparency-based recovery and bootstrap uncertainty. Results are author-reported, not independently replicated.',
    limitations: 'This is a controlled four-agent, three-action benchmark across five domains, not live multi-round agent deliberation. The public signals are designed stimuli, so measured failure rates cannot be projected onto deployed systems. Different model families may interpret the wording differently, and a shared prompt format does not guarantee equal model cost or reasoning budgets. The authors explicitly avoid claims about human-like theory of mind. Original arXiv v1 submitted November 6, 2026; accepted at the NeurIPS 2026 SocialAgent Workshop, with no separate journal version indicated.',
    connections: ['Require independent initial judgments before showing peer votes in multi-agent review systems.', 'Audit disagreement and changes of mind, not only final majority or consensus.', 'Transparency of private votes can help distinguish genuine agreement from inferred social pressure.'],
    verdict: 'Multi-agent consensus is not evidence of correctness unless the underlying independent judgments are observable.'
  },

  {
    slug: 'coding-agents-propagate-repository-vulnerabilities',
    title: 'Coding agents can copy the security mistakes they read.',
    subtitle: 'Paired repository contexts show how insecure examples become new vulnerabilities.',
    category: 'Safety',
    tags: ['Coding agents', 'Software security', 'Repository context', 'Evaluation'],
    publishedOn: '2026-11-11', paperDate: '2026-11-08',
    authors: 'Chenhao Sun, Niels Mündler-Sasahara, Mark Vero and Martin Vechev',
    source: 'https://arxiv.org/abs/2611.11455v1',
    readMinutes: 11, level: 'Advanced', accent: 'peach',
    question: 'If an agent is asked to implement the same feature twice, can merely changing the security of similar code elsewhere in the repository change whether its patch is vulnerable?',
    intuition: 'Repository examples act as implicit demonstrations. An agent that imitates surrounding conventions may copy a missing bounds check or unsafe input-handling pattern along with legitimate architecture. Being able to explain a vulnerability after writing it is not equivalent to avoiding it during generation.',
    mechanism: 'The researchers intervene on repository context while keeping the target implementation task fixed. In 96 backend tasks adapted from AutoBaxBench, agents implement a new service with no neighbors, secure neighboring services or insecure neighboring services; functionality and security tests grade the output. In a second evaluation, 20 paired tasks from five real C/C++ repositories mask memory-safety-critical code and vary only secure versus insecure analogous code elsewhere. Agents implement the missing region, build the project and face a vulnerability-specific proof-of-concept input. Prompt ablations ask agents to follow existing style, avoid copying bugs or follow generic security best practices.',
    reportedResults: [
      'In the backend setting, insecure neighbors lower the fraction of correct and secure implementations by an average 3.4 percentage points versus standalone generation across three agents; secure neighbors improve it by 4.4 points, yielding a 7.8-point secure-versus-insecure neighbor gap.',
      'Across five model-and-harness configurations on the paired C/C++ tasks, secure-context performance exceeds insecure-context performance by an average 35.4 percentage points. GPT-5.6 Sol drops from 91.0% to 42.0% under insecure context, a 49-point difference.',
      'In follow-up analysis of vulnerable implementations, agents identify their own introduced vulnerability in 69.9% of cases on average, while 76.5% of explanations attribute the choice to similar code elsewhere. Style-following prompts amplify propagation; security reminders mitigate but do not eliminate it.'
    ],
    evidence: 'The paired-context intervention is stronger than comparing unrelated projects because target instructions, security oracles and modified code locations remain fixed. The backend suite contains 96 tasks with three generations per task and condition; the C/C++ suite has 20 task pairs with five generations per task and condition. The authors test GLM 5.3, Claude Opus 5 and GPT-5.6 Sol in both settings, plus Claude Opus 5.5 and GPT-6 Astra on C/C++. They use functionality/security tests and build-plus-exploit checks rather than relying solely on LLM judgments. Source materials are linked at https://github.com/eth-sri/vulnerability-propagation. All figures are author-reported, not independently replicated.',
    limitations: 'The five configurations use different native harnesses (Claude Code 2.1.228 or Codex 0.147.0), reasoning settings (high, max or medium), and potentially different realized tool calls, tokens, latency and cost. Thus the within-configuration paired effect is more interpretable than cross-model ranking; no equal-cost claim is warranted. Only five C/C++ projects and 20 manually curated pairs were evaluated, with edits to analogous code constructed and validated by researchers. For C/C++, a successful build is used as the functionality check, which does not establish full functional correctness; a single vulnerability-specific PoC can miss other vulnerabilities. The follow-up explanation analysis is not a causal proof of the agents internal reasoning. This is not a longitudinal study of actual repository degradation over successive commits. Original arXiv v1 submitted November 8, 2026; no separate journal version is indicated.',
    connections: ['Repository code is a potentially untrusted demonstration source; treat security-sensitive patterns as hypotheses to audit, not conventions to imitate blindly.', 'Add independent static analysis, exploit/regression tests and review of copied patterns after the final patch.', 'In coding-agent benchmarks, pair identical tasks across secure and insecure contexts to isolate context contamination from model ability.'],
    verdict: 'Secure coding requires checking inherited patterns, not merely asking agents to follow local conventions.'
  },
  {
    slug: 'coding-agents-generalized-task-motion-planning',
    title: 'Coding agents can compile physical reasoning into reusable programs.',
    subtitle: 'A retrospective on generalized task-and-motion planning with simulator-driven program synthesis.',
    category: 'Planning',
    tags: ['Coding agents', 'Robotics', 'Program synthesis', 'Generalization'],
    publishedOn: '2026-11-12', paperDate: '2026-09-24',
    authors: 'Matteo Merler, Bowen Li, Josh Roy, Yichao Liang, Qianwei Wang, Yixuan Huang and Tom Silver',
    source: 'https://arxiv.org/abs/2609.30233v1',
    readMinutes: 11, level: 'Advanced', accent: 'mint',
    question: 'Can a coding agent discover a reusable policy for physical task-and-motion planning, rather than asking a language model to reason through every new instance?',
    intuition: 'A manipulation problem couples discrete choices about which object to move with continuous geometry, collision and dynamics constraints. A coding agent can use the simulator like an experimental scientist, testing hypotheses about physical behavior and compiling the resulting rules into an executable program. Once frozen, that program can act on unseen tasks without calling the model again.',
    mechanism: 'AgenticGenPlan gives a coding agent a task description, object-centric states, simulator reset/step access and a bounded synthesis budget. The agent writes Python probes, discovers how actions work, revises a class with reset and get_action methods, and tests it on generated instances. In the main setting, source code and hand-engineered planning abstractions are hidden; the sandbox permits NumPy and SciPy but no network access. The final program is frozen before it is tested on held-out instances. A separate source-access setting allows agents to inspect and reuse simulator implementation details.',
    reportedResults: [
      'The study covers 28 simulated environments (25 KinDER and three PDDLStream), seven synthesis settings and five independent runs per setting: 980 generated programs evaluated on 100 held-out instances each, totaling 98,000 evaluation episodes.',
      'Among the 16 environments with hand-engineered planners, the planner averaged 47% success, versus 82% for Claude Code with Opus 5, 95% for Codex with GPT-6 Astra and 56% for Codex with GPT-5.6 Sol. These values are specific to that 16-environment subset.',
      'For 14 planner-available environments spanning different object counts, the authors report average computation per new instance of about 29 seconds for planners, 2.1 seconds for Opus-generated programs and 0.5 seconds for Astra-generated programs; these exclude synthesis time.',
      'The source-access ablation improves mean success across all 28 environments for the stronger agents, but exposes simulator internals and helper routines that are deliberately inaccessible in the main setting.'
    ],
    evidence: 'The authors use a held-out evaluation protocol: each synthesized policy is frozen, then run on 100 unseen initial states per environment with a per-instance execution limit. Five independent synthesis runs expose variance. Comparators include hand-designed TAMP planners, one-shot generation and a reimplemented LLMGenPlan pipeline; the same Opus 5 model is used for the latter two baselines and the corresponding Claude Code agent, although tool access and interaction policies differ. They publish code, prompts and revision histories at https://github.com/agenticgentamp/agenticgentamp. All findings are author-reported, not independently replicated.',
    limitations: 'This is simulated planning with full observability and object-centric states, not demonstrated robustness on physical robots with noisy sensors and actuation. Traditional planners were available in only 16 of 28 domains, so aggregate comparisons must not mix denominators. Tool-enabled coding agents can run custom experiments, whereas LLMGenPlan receives fixed feedback; the methods are not matched on tool autonomy or wall-clock synthesis effort. Post-synthesis runtime excludes the cost of model calls and experiments during development, so faster deployment does not imply lower total lifecycle cost. Some dynamic 3D tasks remain unsolved, and outcomes vary across runs. This is a retrospective selection: the arXiv preprint was first submitted September 24, 2026; the source shows v1 and no separate journal publication.',
    connections: ['This is program synthesis as a form of amortized reasoning: spend computation once to produce a reusable policy for many later instances.', 'Simulator probes resemble active system identification and falsification-driven debugging.', 'Agent skill libraries can use the same pattern, but should keep evaluation seeds and acceptance checks isolated from the synthesis loop.'],
    verdict: 'A compelling example of agentic experimentation becoming executable competence, with strong simulated evidence but important real-world and total-cost limitations.'
  },
];
export const latestPapers = [...papers].sort((a,b) => b.publishedOn.localeCompare(a.publishedOn));
export const categories = [...new Set(papers.map(p => p.category))].sort();
export const formatDate = (iso: string) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'});
