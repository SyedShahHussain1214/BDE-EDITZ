const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID

// Cache for reducing API calls
let statsCache = {
  data: null,
  timestamp: null,
  TTL: 5 * 60 * 1000, // 5 minutes
}

let videosCache = {
  data: null,
  timestamp: null,
  TTL: 10 * 60 * 1000, // 10 minutes
}

/**
 * Get channel statistics (subscribers, views, videos count)
 */
export const getChannelStats = async () => {
  // Check if cache is still valid
  if (statsCache.data && Date.now() - statsCache.timestamp < statsCache.TTL) {
    return statsCache.data
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    )

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      throw new Error('Channel not found')
    }

    const channel = data.items[0]
    const stats = {
      subscribers: channel.statistics.subscriberCount || 'N/A',
      views: channel.statistics.viewCount || 'N/A',
      videoCount: channel.statistics.videoCount || 'N/A',
      title: channel.snippet.title,
      description: channel.snippet.description,
      thumbnail: channel.snippet.thumbnails.high.url,
    }

    // Update cache
    statsCache = {
      data: stats,
      timestamp: Date.now(),
      TTL: statsCache.TTL,
    }

    return stats
  } catch (error) {
    console.error('Error fetching YouTube channel stats:', error)
    // Return default stats if API fails
    return {
      subscribers: 'N/A',
      views: 'N/A',
      videoCount: 'N/A',
    }
  }
}

/**
 * Get latest videos from channel
 */
export const getLatestVideos = async (maxResults = 6) => {
  // Check if cache is still valid
  if (videosCache.data && Date.now() - videosCache.timestamp < videosCache.TTL) {
    return videosCache.data
  }

  try {
    // Get videos from uploads playlist
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&maxResults=${maxResults}&order=date&type=video&key=${YOUTUBE_API_KEY}`,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    )

    if (!videosResponse.ok) {
      throw new Error(`YouTube API error: ${videosResponse.status}`)
    }

    const videosData = await videosResponse.json()

    if (!videosData.items) {
      return []
    }

    const videos = videosData.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      source: 'youtube',
    }))

    // Update cache
    videosCache = {
      data: videos,
      timestamp: Date.now(),
      TTL: videosCache.TTL,
    }

    return videos
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    return []
  }
}

/**
 * Clear cache (useful for manual refreshes)
 */
export const clearYouTubeCache = () => {
  statsCache = { data: null, timestamp: null, TTL: statsCache.TTL }
  videosCache = { data: null, timestamp: null, TTL: videosCache.TTL }
}

