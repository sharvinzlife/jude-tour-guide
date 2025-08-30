import { TourPackage } from '@/types'

export const tourPackages: TourPackage[] = [
  {
    id: '1',
    title: 'Complete Kerala Grand Tour',
    description: 'Experience the best of Kerala with this comprehensive 10-day journey covering all major destinations',
    image: '/media/portifolio/Portifolio-1.jpeg',
    price: 35000,
    originalPrice: 42000,
    duration: '10 Days 9 Nights',
    category: 'Complete Tour',
    maxPeople: 8,
    rating: 4.9,
    reviewCount: 187,
    featured: true,
    difficulty: 'Easy',
    destinations: ['Kochi', 'Munnar', 'Thekkady', 'Alleppey', 'Kumarakom'],
    tags: ['Best Seller', 'Honeymoon Special', 'Family Friendly', 'Cultural'],
    images: [
      '/media/portifolio/Portifolio-1.jpeg',
      '/media/portifolio/Portifolio-2.jpeg',
      '/media/portifolio/Portifolio-3.jpeg'
    ],
    bestTimeToVisit: ['October to March', 'Pleasant weather', 'Ideal for sightseeing'],
    highlights: [
      'Historic Fort Kochi exploration',
      'Munnar tea plantation tours',
      'Thekkady wildlife sanctuary',
      'Alleppey houseboat experience',
      'Kumarakom bird sanctuary',
      'Traditional Kerala cuisine',
      'Ayurvedic spa treatments',
      'Cultural performances'
    ],
    inclusions: [
      'Accommodation in premium hotels/houseboats',
      'All meals (breakfast, lunch, dinner)',
      'Private AC vehicle with driver',
      'Professional tour guide',
      'All entrance fees and permits',
      'Houseboat cruise',
      'Cultural show tickets',
      'Airport transfers'
    ],
    exclusions: [
      'International/domestic airfare',
      'Personal expenses',
      'Tips and gratuities',
      'Travel insurance',
      'Additional activities not mentioned'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kochi - Welcome to God\'s Own Country',
        description: 'Begin your Kerala adventure in the historic port city of Kochi',
        activities: [
          'Airport pickup and welcome',
          'Check-in to heritage hotel in Fort Kochi',
          'Evening stroll along Marine Drive',
          'Welcome dinner with traditional Kerala cuisine'
        ],
        meals: ['Dinner'],
        accommodation: 'Heritage Hotel, Fort Kochi',
        highlights: ['First taste of Kerala hospitality', 'Scenic Marine Drive views']
      },
      {
        day: 2,
        title: 'Kochi Sightseeing - History and Heritage',
        description: 'Explore the rich cultural heritage of Fort Kochi and Mattancherry',
        activities: [
          'Chinese Fishing Nets demonstration',
          'St. Francis Church visit',
          'Mattancherry Palace exploration',
          'Jewish Synagogue tour',
          'Spice market shopping',
          'Evening Kathakali dance performance'
        ],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Heritage Hotel, Fort Kochi',
        travelTime: 'Local sightseeing',
        highlights: ['500-year-old Chinese fishing nets', 'Authentic Kathakali performance']
      },
      {
        day: 3,
        title: 'Kochi to Munnar - Hill Station Journey',
        description: 'Scenic drive to the misty hills of Munnar through tea plantations',
        activities: [
          'Early morning departure to Munnar',
          'Scenic drive through Western Ghats',
          'En-route visit to Cheeyappara Waterfalls',
          'Check-in to hill resort',
          'Evening tea garden walk'
        ],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Hill Resort, Munnar',
        travelTime: '4 hours drive',
        highlights: ['Breathtaking mountain views', 'First glimpse of tea plantations']
      },
      {
        day: 4,
        title: 'Munnar Exploration - Tea Gardens and Nature',
        description: 'Full day exploring Munnar\'s natural beauty and tea heritage',
        activities: [
          'Tea Museum and factory visit',
          'Mattupetty Dam and boating',
          'Echo Point adventure',
          'Kundala Lake visit',
          'Top Station viewpoint',
          'Tea plantation guided walk'
        ],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Hill Resort, Munnar',
        highlights: ['Learn tea processing techniques', 'Panoramic valley views']
      },
      {
        day: 5,
        title: 'Munnar to Thekkady - Wildlife Adventure',
        description: 'Journey to Thekkady for an exciting wildlife experience',
        activities: [
          'Morning departure to Thekkady',
          'Check-in to jungle resort',
          'Periyar Wildlife Sanctuary boat cruise',
          'Spice plantation tour',
          'Traditional martial arts show'
        ],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Jungle Resort, Thekkady',
        travelTime: '3 hours drive',
        highlights: ['Wildlife spotting in Periyar Lake', 'Aromatic spice gardens']
      },
      {
        day: 6,
        title: 'Thekkady Nature Activities',
        description: 'Full day of nature activities and cultural experiences',
        activities: [
          'Early morning nature walk',
          'Elephant safari experience',
          'Bamboo rafting adventure',
          'Visit to tribal village',
          'Ayurvedic massage session',
          'Cultural evening with local performances'
        ],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Jungle Resort, Thekkady',
        highlights: ['Close encounter with elephants', 'Authentic tribal culture']
      },
      {
        day: 7,
        title: 'Thekkady to Alleppey - Backwater Paradise',
        description: 'Enter the enchanting world of Kerala backwaters',
        activities: [
          'Morning drive to Alleppey',
          'Check-in to luxury houseboat',
          'Backwater cruise through villages',
          'Traditional fishing demonstration',
          'Sunset viewing from houseboat deck'
        ],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Luxury Houseboat, Alleppey',
        travelTime: '4 hours drive',
        highlights: ['First houseboat experience', 'Serene backwater landscapes']
      },
      {
        day: 8,
        title: 'Alleppey to Kumarakom - Bird Sanctuary',
        description: 'Explore the famous bird sanctuary and backwater village life',
        activities: [
          'Early morning bird watching',
          'Cruise to Kumarakom',
          'Kumarakom Bird Sanctuary visit',
          'Village backwater tour',
          'Traditional toddy tapping demonstration',
          'Canoe ride through narrow canals'
        ],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Backwater Resort, Kumarakom',
        highlights: ['Exotic migratory birds', 'Traditional village life']
      },
      {
        day: 9,
        title: 'Kumarakom Relaxation and Return to Kochi',
        description: 'Peaceful morning followed by return journey to Kochi',
        activities: [
          'Sunrise yoga session by the lake',
          'Final backwater cruise',
          'Drive back to Kochi',
          'Shopping at Lulu Mall',
          'Farewell dinner cruise'
        ],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Airport Hotel, Kochi',
        travelTime: '2.5 hours drive',
        highlights: ['Peaceful yoga by backwaters', 'Memorable farewell dinner']
      },
      {
        day: 10,
        title: 'Departure - Memories for Lifetime',
        description: 'Departure with unforgettable memories of Kerala',
        activities: [
          'Leisure morning',
          'Last-minute souvenir shopping',
          'Airport transfer',
          'Departure assistance'
        ],
        meals: ['Breakfast'],
        highlights: ['Take home Kerala memories', 'Professional departure assistance']
      }
    ],
    pricingTiers: [
      {
        name: 'Standard',
        price: 28000,
        originalPrice: 35000,
        features: ['3-star hotels', 'AC vehicle', 'Professional guide', 'All meals']
      },
      {
        name: 'Deluxe',
        price: 35000,
        originalPrice: 42000,
        popular: true,
        features: ['4-star hotels', 'Luxury houseboat', 'Premium vehicle', 'Ayurvedic spa']
      },
      {
        name: 'Luxury',
        price: 48000,
        originalPrice: 58000,
        features: ['5-star resorts', 'Private yacht', 'Butler service', 'Helicopter ride']
      }
    ]
  },
  {
    id: '2',
    title: 'Alleppey Backwater Bliss',
    description: 'Immerse yourself in the serene backwaters of Alleppey with luxury houseboat stays',
    image: '/media/portifolio/Portifolio-2.jpeg',
    price: 12500,
    originalPrice: 15000,
    duration: '3 Days 2 Nights',
    category: 'Backwaters',
    maxPeople: 6,
    rating: 4.8,
    reviewCount: 156,
    featured: false,
    difficulty: 'Easy',
    destinations: ['Alleppey', 'Kumarakom'],
    tags: ['Honeymoon', 'Romantic', 'Peaceful', 'Photography'],
    images: ['/media/portifolio/Portifolio-2.jpeg'],
    bestTimeToVisit: ['November to February', 'Post-monsoon freshness', 'Clear skies'],
    highlights: [
      'Luxury houseboat with all amenities',
      'Traditional Kerala cuisine on board',
      'Village tours and local interactions',
      'Sunset and sunrise views from water',
      'Traditional fishing experience',
      'Bird watching opportunities',
      'Coconut lagoon exploration'
    ],
    inclusions: [
      'Luxury houseboat accommodation',
      'All meals with traditional cuisine',
      'Professional boat crew',
      'Village tour guide',
      'Fishing equipment',
      'Welcome drinks',
      'Cultural programs'
    ],
    exclusions: [
      'Transportation to Alleppey',
      'Personal expenses',
      'Alcoholic beverages',
      'Tips to crew',
      'Travel insurance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Backwater Introduction',
        description: 'Begin your backwater journey with a warm Kerala welcome',
        activities: [
          'Check-in to luxury houseboat at noon',
          'Welcome drink and briefing',
          'Afternoon backwater cruise',
          'Village visit and local interaction',
          'Sunset viewing from upper deck',
          'Traditional dinner on board'
        ],
        meals: ['Lunch', 'Evening Tea', 'Dinner'],
        accommodation: 'Luxury Houseboat',
        highlights: ['First backwater cruise experience', 'Authentic village life']
      },
      {
        day: 2,
        title: 'Deep Backwater Exploration',
        description: 'Full day exploring the hidden gems of backwaters',
        activities: [
          'Early morning bird watching',
          'Traditional fishing with locals',
          'Narrow canal exploration by canoe',
          'Visit to coir making unit',
          'Toddy tapping demonstration',
          'Evening cultural programs',
          'Night cruise under stars'
        ],
        meals: ['Breakfast', 'Lunch', 'Evening Tea', 'Dinner'],
        accommodation: 'Luxury Houseboat',
        highlights: ['Traditional fishing techniques', 'Star-lit night cruise']
      },
      {
        day: 3,
        title: 'Farewell to Backwaters',
        description: 'Final morning in the peaceful backwaters',
        activities: [
          'Sunrise yoga on deck (optional)',
          'Final cruise through main waterways',
          'Checkout at 9 AM',
          'Visit to Alleppey beach (optional)',
          'Departure assistance'
        ],
        meals: ['Breakfast'],
        highlights: ['Peaceful sunrise yoga', 'Last glimpses of backwater life']
      }
    ]
  },
  {
    id: '3',
    title: 'Munnar Hill Station Escape',
    description: 'Discover the misty mountains, tea gardens, and cool climate of Munnar',
    image: '/media/portifolio/Portifolio-3.jpeg',
    price: 18000,
    originalPrice: 22000,
    duration: '4 Days 3 Nights',
    category: 'Hill Stations',
    maxPeople: 8,
    rating: 4.9,
    reviewCount: 203,
    featured: true,
    difficulty: 'Moderate',
    destinations: ['Munnar', 'Marayoor'],
    tags: ['Adventure', 'Nature', 'Tea Gardens', 'Trekking'],
    images: ['/media/portifolio/Portifolio-3.jpeg'],
    bestTimeToVisit: ['September to May', 'Pleasant weather', 'Clear mountain views'],
    highlights: [
      'Extensive tea plantation tours',
      'Eravikulam National Park wildlife',
      'Mattupetty Dam activities',
      'Top Station panoramic views',
      'Tea museum and factory visits',
      'Nature trekking opportunities',
      'Cool mountain climate'
    ],
    inclusions: [
      'Hill resort accommodation',
      'All meals and beverages',
      'Professional naturalist guide',
      'All park entry fees',
      'Transportation in hill areas',
      'Trekking equipment',
      'Nature photography assistance'
    ],
    exclusions: [
      'Transportation to Munnar',
      'Personal trekking gear',
      'Medical insurance',
      'Personal shopping',
      'Additional adventure activities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Tea Country',
        description: 'Welcome to the aromatic world of tea plantations',
        activities: [
          'Arrival and check-in to hill resort',
          'Fresh mountain air and tea welcome',
          'Evening tea garden walk',
          'Orientation about Munnar',
          'Traditional Kerala dinner'
        ],
        meals: ['Lunch', 'Evening Tea', 'Dinner'],
        accommodation: 'Hill Resort with Valley View',
        highlights: ['First breath of mountain air', 'Evening among tea bushes']
      },
      {
        day: 2,
        title: 'Tea Heritage and Natural Wonders',
        description: 'Dive deep into tea culture and natural beauty',
        activities: [
          'Early morning tea plantation tour',
          'Tea Museum and factory visit',
          'Mattupetty Dam and boating',
          'Echo Point adventure',
          'Kundala Lake exploration',
          'Photography session at viewpoints'
        ],
        meals: ['Breakfast', 'Lunch', 'Evening Tea', 'Dinner'],
        accommodation: 'Hill Resort with Valley View',
        travelTime: 'Local sightseeing within 50km',
        highlights: ['Learn tea processing', 'Boat ride in mountain lake']
      },
      {
        day: 3,
        title: 'Wildlife and Adventure',
        description: 'Explore the rich biodiversity and adventure opportunities',
        activities: [
          'Early morning Eravikulam National Park visit',
          'Nilgiri Tahr spotting',
          'Anamudi Peak base trek',
          'Marayoor ancient dolmens visit',
          'Sandalwood forest exploration',
          'Evening campfire with stories'
        ],
        meals: ['Breakfast', 'Packed Lunch', 'Evening Tea', 'Dinner'],
        accommodation: 'Hill Resort with Valley View',
        travelTime: '2 hours to Marayoor',
        highlights: ['Rare Nilgiri Tahr sighting', '5000-year-old dolmens']
      },
      {
        day: 4,
        title: 'Top Station and Farewell',
        description: 'Final morning with the best views of Western Ghats',
        activities: [
          'Early morning Top Station visit',
          'Panoramic Western Ghats views',
          'Final tea garden photography',
          'Souvenir shopping',
          'Check-out and departure'
        ],
        meals: ['Breakfast', 'Lunch'],
        highlights: ['Spectacular sunrise views', 'Last memories in tea gardens']
      }
    ]
  },
  {
    id: '4',
    title: 'Thekkady Wildlife Safari',
    description: 'Adventure into Kerala\'s premier wildlife sanctuary for an unforgettable safari experience',
    image: '/media/portifolio/Portifolio-4.jpeg',
    price: 15500,
    originalPrice: 19000,
    duration: '3 Days 2 Nights',
    category: 'Wildlife',
    maxPeople: 6,
    rating: 4.7,
    reviewCount: 142,
    featured: false,
    difficulty: 'Moderate',
    destinations: ['Thekkady', 'Kumily'],
    tags: ['Wildlife', 'Adventure', 'Nature', 'Photography'],
    images: ['/media/portifolio/Portifolio-4.jpeg'],
    bestTimeToVisit: ['October to April', 'Dry season', 'Best wildlife sighting'],
    highlights: [
      'Periyar Wildlife Sanctuary boat safari',
      'Elephant and tiger spotting opportunities',
      'Spice plantation guided tours',
      'Bamboo rafting adventure',
      'Tribal village cultural experience',
      'Night jungle sounds experience',
      'Professional wildlife photography'
    ],
    inclusions: [
      'Eco-lodge accommodation',
      'All meals with organic produce',
      'Experienced wildlife guide',
      'Boat safari tickets',
      'Spice plantation entry',
      'Bamboo rafting equipment',
      'Tribal village tour'
    ],
    exclusions: [
      'Professional camera equipment',
      'Personal adventure gear',
      'Alcoholic beverages',
      'Tips to guides',
      'Medical insurance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Into the Wild',
        description: 'First encounter with Kerala\'s pristine wilderness',
        activities: [
          'Arrival and eco-lodge check-in',
          'Jungle briefing and safety orientation',
          'Afternoon Periyar Lake boat safari',
          'Wildlife spotting - elephants, deer, birds',
          'Evening nature walk',
          'Dinner with jungle sounds'
        ],
        meals: ['Lunch', 'Evening Tea', 'Dinner'],
        accommodation: 'Jungle Eco-Lodge',
        highlights: ['First boat safari experience', 'Evening jungle symphony']
      },
      {
        day: 2,
        title: 'Deep Jungle Adventure',
        description: 'Full day of wilderness exploration and cultural immersion',
        activities: [
          'Dawn chorus bird watching',
          'Extensive jungle trekking',
          'Spice plantation tour with lunch',
          'Bamboo rafting on Periyar Lake',
          'Tribal village visit and interaction',
          'Traditional martial arts demonstration',
          'Night sounds identification walk'
        ],
        meals: ['Breakfast', 'Plantation Lunch', 'Evening Tea', 'Dinner'],
        accommodation: 'Jungle Eco-Lodge',
        highlights: ['Bamboo rafting adventure', 'Authentic tribal culture']
      },
      {
        day: 3,
        title: 'Final Safari and Departure',
        description: 'Last chance for wildlife encounters',
        activities: [
          'Early morning final boat safari',
          'Best photography opportunities',
          'Souvenir shopping in Kumily',
          'Check-out and departure',
          'Route assistance for next destination'
        ],
        meals: ['Breakfast', 'Lunch'],
        highlights: ['Best wildlife photography', 'Authentic spice purchases']
      }
    ]
  },
  {
    id: '5',
    title: 'Fort Kochi Heritage Walk',
    description: 'Step back in time and explore the colonial heritage and vibrant culture of Fort Kochi',
    image: '/media/hero/Hero.jpeg',
    price: 8500,
    originalPrice: 11000,
    duration: '2 Days 1 Night',
    category: 'Heritage',
    maxPeople: 12,
    rating: 4.6,
    reviewCount: 98,
    featured: false,
    difficulty: 'Easy',
    destinations: ['Fort Kochi', 'Mattancherry'],
    tags: ['Heritage', 'Culture', 'History', 'Art'],
    images: ['/media/hero/Hero.jpeg'],
    bestTimeToVisit: ['October to March', 'Pleasant weather', 'Ideal for walking'],
    highlights: [
      'Historic Chinese Fishing Nets',
      'Mattancherry Palace murals',
      'Jewish Synagogue and heritage',
      'Spice market aromatic experience',
      'Traditional Kathakali performance',
      'Colonial architecture walking tour',
      'Local art galleries and cafes'
    ],
    inclusions: [
      'Heritage hotel accommodation',
      'Professional heritage guide',
      'All monument entry fees',
      'Kathakali performance tickets',
      'Traditional meals',
      'Spice market tour',
      'Cultural show arrangements'
    ],
    exclusions: [
      'Transportation to Kochi',
      'Personal shopping',
      'Alcoholic beverages',
      'Tips to performers',
      'Additional cultural shows'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Colonial Heritage Exploration',
        description: 'Immerse in the rich colonial history and maritime heritage',
        activities: [
          'Check-in to heritage hotel',
          'Guided Fort Kochi walking tour',
          'Chinese Fishing Nets experience',
          'St. Francis Church visit',
          'Vasco da Gama Square exploration',
          'Sunset at Princess Street',
          'Traditional Kathakali performance'
        ],
        meals: ['Lunch', 'Evening Tea', 'Dinner'],
        accommodation: 'Heritage Hotel, Fort Kochi',
        highlights: ['500-year-old fishing nets', 'Authentic Kathakali drama']
      },
      {
        day: 2,
        title: 'Mattancherry Cultural Immersion',
        description: 'Explore the multicultural heritage of Mattancherry',
        activities: [
          'Mattancherry Palace visit',
          'Ancient mural paintings viewing',
          'Jewish Synagogue tour',
          'Jew Town antique shopping',
          'Spice market sensory experience',
          'Local art gallery visits',
          'Departure from Marine Drive'
        ],
        meals: ['Breakfast', 'Traditional Kerala Lunch'],
        highlights: ['400-year-old murals', 'Aromatic spice market experience']
      }
    ]
  },
  {
    id: '6',
    title: 'Kumarakom Bird Paradise',
    description: 'A birder\'s paradise featuring exotic migratory birds and serene backwater life',
    image: '/media/portifolio/Portifolio-1.jpeg',
    price: 13500,
    originalPrice: 16500,
    duration: '3 Days 2 Nights',
    category: 'Nature & Wildlife',
    maxPeople: 8,
    rating: 4.8,
    reviewCount: 134,
    featured: false,
    difficulty: 'Easy',
    destinations: ['Kumarakom', 'Vembanad Lake'],
    tags: ['Bird Watching', 'Photography', 'Peaceful', 'Nature'],
    images: ['/media/portifolio/Portifolio-1.jpeg'],
    bestTimeToVisit: ['November to February', 'Migratory season', 'Perfect weather'],
    highlights: [
      'Kumarakom Bird Sanctuary exploration',
      'Rare migratory bird sighting',
      'Vembanad Lake boat rides',
      'Professional bird watching guide',
      'Photography workshops',
      'Traditional village life experience',
      'Peaceful backwater accommodation'
    ],
    inclusions: [
      'Lakeside resort accommodation',
      'Professional ornithologist guide',
      'Bird watching equipment',
      'Boat rides and transfers',
      'All meals',
      'Photography assistance',
      'Bird identification materials'
    ],
    exclusions: [
      'Professional photography equipment',
      'Personal binoculars',
      'Transportation to Kumarakom',
      'Personal expenses',
      'Travel insurance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Welcome to Bird Paradise',
        description: 'Introduction to Kerala\'s premier bird watching destination',
        activities: [
          'Arrival and lakeside resort check-in',
          'Bird watching orientation',
          'Afternoon boat ride to bird sanctuary',
          'First bird spotting session',
          'Sunset viewing from lake',
          'Bird call identification session'
        ],
        meals: ['Lunch', 'Evening Tea', 'Dinner'],
        accommodation: 'Lakeside Eco-Resort',
        highlights: ['First exotic bird sightings', 'Peaceful lake sunset']
      },
      {
        day: 2,
        title: 'Deep Bird Watching Experience',
        description: 'Full day dedicated to bird watching and photography',
        activities: [
          'Dawn chorus at bird sanctuary',
          'Professional bird photography session',
          'Canoe ride through narrow channels',
          'Village visit - local bird stories',
          'Traditional fishing with locals',
          'Evening bird count activity',
          'Night sounds of the backwaters'
        ],
        meals: ['Breakfast', 'Packed Lunch', 'Evening Tea', 'Dinner'],
        accommodation: 'Lakeside Eco-Resort',
        highlights: ['Professional photography guidance', 'Traditional fishing techniques']
      },
      {
        day: 3,
        title: 'Final Bird Watch and Farewell',
        description: 'Last opportunity for bird sighting and departure',
        activities: [
          'Early morning final bird watching',
          'Breakfast by the lake',
          'Souvenir shopping',
          'Check-out and departure assistance',
          'Bird watching certificate presentation'
        ],
        meals: ['Breakfast', 'Lunch'],
        highlights: ['Final rare bird sightings', 'Bird watching certificate']
      }
    ]
  },
  {
    id: '7',
    title: 'Kerala Beach Hopping',
    description: 'Explore the pristine beaches of Kerala from Kovalam to Varkala',
    image: '/media/portifolio/Portifolio-2.jpeg',
    price: 16500,
    originalPrice: 20000,
    duration: '4 Days 3 Nights',
    category: 'Beaches',
    maxPeople: 10,
    rating: 4.5,
    reviewCount: 167,
    featured: false,
    difficulty: 'Easy',
    destinations: ['Kovalam', 'Varkala', 'Poovar'],
    tags: ['Beach', 'Relaxation', 'Ayurveda', 'Sunset'],
    images: ['/media/portifolio/Portifolio-2.jpeg'],
    bestTimeToVisit: ['October to March', 'Pleasant sea breeze', 'Clear skies'],
    highlights: [
      'Kovalam\'s three beautiful beaches',
      'Varkala\'s dramatic cliff formations',
      'Poovar\'s golden sand beaches',
      'Ayurvedic spa treatments',
      'Fresh seafood experiences',
      'Water sports activities',
      'Spectacular sunset views'
    ],
    inclusions: [
      'Beach resort accommodations',
      'All meals including fresh seafood',
      'Beach activity equipment',
      'Ayurvedic spa session',
      'Sunset cruise tickets',
      'Professional lifeguard services',
      'Beach photography session'
    ],
    exclusions: [
      'Premium water sports',
      'Personal beach equipment',
      'Alcoholic beverages',
      'Shopping expenses',
      'Additional spa treatments'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Kovalam Beach Arrival',
        description: 'First day at Kerala\'s most famous beach destination',
        activities: [
          'Arrival and beachfront resort check-in',
          'Welcome coconut water',
          'Lighthouse Beach exploration',
          'Evening beach walk',
          'Sunset viewing',
          'Fresh seafood dinner by the beach'
        ],
        meals: ['Lunch', 'Evening Snacks', 'Dinner'],
        accommodation: 'Beachfront Resort, Kovalam',
        highlights: ['First Kerala beach experience', 'Romantic beachside dinner']
      },
      {
        day: 2,
        title: 'Kovalam Water Adventures',
        description: 'Full day of beach activities and water sports',
        activities: [
          'Morning yoga session on beach',
          'Water sports - parasailing, surfing',
          'Ayurvedic massage session',
          'Beach volleyball and games',
          'Visit to Fishing Harbor',
          'Sunset cruise along the coast',
          'Cultural programs at resort'
        ],
        meals: ['Breakfast', 'Lunch', 'Evening Tea', 'Dinner'],
        accommodation: 'Beachfront Resort, Kovalam',
        highlights: ['Thrilling water sports', 'Relaxing Ayurvedic treatment']
      },
      {
        day: 3,
        title: 'Varkala Cliff Beach Experience',
        description: 'Explore the unique cliff beaches and spiritual atmosphere',
        activities: [
          'Drive to Varkala cliff beach',
          'Check-in to cliff-top resort',
          'Cliff walking and photography',
          'Beach relaxation and swimming',
          'Visit to Janardhana Temple',
          'Shopping at cliff-top markets',
          'Sunset from cliff viewpoint'
        ],
        meals: ['Breakfast', 'Lunch', 'Evening Tea', 'Dinner'],
        accommodation: 'Cliff Resort, Varkala',
        travelTime: '1 hour drive',
        highlights: ['Dramatic cliff formations', 'Spiritual temple experience']
      },
      {
        day: 4,
        title: 'Poovar and Departure',
        description: 'Final beach experience at the pristine Poovar',
        activities: [
          'Morning visit to Poovar Island',
          'Golden sand beach experience',
          'Backwater meets sea phenomenon',
          'Final beach photography session',
          'Departure preparations',
          'Drop-off assistance'
        ],
        meals: ['Breakfast', 'Lunch'],
        travelTime: '45 minutes to Poovar',
        highlights: ['Unique geography where backwaters meet sea', 'Final beach memories']
      }
    ]
  },
  {
    id: '8',
    title: 'Kerala Ayurveda Wellness Retreat',
    description: 'Rejuvenate your mind, body, and soul with authentic Ayurvedic treatments',
    image: '/media/portifolio/Portifolio-3.jpeg',
    price: 25000,
    originalPrice: 32000,
    duration: '5 Days 4 Nights',
    category: 'Wellness',
    maxPeople: 6,
    rating: 4.9,
    reviewCount: 89,
    featured: true,
    difficulty: 'Easy',
    destinations: ['Kovalam', 'Varkala'],
    tags: ['Ayurveda', 'Wellness', 'Detox', 'Meditation'],
    images: ['/media/portifolio/Portifolio-3.jpeg'],
    bestTimeToVisit: ['Year-round', 'Monsoon excellent for Ayurveda', 'October-March ideal'],
    highlights: [
      'Authentic Panchakarma treatments',
      'Experienced Ayurvedic doctors',
      'Organic herbal medicine preparation',
      'Yoga and meditation sessions',
      'Specially prepared Ayurvedic cuisine',
      'Beach location for natural healing',
      'Personalized wellness programs'
    ],
    inclusions: [
      'Ayurvedic resort accommodation',
      'Doctor consultation and treatments',
      'All Ayurvedic medicines',
      'Specialized Ayurvedic meals',
      'Yoga and meditation classes',
      'Wellness activity programs',
      'Health progress monitoring'
    ],
    exclusions: [
      'Non-Ayurvedic food options',
      'Alcoholic beverages',
      'Non-wellness activities',
      'Personal shopping',
      'Extended treatment sessions'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Wellness Journey Begins',
        description: 'Assessment and introduction to Ayurvedic lifestyle',
        activities: [
          'Arrival and Ayurvedic resort check-in',
          'Doctor consultation and Prakriti analysis',
          'Personalized treatment plan preparation',
          'Introduction to Ayurvedic principles',
          'First gentle massage session',
          'Organic Ayurvedic dinner',
          'Early rest for body preparation'
        ],
        meals: ['Ayurvedic Lunch', 'Herbal Tea', 'Ayurvedic Dinner'],
        accommodation: 'Ayurvedic Beach Resort',
        highlights: ['Professional Ayurvedic assessment', 'Customized treatment plan']
      },
      {
        day: 2,
        title: 'Deep Detox and Rejuvenation',
        description: 'Begin intensive Ayurvedic treatments',
        activities: [
          'Early morning meditation and pranayama',
          'Abhyanga (full body massage)',
          'Swedana (herbal steam therapy)',
          'Doctor review and progress check',
          'Afternoon yoga session',
          'Evening nature walk',
          'Ayurvedic cooking demonstration'
        ],
        meals: ['Ayurvedic Breakfast', 'Therapeutic Lunch', 'Light Dinner'],
        accommodation: 'Ayurvedic Beach Resort',
        highlights: ['Intensive detox treatments', 'Learn Ayurvedic cooking']
      },
      {
        day: 3,
        title: 'Panchakarma Treatments',
        description: 'Experience traditional Panchakarma therapies',
        activities: [
          'Shirodhara (oil pouring therapy)',
          'Pizhichil (warm oil bath)',
          'Specialized Ayurvedic treatments',
          'Herbal medicine preparation workshop',
          'Meditation and spiritual guidance',
          'Beach walking meditation',
          'Traditional Kerala music therapy'
        ],
        meals: ['Dosha-specific Breakfast', 'Therapeutic Lunch', 'Light Dinner'],
        accommodation: 'Ayurvedic Beach Resort',
        highlights: ['Authentic Panchakarma experience', 'Herbal medicine workshop']
      },
      {
        day: 4,
        title: 'Holistic Wellness Integration',
        description: 'Integrate learnings for long-term wellness',
        activities: [
          'Advanced yoga and pranayama',
          'Continued Ayurvedic treatments',
          'Wellness lifestyle education',
          'Stress management techniques',
          'Ayurvedic pulse diagnosis learning',
          'Sunset meditation session',
          'Cultural evening with traditional arts'
        ],
        meals: ['Nutritious Breakfast', 'Balanced Lunch', 'Wellness Dinner'],
        accommodation: 'Ayurvedic Beach Resort',
        highlights: ['Learn pulse diagnosis', 'Stress management skills']
      },
      {
        day: 5,
        title: 'Wellness Graduation and Departure',
        description: 'Complete the wellness journey with future guidance',
        activities: [
          'Final doctor consultation',
          'Health progress review',
          'Take-home wellness kit preparation',
          'Future lifestyle guidance',
          'Graduation ceremony',
          'Ayurvedic breakfast',
          'Departure with wellness plan'
        ],
        meals: ['Celebration Breakfast', 'Farewell Lunch'],
        highlights: ['Personal wellness plan', 'Take-home Ayurvedic kit']
      }
    ]
  }
]

