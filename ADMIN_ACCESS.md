# Admin Access Instructions

## How to Access the Admin Panel

### Option 1: Direct URL
Open your browser and navigate to:
```
http://localhost/npm-firm/admin/login.php
```

Or if your project is in a different location:
```
http://localhost/[your-folder-name]/admin/login.php
```

### Option 2: From Website Footer
Scroll to the bottom of the main website and click the "Admin Login" link in the footer.

### Option 3: Admin Index
Navigate to:
```
http://localhost/npm-firm/admin/
```
This will automatically redirect you to the login page.

## Default Login Credentials

**⚠️ IMPORTANT: Change these immediately after first login!**

- **Username:** `admin`
- **Password:** `admin123`

## First Time Setup

1. **Setup Database First:**
   - Navigate to: `http://localhost/npm-firm/php/database_setup.php`
   - This creates the database and admin user

2. **Then Login:**
   - Go to: `http://localhost/npm-firm/admin/login.php`
   - Use the default credentials above
   - **Change your password immediately!**

## Troubleshooting

### "Page Not Found" Error
- Make sure XAMPP is running
- Check that your project folder is in `C:\xampp\htdocs\`
- Verify the folder name matches the URL path

### "Database Connection Failed"
- Make sure MySQL is running in XAMPP
- Run `database_setup.php` first to create the database
- Check `php/config.php` for correct database credentials

### "Invalid Credentials"
- Make sure you ran `database_setup.php` first
- Try the exact credentials: username `admin`, password `admin123`
- Check if the admin_users table exists in your database

## Admin Dashboard Features

Once logged in, you can:
- View all contact form submissions
- Filter submissions by status (new, read, contacted, archived)
- Update submission status
- Delete submissions
- View statistics

## Security Note

For production use:
1. Change the default admin password
2. Consider adding additional admin users
3. Use HTTPS
4. Regularly backup your database




