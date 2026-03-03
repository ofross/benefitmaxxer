/* ==========================================
   data.js — Credit Card & Benefit Definitions
   ========================================== */

'use strict';

const CARDS = [

  /* ═══════════════════════════════════════
     CHASE — Premium / Travel
  ═══════════════════════════════════════ */
  {
    id: 'chase-sapphire-reserve',
    name: 'Sapphire Reserve',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 550,
    color: '#1a1a2e',
    popular: true,
    benefitsUrl: 'https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve',
    benefits: [
      {
        name: '$300 Annual Travel Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 300,
        monthlyValue: null,
        eligibleKeywords: ['airline', 'hotel', 'airbnb', 'vrbo', 'car rental', 'lyft', 'uber', 'taxi', 'train', 'amtrak', 'parking', 'toll', 'cruise', 'expedia', 'orbitz', 'booking.com', 'priceline', 'kayak', 'southwest', 'delta', 'united', 'american airlines', 'jetblue', 'spirit', 'frontier', 'hilton', 'marriott', 'hyatt', 'ihg', 'radisson', 'wyndham', 'best western', 'hertz', 'enterprise', 'avis', 'budget', 'national'],
        eligibleCategories: ['Travel', 'Airlines', 'Hotels', 'Car Rental', 'Taxis & Rideshares', 'Gas Stations'],
        description: 'Applies automatically to travel purchases each year'
      },
      {
        name: 'Global Entry / TSA PreCheck Credit ($100)',
        type: 'statement_credit',
        trackable: true,
        annualValue: 100,
        monthlyValue: null,
        eligibleKeywords: ['global entry', 'tsa precheck', 'nexus', 'cbp', 'trusted traveler'],
        eligibleCategories: ['Government Services'],
        description: 'Credit every 4 years for Global Entry ($100) or TSA PreCheck ($85)'
      },
      {
        name: '$5/Month DoorDash Credit',
        type: 'monthly_credit',
        trackable: true,
        annualValue: 60,
        monthlyValue: 5,
        eligibleKeywords: ['doordash', 'door dash'],
        eligibleCategories: ['Food & Drink', 'Restaurants'],
        description: '$5 monthly DoorDash statement credit (enrollment required)'
      },
      {
        name: 'DoorDash DashPass',
        type: 'membership',
        trackable: false,
        annualValue: 96,
        description: 'Free DashPass membership for card and authorized users'
      },
      {
        name: 'Lyft Pink Membership',
        type: 'membership',
        trackable: false,
        annualValue: 199,
        description: 'Free Lyft Pink All Access membership'
      },
      {
        name: 'Priority Pass Lounge Access',
        type: 'membership',
        trackable: false,
        annualValue: 429,
        description: 'Unlimited Priority Pass Select airport lounge access'
      }
    ]
  },

  {
    id: 'chase-sapphire-preferred',
    name: 'Sapphire Preferred',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 95,
    color: '#1e40af',
    popular: true,
    benefitsUrl: 'https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred',
    benefits: [
      {
        name: '$50 Annual Hotel Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 50,
        monthlyValue: null,
        eligibleKeywords: ['hotel', 'hilton', 'marriott', 'hyatt', 'ihg', 'wyndham', 'radisson', 'best western', 'motel', 'inn', 'resort', 'airbnb', 'vrbo'],
        eligibleCategories: ['Hotels', 'Travel'],
        description: 'Annual $50 credit toward hotel stays booked through Chase Travel'
      },
      {
        name: 'DoorDash DashPass',
        type: 'membership',
        trackable: false,
        annualValue: 96,
        description: 'Free DashPass membership'
      }
    ]
  },

  {
    id: 'chase-freedom-unlimited',
    name: 'Freedom Unlimited',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 0,
    color: '#1e3a5f',
    popular: true,
    benefitsUrl: 'https://creditcards.chase.com/cash-back-credit-cards/freedom/unlimited',
    benefits: [
      {
        name: '1.5% Cash Back on Everything',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.015, 'Dining': 0.03, 'Drugstore': 0.03, 'Travel': 0.05 },
        description: 'Minimum 1.5% on all purchases; 3% dining & drugstores; 5% travel via Chase'
      }
    ]
  },

  {
    id: 'chase-freedom-flex',
    name: 'Freedom Flex',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 0,
    color: '#1e3a5f',
    popular: true,
    benefitsUrl: 'https://creditcards.chase.com/cash-back-credit-cards/freedom/flex',
    benefits: [
      {
        name: '5% Rotating Categories Cash Back',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.01, 'Dining': 0.03, 'Drugstore': 0.03, 'Travel': 0.05 },
        description: '5% on rotating quarterly categories (up to $1,500); 3% dining & drugstores'
      }
    ]
  },

  {
    id: 'chase-amazon-prime',
    name: 'Amazon Prime Rewards Visa',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 0,
    color: '#ff9900',
    popular: true,
    benefitsUrl: 'https://www.chase.com/personal/credit-cards/amazon',
    benefits: [
      {
        name: '5% Back at Amazon & Whole Foods',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.01, 'Amazon': 0.05, 'Whole Foods': 0.05, 'Dining': 0.02, 'Drug Stores': 0.02, 'Gas Stations': 0.02, 'Transit': 0.02 },
        description: '5% at Amazon/Whole Foods (with Prime); 2% gas, restaurants, drugstores'
      }
    ]
  },

  {
    id: 'chase-united-explorer',
    name: 'United Explorer Card',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 95,
    color: '#005daa',
    popular: false,
    benefitsUrl: 'https://creditcards.chase.com/travel-credit-cards/united/explorer',
    benefits: [
      {
        name: 'First Checked Bag Free',
        type: 'membership',
        trackable: false,
        annualValue: 140,
        description: 'Free first checked bag on United flights for you and a companion'
      },
      {
        name: 'Global Entry / TSA PreCheck Credit ($100)',
        type: 'statement_credit',
        trackable: true,
        annualValue: 100,
        monthlyValue: null,
        eligibleKeywords: ['global entry', 'tsa precheck', 'nexus', 'cbp'],
        eligibleCategories: ['Government Services'],
        description: 'Up to $100 credit every 4 years'
      },
      {
        name: '2x Miles on United & Dining',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.01, 'Airlines': 0.02, 'Dining': 0.02, 'Hotels': 0.02 },
        description: 'Earn miles on all purchases'
      }
    ]
  },

  {
    id: 'chase-united-quest',
    name: 'United Quest Card',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 250,
    color: '#003087',
    popular: false,
    benefitsUrl: 'https://creditcards.chase.com/travel-credit-cards/united/quest',
    benefits: [
      {
        name: '$125 Annual United Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 125,
        monthlyValue: null,
        eligibleKeywords: ['united airlines', 'united.com'],
        eligibleCategories: ['Airlines'],
        description: '$125 credit toward United purchases each year'
      }
    ]
  },

  {
    id: 'chase-united-club',
    name: 'United Club Infinite Card',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 525,
    color: '#001f5b',
    popular: false,
    benefitsUrl: 'https://creditcards.chase.com/travel-credit-cards/united/club-infinite',
    benefits: [
      {
        name: 'United Club Membership',
        type: 'membership',
        trackable: false,
        annualValue: 650,
        description: 'Full United Club membership included'
      }
    ]
  },

  {
    id: 'chase-sw-priority',
    name: 'Southwest Priority',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 149,
    color: '#e31837',
    popular: false,
    benefitsUrl: 'https://creditcards.chase.com/travel-credit-cards/southwest-airlines/priority',
    benefits: [
      {
        name: '$75 Annual Southwest Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 75,
        monthlyValue: null,
        eligibleKeywords: ['southwest', 'southwest airlines'],
        eligibleCategories: ['Airlines'],
        description: '$75 credit toward Southwest purchases'
      },
      {
        name: '4 Upgraded Boardings/Year',
        type: 'membership',
        trackable: false,
        annualValue: 60,
        description: '4 upgraded boarding positions per year'
      }
    ]
  },

  {
    id: 'chase-hyatt',
    name: 'World of Hyatt Card',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 95,
    color: '#862633',
    popular: false,
    benefitsUrl: 'https://creditcards.chase.com/rewards-credit-cards/hyatt',
    benefits: [
      {
        name: 'Free Anniversary Night',
        type: 'free_night',
        trackable: false,
        annualValue: 150,
        description: '1 free night at Category 1-4 Hyatt property on card anniversary'
      }
    ]
  },

  {
    id: 'chase-ihg-premier',
    name: 'IHG Premier',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 99,
    color: '#006747',
    popular: false,
    benefitsUrl: 'https://creditcards.chase.com/rewards-credit-cards/ihg/premier',
    benefits: [
      {
        name: 'Free Anniversary Night',
        type: 'free_night',
        trackable: false,
        annualValue: 100,
        description: 'Free night at any IHG property (up to 40,000 pts) each anniversary'
      },
      {
        name: 'Global Entry / TSA PreCheck Credit ($100)',
        type: 'statement_credit',
        trackable: true,
        annualValue: 100,
        monthlyValue: null,
        eligibleKeywords: ['global entry', 'tsa precheck', 'nexus', 'cbp'],
        eligibleCategories: ['Government Services'],
        description: 'Up to $100 credit every 4 years'
      }
    ]
  },

  {
    id: 'chase-marriott-boundless',
    name: 'Marriott Bonvoy Boundless',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 95,
    color: '#8b0000',
    popular: false,
    benefitsUrl: 'https://creditcards.chase.com/rewards-credit-cards/marriott/boundless',
    benefits: [
      {
        name: 'Free Anniversary Night',
        type: 'free_night',
        trackable: false,
        annualValue: 150,
        description: 'Free night award (up to 35,000 pts) each card anniversary'
      }
    ]
  },

  {
    id: 'chase-british-airways',
    name: 'British Airways Visa',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 95,
    color: '#003399',
    popular: false,
    benefitsUrl: 'https://creditcards.chase.com/travel-credit-cards/british-airways',
    benefits: [
      {
        name: 'Travel Together Ticket',
        type: 'companion_cert',
        trackable: false,
        annualValue: 500,
        description: 'Earn a companion ticket when spending $30,000 in a year'
      }
    ]
  },

  /* ═══════════════════════════════════════
     CHASE — Basic / Cashback
  ═══════════════════════════════════════ */
  {
    id: 'chase-freedom-rise',
    name: 'Freedom Rise',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 0,
    color: '#3b82f6',
    popular: false,
    benefitsUrl: 'https://creditcards.chase.com/cash-back-credit-cards/freedom/rise',
    benefits: [
      { name: '1.5% Cash Back on Everything', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.015 }, description: '1.5% on all purchases' }
    ]
  },
  {
    id: 'chase-slate-edge',
    name: 'Slate Edge',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 0,
    color: '#6b7280',
    popular: false,
    benefitsUrl: 'https://creditcards.chase.com/credit-cards/slate-edge',
    benefits: [
      { name: '1% Cash Back', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01 }, description: '1% on all purchases' }
    ]
  },
  {
    id: 'chase-starbucks',
    name: 'Starbucks Rewards Visa',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 49,
    color: '#00704a',
    popular: false,
    benefitsUrl: 'https://creditcards.chase.com/rewards-credit-cards/starbucks',
    benefits: [
      { name: '3x Stars at Starbucks', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Starbucks': 0.03 }, description: 'Extra Stars on Starbucks purchases' }
    ]
  },
  {
    id: 'chase-sw-plus',
    name: 'Southwest Rapid Rewards Plus',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 69,
    color: '#e31837',
    popular: false,
    benefitsUrl: 'https://creditcards.chase.com/travel-credit-cards/southwest-airlines/plus',
    benefits: [
      { name: '2x Points on Southwest', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Airlines': 0.02 }, description: '2x points on Southwest; 1x elsewhere' }
    ]
  },
  {
    id: 'chase-sw-premier',
    name: 'Southwest Rapid Rewards Premier',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 99,
    color: '#c0392b',
    popular: false,
    benefitsUrl: 'https://creditcards.chase.com/travel-credit-cards/southwest-airlines/premier',
    benefits: [
      { name: '2x Points on Southwest', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Airlines': 0.02 }, description: '2x points on Southwest; 1x elsewhere' }
    ]
  },
  {
    id: 'chase-marriott-bold',
    name: 'Marriott Bonvoy Bold',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 0,
    color: '#7f1d1d',
    popular: false,
    benefitsUrl: 'https://creditcards.chase.com/rewards-credit-cards/marriott/bold',
    benefits: [
      { name: '3x Marriott Bonvoy Points', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Hotels': 0.03 }, description: '3x at Marriott; 2x travel; 1x elsewhere' }
    ]
  },

  /* ═══════════════════════════════════════
     AMEX — Premium
  ═══════════════════════════════════════ */
  {
    id: 'amex-platinum',
    name: 'The Platinum Card',
    issuer: 'Amex',
    network: 'Amex',
    annualFee: 695,
    color: '#a8a9ad',
    popular: true,
    benefitsUrl: 'https://www.americanexpress.com/us/credit-cards/card/platinum/',
    benefits: [
      {
        name: '$200 Hotel Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 200,
        monthlyValue: null,
        eligibleKeywords: ['fine hotels', 'hotel collection', 'amex travel hotel'],
        eligibleCategories: ['Hotels'],
        description: '$200 credit for prepaid hotels booked via Amex Travel'
      },
      {
        name: '$200 Airline Fee Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 200,
        monthlyValue: null,
        eligibleKeywords: ['airline fee', 'checked bag', 'seat upgrade', 'in-flight', 'inflight', 'change fee', 'cancellation fee', 'delta', 'united', 'american airlines', 'southwest', 'jetblue'],
        eligibleCategories: ['Airlines'],
        description: '$200 credit for incidental fees on one selected airline'
      },
      {
        name: '$240 Digital Entertainment Credit',
        type: 'monthly_credit',
        trackable: true,
        annualValue: 240,
        monthlyValue: 20,
        eligibleKeywords: ['disney+', 'hulu', 'espn+', 'peacock', 'audible', 'sirius', 'siriusxm', 'the new york times', 'nyt', 'wall street journal', 'wsj'],
        eligibleCategories: ['Streaming', 'Entertainment'],
        description: '$20/month toward Disney+, Hulu, ESPN+, Peacock, Audible, NYT, WSJ'
      },
      {
        name: '$200 Uber Cash',
        type: 'monthly_credit',
        trackable: true,
        annualValue: 200,
        monthlyValue: 15,
        eligibleKeywords: ['uber', 'uber eats'],
        eligibleCategories: ['Taxis & Rideshares', 'Restaurants'],
        description: '$15/month + $20 in December toward Uber/Uber Eats'
      },
      {
        name: '$199 CLEAR Plus Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 199,
        monthlyValue: null,
        eligibleKeywords: ['clear', 'clearme', 'clear plus'],
        eligibleCategories: ['Travel'],
        description: '$199 annual CLEAR Plus membership credit'
      },
      {
        name: '$189 CLEAR Plus Credit (alt)',
        type: 'statement_credit',
        trackable: false,
        annualValue: 189,
        description: 'CLEAR Plus membership (pricing may vary)'
      },
      {
        name: '$300 Equinox Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 300,
        monthlyValue: null,
        eligibleKeywords: ['equinox', 'equinox+'],
        eligibleCategories: ['Fitness'],
        description: '$300 toward Equinox memberships or Equinox+'
      },
      {
        name: 'Global Entry / TSA PreCheck Credit ($100)',
        type: 'statement_credit',
        trackable: true,
        annualValue: 100,
        monthlyValue: null,
        eligibleKeywords: ['global entry', 'tsa precheck', 'nexus', 'cbp'],
        eligibleCategories: ['Government Services'],
        description: 'Up to $100 every 4 years'
      },
      {
        name: 'Centurion Lounge Access',
        type: 'membership',
        trackable: false,
        annualValue: 500,
        description: 'Unlimited Centurion and Priority Pass lounge access'
      },
      {
        name: 'Walmart+ Membership',
        type: 'membership',
        trackable: false,
        annualValue: 155,
        description: 'Monthly Walmart+ membership credit'
      }
    ]
  },

  {
    id: 'amex-gold',
    name: 'American Express Gold',
    issuer: 'Amex',
    network: 'Amex',
    annualFee: 250,
    color: '#c9a84c',
    popular: true,
    benefitsUrl: 'https://www.americanexpress.com/us/credit-cards/card/gold-card/',
    benefits: [
      {
        name: '$120 Dining Credit',
        type: 'monthly_credit',
        trackable: true,
        annualValue: 120,
        monthlyValue: 10,
        eligibleKeywords: ['grubhub', 'seamless', 'the cheesecake factory', 'goldbelly', 'wine.com', 'milk bar', 'shake shack'],
        eligibleCategories: ['Restaurants', 'Dining'],
        description: '$10/month at Grubhub, Seamless, The Cheesecake Factory, Goldbelly, Wine.com, Milk Bar, Shake Shack'
      },
      {
        name: '$120 Uber Cash',
        type: 'monthly_credit',
        trackable: true,
        annualValue: 120,
        monthlyValue: 10,
        eligibleKeywords: ['uber', 'uber eats'],
        eligibleCategories: ['Taxis & Rideshares', 'Restaurants'],
        description: '$10/month toward Uber Cash (Uber/Uber Eats)'
      },
      {
        name: '$100 Resy Credit',
        type: 'semi_annual_credit',
        trackable: true,
        annualValue: 100,
        monthlyValue: null,
        eligibleKeywords: ['resy'],
        eligibleCategories: ['Restaurants', 'Dining'],
        description: '$50 credit every 6 months (Jan–Jun / Jul–Dec) at Resy restaurants'
      },
      {
        name: '$84 Dunkin\' Credit',
        type: 'monthly_credit',
        trackable: true,
        annualValue: 84,
        monthlyValue: 7,
        eligibleKeywords: ["dunkin", "dunkin'", "dunkin donuts"],
        eligibleCategories: ['Restaurants', 'Coffee Shops'],
        description: '$7/month at Dunkin\'  (enrollment required)'
      },
      {
        name: '4x Points at Restaurants',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.01, 'Restaurants': 0.04, 'Dining': 0.04, 'Grocery Stores': 0.04, 'Supermarkets': 0.04, 'Airlines': 0.03 },
        description: '4x at restaurants & U.S. supermarkets (up to $25k/yr); 3x flights'
      }
    ]
  },

  {
    id: 'amex-green',
    name: 'American Express Green',
    issuer: 'Amex',
    network: 'Amex',
    annualFee: 150,
    color: '#22863a',
    popular: false,
    benefitsUrl: 'https://www.americanexpress.com/us/credit-cards/card/amex-green-card/',
    benefits: [
      {
        name: '$199 CLEAR Plus Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 199,
        monthlyValue: null,
        eligibleKeywords: ['clear', 'clearme'],
        eligibleCategories: ['Travel'],
        description: '$199 toward CLEAR Plus membership'
      },
      {
        name: '$100 LoungeBuddy Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 100,
        monthlyValue: null,
        eligibleKeywords: ['loungebuddy', 'lounge buddy'],
        eligibleCategories: ['Travel'],
        description: '$100 toward lounge access via LoungeBuddy'
      },
      {
        name: '3x Points on Travel & Dining',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.01, 'Travel': 0.03, 'Airlines': 0.03, 'Hotels': 0.03, 'Restaurants': 0.03, 'Dining': 0.03 },
        description: '3x on travel, transit, and restaurants'
      }
    ]
  },

  {
    id: 'amex-blue-cash-preferred',
    name: 'Blue Cash Preferred',
    issuer: 'Amex',
    network: 'Amex',
    annualFee: 95,
    color: '#0ea5e9',
    popular: true,
    benefitsUrl: 'https://www.americanexpress.com/us/credit-cards/card/blue-cash-preferred/',
    benefits: [
      {
        name: '6% Cash Back at Supermarkets',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.01, 'Grocery Stores': 0.06, 'Supermarkets': 0.06, 'Streaming': 0.06, 'Gas Stations': 0.03, 'Transit': 0.03 },
        description: '6% at U.S. supermarkets (up to $6k/yr) & select streaming; 3% gas & transit'
      }
    ]
  },

  {
    id: 'amex-blue-cash-everyday',
    name: 'Blue Cash Everyday',
    issuer: 'Amex',
    network: 'Amex',
    annualFee: 0,
    color: '#38bdf8',
    popular: false,
    benefitsUrl: 'https://www.americanexpress.com/us/credit-cards/card/blue-cash-everyday/',
    benefits: [
      {
        name: '3% Cash Back at Supermarkets',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.01, 'Grocery Stores': 0.03, 'Supermarkets': 0.03, 'Gas Stations': 0.03, 'Online Retail': 0.03 },
        description: '3% at U.S. supermarkets (up to $6k/yr), U.S. online retail, and U.S. gas stations'
      }
    ]
  },

  {
    id: 'amex-delta-gold',
    name: 'Delta SkyMiles Gold',
    issuer: 'Amex',
    network: 'Amex',
    annualFee: 150,
    color: '#cc2529',
    popular: false,
    benefitsUrl: 'https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-gold-american-express-card/',
    benefits: [
      {
        name: '$200 Delta Flight Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 200,
        monthlyValue: null,
        eligibleKeywords: ['delta', 'delta air lines', 'delta.com'],
        eligibleCategories: ['Airlines'],
        description: '$200 statement credit toward Delta flights after $10,000 in purchases in a calendar year'
      },
      {
        name: '$100 Delta Stays Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 100,
        monthlyValue: null,
        eligibleKeywords: ['delta stays', 'deltastays'],
        eligibleCategories: ['Hotels', 'Travel'],
        description: 'Up to $100 annually toward prepaid hotels and vacation rentals booked through Delta Stays'
      },
      {
        name: 'Uber One Credit',
        type: 'monthly_credit',
        trackable: true,
        annualValue: 60,
        monthlyValue: 9.99,
        eligibleKeywords: ['uber one', 'uber'],
        eligibleCategories: ['Taxis & Rideshares'],
        description: 'Up to $9.99/month toward Uber One membership (up to 6 months; offer through 6/25/2026)'
      },
      {
        name: 'First Checked Bag Free',
        type: 'membership',
        trackable: false,
        annualValue: 140,
        description: 'Free first checked bag for cardholder and up to 8 companions on same Delta reservation'
      }
    ]
  },

  {
    id: 'amex-delta-platinum',
    name: 'Delta SkyMiles Platinum',
    issuer: 'Amex',
    network: 'Amex',
    annualFee: 350,
    color: '#a0a0a0',
    popular: false,
    benefitsUrl: 'https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-platinum-american-express-card/',
    benefits: [
      {
        name: '$200 Delta Flight Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 200,
        monthlyValue: null,
        eligibleKeywords: ['delta', 'delta air lines', 'delta.com'],
        eligibleCategories: ['Airlines'],
        description: '$200 statement credit toward Delta flights after $10,000 in purchases in a calendar year'
      },
      {
        name: '$150 Delta Stays Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 150,
        monthlyValue: null,
        eligibleKeywords: ['delta stays', 'deltastays'],
        eligibleCategories: ['Hotels', 'Travel'],
        description: 'Up to $150 annually toward prepaid hotels and vacation rentals booked through Delta Stays'
      },
      {
        name: '$10/Month Resy Dining Credit',
        type: 'monthly_credit',
        trackable: true,
        annualValue: 120,
        monthlyValue: 10,
        eligibleKeywords: ['resy'],
        eligibleCategories: ['Dining', 'Restaurants'],
        description: 'Up to $10/month at enrolled U.S. Resy restaurants (requires enrollment)'
      },
      {
        name: '$10/Month Rideshare Credit',
        type: 'monthly_credit',
        trackable: true,
        annualValue: 120,
        monthlyValue: 10,
        eligibleKeywords: ['uber', 'lyft', 'rideshare'],
        eligibleCategories: ['Taxis & Rideshares'],
        description: 'Up to $10/month toward eligible rideshare purchases (requires enrollment)'
      },
      {
        name: 'Uber One Credit',
        type: 'monthly_credit',
        trackable: true,
        annualValue: 120,
        monthlyValue: 9.99,
        eligibleKeywords: ['uber one', 'uber'],
        eligibleCategories: ['Taxis & Rideshares'],
        description: 'Up to $9.99/month toward Uber One membership (up to 12 months; offer through 6/25/2026)'
      },
      {
        name: 'Delta Sky Club Access (10 Visits)',
        type: 'membership',
        trackable: false,
        annualValue: 290,
        description: '10 Delta Sky Club visits per Medallion Year (as of Feb 2025); unlimited with $75k annual spend'
      },
      {
        name: 'Companion Certificate (Main Cabin)',
        type: 'companion_cert',
        trackable: false,
        annualValue: 400,
        description: 'Annual round-trip companion certificate valid for Delta Main Cabin; US, Mexico, Caribbean, Central America'
      },
      {
        name: 'Global Entry / TSA PreCheck Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 120,
        monthlyValue: null,
        eligibleKeywords: ['global entry', 'tsa precheck', 'nexus', 'cbp', 'trusted traveler'],
        eligibleCategories: ['Government Services'],
        description: 'Up to $120 for Global Entry every 4 years, or up to $85 for TSA PreCheck every 4.5 years'
      },
      {
        name: 'First Checked Bag Free',
        type: 'membership',
        trackable: false,
        annualValue: 140,
        description: 'Free first checked bag for cardholder and up to 8 companions on same Delta reservation'
      },
      {
        name: '$2,500 MQD Headstart',
        type: 'membership',
        trackable: false,
        annualValue: 75,
        description: '$2,500 Medallion Qualifying Dollars deposited annually toward Silver Medallion status'
      }
    ]
  },

  {
    id: 'amex-delta-reserve',
    name: 'Delta SkyMiles Reserve',
    issuer: 'Amex',
    network: 'Amex',
    annualFee: 650,
    color: '#2c2c2c',
    popular: false,
    benefitsUrl: 'https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-reserve-american-express-card/',
    benefits: [
      {
        name: '$200 Delta Flight Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 200,
        monthlyValue: null,
        eligibleKeywords: ['delta', 'delta air lines', 'delta.com'],
        eligibleCategories: ['Airlines'],
        description: '$200 statement credit toward Delta flights after $10,000 in purchases in a calendar year'
      },
      {
        name: '$150 Delta Stays Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 150,
        monthlyValue: null,
        eligibleKeywords: ['delta stays', 'deltastays'],
        eligibleCategories: ['Hotels', 'Travel'],
        description: 'Up to $150 annually toward prepaid hotels and vacation rentals booked through Delta Stays'
      },
      {
        name: '$20/Month Resy Dining Credit',
        type: 'monthly_credit',
        trackable: true,
        annualValue: 240,
        monthlyValue: 20,
        eligibleKeywords: ['resy'],
        eligibleCategories: ['Dining', 'Restaurants'],
        description: 'Up to $20/month at enrolled U.S. Resy restaurants (requires enrollment)'
      },
      {
        name: '$10/Month Rideshare Credit',
        type: 'monthly_credit',
        trackable: true,
        annualValue: 120,
        monthlyValue: 10,
        eligibleKeywords: ['uber', 'lyft', 'rideshare'],
        eligibleCategories: ['Taxis & Rideshares'],
        description: 'Up to $10/month toward eligible rideshare purchases (requires enrollment)'
      },
      {
        name: 'Uber One Credit',
        type: 'monthly_credit',
        trackable: true,
        annualValue: 120,
        monthlyValue: 9.99,
        eligibleKeywords: ['uber one', 'uber'],
        eligibleCategories: ['Taxis & Rideshares'],
        description: 'Up to $9.99/month toward Uber One membership (up to 12 months; offer through 6/25/2026)'
      },
      {
        name: 'Delta Sky Club Access (15 Visits)',
        type: 'membership',
        trackable: false,
        annualValue: 435,
        description: '15 Delta Sky Club visits per Medallion Year (as of Feb 2025); unlimited with $75k annual spend. Includes 4 One-Time Guest Passes'
      },
      {
        name: 'Centurion & Escape Lounge Access',
        type: 'membership',
        trackable: false,
        annualValue: 200,
        description: 'Complimentary access to Amex Centurion Lounges and Escape Lounges when flying Delta on the Reserve card'
      },
      {
        name: 'Companion Certificate (First/Comfort+/Main)',
        type: 'companion_cert',
        trackable: false,
        annualValue: 800,
        description: 'Annual round-trip companion certificate valid for First Class, Delta Comfort+, or Main Cabin; US, Mexico, Caribbean, Central America'
      },
      {
        name: 'Global Entry / TSA PreCheck Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 120,
        monthlyValue: null,
        eligibleKeywords: ['global entry', 'tsa precheck', 'nexus', 'cbp', 'trusted traveler'],
        eligibleCategories: ['Government Services'],
        description: 'Up to $120 for Global Entry every 4 years, or up to $85 for TSA PreCheck every 4 years'
      },
      {
        name: 'First Checked Bag Free',
        type: 'membership',
        trackable: false,
        annualValue: 140,
        description: 'Free first checked bag for cardholder and up to 8 companions on same Delta reservation'
      },
      {
        name: '$2,500 MQD Headstart',
        type: 'membership',
        trackable: false,
        annualValue: 75,
        description: '$2,500 Medallion Qualifying Dollars deposited annually, plus $1 MQD earned per $10 in purchases'
      }
    ]
  },

  {
    id: 'amex-hilton-surpass',
    name: 'Hilton Honors Surpass',
    issuer: 'Amex',
    network: 'Amex',
    annualFee: 150,
    color: '#003087',
    popular: false,
    benefitsUrl: 'https://www.americanexpress.com/us/credit-cards/card/hilton-honors-american-express-surpass-card/',
    benefits: [
      {
        name: '$200 Hilton Credit (Quarterly)',
        type: 'quarterly_credit',
        trackable: true,
        annualValue: 200,
        monthlyValue: null,
        eligibleKeywords: ['hilton', 'doubletree', 'embassy suites', 'hampton inn', 'homewood', 'hampton', 'curio', 'waldorf', 'conrad'],
        eligibleCategories: ['Hotels'],
        description: '$50 per quarter (Q1–Q4) toward Hilton purchases'
      },
      {
        name: 'Complimentary Hilton Gold Status',
        type: 'membership',
        trackable: false,
        annualValue: 200,
        description: 'Automatic Hilton Honors Gold status'
      }
    ]
  },

  {
    id: 'amex-hilton-aspire',
    name: 'Hilton Honors Aspire',
    issuer: 'Amex',
    network: 'Amex',
    annualFee: 550,
    color: '#003580',
    popular: false,
    benefitsUrl: 'https://www.americanexpress.com/us/credit-cards/card/hilton-honors-american-express-aspire-card/',
    benefits: [
      {
        name: '$400 Hilton Resort Credit',
        type: 'semi_annual_credit',
        trackable: true,
        annualValue: 400,
        monthlyValue: null,
        eligibleKeywords: ['hilton resort', 'hilton', 'doubletree resort', 'waldorf astoria', 'curio'],
        eligibleCategories: ['Hotels'],
        description: '$200 every 6 months at Hilton Resorts'
      },
      {
        name: '$200 Flight Credit',
        type: 'quarterly_credit',
        trackable: true,
        annualValue: 200,
        monthlyValue: null,
        eligibleKeywords: ['airline', 'delta', 'united', 'american airlines', 'southwest', 'jetblue'],
        eligibleCategories: ['Airlines'],
        description: '$50 per quarter (Q1–Q4) toward airline purchases'
      },
      {
        name: 'Free Night Award',
        type: 'free_night',
        trackable: false,
        annualValue: 400,
        description: 'Annual free night at any Hilton worldwide'
      }
    ]
  },

  {
    id: 'amex-marriott-brilliant',
    name: 'Marriott Bonvoy Brilliant',
    issuer: 'Amex',
    network: 'Amex',
    annualFee: 650,
    color: '#8b0000',
    popular: false,
    benefitsUrl: 'https://www.americanexpress.com/us/credit-cards/card/marriott-bonvoy-brilliant/',
    benefits: [
      {
        name: '$300 Dining Credit',
        type: 'monthly_credit',
        trackable: true,
        annualValue: 300,
        monthlyValue: 25,
        eligibleKeywords: ['restaurant', 'dining', 'marriott restaurant', 'marriott dining'],
        eligibleCategories: ['Restaurants', 'Dining'],
        description: '$25/month toward restaurants worldwide'
      },
      {
        name: 'Free Night Award',
        type: 'free_night',
        trackable: false,
        annualValue: 400,
        description: 'Free night at Marriott properties up to 85,000 points'
      }
    ]
  },

  {
    id: 'amex-marriott-bevy',
    name: 'Marriott Bonvoy Bevy',
    issuer: 'Amex',
    network: 'Amex',
    annualFee: 250,
    color: '#991b1b',
    popular: false,
    benefitsUrl: 'https://www.americanexpress.com/us/credit-cards/card/marriott-bonvoy-bevy-american-express-card/',
    benefits: [
      {
        name: 'Free Night Award',
        type: 'free_night',
        trackable: false,
        annualValue: 200,
        description: 'Free night at Marriott properties up to 50,000 points after $15k spend'
      }
    ]
  },

  /* ═══════════════════════════════════════
     AMEX — Basic / Cashback
  ═══════════════════════════════════════ */
  {
    id: 'amex-everyday',
    name: 'Amex EveryDay',
    issuer: 'Amex',
    network: 'Amex',
    annualFee: 0,
    color: '#3b82f6',
    popular: false,
    benefitsUrl: 'https://www.americanexpress.com/us/credit-cards/card/amex-everyday-credit-card/',
    benefits: [
      { name: '2x Points at Supermarkets', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Grocery Stores': 0.02, 'Supermarkets': 0.02 }, description: '2x at U.S. supermarkets (up to $6k/yr); 1x elsewhere' }
    ]
  },
  {
    id: 'amex-everyday-preferred',
    name: 'Amex EveryDay Preferred',
    issuer: 'Amex',
    network: 'Amex',
    annualFee: 95,
    color: '#2563eb',
    popular: false,
    benefitsUrl: 'https://www.americanexpress.com/us/credit-cards/card/amex-everyday-preferred-credit-card/',
    benefits: [
      { name: '3x Points at Supermarkets', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Grocery Stores': 0.03, 'Supermarkets': 0.03, 'Gas Stations': 0.02 }, description: '3x at U.S. supermarkets; 2x gas; 1x elsewhere' }
    ]
  },
  {
    id: 'amex-delta-blue',
    name: 'Delta SkyMiles Blue',
    issuer: 'Amex',
    network: 'Amex',
    annualFee: 0,
    color: '#dc2626',
    popular: false,
    benefitsUrl: 'https://www.americanexpress.com/us/credit-cards/card/delta-skymiles-blue-american-express-card/',
    benefits: [
      { name: '2x Miles on Delta & Dining', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Airlines': 0.02, 'Restaurants': 0.02, 'Dining': 0.02 }, description: '2x on Delta purchases and worldwide dining; 1x on everything else' },
      { name: '20% In-Flight Savings', type: 'membership', trackable: false, annualValue: 50, description: '20% statement credit on eligible Delta in-flight purchases (food, beverages, audio headsets)' }
    ]
  },
  {
    id: 'amex-hilton-honors',
    name: 'Hilton Honors Amex',
    issuer: 'Amex',
    network: 'Amex',
    annualFee: 0,
    color: '#1d4ed8',
    popular: false,
    benefitsUrl: 'https://www.americanexpress.com/us/credit-cards/card/hilton-honors-card/',
    benefits: [
      { name: '7x Points at Hilton', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.03, 'Hotels': 0.07 }, description: '7x at Hilton; 5x grocery, gas, restaurants; 3x elsewhere' }
    ]
  },
  {
    id: 'amex-blue-business-cash',
    name: 'Blue Business Cash',
    issuer: 'Amex',
    network: 'Amex',
    annualFee: 0,
    color: '#0369a1',
    popular: false,
    benefitsUrl: 'https://www.americanexpress.com/us/credit-cards/card/blue-business-cash/',
    benefits: [
      { name: '2% Cash Back on Everything', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.02 }, description: '2% on all eligible purchases (up to $50k/yr)' }
    ]
  },

  /* ═══════════════════════════════════════
     CAPITAL ONE — Premium
  ═══════════════════════════════════════ */
  {
    id: 'cap1-venture-x',
    name: 'Venture X',
    issuer: 'Capital One',
    network: 'Visa',
    annualFee: 395,
    color: '#1a1a2e',
    popular: true,
    benefitsUrl: 'https://www.capitalone.com/credit-cards/venture-x/',
    benefits: [
      {
        name: '$300 Annual Travel Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 300,
        monthlyValue: null,
        eligibleKeywords: ['capital one travel', 'hotels.com', 'booking.com', 'expedia', 'flight', 'hotel'],
        eligibleCategories: ['Travel'],
        description: '$300 credit for travel booked through Capital One Travel'
      },
      {
        name: 'Global Entry / TSA PreCheck Credit ($100)',
        type: 'statement_credit',
        trackable: true,
        annualValue: 100,
        monthlyValue: null,
        eligibleKeywords: ['global entry', 'tsa precheck', 'nexus', 'cbp'],
        eligibleCategories: ['Government Services'],
        description: 'Up to $100 credit every 4 years'
      },
      {
        name: 'Priority Pass Lounge Access',
        type: 'membership',
        trackable: false,
        annualValue: 429,
        description: 'Unlimited Priority Pass and Capital One Lounge access'
      },
      {
        name: '10x Miles on Hotels & Car Rentals via Cap1',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.02, 'Hotels': 0.10, 'Car Rental': 0.10, 'Airlines': 0.05 },
        description: '10x on hotels/car rentals via Capital One Travel; 5x flights; 2x everywhere'
      }
    ]
  },

  {
    id: 'cap1-venture',
    name: 'Venture Rewards',
    issuer: 'Capital One',
    network: 'Visa',
    annualFee: 95,
    color: '#1e293b',
    popular: true,
    benefitsUrl: 'https://www.capitalone.com/credit-cards/venture/',
    benefits: [
      {
        name: 'Global Entry / TSA PreCheck Credit ($100)',
        type: 'statement_credit',
        trackable: true,
        annualValue: 100,
        monthlyValue: null,
        eligibleKeywords: ['global entry', 'tsa precheck', 'nexus', 'cbp'],
        eligibleCategories: ['Government Services'],
        description: 'Up to $100 every 4 years'
      },
      {
        name: '2x Miles on Everything',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.02, 'Hotels': 0.05, 'Car Rental': 0.05 },
        description: '5x on hotels/rentals via Capital One Travel; 2x everywhere'
      }
    ]
  },

  {
    id: 'cap1-savor',
    name: 'Savor Cash Rewards',
    issuer: 'Capital One',
    network: 'Visa',
    annualFee: 95,
    color: '#7c3aed',
    popular: false,
    benefitsUrl: 'https://www.capitalone.com/credit-cards/savor/',
    benefits: [
      {
        name: '4% Cash Back on Dining & Entertainment',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.01, 'Restaurants': 0.04, 'Dining': 0.04, 'Entertainment': 0.04, 'Grocery Stores': 0.03 },
        description: '4% dining & entertainment; 3% grocery; 1% elsewhere'
      }
    ]
  },

  /* ═══════════════════════════════════════
     CAPITAL ONE — Basic
  ═══════════════════════════════════════ */
  {
    id: 'cap1-venture-one',
    name: 'VentureOne',
    issuer: 'Capital One',
    network: 'Visa',
    annualFee: 0,
    color: '#374151',
    popular: false,
    benefitsUrl: 'https://www.capitalone.com/credit-cards/ventureone/',
    benefits: [
      { name: '1.25x Miles on Everything', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.0125, 'Hotels': 0.05, 'Car Rental': 0.05 }, description: '5x on hotels/rentals via Cap1 Travel; 1.25x elsewhere' }
    ]
  },
  {
    id: 'cap1-savor-one',
    name: 'SavorOne',
    issuer: 'Capital One',
    network: 'Visa',
    annualFee: 0,
    color: '#6d28d9',
    popular: false,
    benefitsUrl: 'https://www.capitalone.com/credit-cards/savorone/',
    benefits: [
      { name: '3% Cash Back on Dining', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Restaurants': 0.03, 'Dining': 0.03, 'Entertainment': 0.03, 'Grocery Stores': 0.03 }, description: '3% dining, entertainment, grocery; 1% elsewhere' }
    ]
  },
  {
    id: 'cap1-quicksilver',
    name: 'Quicksilver',
    issuer: 'Capital One',
    network: 'Visa',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.capitalone.com/credit-cards/quicksilver/',
    color: '#9ca3af',
    benefits: [
      { name: '1.5% Cash Back on Everything', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.015 }, description: '1.5% on all purchases' }
    ]
  },
  {
    id: 'cap1-quicksilver-one',
    name: 'QuicksilverOne',
    issuer: 'Capital One',
    network: 'Mastercard',
    annualFee: 39,
    popular: false,
    benefitsUrl: 'https://www.capitalone.com/credit-cards/quicksilverone/',
    color: '#6b7280',
    benefits: [
      { name: '1.5% Cash Back on Everything', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.015 }, description: '1.5% on all purchases' }
    ]
  },
  {
    id: 'cap1-platinum',
    name: 'Capital One Platinum',
    issuer: 'Capital One',
    network: 'Mastercard',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.capitalone.com/credit-cards/platinum/',
    color: '#d1d5db',
    benefits: [
      { name: 'No Rewards', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0 }, description: 'No rewards — credit building card' }
    ]
  },
  {
    id: 'cap1-spark',
    name: 'Spark Cash Plus',
    issuer: 'Capital One',
    network: 'Visa',
    annualFee: 150,
    popular: false,
    benefitsUrl: 'https://www.capitalone.com/credit-cards/spark-cash-plus/',
    color: '#1e3a5f',
    benefits: [
      { name: '2% Cash Back on Everything', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.02 }, description: '2% unlimited cash back on all purchases' }
    ]
  },

  /* ═══════════════════════════════════════
     CITI — Premium / Travel
  ═══════════════════════════════════════ */
  {
    id: 'citi-strata-premier',
    name: 'Citi Strata Premier',
    issuer: 'Citi',
    network: 'Mastercard',
    annualFee: 95,
    color: '#003da5',
    popular: true,
    benefitsUrl: 'https://www.citi.com/credit-cards/citi-strata-premier-card/',
    benefits: [
      {
        name: '$100 Annual Hotel Savings Benefit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 100,
        monthlyValue: null,
        eligibleKeywords: ['hotel', 'motel', 'resort', 'inn', 'hilton', 'marriott', 'hyatt', 'ihg', 'wyndham'],
        eligibleCategories: ['Hotels', 'Travel'],
        description: '$100 discount on single hotel stay of $500+ booked via Citi Travel'
      },
      {
        name: '3x Points on Hotels, Restaurants, Groceries, Gas',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.01, 'Hotels': 0.03, 'Restaurants': 0.03, 'Dining': 0.03, 'Grocery Stores': 0.03, 'Gas Stations': 0.03, 'Airlines': 0.03 },
        description: '3x on hotels, restaurants, grocery, gas, air; 1x everywhere else'
      }
    ]
  },

  {
    id: 'citi-aa-executive',
    name: 'Citi AAdvantage Executive',
    issuer: 'Citi',
    network: 'Mastercard',
    annualFee: 595,
    color: '#0078d4',
    popular: false,
    benefitsUrl: 'https://www.citi.com/credit-cards/american-airlines/citi-aadvantage-executive-world-elite-mastercard/',
    benefits: [
      {
        name: 'Admirals Club Membership',
        type: 'membership',
        trackable: false,
        annualValue: 650,
        description: 'Full Admirals Club access for you and your family'
      },
      {
        name: 'Global Entry / TSA PreCheck Credit ($100)',
        type: 'statement_credit',
        trackable: true,
        annualValue: 100,
        monthlyValue: null,
        eligibleKeywords: ['global entry', 'tsa precheck', 'nexus', 'cbp'],
        eligibleCategories: ['Government Services'],
        description: 'Up to $100 every 4 years'
      }
    ]
  },

  {
    id: 'citi-costco',
    name: 'Costco Anywhere Visa',
    issuer: 'Citi',
    network: 'Visa',
    annualFee: 0,
    color: '#0073aa',
    popular: true,
    benefitsUrl: 'https://www.citi.com/credit-cards/costco/',
    benefits: [
      {
        name: '4% Cash Back on Gas & EV',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.01, 'Gas Stations': 0.04, 'Restaurants': 0.03, 'Dining': 0.03, 'Costco': 0.02, 'Travel': 0.03 },
        description: '4% gas/EV (up to $7k/yr); 3% restaurants & travel; 2% Costco; 1% elsewhere'
      }
    ]
  },

  /* ═══════════════════════════════════════
     CITI — Basic / Cashback
  ═══════════════════════════════════════ */
  {
    id: 'citi-double-cash',
    name: 'Citi Double Cash',
    issuer: 'Citi',
    network: 'Mastercard',
    annualFee: 0,
    popular: true,
    benefitsUrl: 'https://www.citi.com/credit-cards/citi-double-cash-credit-card/',
    color: '#1d4ed8',
    benefits: [
      { name: '2% Cash Back (1% + 1%)', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.02 }, description: '1% when you buy + 1% when you pay — effectively 2% on all purchases' }
    ]
  },
  {
    id: 'citi-custom-cash',
    name: 'Citi Custom Cash',
    issuer: 'Citi',
    network: 'Mastercard',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.citi.com/credit-cards/citi-custom-cash-card/',
    color: '#2563eb',
    benefits: [
      { name: '5% on Top Category (up to $500/month)', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Restaurants': 0.05, 'Gas Stations': 0.05, 'Grocery Stores': 0.05, 'Airlines': 0.05, 'Hotels': 0.05 }, description: '5% automatically on your top spend category each billing cycle (up to $500)' }
    ]
  },
  {
    id: 'citi-rewards-plus',
    name: 'Citi Rewards+',
    issuer: 'Citi',
    network: 'Mastercard',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.citi.com/credit-cards/citi-rewards-plus-credit-card/',
    color: '#3b82f6',
    benefits: [
      { name: '2x Points at Gas & Groceries', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Gas Stations': 0.02, 'Grocery Stores': 0.02 }, description: '2x at gas & grocery (up to $6k/yr); 1x elsewhere' }
    ]
  },
  {
    id: 'citi-simplicity',
    name: 'Citi Simplicity',
    issuer: 'Citi',
    network: 'Mastercard',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.citi.com/credit-cards/citi-simplicity-card/',
    color: '#6b7280',
    benefits: [
      { name: 'No Rewards', type: 'cashback', trackable: false, annualValue: null, categories: { default: 0 }, description: 'No rewards — 0% APR balance transfer card' }
    ]
  },
  {
    id: 'citi-diamond-preferred',
    name: 'Citi Diamond Preferred',
    issuer: 'Citi',
    network: 'Mastercard',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.citi.com/credit-cards/citi-diamond-preferred-card/',
    color: '#9ca3af',
    benefits: [
      { name: 'No Rewards', type: 'cashback', trackable: false, annualValue: null, categories: { default: 0 }, description: 'No rewards — low APR card' }
    ]
  },
  {
    id: 'citi-aa-platinum-select',
    name: 'Citi AAdvantage Platinum Select',
    issuer: 'Citi',
    network: 'Mastercard',
    annualFee: 99,
    popular: false,
    benefitsUrl: 'https://www.citi.com/credit-cards/american-airlines/citi-aadvantage-platinum-select-world-elite-mastercard/',
    color: '#0078d4',
    benefits: [
      { name: '2x Miles on AA, Restaurants, Gas', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Airlines': 0.02, 'Restaurants': 0.02, 'Gas Stations': 0.02 }, description: '2x miles on AA, dining, gas; 1x elsewhere' }
    ]
  },

  /* ═══════════════════════════════════════
     BANK OF AMERICA — Premium
  ═══════════════════════════════════════ */
  {
    id: 'bofa-premium-rewards',
    name: 'BofA Premium Rewards',
    issuer: 'BofA',
    network: 'Visa',
    annualFee: 95,
    color: '#cc0000',
    popular: false,
    benefitsUrl: 'https://www.bankofamerica.com/credit-cards/products/premium-rewards-credit-card/',
    benefits: [
      {
        name: '$100 Airline Incidental Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 100,
        monthlyValue: null,
        eligibleKeywords: ['airline fee', 'checked bag', 'seat upgrade', 'in-flight', 'inflight'],
        eligibleCategories: ['Airlines'],
        description: '$100 annual airline incidental fee credit'
      },
      {
        name: '$100 TSA PreCheck / Global Entry Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 100,
        monthlyValue: null,
        eligibleKeywords: ['global entry', 'tsa precheck', 'nexus', 'cbp'],
        eligibleCategories: ['Government Services'],
        description: 'Up to $100 every 4 years'
      },
      {
        name: '2x Points on Travel & Dining',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.015, 'Travel': 0.02, 'Dining': 0.02, 'Restaurants': 0.02 },
        description: '2x on travel & dining; 1.5x everywhere else (Preferred Rewards bonuses available)'
      }
    ]
  },

  {
    id: 'bofa-premium-rewards-elite',
    name: 'BofA Premium Rewards Elite',
    issuer: 'BofA',
    network: 'Visa',
    annualFee: 550,
    color: '#990000',
    popular: false,
    benefitsUrl: 'https://www.bankofamerica.com/credit-cards/products/premium-rewards-elite-credit-card/',
    benefits: [
      {
        name: '$300 Annual Airline Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 300,
        monthlyValue: null,
        eligibleKeywords: ['airline', 'flight', 'delta', 'united', 'american airlines', 'southwest'],
        eligibleCategories: ['Airlines'],
        description: '$300 toward airline purchases'
      },
      {
        name: '$150 Annual Lifestyle Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 150,
        monthlyValue: null,
        eligibleKeywords: ['streaming', 'fitness', 'gym', 'food delivery', 'grubhub', 'doordash', 'uber eats'],
        eligibleCategories: ['Entertainment', 'Fitness', 'Restaurants'],
        description: '$150 toward streaming, fitness, or food delivery services'
      }
    ]
  },

  {
    id: 'bofa-alaska',
    name: 'Alaska Airlines Visa',
    issuer: 'BofA',
    network: 'Visa',
    annualFee: 75,
    color: '#01426a',
    popular: false,
    benefitsUrl: 'https://www.bankofamerica.com/credit-cards/products/alaska-airlines-visa-signature-credit-card/',
    benefits: [
      {
        name: 'Companion Fare',
        type: 'companion_cert',
        trackable: false,
        annualValue: 300,
        description: "Annual companion fare from $122 ($99 base + taxes) after $6k spend"
      },
      {
        name: 'Free Checked Bag',
        type: 'membership',
        trackable: false,
        annualValue: 60,
        description: 'Free checked bag on Alaska flights for you and up to 6 guests'
      }
    ]
  },

  /* ═══════════════════════════════════════
     BANK OF AMERICA — Basic
  ═══════════════════════════════════════ */
  {
    id: 'bofa-travel-rewards',
    name: 'BofA Travel Rewards',
    issuer: 'BofA',
    network: 'Visa',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.bankofamerica.com/credit-cards/products/travel-rewards-credit-card/',
    color: '#ef4444',
    benefits: [
      { name: '1.5x Points on Everything', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.015 }, description: '1.5x points on all purchases (no foreign transaction fees)' }
    ]
  },
  {
    id: 'bofa-customized-cash',
    name: 'BofA Customized Cash Rewards',
    issuer: 'BofA',
    network: 'Visa',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.bankofamerica.com/credit-cards/products/cash-back-credit-card/',
    color: '#dc2626',
    benefits: [
      { name: '3% on Choice Category', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Gas Stations': 0.03, 'Grocery Stores': 0.02 }, description: '3% on your chosen category (gas, online shopping, dining, travel, drug stores, home improvement); 2% grocery; 1% else' }
    ]
  },
  {
    id: 'bofa-unlimited-cash',
    name: 'BofA Unlimited Cash Rewards',
    issuer: 'BofA',
    network: 'Visa',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.bankofamerica.com/credit-cards/products/unlimited-cash-reward-credit-card/',
    color: '#b91c1c',
    benefits: [
      { name: '1.5% Cash Back on Everything', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.015 }, description: '1.5% on all purchases' }
    ]
  },
  {
    id: 'bofa-air-france',
    name: 'Air France KLM World Elite',
    issuer: 'BofA',
    network: 'Mastercard',
    annualFee: 89,
    popular: false,
    benefitsUrl: 'https://www.bankofamerica.com/credit-cards/products/air-france-klm-world-elite-mastercard/',
    color: '#003087',
    benefits: [
      { name: '3x Miles on AF/KLM', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.015, 'Airlines': 0.03 }, description: '3x on Air France/KLM; 1.5x elsewhere' }
    ]
  },

  /* ═══════════════════════════════════════
     US BANK
  ═══════════════════════════════════════ */
  {
    id: 'usbank-altitude-reserve',
    name: 'Altitude Reserve Visa',
    issuer: 'US Bank',
    network: 'Visa',
    annualFee: 400,
    color: '#cc0000',
    popular: false,
    benefitsUrl: 'https://www.usbank.com/credit-cards/altitude-reserve-visa-infinite-credit-card.html',
    benefits: [
      {
        name: '$325 Annual Travel Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 325,
        monthlyValue: null,
        eligibleKeywords: ['travel', 'airline', 'hotel', 'lyft', 'uber', 'train', 'car rental'],
        eligibleCategories: ['Travel', 'Airlines', 'Hotels', 'Taxis & Rideshares'],
        description: '$325 annual credit toward travel and dining'
      },
      {
        name: 'Global Entry / TSA PreCheck Credit ($100)',
        type: 'statement_credit',
        trackable: true,
        annualValue: 100,
        monthlyValue: null,
        eligibleKeywords: ['global entry', 'tsa precheck', 'nexus'],
        eligibleCategories: ['Government Services'],
        description: 'Up to $100 every 4 years'
      }
    ]
  },

  {
    id: 'usbank-altitude-connect',
    name: 'Altitude Connect Visa',
    issuer: 'US Bank',
    network: 'Visa',
    annualFee: 95,
    color: '#dc2626',
    popular: false,
    benefitsUrl: 'https://www.usbank.com/credit-cards/altitude-connect-visa-signature-credit-card.html',
    benefits: [
      {
        name: '$30 Streaming Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 30,
        monthlyValue: null,
        eligibleKeywords: ['netflix', 'hulu', 'disney+', 'spotify', 'apple tv', 'hbo', 'peacock', 'paramount+'],
        eligibleCategories: ['Streaming'],
        description: '$30 annual streaming credit'
      },
      {
        name: '4x Points on Travel & Gas',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.01, 'Travel': 0.04, 'Gas Stations': 0.04, 'Restaurants': 0.02, 'Grocery Stores': 0.02 },
        description: '4x travel & gas; 2x dining & grocery; 1x elsewhere'
      }
    ]
  },

  {
    id: 'usbank-cash-plus',
    name: 'US Bank Cash+',
    issuer: 'US Bank',
    network: 'Visa',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.usbank.com/credit-cards/cash-plus-visa-signature-credit-card.html',
    color: '#ef4444',
    benefits: [
      { name: '5% on Two Choice Categories', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Gas Stations': 0.05, 'Grocery Stores': 0.02 }, description: '5% on two chosen categories (up to $2k/qtr combined); 2% everyday category; 1% else' }
    ]
  },

  {
    id: 'usbank-shopper-cash',
    name: 'US Bank Shopper Cash Rewards',
    issuer: 'US Bank',
    network: 'Visa',
    annualFee: 95,
    popular: false,
    benefitsUrl: 'https://www.usbank.com/credit-cards/shopper-cash-rewards-visa-signature-credit-card.html',
    color: '#b91c1c',
    benefits: [
      { name: '6% at Two Merchants', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.015 }, description: '6% at two chosen retailers (up to $1,500/qtr); 3% on prepaid hotel/car via US Bank; 1.5% elsewhere' }
    ]
  },

  /* ═══════════════════════════════════════
     OTHER ISSUERS
  ═══════════════════════════════════════ */
  {
    id: 'bilt-mastercard',
    name: 'Bilt Mastercard',
    issuer: 'Wells Fargo',
    network: 'Mastercard',
    annualFee: 0,
    color: '#1a1a2e',
    popular: true,
    benefitsUrl: 'https://bilt.com/card',
    benefits: [
      {
        name: '1x Points on Rent (No Fee)',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.01, 'Restaurants': 0.03, 'Dining': 0.03, 'Travel': 0.02, 'Rent': 0.01 },
        description: 'Earn points on rent with no transaction fee; 3x dining; 2x travel; 1x everywhere'
      }
    ]
  },

  {
    id: 'penfed-pathfinder',
    name: 'PenFed Pathfinder Rewards',
    issuer: 'PenFed',
    network: 'Visa',
    annualFee: 95,
    color: '#003087',
    popular: false,
    benefitsUrl: 'https://www.penfed.org/credit-cards/penfed-pathfinder-rewards-american-express-card',
    benefits: [
      {
        name: '$100 Annual Airline Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 100,
        monthlyValue: null,
        eligibleKeywords: ['airline', 'flight', 'delta', 'united', 'american airlines', 'southwest'],
        eligibleCategories: ['Airlines'],
        description: '$100 toward airline purchases'
      },
      {
        name: '4x Points on Travel',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.015, 'Travel': 0.04 },
        description: '4x on travel; 1.5x everywhere else'
      }
    ]
  },

  {
    id: 'hsbc-premier',
    name: 'HSBC Premier World Elite',
    issuer: 'HSBC',
    network: 'Mastercard',
    annualFee: 395,
    color: '#db2f2f',
    popular: false,
    benefitsUrl: 'https://www.us.hsbc.com/credit-cards/premier-world-mastercard/',
    benefits: [
      {
        name: '$400 Annual Travel Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 400,
        monthlyValue: null,
        eligibleKeywords: ['airline', 'hotel', 'car rental', 'travel'],
        eligibleCategories: ['Travel'],
        description: '$400 toward travel purchases'
      }
    ]
  },

  {
    id: 'barclays-jetblue-plus',
    name: 'JetBlue Plus Card',
    issuer: 'Barclays',
    network: 'Mastercard',
    annualFee: 99,
    color: '#0033a0',
    popular: false,
    benefitsUrl: 'https://cards.barclaycardus.com/banking/cards/jetblue-plus-card/',
    benefits: [
      {
        name: '$100 JetBlue Anniversary Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 100,
        monthlyValue: null,
        eligibleKeywords: ['jetblue', 'jetblue airways'],
        eligibleCategories: ['Airlines'],
        description: '$100 annual credit toward JetBlue purchases'
      },
      {
        name: '6x Points on JetBlue',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.01, 'Airlines': 0.06, 'Restaurants': 0.02, 'Grocery Stores': 0.02 },
        description: '6x on JetBlue; 2x dining & grocery; 1x elsewhere'
      }
    ]
  },

  {
    id: 'wf-autograph-journey',
    name: 'Wells Fargo Autograph Journey',
    issuer: 'Wells Fargo',
    network: 'Visa',
    annualFee: 95,
    color: '#cc0000',
    popular: false,
    benefitsUrl: 'https://www.wellsfargo.com/credit-cards/autograph-journey-card/',
    benefits: [
      {
        name: '$50 Annual Airline Credit',
        type: 'statement_credit',
        trackable: true,
        annualValue: 50,
        monthlyValue: null,
        eligibleKeywords: ['airline', 'flight', 'delta', 'united', 'american airlines'],
        eligibleCategories: ['Airlines'],
        description: '$50 airline credit per year'
      },
      {
        name: '5x Points on Hotels',
        type: 'cashback',
        trackable: true,
        annualValue: null,
        categories: { default: 0.01, 'Hotels': 0.05, 'Airlines': 0.04, 'Restaurants': 0.03, 'Dining': 0.03 },
        description: '5x hotels; 4x airlines; 3x restaurants & streaming; 1x elsewhere'
      }
    ]
  },

  /* ═══════════════════════════════════════
     DISCOVER
  ═══════════════════════════════════════ */
  {
    id: 'discover-it-cashback',
    name: 'Discover it Cash Back',
    issuer: 'Discover',
    network: 'Discover',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.discover.com/credit-cards/cash-back/it-card.html',
    color: '#f97316',
    benefits: [
      { name: '5% Rotating Categories', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Grocery Stores': 0.05, 'Gas Stations': 0.05, 'Restaurants': 0.05, 'Amazon': 0.05 }, description: '5% on rotating quarterly categories (up to $1,500); 1% everywhere else (1st year match)' }
    ]
  },
  {
    id: 'discover-it-miles',
    name: 'Discover it Miles',
    issuer: 'Discover',
    network: 'Discover',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.discover.com/credit-cards/travel/it-miles-card.html',
    color: '#fb923c',
    benefits: [
      { name: '1.5x Miles on Everything', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.015 }, description: '1.5x on all purchases (1st year match)' }
    ]
  },
  {
    id: 'discover-it-student',
    name: 'Discover it Student',
    issuer: 'Discover',
    network: 'Discover',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.discover.com/credit-cards/student/',
    color: '#fdba74',
    benefits: [
      { name: '5% Rotating + 1% Student', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01 }, description: 'Same 5% rotating categories as standard Discover it' }
    ]
  },
  {
    id: 'discover-it-chrome',
    name: 'Discover it Chrome',
    issuer: 'Discover',
    network: 'Discover',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.discover.com/credit-cards/cash-back/chrome-card.html',
    color: '#fed7aa',
    benefits: [
      { name: '2% at Gas & Restaurants', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Gas Stations': 0.02, 'Restaurants': 0.02 }, description: '2% at gas & restaurants (up to $1k/qtr); 1% elsewhere' }
    ]
  },

  /* ═══════════════════════════════════════
     WELLS FARGO — Basic
  ═══════════════════════════════════════ */
  {
    id: 'wf-active-cash',
    name: 'Wells Fargo Active Cash',
    issuer: 'Wells Fargo',
    network: 'Visa',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.wellsfargo.com/credit-cards/active-cash-card/',
    color: '#dc2626',
    benefits: [
      { name: '2% Cash Back on Everything', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.02 }, description: '2% unlimited cash rewards on purchases' }
    ]
  },
  {
    id: 'wf-autograph',
    name: 'Wells Fargo Autograph',
    issuer: 'Wells Fargo',
    network: 'Visa',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.wellsfargo.com/credit-cards/autograph-card/',
    color: '#ef4444',
    benefits: [
      { name: '3x on Restaurants, Travel, Gas, Transit, Streaming', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Restaurants': 0.03, 'Dining': 0.03, 'Travel': 0.03, 'Gas Stations': 0.03, 'Streaming': 0.03 }, description: '3x on dining, travel, gas, transit, phone, streaming; 1x elsewhere' }
    ]
  },
  {
    id: 'wf-reflect',
    name: 'Wells Fargo Reflect',
    issuer: 'Wells Fargo',
    network: 'Visa',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.wellsfargo.com/credit-cards/reflect-card/',
    color: '#f87171',
    benefits: [
      { name: 'No Rewards', type: 'cashback', trackable: false, annualValue: null, categories: { default: 0 }, description: 'No rewards — 0% intro APR card' }
    ]
  },

  /* ═══════════════════════════════════════
     MISC POPULAR / FINTECH
  ═══════════════════════════════════════ */
  {
    id: 'apple-card',
    name: 'Apple Card',
    issuer: 'Goldman Sachs',
    network: 'Mastercard',
    annualFee: 0,
    popular: true,
    benefitsUrl: 'https://www.apple.com/apple-card/',
    color: '#1c1c1e',
    benefits: [
      { name: '3% Daily Cash at Apple', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Apple': 0.03, 'Restaurants': 0.02, 'Gas Stations': 0.02, 'Grocery Stores': 0.02 }, description: '3% at Apple; 2% via Apple Pay; 1% elsewhere' }
    ]
  },
  {
    id: 'fidelity-rewards',
    name: 'Fidelity Rewards Visa',
    issuer: 'Fidelity',
    network: 'Visa',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.fidelity.com/cash-management/visa-signature-card',
    color: '#006400',
    benefits: [
      { name: '2% Cash Back on Everything', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.02 }, description: '2% deposited into Fidelity account' }
    ]
  },
  {
    id: 'paypal-cashback',
    name: 'PayPal Cashback Mastercard',
    issuer: 'Synchrony',
    network: 'Mastercard',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.paypal.com/us/digital-wallet/manage-money/paypal-cashback-mastercard',
    color: '#003087',
    benefits: [
      { name: '3% on PayPal / 1.5% Elsewhere', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.015, 'PayPal': 0.03 }, description: '3% cash back with PayPal; 1.5% everywhere else' }
    ]
  },
  {
    id: 'sofi-credit-card',
    name: 'SoFi Credit Card',
    issuer: 'SoFi',
    network: 'Mastercard',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.sofi.com/credit-card/',
    color: '#7c3aed',
    benefits: [
      { name: '2% Cash Back on Everything', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.02 }, description: '2% cash back on all purchases (with SoFi banking)' }
    ]
  },
  {
    id: 'navy-federal-flagship',
    name: 'Navy Federal Flagship Rewards',
    issuer: 'Navy Federal',
    network: 'Visa',
    annualFee: 49,
    popular: false,
    benefitsUrl: 'https://www.navyfederal.org/loans-cards/credit-cards/flagship-rewards/',
    color: '#003087',
    benefits: [
      { name: '3x on Travel', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.02, 'Travel': 0.03 }, description: '3x on travel; 2x everywhere else' }
    ]
  },
  {
    id: 'penfed-power-cash',
    name: 'PenFed Power Cash Rewards',
    issuer: 'PenFed',
    network: 'Visa',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.penfed.org/credit-cards/penfed-power-cash-rewards-visa-signature-card',
    color: '#1d4ed8',
    benefits: [
      { name: '2% Cash Back (PenFed members)', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.02 }, description: '2% cash back for Honors Advantage members; 1.5% otherwise' }
    ]
  },
  {
    id: 'bread-cashback',
    name: 'Bread Cashback Amex',
    issuer: 'Bread Financial',
    network: 'Amex',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.breadfinancial.com/en/consumer/credit-cards/bread-cashback.html',
    color: '#92400e',
    benefits: [
      { name: '2% Cash Back on Everything', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.02 }, description: 'Unlimited 2% cash back on all purchases' }
    ]
  },
  {
    id: 'sams-club',
    name: "Sam's Club Mastercard",
    issuer: "Sam's Club",
    network: 'Mastercard',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.samsclub.com/credit',
    color: '#003f88',
    benefits: [
      { name: '5% at Gas / 3% Dining & Travel', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Gas Stations': 0.05, 'Restaurants': 0.03, 'Dining': 0.03, 'Travel': 0.03 }, description: '5% gas; 3% dining & travel; 1% everywhere' }
    ]
  },
  {
    id: 'target-redcard',
    name: 'Target RedCard',
    issuer: 'TD Bank',
    network: 'Mastercard',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.target.com/redcard/',
    color: '#cc0000',
    benefits: [
      { name: '5% at Target', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0, 'Target': 0.05 }, description: '5% discount at Target in-store and online' }
    ]
  },
  {
    id: 'amazon-store',
    name: 'Amazon Store Card',
    issuer: 'Synchrony',
    network: 'Store',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.amazon.com/store-card/',
    color: '#ff9900',
    benefits: [
      { name: '5% Back at Amazon (with Prime)', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0, 'Amazon': 0.05 }, description: '5% back at Amazon with Prime; 0% otherwise (or special financing)' }
    ]
  },
  {
    id: 'robinhood-gold',
    name: 'Robinhood Gold Card',
    issuer: 'Coastal',
    network: 'Visa',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://robinhood.com/us/en/about/credit-card/',
    color: '#00c805',
    benefits: [
      { name: '3% Cash Back on Everything', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.03 }, description: '3% unlimited cash back on all purchases (Robinhood Gold required)' }
    ]
  },
  {
    id: 'venmo-card',
    name: 'Venmo Credit Card',
    issuer: 'Synchrony',
    network: 'Visa',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://venmo.com/venmo-debit-card/',
    color: '#008cff',
    benefits: [
      { name: '3% Top Category / 2% Second / 1% Else', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Restaurants': 0.03, 'Gas Stations': 0.02 }, description: 'Automatically earns 3% on your top category, 2% second, 1% elsewhere' }
    ]
  },
  {
    id: 'upgrade-card',
    name: 'Upgrade Cash Rewards Visa',
    issuer: 'Upgrade',
    network: 'Visa',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.upgrade.com/credit-card/',
    color: '#7c3aed',
    benefits: [
      { name: '1.5% Cash Back on Payments', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.015 }, description: '1.5% cash back applied when you make payments on your balance' }
    ]
  },
  {
    id: 'mission-lane',
    name: 'Mission Lane Visa',
    issuer: 'Transportation Alliance Bank',
    network: 'Visa',
    annualFee: 59,
    popular: false,
    benefitsUrl: 'https://missionlane.com/',
    color: '#1d4ed8',
    benefits: [
      { name: '1%-1.5% Cash Back', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.015 }, description: 'Up to 1.5% cash back on all purchases' }
    ]
  },
  {
    id: 'petal-2',
    name: 'Petal 2 "Cash Back, No Fees" Visa',
    issuer: 'WebBank',
    network: 'Visa',
    annualFee: 0,
    popular: false,
    benefitsUrl: 'https://www.petalcard.com/',
    color: '#059669',
    benefits: [
      { name: '1%-1.5% Cash Back', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.015 }, description: '1% at first; up to 1.5% after 12 on-time payments' }
    ]
  },
  {
    id: 'barclays-wyndham',
    name: 'Wyndham Rewards Earner Plus',
    issuer: 'Barclays',
    network: 'Visa',
    annualFee: 75,
    popular: false,
    benefitsUrl: 'https://cards.barclaycardus.com/banking/cards/wyndham-rewards-earner-plus-card/',
    color: '#003087',
    benefits: [
      { name: '6x at Wyndham Hotels & Gas', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Hotels': 0.06, 'Gas Stations': 0.06 }, description: '6x at Wyndham and gas; 4x dining; 1x elsewhere' }
    ]
  },
  {
    id: 'barclays-hawaiian',
    name: 'Hawaiian Airlines World Elite',
    issuer: 'Barclays',
    network: 'Mastercard',
    annualFee: 99,
    popular: false,
    benefitsUrl: 'https://cards.barclaycardus.com/banking/cards/hawaiian-airlines-world-elite-mastercard/',
    color: '#6d28d9',
    benefits: [
      {
        name: 'Free Companion Discount',
        type: 'companion_cert',
        trackable: false,
        annualValue: 200,
        description: 'Annual 50% off companion discount on Hawaiian flights'
      },
      { name: '3x Miles on Hawaiian Airlines', type: 'cashback', trackable: true, annualValue: null, categories: { default: 0.01, 'Airlines': 0.03 }, description: '3x on Hawaiian flights; 2x dining, grocery, gas; 1x elsewhere' }
    ]
  }

]; // end CARDS

/* ─── Helper: get sorted/unique issuer list ─── */
const ISSUERS = [...new Set(CARDS.map(c => c.issuer))].sort();
