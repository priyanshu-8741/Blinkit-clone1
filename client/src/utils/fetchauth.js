const API_URL = "http://localhost:8080"; // or from env later

export const fetchWithAuth = async (url, options = {}) => {
  let accessToken = localStorage.getItem("access_token");

  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    const refreshRes = await fetch(`${API_URL}/api/user/refresh_token`, {
      method: "POST",
      credentials: "include",
    });

    const refreshData = await refreshRes.json();
    if (refreshRes.ok && refreshData.accessToken) {
      localStorage.setItem("access_token", refreshData.accessToken);

      const retryRes = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${refreshData.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      return retryRes;
    } else {
      window.location.href = "/login";
    }
  }

  return res;
};