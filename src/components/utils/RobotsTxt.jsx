// Import react
import React from 'react';

const RobotsTxt = () => {
    // HTML block
    return (
        <pre>
            {`User-agent: *
Host: https://admin-yaem.kz/
User-agent: Googlebot
User-agent: Yandex
Sitemap: http://admin-yaem.kz/sitemap.xml

Disallow: /js
Disallow: /css
Disallow: /cgi-bin`}
        </pre>
    );
}

export default RobotsTxt;