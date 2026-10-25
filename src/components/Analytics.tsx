import Script from 'next/script';

const GTM_ID = 'GTM-PNPQBHF4';

/** 기존 사이트에서 쓰던 Google Tag Manager(GA4 포함). ?me=1 로 표시한 기기는 internal 트래픽으로 보냅니다. */
export default function Analytics() {
  return (
    <>
      <Script id="gtm" strategy="afterInteractive">{`
        (function(){
          try {
            var q = new URLSearchParams(location.search);
            if (q.get('me') === '1') localStorage.setItem('wa_me','1');
            if (q.get('me') === '0') localStorage.removeItem('wa_me');
          } catch(e) {}
          window.dataLayer = window.dataLayer || [];
          var me = false; try { me = localStorage.getItem('wa_me') === '1'; } catch(e) {}
          window.dataLayer.push({ traffic_type: me ? 'internal' : 'external' });
        })();
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
      `}</Script>
      <noscript>
        <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} title="gtm" />
      </noscript>
    </>
  );
}
