// extract.js
// Pass the body of this function as the `function` argument to the
// chrome-devtools MCP `evaluate_script` tool. It runs in the browser
// context, walks the visible DOM, and returns a JSON-serializable object
// with the computed styles needed to populate a design.md frontmatter.
//
// Returned shape:
// {
//   url, title, viewport: {w, h},
//   fonts:        [{ stack, count, samples: [selector, ...] }],
//   typeScale:    [{ fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textTransform, count, samples }],
//   colors:       [{ kind: "color"|"backgroundColor", value, count, samples }],
//   radii:        [{ value, count, samples }],
//   paddings:     [{ value, count, samples }],
//   borders:      [{ value, count, samples }],
//   container:    { maxWidth, selector },
//   header:       { height, sticky, selector },
//   sections:     [{ selector, paddingTop, paddingBottom, backgroundColor }],
//   components:   { buttons, cards, inputs, nav, footer, badges }
// }

() => {
  const toHex = (rgb) => {
    if (!rgb || rgb === "transparent" || rgb === "rgba(0, 0, 0, 0)") return null;
    const m = rgb.match(/rgba?\(([^)]+)\)/);
    if (!m) return rgb;
    const parts = m[1].split(",").map((s) => s.trim());
    const [r, g, b] = parts;
    const h = (n) => Number(n).toString(16).padStart(2, "0");
    return `#${h(r)}${h(g)}${h(b)}`;
  };

  const sig = (el) => {
    if (!el || !el.tagName) return "html";
    const tag = el.tagName.toLowerCase();
    const id = el.id ? `#${el.id}` : "";
    const cls = el.classList && el.classList.length
      ? "." + Array.from(el.classList).slice(0, 2).join(".")
      : "";
    return `${tag}${id}${cls}`.slice(0, 60);
  };

  const bucket = (map, key, value, el) => {
    if (value === null || value === undefined || value === "") return;
    const norm = String(value);
    if (!map.has(norm)) map.set(norm, { value, count: 0, samples: new Set() });
    const entry = map.get(norm);
    entry.count += 1;
    if (entry.samples.size < 3) entry.samples.add(sig(el));
  };

  const isVis = (el) => {
    const s = getComputedStyle(el);
    if (s.display === "none" || s.visibility === "hidden" || Number(s.opacity) === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };

  const fontMap = new Map();
  const typeMap = new Map();
  const colorMap = new Map();
  const radiusMap = new Map();
  const padMap = new Map();
  const borderMap = new Map();
  const sections = [];
  let containerMax = 0;
  let containerSel = "";
  let headerInfo = null;

  const walk = (el) => {
    if (!isVis(el)) return;
    const s = getComputedStyle(el);
    const ff = s.fontFamily;
    if (ff) bucket(fontMap, "stack", ff, el);

    const typeKey = [s.fontFamily, s.fontSize, s.fontWeight, s.lineHeight, s.letterSpacing, s.textTransform].join("|");
    if (s.fontSize && s.fontSize !== "0px") {
      if (!typeMap.has(typeKey)) {
        typeMap.set(typeKey, {
          fontFamily: s.fontFamily,
          fontSize: s.fontSize,
          fontWeight: s.fontWeight,
          lineHeight: s.lineHeight,
          letterSpacing: s.letterSpacing,
          textTransform: s.textTransform,
          count: 0,
          samples: new Set(),
        });
      }
      const t = typeMap.get(typeKey);
      t.count += 1;
      if (t.samples.size < 3) t.samples.add(sig(el));
    }

    const c = toHex(s.color);
    if (c) bucket(colorMap, "color", c, el);
    const bg = toHex(s.backgroundColor);
    if (bg) bucket(colorMap, "backgroundColor", bg, el);

    bucket(radiusMap, "radius", s.borderRadius, el);
    bucket(padMap, "padding", `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`, el);
    if (s.borderWidth && s.borderWidth !== "0px") {
      bucket(borderMap, "border", `${s.borderWidth} ${s.borderStyle} ${toHex(s.borderColor)}`, el);
    }

    // Section heuristic: <section>, <header>, <footer>, or large elements with big vertical padding
    const tag = el.tagName.toLowerCase();
    const pt = parseFloat(s.paddingTop);
    const pb = parseFloat(s.paddingBottom);
    if (tag === "section" || tag === "header" || tag === "footer" || (pt + pb >= 60 && el.getBoundingClientRect().width >= 600)) {
      sections.push({
        selector: sig(el),
        tag,
        paddingTop: s.paddingTop,
        paddingBottom: s.paddingBottom,
        backgroundColor: toHex(s.backgroundColor) || "transparent",
        width: Math.round(el.getBoundingClientRect().width),
      });
    }

    // Container heuristic: widest element with max-width set and centered margins
    if (s.maxWidth && s.maxWidth !== "none") {
      const mw = parseFloat(s.maxWidth);
      const r = el.getBoundingClientRect();
      if (mw >= 800 && r.width > containerMax) {
        containerMax = r.width;
        containerSel = sig(el);
      }
    }

    // Header heuristic: sticky/fixed at top
    if ((s.position === "sticky" || s.position === "fixed") && el.getBoundingClientRect().top <= 5) {
      if (!headerInfo) {
        headerInfo = {
          selector: sig(el),
          height: Math.round(el.getBoundingClientRect().height),
          sticky: s.position,
          backgroundColor: toHex(s.backgroundColor) || "transparent",
        };
      }
    }

    for (const child of el.children) walk(child);
  };

  walk(document.body);

  // Component heuristics
  const components = { buttons: [], cards: [], inputs: [], nav: [], footer: [], badges: [] };
  const all = document.querySelectorAll("button, a, input, textarea, [role='button'], .card, [class*='card'], [class*='badge'], [class*='pill'], nav, footer");
  for (const el of all) {
    if (!isVis(el)) continue;
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const tag = el.tagName.toLowerCase();
    const isBtn = tag === "button" || el.getAttribute("role") === "button" || s.cursor === "pointer";
    if (isBtn && r.height >= 20 && r.height <= 80) {
      components.buttons.push({
        selector: sig(el),
        text: (el.innerText || "").trim().slice(0, 40),
        backgroundColor: toHex(s.backgroundColor) || "transparent",
        color: toHex(s.color),
        borderRadius: s.borderRadius,
        height: Math.round(r.height),
        width: Math.round(r.width),
        padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        border: `${s.borderWidth} ${s.borderStyle} ${toHex(s.borderColor) || "transparent"}`,
      });
    }
    if (tag === "input" || tag === "textarea") {
      components.inputs.push({
        selector: sig(el),
        type: el.getAttribute("type") || tag,
        backgroundColor: toHex(s.backgroundColor) || "transparent",
        color: toHex(s.color),
        borderRadius: s.borderRadius,
        height: Math.round(r.height),
        padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        border: `${s.borderWidth} ${s.borderStyle} ${toHex(s.borderColor) || "transparent"}`,
      });
    }
    if ((el.className && typeof el.className === "string" && /card|panel|tile|surface/i.test(el.className)) || (parseFloat(s.borderRadius) >= 6 && r.width >= 100 && r.height >= 80 && toHex(s.backgroundColor) && toHex(s.backgroundColor) !== toHex(getComputedStyle(document.body).backgroundColor))) {
      components.cards.push({
        selector: sig(el),
        backgroundColor: toHex(s.backgroundColor) || "transparent",
        borderRadius: s.borderRadius,
        padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
        width: Math.round(r.width),
        height: Math.round(r.height),
        border: `${s.borderWidth} ${s.borderStyle} ${toHex(s.borderColor) || "transparent"}`,
      });
    }
    if ((el.className && typeof el.className === "string" && /badge|pill|tag|chip/i.test(el.className))) {
      components.badges.push({
        selector: sig(el),
        text: (el.innerText || "").trim().slice(0, 30),
        backgroundColor: toHex(s.backgroundColor) || "transparent",
        color: toHex(s.color),
        borderRadius: s.borderRadius,
        padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
        textTransform: s.textTransform,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
      });
    }
    if (tag === "nav") {
      components.nav.push({
        selector: sig(el),
        height: Math.round(r.height),
        backgroundColor: toHex(s.backgroundColor) || "transparent",
        position: s.position,
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
      });
    }
    if (tag === "footer") {
      components.footer.push({
        selector: sig(el),
        backgroundColor: toHex(s.backgroundColor) || "transparent",
        color: toHex(s.color),
        padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
      });
    }
  }

  // Dedupe + sort
  const entries = (m) => Array.from(m.values())
    .map((e) => ({ ...e, samples: Array.from(e.samples) }))
    .sort((a, b) => b.count - a.count);

  const typeEntries = Array.from(typeMap.values())
    .map((e) => ({ ...e, samples: Array.from(e.samples) }))
    .sort((a, b) => parseFloat(b.fontSize) - parseFloat(a.fontSize));

  return {
    url: location.href,
    title: document.title,
    viewport: { w: window.innerWidth, h: window.innerHeight },
    fonts: entries(fontMap).slice(0, 12),
    typeScale: typeEntries.slice(0, 25),
    colors: entries(colorMap).slice(0, 40),
    radii: entries(radiusMap).slice(0, 20),
    paddings: entries(padMap).slice(0, 30),
    borders: entries(borderMap).slice(0, 20),
    container: containerSel ? { maxWidth: Math.round(containerMax), selector: containerSel } : null,
    header: headerInfo,
    sections: sections.slice(0, 30),
    components: {
      buttons: components.buttons.slice(0, 15),
      cards: components.cards.slice(0, 15),
      inputs: components.inputs.slice(0, 10),
      nav: components.nav.slice(0, 5),
      footer: components.footer.slice(0, 5),
      badges: components.badges.slice(0, 15),
    },
  };
}
