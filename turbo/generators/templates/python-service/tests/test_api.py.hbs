from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()['status'] == 'OK'
    assert 'memory_usage' in response.json()
    assert 'cpu_usage' in response.json()