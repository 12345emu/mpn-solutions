<?php
// Migration script to add progress field to contact_submissions table
// Run this once to update existing database

require_once 'config.php';

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Add progress column if it doesn't exist
$sql = "ALTER TABLE contact_submissions 
        ADD COLUMN progress VARCHAR(50) DEFAULT 'pending' AFTER status";

if ($conn->query($sql) === TRUE) {
    echo "Progress column added successfully!<br>";
} else {
    // Check if column already exists
    if (strpos($conn->error, 'Duplicate column name') !== false) {
        echo "Progress column already exists.<br>";
    } else {
        echo "Error adding progress column: " . $conn->error . "<br>";
    }
}

$conn->close();

echo "<br><strong>Migration completed!</strong><br>";
echo "<a href='../admin/login.php'>Go to Admin Login</a>";
?>

