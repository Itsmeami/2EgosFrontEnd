// src/utils/oauthPopup.js
// Opens an OAuth popup and waits for the backend to postMessage the auth result.
//
// Usage:
//   openOAuthPopup('http://localhost:5000/api/auth/google?returnTo=/')
//     .then(payload => { /* payload: { token, user } */ })
//     .catch(err => { /* error or timeout */ })

export function openOAuthPopup(url, { name = "oauth", width = 600, height = 700, timeoutMs = 2 * 60 * 1000 } = {}) {
  return new Promise((resolve, reject) => {
    try {
      const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

      const w = window.innerWidth || document.documentElement.clientWidth || screen.width;
      const h = window.innerHeight || document.documentElement.clientHeight || screen.height;

      const left = (w / 2) - (width / 2) + dualScreenLeft;
      const top = (h / 2) - (height / 2) + dualScreenTop;

      const popup = window.open(url, name, `scrollbars=yes, width=${width}, height=${height}, top=${top}, left=${left}`);

      if (!popup) {
        return reject(new Error("popup-blocked"));
      }

      let finished = false;

      // Fallback timeout
      const to = setTimeout(() => {
        if (finished) return;
        finished = true;
        try { popup.close(); } catch (e) {}
        reject(new Error("timeout"));
      }, timeoutMs);

      // Message listener
      function onMessage(e) {
        try {
          // In prod restrict by origin. For dev accept localhost:5000
          const allowed = ["http://localhost:5000", "http://127.0.0.1:5000"];
          if (allowed.indexOf(e.origin) === -1) {
            // ignore other origins
            // console.warn("oauthPopup ignored origin:", e.origin);
            return;
          }

          const data = e.data;
          if (!data) return;

          // Support both { type: 'oauth-google', payload } and plain payload
          const payload = data.payload || data;
          // Optionally check data.type if you want specific provider

          finished = true;
          clearTimeout(to);
          window.removeEventListener("message", onMessage);

          try { popup.close(); } catch (err) {}

          // resolve with payload
          resolve(payload);
        } catch (err) {
          finished = true;
          clearTimeout(to);
          window.removeEventListener("message", onMessage);
          try { popup.close(); } catch (e) {}
          reject(err);
        }
      }

      window.addEventListener("message", onMessage);

      // Poll for popup closed manually (user closed)
      const poll = setInterval(() => {
        if (finished) {
          clearInterval(poll);
          return;
        }
        if (popup.closed) {
          finished = true;
          clearTimeout(to);
          window.removeEventListener("message", onMessage);
          clearInterval(poll);
          reject(new Error("popup-closed"));
        }
      }, 500);
    } catch (err) {
      reject(err);
    }
  });
}
