/**
 * Transforma uma url de um vídeo do youtube em um url da thumbnail desse respesctivo vídeo
 * @param url { string } URL do video do youtube
 * @returns String | null
 */

export function getYouTubeThumbnail(url?: string): string | null {
    if (!url) return null
    const match = url.match(
        /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    )
    if (!match) return null
    const videoId = match[1]
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}