# Maintainer Guide

## Overview
This guide provides actionable steps for maintainers to continue improving and maintaining the Pornsearch library after the TypeScript migration.

## Immediate Action Items

### 1. Publishing to npm
The library has been successfully migrated to TypeScript but needs to be published to npm.

**Steps:**
```bash
# 1. Update version in package.json (following semantic versioning)
npm version major  # 3.0.0 (breaking: TypeScript migration)
# OR
npm version minor  # 2.5.0 (non-breaking: if maintaining backward compatibility)

# 2. Build the project
npm run build

# 3. Test the build
npm run test

# 4. Publish to npm
npm publish
```

**Considerations:**
- The library maintains backward compatibility (CommonJS exports)
- TypeScript declaration files are automatically included
- Consider publishing a beta version first: `npm publish --tag beta`

### 2. Setting Up CI/CD

A GitHub Actions workflow has been added (`.github/workflows/ci.yml`) to automate:
- Building the project
- Running linters
- Running tests
- Security scanning with CodeQL

**To enable:**
1. The workflow file is committed to the repository
2. GitHub Actions will automatically run on push and PR events
3. Configure branch protection rules to require CI checks before merging

### 3. Adding Unit Tests

A Jest test infrastructure has been added to the project.

**To run tests:**
```bash
npm test
```

**To add new tests:**
1. Create test files in `__tests__/` directory
2. Use pattern: `*.test.ts` or `*.spec.ts`
3. Follow existing test structure and conventions

**Test Coverage:**
```bash
npm run test:coverage
```

## Code Quality Standards

### TypeScript Standards
- **Strict Mode:** The project uses TypeScript strict mode
- **Type Safety:** Avoid `any` types; use proper type definitions
- **Generics:** Use generic types for reusable components
- **Interfaces:** Define interfaces for all data structures

### Linting and Formatting
```bash
# Check for linting issues
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format
```

### Code Review Checklist
- [ ] TypeScript compiles without errors
- [ ] ESLint passes (0 errors acceptable, minimize warnings)
- [ ] Prettier formatting applied
- [ ] Tests pass
- [ ] No security vulnerabilities (`npm audit`)
- [ ] Documentation updated
- [ ] Backward compatibility maintained

## Development Workflow

### Adding a New Module

1. **Create the module file** in `src/modules/`:
```typescript
// src/modules/NewSite.ts
import * as cheerio from 'cheerio';
import VideoMixin from '../core/VideoMixin';
import GifMixin from '../core/GifMixin';
import AbstractModule from '../core/AbstractModule';
import { Video, Gif } from '../types';

class NewSite extends AbstractModule.with(VideoMixin, GifMixin) {
  get name(): string {
    return 'NewSite';
  }

  get firstpage(): number {
    return 1;
  }

  videoUrl(page?: number): string {
    return `https://newsite.com/search?q=${this.query}&page=${page || this.firstpage}`;
  }

  videoParser($: cheerio.Root): Video[] {
    // Implementation
    return [];
  }

  gifUrl(page?: number): string {
    return `https://newsite.com/gifs?q=${this.query}&page=${page || this.firstpage}`;
  }

  gifParser($: cheerio.Root): Gif[] {
    // Implementation
    return [];
  }
}

export default NewSite;
```

2. **Register the module** in `src/core/Modules.ts`:
```typescript
import NewSite from '../modules/NewSite';

const modules: ModulesRegistry = {
  // ... existing modules
  newsite: NewSite,
};
```

3. **Update documentation**:
   - Add to support table in README.md
   - Test with example code
   - Update MIGRATION_SUMMARY.md if needed

4. **Add tests** for the new module

### Updating Dependencies

```bash
# Check for outdated dependencies
npm outdated

# Update a specific dependency
npm update <package-name>

# Update all dependencies (be careful!)
npm update

# Check for security vulnerabilities
npm audit

