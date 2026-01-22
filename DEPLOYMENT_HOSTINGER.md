# Hostinger Deployment Guide

## Fixing "Page Not Found" on Refresh

When you refresh pages like `/services` or `/about` on Hostinger, you get a 404 error because the server tries to find a file at that path. This is fixed by the `.htaccess` file.

## Steps to Deploy

### 1. Build the Application
```bash
npm run build
```

### 2. Upload Files to Hostinger
Upload the contents of the `dist` folder to your Hostinger hosting:
- If your site is at the root: Upload to `public_html/`
- If your site is in a subdirectory: Upload to `public_html/your-folder/`

### 3. Upload PHP Files
Upload the `php` folder to the same location as your `dist` files.

### 4. Upload .htaccess File
Make sure the `.htaccess` file is in the root of your deployed files (same location as `index.html`).

### 5. If Your Site is in a Subdirectory

If your React app is hosted in a subdirectory (e.g., `yoursite.com/myapp/`), you need to:

#### Option A: Update vite.config.js
```javascript
export default defineConfig({
  base: '/myapp/', // Change this to your subdirectory
  // ... rest of config
})
```

Then rebuild:
```bash
npm run build
```

#### Option B: Update React Router
In `src/AppRouter.jsx`, add a `basename` prop:
```jsx
<BrowserRouter basename="/myapp">
  {/* ... routes ... */}
</BrowserRouter>
```

### 6. Verify .htaccess is Working

The `.htaccess` file should:
- Redirect all routes to `index.html` (except existing files)
- Allow PHP API calls to work
- Allow admin routes to work

### 7. Test After Deployment

1. Visit your homepage
2. Navigate to `/services` - should work
3. Refresh the `/services` page - should NOT show 404
4. Navigate to `/about` - should work
5. Refresh the `/about` page - should NOT show 404
6. Test `/contact` the same way
7. Test admin routes `/admin/login` and `/admin/dashboard`

## Troubleshooting

### Still Getting 404 on Refresh?

1. **Check if mod_rewrite is enabled on Hostinger**
   - Contact Hostinger support to enable `mod_rewrite` if it's not enabled

2. **Check .htaccess file location**
   - Make sure `.htaccess` is in the same directory as `index.html`
   - Check file permissions (should be 644)

3. **Check for conflicting .htaccess files**
   - Make sure there's no conflicting `.htaccess` in parent directories

4. **Check Hostinger file manager**
   - Some hosting panels hide `.htaccess` files
   - Make sure it's actually uploaded

5. **Test with a simple rewrite rule**
   - Try accessing a non-existent file - it should redirect to index.html

### If Using a Subdirectory

If your app is in a subdirectory like `yoursite.com/npm-firm/`:

1. Update `vite.config.js` with `base: '/npm-firm/'`
2. Rebuild: `npm run build`
3. Update `.htaccess` RewriteBase if needed
4. Update API paths in `src/config.js` if needed

## Current .htaccess Configuration

The `.htaccess` file now includes:
- React Router rewrite rules (redirects all routes to index.html)
- Security headers
- File protection rules
- PHP file handling

This should work for most Hostinger configurations.

