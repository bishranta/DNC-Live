'use strict';

function extractYouTubeId(url) {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

async function fetchYouTubeMeta(url, videoId) {
  const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
  const res = await fetch(oEmbedUrl);
  if (!res.ok) throw new Error(`oEmbed request failed with status ${res.status}`);
  const data = await res.json();
  return {
    title: data.title,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  };
}

async function applyYouTubeMeta(data) {
  if (!data.youtubeUrl) return;

  const videoId = extractYouTubeId(data.youtubeUrl);
  if (!videoId) {
    console.warn('[SessionMedia] Could not extract YouTube video ID from:', data.youtubeUrl);
    return;
  }

  try {
    const meta = await fetchYouTubeMeta(data.youtubeUrl, videoId);
    data.youtubeVideoId = videoId;
    data.title = meta.title;
    data.thumbnailUrl = meta.thumbnailUrl;
    console.log('[SessionMedia] Fetched YouTube meta for:', videoId);
  } catch (err) {
    console.error('[SessionMedia] YouTube oEmbed fetch failed:', err.message);
  }
}

module.exports = {
  async beforeCreate(event) {
    await applyYouTubeMeta(event.params.data);
  },

  async beforeUpdate(event) {
    await applyYouTubeMeta(event.params.data);
  },
};
