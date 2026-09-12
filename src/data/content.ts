export const company = {
  name: 'Shoresafe Services Ltd',
  tagline: 'Protecting Lives at Sea',
  subtitle: 'Marine & Offshore Safety, Firefighting & Asset Integrity Solutions',
  cac: 'RC 1419732',
  established: 2019,
  address: '54 Off Ordinance Road, Trans-Amadi Layout, Port Harcourt, Rivers State',
  addressAlt: 'Glorylight Estate, Iriebie, Obio Akpor, Rivers State',
  phones: ['+234 813 601 1840', '+234 703 227 1125', '+234 806 170 8645'],
  emails: ['operations@shoresafeservices.com', 'enquire.shoresafe@gmail.com'],
  hours: 'Mon–Fri: 8:00 AM – 5:00 PM',
}

export const stats = [
  { value: 7, suffix: '+', label: 'Years of Excellence' },
  { value: 3, suffix: '', label: 'ISO Certifications' },
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 8, suffix: '+', label: 'Major Clients' },
]

export const services = [
  {
    id: 'lsa',
    number: '01',
    title: 'Life-Saving Appliances (LSA)',
    description: 'Full inspection, servicing, load testing, and recertification of liferafts, lifeboats, rescue boats, and davit launch systems.',
    image: '/images/liferafts.jpg',
    items: [
      'Survival Craft: Liferafts, Lifeboats, Rescue Boats',
      'Personal Safety Gear: Life Jackets, Immersion Suits',
      'Load testing and statutory recertification',
    ],
  },
  {
    id: 'ffe',
    number: '02',
    title: 'Fire Fighting Equipment (FFE)',
    description: 'Turnkey testing and servicing of CO₂ systems, fire pumps, SCBA units, EEBDs, fire extinguishers, and detection systems.',
    image: '/images/service-fire-extinguishers.jpg',
    items: [
      'Portable & wheeled fire extinguishers',
      'Engine Room Fixed CO₂ suppression systems',
      'SCBA units, EEBDs & Medical Oxygen Cylinders',
      'Fire detection systems and alarm networks',
    ],
  },
  {
    id: 'marine',
    number: '03',
    title: 'Marine, NDT & Industrial',
    description: 'Statutory marine surveys, non-destructive testing, vessel modifications, fabrications, and tank cleaning services.',
    image: '/images/service-fabrication.jpg',
    items: [
      'Statutory marine surveys & vessel registrations',
      'Non-Destructive Testing (NDT)',
      'Vessel repairs, modifications & fabrications',
      'Tank and barge cleaning services',
    ],
  },
  {
    id: 'platform',
    number: '04',
    title: 'Platform Revamp',
    description: 'Onshore and offshore platform upgrades — modifying, upgrading, repairing or extending existing facilities.',
    image: '/images/service-fabrication.jpg',
    items: [
      'Engineering assessment & modifications',
      'Fabrication & installation',
      'Testing & commissioning',
      'Project management & QA/QC',
    ],
  },
  {
    id: 'om',
    number: '05',
    title: 'Operations & Maintenance',
    description: 'Operations and maintenance for oil and gas production facilities, keeping operations safe and efficient.',
    image: '/images/project-fieldwork.jpg',
    items: [
      'Facility safety audits & inspections',
      'Equipment maintenance schedules',
      'Safety equipment recertification',
      'Minimizing unplanned shutdowns',
    ],
  },
]

export const whyUs = [
  { icon: 'Shield', title: '100% Compliance', desc: 'Full regulatory compliance with NUPRC, NIMASA, NMDPRA, NCDMB, and SOLAS.' },
  { icon: 'Award', title: 'ISO Certified', desc: 'ISO 9001, 14001, and 45001 certified for quality, environment, and occupational health.' },
  { icon: 'Users', title: 'Expert Team', desc: 'OEM-trained technicians focused on quality and value-added service delivery.' },
  { icon: 'Target', title: 'Zero Harm', desc: 'Zero injuries, zero equipment damage, zero environmental impact — our HSE commitment.' },
]

