#!/usr/bin/env bash
# Autonomous Codex loop for the DNA visual overhaul.
# Works docs/visual-overhaul/SPEC.md one task per iteration on the `visual-overhaul`
# branch, committing locally. Review the branch, then push/merge yourself.
#
# Usage: bash scripts/codex-loop.sh [max-iterations]   (default 35)
set -uo pipefail
cd "$(dirname "$0")/.."

MAX="${1:-35}"
BRANCH="visual-overhaul"
PROMPT_FILE="docs/visual-overhaul/LOOP_PROMPT.md"

command -v codex >/dev/null 2>&1 || { echo "codex CLI not found on PATH"; exit 1; }
command -v pnpm  >/dev/null 2>&1 || { echo "pnpm not found on PATH"; exit 1; }
[ -f "$PROMPT_FILE" ] || { echo "missing $PROMPT_FILE"; exit 1; }

if [ ! -d node_modules ]; then
  echo "── installing deps (one-time, network) ──"
  pnpm install --frozen-lockfile || exit 1
fi

# Never loop directly on main; cut/reuse the review branch.
# Base on local main when it contains origin/main (spec commit may be local-only),
# otherwise fall back to origin/main.
git fetch origin --quiet
current=$(git rev-parse --abbrev-ref HEAD)
if [ "$current" != "$BRANCH" ]; then
  base="origin/main"
  if git merge-base --is-ancestor origin/main main 2>/dev/null; then base="main"; fi
  git switch "$BRANCH" 2>/dev/null || git switch -c "$BRANCH" "$base" || exit 1
fi
[ -f docs/visual-overhaul/SPEC.md ] || { echo "SPEC.md missing on branch $BRANCH — merge the spec commit in first"; exit 1; }

start_ref=$(git rev-parse HEAD)

for i in $(seq 1 "$MAX"); do
  echo ""
  echo "══════ codex iteration $i/$MAX ══════"
  out_file=$(mktemp)
  codex exec --full-auto "$(cat "$PROMPT_FILE")" 2>&1 | tee "$out_file"
  if grep -q "ALL_TASKS_COMPLETE" "$out_file"; then
    rm -f "$out_file"
    echo ""
    echo "✓ Spec complete after $i iteration(s)."
    break
  fi
  rm -f "$out_file"
done

echo ""
echo "── commits this run ──"
git log --oneline "${start_ref}..HEAD" || true
echo ""
echo "Next: review the diff, run 'pnpm dev' for a visual pass, then push:"
echo "  git push origin $BRANCH"
