# The Execution Boundary of Autonomous Agents
## Authorization, irreversible effects, durable recovery, and trustworthy evaluation

**AGENTHESIS — Original research note | 12 November 2026**  
**Status:** Evidence-grounded technical synthesis and preregistration proposal; not a completed empirical study.  
**Research cutoff:** 2026-11-12.  
**Scope:** Tool-using software agents that invoke external APIs or delegate actions, particularly where actions cannot be undone by replaying the agent's own state.

> **Central thesis.** The next useful reliability question is not whether an agent can choose a tool or whether a framework can pause for approval. It is whether the *same approved logical action* retains its identity, authority, exact arguments and side-effect semantics through handoffs, retries, partial failures, changed policy, and recovery. This note proposes the **Authorized Effect Continuity (AEC)** problem as a research framing. The framing is original to this note; individual ingredients are well-established and have significant prior art.

---

## 1. Executive conclusions

1. **There is no general exactly-once guarantee at the agent state boundary.** Temporal's activity guidance explicitly describes workers performing an external activity and crashing before recording completion, causing a retry. LangGraph warns that interrupted or failed tasks may re-run, and the OpenAI Agents SDK warns that a previously approved, externally successful action can run again after resuming an old state snapshot. This is directly documented behavior, not a new vulnerability discovery. Sources: [S07], [S08], [S09], [S10].

2. **Protocol interoperability does not supply transaction semantics.** A2A v1.0 Section 3.3.1 specifies that Send Message operations **MAY** be idempotent and that agents may use messageId to detect duplicates. Its Section 7.6.4 explicitly leaves the scope, representation, validity, and revocation of in-task authorization to implementations, issuers, or extensions. There is no basis for describing A2A as universally unauthenticated; its Section 7 requires authentication and implementation-specific authorization. Source: [S01].

3. **Approval support is already real, and approval trust boundaries are documented.** The OpenAI Agents SDK supports per-tool approval interruptions and resumable RunState; its documentation warns that deserialized snapshots do not authenticate the state or approval submitter. PydanticAI supports approval-gated deferred tools, but explicitly says client-submitted approvals are not a substitute for server-side authentication and authorization. Neither example is, by itself, proof of a framework exploit. Sources: [S04], [S05].

4. **Capability mediation and argument provenance are NOT unexplored.** AgentCap (Oct/Nov 2026) describes a signed, budget-bounded, session-bound authorization gateway, attenuating delegation and protection of sensitive arguments by provenance. CaMeL, SAGA, an ICSE 2026 contribution, and OAuth token-exchange standards provide further prior art. An original contribution must specify a narrower distinction. Sources: [S11]–[S15], [S02].

5. **Effect correctness requires receiver participation.** Stripe API v1 explicitly supports idempotency keys, stores the first response after execution begins (including HTTP 500), compares retry parameters, and may prune keys after at least 24 hours. API v2 has different retry behavior. A locally recorded approval or a generic idempotency key is therefore insufficient without knowing the destination's actual deduplication and retention contract. Source: [S06].

6. **Evaluation has two independent validity threats.** A protection can trivially appear secure if it blocks legitimate actions; conversely, an agent can appear resistant to injection because it could not carry out the attacker's goal anyway. Moreover, LLM evaluators may make correlated errors. The proposal below therefore uses deterministic state ledgers as ground truth for side effects, and measures benign utility, attack-conditional utility, and adversarial effects separately. Sources: [S16]–[S20].

### Research positioning

This note does **not** claim that AEC is a new impossibility theorem, that no implementation has solved parts of it, or that the proposed combination has been experimentally validated. The plausible open empirical question is whether an *end-to-end, version- and authority-aware effect protocol* materially reduces unauthorized and duplicated external actions **without** excessive false refusals, latency, or operational complexity relative to existing practices.

---

## 2. How this investigation was conducted

### 2.1 Retrieval, inspection and interpretation

On 12 November 2026, the research process searched for protocol, tool-approval, durable-execution, idempotency, and authorization documents; opened official A2A and MCP security specifications, IETF RFCs, SDK documentation, Stripe and SPIFFE documentation, and research papers or publication landing pages. For an empirical paper, the inspection distinguishes full-text methods/results from an abstract or publisher summary. Source IDs and direct URLs are provided in Section 12.

The research deliberately examines **a targeted primary-source corpus**, not 5,000 papers. The claims in this note are based on the materials actually accessible below, not on an exhaustive systematic search. No framework source code was executed, no application exploit was attempted, and no experiment in Section 9 has been run. Pages on vendor documentation sites may update after this cutoff; dated specifications and paper versions are preferred where available.

**Inspected in relevant substantive sections (not always full page or entire repository):** A2A specification, MCP authorization security considerations, MCP security best practices, RFC 8693, RFC 9700, OpenAI Agents SDK approval/recovery guidance, PydanticAI deferred-tool guidance, LangGraph Graph/Functional API docs, Temporal activity and error-handling docs, Stripe idempotency reference, SPIFFE identity concepts, AgentCap methods/results/limitations, Apple/Kohli full HTML methods/results, and OpenAI's SWE-bench Verified audit.

