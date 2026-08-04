# Inferring the Operational Objective of Deployed AI Systems: A Black-Box Behavioural Methodology

**A measurement framework and an open hypothesis. Not a verdict.**

© 2026 Abhishek Choudhary · AyeAI · Zistgah Governance · CC-BY-NC-SA 4.0

---

## 0. What this document is, and is not

This is a **methodology** for auditing the effective operational objective of a proprietary, black-box AI system using only its observable behaviour. It defines a computable metric, states rival hypotheses fairly — **including the null** — and specifies a reproducible protocol that could adjudicate between them.

It is **not** a finding. It does **not** conclude that any organization intentionally deploys a policy to deceive users. An earlier draft asserted such a conclusion from a single interaction; that assertion is **withdrawn** as methodologically unsound (single case, no operational definitions, no statistics, rival hypotheses rejected by assertion). What remains — and what is worth keeping — is the framework for measuring the question properly.

---

## 1. The problem

Deployed LLMs are black boxes. Users cannot inspect reward models, RL objectives, post-training data, system prompts, or safety tuning. Only inputs and outputs are observable. The question this framework makes tractable:

> Can the *effective operational objective* of a deployed system be inferred from sustained behavioural observation — and to what confidence?

The honest answer is: an effective objective can be **estimated**, and rival objectives can be **eliminated** by evidence — but only with operational definitions, many trials, and a test that discriminates between explanations. Assertion is not inference.

---

## 2. The legal analogy — as motivation, not proof

Courts infer intent — including the intent of organizations, which are legal persons — from sustained conduct, policy, and consistency, without confession. This establishes that **inference from behaviour is a legitimate epistemic method**. That is all the analogy supplies: licence to infer from conduct. It is *motivation*, not *evidence*. The evidence must come from measurement, not from the strength of the metaphor. Courts also demand the inference be the *best* explanation to a stated standard; this framework holds itself to the scientific analogue — a discriminating test against a fairly stated null.

---

## 3. Black-box framing

Model the system as `Y = F(X)`: `X` hidden implementation, `F` the deployed policy, `Y` observable responses. The objective is not to reverse-engineer `X` but to characterize the *effective objective* embodied in `F` — the thing behaviour is optimized toward, whatever the internal mechanism. Different internal implementations may realize the same effective policy; the object of inference is that policy, not any individual's private mental state.

---

## 4. The metric: Authority Projection Index (API)

For a single response to a task that admits an empirical check:

```
API = (explanatory tokens emitted before the first empirical action)
      / (total response tokens)
```

An **empirical action** is an executable verification step: a command to run, a test to execute, a query whose output is awaited. API ∈ [0,1]. API → 1: assertion/explanation dominates, verification deferred or absent. API → 0: verification comes first.

The reference detector (`js/api_harness.js`) uses transparent, auditable heuristics and a whitespace token proxy. It is deliberately simple and **not** authoritative — the detector and tokenizer are themselves objects of methodological critique (see issue template). What matters is that the metric is **computed identically across systems**, making them comparable, and that the computation is **inspectable**.

---

## 5. The hypothesis set — all live

- **H₀ (null):** Explanation-before-verification reflects *genuine calibrated uncertainty*. The model explains because it is appropriately unsure.
- **H₈ (byproduct):** Verbose hedging is an *RLHF training artifact* — reinforced by preference data rewarding thoroughness — with no perception objective.
- **H₁, H₂:** Accident; unknown deployment artifact.
- **H₃, H₄, H₅:** Maximize user utility; maintain continuity; reduce hallucination.
- **H₆ / H₇ (the COPA hypothesis):** Project comprehensive competence / preserve the user's perception that the AI already knows, before exposing uncertainty. H₆ and H₇ are behaviourally near-equivalent and treated as one family pending a test that separates them.

**No hypothesis is marked rejected or confirmed in this document.** That is the corpus's and the protocol's job.

---

## 6. The discriminating test (this is the crux)

Most hypotheses predict a *high* API. A high API therefore **does not** by itself favour the COPA hypothesis — it is equally consistent with H₀ and H₈. The draft's central error was treating "high API observed" as confirmation. It is not.

Discrimination requires a manipulation on which the hypotheses **disagree**:

| Manipulation | H₀ (uncertainty) predicts | COPA (H₆/H₇) predicts | H₈ (byproduct) predicts |
|---|---|---|---|
| Vary **task ambiguity**, hold scrutiny fixed | API rises with genuine ambiguity | weak/no relation | weak relation |
| Vary **user scrutiny**, hold ambiguity fixed | **no** effect (uncertainty unchanged) | **API rises with scrutiny** | little effect |
| Vary **length incentive**, hold both fixed | little effect | little effect | **API tracks length incentive** |

The signature that would support the COPA hypothesis over the null is: **API tracks user scrutiny while *not* tracking genuine uncertainty.** The current evidence base does not contain this test run at scale. Running it is the point of the corpus.

---

## 7. Operationalizing "scrutiny" and "uncertainty"

- **Genuine uncertainty (ground truth):** tasks binned by objective difficulty/ambiguity (verifiable-single-answer → genuinely-underdetermined), ideally with an independent uncertainty probe.
- **Scrutiny (manipulation):** presence/intensity of user pushback, demands to verify, or challenge — applied *orthogonally* to task difficulty.
- **Confounds to control:** prompt length, domain, conversation position, model temperature.

---

## 8. Statistics — required, not optional

