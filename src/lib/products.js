/* The product range, in one place.
 *
 * `kicker` is the category a product is listed under; `desc` is that product's
 * own published description, copied from the lede of its page. Nothing here may
 * describe a product in words its own page does not already use — if a product
 * page's lede changes, change it here too.
 *
 * Both the Products index and the "Explore more products" row on every product
 * page read from this map, so a product is described the same way everywhere.
 *
 * `shot` is a real screenshot of that product. Two products have none, and
 * their entries have no `shot` rather than a stand-in: the card falls back to
 * the product's name, the same as their own pages do. Never point a `shot` at
 * artwork — the frame is a product shot and must not imply one that does not
 * exist.
 */
export const PRODUCTS = {
  vishful: {
    to: '/vishful',
    title: 'Vishful',
    kicker: 'Property & Co-Living Management',
    desc: 'A digital platform for managing properties, apartments, beds, tenants, and occupancy from a connected workspace.',
    shot: { src: '/assets/sol-vishful.jpg', alt: 'Vishful property management application', w: 572, h: 910 },
  },
  attendance: {
    to: '/vishful-attendance',
    title: 'Vishful Attendance',
    kicker: 'Face-Scan Workforce Attendance',
    desc: 'A mobile attendance application that uses the mobile camera for face-based employee attendance.',
    shot: { src: '/assets/sol-attendance.png', alt: 'Vishful Attendance mobile application', w: 1024, h: 682 },
  },
  'anvas-comet': {
    to: '/anvas-comet',
    title: 'Anvas Comet',
    kicker: 'Business Operations Platform',
    desc: 'A software platform designed to bring business operations into connected digital workflows.',
    shot: { src: '/assets/sol-comet.png', alt: 'Anvas Comet business operations platform', w: 773, h: 600 },
  },
  'anvas-logistics': {
    to: '/anvas-logistics',
    title: 'Anvas Logistics',
    kicker: 'Logistics Operations Platform',
    desc: 'A digital platform for managing logistics operations, shipments, consignments, and related workflows.',
    shot: { src: '/assets/sol-anvas-logistics.png', alt: 'Anvas Logistics platform', w: 1024, h: 682 },
  },
  fintech: {
    to: '/fintech-platform',
    title: 'FinTech Platform',
    kicker: 'Financial Technology Platform',
    desc: 'A digital platform for financial technology and related software workflows.',
    shot: { src: '/assets/sol-fintrack.png', alt: 'AnvasTech financial technology platform', w: 997, h: 627 },
  },
  'kubera-ai': {
    to: '/kubera-ai',
    title: 'Kubera AI',
    kicker: 'AI-Powered Trading & Strategy Platform',
    desc: 'An AI-focused platform for trading strategy development and market-related workflows.',
    shot: { src: '/assets/sol-kubera.png', alt: 'Kubera AI platform', w: 991, h: 611 },
  },
  elegal: {
    to: '/elegal',
    title: 'eLegal',
    kicker: 'AI-Powered Property Legal Intelligence',
    desc: 'A digital platform focused on using AI and document intelligence for property-related legal workflows.',
    shot: { src: '/assets/sol-elegal.png', alt: 'eLegal property legal intelligence platform', w: 1034, h: 693 },
  },
  'mla-calendar': {
    to: '/mla-calendar',
    title: 'MLA Calendar',
    kicker: 'Calendar & Constituency Management',
    desc: 'A digital platform designed around calendar and constituency-related activities.',
    shot: { src: '/assets/sol-mla-calendar.png', alt: 'MLA Calendar platform', w: 1016, h: 643 },
  },
  'ungal-pakkam': {
    to: '/ungal-pakkam',
    title: 'Ungal Pakkam – Manu System',
    kicker: 'Digital Platform for Public-Facing Engagement',
    desc: 'A digital platform designed to support the submission and management of public-facing requests or representations.',
  },
  'tn-ihip': {
    to: '/tn-ihip',
    title: 'eHealth / TN-IHIP',
    kicker: 'Digital Healthcare Platform',
    desc: 'A healthcare-focused digital platform supporting healthcare and OPD-related workflows.',
  },
};

/* Resolves the ids a page lists as related, in the order that page chose. */
export function relatedProducts(ids) {
  return ids.map((id) => {
    const product = PRODUCTS[id];
    if (!product) throw new Error(`Unknown product id: ${id}`);
    return { id, ...product };
  });
}
