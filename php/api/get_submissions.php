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

// Get filter parameters
$status = isset($_GET['status']) ? $_GET['status'] : 'all';
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

// Build query
if ($status === 'all') {
    $sql = "SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT ? OFFSET ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $limit, $offset);
} else {
    $sql = "SELECT * FROM contact_submissions WHERE status = ? ORDER BY created_at DESC LIMIT ? OFFSET ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sii", $status, $limit, $offset);
}

$stmt->execute();
$result = $stmt->get_result();

$submissions = [];
while ($row = $result->fetch_assoc()) {
    $submissions[] = $row;
}

// Get total count
if ($status === 'all') {
    $countResult = $conn->query("SELECT COUNT(*) as total FROM contact_submissions");
} else {
    $countStmt = $conn->prepare("SELECT COUNT(*) as total FROM contact_submissions WHERE status = ?");
    $countStmt->bind_param("s", $status);
    $countStmt->execute();
    $countResult = $countStmt->get_result();
}

$total = $countResult->fetch_assoc()['total'];

echo json_encode([
    'success' => true,
    'data' => $submissions,
    'total' => (int)$total,
    'limit' => $limit,
    'offset' => $offset
]);

$stmt->close();
if (isset($countStmt)) {
    $countStmt->close();
}
$conn->close();
?>




