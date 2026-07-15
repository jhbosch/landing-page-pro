import { createClient } from "./client"

export async function uploadImage(
  file: File,
  bucket = "images",
): Promise<string | null> {
  const supabase = createClient()

  // Generate a unique file path
  const ext = file.name.split(".").pop() ?? "png"
  const filePath = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) {
    console.error("Error uploading image:", error.message)
    return null
  }

  // Get the public URL
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return urlData.publicUrl
}
