// Import react
import React from 'react';

const SitemapXml = () => {
  return (
    <textarea rows={20} cols={100}>
      {`<?xml version="1.0" encoding="UTF-8"?>
		<!--	created with www.mysitemapgenerator.com	-->
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
	<loc>https://admin-yaem.kz/</loc>
	<lastmod>2024-04-17T06:37:49+01:00</lastmod>
	<priority>0.8</priority>
</url>
<url>
	<loc>https://admin-yaem.kz/registration</loc>
	<lastmod>2024-04-17T06:37:49+01:00</lastmod>
	<priority>1.0</priority>
</url>
<url>
	<loc>https://admin-yaem.kz/login</loc>
	<lastmod>2024-04-17T06:37:49+01:00</lastmod>
	<priority>1.0</priority>
</url>
<url>
	<loc>https://admin-yaem.kz/menu</loc>
	<lastmod>2024-04-17T06:37:49+01:00</lastmod>
	<priority>1.0</priority>
</url>
<url>
	<loc>https://admin-yaem.kz/robots.txt</loc>
	<lastmod>2024-04-17T06:37:49+01:00</lastmod>
	<priority>1.0</priority>
</url>
<url>
	<loc>https://admin-yaem.kz/sitemap.xml</loc>
	<lastmod>2024-04-17T06:37:49+01:00</lastmod>
	<priority>1.0</priority>
</url>
</urlset>`}
    </textarea>
  );
}

export default SitemapXml;