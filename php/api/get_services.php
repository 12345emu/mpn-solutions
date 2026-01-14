<?php
require_once '../config.php';

// Check if admin is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

// Handle CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = getDBConnection();

// Get all services ordered by display_order
$sql = "SELECT * FROM services ORDER BY display_order ASC, created_at ASC";
$result = $conn->query($sql);

$services = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Parse features if stored as comma-separated string
        if (isset($row['features']) && is_string($row['features'])) {
            $row['features_array'] = explode(',', $row['features']);
        }
        $services[] = $row;
    }
}

echo json_encode([
    'success' => true,
    'data' => $services
]);

$conn->close();
?>

