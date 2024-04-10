import React from 'react';

const RobotsTxt = () => {
    return (
        <pre>
            {`User-agent: *
Host: https://yaem.kz/
User-agent: Googlebot
User-agent: Yandex
Sitemap: http://yaem.kz/sitemap.xml

Disallow: /admin/
Disallow: /js
Disallow: /css
Disallow: /cgi-bin
Disallow: /user
Disallow: /api/v1`}
        </pre>
    );
}

export default RobotsTxt;