import Script from "next/script"

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-NZW3MWGC"

/** Google Tag Manager — visit / conversion tags from the GTM container. */
export function GoogleTagManager() {
  return (
    <>
      <Script id="gtm-bootstrap" strategy="afterInteractive">{`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
`}</Script>
    </>
  )
}

/** GTM fallback for browsers with JS disabled (paste immediately after `<body>`). */
export function GoogleTagManagerNoscript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height={0}
        width={0}
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}
