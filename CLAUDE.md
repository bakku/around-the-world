# CLAUDE.md - Development Guide

## Commands
- **Setup**: `bin/setup` (installs dependencies and starts dev server)
- **Development server**: `bin/dev` (runs Rails + Vite)
- **Tests**: `bin/rails test` (all tests), `bin/rails test TEST=path/to/test_file.rb:line_number` (single test)
- **TypeScript check**: `bun run check`
- **Lint Ruby**: `bin/rubocop`
- **Lint JavaScript/TypeScript**: `bun eslint`

## Code Style

### Ruby
- Follow Rails Omakase style guide (rubocop-rails-omakase)

### JavaScript/TypeScript
- Use ES modules with TypeScript (strict mode enabled)
- Path alias: `@/*` maps to `./app/javascript/*`
- Double quotes for strings, semicolons required
- 2-space indentation, Unix line endings
- Always use const when variable won't be reassigned

### Frontend
- Use Inertia.js with Vue 3 for frontend
- UI components are in `app/javascript/components/ui/`