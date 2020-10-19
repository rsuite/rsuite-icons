import * as React from 'react';
import Icon, { IconBaseProps } from './IconBase';
import { inBrowserEnv } from './utils';
import { useMemo } from 'react';

const cache = new Set<string>();

function isValidScriptUrl(scriptUrl: string) {
  return typeof scriptUrl === 'string' && scriptUrl.length && !cache.has(scriptUrl);
}

export interface Option {
  /**
   * Icon script url
   */
  scriptUrl?: string | string[];

  /**
   * Extra props for Icon
   */
  extraProps?: { [key: string]: any };

  /**
   * Loaded callback
   */
  onLoaded?(): void;
}

export interface IconFontProps extends IconBaseProps {
  /**
   * icon name in IconFont
   */
  icon: string;
}

function insertScripts(scriptUrls: string[], index = 0, loadedCallback?: () => void): void {
  const nextIndex = index + 1;
  const currentScriptUrl = scriptUrls[index];
  const loadNextScript = () => {
    insertScripts(scriptUrls, nextIndex, loadedCallback);
  };
  if (isValidScriptUrl(currentScriptUrl)) {
    const script = document.createElement('script');
    script.setAttribute('src', currentScriptUrl);
    script.setAttribute('data-prop', 'icon-font');
    if (scriptUrls.length > nextIndex) {
      script.onload = loadNextScript;
      script.onerror = loadNextScript;
    }
    cache.add(currentScriptUrl);
    document.body.appendChild(script);
  } else if (scriptUrls.length > nextIndex) {
    loadNextScript();
  }
  if (nextIndex >= scriptUrls.length && typeof loadedCallback === 'function') {
    loadedCallback();
  }
}
export default function create({ scriptUrl, extraProps = {}, onLoaded }: Option = {}) {
  if (scriptUrl && inBrowserEnv()) {
    const scriptUrls = Array.isArray(scriptUrl) ? scriptUrl : [scriptUrl];
    insertScripts(scriptUrls.reverse(), 0, onLoaded);
  }

  const IconFont = React.forwardRef<HTMLSpanElement, IconFontProps>(
    (props: React.PropsWithChildren<IconFontProps>, ref: React.Ref<HTMLSpanElement>) => {
      const { icon, children, ...restProps } = props;

      /**
       * Children will overwrite <use />
       */
      const content = useMemo(() => {
        if (children) {
          return children;
        }

        if (icon) {
          return <use xlinkHref={`#${icon}`} />;
        }
      }, [icon, children]);

      return (
        <Icon {...extraProps} {...restProps} baseClassName="icon-font" ref={ref}>
          {content}
        </Icon>
      );
    }
  );

  IconFont.displayName = 'Iconfont';

  return IconFont;
}
