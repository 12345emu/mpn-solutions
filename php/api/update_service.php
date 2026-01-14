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
header('Access-Control-Allow-Methods: POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Service ID is required']);
    exit();
}

$id = (int)$input['id'];
$name = isset($input['name']) ? trim($input['name']) : null;
$slug = isset($input['slug']) ? trim($input['slug']) : null;
$description = isset($input['description']) ? trim($input['description']) : null;
$icon = isset($input['icon']) ? trim($input['icon']) : null;
$industry = isset($input['industry']) ? trim($input['industry']) : null;
$features = isset($input['features']) ? (is_array($input['features']) ? implode(',', $input['features']) : $input['features']) : null;
$is_active = isset($input['is_active']) ? (int)$input['is_active'] : null;
$display_order = isset($input['display_order']) ? (int)$input['display_order'] : null;

$conn = getDBConnection();

// Build update query dynamically
$updates = [];
$params = [];
$types = '';

if ($name !== null) {
    $updates[] = "name = ?";
    $params[] = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $types .= 's';
}

if ($slug !== null) {
    $slug = preg_replace('/[^a-z0-9-]/', '', strtolower($slug));
    // Check if slug already exists for another service
    $checkStmt = $conn->prepare("SELECT id FROM services WHERE slug = ? AND id != ?");
    $checkStmt->bind_param("si", $slug, $id);
    $checkStmt->execute();
    $result = $checkStmt->get_result();
    if ($result->num_rows > 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Service with this slug already exists']);
        $checkStmt->close();
        $conn->close();
        exit();
    }
    $checkStmt->close();
    
    $updates[] = "slug = ?";
    $params[] = $slug;
    $types .= 's';
}

if ($description !== null) {
    $updates[] = "description = ?";
    $params[] = htmlspecialchars($description, ENT_QUOTES, 'UTF-8');
    $types .= 's';
}

if ($icon !== null) {
    $updates[] = "icon = ?";
    $params[] = $icon;
    $types .= 's';
}

if ($industry !== null) {
    $updates[] = "industry = ?";
    $params[] = htmlspecialchars($industry, ENT_QUOTES, 'UTF-8');
    $types .= 's';
}

if ($features !== null) {
    $updates[] = "features = ?";
    $params[] = $features;
    $types .= 's';
}

if ($is_active !== null) {
    $updates[] = "is_active = ?";
    $params[] = $is_active;
    $types .= 'i';
}

if ($display_order !== null) {
    $updates[] = "display_order = ?";
    $params[] = $display_order;
    $types .= 'i';
}

if (empty($updates)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No fields to update']);
    $conn->close();
    exit();
}

$params[] = $id;
$types .= 'i';

$sql = "UPDATE services SET " . implode(', ', $updates) . " WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param($types, ...$params);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Service updated successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error updating service: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>

