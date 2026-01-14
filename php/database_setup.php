<?php
// Database setup script - Run this once to create the database and tables

require_once 'config.php';

// Create connection without database
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS " . DB_NAME;
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully or already exists.<br>";
} else {
    echo "Error creating database: " . $conn->error . "<br>";
}

// Select database
$conn->select_db(DB_NAME);

// Create contact_submissions table
$sql = "CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    service VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'contacted', 'archived') DEFAULT 'new',
    progress VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_progress (progress),
    INDEX idx_service (service),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

if ($conn->query($sql) === TRUE) {
    echo "Table contact_submissions created successfully or already exists.<br>";
} else {
    echo "Error creating table: " . $conn->error . "<br>";
}

// Create admin_users table
$sql = "CREATE TABLE IF NOT EXISTS admin_users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

if ($conn->query($sql) === TRUE) {
    echo "Table admin_users created successfully or already exists.<br>";
} else {
    echo "Error creating table: " . $conn->error . "<br>";
}

// Create default admin user (username: admin, password: admin123)
// Change this password immediately after first login!
$defaultPassword = password_hash('admin123', PASSWORD_DEFAULT);
$sql = "INSERT INTO admin_users (username, password, email) 
        VALUES ('admin', ?, 'admin@mpnfirm.com')
        ON DUPLICATE KEY UPDATE username=username";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $defaultPassword);
if ($stmt->execute()) {
    echo "Default admin user created or already exists.<br>";
    echo "<strong>Default credentials:</strong><br>";
    echo "Username: <strong>admin</strong><br>";
    echo "Email: <strong>admin@mpnfirm.com</strong><br>";
    echo "Password: <strong>admin123</strong><br>";
    echo "<em>You can login with either username or email</em><br>";
    echo "<strong style='color: red;'>Please change this password after first login!</strong><br>";
} else {
    echo "Error creating admin user: " . $conn->error . "<br>";
}
$stmt->close();

$conn->close();

echo "<br><strong>Database setup completed!</strong><br>";
echo "<a href='../admin/login.php'>Go to Admin Login</a>";
?>
