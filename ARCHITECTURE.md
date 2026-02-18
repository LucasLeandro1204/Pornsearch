# Architecture Documentation

## Overview

Pornsearch is a TypeScript library that provides a unified interface for searching adult content across multiple platforms. The architecture is designed around modularity, extensibility, and type safety.

## Design Principles

1. **Modularity**: Each content site is implemented as a separate module
2. **Extensibility**: Easy to add new modules without changing core code
3. **Type Safety**: Full TypeScript support with strict typing
4. **Backward Compatibility**: Maintains CommonJS exports for existing users
5. **Composition over Inheritance**: Uses mixins for optional functionality

## Core Architecture

### Component Diagram

```
┌─────────────────────────────────────────────────┐
│              Pornsearch (Main Class)            │
│  - driver management                            │
│  - query management                             │
│  - content fetching & parsing                   │
└───────────────┬─────────────────────────────────┘
                │
                │ uses
                │
┌───────────────▼─────────────────────────────────┐
│           Module Registry                       │
│  Maps module names to constructors              │
└───────────────┬─────────────────────────────────┘
                │
                │ contains
                │
┌───────────────▼─────────────────────────────────┐
│          AbstractModule + Mixins                │
│  Base class with optional capabilities          │
└───────────────┬─────────────────────────────────┘
                │
                │ extended by
                │
┌───────────────▼─────────────────────────────────┐
│        Concrete Modules                         │
│  Pornhub, Sex, Redtube, etc.                    │
│  - URL generation                               │
│  - HTML parsing                                 │
│  - Data extraction                              │
└─────────────────────────────────────────────────┘
```

## Key Components

### 1. Pornsearch Class

**Location:** `src/Pornsearch.ts`

**Responsibilities:**
- Manage current module/driver
- Handle search queries
- Coordinate content fetching
- Parse responses using module-specific parsers

**Key Methods:**
- `constructor(query?, driver?)`: Initialize with query and driver
- `driver(name, query?)`: Switch to a different module
- `videos(page?)`: Search for videos
- `gifs(page?)`: Search for GIFs
- `support()`: List supported modules
- `current()`: Get current module name

**Design Pattern:** Facade Pattern - Provides a simple interface to complex module system

### 2. Module System

#### AbstractModule

**Location:** `src/core/AbstractModule.ts`

**Purpose:** Base class for all content modules

**Key Features:**
- Abstract properties: `name`, `firstpage`
- Query management
- Mixin support via `with()` static method

**Abstract Properties:**
```typescript
abstract get name(): string;         // Module name
abstract get firstpage(): number;    // Starting page (0 or 1)
```

#### Mixins

**VideoMixin** (`src/core/VideoMixin.ts`)
- Adds video search capability
- Requires: `videoUrl()` and `videoParser()` implementations

**GifMixin** (`src/core/GifMixin.ts`)
- Adds GIF search capability
- Requires: `gifUrl()` and `gifParser()` implementations

**Design Pattern:** Mixin Pattern - Allows modules to compose functionality

#### Module Registry

**Location:** `src/core/Modules.ts`

**Purpose:** Central registry of available modules

**Structure:**
```typescript
interface ModulesRegistry {
  [key: string]: ModuleConstructor;
}
```

Maps lowercase module names to their constructor functions.

### 3. Type System

**Location:** `src/types.ts`

**Key Interfaces:**

```typescript
// Content types
interface Video {
  title: string;
  url: string;
  duration: string;
  thumb: string;
}

interface Gif {
  title: string;
  url: string;
  webm?: string;
}

// Module contract
interface ModuleInterface {
  name: string;
  firstpage: number;
  query: string;
  videoUrl?(page?: number): string;
  gifUrl?(page?: number): string;
  videoParser?($: Root, body?: string): Video[];
  gifParser?($: Root, body?: string): Gif[];
}
```

## Data Flow

### Video Search Flow

```
1. User calls: searcher.videos(page)
   │
   ├─> Pornsearch validates module supports videos
   │
   ├─> Gets URL from module.videoUrl(page)
   │
   ├─> Fetches content with axios
   │
   ├─> Loads HTML with cheerio
   │
   ├─> Calls module.videoParser($, body)
   │
   ├─> Module parses and returns Video[]
   │
   └─> Pornsearch returns Promise<Video[]>
```

### Module Switching Flow

```
1. User calls: searcher.driver('sex')
   │
   ├─> Pornsearch looks up module in registry
   │
   ├─> Validates module exists
   │
   ├─> Creates new module instance with current query
   │
   ├─> Sets as current module
   │
   └─> Returns this (for chaining)
```

## Module Implementation

### Minimal Module (Video Only)

