# How to Run Database Setup

## Quick Steps:

1. **Make sure XAMPP is running:**
   - Open XAMPP Control Panel
   - Ensure **Apache** is running (green)
   - Ensure **MySQL** is running (green)

2. **Open your browser and go to:**
   ```
   http://localhost/New%20folder/npm-firm/php/database_setup.php
   ```
   
   Or if your project is directly in htdocs:
   ```
   http://localhost/npm-firm/php/database_setup.php
   ```

3. **You should see:**
   - "Database created successfully or already exists."
   - "Table contact_submissions created successfully or already exists."
   - "Table admin_users created successfully or already exists."
   - "Default admin user created or already exists."
   - Default credentials displayed

4. **Default Admin Credentials:**
   - Username: `admin`
   - Password: `admin123`
   - **⚠️ Change this immediately after first login!**

5. **After setup is complete:**
   - Click the link to go to Admin Login
   - Or go to: `http://localhost/New%20folder/npm-firm/admin/login.php`

## Troubleshooting:

- **If you see PHP code:** You're not accessing via http://localhost - see TROUBLESHOOTING.md
- **If you see "Connection failed":** Make sure MySQL is running in XAMPP
- **If tables already exist:** That's fine, the script will skip creating them




