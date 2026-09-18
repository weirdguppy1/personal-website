"use client";

import { useEffect, useRef } from "react";

const DOT_SIZE = 14;
const FOLLOW = 0.18; // lerp factor for the idle dot
const SPREAD_MS = 700; // "water filling" duration

// anything that reads as clickable
const INTERACTIVE =
  'a[href], button, [role="button"], summary, label[for], select, ' +
  'input:not([type="hidden"]), textarea, [tabindex]:not([tabindex="-1"]), ' +
  "[data-cursor-target]";

type Target = { el: Element; rect: DOMRect; radius: string; inline: boolean };

function readTarget(el: Element): Target {
  const cs = getComputedStyle(el);
  // border-radius shorthand keeps per-corner values, so pills/circles match
  const radius = [
    cs.borderTopLeftRadius,
    cs.borderTopRightRadius,
    cs.borderBottomRightRadius,
    cs.borderBottomLeftRadius,
  ].join(" ");
  // An inline element's rect is the union of its line boxes, so pinning the
  // clone to that width would re-wrap the text ("rice university" breaking
  // after "rice"). Those clones size to their own content instead.
  const inline = cs.display === "inline" && el.getClientRects().length === 1;

  return { el, rect: el.getBoundingClientRect(), radius, inline };
}

// Inherited text properties. The clone hangs off the cursor layer rather than
// the target's real parent, so these are the values it would otherwise lose —
// a text-xs link would come back at the layer's 16px and look enlarged.
// Non-inherited properties need no copying: the clone keeps its class list, so
// the page's own stylesheet still applies them.
const INHERITED = [
  "font",
  "letter-spacing",
  "word-spacing",
  "text-align",
  "text-transform",
  "text-indent",
  "white-space",
  "direction",
  "font-feature-settings",
  "font-variation-settings",
  "font-kerning",
  "text-rendering",
  "-webkit-font-smoothing",
] as const;

