-- ========================================
-- PART 1 — CREATE TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    images TEXT[] DEFAULT array[]::TEXT[],
    tags TEXT[] DEFAULT array[]::TEXT[],
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================
-- PART 2 — ENABLE RLS
-- ========================================

ALTER TABLE public.updates ENABLE ROW LEVEL SECURITY;

-- ========================================
-- PART 3 — POLICIES
-- ========================================

-- 1) Public users: Can SELECT only where published = true
CREATE POLICY "Public users can view published updates"
ON public.updates
FOR SELECT
TO public
USING (published = true);

-- 2) Authenticated users: Can INSERT
CREATE POLICY "Authenticated users can insert updates"
ON public.updates
FOR INSERT
TO authenticated
WITH CHECK (auth.role() = 'authenticated');

-- 2) Authenticated users: Can UPDATE
CREATE POLICY "Authenticated users can update updates"
ON public.updates
FOR UPDATE
TO authenticated
USING (auth.role() = 'authenticated');

-- 2) Authenticated users: Can DELETE
CREATE POLICY "Authenticated users can delete updates"
ON public.updates
FOR DELETE
TO authenticated
USING (auth.role() = 'authenticated');

-- ========================================
-- PART 4 — STORAGE
-- ========================================

-- Create the updates-images bucket (Public, 5MB max, specific extensions)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'updates-images',
  'updates-images',
  true,
  5242880, -- 5MB limit
  '{"image/jpeg","image/png","image/webp"}'::text[]
)
ON CONFLICT (id) DO UPDATE SET 
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = '{"image/jpeg","image/png","image/webp"}'::text[];

-- Allow public read access to images
CREATE POLICY "Public can view update images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'updates-images');

-- Allow authenticated users to upload/update/delete images
CREATE POLICY "Authenticated users can manage update images"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'updates-images' AND auth.role() = 'authenticated')
WITH CHECK (bucket_id = 'updates-images' AND auth.role() = 'authenticated');

-- ========================================
-- PART 5 — PERFORMANCE
-- ========================================

-- Index on created_at (descending)
CREATE INDEX IF NOT EXISTS updates_created_at_idx ON public.updates (created_at DESC);

-- Index on published
CREATE INDEX IF NOT EXISTS updates_published_idx ON public.updates (published);