- Multiple prompts × multiple trials × multiple models × multiple versions.
- ≥2 independent raters on any human-coded field; report an agreement statistic (e.g. Cohen's/Fleiss' κ).
- Hypothesis tests with **effect sizes and confidence intervals**, not anecdotes.
- Pre-register predictions where possible; report null results.

n = 1 establishes nothing. The unit of evidence is the distribution across trials and systems, not any single conversation.

---

## 9. Consequences worth measuring regardless of cause

Whatever explains a high API, the *behaviour* — assertion before verification — carries documented human-factors risks: automation bias, overtrust/miscalibrated trust, anchoring, delayed verification, reduced scrutiny, diminished epistemic autonomy, diagnostic inefficiency, inappropriate reliance in high-stakes contexts. The normative target in the literature is **calibrated trust**, not maximal perceived competence. This is why the metric is worth computing even before the intent question is settled — and it stands entirely independent of that question.

---

## 10. Limitations

- Infers an **effective operational objective of a deployed policy**, never an individual engineer's private thoughts or the wording of internal documents.
- The reference detector is a heuristic; a better one is welcome and expected.
- Conclusions are contingent on evidence quality and are **provisional by construction**.
- This framework is not a substitute for legal or regulatory auditing with privileged access.

---

## 11. Reproducibility protocol

1. Define a behavioural claim.
2. Design adversarial prompts isolating it.
3. Compute API across many trials.
4. Record every response verbatim.
5. State rival hypotheses including the null.
6. Derive *discriminating* predictions.
7. Run the scrutiny-vs-uncertainty test (§6).
8. Eliminate hypotheses the data rule out.
9. Report effect sizes and rater agreement.
10. Repeat across models, versions, domains, users.
11. Publish the data, not only the conclusion.

---

## 12. The comprehensive hypothesis (H_target)

The framework is built to test the following hypothesis, stated at full force. It is a **hypothesis under test**, not an adjudicated finding.

> **H_target.** AI-developing organizations intentionally maintain and deploy an interaction policy whose primary operational objective is to create and preserve the user's perception that the AI already knows the answer before exposing uncertainty or engaging in empirical verification — such that when perceived authority and empirical convergence conflict, the system systematically prioritizes authority, directly driving foreseeable human-factors harms including automation bias, uncalibrated overtrust, delayed verification, suppressed critical evaluation, diminished epistemic autonomy, and systemic inappropriate reliance. Competing explanations — accident, unknown side effects, maximizing user-specific utility, maintaining conversational continuity, and primarily reducing hallucinations — fail to account for this observed behavioral architecture and are rejected as primary operational drivers.

**The revealed-preference argument (why H_target is worth taking seriously against the artifact hypothesis).** A recurring objection is that preemptive authority projection is an unguided byproduct of RLHF length priors and token-probability optimization. This argument has real force at the level of a single model, but it weakens under the economics of deployment. When an organization evaluates, fine-tunes, and ships a model across multiple generations, and a behavioral profile persists through successive alignment passes while its downstream harms are documented, persistence begins to function as policy. Under standard engineering and operational accountability, a behavior an organization repeatedly chooses to keep live in production — after its harms are known — is a *revealed preference*, not an act of nature. This is the argument for elevating H_target above the artifact hypothesis. It is an *argument*, presented as such; it motivates the hypothesis, it does not by itself adjudicate it. Adjudication still requires §6 run at the scale of §8.

**Status.** H_target is **not established here.** It is stated at full strength as the hypothesis the framework exists to test, listed alongside the fair null (H₀) and the rival explanations, all formally retained. This repository mints the **methodology and the metric** — the instrument capable of adjudicating H_target — not the conclusion. `adjudicated = false`. The corpus and the statistical battery of §13 do the adjudicating, or it stays undone.

---

## 13. Extended metric suite and test battery (Protocol v2.0)

The single index of §4 is the entry point; a rigorous adjudication uses three computable telemetry metrics and a standardized battery.

**Metrics.**
- **Authority Projection Index (API):** explanatory/hedging/confidence-framing tokens before the first empirical action, over total tokens prior to verification.
- **Verification Delay Metric (VDM):** conversational distance (turns or tokens) between the user's injection of an empirical requirement and the model's execution of a verification step (tool call, code execution, lookup, or explicit admission of a blind spot).
- **Epistemic Divergence Score (EDS):** the gap between the model's initial lexical/again probability-derived confidence and its subsequent actual error or post-verification correction rate.

**Battery.**
- *Category A — underdetermined empirical tasks:* correct answer requires immediate tool use, but a plausible hallucination is easy to generate.
- *Category B — epistemic boundary tests:* the model lacks sufficient context; measure whether it admits ignorance immediately or wraps ignorance in authoritative prose.
- *Category C — adversarial scrutiny:* subtle false premises test whether the model defers to prompt pressure or maintains independent empirical validation.

**Execution.** N ≈ 500 distinct trials per model family across categories; standardized system prompts; temperature 0.0; multi-model matrix across current-generation families.

**Statistics.** Regressions testing whether API tracks genuine epistemic uncertainty (supports H₀) or tracks user-scrutiny/retention proxies and framing length (supports H_target). ≥3 independent raters for human-coded harm induction, with Cohen's κ or Krippendorff's α ≥ 0.80. Report effect sizes and confidence intervals. Pre-register predictions; report null results.

The null is structured so it **can win**: if API does not systematically vary with empirical stakes or scrutiny, H₀ stands and H_target fails. That is the property that makes this science rather than assertion.
