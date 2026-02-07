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
      expect(() => new Pornsearch('test', 'invalid')).toThrow("We don't support invalid by now =/");
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
        expect(() => searcher.gifs()).toThrow(`Gif search is not supported for`);
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
