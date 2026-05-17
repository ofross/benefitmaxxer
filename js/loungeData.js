/* ==========================================
   loungeData.js — Airport Lounge Database
   ========================================== */

'use strict';

/* ─── Lounge networks ────────────────────────────────────────────────────── */
const LOUNGE_NETWORKS = {
  priority_pass:  { name: 'Priority Pass',               color: '#1a3a6b', badge: 'PP'  },
  centurion:      { name: 'Amex Centurion Lounge',        color: '#006fcf', badge: 'CEN' },
  sky_club:       { name: 'Delta Sky Club',               color: '#e81932', badge: 'DSC' },
  united_club:    { name: 'United Club',                  color: '#005daa', badge: 'UC'  },
  admirals_club:  { name: 'AA Admirals Club',             color: '#bf1f2f', badge: 'ADM' },
  capital_one:    { name: 'Capital One Lounge',           color: '#d03027', badge: 'C1'  },
  sapphire_lounge:{ name: 'Chase Sapphire Lounge',        color: '#0f3460', badge: 'CSL' },
  escape_lounge:  { name: 'Escape Lounge',                color: '#6b21a8', badge: 'ESC' },
};

/* ─── Card → lounge access mapping ──────────────────────────────────────────
   Each entry: { network, label, unlimited, visitsPerYear?, notes?, guestPolicy }
─────────────────────────────────────────────────────────────────────────── */
const CARD_LOUNGE_ACCESS = {
  'chase-sapphire-reserve': [
    {
      network:     'priority_pass',
      label:       'Priority Pass Select (unlimited)',
      unlimited:   true,
      guestPolicy: 'Guests: $35/visit (free with Priority Pass prestige tier)',
    },
    {
      network:     'sapphire_lounge',
      label:       'Chase Sapphire Lounge (unlimited)',
      unlimited:   true,
      guestPolicy: '2 complimentary guests per visit',
    },
  ],

  'chase-united-club': [
    {
      network:     'united_club',
      label:       'United Club (unlimited)',
      unlimited:   true,
      guestPolicy: 'Immediate family or up to 2 guests free',
    },
  ],

  'amex-platinum': [
    {
      network:     'centurion',
      label:       'Amex Centurion Lounge (unlimited)',
      unlimited:   true,
      guestPolicy: 'Guests: $50/visit (free with $75k+ annual spend)',
    },
    {
      network:     'priority_pass',
      label:       'Priority Pass Select (unlimited)',
      unlimited:   true,
      guestPolicy: '2 guests free per visit',
    },
    {
      network:     'escape_lounge',
      label:       'Escape Lounge (unlimited)',
      unlimited:   true,
      guestPolicy: '2 guests free per visit',
    },
  ],

  'amex-delta-platinum': [
    {
      network:      'sky_club',
      label:        'Delta Sky Club (10 visits/year)',
      unlimited:    false,
      visitsPerYear: 10,
      notes:        'Visits reset each Medallion Year. Unlimited with $75k annual spend.',
      guestPolicy:  'Day passes purchasable at the door',
    },
  ],

  'amex-delta-reserve': [
    {
      network:      'sky_club',
      label:        'Delta Sky Club (15 visits/year)',
      unlimited:    false,
      visitsPerYear: 15,
      notes:        'Includes 4 guest passes. Unlimited with $75k annual spend.',
      guestPolicy:  '4 One-Time Guest Passes included',
    },
    {
      network:   'centurion',
      label:     'Amex Centurion Lounge (when flying Delta)',
      unlimited: false,
      notes:     'Must show same-day Delta boarding pass for access.',
      guestPolicy: 'Guests allowed; check current policy',
    },
    {
      network:   'escape_lounge',
      label:     'Escape Lounge (when flying Delta)',
      unlimited: false,
      notes:     'Must show same-day Delta boarding pass for access.',
      guestPolicy: 'Guests allowed',
    },
  ],

  'cap1-venture-x': [
    {
      network:     'priority_pass',
      label:       'Priority Pass (unlimited)',
      unlimited:   true,
      guestPolicy: '2 guests free per visit',
    },
    {
      network:     'capital_one',
      label:       'Capital One Lounge (unlimited)',
      unlimited:   true,
      guestPolicy: '2 guests free per visit',
    },
  ],

  'citi-aa-executive': [
    {
      network:     'admirals_club',
      label:       'AA Admirals Club (unlimited)',
      unlimited:   true,
      guestPolicy: 'Immediate family or up to 2 guests free',
    },
  ],
};