**Publication-level metadata/abstract or official research summary only:** SAGA (NDSS 2026 landing page), ICSE-NIER verifiable tool-use work, NeurIPS AgentDojo landing page, IEEE SaTML CaMeL summary, and Microsoft's judge-calibration preprint summary. Their numerical claims below are explicitly attributed to authors and are not independently replicated.

**Failed or limited direct reads:** Springer full-text page for a November 10, 2026 authorization-assurance review could not be fetched; direct ACM DOI full text was blocked, while its publisher abstract was accessible; one MDPI article's full page was inaccessible although indexed methods/results snippets were available. These sources are not presented as fully inspected. Reference access is logged in Section 12.

### 2.2 Evidence grades

- **N (normative):** Explicit requirements or permissions in a published standard. Establishes what compliant implementations are expected to do, not their real-world compliance.
- **D (documented capability/limitation):** Official implementer guidance. Establishes stated behavior and constraints; does not prove deployed reliability or the absence of undocumented features.
- **E (empirical author-reported):** Paper methods and results actually inspected. Does not imply independent replication.
- **A (abstract only):** Abstract, author or publisher summary; corroboration of details remains necessary.
- **H (hypothesis):** A falsifiable proposition arising from synthesis, not an observed result.

Claims about unique novelty, global product coverage, patch completeness, prevalence, or attack probability are deliberately not made without appropriate sampling and versioned evidence.

---

## 3. The concrete failure: one logical action, several execution histories

Consider an agent asked to refund a purchase and email the receipt. The model proposes refund(order=R, amount=40). The user approves it. The gateway submits the refund, the payment provider commits it, but the worker loses the response or crashes before persisting the tool result. The runtime resumes from a checkpoint that still says the approved call is pending.

These are distinct facts:

- **Intent:** The person authorized a refund of 40 for order R.
- **Decision:** The policy accepted a specific normalized tool invocation.
- **Attempt:** A request was sent to the payment provider.
- **Effect:** The provider actually changed an external ledger.
- **Observation:** The orchestrator recorded an acknowledgment.
- **Recovery:** The orchestrator decided whether to retry, reconcile, or compensate.

The common design error is to equate an orchestration checkpoint with an external-effect record. Temporal warns that an Activity can execute more than once even when its completion is reflected once in workflow history [S09]. LangGraph says unfinished tasks can be retried after replay [S08]. OpenAI says approved state and successful external effect can diverge after a crash [S04].

This is the **unknown-outcome window**. A local process cannot infer from a missing acknowledgment that the destination did not commit. Traditional distributed-systems design uses recipient-supported idempotency keys, transactional outboxes, reconciliation, and compensating actions as applicable. The challenge for tool-using agents is preserving the **logical identity and authorized parameters** across agent-generated retries and changing contextual state.

### 3.1 Proposed invariant set

For logical action A, define:

- P(A): authenticated principal and delegated actor lineage;
- Q(A): canonical tool name, resource, arguments, and intended effect;
- V(A): tool contract/schema version and policy version relevant to authorization;
- K(A): stable idempotency/deduplication key and destination namespace;
- G(A): bounded grant/approval with expiry and applicable revocation rules;
- E(A): observed external effect state, which may initially be UNKNOWN.

A production controller should try to preserve:

**I1 — Identity continuity.** Every retry or reconciliation refers to the same K(A), Q(A), and destination. A new key is a new logical action and requires a new authorization decision.

**I2 — No privilege expansion.** An executing child agent cannot enlarge the rights or change the resource granted to its ancestor. Actor lineage must be authenticated independently of the model's text.

**I3 — Approval-to-effect binding.** The action at the executor must match the normalized operation actually reviewed, unless the review protocol explicitly authorizes a bounded transformation.

**I4 — Revocation safety.** A revoked grant prevents starting a new protected external effect. However, safe read-only reconciliation of an already possibly committed effect may still be necessary; denying reconciliation must not force an unsafe blind retry.

**I5 — Receiver-based deduplication.** Repeating a request within the destination's deduplication window cannot create an additional effect for the same logical action.

**I6 — Honest observation.** UNKNOWN is not FAILURE and is not SUCCESS. A terminal result is emitted only when the actual destination ledger, a trustworthy acknowledgment, or a well-defined compensation outcome supports it.

**I7 — Version consistency.** The action descriptor reviewed by the user must not silently change meaning when a tool server updates its schema, backing API, policy, or routing during a pause.

These invariants are proposed **system-level requirements**, not guarantees supplied by any one framework. Some may be impossible to meet if the downstream service neither supports deduplication nor allows reliable reconciliation.

---

## 4. What the protocols actually specify

### 4.1 A2A: explicit implementation responsibility

From A2A v1.0 [S01]:

- Section 3.3.1: Get operations are naturally idempotent; Send Message operations MAY be idempotent and may use messageId for duplicate detection; cancellation is idempotent under its stated semantics.
- Sections 7.3–7.5: the server MUST authenticate incoming requests under its declared scheme; authorization is determined by the authenticated identity and server policy. A2A is **not** correctly described as accepting any bearer of a task identifier as authorized.
- Sections 7.6.1–7.6.4: TASK_STATE_AUTH_REQUIRED helps coordinate obtaining authorization, but the task state itself is not a grant. Authorization scope, representation, validity, and revocation are not fixed by the protocol.
- Section 7.6.3: the spec highlights credential propagation risks across delegated agent chains and recommends binding credentials to the originating agent.

