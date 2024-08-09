declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// SVG
// https://velog.io/@hyorish03/React-Vite-TS-React-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-SVGR%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%B4-SVG%EB%A5%BC-ReactComponent%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
