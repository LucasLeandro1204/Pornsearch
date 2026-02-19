import Pornsearch from '../dist/Pornsearch';

/**
 * TypeScript example for Pornsearch library
 * This example demonstrates the type-safe API usage with improved error handling
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

    // Check what the current module supports
    console.log('Feature support check:');
    console.log('  - Supports videos:', searcher.supportsVideos());
    console.log('  - Supports GIFs:', searcher.supportsGifs());
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

    for (const site of searcher.support()) {
      console.log(`Using static search method with ${site}...`);
      const siteSearcher = Pornsearch.search('test').driver(site);
      const siteVideos = await siteSearcher.videos(1);

      console.log(`Found ${siteVideos.length} videos on ${site}:`);
      siteVideos.slice(0, 2).forEach((video, index) => {
        console.log(`${index + 1}. ${video.title}`);
        console.log(`   Duration: ${video.duration}`);
      });
      console.log('\n---\n');
    }

    // Demonstrate fluent API with setQuery()
    console.log('Using fluent API to change query...');
    const fluentSearcher = new Pornsearch()
      .setQuery('lesbian')
      .driver('redtube');
    console.log('New query:', fluentSearcher.query);
    console.log('Module:', fluentSearcher.current());
    console.log('Supports GIFs:', fluentSearcher.supportsGifs());

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
