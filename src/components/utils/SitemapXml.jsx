import React from 'react';

const SitemapXml = () => {
    return (
        <textarea rows={20} cols={100}>
            {`<?xml version="1.0" encoding="UTF-8"?>
<!-- created with www.mysitemapgenerator.com -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yaem.kz/</loc>
    <lastmod>2024-03-21T13:50:17+01:00</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yaem.kz/user/signin/</loc>
    <lastmod>2024-03-21T13:50:17+01:00</lastmod>
    <priority>0.6</priority>
  </url>
  <!-- Вставьте остальные URL вашего сайта здесь -->
</urlset>`}
        </textarea>
    );
}

export default SitemapXml;