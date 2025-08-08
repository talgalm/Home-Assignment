import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ApiService, HTTPMethod } from './apiService';



describe('ApiService', () => {
  let mockXHR: any;

  beforeEach(() => {
    // Mock XMLHttpRequest
    mockXHR = {
      open: vi.fn(),
      setRequestHeader: vi.fn(),
      send: vi.fn(),
      onload: null,
      onerror: null,
      status: 200,
      responseText: '{"data": "test"}',
    };

    global.XMLHttpRequest = vi.fn(() => mockXHR) as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('GET requests', () => {
    it('makes a successful GET request', async () => {
      const promise = ApiService.makeRequest('/test', HTTPMethod.GET);

      // Simulate successful response
      mockXHR.onload();

      const result = await promise;
      expect(result).toEqual({ data: 'test' });
      expect(mockXHR.open).toHaveBeenCalledWith('GET', 'http://localhost:3001/api/test', true);
      expect(mockXHR.send).toHaveBeenCalled();
    });

    it('makes a GET request with query parameters', async () => {
      const data = { page: 1, limit: 10 };
      const promise = ApiService.makeRequest('/test', HTTPMethod.GET, data);

      mockXHR.onload();

      await promise;
      expect(mockXHR.open).toHaveBeenCalledWith('GET', 'http://localhost:3001/api/test?page=1&limit=10', true);
    });

    it('handles GET request with empty data', async () => {
      const promise = ApiService.makeRequest('/test', HTTPMethod.GET, {});

      mockXHR.onload();

      await promise;
      expect(mockXHR.open).toHaveBeenCalledWith('GET', 'http://localhost:3001/api/test?', true);
    });
  });

  describe('POST requests', () => {
    it('makes a successful POST request', async () => {
      const data = { name: 'test', value: 123 };
      const promise = ApiService.makeRequest('/test', HTTPMethod.POST, data);

      mockXHR.onload();

      await promise;
      expect(mockXHR.open).toHaveBeenCalledWith('POST', 'http://localhost:3001/api/test', true);
      expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
      expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(data));
    });

    it('handles POST request with FormData', async () => {
      const formData = new FormData();
      formData.append('file', new Blob(['test']));
      
      const promise = ApiService.makeRequest('/upload', HTTPMethod.POST, formData, true);

      mockXHR.onload();

      await promise;
      expect(mockXHR.open).toHaveBeenCalledWith('POST', 'http://localhost:3001/api/upload', true);
      expect(mockXHR.send).toHaveBeenCalledWith(formData);
    });
  });

  describe('PUT requests', () => {
    it('makes a successful PUT request', async () => {
      const data = { id: 1, name: 'updated' };
      const promise = ApiService.makeRequest('/test/1', HTTPMethod.PUT, data);

      mockXHR.onload();

      await promise;
      expect(mockXHR.open).toHaveBeenCalledWith('PUT', 'http://localhost:3001/api/test/1', true);
      expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(data));
    });
  });

  describe('DELETE requests', () => {
    it('makes a successful DELETE request', async () => {
      const promise = ApiService.makeRequest('/test/1', HTTPMethod.DELETE);

      mockXHR.onload();

      await promise;
      expect(mockXHR.open).toHaveBeenCalledWith('DELETE', 'http://localhost:3001/api/test/1', true);
      expect(mockXHR.send).toHaveBeenCalled();
    });
  });

  describe('Error handling', () => {
    it('handles HTTP error responses', async () => {
      mockXHR.status = 404;
      mockXHR.responseText = 'Not Found';

      const promise = ApiService.makeRequest('/test', HTTPMethod.GET);

      mockXHR.onload();

      await expect(promise).rejects.toThrow('HTTP error: 404');
    });

    it('handles network errors', async () => {
      const promise = ApiService.makeRequest('/test', HTTPMethod.GET);

      mockXHR.onerror();

      await expect(promise).rejects.toThrow('Network error');
    });

    it('handles invalid JSON response', async () => {
      mockXHR.responseText = 'invalid json';

      const promise = ApiService.makeRequest('/test', HTTPMethod.GET);

      mockXHR.onload();

      const result = await promise;
      expect(result).toBe('invalid json');
    });

    it('handles empty response', async () => {
      mockXHR.responseText = '';

      const promise = ApiService.makeRequest('/test', HTTPMethod.GET);

      mockXHR.onload();

      const result = await promise;
      expect(result).toBe('');
    });
  });

  describe('Headers', () => {
    it('sets custom headers', async () => {
      const headers = { 'Authorization': 'Bearer token', 'Custom-Header': 'value' };
      const promise = ApiService.makeRequest('/test', HTTPMethod.GET, undefined, false, headers);

      mockXHR.onload();

      await promise;
      expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Authorization', 'Bearer token');
      expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Custom-Header', 'value');
    });

    it('sets Content-Type header for non-FormData requests', async () => {
      const promise = ApiService.makeRequest('/test', HTTPMethod.POST, { data: 'test' });

      mockXHR.onload();

      await promise;
      expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    });

    it('does not set Content-Type header for FormData requests', async () => {
      const formData = new FormData();
      const promise = ApiService.makeRequest('/test', HTTPMethod.POST, formData, true);

      mockXHR.onload();

      await promise;
      expect(mockXHR.setRequestHeader).not.toHaveBeenCalledWith('Content-Type', 'application/json');
    });
  });

  describe('URL construction', () => {
    it('constructs URL correctly for GET requests with data', async () => {
      const data = { search: 'test', page: 1 };
      const promise = ApiService.makeRequest('/movies', HTTPMethod.GET, data);

      mockXHR.onload();

      await promise;
      expect(mockXHR.open).toHaveBeenCalledWith('GET', 'http://localhost:3001/api/movies?search=test&page=1', true);
    });

    it('handles special characters in query parameters', async () => {
      const data = { search: 'test@#$%', page: 1 };
      const promise = ApiService.makeRequest('/movies', HTTPMethod.GET, data);

      mockXHR.onload();

      await promise;
      expect(mockXHR.open).toHaveBeenCalledWith('GET', 'http://localhost:3001/api/movies?search=test%40%23%24%25&page=1', true);
    });

    it('handles boolean values in query parameters', async () => {
      const data = { active: true, featured: false };
      const promise = ApiService.makeRequest('/movies', HTTPMethod.GET, data);

      mockXHR.onload();

      await promise;
      expect(mockXHR.open).toHaveBeenCalledWith('GET', 'http://localhost:3001/api/movies?active=true&featured=false', true);
    });
  });

  describe('Response parsing', () => {
    it('parses JSON response correctly', async () => {
      const jsonResponse = { movies: [{ id: 1, title: 'Test' }], total: 1 };
      mockXHR.responseText = JSON.stringify(jsonResponse);

      const promise = ApiService.makeRequest('/movies', HTTPMethod.GET);

      mockXHR.onload();

      const result = await promise;
      expect(result).toEqual(jsonResponse);
    });

    it('handles non-JSON response', async () => {
      mockXHR.responseText = 'plain text response';

      const promise = ApiService.makeRequest('/test', HTTPMethod.GET);

      mockXHR.onload();

      const result = await promise;
      expect(result).toBe('plain text response');
    });
  });
});
