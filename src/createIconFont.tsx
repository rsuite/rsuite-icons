import React from 'react';
import classNames from 'classnames';
import Icon, { IconProps } from './Icon';
import { inBrowserEnv, defaultClassPrefix } from './utils';
import { useMemo } from 'react';

const cache = new Set<string>();

function isValidScriptUrl(scriptUrl: string) {
  return typeof scriptUrl === 'string' && scriptUrl.length && !cache.has(scriptUrl);
}

export interface Options {
  /** Icon script url */
  scriptUrl?: string | string[];

  /** Common props for Icon */
  commonProps?: React.HTMLAttributes<SVGElement>;

  /** Loaded callback */
  onLoaded?(): void;
}

export interface IconFontProps extends IconProps {
  /** Icon name in IconFont */
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
function createIconFont({ scriptUrl, commonProps = {}, onLoaded }: Options = {}) {
  if (scriptUrl && inBrowserEnv()) {
    const scriptUrls = Array.isArray(scriptUrl) ? scriptUrl : [scriptUrl];
    insertScripts(scriptUrls.reverse(), 0, onLoaded);
  }

  const IconFont = React.forwardRef<SVGElement, IconFontProps>(
    (props: React.PropsWithChildren<IconFontProps>, ref: React.Ref<SVGElement>) => {
      const { icon, children, className, ...restProps } = props;

      const clesses = classNames(className, commonProps.className, defaultClassPrefix('icon-font'));
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
        <Icon {...commonProps} {...restProps} className={clesses} ref={ref}>
          {content}
        </Icon>
      );
    }
  );

  IconFont.displayName = 'IconFont';

  return IconFont;
}

export default createIconFont;