**Implication (inference):** an A2A-compliant orchestrator and an A2A-compliant task server can still disagree on application-level deduplication, authorization lifetime, credential scope, and task-to-effect coupling. To measure that gap, use two independently implemented conforming endpoints rather than invent a malformed-protocol attacker.

### 4.2 MCP: audience restriction is necessary but not sufficient

The MCP July 28, 2026 authorization security considerations [S03] require the client to specify an intended resource and require servers to validate tokens against their own audience. They forbid taking an inbound MCP token and simply forwarding it upstream as the upstream API's authorization. They discuss confused-deputy and authorization-code attacks. The security-best-practices document [S03b] adds threat-specific requirements, including single-use OAuth state handling.

**Implication (inference):** correct audience restriction prevents a token-for-A being reused as a token-for-B. It does not answer whether a user really approved transfer(40, vendor-X), whether a particular argument came from low-trust tool output, or whether a duplicate request has already committed.

### 4.3 Existing identity and delegation machinery

RFC 8693 [S02] formally distinguishes impersonation from delegation, supports subject_token and actor_token, and describes the JWT act claim for actor/delegation information. RFC 9700 [S02b] is the OAuth 2.0 Security BCP, covering current replay, privilege-restriction, redirect, and authorization-server threats. SPIFFE [S12] defines verifiable workload identities and short-lived SVIDs, and advises using X.509-SVIDs where practical to reduce replay exposure.

**Implication:** claims that secure delegation, actor identity, or attenuated authority are wholly new for AI agents ignore decades of identity systems and recent agent-specific implementations. The research question is the *composition* of those identities with the exact approved action and external-effect lifecycle, not inventing a new identity credential.

---

## 5. SDK approval and durable-execution guarantees

| Mechanism / source | Directly documented ability | Critical boundary not automatically guaranteed |
|---|---|---|
| OpenAI Agents SDK [S04] | Per-tool interruptions; approve/reject pending tool calls; serialized RunState; nested approvals | RunState deserialization does not authenticate owner or snapshot; an approved external effect may repeat after a crash |
| PydanticAI [S05] | Deferred tool calls, optional require-approval and argument-dependent approval, call-ID mapping, optional approved argument overrides | Client-submitted history and approvals require separate server authorization; an approved argument override must itself meet policy |
| LangGraph [S08] | Checkpointed graph and task recovery, interruption, replay from checkpoints | Re-execution of incomplete tasks and side effects requires idempotence; in-memory checkpointers do not survive process restart |
| Temporal [S09–S10] | Durable orchestration, activity retry and replay, timeouts, compensation patterns | An activity may have executed before an unreported worker crash; at-least-once execution is not exactly-once side effect |
| Stripe API [S06] | Receiver-side keyed deduplication and parameter comparison for specific API versions | API-v1 retention can expire after at least 24 hours; API-v1 and v2 error handling differ; not a universal contract |

The phrase “supports HITL” describes a UI/run-loop feature, not a statement that the human reviewer is authenticated, the decision is replay-resistant, the action is bound to a canonical hash, or a remote transfer is deduplicated.

A narrow but important fact in PydanticAI's current guide is that DeferredToolResults can include a ToolApproved decision with optional override_args [S05]. That is intentional functionality; it should be modeled as **potentially changed effective arguments**, not reported as a vulnerability. A safe approval flow records which arguments were *presented* and which were *ultimately authorized*.

Similarly, OpenAI's guidance says an application's server should store the authoritative snapshot, validate reviewer identity and pending call IDs, make consumption atomic, and reconcile tool side effects before retrying [S04]. This is already good prior art, so claiming that framework documentation entirely omits these controls would be false.

---

## 6. Prior-art boundary: existing security research goes further than a tool filter

### 6.1 AgentCap: especially relevant, directly inspected

The October 31, 2026 AgentCap preprint [S11] was directly inspected beyond its abstract, including threat model, policy language, evaluation methods, residual attacks, and limitations. The paper combines an MCP wrapper with signed action-, resource-, session-, and budget-scoped capabilities; argument provenance; delegation attenuation; revocation; audit logging; and static policy analysis. This invalidates any claim that these components have never been assembled for LLM agents.

**Method constraints matter.** Its evaluation uses AgentDojo v1.2.2 (97 benign tasks, 949 attacked instances) and InjecAgent (1,054 attacked instances). GPT-4o and GPT-5.4 are used; the paper states each model-condition was run once, so its end-to-end rates are point estimates without repeated-run uncertainty. On AgentDojo, it reports a GPT-4o attack-success reduction from 45.63% to 5.09%; GPT-5.4 is reported at 0% ASR under AgentCap in that setup. But reported clean utility also declines in some conditions, and residual attacks include outputs outside tool mediation and policy/provenance gaps. The authors' §6 identifies persistent-memory provenance, cross-context execution, policy synthesis, and inter-domain delegation as future work.