```typescript
import * as cheerio from 'cheerio';
import VideoMixin from '../core/VideoMixin';
import AbstractModule from '../core/AbstractModule';
import { Video } from '../types';

class MinimalSite extends AbstractModule.with(VideoMixin) {
  get name(): string {
    return 'MinimalSite';
  }

  get firstpage(): number {
    return 1;
  }

  videoUrl(page?: number): string {
    return `https://site.com/search?q=${this.query}&p=${page || this.firstpage}`;
  }

  videoParser($: cheerio.Root): Video[] {
    // Parse HTML and return videos
    return [];
  }
}
```

### Full-Featured Module (Video + GIF)

```typescript
class FullSite extends AbstractModule.with(VideoMixin, GifMixin) {
  // Implement both video and gif methods
}
```

## Extensibility Points

### Adding a New Module

1. Create module class in `src/modules/`
2. Extend `AbstractModule.with(mixins...)`
3. Implement required methods
4. Register in `src/core/Modules.ts`
5. Add tests

No changes needed to core Pornsearch class!

### Adding New Content Type

To add support for a new content type (e.g., images):

1. Create new mixin (e.g., `ImageMixin.ts`)
2. Define interface in `types.ts`
3. Add method to Pornsearch class
4. Update modules as needed

### Custom Error Handling

Modules can throw custom errors:

```typescript
class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
  }
}
```

## Performance Considerations

### Lazy Module Loading

Modules are instantiated only when selected, not at library load time.

### Caching Strategy

Currently, no caching is implemented. Future considerations:
- Response caching
- Parsed data caching
- TTL-based invalidation

### Request Management

- Uses axios for HTTP requests
- No built-in rate limiting (should be handled by user)
- No retry logic (should be handled by user)

## Security Considerations

### Input Sanitization

- Query strings are URL-encoded by modules
- No SQL injection risk (no database)
- XSS risk minimal (library doesn't render HTML)

### Dependency Security

- Regular security audits with `npm audit`
- CodeQL scanning in CI
- Dependabot for automated updates

### Content Scraping

- Respects robots.txt (user responsibility)
- No authentication handling
- No session management

## Error Handling Strategy

### Error Types

1. **Module Errors**: Module not found, unsupported operation
2. **Network Errors**: Failed requests, timeouts
3. **Parse Errors**: Invalid HTML, no results
4. **Mixin Errors**: Unimplemented required methods

### Error Propagation

```
Module Error → Pornsearch → User Code
     ↓
 Wrapped in descriptive Error with context
```

### Best Practices for Users

```typescript
try {
  const videos = await searcher.videos();
} catch (error) {
  if (error.message.includes('not supported')) {
    // Handle unsupported operation
  } else if (error.message.includes('No results')) {
    // Handle no results
  } else {
    // Handle other errors
  }
}
```

## Testing Strategy

### Unit Tests

- Test individual components in isolation
- Mock external dependencies (axios)
- Test all code paths

### Integration Tests

- Test module interactions
- Test full search flow
- Test error scenarios

### Test Structure

```
__tests__/
├── Pornsearch.test.ts        # Main class tests
├── types.test.ts             # Type definition tests
├── AbstractModule.test.ts    # Core functionality tests
└── modules/
    └── *.test.ts             # Module-specific tests
```

## Build Process

### TypeScript Compilation

```
TypeScript (src/) → JavaScript (dist/)
                 ↓
            Declaration files (.d.ts)
                 ↓
            Source maps (.js.map)
```

### Configuration

- **Target**: ES2020 (modern JavaScript)
- **Module**: CommonJS (for Node.js compatibility)
- **Strict Mode**: Enabled (type safety)
- **Declaration**: Generated (TypeScript support)

### Output Structure

```
dist/
├── Pornsearch.js           # Compiled JS
├── Pornsearch.d.ts         # Type definitions
├── Pornsearch.js.map       # Source map
├── core/                   # Core modules
└── modules/                # Content modules
```

## Future Improvements

### Potential Enhancements

1. **Pagination Helper**: Automatic page iteration
2. **Caching Layer**: Response and parse caching
3. **Rate Limiting**: Built-in request throttling
4. **Retry Logic**: Automatic retry with backoff
5. **Stream Support**: Stream large result sets
6. **Plugin System**: User-defined modules
7. **Advanced Filters**: By duration, quality, etc.
8. **Batch Operations**: Multiple queries in parallel

### Breaking Changes to Avoid

- Changing method signatures
- Removing modules
- Changing return types
- Modifying error types

### Non-Breaking Changes

- Adding new modules
- Adding optional parameters
- Adding new methods
- Enhancing error messages

## Maintenance Guidelines

### Code Quality

- ESLint: 0 errors, minimize warnings
- TypeScript: Strict mode, no compilation errors
- Tests: >80% coverage
- Documentation: JSDoc for public APIs

### Dependency Updates

- Monthly security updates
- Quarterly feature updates
- Test after each update
- Document breaking changes

### Release Process

1. Update version (semver)
2. Update CHANGELOG
3. Run full test suite
4. Build project
5. Tag release
6. Publish to npm
7. Create GitHub release

---

**Document Version:** 1.0
**Last Updated:** February 2026
**Maintainers:** See MAINTAINER_GUIDE.md
