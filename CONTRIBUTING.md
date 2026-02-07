# Contributing to Pornsearch

Thank you for your interest in contributing to Pornsearch! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain a professional attitude

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher
- Git
- TypeScript knowledge

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pornsearch.git
   cd pornsearch
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the project:
   ```bash
   npm run build
   ```
5. Run tests:
   ```bash
   npm test
   ```

## Development Workflow

### 1. Create a Branch

Create a new branch for your feature or bugfix:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bugfix-name
```

### 2. Make Changes

- Write clean, maintainable code
- Follow the existing code style
- Add or update tests for your changes
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code
npm run format

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build the project
npm run build
```

### 4. Commit Your Changes

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug in video parser"
git commit -m "docs: update README examples"
git commit -m "test: add tests for new module"
git commit -m "refactor: improve type definitions"
```

Commit types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### 5. Push and Create Pull Request

```bash
git push origin your-branch-name
```

Then create a pull request on GitHub with:
- Clear title describing the change
- Detailed description of what and why
- Reference to related issues (if any)
- Screenshots (if applicable)

## Adding a New Module

To add support for a new adult content site:

### 1. Create Module File

Create a new file in `src/modules/`:

```typescript
// src/modules/NewSite.ts
import * as cheerio from 'cheerio';
import VideoMixin from '../core/VideoMixin';
import GifMixin from '../core/GifMixin'; // Optional
import AbstractModule from '../core/AbstractModule';
import { Video, Gif } from '../types';

class NewSite extends AbstractModule.with(VideoMixin) {
  get name(): string {
    return 'NewSite';
  }

  get firstpage(): number {
    return 1; // or 0, depending on the site
  }

  videoUrl(page?: number): string {
    return `https://newsite.com/search?q=${this.query}&page=${page || this.firstpage}`;
  }

  videoParser($: cheerio.Root): Video[] {
    // Parse the HTML and extract video data
    const videos = $('.video-item');
    
    return videos
      .map((index: number, element: cheerio.Element) => {
        const data = $(element);
        
        return {
          title: data.find('.title').text().trim(),
          url: data.find('a').attr('href') || '',
          duration: data.find('.duration').text(),
          thumb: data.find('img').attr('src') || '',
        };
      })
      .get()
      .filter((item: Video | undefined): item is Video => item !== undefined);
  }
}

export default NewSite;
```

### 2. Register Module

Add your module to `src/core/Modules.ts`:

```typescript
import NewSite from '../modules/NewSite';

const modules: ModulesRegistry = {
  // ... existing modules
  newsite: NewSite,
};
```

### 3. Update Documentation

Update `README.md`:
- Add to support tables
- Update examples if needed

### 4. Add Tests

Create `__tests__/modules/NewSite.test.ts`:

```typescript
import NewSite from '../../src/modules/NewSite';

describe('NewSite Module', () => {
  it('should have correct name', () => {
    const module = new NewSite('test');
    expect(module.name).toBe('NewSite');
  });

  it('should generate correct video URL', () => {
    const module = new NewSite('test query');
    const url = module.videoUrl(2);
    expect(url).toContain('test query');
    expect(url).toContain('page=2');
  });

  // Add more tests...
});
```

## Code Style Guidelines

### TypeScript

- Use TypeScript strict mode
- Avoid `any` types when possible
- Use descriptive variable and function names
- Add JSDoc comments for public APIs
- Use proper type annotations

### Formatting

- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multi-line objects/arrays
- Max line length: 100 characters

The project uses Prettier and ESLint to enforce these rules automatically.

### File Structure

```
pornsearch/
├── src/
│   ├── Pornsearch.ts          # Main class
│   ├── types.ts               # Type definitions
│   ├── core/
│   │   ├── AbstractModule.ts  # Base module class
│   │   ├── VideoMixin.ts      # Video functionality
│   │   ├── GifMixin.ts        # GIF functionality
│   │   ├── Modules.ts         # Module registry
│   │   └── OverwriteError.ts  # Custom error
│   └── modules/
│       ├── Pornhub.ts         # Site-specific module
│       └── ...
├── __tests__/                 # Test files
├── example/                   # Example usage
└── dist/                      # Build output (gitignored)
```

## Testing Guidelines

### Unit Tests

- Test one thing at a time
- Use descriptive test names
- Follow AAA pattern: Arrange, Act, Assert
- Mock external dependencies
- Aim for high coverage (>80%)

### Test Structure

```typescript
describe('Feature/Component', () => {
  describe('specific functionality', () => {
    it('should do something specific', () => {
      // Arrange
      const input = 'test';
      
      // Act
      const result = someFunction(input);
      
      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

## Documentation

### JSDoc Comments

Add JSDoc comments for:
- Public classes and methods
- Complex functions
- Non-obvious behavior

Example:
```typescript
/**
 * Searches for videos matching the query
 * @param page - Optional page number (default: 1)
 * @returns Promise resolving to array of videos
 * @throws Error if module doesn't support video search
 * @example
 * ```typescript
 * const videos = await searcher.videos(2);
 * ```
 */
videos(page?: number): Promise<Video[]>
```

### README Updates

Update README.md when:
- Adding new features
- Changing public API
- Adding new modules
- Updating examples

## Pull Request Guidelines

### Before Submitting

- [ ] Code compiles without errors
- [ ] All tests pass
- [ ] Linter passes (0 errors)
- [ ] Code is formatted
- [ ] Documentation updated
- [ ] Commit messages follow conventions
- [ ] Branch is up-to-date with main

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- List specific changes
- Be detailed but concise

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Related Issues
Fixes #123
Related to #456
```

## Review Process

1. Maintainer reviews your PR
2. Address feedback and requested changes
3. Push updates to your branch
4. Maintainer approves and merges

## Getting Help

- Open an issue for bugs or feature requests
- Start a discussion for questions
- Check existing issues and discussions first

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Mentioned in commit messages

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Pornsearch! 🎉
