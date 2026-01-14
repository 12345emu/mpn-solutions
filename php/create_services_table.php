<?php
// Migration script to create services table
// Run this once to create the services management table

require_once 'config.php';

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create services table
$sql = "CREATE TABLE IF NOT EXISTS services (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50) DEFAULT '📋',
    industry VARCHAR(255),
    features TEXT,
    is_active TINYINT(1) DEFAULT 1,
    display_order INT(11) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_is_active (is_active),
    INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

if ($conn->query($sql) === TRUE) {
    echo "Table services created successfully or already exists.<br>";
} else {
    echo "Error creating table: " . $conn->error . "<br>";
}

// Insert default services if table is empty
$checkResult = $conn->query("SELECT COUNT(*) as count FROM services");
$count = $checkResult->fetch_assoc()['count'];

if ($count == 0) {
    $defaultServices = [
        ['Business Manager', 'business-manager', 'For actors, musicians, designers, influencers, and freelancers. We handle contracts, invoices, negotiations, and ensure you get paid on time.', '🎭', 'Entertainment • Influencers • Creative Arts', 'Contract Management,Invoice Processing,Payment Collection,Client Negotiations', 1, 1],
        ['Commercial Manager', 'commercial-manager', 'Revenue partnership for contractors and service providers. We manage your contracts and ensure timely payments from clients.', '🔧', 'Contractors • Tradespeople • Service Agencies', 'Contract Administration,Payment Assurance,Client Relationship Management,Revenue Optimization', 1, 2],
        ['Contract Administrator', 'contract-administrator', 'Expert handling of paperwork, terms, and contract details. We ensure your agreements are clear, fair, and protect your interests.', '📋', 'All Industries', 'Contract Review & Drafting,Terms Negotiation,Legal Compliance,Document Management', 1, 3],
        ['Booking Agent / Representative', 'booking-agent', 'Professional representation to your clients and buyers. We act as your trusted intermediary, handling communications and securing opportunities.', '🤝', 'All Industries', 'Client Representation,Opportunity Sourcing,Professional Mediation,Business Development', 1, 4],
        ['Property Management', 'property-management', 'Comprehensive management for property owners. We handle everything from tenant relations to maintenance, ensuring your properties generate sustainable returns.', '🏢', 'Commercial • Residential Properties', 'Tenant Management,Maintenance Coordination,Financial Reporting,Property Optimization', 1, 5],
        ['Business Management', 'business-management', 'End-to-end management for growing businesses. From operations to growth strategy, we help you scale sustainably.', '🚀', 'Startups • SMEs • Entrepreneurs', 'Operations Management,Growth Strategy,Financial Planning,Scalability Consulting', 1, 6]
    ];

    $stmt = $conn->prepare("INSERT INTO services (name, slug, description, icon, industry, features, is_active, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    
    foreach ($defaultServices as $service) {
        $stmt->bind_param("ssssssii", $service[0], $service[1], $service[2], $service[3], $service[4], $service[5], $service[6], $service[7]);
        if ($stmt->execute()) {
            echo "Inserted service: {$service[0]}<br>";
        } else {
            echo "Error inserting service {$service[0]}: " . $stmt->error . "<br>";
        }
    }
    $stmt->close();
}

$conn->close();

echo "<br><strong>Services table setup completed!</strong><br>";
echo "<a href='../admin/login.php'>Go to Admin Login</a>";
?>

