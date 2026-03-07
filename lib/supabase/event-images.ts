import { createAdminClient } from './admin'

/**
 * Given a bucket folder path, lists all image files and returns their public URLs.
 * Cover images (cover.webp) are placed first.
 * This enables auto-discovery: uploading images to the bucket folder
 * automatically makes them appear on the website.
 */
export async function listBucketImages(
    bucketName: string,
    folderPath: string
): Promise<string[]> {
    const supabase = createAdminClient()

    const { data: files } = await supabase.storage
        .from(bucketName)
        .list(folderPath, { limit: 200, sortBy: { column: 'name', order: 'asc' } })

    if (!files || files.length === 0) return []

    const imageExtensions = /\.(webp|jpg|jpeg|png|gif)$/i
    const imageFiles = files.filter(
        f => f.metadata && imageExtensions.test(f.name)
    )

    // Put cover images first
    const sorted = imageFiles.sort((a, b) => {
        const aIsCover = a.name.toLowerCase().startsWith('cover')
        const bIsCover = b.name.toLowerCase().startsWith('cover')
        if (aIsCover && !bIsCover) return -1
        if (!aIsCover && bIsCover) return 1
        return a.name.localeCompare(b.name)
    })

    return sorted.map(f => {
        const { data } = supabase.storage
            .from(bucketName)
            .getPublicUrl(`${folderPath}/${f.name}`)
        return data.publicUrl
    })
}

/**
 * Extracts the bucket folder path from an event's first image URL.
 * E.g., ".../event-images/inaugration/cover.webp" -> "inaugration"
 */
export function extractFolderFromImageUrl(imageUrl: string): string | null {
    const match = imageUrl.match(/event-images\/([^/]+)\//)
    return match ? match[1] : null
}