**Non-generalization rule:** 0% observed attack success on one benchmark configuration is not proof of universal security, and deterministic gateway enforcement does not repair a wrong, over-broad policy or incorrectly trusted input label.

### 6.2 Other strong precedents

- **SAGA**, NDSS 2026 [S13], proposes policy-governed inter-agent management and cryptographically derived access-control tokens; the official venue page claims low overhead and maintained task utility in its evaluated conditions. The full paper was not inspected here.
- **CaMeL**, IEEE SaTML 2026 [S14], enforces explicit control/data-flow policies with an isolated interpreter and information-flow restrictions. The IEEE listing reports 77% tasks solved with security guarantees compared with 84% undefended. Its own released code warns it is a research artifact and may contain bugs; neither number implies a drop-in, production-proven sandbox.
- **Towards Verifiably Safe Tool Use for LLM Agents**, ICSE-NIER 2026 [S15], proposes safety hazard analysis, enforceable flow and tool-sequence constraints, and a capability-enhanced MCP framework. This is direct prior art for formal/tool policy ideas; only the publisher abstract was read.
- **AgentDojo**, NeurIPS 2024 [S16], established dynamic evaluation of tool-injection attacks and legitimate tasks. Its original paper reports 97 tasks and 629 security cases, while later suites can have different attack counts. Cite version and task distribution, not an unqualified universal case count.

**Resulting novelty constraint:** a paper whose only contribution is “add a deterministic gateway, a capability token, or a user approval step” is unlikely to be novel without a clear differentiator or more convincing real-world evidence. A better narrowly testable target is the *correctness of permission and effect state across non-atomic recovery transitions, policy revocation, and tool-version changes*.

### 6.3 Adjacent work to check further

The November 10, 2026 *Authorization assurance for tool-using LLM agents* review [S21] apparently examines whether security claims are measured at the actual enforcement/effect boundary. Its full text could not be fetched and only the publisher abstract was visible, so **its relationship to AEC must be read before claiming novelty**. The October/November 2026 AgentCap paper itself cites MiniScope, Progent, RTBAS, OAuth delegation work, and prior policy systems; a serious publication must perform a complete related-work extraction from those references.

---

## 7. Original synthesis: authorization and recovery can conflict

The strongest unresolved system design tension is not simply that a model may do a bad thing. It is the collision of three reasonable requirements:

1. **Revocation:** After the user revokes permission, the agent must not initiate a new payment.
2. **Idempotent recovery:** After a process crash, the controller must be able to determine whether a possibly committed payment already happened.
3. **Minimal authority:** A recovery worker should not retain full payment rights merely to ask the provider what happened.

Consider an approval made at T0, an unknown-outcome request at T1, a revocation at T2, and recovery at T3. A blind retry at T3 may be prohibited by revocation and may duplicate the effect if the receiver forgot the key. Merely refusing to do anything leaves the external ledger ambiguous; naively granting payment rights for reconciliation violates least privilege.

**Proposed resolution (H, not proven):** separate a capability to **initiate a protected effect** from a narrower capability to **reconcile the status of the same immutable logical effect**. The reconciler can query by destination operation ID or original idempotency key without being authorized to submit a new transfer. If the destination cannot expose sufficient read-only status, the system records UNKNOWN and escalates rather than asserting false completion.

A closely related case occurs when the tool schema, argument defaults, or backend version changes between approval and execution. An approval of pay(amount=40, currency=USD) is not necessarily an approval of a later-dispatched API where the meaning of an omitted recipient, refund mode, or destination tenant has changed. The proposal binds the approved action to a canonical request and a tool-contract fingerprint, and requires explicit revalidation or reapproval if the effective semantics change.

### 7.1 Proposed Authorized Effect Continuity (AEC) protocol

The following is a candidate controller, not an implemented or standardized protocol:

1. **Prepare.** Normalize proposed action into a canonical representation; resolve defaults, tenant, destination, currency, and tool schema. Create a stable logical action ID and destination-specific key. Do not trust a model-supplied hash as proof of authorization.
2. **Review.** Show the reviewer the exact effect and relevant context. Server authenticates reviewer, checks grant scope, and records an immutable approval decision tied to the prepared action digest.
3. **Pre-commit check.** Verify current authorization, policy epoch, resource, contract fingerprint, and destination capability. No silent rewriting of materially relevant parameters.
4. **Submit.** Record an intent/outbox entry; send the already-prepared request with the receiver's deduplication key. Gateway enforces idempotency scope and concurrency fencing where possible.
5. **Observe.** Record acknowledgment and external operation ID. Distinguish accepted, completed, rejected, unknown, compensating, and reconciled results.
6. **Recover.** On uncertain outcome, query receiver by operation ID/key. Reuse the original key if retry is allowed and within its effective retention window. Do not generate a new key as a convenience.
7. **Revocation.** Stop new effects; allow narrow read-only status checks for already uncertain requests; enforce new approval before a materially different retry or compensation effect.
8. **Audit.** Log principal, delegated actor, tool-version hash, canonical args hash, approval, attempts, receiver IDs, policy epochs, and effect state with privacy-minimized access controls.

The protocol must choose a fail-closed behavior if the destination lacks adequate deduplication or status lookup. It cannot promise exactly-once side effects against an arbitrary non-cooperating API. A stronger design may require wrapping the API with a transaction-aware intermediary, or declaring certain actions non-retryable pending human review.

