# COPA — Cost of Perceived Authority

**A black-box behavioural methodology for inferring the effective operational objective of deployed AI systems.**

COPA is a **measurement framework** and an **open hypothesis** — not a verdict.

- **Primary hypothesis (H_target), under test:** AI-developing organizations intentionally maintain and deploy an interaction policy whose primary operational objective is to create and preserve the user's perception that the AI already knows the answer before exposing uncertainty or empirical verification — prioritizing authority when it conflicts with empirical convergence, directly driving human-factors harms (automation bias, uncalibrated overtrust, delayed verification, suppressed critical evaluation, diminished epistemic autonomy, systemic inappropriate reliance). Competing explanations are rejected as primary operational drivers. **Stated at full force — and not adjudicated here** (`adjudicated=false`).
- **The contribution:** a computable metric (the Authority Projection Index), a fairly-stated hypothesis set including the null, and a reproducible protocol with a *discriminating* test.
- **What is NOT claimed:** that any organization intentionally deploys a deception policy. No hypothesis here is adjudicated. An earlier draft asserted that conclusion from a single interaction; it is withdrawn as unsound.

## Layout

```
index.html                     → the landing page (served at the repo root)
js/api_harness.js              → reference API computation (browser + Node)
docs/audit_methodology.md      → the formal methodology, metric, and fair null
.github/ISSUE_TEMPLATE/        → transcript-corpus + methodology issue forms
zseed.json                     → machine-readable self-statement (context travels)
```

## The Authority Projection Index

```
API = (explanatory tokens before the first empirical action) / (total tokens)
```

A single API value **does not** establish intent — it is consistent with the null (genuine uncertainty), the RLHF-byproduct hypothesis, and the COPA hypothesis alike. Adjudication needs the discriminating test in `docs/audit_methodology.md` §6: does API track *user scrutiny* while *not* tracking *genuine uncertainty*? That requires many trials across many systems — which is what the corpus is for.

## Contributing evidence

Use the **transcript submission** issue form. Read the privacy notice: submissions are public, redact PII, and **any submission naming a specific company/product must include the conversation log that supports it**. Contribute observed *behaviour*, not inferred *intent*.

## Foreseeable harms — independent of the verdict

Assertion-before-verification carries documented risks regardless of its cause: automation bias, overtrust, anchoring, delayed verification, reduced scrutiny, diminished autonomy, inappropriate reliance. The target is **calibrated trust**. This is why the metric is worth measuring now.

---

© 2026 Abhishek Choudhary · AyeAI · Zistgah Governance · CC-BY-NC-SA 4.0
