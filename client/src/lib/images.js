// ---------------------------------------------------------------------------
// Image helpers – single source of truth for product and editorial imagery.
// Swap assets below when real photography is ready; every page updates.
// ---------------------------------------------------------------------------

// --- Product image pool (52 images from frontend_assets) -------------------
import p_img1 from "../assets/frontend_assets/p_img1.png";
import p_img2 from "../assets/frontend_assets/p_img2.png";
import p_img3 from "../assets/frontend_assets/p_img3.png";
import p_img4 from "../assets/frontend_assets/p_img4.png";
import p_img5 from "../assets/frontend_assets/p_img5.png";
import p_img6 from "../assets/frontend_assets/p_img6.png";
import p_img7 from "../assets/frontend_assets/p_img7.png";
import p_img8 from "../assets/frontend_assets/p_img8.png";
import p_img9 from "../assets/frontend_assets/p_img9.png";
import p_img10 from "../assets/frontend_assets/p_img10.png";
import p_img11 from "../assets/frontend_assets/p_img11.png";
import p_img12 from "../assets/frontend_assets/p_img12.png";
import p_img13 from "../assets/frontend_assets/p_img13.png";
import p_img14 from "../assets/frontend_assets/p_img14.png";
import p_img15 from "../assets/frontend_assets/p_img15.png";
import p_img16 from "../assets/frontend_assets/p_img16.png";
import p_img17 from "../assets/frontend_assets/p_img17.png";
import p_img18 from "../assets/frontend_assets/p_img18.png";
import p_img19 from "../assets/frontend_assets/p_img19.png";
import p_img20 from "../assets/frontend_assets/p_img20.png";
import p_img21 from "../assets/frontend_assets/p_img21.png";
import p_img22 from "../assets/frontend_assets/p_img22.png";
import p_img23 from "../assets/frontend_assets/p_img23.png";
import p_img24 from "../assets/frontend_assets/p_img24.png";
import p_img25 from "../assets/frontend_assets/p_img25.png";
import p_img26 from "../assets/frontend_assets/p_img26.png";
import p_img27 from "../assets/frontend_assets/p_img27.png";
import p_img28 from "../assets/frontend_assets/p_img28.png";
import p_img29 from "../assets/frontend_assets/p_img29.png";
import p_img30 from "../assets/frontend_assets/p_img30.png";
import p_img31 from "../assets/frontend_assets/p_img31.png";
import p_img32 from "../assets/frontend_assets/p_img32.png";
import p_img33 from "../assets/frontend_assets/p_img33.png";
import p_img34 from "../assets/frontend_assets/p_img34.png";
import p_img35 from "../assets/frontend_assets/p_img35.png";
import p_img36 from "../assets/frontend_assets/p_img36.png";
import p_img37 from "../assets/frontend_assets/p_img37.png";
import p_img38 from "../assets/frontend_assets/p_img38.png";
import p_img39 from "../assets/frontend_assets/p_img39.png";
import p_img40 from "../assets/frontend_assets/p_img40.png";
import p_img41 from "../assets/frontend_assets/p_img41.png";
import p_img42 from "../assets/frontend_assets/p_img42.png";
import p_img43 from "../assets/frontend_assets/p_img43.png";
import p_img44 from "../assets/frontend_assets/p_img44.png";
import p_img45 from "../assets/frontend_assets/p_img45.png";
import p_img46 from "../assets/frontend_assets/p_img46.png";
import p_img47 from "../assets/frontend_assets/p_img47.png";
import p_img48 from "../assets/frontend_assets/p_img48.png";
import p_img49 from "../assets/frontend_assets/p_img49.png";
import p_img50 from "../assets/frontend_assets/p_img50.png";
import p_img51 from "../assets/frontend_assets/p_img51.png";
import p_img52 from "../assets/frontend_assets/p_img52.png";

// --- Editorial / hero imagery -----------------------------------------------
import hero_img from "../assets/frontend_assets/hero_img.png";
import about_img from "../assets/frontend_assets/about_img.png";
import contact_img from "../assets/frontend_assets/contact_img.png";

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** All product images available in the pool (indexed 0–51). */
const POOL = [
  p_img1,  p_img2,  p_img3,  p_img4,  p_img5,  p_img6,  p_img7,
  p_img8,  p_img9,  p_img10, p_img11, p_img12, p_img13, p_img14,
  p_img15, p_img16, p_img17, p_img18, p_img19, p_img20, p_img21,
  p_img22, p_img23, p_img24, p_img25, p_img26, p_img27, p_img28,
  p_img29, p_img30, p_img31, p_img32, p_img33, p_img34, p_img35,
  p_img36, p_img37, p_img38, p_img39, p_img40, p_img41, p_img42,
  p_img43, p_img44, p_img45, p_img46, p_img47, p_img48, p_img49,
  p_img50, p_img51, p_img52,
];

/** Deterministic hash so the same slug always yields the same images. */
const hash = (str) =>
  str.split("").reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) & 0xffff, 0);

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

/**
 * Returns `count` local product images for a given slug.
 * Images are picked deterministically from the pool so each product
 * always gets the same set of images.
 */
export const productImages = (slug, count = 4) => {
  const start = hash(slug) % POOL.length;
  return Array.from({ length: count }, (_, i) => POOL[(start + i) % POOL.length]);
};

/**
 * Map of editorial slot names → local image imports.
 * Add new entries here when real photography arrives.
 */
const EDITORIAL_MAP = {
  about:    about_img,
  craft:    contact_img,
  monsoon:  hero_img,
  editorial: about_img,
};

/**
 * Returns a local editorial image for a named slot.
 * Falls back to `hero_img` for unknown slot names.
 * The `width` and `height` arguments are accepted but unused
 * (they were meaningful for the old picsum API; kept for API compatibility).
 */
export const editorialImage = (name, _width, _height) =>
  EDITORIAL_MAP[name] ?? hero_img;

/** Expose individual editorial images for direct use. */
export { hero_img, about_img, contact_img };