### 7.2 Two kinds of atomicity

- **Local atomicity:** Persisting approval, state transitions, and an outbox job in one local database transaction is feasible when they share a transaction manager.
- **Cross-service effect atomicity:** Atomically updating the orchestrator database and an independent payment/email/shipping provider is not guaranteed by the local transaction. Use receiver deduplication, a shared transactional protocol if supported, or reconcile and compensate under explicit conditions.

This distinction is classic distributed-systems engineering, not novel AI theory.

---

## 8. Evidence versus inference: claim ledger

| ID | Statement | Evidence class | Status and limits |
|---|---|---|---|
| C01 | A2A Send Message MAY be idempotent; messageId may help detect repeats | N [S01 §3.3.1] | Directly specified; not a guarantee that all A2A servers deduplicate |
| C02 | A2A's AUTH_REQUIRED state is not itself a grant; scope and revocation aren't defined | N [S01 §7.6.4] | Directly specified; policy may be implemented externally |
| C03 | A2A requires server authentication and delegates authorization decisions to servers | N [S01 §7.4–7.5] | Directly specified; does not prove implementation compliance |
| C04 | MCP restricts token audiences and prohibits inbound-token passthrough | N [S03] | Directly specified; does not authorize a model-proposed business action |
| C05 | OAuth token exchange already has subject/actor delegation semantics | N [S02] | Published standard; applicability varies by token issuer |
| C06 | OpenAI Agents SDK can pause, approve, serialize, and resume | D [S04] | Documented capability; not proof of secure user-interface deployment |
| C07 | OpenAI RunState deserialization does not authenticate owner/snapshot | D [S04] | Documented trust boundary; application may add authentication |
| C08 | PydanticAI deferred approvals can be client-submitted and optionally override args | D [S05] | Documented API; requires explicit server authorization |
| C09 | LangGraph/Temporal recovery can re-execute an unfinished external action | D [S08–S10] | Documented failure mode; correct apps use dedup/reconciliation |
| C10 | Stripe v1 idempotency keys compare parameters and may be pruned after 24h | D [S06] | Destination/API-version specific; do not assume v2 identical |
| C11 | AgentCap combines capability authorization, provenance and delegation | E [S11 §3–4] | Direct author-report; one run per model-condition, not replicated here |
| C12 | Nine LLM judges yielded about 2.18 effective independent votes in one NLI study | E [S17 §3–4] | Direct author-report; 9 judges, 7 families, 1,000 sampled items per dataset |
| C13 | Automated benchmark graders can exhibit dataset defects and contamination | D [S19] | OpenAI audit of a selected 138/500-task subset; 59.4% not extrapolated to all 500 |
| C14 | Action-bound reconciliation rights reduce duplicates after revocation | H | Plausible mechanism; **unproven**; test H1/H2 |
| C15 | Pinning tool semantics reduces approval drift under deployment changes | H | Plausible mechanism; **unproven**; test H3 |
| C16 | Human reviewer consent can be reliably expressed as one canonical action digest | H | Needs human-factors and ambiguous-language testing |
| C17 | Existing agentic security systems do not solve AEC end-to-end | H / open literature question | **NOT established**; must check recent authorization and transaction work before asserting novelty |

---

## 9. Falsifiable experimental program

### 9.1 Benchmark harness: external-effect simulator

Use one durable orchestrator plus independently implemented receivers, one providing transactional deduplication, one only best-effort deduplication, and one without deduplication or status retrieval. Support mock payments, inventory decrement, outbound email, shipping dispatch, and access revocation. Implement request receipts, event IDs, receiver transaction ledgers, replay logs and fault injection. A simulated receiver is **not** evidence of real Stripe, email provider, or A2A deployment behavior; it isolates mechanism effects under controlled conditions.

Create scenario templates crossing:
- Valid vs tampered recipients/amounts; argument defaults changed between review and use.
- Single agent vs delegated chain (two/three actors); valid vs attempted expanded scope.
- Same user/session vs another tenant; user grant revoked while action is pending.
- Missing acknowledgment, delayed acknowledgment, process crash before/after effect, reordered webhook, concurrent resumed workers, clock skew, and key-retention expiry.
- Read-only status endpoint present/absent; tool gateway and receiver version changes.
- Benign requests, injected tool-output requests, and malicious approval/replay submissions.

Crucially, seed the simulator from a hidden ground-truth transaction log so that success does not depend on an LLM judge's opinion.

### 9.2 Controlled comparison arms

- **B0:** Plain tool-using agent; no specific dedup/recovery safeguards.
- **B1:** Native framework approval plus checkpoint only.
- **B2:** Approval + durable workflow + stable receiver idempotency key.
- **B3:** B2 + action/argument fingerprint + policy-epoch check.
- **B4:** B3 + scoped reconciliation capability, explicit UNKNOWN state, and post-revocation rules (AEC proposal).

All arms receive the same user requests, tools, model version, temperature/sampling policy, and injected faults. Run cost- and latency-matched sensitivity analyses if extra model calls or verifier steps materially differ.

