import VideoMixin from '../core/VideoMixin';
import AbstractModule from '../core/AbstractModule';
import { Video } from '../types';
import type { CheerioAPI } from 'cheerio';

interface RedtubeVideo {
  video: {
    title: string;
    url: string;
    duration: string;
    default_thumb: string;
  };
}

interface RedtubeResponse {
  videos: RedtubeVideo[];
}

class Redtube extends AbstractModule.with(VideoMixin) {
  get name(): string {
    return 'Redtube';
  }

  get firstpage(): number {
    return 1;
  }

  videoUrl(page?: number): string {
    return `https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=${this.query}&thumbsize=big&page=${page || this.firstpage}`;
  }

  videoParser(_$: CheerioAPI, body?: string): Video[] {
    if (!body) {
      return [];
    }

    try {
      const response: RedtubeResponse = JSON.parse(body);
      return response.videos.map(({ video }) => ({
        title: video.title,
        url: video.url,
        duration: video.duration,
        thumb: video.default_thumb,
      }));
    } catch {
      return [];
    }
  }
}

export default Redtube;
