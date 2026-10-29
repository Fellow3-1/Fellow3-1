// The opening window: a photograph of Nairobi's light-trail highways starts
// as a centred window and opens to full-bleed over one screen of scroll,
// handing the page from type to picture. Scroll-linked where supported
// (locked to the scrollbar, linear); otherwise and under reduced motion it
// is simply a full-bleed figure with its line.
export default function Opening() {
  return (
    <section className="opening" aria-label="Where I build from">
      <div className="opening__stage">
        <img
          src="assets/window-nairobi.jpg"
          alt="Nairobi's highways at night, drawn in ribbons of light"
          width="1376"
          height="768"
          loading="lazy"
          decoding="async"
        />
        <p className="opening__line">From Nairobi, for anywhere.</p>
      </div>
    </section>
  );
}