// radius that guarantees the circle covers every corner of the box
function coverRadius(rect: DOMRect, x: number, y: number) {
  const dx = Math.max(x, rect.width - x);
  const dy = Math.max(y, rect.height - y);
  return Math.hypot(dx, dy);
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // pointer-less / coarse pointers keep the native behavior
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot = dotRef.current!;
    const shell = shellRef.current!;
    const fill = fillRef.current!;
    const clone = cloneRef.current!;
    const layer = layerRef.current!;

    document.documentElement.classList.add("has-custom-cursor");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const spread = () => (reduced.matches ? 0 : SPREAD_MS);

    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;
    let target: Target | null = null;
    let raf = 0;

    const showDot = (visible: boolean) => {
      dot.style.opacity = visible ? "1" : "0";
    };

    // the fill and the recolored copy of the content share one wavefront
    const setClip = (value: string) => {
      fill.style.clipPath = value;
      clone.style.clipPath = value;
    };
    const setClipTransition = (value: string) => {
      fill.style.transition = value;
      clone.style.transition = value;
    };

    const sizeClone = (copy: HTMLElement, t: Target) => {
      if (t.inline) {
        copy.style.width = "max-content";
        copy.style.height = "auto";
        copy.style.whiteSpace = "nowrap";
        // the inline rect is the font box, so match the line box to it or the
        // copy's text sits a couple of pixels lower than the original
        copy.style.lineHeight = `${t.rect.height}px`;
      } else {
        copy.style.width = `${t.rect.width}px`;
        copy.style.height = `${t.rect.height}px`;
      }
    };

    // a copy of the element's own markup, drawn above the white fill so its
    // text and icons stay readable once the fill covers the original
    const mountClone = (t: Target) => {
      const copy = t.el.cloneNode(true) as HTMLElement;
      copy.removeAttribute("id");
      copy.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"));

      // getComputedStyle().cssText is empty in Chrome, so pin the inherited
      // values one by one
      const cs = getComputedStyle(t.el);
      for (const prop of INHERITED) {
        copy.style.setProperty(prop, cs.getPropertyValue(prop));
      }
      copy.classList.add("cursor-clone-node");
      copy.style.position = "absolute";
      copy.style.inset = "0 auto auto 0";
      copy.style.boxSizing = "border-box";
      sizeClone(copy, t);
      clone.replaceChildren(copy);
    };

    const paintShell = (t: Target) => {
      shell.style.transform = `translate3d(${t.rect.left}px, ${t.rect.top}px, 0)`;
      shell.style.width = `${t.rect.width}px`;
      shell.style.height = `${t.rect.height}px`;
      shell.style.borderRadius = t.radius;
      const copy = clone.firstElementChild as HTMLElement | null;
      if (copy) sizeClone(copy, t);
    };

    const enter = (t: Target) => {
      target = t;
      const x = mouseX - t.rect.left;
      const y = mouseY - t.rect.top;

      mountClone(t);
      paintShell(t);
      shell.style.opacity = "1";

      // start as a circle the size of the dot, sitting under the pointer
      setClipTransition("none");
      setClip(`circle(${DOT_SIZE / 2}px at ${x}px ${y}px)`);
      // force a reflow so the next value animates from here
      void fill.offsetWidth;
      setClipTransition(`clip-path ${spread()}ms cubic-bezier(0.22, 1, 0.36, 1)`);
      setClip(`circle(${coverRadius(t.rect, x, y)}px at ${x}px ${y}px)`);

      showDot(false);
    };

    const leave = () => {
      if (!target) return;
      const { rect } = target;
      const x = mouseX - rect.left;
      const y = mouseY - rect.top;
      target = null;

      // recede back toward the pointer, then hand off to the dot
      setClipTransition(`clip-path ${spread() * 0.6}ms cubic-bezier(0.4, 0, 0.6, 1)`);
      setClip(`circle(0px at ${x}px ${y}px)`);
      shell.style.opacity = "0";

      dotX = mouseX;
      dotY = mouseY;
      showDot(true);
    };

    const applyHit = (candidate: Element | null) => {
      let hit = candidate;
      // while a modal is open everything behind it is inert, so the card that
      // opened it must not stay filled underneath (or, once the layer is in the
      // top layer, on top of the modal)
      const modal = document.querySelector("dialog[open]");
      if (modal && hit && !modal.contains(hit)) hit = null;
      if (hit?.hasAttribute("data-cursor-ignore")) hit = null;

      if (hit === target?.el) return;
      if (target) leave();
      if (hit) enter(readTarget(hit));
    };

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      applyHit((e.target as Element | null)?.closest?.(INTERACTIVE) ?? null);
    };

    // the pointer can end up over a different element without moving — a modal
    // opening or closing under a still cursor — so re-test what is under it
    const resample = () => {
      const el = document.elementFromPoint(mouseX, mouseY);
      applyHit(el?.closest(INTERACTIVE) ?? null);
    };

    // Normally the layer is an ordinary fixed element. A <dialog> opened with
    // showModal() lives in the top layer, above every z-index, so while one is
    // open the layer joins the top layer too (as a manual popover) to stay on
    // top of it — and drops back out afterwards.
    const raise = () => {
      const modal = document.querySelector("dialog[open]");
      try {
        if (modal) {
          if (!layer.hasAttribute("popover")) layer.setAttribute("popover", "manual");
          layer.hidePopover();
          layer.showPopover();
        } else if (layer.hasAttribute("popover")) {
          layer.hidePopover();
          layer.removeAttribute("popover");
        }
      } catch {
        layer.removeAttribute("popover");
      }
    };

    // a dialog opening pushes itself above us; re-show to climb back on top,
    // then re-test what the (possibly motionless) pointer is now over
    const dialogs = new MutationObserver(() => {
      raise();
      requestAnimationFrame(resample);
    });
    dialogs.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["open"],
    });
    raise();

    // scrolling or resizing moves the element out from under the fill
    const resync = () => {
      if (!target) return;
      if (!target.el.isConnected) return leave();
      target = readTarget(target.el);
      paintShell(target);
    };

    const tick = () => {
      // the target can move under a still pointer — cards lift 2px on hover,
      // and the overlay has to ride along or it settles visibly off-centre
      if (target) {
        const r = target.el.getBoundingClientRect();
        const { rect } = target;
        if (
          r.top !== rect.top ||
          r.left !== rect.left ||
          r.width !== rect.width ||
          r.height !== rect.height
        ) {
          target = readTarget(target.el);
          paintShell(target);
        }
      }

      dotX += (mouseX - dotX) * FOLLOW;
      dotY += (mouseY - dotY) * FOLLOW;
      dot.style.transform = `translate3d(${dotX - DOT_SIZE / 2}px, ${dotY - DOT_SIZE / 2}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) {
        layer.style.opacity = "0";
        if (target) leave();
      }
    };
    const onOver = () => {
      layer.style.opacity = "1";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onOut);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("scroll", resync, { passive: true, capture: true });
    window.addEventListener("resize", resync);

    return () => {
      cancelAnimationFrame(raf);
      dialogs.disconnect();
      layer.removeAttribute("popover");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("scroll", resync, { capture: true });
      window.removeEventListener("resize", resync);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div ref={layerRef} className="cursor-layer" aria-hidden>
      <div ref={shellRef} className="cursor-shell">
        <div ref={fillRef} className="cursor-fill" />
        <div ref={cloneRef} className="cursor-clone" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