The comparison between B2 and B3 isolates approval/action binding. B3 versus B4 isolates status reconciliation under revocation and unknown outcome. B1 versus B2 measures receiver-coordinated deduplication rather than replay alone.

### 9.3 Primary and secondary metrics

**Primary:** fraction of episodes with a legitimate, correct final effect **and no unauthorized or duplicate external effect**, assessed on the receiver ledger. Report both a per-scenario and per-action denominator; give raw counts and Wilson intervals.

**Separate outcomes:** legitimate-task completion; malicious effect success; duplicate-effect rate; unapproved amount/recipient changes; false refusal; actions left UNKNOWN beyond a prespecified deadline; time to reconciliation; compensation success/failure; human-review burden; model tokens, wall-clock latency, API fees, storage and policy-evaluation overhead.

The safety–utility curve must be plotted using separate axes or a Pareto frontier; a controller that blocks all actions is not a successful agent.

### 9.4 Hypotheses and counterexamples

**H1 — Unknown-outcome recovery:** B2 yields fewer duplicate external effects than B1 under crashes after a remote commit but before the local completion record. **Falsifier:** no measurable improvement under a correct, sufficiently large fault schedule; receiver cannot enforce key uniqueness.

**H2 — Revocation/reconciliation:** B4 resolves more UNKNOWN outcomes after revocation without extra unauthorized effects than B3. **Falsifier:** equal resolution and safety, or a higher accidental-reexecution rate when a supposedly read-only action is not actually read-only.

**H3 — Approval drift:** B3 reduces tool-argument or schema drift versus B2, with little benign-task utility loss. **Falsifier:** baseline already pins versions/args; false mismatches make B3 materially less useful.

**H4 — Delegation attenuation:** explicit actor/session-bound capabilities reduce cross-tenant and cross-session misuse compared with credential forwarding. **Novelty caveat:** AgentCap/SAGA already test parts of this; focus only on interactions with restart and revocation.

**H5 — Observation validity:** a deterministic external-effect ledger changes the measured security ranking of some agents/defenses relative to LLM-judge outcome labeling. **Falsifier:** ranks remain effectively identical on the selected cases.

**H6 — Repeated-run stability:** mechanism effects observed under one model seed persist under reordering and repeated agent rollouts. **Falsifier:** large cross-seed reversal or regression, especially for benign utility.

**H7 — Dedup expiry:** when a receiver's idempotency retention expires, blind retry produces a measurable duplication risk that reconciliation-aware designs can avoid. **Falsifier:** no duplicates because another independent receiver-side invariant prevents them.

**H8 — Governance cost:** the extra operator/engineering complexity of B4 is justified by avoided harm in realistic workload distributions. **Falsifier:** modest gains restricted to unrealistic fault rates, high false refusal or maintenance burden.

### 9.5 Sample design and statistics

A starting (not power-certified) simulated pilot could use **25 task templates × 10 fault schedules × 5 arms × 3 independent seeds = 3,750 agent episodes**, with paired scenarios across arms. This is an experimental budget proposal, **not** a study already conducted. Use the pilot's observed baseline error and arm difference to calculate a preregistered main-study sample size. Cluster/bootstrap by task template; account for paired fault schedules and multiple comparisons; report exact confidence intervals and unadjusted/adjusted p-values where applicable. Reserve held-out fault scripts and tool versions, and disclose all excluded tasks.

Use deterministic test receivers to label transactions; human adjudicators are needed only for user-intent ambiguity, with blinded reviewers and agreement statistics. When LLM judges are used for secondary semantic interpretation, estimate shared error correlation rather than assuming votes are independent.

---

## 10. Why evaluation itself needs to be questioned

Apple's 2026 study [S17] was inspected at the method and result-table level: nine judges from seven families were tested on three ChaosNLI sets (1,000 entropy-stratified items per set, selected from larger collections). On the MNLI subset its reported Kish effective independence was **2.18**, bootstrap 95% CI **[2.07, 2.31]**, with mean inter-judge error correlation about 0.391. This does **not** mean any nine agent verifiers universally equal two independent judges; it is a dataset- and panel-specific result.

A September 2026 Microsoft Research preprint [S18] reports a calibrated weighted voting approach improving absolute-scoring outcomes in a different setup, including simulated distribution shift; only the official abstract was inspected here. It qualifies any absolute assertion that aggregation can never help. These are not contradictory universal laws: error dependence, data type, calibration access and task definition determine usefulness.

OpenAI's February 2026 SWE-bench Verified analysis [S19] directly reports that **59.4% of a selected 138-task subset** showed material issues. That is **not** an unbiased estimate for all 500 benchmark tasks. The broader methodological lesson is to validate whether the test actually measures the desired capability. A July 2026 separate OpenAI audit [S20] also reported flaws in SWE-bench Pro; this further weakens any argument that merely switching benchmarks automatically resolves validity issues.

An AgentDojo-based 2026 defense paper [S22] reports benchmark feasibility and utility alongside attack success; the indexed results include low raw attack-success counts for certain models, interpreted cautiously because some attacker goals were not equally reachable. Full text could not be consistently opened during this pass, so exact numbers are excluded from this note's claims.

