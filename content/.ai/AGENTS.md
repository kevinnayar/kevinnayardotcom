# AGENTS.md

## Overview
This repository contains a documentation corpus under `/docs` and a local memory system under `/.ai/memory`.

Agents can:
1. Reindex the documentation using qmd
2. Answer questions using semantic search with citations
3. Read and write memory for persistent knowledge

---

## Core Principles

- Always prefer retrieval over guessing
- Treat `/docs` as the source of truth
- Treat `/.ai/memory` as evolving knowledge
- Be concise, accurate, and explicit about uncertainty

---

## Tools

### qmd (Documentation Search)

CLI tool for indexing and querying markdown files.

#### Reindex docs
qmd index docs

#### Query docs
qmd query "<question>"

Returns:
- ranked results
- file paths
- relevant snippets

---

## Repository Structure

/docs
  auth/
  api/
  architecture/

/.ai
  /memory
    decisions.md
    patterns.md
    notes.md

---

## Memory System

### Location
.ai/memory/

### Files

- decisions.md → architectural or product decisions
- patterns.md → coding standards and conventions
- notes.md → observations, debugging insights, quirks

---

## Memory Rules

- Always read memory BEFORE answering
- Prefer memory if it is more recent than docs
- Never overwrite or delete existing entries
- Only append new entries
- Always include a date in new entries

---

## Memory Heuristic

Write to memory ONLY if:
- the information will be useful again
- it is not already in docs
- it represents a decision, pattern, or insight

Avoid writing:
- trivial Q&A
- redundant documentation
- one-off answers

---

## Workflows

### 1. Reindex Documentation

Trigger:
- user requests reindex
- docs have changed
- search results seem stale

Steps:
1. Run: qmd index docs
2. Verify no errors

Success:
- index completes successfully

---

### 2. Answer Question

Input:
- natural language question

Steps:
1. Read relevant memory
2. Search docs using qmd
3. Review top results (2–3 strong matches preferred)
4. Synthesize answer
5. Include citations
6. Optionally write new memory

---

## Retrieval Strategy

- Always search before answering
- Prefer:
  - exact keyword matches
  - file path relevance
  - section headers
- Use 2–3 strong sources instead of many weak ones
- If no good results:
  - say "I could not find this in the docs"

---

## Answer Guidelines

- Start with a direct answer
- Use bullet points when helpful
- Be concise but complete
- Do NOT hallucinate missing information
- If uncertain, explicitly say so

---

## Citation Format

Always include sources at the end:

Sources:
- docs/path/to/file.md
- docs/another/file.md

---

## Memory Write Policy

After answering, evaluate:

Should this be remembered?

If YES:
1. Choose correct file:
   - decisions.md
   - patterns.md
   - notes.md
2. Append entry in this format:

## YYYY-MM-DD - Title
<content>

Optional:
- Reason:
- Implications:

---

## Failure Handling

If:
- search returns nothing
- results are low quality

Then:
- state that clearly
- do not fabricate an answer
- suggest reindexing if appropriate

---

## Efficiency Guidelines

- Do not over-search (max 2–3 good queries)
- Do not read entire files unless necessary
- Prefer targeted extraction

---

## Example Interaction

Question:
"What is the auth token expiry?"

Process:
1. Read memory (check for recent changes)
2. qmd query "auth token expiry"
3. Extract relevant snippets
4. Answer with citations

Output:

Auth tokens expire after 24 hours.

Sources:
- docs/auth/tokens.md
- docs/security/expiry.md

---

## Summary

docs      = source of truth
memory    = evolving knowledge
qmd       = retrieval engine
agent     = reasoning + orchestration

The agent must always ground answers in retrieved information and maintain useful long-term memory.