export const certifications = [
  { code: '9001', title: 'ISO 9001:2015', desc: 'Quality Management System', icon: 'Award' },
  { code: '14001', title: 'ISO 14001:2015', desc: 'Environmental Management', icon: 'Leaf' },
  { code: '45001', title: 'ISO 45001:2018', desc: 'Occupational Health & Safety', icon: 'ShieldCheck' },
]

export const regulatory = ['NUPRC', 'NIMASA', 'NCDMB', 'NMDPRA', 'SOLAS', 'SON']

export const projects = [
  {
    title: 'Fire Extinguishers & Purposes',
    desc: 'Various & Major Types of Fire Extinguishers & its Purposes.',
    image: '/images/fire.jpg',
    tag: 'Fire Safety',
  },
  {
    title: 'Life Boat Maintenance',
    desc: 'Life Boat Shoresafe Provide Maintenance Services.',
    image: '/images/lifeboat.jpg',
    tag: 'Maintenance',
  },
  {
    title: 'Operations on a Rig',
    desc: 'SHORESAFE OPERATIONS STAFF ON A RIG ensuring strict safety compliance and integrity checks.',
    image: '/images/new-project-1.jpg',
    tag: 'Operations',
  },
  {
    title: 'Ladder & Gangway Construction',
    desc: 'Construction of a Pull-Up Ladder & Gangway between Two Close By Oil Production and FSOP Facilities.',
    image: '/images/new-project-2.jpg',
    tag: 'Construction',
  },
  {
    title: 'FFE Cylinders Recertification',
    desc: 'FFEs: 500kg Cylinders after complete Servicing, Recertification, Ready for Reinstallation at Client\'s Offshores Facility.',
    image: '/images/new-project-3.jpg',
    tag: 'Recertification',
  },
  {
    title: 'Anchor Winch Reconstruction',
    desc: 'Reconstruction & replacement of a damaged Anchor Winch. Picture show: from start to finish.',
    image: '/images/new-project-4.jpg',
    tag: 'Reconstruction',
  },
  {
    title: 'FFE Service Station Operations',
    desc: 'Completed Servicing & Recertification Cycle of the FFEs at SHORESAFE\'s FFE Service Station. Ready for Client\'s Pickup.',
    image: '/images/new-project-5.jpg',
    tag: 'Servicing',
  },
  {
    title: 'Crane Head Block Reconstruction',
    desc: 'Reconstruction & replacement of a damaged CRANE HEAD BLOCK. Picture show: from start to finish.',
    image: '/images/new-project-6.jpg',
    tag: 'Reconstruction',
  },
  {
    title: 'FPSO Mystras — OML 119',
    desc: 'Completed inspection, integrity testing, hydro-testing, and servicing of all Fire Fighting Equipment.',
    image: '/images/project-loadtest.jpg',
    tag: 'Completed',
  },
  {
    title: 'Funiwa Production Platform — OML 86 & 88',
    desc: 'Total facility revamp on all categories of Fire Fighting Equipment and Fire Suppression Devices.',
    image: '/images/gallery-1.jpg',
    tag: 'Completed',
  },
  {
    title: 'Oredo Producing Facilities — OML 111',
    desc: 'Inspection, integrity testing, hydro-testing, and servicing of all Fire Fighting Equipment categories.',
    image: '/images/gallery-3.jpg',
    tag: 'Completed',
  },
]

export const clients = [
  'Bourbon Interoil Nig. Ltd.',
  'Selective Marine Oil & Gas Ltd.',
  'Oando Energy Services Ltd (OES)',
  'Nembe Crude Oil Export Terminal Ltd',
  'TOTAL GAP Ltd.',
  'FINOA ENERGIES LTD.',
  'ABC MARITIME LTD',
  'Regional Maritime Operators',
]

export const gallery = [
  '/images/liferafts.jpg',
  '/images/fire.jpg',
  '/images/lifeboat.jpg',
  '/images/new-project-1.jpg',
  '/images/new-project-2.jpg',
  '/images/new-project-3.jpg',
  '/images/new-project-4.jpg',
  '/images/new-project-5.jpg',
  '/images/new-project-6.jpg',
  '/images/new-project-7.jpg',
  '/images/new-project-8.jpg',
  '/images/new-project-9.jpg',
  '/images/new-project-10.jpg',
  '/images/new-project-11.jpg',
  '/images/project-fieldwork.jpg',
]

export const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
]
