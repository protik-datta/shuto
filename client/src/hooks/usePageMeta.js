import { useEffect } from 'react';
import { SITE } from '../constants/site';

const setMeta = (selector, attribute, value) => {
  const element = document.head.querySelector(selector);
  if (element && value) element.setAttribute(attribute, value);
};

export default function usePageMeta({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name}: ${SITE.tagline}`;
    document.title = fullTitle;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    window.scrollTo({ top: 0 });
  }, [title, description]);
}
