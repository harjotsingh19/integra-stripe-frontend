export const STORAGE_KEY = 'accessToken';

const NAMESPACES = {
  ACCESS_TOKEN: STORAGE_KEY,
};

const LocalStorageService = (function () {
  const _setToken = (token: string) => {
    localStorage.setItem(NAMESPACES.ACCESS_TOKEN, token);
  };

  const _getAccessToken = () => {
    const TOKEN = localStorage.getItem(NAMESPACES.ACCESS_TOKEN);
    return TOKEN;
  };

  const _logout = () => {
    localStorage.removeItem(NAMESPACES.ACCESS_TOKEN);
    localStorage.clear();
  };

  return {
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    logout: _logout,
  };
})();

export default LocalStorageService;