/* ─── Airport lounge database ────────────────────────────────────────────────
   Keyed by IATA code. Each lounge: { name, terminal, network }
   Priority Pass entries represent specific PP-accepting lounges (not every PP
   lounge worldwide — use prioritypass.com for the full live directory).
─────────────────────────────────────────────────────────────────────────── */
const AIRPORT_LOUNGES = {

  /* ── US Airports ─────────────────────────────────────────────────────── */

  ATL: {
    name: 'Hartsfield-Jackson Atlanta International',
    city: 'Atlanta, GA',
    lounges: [
      { name: 'Amex Centurion Lounge',   terminal: 'Concourse F',                network: 'centurion'     },
      { name: 'Delta Sky Club',          terminal: 'Concourse A',                network: 'sky_club'      },
      { name: 'Delta Sky Club',          terminal: 'Concourse B',                network: 'sky_club'      },
      { name: 'Delta Sky Club',          terminal: 'Concourse C',                network: 'sky_club'      },
      { name: 'Delta Sky Club',          terminal: 'International Terminal F',   network: 'sky_club'      },
      { name: 'American Airlines Admirals Club', terminal: 'Concourse D',        network: 'admirals_club' },
      { name: 'The Club at ATL',         terminal: 'Concourse D',                network: 'priority_pass' },
    ],
  },

  AUS: {
    name: 'Austin-Bergstrom International',
    city: 'Austin, TX',
    lounges: [
      { name: 'American Airlines Admirals Club', terminal: 'Barbara Jordan Terminal', network: 'admirals_club' },
      { name: 'United Club',             terminal: 'Barbara Jordan Terminal',    network: 'united_club'   },
      { name: 'The Club AUS',            terminal: 'Barbara Jordan Terminal',    network: 'priority_pass' },
    ],
  },

  BNA: {
    name: 'Nashville International',
    city: 'Nashville, TN',
    lounges: [
      { name: 'American Airlines Admirals Club', terminal: 'Concourse C', network: 'admirals_club' },
      { name: 'The Club BNA',            terminal: 'Concourse C',                network: 'priority_pass' },
    ],
  },

  BOS: {
    name: 'Boston Logan International',
    city: 'Boston, MA',
    lounges: [
      { name: 'Amex Centurion Lounge',   terminal: 'Terminal E',                 network: 'centurion'     },
      { name: 'Chase Sapphire Lounge',   terminal: 'Terminal E',                 network: 'sapphire_lounge'},
      { name: 'Delta Sky Club',          terminal: 'Terminal A',                 network: 'sky_club'      },
      { name: 'United Club',             terminal: 'Terminal B',                 network: 'united_club'   },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal B',         network: 'admirals_club' },
      { name: 'The Club BOS',            terminal: 'Terminal C',                 network: 'priority_pass' },
    ],
  },

  CLT: {
    name: 'Charlotte Douglas International',
    city: 'Charlotte, NC',
    lounges: [
      { name: 'American Airlines Admirals Club', terminal: 'Concourse B', network: 'admirals_club' },
      { name: 'American Airlines Admirals Club', terminal: 'Concourse E', network: 'admirals_club' },
      { name: 'Delta Sky Club',          terminal: 'Concourse B',                network: 'sky_club'      },
      { name: 'United Club',             terminal: 'Concourse E',                network: 'united_club'   },
    ],
  },

  DCA: {
    name: 'Ronald Reagan Washington National',
    city: 'Washington, DC',
    lounges: [
      { name: 'American Airlines Admirals Club', terminal: 'Concourse B/C', network: 'admirals_club' },
      { name: 'Delta Sky Club',          terminal: 'Concourse B/C',              network: 'sky_club'      },
      { name: 'United Club',             terminal: 'Concourse C',                network: 'united_club'   },
    ],
  },

  DEN: {
    name: 'Denver International',
    city: 'Denver, CO',
    lounges: [
      { name: 'Amex Centurion Lounge',   terminal: 'Concourse C',                network: 'centurion'     },
      { name: 'Capital One Lounge',      terminal: 'Concourse B',                network: 'capital_one'   },
      { name: 'Delta Sky Club',          terminal: 'Concourse B',                network: 'sky_club'      },
      { name: 'United Club',             terminal: 'Concourse B',                network: 'united_club'   },
      { name: 'United Club',             terminal: 'Concourse C',                network: 'united_club'   },
      { name: 'American Airlines Admirals Club', terminal: 'Concourse A',        network: 'admirals_club' },
      { name: 'The Club DEN',            terminal: 'Concourse B',                network: 'priority_pass' },
    ],
  },

  DFW: {
    name: 'Dallas/Fort Worth International',
    city: 'Dallas, TX',
    lounges: [
      { name: 'Amex Centurion Lounge',   terminal: 'Terminal D',                 network: 'centurion'     },
      { name: 'Capital One Lounge',      terminal: 'Terminal D',                 network: 'capital_one'   },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal A',         network: 'admirals_club' },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal B',         network: 'admirals_club' },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal C',         network: 'admirals_club' },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal D',         network: 'admirals_club' },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal E',         network: 'admirals_club' },
      { name: 'United Club',             terminal: 'Terminal E',                 network: 'united_club'   },
      { name: 'Delta Sky Club',          terminal: 'Terminal E',                 network: 'sky_club'      },
    ],
  },

  DTW: {
    name: 'Detroit Metropolitan Wayne County',
    city: 'Detroit, MI',
    lounges: [
      { name: 'Delta Sky Club',          terminal: 'McNamara Terminal, Concourse A', network: 'sky_club'  },
      { name: 'Delta Sky Club',          terminal: 'McNamara Terminal, Concourse C', network: 'sky_club'  },
      { name: 'Delta Sky Club',          terminal: 'McNamara International Terminal',network: 'sky_club'  },
      { name: 'United Club',             terminal: 'McNamara Terminal, Concourse C', network: 'united_club'},
    ],
  },

  EWR: {
    name: 'Newark Liberty International',
    city: 'Newark, NJ',
    lounges: [
      { name: 'United Club',             terminal: 'Terminal C',                 network: 'united_club'   },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal A',         network: 'admirals_club' },
      { name: 'Delta Sky Club',          terminal: 'Terminal B',                 network: 'sky_club'      },
      { name: 'The Club EWR',            terminal: 'Terminal A',                 network: 'priority_pass' },
    ],
  },

  HNL: {
    name: 'Daniel K. Inouye International',
    city: 'Honolulu, HI',
    lounges: [
      { name: 'Delta Sky Club',          terminal: 'Terminal 1',                 network: 'sky_club'      },
      { name: 'United Club',             terminal: 'Terminal 1',                 network: 'united_club'   },
      { name: 'PLUMERIA Lounge',         terminal: 'Overseas Terminal',          network: 'priority_pass' },
    ],
  },

  HOU: {
    name: 'Houston William P. Hobby',
    city: 'Houston, TX',
    lounges: [
      { name: 'Southwest Airlines The Getaway', terminal: 'Concourse B',         network: 'priority_pass' },
    ],
  },

  IAD: {
    name: 'Washington Dulles International',
    city: 'Washington, DC',
    lounges: [
      { name: 'Capital One Lounge',      terminal: 'Concourse E',                network: 'capital_one'   },
      { name: 'United Club',             terminal: 'Concourse B',                network: 'united_club'   },
      { name: 'United Club',             terminal: 'Concourse C',                network: 'united_club'   },
      { name: 'United Club',             terminal: 'Concourse D',                network: 'united_club'   },
      { name: 'American Airlines Admirals Club', terminal: 'Main Terminal',      network: 'admirals_club' },
      { name: 'Delta Sky Club',          terminal: 'Concourse A',                network: 'sky_club'      },
    ],
  },

  IAH: {
    name: 'George Bush Intercontinental',
    city: 'Houston, TX',
    lounges: [
      { name: 'United Club',             terminal: 'Terminal B',                 network: 'united_club'   },
      { name: 'United Club',             terminal: 'Terminal C',                 network: 'united_club'   },
      { name: 'United Club',             terminal: 'Terminal E',                 network: 'united_club'   },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal A',         network: 'admirals_club' },
      { name: 'Delta Sky Club',          terminal: 'Terminal D',                 network: 'sky_club'      },
    ],
  },

  JFK: {
    name: 'John F. Kennedy International',
    city: 'New York, NY',
    lounges: [
      { name: 'Amex Centurion Lounge',   terminal: 'Terminal 4',                 network: 'centurion'     },
      { name: 'Capital One Lounge',      terminal: 'Terminal 4',                 network: 'capital_one'   },
      { name: 'Chase Sapphire Lounge',   terminal: 'Terminal 4',                 network: 'sapphire_lounge'},
      { name: 'Delta Sky Club',          terminal: 'Terminal 4',                 network: 'sky_club'      },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 8',         network: 'admirals_club' },
      { name: 'United Club',             terminal: 'Terminal 7',                 network: 'united_club'   },
      { name: 'The Club at JFK',         terminal: 'Terminal 4',                 network: 'priority_pass' },
    ],
  },

  LAS: {
    name: 'Harry Reid International',
    city: 'Las Vegas, NV',
    lounges: [
      { name: 'Amex Centurion Lounge',   terminal: 'Terminal 3, Concourse D',    network: 'centurion'     },
      { name: 'Delta Sky Club',          terminal: 'Terminal 1, Concourse D',    network: 'sky_club'      },
      { name: 'United Club',             terminal: 'Terminal 3, Concourse C',    network: 'united_club'   },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 3, Concourse D', network: 'admirals_club' },
      { name: 'The Club LAS',            terminal: 'Terminal 3, Concourse D',    network: 'priority_pass' },
    ],
  },

  LAX: {
    name: 'Los Angeles International',
    city: 'Los Angeles, CA',
    lounges: [
      { name: 'Amex Centurion Lounge',   terminal: 'Tom Bradley International (TBIT)', network: 'centurion'     },
      { name: 'Delta Sky Club',          terminal: 'Terminal 3',                 network: 'sky_club'      },
      { name: 'United Club',             terminal: 'Terminal 7',                 network: 'united_club'   },
      { name: 'United Club',             terminal: 'Terminal 8',                 network: 'united_club'   },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 4',         network: 'admirals_club' },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 5',         network: 'admirals_club' },
      { name: 'The Club at LAX',         terminal: 'Terminal 1',                 network: 'priority_pass' },
      { name: 'Star Alliance Lounge',    terminal: 'Tom Bradley International (TBIT)', network: 'priority_pass' },
    ],
  },

  LGA: {
    name: 'LaGuardia Airport',
    city: 'New York, NY',
    lounges: [
      { name: 'Delta Sky Club',          terminal: 'Terminal C, Concourse D',    network: 'sky_club'      },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal B',         network: 'admirals_club' },
      { name: 'United Club',             terminal: 'Terminal C',                 network: 'united_club'   },
    ],
  },

  MCI: {
    name: 'Kansas City International',
    city: 'Kansas City, MO',
    lounges: [
      { name: 'The Club MCI',            terminal: 'Main Terminal',              network: 'priority_pass' },
    ],
  },

  MCO: {
    name: 'Orlando International',
    city: 'Orlando, FL',
    lounges: [
      { name: 'Delta Sky Club',          terminal: 'Airside B',                  network: 'sky_club'      },
      { name: 'United Club',             terminal: 'Airside B',                  network: 'united_club'   },
      { name: 'American Airlines Admirals Club', terminal: 'Airside A',          network: 'admirals_club' },
      { name: 'The Club MCO',            terminal: 'Airside B',                  network: 'priority_pass' },
    ],
  },

  MIA: {
    name: 'Miami International',
    city: 'Miami, FL',
    lounges: [
      { name: 'American Airlines Admirals Club', terminal: 'Concourse D', network: 'admirals_club' },
      { name: 'American Airlines Admirals Club', terminal: 'Concourse E', network: 'admirals_club' },
      { name: 'American Airlines Admirals Club', terminal: 'Concourse G', network: 'admirals_club' },
      { name: 'American Airlines Admirals Club', terminal: 'Concourse J', network: 'admirals_club' },
      { name: 'United Club',             terminal: 'Concourse G',                network: 'united_club'   },
      { name: 'Delta Sky Club',          terminal: 'Concourse F',                network: 'sky_club'      },
      { name: 'British Airways Lounge',  terminal: 'Concourse E',                network: 'priority_pass' },
    ],
  },

  MSP: {
    name: 'Minneapolis-St. Paul International',
    city: 'Minneapolis, MN',
    lounges: [
      { name: 'Delta Sky Club',          terminal: 'Terminal 1, Concourse G',    network: 'sky_club'      },
      { name: 'Delta Sky Club',          terminal: 'Terminal 1, Concourse F',    network: 'sky_club'      },
      { name: 'United Club',             terminal: 'Terminal 1, Concourse E',    network: 'united_club'   },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 1, Concourse G', network: 'admirals_club' },
    ],
  },

  ORD: {
    name: "Chicago O'Hare International",
    city: 'Chicago, IL',
    lounges: [
      { name: 'Amex Centurion Lounge',   terminal: 'Terminal 3, Concourse K',    network: 'centurion'     },
      { name: 'United Club',             terminal: 'Terminal 1, Concourse C',    network: 'united_club'   },
      { name: 'United Club',             terminal: 'Terminal 2, Concourse F',    network: 'united_club'   },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 3, Concourse H', network: 'admirals_club' },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 3, Concourse L', network: 'admirals_club' },
      { name: 'Delta Sky Club',          terminal: 'Terminal 2, Concourse H',    network: 'sky_club'      },
      { name: "The Club O'Hare",         terminal: 'Terminal 2, Concourse H',    network: 'priority_pass' },
    ],
  },

  PDX: {
    name: 'Portland International',
    city: 'Portland, OR',
    lounges: [
      { name: 'United Club',             terminal: 'Concourse E',                network: 'united_club'   },
      { name: 'Alaska Airlines Board Room', terminal: 'Concourse C',             network: 'priority_pass' },
      { name: 'The Club PDX',            terminal: 'Concourse D',                network: 'priority_pass' },
    ],
  },

  PHL: {
    name: 'Philadelphia International',
    city: 'Philadelphia, PA',
    lounges: [
      { name: 'American Airlines Admirals Club', terminal: 'Concourse A', network: 'admirals_club' },
      { name: 'American Airlines Admirals Club', terminal: 'Concourse B', network: 'admirals_club' },
      { name: 'American Airlines Admirals Club', terminal: 'Concourse C', network: 'admirals_club' },
      { name: 'United Club',             terminal: 'Concourse A',                network: 'united_club'   },
    ],
  },

  PHX: {
    name: 'Phoenix Sky Harbor International',
    city: 'Phoenix, AZ',
    lounges: [
      { name: 'Amex Centurion Lounge',   terminal: 'Terminal 4, Concourse B',    network: 'centurion'     },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 4, Concourse A', network: 'admirals_club' },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 4, Concourse B', network: 'admirals_club' },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 4, Concourse C', network: 'admirals_club' },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 4, Concourse D', network: 'admirals_club' },
      { name: 'Delta Sky Club',          terminal: 'Terminal 3',                 network: 'sky_club'      },
      { name: 'United Club',             terminal: 'Terminal 2',                 network: 'united_club'   },
    ],
  },

  RDU: {
    name: 'Raleigh-Durham International',
    city: 'Raleigh, NC',
    lounges: [
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 2', network: 'admirals_club' },
      { name: 'The Club RDU',            terminal: 'Terminal 2',                 network: 'priority_pass' },
    ],
  },

  SAN: {
    name: 'San Diego International',
    city: 'San Diego, CA',
    lounges: [
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 2', network: 'admirals_club' },
      { name: 'United Club',             terminal: 'Terminal 2',                 network: 'united_club'   },
      { name: 'The Club SAN',            terminal: 'Terminal 2',                 network: 'priority_pass' },
    ],
  },

  SEA: {
    name: 'Seattle-Tacoma International',
    city: 'Seattle, WA',
    lounges: [
      { name: 'Delta Sky Club',          terminal: 'S Concourse (International Connections)', network: 'sky_club' },
      { name: 'United Club',             terminal: 'Concourse C',                network: 'united_club'   },
      { name: 'American Airlines Admirals Club', terminal: 'Concourse C',        network: 'admirals_club' },
      { name: 'Alaska Airlines Board Room', terminal: 'Concourse C',             network: 'priority_pass' },
      { name: 'The Club SEA',            terminal: 'Concourse C',                network: 'priority_pass' },
    ],
  },

  SFO: {
    name: 'San Francisco International',
    city: 'San Francisco, CA',
    lounges: [
      { name: 'Amex Centurion Lounge',   terminal: 'Terminal 3',                 network: 'centurion'     },
      { name: 'United Club',             terminal: 'Terminal 3, Concourse F',    network: 'united_club'   },
      { name: 'United Club',             terminal: 'Terminal 3, Concourse G',    network: 'united_club'   },
      { name: 'Delta Sky Club',          terminal: 'Terminal 1',                 network: 'sky_club'      },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 2',         network: 'admirals_club' },
      { name: 'Virgin Atlantic Clubhouse', terminal: 'International Terminal G', network: 'priority_pass' },
      { name: 'Air France Lounge',       terminal: 'International Terminal A',   network: 'priority_pass' },
    ],
  },

  SLC: {
    name: 'Salt Lake City International',
    city: 'Salt Lake City, UT',
    lounges: [
      { name: 'Delta Sky Club',          terminal: 'Concourse C',                network: 'sky_club'      },
      { name: 'United Club',             terminal: 'Concourse C',                network: 'united_club'   },
      { name: 'Escape Lounge',           terminal: 'Concourse C',                network: 'escape_lounge' },
    ],
  },

  STL: {
    name: 'St. Louis Lambert International',
    city: 'St. Louis, MO',
    lounges: [
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 1', network: 'admirals_club' },
      { name: 'The Club STL',            terminal: 'Terminal 1',                 network: 'priority_pass' },
    ],
  },

  TPA: {
    name: 'Tampa International',
    city: 'Tampa, FL',
    lounges: [
      { name: 'Delta Sky Club',          terminal: 'Airside A',                  network: 'sky_club'      },
      { name: 'American Airlines Admirals Club', terminal: 'Airside C',          network: 'admirals_club' },
      { name: 'United Club',             terminal: 'Airside F',                  network: 'united_club'   },
    ],
  },

  /* ── International Airports ──────────────────────────────────────────── */

  AMS: {
    name: 'Amsterdam Schiphol',
    city: 'Amsterdam, Netherlands',
    lounges: [
      { name: 'No.1 Traveller Lounge',   terminal: 'Departure Hall 1',           network: 'priority_pass' },
      { name: 'KLM Crown Lounge',        terminal: 'Lounge 42',                  network: 'priority_pass' },
      { name: 'United Club',             terminal: 'Departure Hall 1',           network: 'united_club'   },
    ],
  },

  CDG: {
    name: 'Paris Charles de Gaulle',
    city: 'Paris, France',
    lounges: [
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 2A',        network: 'admirals_club' },
      { name: 'United Club',             terminal: 'Terminal 2E',                network: 'united_club'   },
      { name: 'Air France Lounge',       terminal: 'Terminal 2E',                network: 'priority_pass' },
      { name: 'No.1 Lounge',             terminal: 'Terminal 2E',                network: 'priority_pass' },
    ],
  },

  DXB: {
    name: 'Dubai International',
    city: 'Dubai, UAE',
    lounges: [
      { name: 'Marhaba Lounge',          terminal: 'Terminal 1',                 network: 'priority_pass' },
      { name: 'Marhaba Lounge',          terminal: 'Terminal 2',                 network: 'priority_pass' },
      { name: 'Marhaba Lounge',          terminal: 'Terminal 3',                 network: 'priority_pass' },
    ],
  },

  FRA: {
    name: 'Frankfurt Airport',
    city: 'Frankfurt, Germany',
    lounges: [
      { name: 'United Club',             terminal: 'Terminal 1, Concourse B',    network: 'united_club'   },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 1, Concourse Z', network: 'admirals_club' },
      { name: 'No.1 Business Lounge',    terminal: 'Terminal 1, Concourse B',    network: 'priority_pass' },
    ],
  },

  GRU: {
    name: 'São Paulo/Guarulhos International',
    city: 'São Paulo, Brazil',
    lounges: [
      { name: 'GRU Airport Premium Lounge', terminal: 'Terminal 3',              network: 'priority_pass' },
      { name: 'LATAM Lounge',            terminal: 'Terminal 3',                 network: 'priority_pass' },
    ],
  },

  HKG: {
    name: 'Hong Kong International',
    city: 'Hong Kong',
    lounges: [
      { name: 'Chase Sapphire Lounge by The Club', terminal: 'Terminal 1',      network: 'sapphire_lounge'},
      { name: 'BLOSSOM Lounge',          terminal: 'Terminal 1',                 network: 'priority_pass' },
      { name: 'Plaza Premium Lounge',    terminal: 'Terminal 1',                 network: 'priority_pass' },
      { name: 'United Club',             terminal: 'Terminal 1',                 network: 'united_club'   },
    ],
  },

  HND: {
    name: 'Tokyo Haneda International',
    city: 'Tokyo, Japan',
    lounges: [
      { name: 'Delta Sky Club',          terminal: 'International Terminal',     network: 'sky_club'      },
      { name: 'ANA SUITE LOUNGE',        terminal: 'International Terminal',     network: 'priority_pass' },
      { name: 'TIAT Sky Lounge',         terminal: 'International Terminal',     network: 'priority_pass' },
    ],
  },

  ICN: {
    name: 'Seoul Incheon International',
    city: 'Seoul, South Korea',
    lounges: [
      { name: 'Matina Lounge',           terminal: 'Terminal 1',                 network: 'priority_pass' },
      { name: 'Matina Lounge',           terminal: 'Terminal 2',                 network: 'priority_pass' },
      { name: 'United Club',             terminal: 'Terminal 1',                 network: 'united_club'   },
    ],
  },

  LHR: {
    name: 'London Heathrow',
    city: 'London, UK',
    lounges: [
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 3',         network: 'admirals_club' },
      { name: 'United Club',             terminal: 'Terminal 2',                 network: 'united_club'   },
      { name: 'Delta Sky Club',          terminal: 'Terminal 3',                 network: 'sky_club'      },
      { name: 'No.1 Traveller Lounge',   terminal: 'Terminal 3',                 network: 'priority_pass' },
      { name: 'Virgin Atlantic Clubhouse', terminal: 'Terminal 3',               network: 'priority_pass' },
    ],
  },

  MEX: {
    name: 'Mexico City International',
    city: 'Mexico City, Mexico',
    lounges: [
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 2',         network: 'admirals_club' },
      { name: 'United Club',             terminal: 'Terminal 1',                 network: 'united_club'   },
      { name: 'Sala Premier',            terminal: 'Terminal 2',                 network: 'priority_pass' },
    ],
  },

  NRT: {
    name: 'Tokyo Narita International',
    city: 'Tokyo, Japan',
    lounges: [
      { name: 'United Club',             terminal: 'Terminal 1',                 network: 'united_club'   },
      { name: 'American Airlines Admirals Club', terminal: 'Terminal 2',         network: 'admirals_club' },
      { name: 'Delta Sky Club',          terminal: 'Terminal 2',                 network: 'sky_club'      },
      { name: 'IASS Executive Lounge',   terminal: 'Terminal 1 & 2',             network: 'priority_pass' },
    ],
  },

  SIN: {
    name: 'Singapore Changi Airport',
    city: 'Singapore',
    lounges: [
      { name: 'SATS Premier Lounge',     terminal: 'Terminal 1',                 network: 'priority_pass' },
      { name: 'Ambassador Transit Lounge', terminal: 'Terminal 2',               network: 'priority_pass' },
      { name: 'SATS Premier Lounge',     terminal: 'Terminal 3',                 network: 'priority_pass' },
      { name: 'United Club',             terminal: 'Terminal 3',                 network: 'united_club'   },
    ],
  },

  SYD: {
    name: 'Sydney Kingsford Smith',
    city: 'Sydney, Australia',
    lounges: [
      { name: 'American Airlines Admirals Club', terminal: 'T1 International',   network: 'admirals_club' },
      { name: 'United Club',             terminal: 'T1 International',           network: 'united_club'   },
      { name: 'No.1 Traveller Lounge',   terminal: 'T1 International',           network: 'priority_pass' },
    ],
  },

  YVR: {
    name: 'Vancouver International',
    city: 'Vancouver, Canada',
    lounges: [
      { name: 'United Club',             terminal: 'International Terminal',     network: 'united_club'   },
      { name: 'Plaza Premium Lounge',    terminal: 'Domestic Terminal',          network: 'priority_pass' },
      { name: 'Plaza Premium Lounge',    terminal: 'International Terminal',     network: 'priority_pass' },
    ],
  },

  YYZ: {
    name: 'Toronto Pearson International',
    city: 'Toronto, Canada',
    lounges: [
      { name: 'United Club',             terminal: 'Terminal 1',                 network: 'united_club'   },
      { name: 'Air Canada Maple Leaf Lounge', terminal: 'Terminal 1',            network: 'priority_pass' },
      { name: 'Plaza Premium Lounge',    terminal: 'Terminal 1',                 network: 'priority_pass' },
      { name: 'Plaza Premium Lounge',    terminal: 'Terminal 3',                 network: 'priority_pass' },
    ],
  },

};
