// Simple test to verify backend is working
const fetch = require('node-fetch');

const API_BASE = 'http://localhost:5000';

// Test data
const testUser = {
    fullName: "Test User",
    aadharNumber: "123456789012",
    password: "password123",
    age: 25,
    address: "Test Address",
    role: "user"
};

async function testBackend() {
    try {
        console.log('Testing backend API...');
        
        // Test 1: Try to signup
        console.log('\n1. Testing signup...');
        const signupResponse = await fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testUser)
        });
        
        const signupData = await signupResponse.json();
        console.log('Signup response:', signupData);
        
        if (signupResponse.ok) {
            console.log('✅ Signup successful');
            
            // Test 2: Try to login
            console.log('\n2. Testing login...');
            const loginResponse = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    aadharNumber: testUser.aadharNumber,
                    password: testUser.password
                })
            });
            
            const loginData = await loginResponse.json();
            console.log('Login response:', loginData);
            
            if (loginResponse.ok) {
                console.log('✅ Login successful');
                
                // Test 3: Get profile
                console.log('\n3. Testing profile...');
                const profileResponse = await fetch(`${API_BASE}/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${loginData.token}`
                    }
                });
                
                const profileData = await profileResponse.json();
                console.log('Profile response:', profileData);
                
                if (profileResponse.ok) {
                    console.log('✅ Profile fetch successful');
                } else {
                    console.log('❌ Profile fetch failed');
                }
            } else {
                console.log('❌ Login failed');
            }
        } else {
            console.log('❌ Signup failed');
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('Make sure the backend server is running on port 5000');
    }
}

testBackend();
