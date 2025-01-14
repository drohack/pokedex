import React, { useEffect, useState } from 'react';

async function fetchAndCacheImage(url) {
    const cacheName = 'pokemon-images-cache';
    const cacheDuration = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(url);

    if (cachedResponse) {
        const cachedDate = cachedResponse.headers.get('X-Cached-Date');
        if (cachedDate) {
            const date = new Date(cachedDate);
            const now = new Date();
            if (now - date < cacheDuration) {
                return cachedResponse;
            }
        }
    }

    const networkResponse = await fetch(url);
    const responseToCache = networkResponse.clone();

    const headers = new Headers(responseToCache.headers);
    headers.append('X-Cached-Date', new Date().toISOString());

    const responseWithHeaders = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
    });

    cache.put(url, responseWithHeaders);
    return networkResponse;
}

const PokemonImage = ({ imageUrl, name }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        fetchAndCacheImage(imageUrl).then(response => {
            setImageSrc(imageUrl);
        });
    }, [imageUrl]);

    return <img src={imageSrc} alt={name} />;
};

export default PokemonImage;