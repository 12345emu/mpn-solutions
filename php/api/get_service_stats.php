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

// Get service request statistics
$sql = "SELECT service, COUNT(*) as count FROM contact_submissions GROUP BY service ORDER BY count DESC";
$result = $conn->query($sql);

$stats = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $stats[] = [
            'service' => $row['service'],
            'count' => (int)$row['count']
        ];
    }
}

echo json_encode([
    'success' => true,
    'data' => $stats
]);

$conn->close();
?>

