import pytest
from unittest.mock import patch, MagicMock
from python_health.health import health

@pytest.mark.asyncio
async def test_health():
    mock_vm = MagicMock()
    mock_vm._asdict.return_value = {'total': 1000, 'available': 500}
    mock_ct = MagicMock()
    mock_ct._asdict.return_value = {'user': 10, 'system': 20}
    with patch('psutil.virtual_memory', return_value=mock_vm), \
         patch('psutil.cpu_times', return_value=mock_ct):
        response = await health()
        assert response['status'] == 'OK'
        assert response['memory_usage'] == {'total': 1000, 'available': 500}
        assert response['cpu_usage'] == {'user': 10, 'system': 20}