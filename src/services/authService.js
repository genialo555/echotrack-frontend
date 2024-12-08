import axios from 'axios';

const API_URL =   process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000'

const authService = {
  async login(credentials) {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
      if (response.data.accessToken) {
        const userData = {
          token: response.data.accessToken,
          expiresIn: response.data.expiresIn,
          user: {
            email: credentials.email,
            role: this.parseJwt(response.data.accessToken).role
          }
        };
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, userData);
      if (response.data.data) {
        const user = response.data.data;
        if (!['USER', 'ADMIN'].includes(user.role)) {
          throw new Error('Rôle utilisateur invalide');
        }
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erreur lors du parsing du JWT:', error);
      return null;
    }
  },

  handleError(error) {
    if (error.response) {
      if (error.response.status === 403) {
        throw new Error('Accès non autorisé. Veuillez vérifier vos permissions.');
      }
      const message = error.response.data.message || 'Une erreur est survenue';
      throw new Error(message);
    } else if (error.request) {
      throw new Error('Impossible de contacter le serveur');
    } else {
      throw new Error('Erreur de configuration de la requête');
    }
  },

  logout() {
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token && user.user && ['USER', 'ADMIN'].includes(user.user.role)) {
        return user;
      }
      return null;
    } catch {
      return null;
    }
  },

  isAdmin() {
    const user = this.getCurrentUser();
    return user?.user?.role === 'ADMIN';
  },

  isUser() {
    const user = this.getCurrentUser();
    return user?.user?.role === 'USER';
  },

  hasValidRole(user) {
    return user?.user?.role === 'USER' || user?.user?.role === 'ADMIN';
  }
};

// Configuration globale d'Axios avec vérification du rôle
axios.interceptors.request.use(
  (config) => {
    const user = authService.getCurrentUser();
    if (user && user.token && authService.hasValidRole(user)) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et les erreurs d'autorisation
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      authService.logout();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default authService;