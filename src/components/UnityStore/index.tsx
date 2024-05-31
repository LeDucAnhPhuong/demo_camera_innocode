"use client";

import { Unity, useUnityContext } from "react-unity-webgl";

function UnityStore() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/unity/Final_WebGL_1.loader.js",
    dataUrl: "/unity/Final_WebGL_1.data.unityweb",
    frameworkUrl: "/unity/Final_WebGL_1.framework.js.unityweb",
    codeUrl: "/unity/Final_WebGL_1.wasm.unityweb",
  });

  return (
    <div>
      <Unity
        unityProvider={unityProvider}
        style={{
          width: "100%",
          maxWidth: "1260px",
          margin: "40px auto 80px",
        }}
      />
    </div>
  );
}

export default UnityStore;
