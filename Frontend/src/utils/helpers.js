/**
 * Helper helpers functions
 */

/**
 * Transforms a video URL into an embeddable URL
 * Supports:
 * - YouTube Standard: youtube.com/watch?v=ID
 * - YouTube Share: youtu.be/ID
 * - YouTube Embed: youtube.com/embed/ID
 * @param {string} url 
 * @returns {string} Embeddable URL or empty string
 */
export const getEmbedUrl = (url) => {
    if (!url) return '';

    // Handle standard YouTube URL (watch?v=ID)
    if (url.includes('watch?v=')) {
        return url.replace('watch?v=', 'embed/');
    }

    // Handle shared YouTube URL (youtu.be/ID)
    if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1].split('?')[0]; // Remove query params like ?t=...
        return `https://www.youtube.com/embed/${id}`;
    }

    // Handle standard Embed URL (already correct)
    if (url.includes('youtube.com/embed/')) {
        return url;
    }

    // Default: return original (in case it's Vimeo or other supported iframe)
    return url;
};
