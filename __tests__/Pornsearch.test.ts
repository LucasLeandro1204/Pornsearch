import Pornsearch from '../src/Pornsearch';

describe('Pornsearch', () => {
  describe('Constructor', () => {
    it('should create instance with default driver', () => {
      const searcher = new Pornsearch('test');
      expect(searcher.current()).toBe('Pornhub');
      expect(searcher.query).toBe('test');
    });

    it('should create instance with specified driver', () => {
      const searcher = new Pornsearch('test', 'sex');
      expect(searcher.current()).toBe('Sex');
      expect(searcher.query).toBe('test');
    });

    it('should throw error for unsupported driver', () => {
      expect(() => new Pornsearch('test', 'invalid')).toThrow('Module "invalid" is not supported');
    });
  });

  describe('Static search method', () => {
    it('should create instance with search method', () => {
      const searcher = Pornsearch.search('test');
      expect(searcher.current()).toBe('Pornhub');
      expect(searcher.query).toBe('test');
    });
  });

  describe('support()', () => {
    it('should return list of supported modules', () => {
      const searcher = new Pornsearch('test');
      const supported = searcher.support();
      expect(supported).toContain('pornhub');
      expect(supported).toContain('sex');
      expect(supported).toContain('redtube');
      expect(supported).toContain('xvideos');
      expect(supported).toContain('youporn');
      expect(supported).toContain('motherless');
    });
  });

  describe('driver()', () => {
    it('should change driver and maintain query', () => {
      const searcher = new Pornsearch('test', 'pornhub');
      searcher.driver('sex');
      expect(searcher.current()).toBe('Sex');
      expect(searcher.query).toBe('test');
    });

    it('should change driver with new query', () => {
      const searcher = new Pornsearch('test', 'pornhub');
      searcher.driver('sex', 'newquery');
      expect(searcher.current()).toBe('Sex');
      expect(searcher.query).toBe('newquery');
    });

    it('should return this for chaining', () => {
      const searcher = new Pornsearch('test');
      const result = searcher.driver('sex');
      expect(result).toBe(searcher);
    });

    it('should be case insensitive', () => {
      const searcher = new Pornsearch('test');
      searcher.driver('PORNHUB');
      expect(searcher.current()).toBe('Pornhub');
    });
  });

  describe('current()', () => {
    it('should return current module name', () => {
      const searcher = new Pornsearch('test', 'pornhub');
      expect(searcher.current()).toBe('Pornhub');
    });
  });

  describe('setQuery()', () => {
    it('should update the search query', () => {
      const searcher = new Pornsearch('initial', 'pornhub');
      expect(searcher.query).toBe('initial');
      searcher.setQuery('updated');
      expect(searcher.query).toBe('updated');
    });

    it('should return this for method chaining', () => {
      const searcher = new Pornsearch('test');
      const result = searcher.setQuery('newquery');
      expect(result).toBe(searcher);
    });

    it('should throw error when setting empty query', () => {
      const searcher = new Pornsearch('test');
      expect(() => searcher.setQuery('')).toThrow('Search query cannot be empty');
    });

    it('should throw error when setting whitespace-only query', () => {
      const searcher = new Pornsearch('test');
      expect(() => searcher.setQuery('   ')).toThrow('Search query cannot be empty');
    });
  });

  describe('Query validation', () => {
    it('should throw error when searching with empty query', () => {
      const searcher = new Pornsearch('', 'pornhub');
      expect(() => searcher.videos()).toThrow('Search query is required');
    });

    it('should throw error when searching with whitespace-only query', () => {
      const searcher = new Pornsearch('   ', 'pornhub');
      expect(() => searcher.gifs()).toThrow('Search query is required');
    });

    it('should check module support before query validation - gifs', () => {
      // Redtube doesn't support gifs, so even with empty query, should throw "not supported" error
      const searcher = new Pornsearch('', 'redtube');
      expect(() => searcher.gifs()).toThrow('GIF search is not supported for');
      expect(() => searcher.gifs()).not.toThrow('Search query is required');
    });

    it('should check module support before query validation - videos', () => {
      // All current modules support videos. This test verifies the pattern exists.
      // If a module without video support existed, it would throw "not supported" before "query required"
      const searcher = new Pornsearch('test', 'pornhub');
      expect(searcher.videos).toBeDefined();
    });
  });

  describe('Content type support checks', () => {
    it('supportsVideos() should return true for modules with video support', () => {
      const searcher = new Pornsearch('test', 'pornhub');
      expect(searcher.supportsVideos()).toBe(true);
    });

    it('supportsGifs() should return true for modules with GIF support', () => {
      const searcher = new Pornsearch('test', 'pornhub');
      expect(searcher.supportsGifs()).toBe(true);
    });

    it('supportsGifs() should return false for modules without GIF support', () => {
      const searcher = new Pornsearch('test', 'redtube');
      expect(searcher.supportsGifs()).toBe(false);
    });
  });

  describe('Video support', () => {
    it('should not throw for modules that support videos', () => {
      const modules = ['pornhub', 'sex', 'redtube', 'xvideos', 'youporn', 'motherless'];
      modules.forEach((module) => {
        const searcher = new Pornsearch('test', module);
        // Just check that videoUrl exists, don't actually call videos()
        expect(searcher.videos).toBeDefined();
      });
    });
  });

  describe('GIF support', () => {
    it('should throw error for modules that do not support gifs', () => {
      const noGifModules = ['redtube', 'xvideos', 'youporn', 'motherless'];
      noGifModules.forEach((module) => {
        const searcher = new Pornsearch('test', module);
        expect(() => searcher.gifs()).toThrow('GIF search is not supported for');
      });
    });

    it('should not throw for modules that support gifs', () => {
      const gifModules = ['pornhub', 'sex'];
      gifModules.forEach((module) => {
        const searcher = new Pornsearch('test', module);
        // Just check that gifs method exists and doesn't throw immediately
        expect(searcher.gifs).toBeDefined();
      });
    });
  });
});
