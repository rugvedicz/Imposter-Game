import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'food',
    name: '🍽️ Food & Cooking',
    icon: '🍳',
    hint: 'Something you eat or cook',
    words: [
      'Pizza', 'Burger', 'Sushi', 'Pasta', 'Taco', 'Salad', 'Steak', 'Omelette', 'Sandwich', 'Soup',
      'Pancake', 'Curry', 'Ramen', 'Lasagna', 'Hotdog', 'Risotto', 'Burrito', 'Dumplings', 'Waffles', 'Kebab',
      'Paella', 'Quiche', 'Stir-fry', 'Roast Chicken', 'Fish and Chips', 'Meatballs', 'Fried Rice', 'Nachos', 'Spring Rolls', 'Falafel',
      'Gnocchi', 'Fajitas', 'Baguette', 'Croissant', 'Muffin'
    ]
  },
  {
    id: 'home',
    name: '🏡 Home & Daily Life',
    icon: '🏠',
    hint: 'Found inside a house',
    words: [
      'Mirror', 'Clock', 'Curtain', 'Lamp', 'Vase', 'Blanket', 'Pillow', 'Rug', 'Shelf', 'Toaster',
      'Kettle', 'Broom', 'Key', 'Wallet', 'Remote', 'Toothbrush', 'Towel', 'Soap', 'Sponge', 'Hanger',
      'Vacuum', 'Iron', 'Bucket', 'Dustpan', 'Candle', 'Picture Frame', 'Doormat', 'Basket', 'Fan', 'Heater',
      'Scale', 'Thermometer', 'Flashlight', 'Battery', 'Hammer'
    ]
  },
  {
    id: 'work',
    name: '💻 Work & Productivity',
    icon: '💼',
    hint: 'Related to work or office',
    words: [
      'Laptop', 'Stapler', 'Keyboard', 'Monitor', 'Printer', 'Notebook', 'Calculator', 'Whiteboard', 'Desk', 'Chair',
      'Coffee', 'Meeting', 'Deadline', 'Project', 'Salary', 'Calendar', 'Paperclip', 'Folder', 'Backpack', 'Headphones',
      'Microphone', 'Webcam', 'Scanner', 'Highlighter', 'Eraser', 'Scissors', 'Glue', 'Tape', 'Briefcase', 'Badge',
      'Business Card', 'Envelope', 'Stamp', 'File Cabinet', 'Water Cooler'
    ]
  },
  {
    id: 'nature',
    name: '🌿 Nature & Outdoors',
    icon: '🌳',
    hint: 'Found in nature',
    words: [
      'Mountain', 'River', 'Forest', 'Ocean', 'Desert', 'Island', 'Canyon', 'Waterfall', 'Cloud', 'Rainbow',
      'Flower', 'Tree', 'Grass', 'Stone', 'Cave', 'Beach', 'Valley', 'Volcano', 'Lake', 'Swamp',
      'Jungle', 'Meadow', 'Glacier', 'Cliff', 'Hill', 'Star', 'Moon', 'Sun', 'Rain', 'Snow',
      'Wind', 'Thunder', 'Lightning', 'Leaf', 'Branch'
    ]
  },
  {
    id: 'drinks',
    name: '🥤 Drinks & Refreshments',
    icon: '🧃',
    hint: 'Something you drink',
    words: [
      'Coffee', 'Tea', 'Juice', 'Water', 'Milk', 'Soda', 'Smoothie', 'Lemonade', 'Beer', 'Wine',
      'Cocktail', 'Hot Chocolate', 'Iced Tea', 'Milkshake', 'Cider', 'Espresso', 'Cappuccino', 'Latte', 'Mocha', 'Green Tea',
      'Apple Juice', 'Orange Juice', 'Coconut Water', 'Ginger Ale', 'Root Beer', 'Tonic Water', 'Sparkling Water', 'Energy Drink', 'Sports Drink', 'Kombucha',
      'Champagne', 'Whiskey', 'Vodka', 'Rum', 'Tequila'
    ]
  },
  {
    id: 'furniture',
    name: '🛏️ Living Spaces & Furniture',
    icon: '🛋️',
    hint: 'Used for sitting or storage',
    words: [
      'Sofa', 'Armchair', 'Table', 'Bed', 'Wardrobe', 'Cabinet', 'Bookshelf', 'Stool', 'Bench', 'Ottoman',
      'Desk', 'Sideboard', 'Dresser', 'Nightstand', 'Couch', 'Recliner', 'Coffee Table', 'Dining Table', 'Chair', 'Rocking Chair',
      'Bunk Bed', 'Mattress', 'Headboard', 'Chest of Drawers', 'TV Stand', 'Coat Rack', 'Shoe Rack', 'Mirror', 'Chandelier', 'Lamp',
      'Bean Bag', 'Hammock', 'Desk Chair', 'Folding Chair', 'Bar Stool'
    ]
  },
  {
    id: 'clothing',
    name: '👗 Fashion & Wearables',
    icon: '👕',
    hint: 'Something you wear',
    words: [
      'T-shirt', 'Jeans', 'Jacket', 'Dress', 'Skirt', 'Sweater', 'Scarf', 'Hat', 'Gloves', 'Socks',
      'Shoes', 'Belt', 'Watch', 'Sunglasses', 'Necklace', 'Bracelet', 'Ring', 'Earrings', 'Tie', 'Suit',
      'Coat', 'Raincoat', 'Boots', 'Sneakers', 'Sandals', 'Heels', 'Slippers', 'Pyjamas', 'Swimsuit', 'Beanie',
      'Cap', 'Hoodie', 'Vest', 'Cardigan', 'Blazer'
    ]
  },
  {
    id: 'media',
    name: '🎬 Media & Entertainment',
    icon: '📚',
    hint: 'Related to information or entertainment',
    words: [
      'Book', 'Magazine', 'Newspaper', 'Movie', 'Podcast', 'Radio', 'Television', 'Internet', 'Encyclopedia', 'Dictionary',
      'Comic', 'Novel', 'Journal', 'Blog', 'News', 'Documentary', 'Cartoon', 'Anime', 'Series', 'Video Game',
      'Music', 'Album', 'Song', 'Concert', 'Theater', 'Play', 'Musical', 'Opera', 'Dance', 'Photography',
      'Painting', 'Sculpture', 'Art', 'Cinema', 'Streaming'
    ]
  },
  {
    id: 'animals',
    name: '🐶 Animals & Wildlife',
    icon: '🐾',
    hint: 'A living creature',
    words: [
      'Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Monkey', 'Panda', 'Kangaroo', 'Penguin', 'Dolphin',
      'Whale', 'Eagle', 'Snake', 'Frog', 'Butterfly', 'Dog', 'Cat', 'Horse', 'Cow', 'Pig',
      'Sheep', 'Chicken', 'Duck', 'Rabbit', 'Hamster', 'Mouse', 'Rat', 'Squirrel', 'Fox', 'Wolf',
      'Bear', 'Deer', 'Shark', 'Octopus', 'Turtle'
    ]
  },
  {
    id: 'games',
    name: '🎮 Games & Hobbies',
    icon: '🎲',
    hint: 'Something you do for fun',
    words: [
      'Chess', 'Checkers', 'Monopoly', 'Scrabble', 'Poker', 'Darts', 'Billiards', 'Bowling', 'Video Game', 'Puzzle',
      'Lego', 'Painting', 'Drawing', 'Cooking', 'Gardening', 'Reading', 'Writing', 'Photography', 'Fishing', 'Hiking',
      'Camping', 'Swimming', 'Running', 'Cycling', 'Yoga', 'Dancing', 'Singing', 'Guitar', 'Piano', 'Drums',
      'Knitting', 'Sewing', 'Origami', 'Magic', 'Collecting'
    ]
  },
  {
    id: 'transport',
    name: '🚗 Vehicles & Transport',
    icon: '✈️',
    hint: 'Used for traveling',
    words: [
      'Car', 'Truck', 'Bus', 'Train', 'Bicycle', 'Motorcycle', 'Airplane', 'Helicopter', 'Boat', 'Ship',
      'Submarine', 'Rocket', 'Scooter', 'Skateboard', 'Tractor', 'Ambulance', 'Fire Truck', 'Police Car', 'Taxi', 'Van',
      'Tram', 'Subway', 'Ferry', 'Yacht', 'Canoe', 'Hot Air Balloon', 'Glider', 'Jet Ski', 'Snowmobile', 'Golf Cart',
      'Bicycle', 'Unicycle', 'Tricycle', 'Segway', 'Hoverboard'
    ]
  },
  {
    id: 'education',
    name: '🏫 School & Education',
    icon: '🎓',
    hint: 'Related to learning',
    words: [
      'Teacher', 'Student', 'Classroom', 'Blackboard', 'Textbook', 'Homework', 'Exam', 'Library', 'School Bus', 'Backpack',
      'Pencil', 'Pen', 'Notebook', 'Eraser', 'Ruler', 'Compass', 'Protractor', 'Calculator', 'Microscope', 'Globe',
      'Map', 'Dictionary', 'Encyclopedia', 'Science', 'Math', 'History', 'Geography', 'Art', 'Music', 'Gym',
      'Recess', 'Lunchbox', 'Graduation', 'Diploma', 'University'
    ]
  },
  {
    id: 'snacks',
    name: '🍕 Fast Food & Snacks',
    icon: '🍿',
    hint: 'Quick food or treats',
    words: [
      'Pizza', 'Burger', 'Fries', 'Hotdog', 'Nuggets', 'Taco', 'Nachos', 'Popcorn', 'Chips', 'Pretzels',
      'Cookies', 'Brownies', 'Cake', 'Ice Cream', 'Chocolate', 'Candy', 'Donut', 'Pastry', 'Croissant', 'Muffin',
      'Sandwich', 'Wrap', 'Salad', 'Fruit', 'Yogurt', 'Granola Bar', 'Trail Mix', 'Nuts', 'Jerky', 'Cheese',
      'Crackers', 'Dip', 'Salsa', 'Guacamole', 'Hummus'
    ]
  },
  {
    id: 'events',
    name: '🎉 Events & Celebrations',
    icon: '🎈',
    hint: 'A special occasion',
    words: [
      'Birthday', 'Wedding', 'Party', 'Festival', 'Concert', 'Holiday', 'Christmas', 'Halloween', 'Thanksgiving', 'New Year',
      'Anniversary', 'Graduation', 'Baby Shower', 'Prom', 'Carnival', 'Parade', 'Fair', 'Exhibition', 'Conference', 'Workshop',
      'Seminar', 'Meeting', 'Date', 'Dinner', 'Picnic', 'Barbecue', 'Fireworks', 'Ballon', 'Cake', 'Gift',
      'Invitation', 'Decoration', 'Music', 'Dance', 'Toast'
    ]
  },
  {
    id: 'body',
    name: '🧠 Human Body & Health',
    icon: '💪',
    hint: 'Related to the body or health',
    words: [
      'Brain', 'Heart', 'Lungs', 'Stomach', 'Liver', 'Kidneys', 'Bones', 'Muscles', 'Skin', 'Blood',
      'Eyes', 'Ears', 'Nose', 'Mouth', 'Teeth', 'Tongue', 'Hair', 'Hands', 'Feet', 'Fingers',
      'Toes', 'Arms', 'Legs', 'Shoulders', 'Back', 'Neck', 'Head', 'Face', 'Smile', 'Health',
      'Doctor', 'Nurse', 'Hospital', 'Medicine', 'Exercise'
    ]
  },
  {
    id: 'places',
    name: '🌍 Countries & Places',
    icon: '📍',
    hint: 'A location or nation',
    words: [
      'France', 'Italy', 'Spain', 'Germany', 'Japan', 'China', 'India', 'Brazil', 'Canada', 'USA',
      'UK', 'Australia', 'Egypt', 'Greece', 'Mexico', 'Paris', 'London', 'Tokyo', 'New York', 'Rome',
      'City', 'Town', 'Village', 'Country', 'Continent', 'Capital', 'Beach', 'Park', 'Museum', 'Zoo',
      'Airport', 'Station', 'Hotel', 'Restaurant', 'Shop'
    ]
  }
];
