<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" version="1.0" doctype-system="about:legacy-compat" media-type="text/html"/>

  <xsl:template match="/">
    <html lang="fr">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="/rss/channel/title"/></title>
        <style><![CDATA[
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, Arial, sans-serif; background: #f9f9fc; color: #1a1c1e; line-height: 1.6; -webkit-font-smoothing: antialiased; }
          a { color: #0047ab; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .header { background: linear-gradient(135deg, #0047ab 0%, #003276 100%); color: #fff; padding: 48px 20px 40px; text-align: center; }
          .header .brand { display: inline-flex; align-items: center; gap: 10px; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 12px; }
          .header .brand .dot { width: 12px; height: 12px; border-radius: 50%; background: #ffb300; }
          .header h1 { font-size: clamp(24px, 5vw, 36px); font-weight: 800; margin-bottom: 10px; }
          .header p { max-width: 560px; margin: 0 auto 20px; color: #dce6ff; font-size: 15px; }
          .header .btn { display: inline-block; background: #fff; color: #0047ab; font-weight: 700; padding: 10px 22px; border-radius: 999px; font-size: 14px; }
          .header .btn:hover { background: #eef2ff; text-decoration: none; }
          .header .meta { margin-top: 14px; font-size: 13px; color: #b9cbff; }
          main { max-width: 680px; margin: 0 auto; padding: 28px 16px 48px; }
          .item { background: #fff; border: 1px solid #e6e8f0; border-radius: 16px; padding: 24px; margin-bottom: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .item .row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }
          .item .cat { background: #dae2ff; color: #001946; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.03em; }
          .item .date { color: #6b7280; font-size: 13px; }
          .item h2 { font-size: 19px; font-weight: 700; margin-bottom: 8px; }
          .item h2 a { color: #1a1c1e; }
          .item h2 a:hover { color: #0047ab; text-decoration: none; }
          .item p { color: #4b5563; font-size: 15px; margin-bottom: 14px; }
          .item .read { font-size: 14px; font-weight: 600; }
          .footer { text-align: center; padding: 24px 16px 48px; color: #6b7280; font-size: 13px; }
          .footer a { font-weight: 600; }
        ]]></style>
      </head>
      <body>
        <div class="header">
          <div class="brand"><span class="dot"></span> Edukora</div>
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <p><xsl:value-of select="/rss/channel/description"/></p>
          <a class="btn" href="/blog">Voir le blog</a>
          <div class="meta">
            <xsl:value-of select="count(/rss/channel/item)"/> articles · Mis à jour le <xsl:value-of select="/rss/channel/lastBuildDate"/>
          </div>
        </div>

        <main>
          <xsl:for-each select="/rss/channel/item">
            <article class="item">
              <div class="row">
                <span class="cat"><xsl:value-of select="category"/></span>
                <span class="date"><xsl:value-of select="pubDate"/></span>
              </div>
              <h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
              <p><xsl:value-of select="description"/></p>
              <a class="read" href="{link}">Lire l'article &#8594;</a>
            </article>
          </xsl:for-each>
        </main>

        <div class="footer">
          &#169; Edukora · <a href="/blog">Le blog</a> · <a href="/">Retour à l'accueil</a>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
