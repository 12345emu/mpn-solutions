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

if (!isset($_GET['service'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Service name is required']);
    exit();
}

$serviceName = trim($_GET['service']);
$conn = getDBConnection();

// Get submissions for this service
$sql = "SELECT * FROM contact_submissions WHERE service = ? ORDER BY created_at DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $serviceName);
$stmt->execute();
$result = $stmt->get_result();

$submissions = [];
while ($row = $result->fetch_assoc()) {
    $submissions[] = $row;
}

echo json_encode([
    'success' => true,
    'data' => $submissions,
    'service' => $serviceName,
    'count' => count($submissions)
]);

$stmt->close();
$conn->close();
?>

