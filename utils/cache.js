const cacheKeyPrefix = "cache_";

//  Convert days to milliseconds
const daysToMilliseconds = (days) => {
  return days * 24 * 60 * 60 * 1000;
};

const getLocalStorageCache = (key) => {
  const cachedItem = localStorage.getItem(cacheKeyPrefix + key);
  if (cachedItem) {
    const parsedItem = JSON.parse(cachedItem);
    const now = Date.now();
    if (parsedItem.expiry && now > parsedItem.expiry) {
      // Cache expired
      localStorage.removeItem(cacheKeyPrefix + key);
      return null;
    }
    return parsedItem.data;
  }
  return null;
};

const setLocalStorageCache = (key, data, ttl) => {
  const now = Date.now();
  const cachedItem = { data, expiry: now + ttl };
  localStorage.setItem(cacheKeyPrefix + key, JSON.stringify(cachedItem));
};

// Fetches data with caching mechanism
export const getCachedData = async (key, fetchFunction, ttlDays = 5) => {
  // Convert TTL from days to milliseconds
  const ttl = daysToMilliseconds(ttlDays);

  // Check if there's a valid cached item
  const cachedItem = getLocalStorageCache(key);

  // If the cache is present and not expired, return it
  if (cachedItem) {
    console.log(`Cache hit for key: ${key}`);
    return cachedItem;
  } else {
    console.log(`Cache miss for key: ${key}`);
  }

  // Fetch fresh data as cache is expired or absent
  const data = await fetchFunction();

  // Store the cache with new data and TTL
  setLocalStorageCache(key, data, ttl);
  console.log(`Data cached for key: ${key}`);
  return data;
};
