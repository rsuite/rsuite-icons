import * as React from 'react';
import Icon, { IconBaseProps } from './IconBase';
import { inBrowserEnv } from './utils';
import { useMemo } from 'react';

const cache = new Set<string>();

export interface Option {
  scriptUrl?: string | string[];
  extraProps?: { [key: string]: any };
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
  const script = document.createElement('script');
  script.setAttribute('src', currentScriptUrl);
  script.setAttribute('data-prop', 'icon-font');
  if (scriptUrls.length > nextIndex) {
    const loadNextScript = () => {
      insertScripts(scriptUrls, nextIndex, loadedCallback);
    };
    script.onload = loadNextScript;
    script.onerror = loadNextScript;
  }
  if (nextIndex >= scriptUrls.length && typeof loadedCallback === 'function') {
    loadedCallback();
  }
  if (currentScriptUrl) {
    cache.add(currentScriptUrl);
    document.body.appendChild(script);
  }
}

function isValidScriptUrl(scriptUrl: string) {
  return typeof scriptUrl === 'string' && scriptUrl.length && !cache.has(scriptUrl);
}

export default function create({ scriptUrl, extraProps = {}, onLoaded }: Option = {}) {
  if (scriptUrl && inBrowserEnv()) {
    const scriptUrls = Array.isArray(scriptUrl) ? scriptUrl : [scriptUrl];
    insertScripts(scriptUrls.filter(isValidScriptUrl).reverse(), 0, onLoaded);
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
        <Icon {...extraProps} {...restProps} ref={ref}>
          {content}
        </Icon>
      );
    }
  );

  IconFont.displayName = 'Iconfont';

  return IconFont;
}
