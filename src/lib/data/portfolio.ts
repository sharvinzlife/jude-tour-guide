export interface ClientTestimonial {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  avatar: string;
  rating: number;
  title: string;
  testimonial: string;
  tourType: string;
  destination: string;
  date: string;
  beforeExperience?: string;
  afterExperience: string;
  images: string[];
  highlights: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  location: string;
  image: string;
  description: string;
  category: string;
  date: string;
  clientName: string;
  clientCountry: string;
  countryCode: string;
  rating: number;
  tourDuration: string;
  beforeImage?: string;
  afterStory: string;
  highlights: string[];
  testimonial: string;
  detailedStory: string;
  professionalPhotos: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  clientCountry: string;
  countryCode: string;
  challenge: string;
  solution: string;
  outcome: string;
  duration: string;
  destinations: string[];
  images: string[];
  testimonial: string;
  rating: number;
  beforeAfter: {
    before: string;
    after: string;
    improvement: string;
  };
}

// Client testimonials from around the world
export const clientTestimonials: ClientTestimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Johnson',
    country: 'United States',
    countryCode: 'US',
    avatar: '/media/portifolio/Portifolio-1.jpeg',
    rating: 5,
    title: 'Magical Backwater Experience',
    testimonial: 'Jude transformed our Kerala trip into an unforgettable journey. His knowledge of local culture and hidden gems made all the difference.',
    tourType: 'Backwaters',
    destination: 'Alleppey',
    date: 'March 2024',
    beforeExperience: 'We came to Kerala feeling stressed from work and disconnected from nature.',
    afterExperience: 'We left feeling completely rejuvenated, with a deep appreciation for Kerala\'s natural beauty and culture. The backwater experience was truly life-changing.',
    images: ['/media/portifolio/Portifolio-1.jpeg', '/media/portifolio/Portifolio-2.jpeg'],
    highlights: ['Traditional houseboat stay', 'Sunset cruise', 'Local village visit', 'Authentic Kerala cuisine']
  },
  {
    id: 'test-2',
    name: 'Hans Mueller',
    country: 'Germany',
    countryCode: 'DE',
    avatar: '/media/portifolio/Portifolio-2.jpeg',
    rating: 5,
    title: 'Perfect Tea Garden Adventure',
    testimonial: 'The tea plantation tour in Munnar was exceptional. Jude\'s expertise in local flora and fauna made every moment educational and exciting.',
    tourType: 'Hill Stations',
    destination: 'Munnar',
    date: 'February 2024',
    afterExperience: 'Gained deep knowledge about tea cultivation and experienced the most serene mountain atmosphere. Perfect for nature photography.',
    images: ['/media/portifolio/Portifolio-2.jpeg', '/media/portifolio/Portifolio-3.jpeg'],
    highlights: ['Tea factory visit', 'Mountain photography', 'Wildlife spotting', 'Cool climate retreat']
  },
  {
    id: 'test-3',
    name: 'Sakura Tanaka',
    country: 'Japan',
    countryCode: 'JP',
    avatar: '/media/portifolio/Portifolio-3.jpeg',
    rating: 5,
    title: 'Cultural Heritage Discovery',
    testimonial: 'Fort Kochi\'s heritage tour opened my eyes to Kerala\'s rich multicultural history. Jude\'s storytelling brought every monument to life.',
    tourType: 'Heritage',
    destination: 'Kochi',
    date: 'January 2024',
    afterExperience: 'Discovered fascinating connections between Japanese and Kerala maritime history through the spice trade routes.',
    images: ['/media/portifolio/Portifolio-3.jpeg', '/media/portifolio/Portifolio-4.jpeg'],
    highlights: ['Chinese fishing nets', 'Spice market exploration', 'Colonial architecture', 'Kathakali performance']
  },
  {
    id: 'test-4',
    name: 'Emma Thompson',
    country: 'United Kingdom',
    countryCode: 'GB',
    avatar: '/media/portifolio/Portifolio-4.jpeg',
    rating: 5,
    title: 'Wildlife Safari Excellence',
    testimonial: 'The Thekkady wildlife experience exceeded all expectations. Jude\'s patience and knowledge helped us spot incredible wildlife.',
    tourType: 'Wildlife',
    destination: 'Thekkady',
    date: 'December 2023',
    afterExperience: 'Witnessed elephants in their natural habitat and learned about Kerala\'s conservation efforts. An eye-opening experience.',
    images: ['/media/portifolio/Portifolio-4.jpeg', '/media/portifolio/Portifolio-1.jpeg'],
    highlights: ['Elephant encounter', 'Boat safari', 'Spice plantation', 'Night sounds experience']
  },
  {
    id: 'test-5',
    name: 'Marco Rossi',
    country: 'Italy',
    countryCode: 'IT',
    avatar: '/media/portifolio/Portifolio-1.jpeg',
    rating: 5,
    title: 'Culinary Cultural Journey',
    testimonial: 'Beyond the beautiful landscapes, Jude introduced us to authentic Kerala cuisine and cooking techniques. Absolutely delicious!',
    tourType: 'Complete Tour',
    destination: 'Multiple Destinations',
    date: 'November 2023',
    afterExperience: 'Returned home with a collection of spice recipes and a deep appreciation for Kerala\'s culinary heritage.',
    images: ['/media/portifolio/Portifolio-1.jpeg', '/media/portifolio/Portifolio-2.jpeg'],
    highlights: ['Cooking classes', 'Spice garden tour', 'Traditional meals', 'Recipe sharing']
  },
  {
    id: 'test-6',
    name: 'Sophie Dubois',
    country: 'France',
    countryCode: 'FR',
    avatar: '/media/portifolio/Portifolio-3.jpeg',
    rating: 5,
    title: 'Romantic Honeymoon Bliss',
    testimonial: 'Our honeymoon in Kerala was perfect. Jude ensured every detail was romantic and memorable, from sunset cruises to private dinners.',
    tourType: 'Honeymoon Special',
    destination: 'Alleppey & Munnar',
    date: 'October 2023',
    afterExperience: 'Created lifelong memories with my husband in the most romantic settings. Kerala is perfect for couples.',
    images: ['/media/portifolio/Portifolio-3.jpeg', '/media/portifolio/Portifolio-4.jpeg'],
    highlights: ['Private houseboat', 'Couple spa', 'Sunset dinner', 'Mountain retreat']
  }
];

