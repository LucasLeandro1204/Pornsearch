import { Video, Gif, ModuleInterface } from '../src/types';

describe('Type Definitions', () => {
  describe('Video interface', () => {
    it('should allow valid video objects', () => {
      const video: Video = {
        title: 'Test Video',
        url: 'https://example.com/video',
        duration: '10:30',
        thumb: 'https://example.com/thumb.jpg',
      };

      expect(video.title).toBe('Test Video');
      expect(video.url).toBe('https://example.com/video');
      expect(video.duration).toBe('10:30');
      expect(video.thumb).toBe('https://example.com/thumb.jpg');
    });
  });

  describe('Gif interface', () => {
    it('should allow valid gif objects', () => {
      const gif: Gif = {
        title: 'Test GIF',
        url: 'https://example.com/gif.gif',
      };

      expect(gif.title).toBe('Test GIF');
      expect(gif.url).toBe('https://example.com/gif.gif');
    });

    it('should allow gif with webm', () => {
      const gif: Gif = {
        title: 'Test GIF',
        url: 'https://example.com/gif.gif',
        webm: 'https://example.com/gif.webm',
      };

      expect(gif.webm).toBe('https://example.com/gif.webm');
    });
  });

  describe('ModuleInterface', () => {
    it('should allow module with all properties', () => {
      const module: Partial<ModuleInterface> = {
        name: 'TestModule',
        firstpage: 1,
        query: 'test',
        videoUrl: (page) => `https://example.com/videos?page=${page}`,
        gifUrl: (page) => `https://example.com/gifs?page=${page}`,
      };

      expect(module.name).toBe('TestModule');
      expect(module.firstpage).toBe(1);
      expect(module.query).toBe('test');
      expect(module.videoUrl).toBeDefined();
      expect(module.gifUrl).toBeDefined();
    });

    it('should allow module with only video support', () => {
      const module: Partial<ModuleInterface> = {
        name: 'TestModule',
        firstpage: 1,
        query: 'test',
        videoUrl: (page) => `https://example.com/videos?page=${page}`,
      };

      expect(module.videoUrl).toBeDefined();
      expect(module.gifUrl).toBeUndefined();
    });
  });
});
