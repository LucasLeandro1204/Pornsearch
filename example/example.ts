import Pornsearch from '../src/Pornsearch';

/**
 * TypeScript example for Pornsearch library
 * This example demonstrates the type-safe API usage
 */
async function main() {
  try {
    console.log('=== Pornsearch TypeScript Example ===\n');

    // Create a new searcher with default driver (pornhub)
    const searcher = new Pornsearch('amateur');

    console.log('Current driver:', searcher.current());
    console.log('Search query:', searcher.query);
    console.log('Supported modules:', searcher.support().join(', '));
    console.log('\n---\n');

    // Search for videos on Sex.com
    console.log('Searching for videos on Sex.com...');
    const sexSearcher = searcher.driver('sex');
    const videos = await sexSearcher.videos(1);

    console.log(`Found ${videos.length} videos:`);
    videos.slice(0, 3).forEach((video, index) => {
      console.log(`${index + 1}. ${video.title}`);
      console.log(`   URL: ${video.url}`);
      console.log(`   Duration: ${video.duration}`);
      console.log(`   Thumbnail: ${video.thumb.substring(0, 50)}...`);
    });
    console.log('\n---\n');

    // Search for GIFs on Sex.com
    console.log('Searching for GIFs on Sex.com...');
    const gifs = await sexSearcher.gifs(1);

    console.log(`Found ${gifs.length} GIFs:`);
    gifs.slice(0, 3).forEach((gif, index) => {
      console.log(`${index + 1}. ${gif.title}`);
      console.log(`   URL: ${gif.url.substring(0, 50)}...`);
      if (gif.webm) {
        console.log(`   WebM: ${gif.webm.substring(0, 50)}...`);
      }
    });
    console.log('\n---\n');

    // Use the static search method
    console.log('Using static search method with Pornhub...');
    const pornhubSearcher = Pornsearch.search('test');
    const pornhubVideos = await pornhubSearcher.videos(1);

    console.log(`Found ${pornhubVideos.length} videos on Pornhub:`);
    pornhubVideos.slice(0, 2).forEach((video, index) => {
      console.log(`${index + 1}. ${video.title}`);
      console.log(`   Duration: ${video.duration}`);
    });

    console.log('\n=== Example completed successfully! ===');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }
}

// Run the example
main();