// Enhanced portfolio items with detailed case studies
export const portfolioItems: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Alleppey Backwaters Experience',
    location: 'Alleppey, Kerala',
    image: '/media/portifolio/Portifolio-1.jpeg',
    description: 'A serene journey through the backwaters with traditional houseboats',
    category: 'Backwaters',
    date: 'March 2024',
    clientName: 'The Johnson Family',
    clientCountry: 'United States',
    countryCode: 'US',
    rating: 5,
    tourDuration: '3 Days 2 Nights',
    afterStory: 'The family discovered a new appreciation for slow travel and traditional Kerala lifestyle',
    highlights: ['Traditional houseboat accommodation', 'Village cultural exchange', 'Sunset photography', 'Local fishing experience'],
    testimonial: 'Jude made our backwater experience magical. Every moment was perfectly curated.',
    detailedStory: 'The Johnson family from California came seeking a peaceful retreat from their busy corporate lives. Through carefully planned backwater exploration, intimate village visits, and authentic cultural experiences, they discovered the therapeutic power of Kerala\'s waterways. Their transformation from stressed city dwellers to relaxed travelers was remarkable to witness.',
    professionalPhotos: ['/media/portifolio/Portifolio-1.jpeg', '/media/portifolio/Portifolio-2.jpeg']
  },
  {
    id: 'port-2',
    title: 'Munnar Tea Garden Tour',
    location: 'Munnar, Kerala',
    image: '/media/portifolio/Portifolio-2.jpeg',
    description: 'Exploring the lush green tea plantations and misty hills',
    category: 'Hill Stations',
    date: 'February 2024',
    clientName: 'Hans & Greta Mueller',
    clientCountry: 'Germany',
    countryCode: 'DE',
    rating: 5,
    tourDuration: '4 Days 3 Nights',
    afterStory: 'The couple became passionate about sustainable tea cultivation and Kerala\'s ecological practices',
    highlights: ['Tea factory insights', 'Mountain photography workshop', 'Wildlife encounters', 'Ayurvedic spa experience'],
    testimonial: 'Educational, beautiful, and perfectly organized. We learned so much about tea and nature.',
    detailedStory: 'Hans and Greta, both environmental scientists from Munich, were fascinated by Kerala\'s sustainable farming practices. Their deep dive into tea cultivation, combined with wildlife photography sessions and ecological tours, created a perfect blend of education and adventure. They left as ambassadors of Kerala\'s green practices.',
    professionalPhotos: ['/media/portifolio/Portifolio-2.jpeg', '/media/portifolio/Portifolio-3.jpeg']
  },
  {
    id: 'port-3',
    title: 'Fort Kochi Heritage Walk',
    location: 'Kochi, Kerala',
    image: '/media/portifolio/Portifolio-3.jpeg',
    description: 'Discovering the rich history and culture of Fort Kochi',
    category: 'Heritage',
    date: 'January 2024',
    clientName: 'Sakura Tanaka',
    clientCountry: 'Japan',
    countryCode: 'JP',
    rating: 5,
    tourDuration: '2 Days 1 Night',
    afterStory: 'Discovered fascinating historical connections between Kerala and Japanese maritime trade',
    highlights: ['Historical architecture tour', 'Cultural performance', 'Antique shopping', 'Culinary exploration'],
    testimonial: 'A journey through time that revealed unexpected connections between our cultures.',
    detailedStory: 'Sakura, a history professor from Tokyo, was researching ancient trade routes. Her Fort Kochi exploration revealed surprising connections between Japanese and Kerala maritime history, particularly through the spice trade. The discovery of Japanese influences in local architecture and culture became the highlight of her academic research.',
    professionalPhotos: ['/media/portifolio/Portifolio-3.jpeg', '/media/portifolio/Portifolio-4.jpeg']
  },
  {
    id: 'port-4',
    title: 'Wayanad Wildlife Safari',
    location: 'Wayanad, Kerala',
    image: '/media/portifolio/Portifolio-4.jpeg',
    description: 'Adventure through the wildlife sanctuaries of Wayanad',
    category: 'Wildlife',
    date: 'December 2023',
    clientName: 'Emma Thompson',
    clientCountry: 'United Kingdom',
    countryCode: 'GB',
    rating: 5,
    tourDuration: '3 Days 2 Nights',
    afterStory: 'Became a wildlife conservation advocate and supporter of Kerala\'s eco-tourism initiatives',
    highlights: ['Elephant sighting', 'Bird watching expedition', 'Tribal village visit', 'Conservation education'],
    testimonial: 'An eye-opening experience that changed my perspective on wildlife conservation.',
    detailedStory: 'Emma, a wildlife photographer from London, came looking for unique shots but found a deeper purpose. Her encounters with elephants, combined with learning about conservation efforts and tribal communities\' role in wildlife protection, transformed her from a casual photographer to a passionate advocate for sustainable tourism.',
    professionalPhotos: ['/media/portifolio/Portifolio-4.jpeg', '/media/portifolio/Portifolio-1.jpeg']
  }
];

