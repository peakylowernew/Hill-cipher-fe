export const getToken = () => localStorage.getItem("token") || null;
export const getUid = () => localStorage.getItem("uid") || null;

export const isAuthenticated = () => !!getToken();

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("uid");
};
