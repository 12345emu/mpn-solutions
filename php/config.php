<?php
// Database configuration
// Update these values to match your XAMPP MySQL setup
define('DB_HOST', '82.197.82.41');
define('DB_USER', 'u575060245_npm_firm');
define('DB_PASS', 'GodsEyE@25'); // Default XAMPP MySQL password is empty
define('DB_NAME', 'u575060245_npm_firm'); // Change this to your database name

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Database connection function
function getDBConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    // Check connection
    if ($conn->connect_error) {
        // Log error but don't expose details to users
        error_log("Database connection failed: " . $conn->connect_error);
        http_response_code(500);
        die(json_encode(['success' => false, 'message' => 'Database connection error']));
    }
    
    // Set charset to utf8mb4 for proper character support
    $conn->set_charset("utf8mb4");
    
    return $conn;
}
?>

