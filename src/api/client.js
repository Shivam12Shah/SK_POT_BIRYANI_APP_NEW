/**
 * API Client
 * Handles HTTP requests with interceptors, error handling, and authentication
 */

import { API_BASE_URL, DEFAULT_HEADERS, REQUEST_TIMEOUT } from './config';

class ApiClient {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.headers = { ...DEFAULT_HEADERS };
        this.timeout = REQUEST_TIMEOUT;
        this.authToken = null;
    }

    /**
     * Set authentication token
     * @param {string} token - JWT or auth token
     */
    setAuthToken(token) {
        this.authToken = token;
        console.log('🔐 [API] Auth token set');
    }

    /**
     * Clear authentication token
     */
    clearAuthToken() {
        this.authToken = null;
        console.log('🔓 [API] Auth token cleared');
    }

    /**
     * Get headers for request
     */
    getHeaders(customHeaders = {}) {
        const headers = {
            ...DEFAULT_HEADERS,
            ...customHeaders,
        };

        // Add auth token if available
        if (this.authToken) {
            headers['Authorization'] = `Bearer ${this.authToken}`;
        }

        return headers;
    }

    /**
     * Build full URL
     */
    buildURL(endpoint) {
        return `${this.baseURL}${endpoint}`;
    }

    /**
     * Handle API response
     */
    async handleResponse(response) {
        const contentType = response.headers.get('content-type');
        const isJson = contentType && contentType.includes('application/json');

        let data;
        if (isJson) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            console.error('❌ [API] Request failed:', {
                status: response.status,
                statusText: response.statusText,
                data,
            });

            throw {
                status: response.status,
                statusText: response.statusText,
                message: data?.message || data || 'Request failed',
                data,
            };
        }

        console.log('✅ [API] Request successful:', response.status);
        return data;
    }

    /**
     * Handle API errors
     */
    handleError(error) {
        console.error('❌ [API] Error:', error);

        if (error.status) {
            // HTTP error
            return {
                success: false,
                error: error.message,
                status: error.status,
                data: error.data,
            };
        }

        // Network or other error
        return {
            success: false,
            error: error.message || 'Network error occurred',
            status: null,
        };
    }

    /**
     * Make HTTP request
     */
    async request(endpoint, options = {}) {
        const url = this.buildURL(endpoint);
        const headers = this.getHeaders(options.headers);

        const config = {
            method: options.method || 'GET',
            headers,
            ...options,
        };

        // Add body for POST, PUT, PATCH
        if (options.body && typeof options.body === 'object') {
            config.body = JSON.stringify(options.body);
        }

        console.log(`🌐 [API] ${config.method} ${endpoint}`);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(url, {
                ...config,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            return await this.handleResponse(response);
        } catch (error) {
            if (error.name === 'AbortError') {
                console.error('❌ [API] Request timeout');
                throw {
                    success: false,
                    error: 'Request timeout',
                    status: 408,
                };
            }
            throw this.handleError(error);
        }
    }

    /**
     * GET request
     */
    async get(endpoint, params = {}, options = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        return this.request(url, { ...options, method: 'GET' });
    }

    /**
     * POST request
     */
    async post(endpoint, body = {}, options = {}) {
        return this.request(endpoint, { ...options, method: 'POST', body });
    }

    /**
     * PUT request
     */
    async put(endpoint, body = {}, options = {}) {
        return this.request(endpoint, { ...options, method: 'PUT', body });
    }

    /**
     * PATCH request
     */
    async patch(endpoint, body = {}, options = {}) {
        return this.request(endpoint, { ...options, method: 'PATCH', body });
    }

    /**
     * DELETE request
     */
    async delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }
}

// Export singleton instance
export default new ApiClient();
