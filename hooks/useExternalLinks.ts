import { useEffect } from 'react';

export function useExternalLinks() {
  useEffect(() => {
    const links = document.getElementsByTagName('a');

    for (const link of links) {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('/')) {
        link.setAttribute('target', '_blank');
      }

      const emailPrefix = 'mailto:';
      if (href && href.startsWith(emailPrefix)) {
        let decoded: null | string = null;
        try {
          const encoded = href.split(emailPrefix)[1];
          decoded = window.atob(encoded);
        } catch (e) {
          // do nothing
        }
        if (decoded) {
          link.setAttribute('href', `${emailPrefix}${decoded}`);
        }
      }
    }
  }, []);
}
