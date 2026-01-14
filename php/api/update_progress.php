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

if (!isset($input['id']) || !isset($input['progress'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Submission ID and progress are required']);
    exit();
}

$id = (int)$input['id'];
$progress = trim($input['progress']);

// Validate progress value
$validProgress = ['pending', 'initial-contact', 'consultation', 'proposal', 'negotiation', 'contract-signed', 'in-progress', 'completed', 'on-hold', 'cancelled'];
if (!in_array($progress, $validProgress)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid progress value']);
    exit();
}

$conn = getDBConnection();

// Update progress
$stmt = $conn->prepare("UPDATE contact_submissions SET progress = ? WHERE id = ?");
$stmt->bind_param("si", $progress, $id);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Progress updated successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error updating progress: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>

