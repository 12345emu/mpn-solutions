<?php
require_once '../config.php';

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

// Validate input
if (!isset($input['name']) || !isset($input['email']) || !isset($input['phone']) || !isset($input['service']) || !isset($input['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

$name = trim($input['name']);
$email = trim($input['email']);
$phone = trim($input['phone']);
$service = trim($input['service']);
$message = trim($input['message']);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

// Sanitize inputs
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$service = htmlspecialchars($service, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Map service values to readable names
$serviceNames = [
    'business-manager' => 'Business Manager',
    'commercial-manager' => 'Commercial Manager',
    'contract-administrator' => 'Contract Administrator',
    'booking-agent' => 'Booking Agent / Representative',
    'property-management' => 'Property Management',
    'business-management' => 'Business Management'
];

$serviceDisplay = isset($serviceNames[$service]) ? $serviceNames[$service] : $service;

// Insert into database
$conn = getDBConnection();
$stmt = $conn->prepare("INSERT INTO contact_submissions (name, email, phone, service, message, status) VALUES (?, ?, ?, ?, ?, 'new')");
$stmt->bind_param("sssss", $name, $email, $phone, $serviceDisplay, $message);

if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your inquiry! We will get back to you soon.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error submitting form. Please try again later.'
    ]);
}

$stmt->close();
$conn->close();
?>


