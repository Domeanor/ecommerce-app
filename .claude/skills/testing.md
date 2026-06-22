# Testing

## Co-location

Tests live next to their source file in the same folder, not in a global `__tests__` directory. Moving or deleting a file takes its test with it naturally.

## What to Test

Test logic and behaviour, not structure.

Write tests for:
- Hooks — state transitions, async behaviour, cleanup on unmount or URL change
- Infra components — correct HTML element rendered, prop behaviour, className merging
- Helpers — return shape, error handling

Skip tests for:
- Page components — too coupled to data fetching and routing
- Pure layout and visual style
- Anything already guaranteed by TypeScript types