// Detailed case studies
export const caseStudies: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Corporate Team Building Transformation',
    clientName: 'TechCorp International',
    clientCountry: 'Singapore',
    countryCode: 'SG',
    challenge: 'A 20-member tech team suffering from burnout and poor communication needed team building in a peaceful environment.',
    solution: 'Designed a 5-day program combining Kerala\'s backwaters for relaxation, team challenges in Munnar hills, and cultural workshops in Kochi.',
    outcome: 'Team reported 85% improvement in communication and job satisfaction. Company now sends teams annually.',
    duration: '5 Days 4 Nights',
    destinations: ['Alleppey', 'Munnar', 'Kochi'],
    images: ['/media/portifolio/Portifolio-1.jpeg', '/media/portifolio/Portifolio-2.jpeg'],
    testimonial: 'Jude designed the perfect balance of adventure, relaxation, and team building. Our team dynamics completely transformed.',
    rating: 5,
    beforeAfter: {
      before: 'Disconnected team with high stress levels and poor communication',
      after: 'Cohesive team with improved collaboration and renewed enthusiasm',
      improvement: '85% improvement in team satisfaction scores'
    }
  },
  {
    id: 'case-2',
    title: 'Honeymoon Photography Dreams',
    clientName: 'Marco & Isabella Rossi',
    clientCountry: 'Italy',
    countryCode: 'IT',
    challenge: 'Professional photographers wanted unique, non-touristy locations for their honeymoon portfolio.',
    solution: 'Curated exclusive access to hidden spots: dawn shoots at untouched backwaters, private tea garden sessions, and cultural portraits with local artisans.',
    outcome: 'Created a stunning portfolio that launched their destination wedding photography business.',
    duration: '7 Days 6 Nights',
    destinations: ['Alleppey', 'Munnar', 'Kochi', 'Varkala'],
    images: ['/media/portifolio/Portifolio-3.jpeg', '/media/portifolio/Portifolio-4.jpeg'],
    testimonial: 'The exclusive locations and cultural access Jude provided gave us portfolio pieces that set us apart in the wedding industry.',
    rating: 5,
    beforeAfter: {
      before: 'Looking for unique honeymoon photos',
      after: 'Award-winning portfolio that launched their business',
      improvement: 'Professional photography business established'
    }
  }
];

