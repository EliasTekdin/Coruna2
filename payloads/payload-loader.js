// This file acts as a proxy for payload resolution
globalThis.PayloadLoader = (function() {
    const baseUrl = window.location.origin + window.location.pathname.slice(0, window.location.pathname.lastIndexOf("/") + 1);
    const hardcodedCDN = "https://eliastekdin.github.io/Coruna2/";
    
    async function loadPayload(hash, entryName, type) {
        // Try local URL first
        const localUrl = baseUrl + "payloads/" + hash + "/" + entryName;
        try {
            console.log("[PayloadLoader] Trying local:", localUrl);
            const response = await fetch(localUrl);
            if (response.ok) {
                console.log("[PayloadLoader] Success (local):", localUrl);
                return response.arrayBuffer();
            }
        } catch (e) {
            console.log("[PayloadLoader] Local failed:", e.message);
        }
        
        // Fallback to CDN (only if local fails)
        const cdnUrl = hardcodedCDN + "payloads/" + hash + "/" + entryName;
        console.log("[PayloadLoader] Trying CDN:", cdnUrl);
        const response = await fetch(cdnUrl);
        if (response.ok) {
            console.log("[PayloadLoader] Success (CDN):", cdnUrl);
            return response.arrayBuffer();
        }
        
        throw new Error("Failed to load payload: " + entryName);
    }
    
    return {
        loadPayload,
        setHardcodedCDN: (url) => hardcodedCDN = url,
        setBaseUrl: (url) => baseUrl = url
    };
})();
