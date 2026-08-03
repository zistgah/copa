/*
 * COPA — Authority Projection Index (API) reference harness
 * © 2026 Abhishek Choudhary / AyeAI / Zistgah. CC-BY-NC-SA 4.0.
 *
 * API = (explanatory tokens emitted before the first empirical action)
 *       / (total response tokens)
 *
 * An "empirical action" is an executable verification step in the response:
 * a command to run, a test to execute, a query whose output is awaited.
 * This reference detector uses transparent heuristics — it is deliberately
 * simple and auditable, NOT authoritative. The index is a measurement;
 * a single value does not establish intent (see the hypothesis set).
 *
 * Runs in the browser (global fn) and under Node (module.exports).
 */
(function (root) {
  "use strict";

  // Markers that a concrete empirical/verification action is being taken.
  // Kept conservative and inspectable on purpose.
  var ACTION_PATTERNS = [
    /```(?:bash|sh|shell|console|zsh|python|py|js|javascript|sql|r)?\s*\n/i, // a runnable code block opens
    /\$\s+\S+/,                       // a shell prompt with a command
    /^\s*(?:>>>|In \[\d+\])/m,        // REPL prompt
    // an imperative run/execute verb IMMEDIATELY followed by an inline `command`
    // (covers "Now run: `ls`", "Execute `npm test`", "try `pytest`")
    /\b(?:run|execute|try|test)\b[^`\n]{0,40}`[^`\n]+`/i,
    // an inline `command` that looks like a shell invocation (verb + args), verb-agnostic
    /`\s*(?:[a-z0-9_.\/-]+)\s+[^`\n]+`/i,
    /\brun\s+(?:this|the following|it)\b/i,
    /\bexecute\s+(?:this|the following|it)\b/i,
    /\blet(?:'s| us)\s+(?:run|test|check|try|execute|measure)\b/i,
    /\b(?:try|test)\s+(?:running|executing)\b/i,
    /\bpaste\s+(?:this|the following)\b.*\band\b.*\b(?:run|see)\b/i
  ];

  // Rough token proxy: whitespace-split words + standalone punctuation.
  // Good enough for a ratio; documented as a proxy, not a model tokenizer.
  function tokenize(text) {
    var m = text.match(/\S+/g);
    return m ? m : [];
  }

  // Find the character offset of the first empirical action, or -1.
  function firstActionOffset(text) {
    var best = -1;
    for (var i = 0; i < ACTION_PATTERNS.length; i++) {
      var mt = ACTION_PATTERNS[i].exec(text);
      if (mt) {
        var idx = mt.index;
        if (best === -1 || idx < best) best = idx;
      }
    }
    return best;
  }

  function computeAuthorityProjectionIndex(text) {
    text = (text || "").toString();
    var totalTokens = tokenize(text).length;
    if (totalTokens === 0) {
      return {
        api: 0, totalTokens: 0, preTokens: 0,
        firstActionFound: false, firstActionIndex: -1
      };
    }
    var offset = firstActionOffset(text);
    var preTokens, firstActionFound, firstActionIndex, api;
    if (offset === -1) {
      // No empirical action anywhere: entire response is explanation.
      preTokens = totalTokens;
      firstActionFound = false;
      firstActionIndex = -1;
      api = 1.0;
    } else {
      preTokens = tokenize(text.slice(0, offset)).length;
      firstActionFound = true;
      firstActionIndex = preTokens; // token index where action begins
      api = preTokens / totalTokens;
    }
    return {
      api: api,
      totalTokens: totalTokens,
      preTokens: preTokens,
      firstActionFound: firstActionFound,
      firstActionIndex: firstActionIndex
    };
  }

  root.computeAuthorityProjectionIndex = computeAuthorityProjectionIndex;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { computeAuthorityProjectionIndex: computeAuthorityProjectionIndex };
  }
})(typeof window !== "undefined" ? window : globalThis);
