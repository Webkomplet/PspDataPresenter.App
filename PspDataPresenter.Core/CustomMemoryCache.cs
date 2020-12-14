using System;
using System.Collections.Concurrent;
using Microsoft.Extensions.Caching.Memory;

namespace PspDataPresenter.Core
{
    public interface ICustomMemoryCache
    {
        void Add(string key, object value);

        string Get(string key);

        T Get<T>(string key);
    }
    public class CustomMemoryCache : ICustomMemoryCache
    {
        readonly MemoryCache _cache;
        static readonly ConcurrentDictionary<string, object> _locks = new ConcurrentDictionary<string, object>();

        public CustomMemoryCache()
        {
            _cache = new MemoryCache(new MemoryCacheOptions());
        }

        public void Add(string key, object value)
        {
            lock (_locks.GetOrAdd(key, _ => new object()))
            {
                _cache.Set(key, value,
                    new MemoryCacheEntryOptions()
                        .SetAbsoluteExpiration(TimeSpan.FromMinutes(15))
                        .RegisterPostEvictionCallback(
                            (key, value, reason, substate) =>
                            {
                                object o;
                                _locks.TryRemove(key.ToString(), out o);
                            }
                        ));
            }
        }
        public string Get(string key)
        {
            if (_locks.ContainsKey(key))
                return _cache.Get(key).ToString();

            return null;
        }
        public T Get<T>(string key)
        {
            if (_locks.ContainsKey(key))
                return _cache.Get<T>(key);

            return default(T);
        }
    }
}