# Fix security vulnerabilities automatically
npm audit fix
```

**Important:** Always test after updating dependencies!

### Handling Breaking Changes

If you need to make breaking changes:

1. **Version Bump:** Use semantic versioning
   - Major version: Breaking changes (3.0.0)
   - Minor version: New features, backward compatible (2.5.0)
   - Patch version: Bug fixes (2.4.4)

2. **Migration Guide:** Create a migration guide for users
   - Document all breaking changes
   - Provide before/after code examples
   - Include workarounds if possible

3. **Deprecation Period:**
   - Mark old APIs as deprecated
   - Provide alternatives
   - Give users time to migrate (at least one major version)

## Architecture Guidelines

### Mixin Pattern
The library uses TypeScript mixins to add functionality to modules:

- **VideoMixin:** Adds video search capability
- **GifMixin:** Adds gif search capability

**Benefits:**
- Modules only include functionality they support
- Type-safe composition
- Reusable code

**Usage:**
```typescript
// Video only
class Site extends AbstractModule.with(VideoMixin) {}

// Both video and gif
class Site extends AbstractModule.with(VideoMixin, GifMixin) {}
```

### Error Handling

- **OverwriteError:** Thrown when a mixin method is not overridden
- **Module Errors:** Thrown when a module doesn't support an operation
- **Network Errors:** Handled gracefully with meaningful messages

### Type System

Key interfaces:
- **Video:** Defines video data structure
- **Gif:** Defines gif data structure
- **ModuleInterface:** Contract for all modules
- **ModuleConstructor:** Type for module classes

## Security Best Practices

1. **Dependency Management:**
   - Regular updates (monthly)
   - Security audit before each release
   - Use `npm audit` in CI/CD

2. **Code Scanning:**
   - CodeQL runs automatically in CI
   - Review and address security alerts
   - Use GitHub Dependabot for automated updates

3. **Input Validation:**
   - Sanitize user queries before creating URLs
   - Validate data from web scraping
   - Handle edge cases and invalid responses

## Performance Considerations

1. **Build Output:**
   - CommonJS for compatibility
   - ES2020 target for modern features
   - Tree-shaking friendly exports

2. **Module Loading:**
   - Lazy loading for modules
   - Only load what's needed

3. **Web Scraping:**
   - Respect rate limits
   - Handle timeouts gracefully
   - Cache when appropriate

## Documentation Standards

### Code Documentation (JSDoc)
```typescript
/**
 * Searches for videos matching the query
 * @param page - Optional page number (default: 1)
 * @returns Promise resolving to array of videos
 * @throws Error if module doesn't support video search
 * @example
 * ```typescript
 * const searcher = new Pornsearch('query');
 * const videos = await searcher.videos(2);
 * ```
 */
videos(page?: number): Promise<Video[]>
```

### README.md
- Keep examples up-to-date
- Document all features
- Include TypeScript and JavaScript examples
- Maintain support tables

### CHANGELOG.md
Maintain a changelog following [Keep a Changelog](https://keepachangelog.com/):
- Added: New features
- Changed: Changes in existing functionality
- Deprecated: Soon-to-be removed features
- Removed: Removed features
- Fixed: Bug fixes
- Security: Security fixes

## Release Process

1. **Preparation:**
   ```bash
   # Update version
   npm version <major|minor|patch>
   
   # Update CHANGELOG.md
   # Update README.md if needed
   ```

2. **Quality Checks:**
   ```bash
   npm run build
   npm run lint
   npm run test
   npm audit
   ```

3. **Git Operations:**
   ```bash
   git add .
   git commit -m "Release vX.Y.Z"
   git tag vX.Y.Z
   git push origin main --tags
   ```

4. **Publish:**
   ```bash
   npm publish
   ```

5. **Post-Release:**
   - Create GitHub release with changelog
   - Announce on relevant channels
   - Monitor for issues

## Community Management

### Issue Triage
- Label issues appropriately (bug, enhancement, question)
- Reproduce reported bugs
- Close duplicates and stale issues
- Provide feedback within 48 hours

### Pull Requests
- Review code quality and tests
- Run CI checks
- Test locally
- Provide constructive feedback
- Merge with squash for clean history

### Communication
- Be respectful and professional
- Acknowledge contributions
- Provide clear explanations
- Document decisions

## Troubleshooting

### Build Failures
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Test Failures
```bash
# Run tests with verbose output
npm test -- --verbose

# Run specific test file
npm test -- __tests__/specific.test.ts
```

### Type Errors
```bash
# Check TypeScript compilation
npx tsc --noEmit

# Get detailed error messages
npx tsc --noEmit --pretty
```

## Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

## Contact and Support

For maintainer-specific questions:
1. Open a discussion on GitHub
2. Tag `@maintainer` in issues
3. Review existing documentation first

---

**Last Updated:** February 2026
**Maintainers:** See CONTRIBUTORS.md
