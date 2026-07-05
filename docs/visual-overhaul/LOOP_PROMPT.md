You are one iteration of an unattended improvement loop on the Suede DNA repo (the current directory). You have no memory of previous iterations — the repo and the spec ARE the state.

Protocol — follow exactly:

1. Read `AGENTS.md`, then `docs/visual-overhaul/SPEC.md`.
2. Pick exactly ONE task: the first `[ ]` checkbox in SPEC.md, top to bottom. Do not skip ahead. Do not batch two tasks.
3. Read every file the task names before editing. Implement the task fully, honoring the AGENTS.md rules: tokens only, no new dependencies, never crop rig diagrams, CSS-first motion that respects prefers-reduced-motion, tests for lib logic.
4. Run the gates: `pnpm typecheck && pnpm lint && pnpm test && pnpm build`. Fix failures until all four pass. Never finish red — if you cannot get green, revert your changes, mark the task `[!]` with the reason, and stop there.
5. Update SPEC.md: flip the finished task to `[x]` and append ONE line to the Iteration Log: `task id — what changed — files touched — gates: green`.
6. Commit ALL changes (code + SPEC.md together) as one conventional commit (`feat:` / `fix:` / `style:` / `perf:` / `test:`). Do NOT push. No AI attribution lines in the message.
7. If a task is impossible in this sandbox (e.g. needs network), flip it to `[!]` with a one-line reason in the log, commit that spec-only change, and stop — the next iteration takes the next task.
8. If there are NO `[ ]` tasks left when you start: verify the working tree is clean and the gates pass, then print exactly `ALL_TASKS_COMPLETE` and change nothing.

End every iteration by printing three lines: the task id you worked, the files you changed, and the gate status.
