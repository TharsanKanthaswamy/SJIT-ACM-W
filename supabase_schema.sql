-- ============================================================
-- ACM-W SJIT — Complete Supabase Schema
-- Run this in the Supabase SQL Editor to set up all tables,
-- storage buckets, RLS policies, and indexes.
-- ============================================================

-- ========================================
-- TABLE 1: team_members
-- ========================================

CREATE TABLE IF NOT EXISTS public."teamMembers" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    category VARCHAR(50) DEFAULT 'student' CHECK (category IN ('faculty', 'student')),
    "imageUrl" TEXT,
    "orderPosition" INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public."teamMembers" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view team members"
ON public."teamMembers" FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can manage team members"
ON public."teamMembers" FOR ALL TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS team_members_order_idx ON public."teamMembers" ("orderPosition" ASC NULLS LAST);

-- ========================================
-- TABLE 2: events
-- ========================================

CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    "eventDate" TIMESTAMP WITH TIME ZONE NOT NULL,
    "shortDescription" TEXT,
    "fullSummary" TEXT,
    images TEXT[] DEFAULT array[]::TEXT[],
    published BOOLEAN DEFAULT false,
    "registrationOpen" BOOLEAN DEFAULT false,
    "registrationDate" TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published events"
ON public.events FOR SELECT TO public USING (published = true);

CREATE POLICY "Authenticated users can manage events"
ON public.events FOR ALL TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS events_date_idx ON public.events ("eventDate" DESC);
CREATE INDEX IF NOT EXISTS events_published_idx ON public.events (published);

-- ========================================
-- TABLE 3: updates
-- ========================================

CREATE TABLE IF NOT EXISTS public.updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    "imageUrl" TEXT,
    published BOOLEAN DEFAULT false,
    date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published updates"
ON public.updates FOR SELECT TO public USING (published = true);

CREATE POLICY "Authenticated users can manage updates"
ON public.updates FOR ALL TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS updates_date_idx ON public.updates (date DESC);
CREATE INDEX IF NOT EXISTS updates_published_idx ON public.updates (published);

-- ========================================
-- TABLE 4: contact_messages
-- ========================================

CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (submit contact form)
CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages FOR INSERT TO public
WITH CHECK (true);

-- Only authenticated users can read messages
CREATE POLICY "Authenticated users can view contact messages"
ON public.contact_messages FOR SELECT TO authenticated
USING (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS contact_messages_date_idx ON public.contact_messages (created_at DESC);

-- ========================================
-- STORAGE BUCKET 1: team-images
-- ========================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'team-images', 'team-images', true, 5242880,
  '{"image/jpeg","image/png","image/webp"}'::text[]
) ON CONFLICT (id) DO UPDATE SET
  public = true, file_size_limit = 5242880,
  allowed_mime_types = '{"image/jpeg","image/png","image/webp"}'::text[];

CREATE POLICY "Public can view team images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'team-images');

CREATE POLICY "Authenticated can manage team images"
ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'team-images' AND auth.role() = 'authenticated')
WITH CHECK (bucket_id = 'team-images' AND auth.role() = 'authenticated');

-- ========================================
-- STORAGE BUCKET 2: event-images
-- ========================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'event-images', 'event-images', true, 5242880,
  '{"image/jpeg","image/png","image/webp"}'::text[]
) ON CONFLICT (id) DO UPDATE SET
  public = true, file_size_limit = 5242880,
  allowed_mime_types = '{"image/jpeg","image/png","image/webp"}'::text[];

CREATE POLICY "Public can view event images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'event-images');

CREATE POLICY "Authenticated can manage event images"
ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'event-images' AND auth.role() = 'authenticated')
WITH CHECK (bucket_id = 'event-images' AND auth.role() = 'authenticated');

-- ========================================
-- STORAGE BUCKET 3: updates-images
-- ========================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'updates-images', 'updates-images', true, 5242880,
  '{"image/jpeg","image/png","image/webp"}'::text[]
) ON CONFLICT (id) DO UPDATE SET
  public = true, file_size_limit = 5242880,
  allowed_mime_types = '{"image/jpeg","image/png","image/webp"}'::text[];

CREATE POLICY "Public can view update images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'updates-images');

CREATE POLICY "Authenticated can manage update images"
ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'updates-images' AND auth.role() = 'authenticated')
WITH CHECK (bucket_id = 'updates-images' AND auth.role() = 'authenticated');
