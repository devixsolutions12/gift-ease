import React, { useState } from 'react';
import axios from 'axios';

const TestPage = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testRegistration = async () => {
    setLoading(true);
    setResult('');
    
    try {
      const response = await axios.post('http://localhost:5003/api/users/register', {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        password: 'Test123'
      });
      
      setResult(`Success! Status: ${response.status}, Token: ${response.data.token.substring(0, 20)}...`);
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        setResult(`Error Response: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        setResult(`No response received: ${JSON.stringify(error.request)}`);
      } else {
        setResult(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>API Test Page</h1>
      <button onClick={testRegistration} disabled={loading}>
        {loading ? 'Testing...' : 'Test Registration API'}
      </button>
      {result && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default TestPage;