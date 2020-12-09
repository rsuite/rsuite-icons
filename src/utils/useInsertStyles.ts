import { insertCss } from 'insert-css';
import { getClassNamePrefix } from './prefix';
import { useEffect } from 'react';

const prefix = getClassNamePrefix();

// Generated with ../less/index.less
const styles = `.${prefix}icon {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  vertical-align: middle;
}
.${prefix}icon[tabindex] {
  cursor: pointer;
}
.${prefix}icon-spin {
  -webkit-animation: icon-spin 2s infinite linear;
          animation: icon-spin 2s infinite linear;
}
.${prefix}icon-pulse {
  -webkit-animation: icon-spin 1s infinite steps(8);
          animation: icon-spin 1s infinite steps(8);
}
.${prefix}icon-flip-horizontal {
  -webkit-transform: scaleX(-1);
      -ms-transform: scaleX(-1);
          transform: scaleX(-1);
}
.${prefix}icon-flip-vertical {
  -webkit-transform: scaleY(-1);
      -ms-transform: scaleY(-1);
          transform: scaleY(-1);
}
@-webkit-keyframes icon-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
  }
}
@keyframes icon-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
  }
}`;

let cssInjected = false;

const useInsertStyles = (styleStr = styles) => {
  useEffect(() => {
    // Make sure css injected once.
    if (!cssInjected) {
      insertCss(styleStr, { prepend: true });
      cssInjected = true;
    }
  }, []);
};

export default useInsertStyles;
