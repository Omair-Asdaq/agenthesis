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
  }
];
export const latestPapers = [...papers].sort((a,b) => b.publishedOn.localeCompare(a.publishedOn));
export const categories = [...new Set(papers.map(p => p.category))].sort();
export const formatDate = (iso: string) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'});
