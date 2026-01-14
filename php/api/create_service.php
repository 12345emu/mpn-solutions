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
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($input['name']) || !isset($input['slug'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name and slug are required']);
    exit();
}

$name = trim($input['name']);
$slug = trim($input['slug']);
$description = isset($input['description']) ? trim($input['description']) : '';
$icon = isset($input['icon']) ? trim($input['icon']) : '📋';
$industry = isset($input['industry']) ? trim($input['industry']) : '';
$features = isset($input['features']) ? (is_array($input['features']) ? implode(',', $input['features']) : $input['features']) : '';
$is_active = isset($input['is_active']) ? (int)$input['is_active'] : 1;
$display_order = isset($input['display_order']) ? (int)$input['display_order'] : 0;

// Sanitize inputs
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$slug = preg_replace('/[^a-z0-9-]/', '', strtolower($slug));
$description = htmlspecialchars($description, ENT_QUOTES, 'UTF-8');
$industry = htmlspecialchars($industry, ENT_QUOTES, 'UTF-8');

$conn = getDBConnection();

// Check if slug already exists
$checkStmt = $conn->prepare("SELECT id FROM services WHERE slug = ?");
$checkStmt->bind_param("s", $slug);
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

// Insert service
$stmt = $conn->prepare("INSERT INTO services (name, slug, description, icon, industry, features, is_active, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssii", $name, $slug, $description, $icon, $industry, $features, $is_active, $display_order);

if ($stmt->execute()) {
    $serviceId = $conn->insert_id;
    echo json_encode([
        'success' => true,
        'message' => 'Service created successfully',
        'data' => [
            'id' => $serviceId,
            'name' => $name,
            'slug' => $slug
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error creating service: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>

