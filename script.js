/* ==========================================================================
   Johar Paint & Hardware — Site Script
   Covers: mobile nav, scroll reveal, business hours highlight,
   testimonial carousel (index), product catalogue + search/filter (products)
   ========================================================================== */

const WHATSAPP_NUMBER = '916202740091';

/* ---------------------------------------------------------------------
   Mobile navigation
--------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('mobile-open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('mobile-open');
      toggle.classList.remove('open');
    });
  });
}

/* ---------------------------------------------------------------------
   Scroll reveal
--------------------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------------
   Business hours — highlight today
--------------------------------------------------------------------- */
function initHoursHighlight() {
  const rows = document.querySelectorAll('.hours-row[data-day]');
  if (!rows.length) return;

  const today = new Date().getDay(); // 0 = Sunday
  rows.forEach((row) => {
    if (Number(row.dataset.day) === today) {
      row.classList.add('today');
    }
  });
}

/* ---------------------------------------------------------------------
   WhatsApp helper
--------------------------------------------------------------------- */
function whatsappBookingLink(productName) {
  const message = `Hello Johar Paint & Hardware, I am interested in ${productName}. Please share the available pack sizes, shades and final price.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ---------------------------------------------------------------------
   Reviews data + carousel (index.html)
--------------------------------------------------------------------- */
const REVIEWS = [
  { name: 'Rahul Kumar', text: 'Good product range and helpful service. It was easy to choose the right paint.' },
  { name: 'Amit Sahu', text: 'Good experience. The staff helped me understand which paint would work for my project.' },
  { name: 'Pankaj Verma', text: 'Found everything I needed for my house painting in one visit. Convenient location too.' },
  { name: 'Rakesh Singh', text: 'Bought Birla Opus paint here on recommendation and the finish came out really well.' },
  { name: 'Neha Sharma', text: 'Staff was patient with all my questions about shades and finishes. Appreciated the guidance.' },
  { name: 'Ankit Kumar', text: 'Decent prices and good variety of hardware items along with paints.' },
  { name: 'Suman Devi', text: 'Ordered paint for our shop renovation. Delivery and service were smooth.' },
  { name: 'Rajesh Kumar', text: 'One-stop shop for paints and hardware essentials near Hochar. Quite convenient.' },
  { name: 'Deepak Mahato', text: 'Helped me pick a waterproofing solution for my terrace. Working fine so far.' },
  { name: 'Vikash Kumar', text: 'Easy to enquire on WhatsApp and get quick replies about pricing.' },
  { name: 'Rohit Singh', text: 'Good quality putty and primer. My painter was satisfied with the products.' },
  { name: 'Priya Kumari', text: 'Nice collection of interior paint shades. Took time to explain the options.' },
  { name: 'Manoj Gupta', text: 'Reliable local store for paint and hardware needs. Will visit again.' },
  { name: 'Sanjay Kumar', text: 'Got genuine Birla Opus products at a fair price. Happy with the purchase.' },
  { name: 'Arjun Das', text: 'Helpful with picking the right roller and brush set for a small home project.' },
  { name: 'Nitesh Kumar', text: 'Good service overall, and the store had everything on my list.' },
  { name: 'Aman Verma', text: 'Appreciated the honest advice instead of just pushing the costliest option.' },
  { name: 'Ravi Kumar', text: 'Store is well organised and the staff know their products well.' },
  { name: 'Sunil Kumar', text: 'Quick WhatsApp booking made it easy to confirm stock before visiting.' },
  { name: 'Kunal Singh', text: 'Satisfied with the rustic finish product suggested for my living room wall.' },
];

function renderReviews() {
  const track = document.querySelector('.review-track');
  const dotsWrap = document.querySelector('.review-dots');
  if (!track || !dotsWrap) return;

  track.innerHTML = REVIEWS.map(
    (r) => `
    <div class="review-slide">
      <div class="review-card">
        <div class="review-stars">★★★★★</div>
        <p class="review-text">"${r.text}"</p>
        <div class="review-name">${r.name}</div>
      </div>
    </div>`
  ).join('');

  dotsWrap.innerHTML = REVIEWS.map(
    (_, i) => `<span class="review-dot${i === 0 ? ' active' : ''}" data-index="${i}"></span>`
  ).join('');

  let current = 0;
  const total = REVIEWS.length;
  const dots = dotsWrap.querySelectorAll('.review-dot');

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  document.querySelector('.review-arrow.prev')?.addEventListener('click', () => goTo(current - 1));
  document.querySelector('.review-arrow.next')?.addEventListener('click', () => goTo(current + 1));
  dots.forEach((d) => d.addEventListener('click', () => goTo(Number(d.dataset.index))));

  let autoSlide = setInterval(() => goTo(current + 1), 5000);
  const carousel = document.querySelector('.review-carousel');
  carousel?.addEventListener('mouseenter', () => clearInterval(autoSlide));
  carousel?.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => goTo(current + 1), 5000);
  });
}

/* ---------------------------------------------------------------------
   Product catalogue (products.html + featured products on index)
--------------------------------------------------------------------- */
const PRODUCTS = [
  { id: 1, name: 'Birla Opus Easy Clean Interior Emulsion', category: 'Interior Paint', price: 2499, desc: 'Smooth, washable interior emulsion for everyday walls.', img: 'https://picsum.photos/seed/opus-interior-1/500/400' },
  { id: 2, name: 'Birla Opus Premium Interior Emulsion', category: 'Interior Paint', price: 3299, desc: 'Rich finish emulsion for a premium interior look.', img: 'https://picsum.photos/seed/opus-interior-2/500/400' },
  { id: 3, name: 'Birla Opus Exterior Emulsion', category: 'Exterior Paint', price: 3499, desc: 'Durable exterior emulsion built to handle weather.', img: 'https://picsum.photos/seed/opus-exterior-1/500/400' },
  { id: 4, name: 'Birla Opus Weather Resistant Exterior Paint', category: 'Exterior Paint', price: 3799, desc: 'Extra protection exterior paint for long-lasting colour.', img: 'https://picsum.photos/seed/opus-exterior-2/500/400' },
  { id: 5, name: 'Birla Opus Rustic Finish', category: 'Rustic', price: 1899, desc: 'Textured rustic finish for an earthy, natural wall look.', img: 'https://picsum.photos/seed/opus-rustic-1/500/400' },
  { id: 6, name: 'Birla Opus Designer Rustic Finish', category: 'Rustic', price: 2299, desc: 'Designer-grade rustic texture for feature walls.', img: 'https://picsum.photos/seed/opus-rustic-2/500/400' },
  { id: 7, name: 'Birla Opus Efectra Decorative Finish', category: 'Decorative Finish', price: 2499, desc: 'Decorative finish for accent walls and statement spaces.', img: 'https://picsum.photos/seed/opus-decorative/500/400' },
  { id: 8, name: 'Birla Opus Wall Primer', category: 'Primer', price: 1399, desc: 'Interior wall primer for smoother, longer-lasting paint.', img: 'https://picsum.photos/seed/opus-primer-1/500/400' },
  { id: 9, name: 'Birla Opus Exterior Primer', category: 'Primer', price: 1599, desc: 'Weather-ready primer coat for exterior surfaces.', img: 'https://picsum.photos/seed/opus-primer-2/500/400' },
  { id: 10, name: 'Birla Opus Wall Putty', category: 'Putty', price: 899, desc: 'Smooth wall putty for an even base before painting.', img: 'https://picsum.photos/seed/opus-putty-1/500/400' },
  { id: 11, name: 'Birla Opus Waterproofing Solution', category: 'Waterproofing', price: 1799, desc: 'Waterproofing coat to protect walls from seepage.', img: 'https://picsum.photos/seed/opus-waterproof-1/500/400' },
  { id: 12, name: 'Interior Wall Putty', category: 'Putty', price: 799, desc: 'General-purpose putty for interior wall finishing.', img: 'https://picsum.photos/seed/putty-interior/500/400' },
  { id: 13, name: 'Exterior Wall Putty', category: 'Putty', price: 999, desc: 'Weather-resistant putty for exterior wall preparation.', img: 'https://picsum.photos/seed/putty-exterior/500/400' },
  { id: 14, name: 'Paint Roller Set', category: 'Accessories', price: 299, desc: 'Roller set for smooth, even paint application.', img: 'https://picsum.photos/seed/roller-set/500/400' },
  { id: 15, name: 'Premium Paint Brush Set', category: 'Accessories', price: 249, desc: 'Brush set for edges, trims and detail work.', img: 'https://picsum.photos/seed/brush-set/500/400' },
  { id: 16, name: 'Paint Tray', category: 'Accessories', price: 149, desc: 'Sturdy tray for convenient roller loading.', img: 'https://picsum.photos/seed/paint-tray/500/400' },
  { id: 17, name: 'Masking Tape', category: 'Accessories', price: 99, desc: 'Clean-edge masking tape for trims and borders.', img: 'https://picsum.photos/seed/masking-tape/500/400' },
  { id: 18, name: 'Sandpaper Pack', category: 'Hardware', price: 129, desc: 'Assorted sandpaper for surface preparation.', img: 'https://picsum.photos/seed/sandpaper-pack/500/400' },
  { id: 19, name: 'Wall Crack Filler', category: 'Hardware', price: 299, desc: 'Filler for cracks and small wall repairs before painting.', img: 'https://picsum.photos/seed/crack-filler/500/400' },
  { id: 20, name: 'Waterproofing Coat', category: 'Waterproofing', price: 1499, desc: 'Protective coat against damp and water damage.', img: 'https://picsum.photos/seed/waterproof-coat/500/400' },
];

const FEATURED_IDS = [1, 3, 5, 8, 10, 20];

const FALLBACK_IMG = 'https://picsum.photos/seed/paint-fallback/500/400';

function productCardHTML(p, compact = false) {
  return `
    <div class="product-card reveal" data-name="${p.name.toLowerCase()}" data-category="${p.category}">
      <div class="product-media">
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMG}';">
      </div>
      <div class="product-body">
        <div class="product-cat">${p.category}</div>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-price">
          <span class="from">Approx. Price</span>
          &#8377;${p.price.toLocaleString('en-IN')}
        </div>
        <div class="product-actions">
          <a class="btn btn-whatsapp btn-sm" target="_blank" rel="noopener" href="${whatsappBookingLink(p.name)}">Book on WhatsApp</a>
          <a class="btn btn-outline btn-sm" href="tel:+91${WHATSAPP_NUMBER.slice(2)}">Call Now</a>
        </div>
      </div>
    </div>`;
}

function renderFeaturedProducts() {
  const grid = document.querySelector('[data-featured-products]');
  if (!grid) return;
  const featured = PRODUCTS.filter((p) => FEATURED_IDS.includes(p.id));
  grid.innerHTML = featured.map((p) => productCardHTML(p)).join('');
  initScrollReveal();
}

function renderCatalogue() {
  const grid = document.querySelector('[data-product-grid]');
  if (!grid) return;

  const searchInput = document.querySelector('[data-product-search]');
  const chips = document.querySelectorAll('.filter-chip');
  const emptyState = document.querySelector('.empty-state');
  let activeCategory = 'All';

  function draw() {
    const term = (searchInput?.value || '').trim().toLowerCase();
    const filtered = PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.desc.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });

    grid.innerHTML = filtered.map((p) => productCardHTML(p)).join('');
    if (emptyState) emptyState.classList.toggle('show', filtered.length === 0);
    initScrollReveal();
  }

  searchInput?.addEventListener('input', draw);
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.dataset.category;
      draw();
    });
  });

  draw();
}

/* ---------------------------------------------------------------------
   Footer year
--------------------------------------------------------------------- */
function initCurrentYear() {
  const el = document.querySelector('[data-year]');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------------------
   Init
--------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHoursHighlight();
  renderReviews();
  renderFeaturedProducts();
  renderCatalogue();
  initScrollReveal();
  initCurrentYear();
});