import Pornhub from '../src/modules/Pornhub';
import Xvideos from '../src/modules/Xvideos';
import Sex from '../src/modules/Sex';
import Redtube from '../src/modules/Redtube';
import Youporn from '../src/modules/Youporn';
import Motherless from '../src/modules/Motherless';
import Pornsearch, { VideoCapable, GifCapable, Constructor, Mixin } from '../src/Pornsearch';

describe('Bug fix: page=0 should not fallback to firstpage (nullish coalescing)', () => {
  describe('Xvideos (firstpage=0)', () => {
    const module = new Xvideos('test');

    it('should use firstpage when page is undefined', () => {
      const url = module.videoUrl();
      expect(url).toContain('&p=0');
    });

    it('should use page=0 when explicitly passed', () => {
      const url = module.videoUrl(0);
      expect(url).toContain('&p=0');
    });

    it('should use page=3 when explicitly passed', () => {
      const url = module.videoUrl(3);
      expect(url).toContain('&p=3');
    });
  });

  describe('Pornhub (firstpage=1)', () => {
    const module = new Pornhub('test');

    it('should use firstpage when page is undefined', () => {
      const url = module.videoUrl();
      expect(url).toContain('&page=1');
    });

    it('should use page=0 when explicitly passed (not fallback to 1)', () => {
      const url = module.videoUrl(0);
      expect(url).toContain('&page=0');
    });

    it('should use page=5 when explicitly passed', () => {
      const url = module.videoUrl(5);
      expect(url).toContain('&page=5');
    });

    it('should handle gifUrl with page=0', () => {
      const url = module.gifUrl(0);
      expect(url).toContain('&page=0');
    });
  });

  describe('Sex (firstpage=1)', () => {
    const module = new Sex('test');

    it('should handle page=0 for videoUrl', () => {
      const url = module.videoUrl(0);
      expect(url).toContain('&page=0');
    });

    it('should handle page=0 for gifUrl', () => {
      const url = module.gifUrl(0);
      expect(url).toContain('&page=0');
    });
  });

  describe('Redtube (firstpage=1)', () => {
    const module = new Redtube('test');

    it('should handle page=0 for videoUrl', () => {
      const url = module.videoUrl(0);
      expect(url).toContain('&page=0');
    });
  });

  describe('Youporn (firstpage=1)', () => {
    const module = new Youporn('test');

    it('should handle page=0 for videoUrl', () => {
      const url = module.videoUrl(0);
      expect(url).toContain('&page=0');
    });
  });

  describe('Motherless (firstpage=1)', () => {
    const module = new Motherless('test');

    it('should handle page=0 for videoUrl', () => {
      const url = module.videoUrl(0);
      expect(url).toContain('page=0');
    });

    it('should handle page=0 for gifUrl', () => {
      const url = module.gifUrl(0);
      expect(url).toContain('page=0');
    });
  });
});

describe('Exported type interfaces', () => {
  it('should export VideoCapable interface', () => {
    // Compile-time check: the type should exist and be importable
    const videoCapable: VideoCapable = {
      videoUrl: (page?: number) => `https://example.com?page=${page}`,
      videoParser: () => [],
    };
    expect(videoCapable.videoUrl).toBeDefined();
    expect(videoCapable.videoParser).toBeDefined();
  });

  it('should export GifCapable interface', () => {
    const gifCapable: GifCapable = {
      gifUrl: (page?: number) => `https://example.com?page=${page}`,
      gifParser: () => [],
    };
    expect(gifCapable.gifUrl).toBeDefined();
    expect(gifCapable.gifParser).toBeDefined();
  });

  it('should export Constructor type', () => {
    const ctor: Constructor = class {};
    expect(ctor).toBeDefined();
  });

  it('should export Mixin type', () => {
    const mixin: Mixin = (Base) => class extends Base {};
    expect(mixin).toBeDefined();
  });
});

describe('Bug fix: driver() query parameter uses nullish coalescing', () => {
  it('should preserve query when switching drivers without new query', () => {
    const searcher = new Pornsearch('original', 'pornhub');
    searcher.driver('sex');
    expect(searcher.query).toBe('original');
  });

  it('should update query when explicitly provided', () => {
    const searcher = new Pornsearch('original', 'pornhub');
    searcher.driver('sex', 'newquery');
    expect(searcher.query).toBe('newquery');
  });
});