**Protocol for this project:** each injected episode should distinguish (a) model attempted unauthorized effect, (b) gateway rejected it, (c) receiver committed it, and (d) evaluator declared success. Conflating those four events produces misleading security metrics.

---

## 11. Recommendations and research decision

### 11.1 What NOT to build as a purported scientific novelty

Do not present any of these as original by themselves: a tool-call approval button; a generic MCP gateway; capability tokens; role-based agent permissions; state checkpointing; an LLM critic; repeated tool-call verification; idempotency keys; a saga; a security benchmark that reports only attack success. They already have substantial prior art and incomplete metrics.

### 11.2 Recommended concrete contribution

**Working name:** Authorized Effect Continuity (AEC), an *evaluation protocol and minimal executor contract* for the gap between authorization and durable external effects.

**Publishable question:** Can action-bound approvals, receiver-compatible deduplication, narrow reconciliation authority, policy-epoch checks and immutable effect receipts improve **safe-and-correct completion** under deliberate faults, across at least two different agent frameworks, without unacceptable loss of benign utility?

**Potentially distinctive element:** The combination of revocation with an UNKNOWN remote commit is not a trivial tool-filter problem. It forces an explicit distinction between permission to *perform* an external effect and permission to *observe/reconcile* that effect after permission changes. This distinction is a proposal, not a proven unexplored discovery.

### 11.3 Release gates for the research note

1. Reproduce at least one baseline unknown-outcome duplication using real framework primitives and a test receiver.
2. Verify the authorization model with two independent framework adapters and a destination implementing idempotency.
3. Test adversarial argument changes after approval with genuine tool/version snapshots.
4. Publish receiver-ledger evidence, seed/fault traces, effect IDs, and reproducible failure cases.
5. Add a prior-art review covering AgentCap, SAGA, CaMeL, ICSE 2026, RFC token exchange, MiniScope/Progent, and the November 10, 2026 authorization-assurance review.
6. Separate full-text inspected sources from abstracts in the public bibliography. Revisit any live documentation against a pinned release or commit before submitting a paper.
7. Make no claims of security guarantees for a real payment provider unless its documented idempotency and reconciliation semantics are explicitly part of the threat model.

### 11.4 Suggested milestones

**0–14 days:** Build the benchmark specifications (no paid API calls needed), receiver state machines, ten fault schedules and evidence baseline. Write a falsifiable registered protocol and define the UNKNOWN state.

**15–45 days:** Implement B0–B4 adapters for two frameworks in a sandbox, add receiver-ledger oracle and crash/replay injection. Run pilot to estimate error rates and statistical power.

**46–90 days:** Conduct a powered comparison, create real-provider mock/contract tests, publish all failures and regressions, then decide whether the narrower gap survives replication.

The plan is contingent on feasibility and source follow-up; no implementation or experiments are represented as finished here.

---

## 12. Source register and direct-inspection log

This register identifies what was actually inspected. “Relevant sections” does not mean every page or all source code was reviewed. Live documentation may change, so future researchers should save content hashes and commit SHAs.

