import AbstractModule from '../src/core/AbstractModule';
import VideoMixin from '../src/core/VideoMixin';
import GifMixin from '../src/core/GifMixin';

// Test module implementation
class TestModule extends AbstractModule.with(VideoMixin, GifMixin) {
  get name(): string {
    return 'TestModule';
  }

  get firstpage(): number {
    return 1;
  }

  videoUrl(page?: number): string {
    return `https://example.com/videos?q=${this.query}&page=${page || this.firstpage}`;
  }

  videoParser(): any[] {
    return [];
  }

  gifUrl(page?: number): string {
    return `https://example.com/gifs?q=${this.query}&page=${page || this.firstpage}`;
  }

  gifParser(): any[] {
    return [];
  }
}

describe('AbstractModule', () => {
  it('should create instance with query', () => {
    const module = new TestModule('test query');
    expect(module.query).toBe('test query');
  });

  it('should create instance with empty query', () => {
    const module = new TestModule();
    expect(module.query).toBe('');
  });

  it('should have name property', () => {
    const module = new TestModule('test');
    expect(module.name).toBe('TestModule');
  });

  it('should have firstpage property', () => {
    const module = new TestModule('test');
    expect(module.firstpage).toBe(1);
  });
});

describe('Mixin Pattern', () => {
  it('should apply VideoMixin', () => {
    class VideoOnlyModule extends AbstractModule.with(VideoMixin) {
      get name(): string {
        return 'VideoOnly';
      }

      get firstpage(): number {
        return 0;
      }

      videoUrl(page?: number): string {
        return `https://example.com/videos?page=${page}`;
      }

      videoParser(): any[] {
        return [];
      }
    }

    const module = new VideoOnlyModule('test');
    expect(module.videoUrl).toBeDefined();
    expect(module.videoParser).toBeDefined();
  });

  it('should apply GifMixin', () => {
    class GifOnlyModule extends AbstractModule.with(GifMixin) {
      get name(): string {
        return 'GifOnly';
      }

      get firstpage(): number {
        return 0;
      }

      gifUrl(page?: number): string {
        return `https://example.com/gifs?page=${page}`;
      }

      gifParser(): any[] {
        return [];
      }
    }

    const module = new GifOnlyModule('test');
    expect(module.gifUrl).toBeDefined();
    expect(module.gifParser).toBeDefined();
  });

  it('should apply multiple mixins', () => {
    const module = new TestModule('test');
    expect(module.videoUrl).toBeDefined();
    expect(module.videoParser).toBeDefined();
    expect(module.gifUrl).toBeDefined();
    expect(module.gifParser).toBeDefined();
  });

  it('should throw OverwriteError if method not overridden', () => {
    class IncompleteModule extends AbstractModule.with(VideoMixin) {
      get name(): string {
        return 'Incomplete';
      }

      get firstpage(): number {
        return 1;
      }
    }

    const module = new IncompleteModule('test') as any;
    expect(() => module.videoUrl()).toThrow('This function must be overridden.');
    expect(() => module.videoParser()).toThrow('This function must be overridden.');
  });
});
