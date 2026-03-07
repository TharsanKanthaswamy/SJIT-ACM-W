# How to Update the HOD Photo properly

When you uploaded the new `HOD.webp` file to your Supabase `assets` bucket, the image didn't update on the live website immediately. 

Here is why this happened, and how to fix it easily without writing any tough code next time.

## Why it didn't update automatically
The issue is **Aggressive Image Caching**.
1. **Supabase’s CDN** caches public object URLs globally so your website loads faster.
2. **Next.js** (the framework your site uses) specifically caches images heavily using the `<Image />` component to optimize performance and save bandwidth.

When you delete a file in Supabase and upload a new one with the **exact same name** (`HOD.webp`), the URL remains entirely identical. Because the URL hasn't changed, Next.js and the CDN assume it's the exact same image and just serve the old, cached version instead of checking the database again.

## The Fix: Cache Busting
The easiest way to force the browser, the CDN, and Next.js to fetch the *newest* image is by slightly altering the URL so the caching layers think it's a brand new file.

We do this by appending a completely harmless query string to the end of the URL, such as `?v=1` or `?version=2`.

### How you can do it yourself in the future:
If you need to update the HOD photo again, instead of calling me, follow these simple steps:

1. Upload the new photo to the Supabase `assets` folder as `HOD.webp` (exactly like you did today).
2. Open `components/TeamHeroSlideshow.tsx` in your code editor.
3. Scroll to the top and find where the `HOD_SLIDE` is defined (around line 18-24).
4. Look at the `image_url` property. It will look something like this:
   ```typescript
   image_url: 'https://kburhhdhrzmnbfrutqnu.supabase.co/storage/v1/object/public/assets/HOD.webp?v=1',
   ```
5. Simply **change the number** at the end. Change `?v=1` to `?v=2` (or whatever number comes next).
   ```typescript
   image_url: 'https://kburhhdhrzmnbfrutqnu.supabase.co/storage/v1/object/public/assets/HOD.webp?v=2',
   ```
6. Save the file.

The moment you save, Next.js will instantly recognize the new "v=2" URL, flush the cache, and pull the brand new picture from Supabase. 

That's it!