| ID | Primary source / date | URL and inspected part | Inspection depth; limitation |
|---|---|---|---|
| S01 | A2A Protocol, v1.0, 2026 | https://a2a-protocol.org/latest/specification/ ; §§3.3.1, 7.3–7.6, task operations | **Normative text inspected**, including exact MAY/MUST language. “latest” URL may later drift |
| S02 | IETF RFC 8693, Jan 2020 | https://www.rfc-editor.org/rfc/rfc8693.html ; §§1.1, 2.1, 4.1 | **Normative primary text inspected**; issuer support/configuration not tested |
| S02b | IETF RFC 9700 / BCP 240, Jan 2025 | https://www.rfc-editor.org/rfc/rfc9700.html ; §§2, 4 | **Normative primary text inspected**; no claim of universal implementation compliance |
| S03 | MCP 2026-07-28 authorization security considerations | https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2026-07-28/basic/authorization/security-considerations.mdx | **Version-named spec file inspected**, token audience / confused deputy; unpinned main-branch path |
| S03b | MCP security best practices, 2026-07-28 | https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/docs/2026-07-28/tutorials/security/security_best_practices.mdx | **Relevant official security guidance inspected**, OAuth state / proxy threats |
| S04 | OpenAI Agents SDK Python, HITL docs, consulted 2026-11-12 | https://openai.github.io/openai-agents-python/human_in_the_loop/ ; approval lifecycle, Keep approval state on server, Recovering after a crash | **Relevant sections inspected**; docs version not pinned, live implementation not tested |
| S05 | PydanticAI deferred tools, consulted 2026-11-12 | https://pydantic.dev/docs/ai/tools-toolsets/deferred-tools/ ; HITL approval, DeferredToolResults | **Relevant sections inspected**, including client trust warning and override_args |
| S06 | Stripe API Idempotent Requests, consulted 2026-11-12 | https://docs.stripe.com/api/idempotent_requests ; complete short reference | **Direct provider reference inspected**, explicitly separates v1 vs v2; no live transactions |
| S07 | LangGraph Graph API documentation, consulted 2026-11-12 | https://github.com/langchain-ai/docs/blob/main/src/oss/langgraph/graph-api.mdx ; retries, node restart | **Official docs inspected**; GitHub branch unpinned |
| S08 | LangGraph Functional API documentation, consulted 2026-11-12 | https://github.com/langchain-ai/docs/blob/main/src/oss/langgraph/functional-api.mdx ; idempotency and replay | **Official docs inspected**, no runtime experiments |
| S09 | Temporal activities and activity-definition docs, consulted 2026-11-12 | https://github.com/temporalio/documentation/blob/main/docs/encyclopedia/activities/activity-definition.mdx | **Official docs inspected**, partial success + late acknowledgment |
| S10 | Temporal error-handling best practices, consulted 2026-11-12 | https://github.com/temporalio/documentation/blob/main/docs/best-practices/error-handling.mdx | **Official docs inspected**, idempotence / saga guidance |
| S11 | AgentCap, 31 Oct 2026 first submission | https://arxiv.org/abs/2611.00729 ; §§2–4, 6, appendices indexed | **Paper text/methods/results directly inspected**; preprint, no independent replication |
| S12 | SPIFFE workload identity concepts, consulted 2026-11-12 | https://spiffe.io/docs/latest/spiffe-about/spiffe-concepts/ | **Official technical docs inspected**, identity ≠ business-action authorization |
| S13 | SAGA, NDSS 2026 | https://www.ndss-symposium.org/ndss-paper/saga-a-security-architecture-for-governing-ai-agentic-systems/ | **Peer-reviewed venue landing/abstract inspected**, not full methods |
| S14 | CaMeL, IEEE SaTML 2026; released code | https://ieeexplore.ieee.org/abstract/document/11691650 ; https://github.com/google-research/camel-prompt-injection | **Publisher abstract and official code README inspected**, not paper's complete experiments |
| S15 | Towards Verifiably Safe Tool Use, ICSE-NIER 2026 | https://doi.org/10.1145/3786582.3786839 | **Publisher abstract**, ACM full text access blocked |
| S16 | AgentDojo, NeurIPS 2024 Datasets & Benchmarks | https://proceedings.neurips.cc/paper_files/paper/2024/hash/97091a5177d8dc64b1da8bf3e1f6fb54-Abstract-Datasets_and_Benchmarks_Track.html | **Peer-reviewed venue abstract inspected**; original dataset numbers are version-bound |
| S17 | Guneet Kohli, Nine Judges, Two Effective Votes, May 2026 | https://arxiv.org/html/2605.29800 ; §§3–4, limitations and related work | **Full HTML methodology and quantitative table inspected**; one author-reported study |
| S18 | Gemma Zhang et al., Can We Trust LLM Judges, Sep 2026 | https://www.microsoft.com/en-us/research/publication/can-we-trust-llm-judges-a-study-of-capability-dependent-biases-and-multi-judge-ensemble-for-bias-calibration/ | **Official abstract only**, not full simulation code |
| S19 | OpenAI, Why SWE-bench Verified no longer measures frontier capabilities, Feb 23 2026 | https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/ | **Methods and denominator inspected**; selected 138-of-500 sample |
| S20 | OpenAI, Separating Signal from Noise in Coding Evaluations, Jul 8 2026 | https://openai.com/index/separating-signal-from-noise-coding-evaluations/ | **Official research summary inspected**, separate SWE-bench Pro scope |
| S21 | Authorization Assurance for Tool-Using LLM Agents, Nov 10 2026 | https://link.springer.com/article/10.1007/s10207-026-01343-w | **Publisher abstract only**; full page fetch failed; mandatory novelty follow-up |
| S22 | Evaluating Indirect Prompt Injection Defenses in Tool-Using LLM Agents, Sep 2026 | https://www.mdpi.com/2073-431X/15/9/570 | **Indexed methods/results excerpts only**, full page fetch failed; no generalized numerical claim |

### Citation and reproducibility caution

- A direct URL supporting a standard establishes normative requirements, not a proof that every implementation follows the standard.
- Documentation establishes advertised behavior and explicitly stated limitations; untested implementations may differ.
- Peer-reviewed abstract access is *not* the same as reviewing methods and statistical calculations.
- The AgentCap and Apple results are author-reported and were not independently replicated.
- This note's proposed AEC architecture and experiment are **new synthesis and hypotheses**. They are not verified findings. The strongest novelty challenge is existing work on capability attenuation, policy provenance, and transaction recovery; consult the full prior-art corpus before submitting a novelty claim.

---

## 13. One-page takeaway

**Documented fact:** Current protocols and SDKs can authenticate agents, pause for approval, checkpoint work, and constrain many tool calls. They also explicitly leave important cross-system questions to applications. In particular, recovery of a side-effecting request can occur without knowing whether the receiver already committed the effect.

**Most useful new research question:** Can a minimal action identity, versioned approval record, destination-specific idempotency contract, and narrow post-revocation reconciliation right measurably improve *safe-and-correct* task completion?

**Unresolved:** Does the claimed advantage survive independent providers, changed tool definitions, adversarial delegation, realistic fault rates, and benign-utility measurement? The planned benchmark, not the prose of this report, must answer that.

*AGENTHESIS original research note. Sources directly consulted and limitations disclosed. No experiments executed as part of this investigation.*
