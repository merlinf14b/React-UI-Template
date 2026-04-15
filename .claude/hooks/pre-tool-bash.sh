#!/bin/bash
# PreToolUse hook: block unsafe pnpm commands

set -euo pipefail

input=$(cat)
command=$(echo "$input" | jq -r '.tool_input.command // empty')

if [ -z "$command" ]; then
  exit 0
fi

if echo "$command" | grep -qE 'pnpm.*--minimum-release-age'; then
  echo '{"decision": "block", "reason": "--minimum-release-age bypasses the supply chain protection configured in pnpm-workspace.yaml. Remove the flag and address any age-constraint failures by downgrading or waiting."}' >&2
  exit 2
fi

exit 0
