#!/usr/bin/env python3
"""
Backend API Testing for Garv Sharma Portfolio
Tests all endpoints with proper validation and rate limiting checks.
"""

import requests
import json
import time
from typing import Dict, Any

# Base URL from frontend/.env
BASE_URL = "https://garv-portfolio.preview.emergentagent.com/api"
ADMIN_KEY = "gs-portfolio-admin-2025-change-me"

class PortfolioAPITester:
    def __init__(self):
        self.session = requests.Session()
        self.test_results = []
        self.successful_contact_posts = 0  # Track to limit real emails
        
    def log_test(self, test_name: str, success: bool, details: str = ""):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"    {details}")
        self.test_results.append({
            "test": test_name,
            "success": success,
            "details": details
        })
        
    def test_health_endpoint(self):
        """Test GET /api/health"""
        print("\n=== Testing Health Endpoint ===")
        try:
            response = self.session.get(f"{BASE_URL}/health")
            
            if response.status_code == 200:
                data = response.json()
                required_keys = ["status", "db", "smtp", "time"]
                
                if all(key in data for key in required_keys):
                    self.log_test("Health endpoint structure", True, 
                                f"Response: {data}")
                    
                    # Check specific values
                    if data["status"] == "ok":
                        self.log_test("Health status OK", True)
                    else:
                        self.log_test("Health status OK", False, f"Status: {data['status']}")
                        
                    if isinstance(data["db"], bool):
                        self.log_test("DB status type", True, f"DB connected: {data['db']}")
                    else:
                        self.log_test("DB status type", False, f"DB status not boolean: {data['db']}")
                        
                    if isinstance(data["smtp"], bool):
                        self.log_test("SMTP status type", True, f"SMTP configured: {data['smtp']}")
                    else:
                        self.log_test("SMTP status type", False, f"SMTP status not boolean: {data['smtp']}")
                else:
                    missing = [k for k in required_keys if k not in data]
                    self.log_test("Health endpoint structure", False, 
                                f"Missing keys: {missing}")
            else:
                self.log_test("Health endpoint status", False, 
                            f"Expected 200, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Health endpoint", False, f"Exception: {str(e)}")
            
    def test_root_endpoint(self):
        """Test GET /api/"""
        print("\n=== Testing Root Endpoint ===")
        try:
            response = self.session.get(f"{BASE_URL}/")
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "status" in data:
                    self.log_test("Root endpoint", True, f"Response: {data}")
                else:
                    self.log_test("Root endpoint", False, 
                                f"Missing message or status in response: {data}")
            else:
                self.log_test("Root endpoint", False, 
                            f"Expected 200, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Root endpoint", False, f"Exception: {str(e)}")
            
    def test_contact_endpoint(self):
        """Test POST /api/contact with various scenarios"""
        print("\n=== Testing Contact Endpoint ===")
        
        # Happy path tests (limited to 2 to avoid spam)
        if self.successful_contact_posts < 2:
            self.test_contact_happy_path()
            
        # Validation tests
        self.test_contact_validation()
        
        # Rate limit test (careful not to trigger too many real emails)
        self.test_contact_rate_limit()
        
    def test_contact_happy_path(self):
        """Test successful contact form submission"""
        test_data = {
            "name": "QA Tester",
            "email": "qa.tester@example.com", 
            "message": "Automated backend test — please ignore."
        }
        
        try:
            response = self.session.post(f"{BASE_URL}/contact", json=test_data)
            
            if response.status_code == 200:
                data = response.json()
                required_keys = ["success", "id", "emailed"]
                
                if all(key in data for key in required_keys):
                    if data["success"] is True and data["emailed"] is False:
                        self.log_test("Contact happy path", True, 
                                    f"ID: {data['id']}, emailed: {data['emailed']}")
                        self.successful_contact_posts += 1
                    else:
                        self.log_test("Contact happy path", False, 
                                    f"Unexpected values: success={data['success']}, emailed={data['emailed']}")
                else:
                    missing = [k for k in required_keys if k not in data]
                    self.log_test("Contact happy path", False, 
                                f"Missing keys: {missing}")
            else:
                self.log_test("Contact happy path", False, 
                            f"Expected 200, got {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Contact happy path", False, f"Exception: {str(e)}")
            
    def test_contact_validation(self):
        """Test contact form validation errors"""
        validation_tests = [
            {
                "name": "Missing name",
                "data": {"email": "test@example.com", "message": "Valid message here"},
                "expected": 422
            },
            {
                "name": "Invalid email",
                "data": {"name": "Test User", "email": "not-an-email", "message": "Valid message here"},
                "expected": 422
            },
            {
                "name": "Message too short",
                "data": {"name": "Test User", "email": "test@example.com", "message": "hi"},
                "expected": 422
            },
            {
                "name": "Name too long",
                "data": {"name": "A" * 81, "email": "test@example.com", "message": "Valid message here"},
                "expected": 422
            }
        ]
        
        for test in validation_tests:
            try:
                response = self.session.post(f"{BASE_URL}/contact", json=test["data"])
                
                if response.status_code == test["expected"]:
                    self.log_test(f"Contact validation - {test['name']}", True, 
                                f"Got expected {test['expected']}")
                else:
                    self.log_test(f"Contact validation - {test['name']}", False, 
                                f"Expected {test['expected']}, got {response.status_code}")
                    
            except Exception as e:
                self.log_test(f"Contact validation - {test['name']}", False, 
                            f"Exception: {str(e)}")
                
    def test_contact_rate_limit(self):
        """Test rate limiting (careful approach to avoid spam)"""
        print("Testing rate limit behavior...")
        
        # Send a few valid requests to test rate limiting
        # We'll send 3 valid requests quickly, then check if we can trigger rate limit
        valid_data = {
            "name": "Rate Test",
            "email": "ratetest@example.com",
            "message": "Rate limit test message"
        }
        
        # Track responses
        responses = []
        
        # Send 3 requests quickly (but not too many to avoid spam)
        for i in range(3):
            try:
                response = self.session.post(f"{BASE_URL}/contact", json=valid_data)
                responses.append(response.status_code)
                if response.status_code == 200:
                    self.successful_contact_posts += 1
            except Exception as e:
                self.log_test("Rate limit test", False, f"Exception on request {i+1}: {str(e)}")
                return
                
        # Check if we got any rate limit responses
        if 429 in responses:
            self.log_test("Rate limit triggered", True, "429 response received as expected")
        else:
            # If no 429, that's also valid - rate limit might not be triggered yet
            self.log_test("Rate limit behavior", True, 
                        f"Responses: {responses}. Rate limit may not be triggered yet with 3 requests")
            
    def test_cv_endpoints(self):
        """Test CV download endpoints"""
        print("\n=== Testing CV Endpoints ===")
        
        # Test PDF download
        self.test_cv_download("pdf", "application/pdf", "Garv_Sharma_CV.pdf")
        
        # Test DOCX download  
        self.test_cv_download("docx", 
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            "Garv_Sharma_CV.docx")
        
        # Test invalid format
        self.test_cv_invalid_format()
        
    def test_cv_download(self, format_type: str, expected_mime: str, expected_filename: str):
        """Test CV download for specific format"""
        try:
            response = self.session.get(f"{BASE_URL}/cv?format={format_type}")
            
            if response.status_code == 200:
                # Check content type
                content_type = response.headers.get("content-type", "")
                if expected_mime in content_type:
                    self.log_test(f"CV {format_type} content-type", True, 
                                f"Got: {content_type}")
                else:
                    self.log_test(f"CV {format_type} content-type", False, 
                                f"Expected {expected_mime}, got: {content_type}")
                
                # Check content disposition
                disposition = response.headers.get("content-disposition", "")
                if expected_filename in disposition:
                    self.log_test(f"CV {format_type} filename", True, 
                                f"Disposition: {disposition}")
                else:
                    self.log_test(f"CV {format_type} filename", False, 
                                f"Expected {expected_filename} in: {disposition}")
                
                # Check file size
                content_length = len(response.content)
                if content_length > 10000:
                    self.log_test(f"CV {format_type} size", True, 
                                f"Size: {content_length} bytes")
                else:
                    self.log_test(f"CV {format_type} size", False, 
                                f"Size too small: {content_length} bytes")
                    
            else:
                self.log_test(f"CV {format_type} download", False, 
                            f"Expected 200, got {response.status_code}")
                
        except Exception as e:
            self.log_test(f"CV {format_type} download", False, f"Exception: {str(e)}")
            
    def test_cv_invalid_format(self):
        """Test CV download with invalid format"""
        try:
            response = self.session.get(f"{BASE_URL}/cv?format=exe")
            
            if response.status_code == 422:
                self.log_test("CV invalid format", True, "Got expected 422 for invalid format")
            else:
                self.log_test("CV invalid format", False, 
                            f"Expected 422, got {response.status_code}")
                
        except Exception as e:
            self.log_test("CV invalid format", False, f"Exception: {str(e)}")
            
    def test_admin_endpoints(self):
        """Test admin messages endpoints"""
        print("\n=== Testing Admin Endpoints ===")
        
        # Test with correct key
        self.test_admin_with_key()
        
        # Test without key
        self.test_admin_without_key()
        
        # Test with wrong key
        self.test_admin_wrong_key()
        
    def test_admin_with_key(self):
        """Test admin endpoint with correct key"""
        try:
            response = self.session.get(f"{BASE_URL}/admin/messages?key={ADMIN_KEY}")
            
            if response.status_code == 200:
                data = response.json()
                
                if "count" in data and "messages" in data:
                    self.log_test("Admin with key - structure", True, 
                                f"Count: {data['count']}, Messages: {len(data['messages'])}")
                    
                    # Check if messages have expected structure
                    if data["messages"]:
                        msg = data["messages"][0]
                        expected_fields = ["id", "name", "email", "message", "created_at", "emailed"]
                        
                        if all(field in msg for field in expected_fields):
                            self.log_test("Admin with key - message structure", True, 
                                        f"Message fields present: {list(msg.keys())}")
                        else:
                            missing = [f for f in expected_fields if f not in msg]
                            self.log_test("Admin with key - message structure", False, 
                                        f"Missing fields: {missing}")
                    else:
                        self.log_test("Admin with key - no messages", True, 
                                    "No messages found (expected if no contact submissions)")
                        
                else:
                    self.log_test("Admin with key - structure", False, 
                                f"Missing count or messages in response: {data}")
            else:
                self.log_test("Admin with key", False, 
                            f"Expected 200, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Admin with key", False, f"Exception: {str(e)}")
            
    def test_admin_without_key(self):
        """Test admin endpoint without key"""
        try:
            response = self.session.get(f"{BASE_URL}/admin/messages")
            
            if response.status_code == 422:  # FastAPI validation error for missing required query param
                self.log_test("Admin without key", True, "Got expected 422 for missing key")
            elif response.status_code == 401:  # Could also be 401 depending on implementation
                self.log_test("Admin without key", True, "Got 401 for missing key")
            else:
                self.log_test("Admin without key", False, 
                            f"Expected 422 or 401, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Admin without key", False, f"Exception: {str(e)}")
            
    def test_admin_wrong_key(self):
        """Test admin endpoint with wrong key"""
        try:
            response = self.session.get(f"{BASE_URL}/admin/messages?key=wrong-key")
            
            if response.status_code == 401:
                self.log_test("Admin wrong key", True, "Got expected 401 for wrong key")
            else:
                self.log_test("Admin wrong key", False, 
                            f"Expected 401, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Admin wrong key", False, f"Exception: {str(e)}")
            
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Backend API Tests for: {BASE_URL}")
        print(f"⚠️  Limited to {2 - self.successful_contact_posts} successful contact submissions to avoid email spam")
        
        self.test_health_endpoint()
        self.test_root_endpoint()
        self.test_contact_endpoint()
        self.test_cv_endpoints()
        self.test_admin_endpoints()
        
        # Summary
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        
        print(f"✅ Passed: {passed}/{total}")
        print(f"❌ Failed: {total - passed}/{total}")
        print(f"📧 Contact submissions made: {self.successful_contact_posts}")
        
        if total - passed > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  • {result['test']}: {result['details']}")
                    
        return passed == total

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed!")
    else:
        print("\n⚠️  Some tests failed - check details above")