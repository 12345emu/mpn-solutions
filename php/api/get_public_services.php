<?php
require_once '../config.php';

// Handle CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = getDBConnection();

// Get only active services ordered by display_order
$sql = "SELECT id, name, slug, description, icon, industry, features, display_order FROM services WHERE is_active = 1 ORDER BY display_order ASC, name ASC";
$result = $conn->query($sql);

$services = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Parse features if stored as comma-separated string
        if (isset($row['features']) && is_string($row['features'])) {
            $row['features'] = $row['features'];
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

