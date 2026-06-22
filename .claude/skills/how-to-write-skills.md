# How to Write Skills and AGENTS.md

## The Core Rule

Write rules, not descriptions. A skill document should tell an agent what to do, not describe what currently exists.

## AGENTS.md

Keep it minimal — a few lines per convention at most. Point to skills for detail.

- State the principle, not the implementation
- Never list specific file names or folder contents — they change
- If you find yourself writing a file tree, stop and ask: is this a rule or a snapshot?

## Skill Documents

Each skill covers one topic. Within it:

- Lead with the decision rule — what should an agent ask itself before acting?
- Explain the why briefly — knowing the reason helps apply the rule to edge cases
- Use short code examples only when the rule is hard to express in words
- Never mention specific file paths, component names, or current repo contents — these rot immediately

## What Rots

Anything that will be wrong when a file is added, renamed, or deleted:
- File trees
- Lists of current components or types
- "As seen in X.tsx" references
- Setup instructions tied to current package versions

## What Lasts

- Decision rules ("if X then Y")
- Principles with reasoning ("we do X because Y")
- Constraints ("never do X in context Y because Z")
