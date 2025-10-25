/**
 * WebSocket Service for Real-time Communication
 * Handles Socket.IO connection and events
 */

import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = {};
  }

  /**
   * Connect to the WebSocket server
   */
  connect(username = null) {
    if (this.socket) {
      console.warn('Socket already connected');
      return;
    }

    this.socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    // Connection event handlers
    this.socket.on('connect', () => {
      console.log('✓ WebSocket connected');
      this.isConnected = true;
      
      // Register user if username provided
      if (username) {
        this.registerUser(username);
      }
    });

    this.socket.on('disconnect', () => {
      console.log('✗ WebSocket disconnected');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    // Listen for initial state
    this.socket.on('initial_state', (data) => {
      console.log('Received initial state:', data);
      this.emit('initialState', data);
    });

    // Listen for new ideas
    this.socket.on('new_idea', (data) => {
      console.log('New idea received:', data);
      this.emit('newIdea', data);
    });

    // Listen for user joined events
    this.socket.on('user_joined', (data) => {
      console.log('User joined:', data);
      this.emit('userJoined', data);
    });
  }

  /**
   * Disconnect from the WebSocket server
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.listeners = {};
    }
  }

  /**
   * Register user with the server
   */
  registerUser(username) {
    if (this.socket && this.isConnected) {
      this.socket.emit('register_user', { username });
    }
  }

  /**
   * Subscribe to an event
   * @param {string} event - Event name
   * @param {function} callback - Callback function
   */
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  /**
   * Unsubscribe from an event
   * @param {string} event - Event name
   * @param {function} callback - Callback function
   */
  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  /**
   * Emit event to local listeners
   */
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  /**
   * Get connection status
   */
  getConnectionStatus() {
    return this.isConnected;
  }
}

// Export singleton instance
const wsService = new WebSocketService();
export default wsService;