// Kerala destinations featured in portfolio
export const keralaDestinations = [
  {
    name: 'Alleppey',
    type: 'Backwaters',
    description: 'Venice of the East with serene backwaters',
    clientsHosted: 156,
    averageRating: 4.9,
    bestSeason: 'Nov-Feb',
    signature: 'Houseboat experiences'
  },
  {
    name: 'Munnar',
    type: 'Hill Station',
    description: 'Tea garden paradise in Western Ghats',
    clientsHosted: 203,
    averageRating: 4.8,
    bestSeason: 'Sep-May',
    signature: 'Tea plantation tours'
  },
  {
    name: 'Kochi',
    type: 'Heritage',
    description: 'Historic port city with colonial charm',
    clientsHosted: 298,
    averageRating: 4.7,
    bestSeason: 'Oct-Mar',
    signature: 'Cultural heritage walks'
  },
  {
    name: 'Thekkady',
    type: 'Wildlife',
    description: 'Premier wildlife sanctuary',
    clientsHosted: 142,
    averageRating: 4.6,
    bestSeason: 'Oct-Apr',
    signature: 'Elephant safaris'
  },
  {
    name: 'Varkala',
    type: 'Beach',
    description: 'Clifftop beaches with spiritual vibes',
    clientsHosted: 89,
    averageRating: 4.8,
    bestSeason: 'Nov-Mar',
    signature: 'Cliff beach experiences'
  },
  {
    name: 'Kumarakom',
    type: 'Bird Sanctuary',
    description: 'Paradise for bird watchers',
    clientsHosted: 134,
    averageRating: 4.9,
    bestSeason: 'Nov-Feb',
    signature: 'Bird watching tours'
  }
];

// Tour categories with stats
export const tourCategories = [
  {
    name: 'All Tours',
    count: 856,
    description: 'Complete portfolio showcase'
  },
  {
    name: 'Backwaters',
    count: 234,
    description: 'Serene waterway experiences'
  },
  {
    name: 'Hill Stations',
    count: 187,
    description: 'Mountain and tea garden tours'
  },
  {
    name: 'Heritage',
    count: 156,
    description: 'Cultural and historical tours'
  },
  {
    name: 'Wildlife',
    count: 98,
    description: 'Wildlife safari experiences'
  },
  {
    name: 'Beaches',
    count: 76,
    description: 'Coastal and beach experiences'
  },
  {
    name: 'Wellness',
    count: 65,
    description: 'Ayurvedic and wellness retreats'
  },
  {
    name: 'Adventure',
    count: 40,
    description: 'Trekking and adventure activities'
  }
];

// International client statistics
export const clientStats = {
  totalClients: 856,
  countries: 34,
  averageRating: 4.8,
  repeatClients: '23%',
  topCountries: [
    { country: 'United States', code: 'US', count: 167, percentage: 19.5 },
    { country: 'Germany', code: 'DE', count: 134, percentage: 15.7 },
    { country: 'United Kingdom', code: 'GB', count: 98, percentage: 11.4 },
    { country: 'Japan', code: 'JP', count: 87, percentage: 10.2 },
    { country: 'France', code: 'FR', count: 76, percentage: 8.9 },
    { country: 'Italy', code: 'IT', count: 65, percentage: 7.6 },
    { country: 'Australia', code: 'AU', count: 54, percentage: 6.3 },
    { country: 'Canada', code: 'CA', count: 43, percentage: 5.0 }
  ]
};

// Filter and sort functions
export const filterPortfolioByCategory = (category: string) => {
  if (category === 'All Tours') return portfolioItems;
  return portfolioItems.filter(item => item.category === category);
};

export const filterPortfolioByDestination = (destination: string) => {
  return portfolioItems.filter(item => 
    item.location.toLowerCase().includes(destination.toLowerCase())
  );
};

export const filterPortfolioByCountry = (countryCode: string) => {
  return portfolioItems.filter(item => item.countryCode === countryCode);
};

export const sortPortfolio = (items: PortfolioItem[], sortBy: string) => {
  switch (sortBy) {
    case 'date':
      return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    case 'rating':
      return [...items].sort((a, b) => b.rating - a.rating);
    case 'destination':
      return [...items].sort((a, b) => a.location.localeCompare(b.location));
    default:
      return items;
  }
};