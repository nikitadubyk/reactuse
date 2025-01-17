import React from 'react';

import { useDidUpdate } from '../useDidUpdate/useDidUpdate';
import { useMount } from '../useMount/useMount';

/** The use favicon options */
export interface UseFaviconOptions {
  /** The rel of the favicon */
  rel: string;
}

/** The use favicon return type */
export type UseFaviconReturn = [string, React.Dispatch<React.SetStateAction<string>>];

/**
 * @name useFavicon
 * @description - Hook that manages the favicon
 *
 * @param {string} initialFavicon The initial favicon. If not provided, the current favicon will be used
 * @param {string} [options.rel] The rel of the favicon
 * @returns {UseFaviconReturn} An array containing the current favicon and a function to update the favicon
 *
 * @example
 * const { href, set } = useFavicon('https://www.google.com/favicon.ico');
 */
export const useFavicon = (initialHref?: string, options?: UseFaviconOptions) => {
  const rel = options?.rel ?? 'icon';
  const [href, setHref] = React.useState(
    initialHref ?? document.querySelector<HTMLLinkElement>(`link[rel*="${rel}"]`)?.href
  );

  const injectFavicon = (favicon: string) => {
    const link =
      document.querySelector<HTMLLinkElement>(`link[rel*="${rel}"]`) ||
      document.createElement('link');
    link.rel = rel;
    link.href = favicon;
    link.type = `image/${favicon.split('.').pop()}`;
    document.head.append(link);
    document.getElementsByTagName('head')[0].appendChild(link);
  };

  const set = (favicon: string) => {
    setHref(favicon);
    injectFavicon(favicon);
  };

  useMount(() => {
    if (!initialHref) return;
    injectFavicon(initialHref);
  });

  useDidUpdate(() => {
    if (!initialHref) return;
    setHref(initialHref);
    injectFavicon(initialHref);
  }, [initialHref, options?.rel]);

  return { href, set } as const;
};
