"use client";

import { useCallback, useState, useEffect } from "react";

export function useFetch(url, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch_ = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      const json = await res.json();

      if (!json.success) throw new Error(json.error || "Request failed");
      setData(json.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/use-memo
  }, [url, ...deps]);

  useEffect(() => {
    fetch_();
  }, [fetch_]);

  return { data, loading, error, refetch: fetch_ };
}

export async function apiCall(url, method = "GET", body = null) {
  const isFormData = body instanceof FormData;

  const opts = {
    method,
    // Let the browser set Content-Type automatically for FormData
    headers: isFormData ? {} : { "Content-Type": "application/json" },
    body: isFormData ? body : body ? JSON.stringify(body) : null
  };

  const res = await fetch(url, opts);
  const json = await res.json();

  if (!json.success) {
    throw new Error(json.error || "Request failed");
  }
  return json.data;
}
