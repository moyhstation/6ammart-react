// cache.js

const LRU = require("lru-cache");

// Create a new cache with a maximum size and time-to-live (TTL) duration
const cache = new LRU({
  max: 100, // Maximum number of items in the cache
  maxAge: 30 * 60 * 1000, // Cache items for 30 minutes (in milliseconds)
});

// Function to get data from the cache
function getCache(key) {
  return cache.get(key);
}

// Function to set data in the cache
function setCache(key, value) {
  cache.set(key, value);
}

module.exports = {
  getCache,
  setCache,
};
