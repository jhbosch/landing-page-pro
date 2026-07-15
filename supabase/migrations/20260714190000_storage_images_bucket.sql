-- ============================================================
-- CREATE STORAGE BUCKET FOR IMAGES
-- Bucket: images (public)
-- ============================================================

-- Create the storage bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'images',
  'images',
  true,
  10485760, -- 10MB in bytes
  '{"image/png", "image/jpeg", "image/webp"}'
);

-- Allow authenticated users to upload files
create policy "Authenticated users can upload images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'images'
);

-- Allow authenticated users to update their files
create policy "Authenticated users can update images"
on storage.objects
for update
to authenticated
using (bucket_id = 'images');

-- Allow authenticated users to delete files
create policy "Authenticated users can delete images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'images');

-- Allow public read access to images (needed for display)
create policy "Public can view images"
on storage.objects
for select
to public
using (bucket_id = 'images');
