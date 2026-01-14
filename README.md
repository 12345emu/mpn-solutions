# MPN Firm Website

A professional management services website with PHP backend and React frontend, featuring an admin panel for managing contact form submissions.

## Features

- **Modern React Frontend**: Beautiful, responsive website showcasing MPN Firm's services
- **PHP Backend**: Secure API endpoints for contact form submissions
- **Admin Panel**: Complete dashboard for managing inquiries
- **No Email Required**: All contact submissions are stored in database and managed through admin panel
- **Secure Authentication**: Admin login system with session management

## Quick Start

### 1. Setup Database

Run the database setup script:
```
http://localhost/npm-firm/php/database_setup.php
```

Default admin credentials:
- Username: `admin`
- Password: `admin123`
- **⚠️ Change this immediately after first login!**

### 2. Install Dependencies

```bash
npm install
```

### 3. Development

```bash
npm run dev
```

The React app will run on `http://localhost:5173` and proxy API requests to PHP backend.

### 4. Access Admin Panel

Navigate to: `http://localhost/npm-firm/admin/login.php`

## Project Structure

```
npm-firm/
├── admin/              # Admin panel (PHP)
│   ├── login.php
│   └── dashboard.php
├── php/                # PHP backend
│   ├── config.php
│   ├── database_setup.php
│   └── api/            # API endpoints
├── src/                # React frontend
│   ├── App.jsx
│   └── App.css
└── dist/               # Production build
```

## Documentation

See [SETUP.md](SETUP.md) for detailed setup instructions and configuration.

## Technologies

- **Frontend**: React, Vite
- **Backend**: PHP, MySQL
- **Styling**: CSS3 with modern design

## License

© 2024 MPN Firm. All rights reserved.