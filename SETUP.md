# MPN Firm Website - Setup Guide

This website has been converted to use PHP backend with an admin panel for managing contact form submissions.

## Prerequisites

- XAMPP (or similar PHP/MySQL environment)
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Node.js and npm (for React frontend)

## Setup Instructions

### 1. Database Setup

1. Start XAMPP and ensure MySQL is running
2. Open your browser and navigate to:
   ```
   http://localhost/npm-firm/php/database_setup.php
   ```
3. This will create the database `mpn_firm` and necessary tables
4. **Important**: Default admin credentials are:
   - Username: `admin`
   - Password: `admin123`
   - **Change this password immediately after first login!**

### 2. Database Configuration

If you need to change database settings, edit `php/config.php`:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'mpn_firm');
```

### 3. Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. For development, run:
   ```bash
   npm run dev
   ```

3. For production build:
   ```bash
   npm run build
   ```

### 4. Production Deployment

For production, you have two options:

#### Option A: Serve React build with PHP backend

1. Build the React app:
   ```bash
   npm run build
   ```

2. Copy the contents of the `dist` folder to your web root
3. Ensure PHP files are accessible
4. Update API paths in `src/App.jsx` if needed (currently uses `/php/api/`)

#### Option B: Use Vite dev server with PHP backend

1. Run `npm run dev` for the React frontend
2. Configure Vite proxy to forward API requests to PHP backend
3. Or use a tool like `vite-plugin-php` to integrate PHP

### 5. Admin Panel Access

1. Navigate to: `http://localhost/npm-firm/admin/login.php`
2. Login with default credentials (change immediately!)
3. Manage contact form submissions from the dashboard

## File Structure

```
npm-firm/
├── admin/              # Admin panel (PHP)
│   ├── login.php       # Admin login page
│   └── dashboard.php   # Admin dashboard
├── php/                # PHP backend
│   ├── config.php      # Database configuration
│   ├── database_setup.php  # Database setup script
│   └── api/            # API endpoints
│       ├── submit_contact.php
│       ├── login.php
│       ├── logout.php
│       ├── get_submissions.php
│       ├── update_submission.php
│       ├── delete_submission.php
│       └── check_auth.php
├── src/                # React frontend
│   ├── App.jsx         # Main React component
│   └── App.css         # Styles
└── dist/               # Built React app (after npm run build)
```

## Features

### Frontend
- ✅ Contact form submits to PHP backend (no email required)
- ✅ Email contact information removed
- ✅ Form validation and error handling
- ✅ Success/error messages

### Admin Panel
- ✅ Secure login system
- ✅ View all contact submissions
- ✅ Filter submissions by status (new, read, contacted, archived)
- ✅ Update submission status
- ✅ Delete submissions
- ✅ Statistics dashboard

## API Endpoints

- `POST /php/api/submit_contact.php` - Submit contact form
- `POST /php/api/login.php` - Admin login
- `POST /php/api/logout.php` - Admin logout
- `GET /php/api/get_submissions.php` - Get submissions (admin only)
- `POST /php/api/update_submission.php` - Update submission status (admin only)
- `POST /php/api/delete_submission.php` - Delete submission (admin only)
- `GET /php/api/check_auth.php` - Check authentication status

## Security Notes

1. **Change default admin password** immediately
2. Consider adding CSRF protection for production
3. Add rate limiting for contact form submissions
4. Use HTTPS in production
5. Regularly backup your database

## Troubleshooting

### API calls failing
- Check that PHP files are accessible
- Verify database connection in `php/config.php`
- Check browser console for CORS errors
- Ensure PHP session is working correctly

### Database connection errors
- Verify MySQL is running in XAMPP
- Check database credentials in `php/config.php`
- Run `database_setup.php` again if tables are missing

### Admin login not working
- Clear browser cookies/session
- Verify admin user exists in database
- Check PHP error logs

## Support

For issues or questions, check:
- PHP error logs in XAMPP
- Browser console for JavaScript errors
- Network tab for API request/response details