// Helper functions
export const getPackageById = (id: string): TourPackage | undefined => {
  return tourPackages.find(pkg => pkg.id === id)
}

export const getPackagesByCategory = (category: string): TourPackage[] => {
  if (category === 'All') return tourPackages
  return tourPackages.filter(pkg => pkg.category === category)
}

export const getAllCategories = (): string[] => {
  const categories = ['All', ...Array.from(new Set(tourPackages.map(pkg => pkg.category)))]
  return categories
}

export const getFeaturedPackages = (): TourPackage[] => {
  return tourPackages.filter(pkg => pkg.featured)
}

export const getPackagesByDestination = (destination: string): TourPackage[] => {
  return tourPackages.filter(pkg => 
    pkg.destinations.some(dest => dest.toLowerCase().includes(destination.toLowerCase()))
  )
}

export const sortPackages = (packages: TourPackage[], sortBy: string): TourPackage[] => {
  switch (sortBy) {
    case 'price-low':
      return [...packages].sort((a, b) => a.price - b.price)
    case 'price-high':
      return [...packages].sort((a, b) => b.price - a.price)
    case 'rating':
      return [...packages].sort((a, b) => b.rating - a.rating)
    case 'duration':
      return [...packages].sort((a, b) => {
        const aDays = parseInt(a.duration.split(' ')[0])
        const bDays = parseInt(b.duration.split(' ')[0])
        return aDays - bDays
      })
    case 'popular':
      return [...packages].sort((a, b) => b.reviewCount - a.reviewCount)
    default:
      return packages
  }
}

export const filterPackagesByPrice = (packages: TourPackage[], minPrice: number, maxPrice: number): TourPackage[] => {
  return packages.filter(pkg => pkg.price >= minPrice && pkg.price <= maxPrice)
}

export const searchPackages = (packages: TourPackage[], query: string): TourPackage[] => {
  const lowercaseQuery = query.toLowerCase()
  return packages.filter(pkg =>
    pkg.title.toLowerCase().includes(lowercaseQuery) ||
    pkg.description.toLowerCase().includes(lowercaseQuery) ||
    pkg.destinations.some(dest => dest.toLowerCase().includes(lowercaseQuery)) ||
    pkg.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    pkg.highlights.some(highlight => highlight.toLowerCase().includes(lowercaseQuery))
  )
}