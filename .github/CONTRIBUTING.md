# Contributing to stardew-valley-data

Thanks for your interest in contributing! This guide will help you get started.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/stardew-valley-data.git
   cd stardew-valley-data
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `pnpm build`        | Build the package with tsup              |
| `pnpm lint`         | Run TypeScript type-checking and ESLint  |
| `pnpm format`       | Format all files with Prettier           |
| `pnpm format:check` | Check formatting without writing changes |
| `pnpm test`         | Run the test suite                       |
| `pnpm sample`       | Run sample scripts and validate images   |

### Before Submitting

1. **Format your code** — run `pnpm format` to ensure consistent style
2. **Lint** — run `pnpm lint` to catch type errors and lint issues
3. **Run tests** — run `pnpm test` to make sure nothing is broken
4. **Run samples** — run `pnpm sample` to validate image paths and exercise query logic

## Adding a New Data Module

See the [DEVELOPMENT.md](DEVELOPMENT.md) guide for the full step-by-step walkthrough with code
examples and a checklist of all files to create/update.

## Reporting Bugs

Use the
[Bug Report](https://github.com/chiefpansancolt/stardew-valley-data/issues/new?template=bug_report.yml)
issue template.

## Requesting Features

Use the
[Feature Request](https://github.com/chiefpansancolt/stardew-valley-data/issues/new?template=feature_request.yml)
issue template.

## Pull Requests

- Keep PRs focused — one feature or fix per PR
- Write a clear description of what changed and why
- Ensure all checks pass (lint, test, format)
- Reference any related issues

## License

By contributing, you agree that your contributions will be licensed under the
[MIT License](../LICENSE).
