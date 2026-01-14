# PHP Code Showing - Troubleshooting Guide

## Problem: You're seeing PHP code instead of the rendered page

This means PHP is **NOT executing**. Here's how to fix it:

## ✅ Solution 1: Access via HTTP (Most Common Issue)

**WRONG WAY (This shows PHP code):**
- Opening file directly: `file:///C:/xampp1/htdocs/New folder/npm-firm/admin/login.php`
- Double-clicking the file in Windows Explorer

**CORRECT WAY (This executes PHP):**
- Open your browser
- Type in address bar: `http://localhost/New%20folder/npm-firm/admin/login.php`
- Or try: `http://localhost/npm-firm/admin/login.php` (if directly in htdocs)

## ✅ Solution 2: Check XAMPP is Running

1. Open **XAMPP Control Panel**
2. Make sure **Apache** shows "Running" (green)
3. If it says "Stopped", click the **Start** button
4. Wait for it to turn green

## ✅ Solution 3: Test PHP is Working

1. Go to: `http://localhost/New%20folder/npm-firm/admin/test.php`
2. You should see "PHP is working!" and PHP information
3. If you see PHP code, Apache/PHP is not configured correctly

## ✅ Solution 4: Check Your URL

Your folder is "New folder" (with a space), so the URL must be:
- `http://localhost/New%20folder/npm-firm/admin/login.php`

Or if npm-firm is directly in htdocs:
- `http://localhost/npm-firm/admin/login.php`

## ✅ Solution 5: Verify File Location

Make sure your files are in:
```
C:\xampp1\htdocs\New folder\npm-firm\admin\login.php
```

## Quick Test Steps:

1. **Open XAMPP Control Panel**
2. **Start Apache** (if not running)
3. **Open browser**
4. **Type:** `http://localhost/New%20folder/npm-firm/admin/test.php`
5. **If you see PHP code:** Apache is not running or PHP is not installed
6. **If you see "PHP is working!":** PHP is working, now try login.php

## Still Not Working?

1. Check XAMPP error logs: `C:\xampp1\apache\logs\error.log`
2. Try accessing: `http://localhost/` - you should see XAMPP dashboard
3. If XAMPP dashboard doesn't load, Apache is not running properly
4. Restart XAMPP completely
5. Check if port 80 is being used by another program


