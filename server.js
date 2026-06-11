const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to SQLite Database
const dbPath = process.env.DATABASE_PATH || path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

function initializeDatabase() {
  // Create tables
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS properties (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        location TEXT,
        price INTEGER,
        bedrooms INTEGER,
        bathrooms REAL,
        area INTEGER,
        image TEXT,
        featured INTEGER,
        type TEXT,
        status TEXT,
        description TEXT,
        agent_name TEXT,
        agent_phone TEXT,
        latitude REAL,
        longitude REAL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        property_id INTEGER,
        property_title TEXT,
        name TEXT,
        email TEXT,
        phone TEXT,
        message TEXT,
        date_sent TEXT
      )
    `);

    // Check if properties table is empty
    db.get("SELECT COUNT(*) as count FROM properties", [], (err, row) => {
      if (err) {
        console.error('Error counting properties:', err.message);
        return;
      }
      if (row.count === 0) {
        console.log('Seeding properties table...');
        seedProperties();
      } else {
        console.log('Properties table already seeded.');
      }
    });
  });
}

function seedProperties() {
  const mockProperties = [
    {
      title: "Sea-facing Luxury Villa",
      location: "Rushikonda, Visakhapatnam",
      price: 150000000,
      bedrooms: 5,
      bathrooms: 6,
      area: 7500,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 1,
      type: "Villa",
      status: "Sale",
      description: "A stunning modern glass villa with panoramic views of the Bay of Bengal, featuring an infinity pool, smart home technology, and exquisite finishes throughout.",
      agent_name: "K. Venkata Rao",
      agent_phone: "+91 94401 23456",
      latitude: 17.7818,
      longitude: 83.3778
    },
    {
      title: "MVP Premium Apartment",
      location: "MVP Colony, Visakhapatnam",
      price: 45000,
      bedrooms: 3,
      bathrooms: 3,
      area: 1800,
      image: "https://images.unsplash.com/photo-1502672260266-1c1e5250bc69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 0,
      type: "Apartment",
      status: "Rent",
      description: "Spacious family apartment located in the heart of MVP Colony. Close to schools, shopping, and only 10 minutes from the beach.",
      agent_name: "K. Venkata Rao",
      agent_phone: "+91 94401 23456",
      latitude: 17.7447,
      longitude: 83.3311
    },
    {
      title: "IT SEZ Executive House",
      location: "Madhurawada, Visakhapatnam",
      price: 65000,
      bedrooms: 4,
      bathrooms: 4,
      area: 3200,
      image: "https://images.unsplash.com/photo-1583608205712-bea7210e75a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 0,
      type: "House",
      status: "Rent",
      description: "Perfect home for IT professionals working in Madhurawada SEZ. Features a large garden, modern kitchen, and quiet neighborhood.",
      agent_name: "S. Appala Naidu",
      agent_phone: "+91 98480 87654",
      latitude: 17.7972,
      longitude: 83.3514
    },
    {
      title: "Beach Road Penthouse",
      location: "Beach Road, Visakhapatnam",
      price: 85000000,
      bedrooms: 4,
      bathrooms: 4,
      area: 4000,
      image: "https://images.unsplash.com/photo-1512918580421-df56bbdf3d98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 1,
      type: "Penthouse",
      status: "Sale",
      description: "Exclusive top-floor living with unobstructed views of the RK Beach. Includes a private terrace, jacuzzi, and premium Italian marble floors.",
      agent_name: "K. Venkata Rao",
      agent_phone: "+91 94401 23456",
      latitude: 17.7144,
      longitude: 83.3235
    },
    {
      title: "Bheemili Coastal Estate",
      location: "Bheemili, Visakhapatnam",
      price: 220000000,
      bedrooms: 6,
      bathrooms: 7,
      area: 12000,
      image: "https://images.unsplash.com/photo-1576941089067-2de309012474?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 1,
      type: "Estate",
      status: "Sale",
      description: "Expansive heritage-style estate located near Bheemunipatnam. Comes with private beach access, a huge lawn, and colonial architecture.",
      agent_name: "S. Appala Naidu",
      agent_phone: "+91 98480 87654",
      latitude: 17.8904,
      longitude: 83.4549
    },
    {
      title: "Bandra Sea Link Penthouse",
      location: "Bandra West, Mumbai",
      price: 450000000,
      bedrooms: 4,
      bathrooms: 4.5,
      area: 4200,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 1,
      type: "Penthouse",
      status: "Sale",
      description: "Exclusive penthouse living with floor-to-ceiling windows overlooking the Arabian Sea. Includes private elevator access and a sprawling rooftop terrace.",
      agent_name: "Priya Sharma",
      agent_phone: "+91 98200 12345",
      latitude: 19.0600,
      longitude: 72.8295
    },
    {
      title: "Juhu Beach Villa",
      location: "Juhu, Mumbai",
      price: 850000000,
      bedrooms: 6,
      bathrooms: 7,
      area: 8500,
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 1,
      type: "Villa",
      status: "Sale",
      description: "A spectacular ultra-luxury villa right on Juhu beach, favored by celebrities. Includes home theater, private gym, and high-tech security.",
      agent_name: "Priya Sharma",
      agent_phone: "+91 98200 12345",
      latitude: 19.1026,
      longitude: 72.8270
    },
    {
      title: "Powai Lakeview Apartment",
      location: "Powai, Mumbai",
      price: 120000,
      bedrooms: 3,
      bathrooms: 3,
      area: 1900,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 0,
      type: "Apartment",
      status: "Rent",
      description: "Beautifully furnished apartment offering scenic views of Powai Lake. Located in a premium gated community with full amenities.",
      agent_name: "Vikram Malhotra",
      agent_phone: "+91 98200 54321",
      latitude: 19.1176,
      longitude: 72.9060
    },
    {
      title: "South Bombay Heritage House",
      location: "Colaba, Mumbai",
      price: 35000,
      bedrooms: 4,
      bathrooms: 4,
      area: 3000,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 0,
      type: "House",
      status: "Rent",
      description: "Exquisite heritage townhome located in the quiet lanes of Colaba. Retains vintage charm with modern upgraded facilities.",
      agent_name: "Vikram Malhotra",
      agent_phone: "+91 98200 54321",
      latitude: 18.9067,
      longitude: 72.8147
    },
    {
      title: "Worli High-Rise Condo",
      location: "Worli, Mumbai",
      price: 320000000,
      bedrooms: 4,
      bathrooms: 4,
      area: 3800,
      image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 0,
      type: "Apartment",
      status: "Sale",
      description: "Sky-high luxury living with breathtaking views of the Mumbai skyline and sea link. Features access to a private club and concierge.",
      agent_name: "Priya Sharma",
      agent_phone: "+91 98200 12345",
      latitude: 19.0178,
      longitude: 72.8172
    },
    {
      title: "Tech Park Independent House",
      location: "Whitefield, Bangalore",
      price: 120000,
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 0,
      type: "House",
      status: "Rent",
      description: "Beautiful independent family home available for rent in a premium gated community featuring a large backyard and proximity to top tech parks.",
      agent_name: "Anil Murthy",
      agent_phone: "+91 94480 12345",
      latitude: 12.9698,
      longitude: 77.7500
    },
    {
      title: "Indiranagar Luxury Villa",
      location: "Indiranagar, Bangalore",
      price: 180000000,
      bedrooms: 5,
      bathrooms: 5,
      area: 5500,
      image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 1,
      type: "Villa",
      status: "Sale",
      description: "Contemporary luxury in Bangalore's most vibrant neighborhood. Featuring a zen garden, private pool, and open concept design.",
      agent_name: "Anil Murthy",
      agent_phone: "+91 94480 12345",
      latitude: 12.9719,
      longitude: 77.6412
    },
    {
      title: "Koramangala Premium Penthouse",
      location: "Koramangala, Bangalore",
      price: 95000000,
      bedrooms: 4,
      bathrooms: 4,
      area: 3800,
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 0,
      type: "Penthouse",
      status: "Sale",
      description: "Opulent penthouse in a highly sought-after area, boasting huge wrap-around balconies and state-of-the-art home automation.",
      agent_name: "Sandhya Hegde",
      agent_phone: "+91 94480 67890",
      latitude: 12.9279,
      longitude: 77.6271
    },
    {
      title: "Hebbal Lakeside Estate",
      location: "Hebbal, Bangalore",
      price: 250000000,
      bedrooms: 6,
      bathrooms: 6,
      area: 8000,
      image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 1,
      type: "Estate",
      status: "Sale",
      description: "A private oasis overlooking Hebbal lake. Comes with incredible outdoor entertainment areas, a guest house, and lush landscaping.",
      agent_name: "Sandhya Hegde",
      agent_phone: "+91 94480 67890",
      latitude: 13.0354,
      longitude: 77.5988
    },
    {
      title: "Electronic City Studio",
      location: "Electronic City, Bangalore",
      price: 35000,
      bedrooms: 1,
      bathrooms: 1,
      area: 600,
      image: "https://images.unsplash.com/photo-1542314831-c6a4d14effbab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 0,
      type: "Apartment",
      status: "Rent",
      description: "Perfectly designed smart studio apartment for professionals, featuring modular furniture and access to coworking spaces in the building.",
      agent_name: "Anil Murthy",
      agent_phone: "+91 94480 12345",
      latitude: 12.8452,
      longitude: 77.6602
    },
    {
      title: "Banjara Hills Premium Apartment",
      location: "Banjara Hills, Hyderabad",
      price: 65000000,
      bedrooms: 3,
      bathrooms: 3.5,
      area: 2400,
      image: "https://images.unsplash.com/photo-1502672260266-1c1e5250bc69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 0,
      type: "Apartment",
      status: "Sale",
      description: "Ultra-luxurious Vastu-compliant apartment with premium Italian marble flooring, high ceilings, and a massive balcony.",
      agent_name: "Srinivas Reddy",
      agent_phone: "+91 98490 12345",
      latitude: 17.4156,
      longitude: 78.4347
    },
    {
      title: "Jubilee Hills Grand Villa",
      location: "Jubilee Hills, Hyderabad",
      price: 350000000,
      bedrooms: 6,
      bathrooms: 7,
      area: 9000,
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 1,
      type: "Villa",
      status: "Sale",
      description: "Magnificent palatial villa offering unmatched luxury. Features a private cinema, massive swimming pool, and quarters for staff.",
      agent_name: "Srinivas Reddy",
      agent_phone: "+91 98490 12345",
      latitude: 17.4265,
      longitude: 78.4124
    },
    {
      title: "HITEC City Tech Penthouse",
      location: "HITEC City, Hyderabad",
      price: 180000,
      bedrooms: 4,
      bathrooms: 4,
      area: 3600,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 0,
      type: "Penthouse",
      status: "Rent",
      description: "Live above the clouds in the IT hub. Fully furnished with ultra-modern decor, perfect for expat executives.",
      agent_name: "Kavitha Rao",
      agent_phone: "+91 98490 98765",
      latitude: 17.4435,
      longitude: 78.3773
    },
    {
      title: "Gachibowli Family House",
      location: "Gachibowli, Hyderabad",
      price: 85000,
      bedrooms: 3,
      bathrooms: 3,
      area: 2400,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 0,
      type: "House",
      status: "Rent",
      description: "Quiet and secure independent house ideal for families, located within a short drive to major international schools and corporate offices.",
      agent_name: "Kavitha Rao",
      agent_phone: "+91 98490 98765",
      latitude: 17.4401,
      longitude: 78.3489
    },
    {
      title: "Manikonda Modern Estate",
      location: "Manikonda, Hyderabad",
      price: 140000000,
      bedrooms: 5,
      bathrooms: 5,
      area: 6500,
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 0,
      type: "Estate",
      status: "Sale",
      description: "A newly built estate blending modern architecture with lush green surroundings. Excellent connectivity to the financial district.",
      agent_name: "Srinivas Reddy",
      agent_phone: "+91 98490 12345",
      latitude: 17.4018,
      longitude: 78.3752
    },
    {
      title: "Heritage Bungalow (For Rent)",
      location: "South Extension, New Delhi",
      price: 250000,
      bedrooms: 6,
      bathrooms: 7,
      area: 9500,
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 0,
      type: "House",
      status: "Rent",
      description: "A regal heritage bungalow available for long-term lease. Features lush green lawns, colonial architecture, and modern opulent interiors.",
      agent_name: "Amit Gupta",
      agent_phone: "+91 98100 12345",
      latitude: 28.5683,
      longitude: 77.2203
    },
    {
      title: "Vasant Vihar Elite Villa",
      location: "Vasant Vihar, New Delhi",
      price: 420000000,
      bedrooms: 5,
      bathrooms: 6,
      area: 8000,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 1,
      type: "Villa",
      status: "Sale",
      description: "Situated in Delhi's most prestigious diplomatic enclave, this villa offers unparalleled privacy, grand entertaining spaces, and bespoke finishes.",
      agent_name: "Amit Gupta",
      agent_phone: "+91 98100 12345",
      latitude: 28.5606,
      longitude: 77.1615
    },
    {
      title: "Gurgaon Golf Course Penthouse",
      location: "Golf Course Road, Gurgaon",
      price: 280000000,
      bedrooms: 4,
      bathrooms: 5,
      area: 5200,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 1,
      type: "Penthouse",
      status: "Sale",
      description: "Breathtaking golf course views from this super-luxury penthouse. Includes access to a world-class clubhouse and 5-star amenities.",
      agent_name: "Neha Joshi",
      agent_phone: "+91 98100 54321",
      latitude: 28.4428,
      longitude: 77.0964
    },
    {
      title: "Noida Expressway Apartment",
      location: "Sector 150, Noida",
      price: 45000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1600,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 0,
      type: "Apartment",
      status: "Rent",
      description: "Bright and airy high-rise apartment in a sports city development, offering huge green spaces and excellent sports facilities.",
      agent_name: "Neha Joshi",
      agent_phone: "+91 98100 54321",
      latitude: 28.4600,
      longitude: 77.4600
    },
    {
      title: "Chhatarpur Farm House",
      location: "Chhatarpur, New Delhi",
      price: 550000000,
      bedrooms: 7,
      bathrooms: 8,
      area: 25000,
      image: "https://images.unsplash.com/photo-1576941089067-2de309012474?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 1,
      type: "Estate",
      status: "Sale",
      description: "An awe-inspiring massive farmhouse estate spread over 2.5 acres. Includes a swimming pool, tennis court, and extensive landscaped gardens.",
      agent_name: "Amit Gupta",
      agent_phone: "+91 98100 12345",
      latitude: 28.5022,
      longitude: 77.1775
    },
    {
      title: "Beachfront Goan Estate",
      location: "Assagao, Goa",
      price: 180000000,
      bedrooms: 5,
      bathrooms: 6,
      area: 6000,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 1,
      type: "Estate",
      status: "Sale",
      description: "Private Portuguese-style estate offering direct beach access, a private pool, lush tropical gardens, and a dedicated entertainment villa.",
      agent_name: "Savio D'Souza",
      agent_phone: "+91 98221 12345",
      latitude: 15.5982,
      longitude: 73.7828
    },
    {
      title: "Anjuna Party Villa",
      location: "Anjuna, Goa",
      price: 350000,
      bedrooms: 4,
      bathrooms: 4,
      area: 3500,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 0,
      type: "Villa",
      status: "Rent",
      description: "The ultimate vacation rental in Goa. Fully serviced luxury villa with an outdoor bar, pool, and walking distance to iconic cafes.",
      agent_name: "Savio D'Souza",
      agent_phone: "+91 98221 12345",
      latitude: 15.5900,
      longitude: 73.7420
    },
    {
      title: "ECR Sea View House",
      location: "ECR, Chennai",
      price: 120000000,
      bedrooms: 4,
      bathrooms: 4,
      area: 4500,
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 0,
      type: "House",
      status: "Sale",
      description: "Stunning independent house located on the scenic East Coast Road. Features private beach access and gorgeous sunrises over the Bay of Bengal.",
      agent_name: "Ramesh Krishnan",
      agent_phone: "+91 98400 12345",
      latitude: 12.8500,
      longitude: 80.2500
    },
    {
      title: "Adyar River View Apartment",
      location: "Adyar, Chennai",
      price: 75000,
      bedrooms: 3,
      bathrooms: 3,
      area: 2100,
      image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 0,
      type: "Apartment",
      status: "Rent",
      description: "Breezy and bright apartment overlooking the Adyar estuary. Located in a prime, peaceful residential neighborhood.",
      agent_name: "Ramesh Krishnan",
      agent_phone: "+91 98400 12345",
      latitude: 13.0033,
      longitude: 80.2550
    },
    {
      title: "Pune Koregaon Park Penthouse",
      location: "Koregaon Park, Pune",
      price: 110000000,
      bedrooms: 4,
      bathrooms: 4,
      area: 4000,
      image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: 1,
      type: "Penthouse",
      status: "Sale",
      description: "Luxurious top-floor living in Pune's most elite area. Surrounded by ancient banyan trees, hip cafes, and premium boutiques.",
      agent_name: "Rohan Deshmukh",
      agent_phone: "+91 98230 12345",
      latitude: 18.5362,
      longitude: 73.8930
    }
  ];

  const stmt = db.prepare(`
    INSERT INTO properties (title, location, price, bedrooms, bathrooms, area, image, featured, type, status, description, agent_name, agent_phone, latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  mockProperties.forEach((p) => {
    stmt.run(
      p.title,
      p.location,
      p.price,
      p.bedrooms,
      p.bathrooms,
      p.area,
      p.image,
      p.featured,
      p.type,
      p.status,
      p.description,
      p.agent_name,
      p.agent_phone,
      p.latitude,
      p.longitude
    );
  });

  stmt.finalize(() => {
    console.log('Seeded 30 properties successfully.');
  });
}

// REST APIs
// 1. Get properties (with search and filters)
app.get('/api/properties', (req, res) => {
  const { search, type, status } = req.query;
  let sql = 'SELECT * FROM properties WHERE 1=1';
  const params = [];

  if (search) {
    sql += ' AND (title LIKE ? OR location LIKE ? OR description LIKE ?)';
    const searchParam = `%${search}%`;
    params.push(searchParam, searchParam, searchParam);
  }

  if (type && type !== 'All') {
    sql += ' AND type = ?';
    params.push(type);
  }

  if (status && status !== 'All') {
    sql += ' AND status = ?';
    params.push(status);
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 2. Get single property
app.get('/api/properties/:id', (req, res) => {
  db.get('SELECT * FROM properties WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }
    res.json(row);
  });
});

// 3. Post contact inquiry
app.post('/api/messages', (req, res) => {
  const { property_id, property_title, name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Name, email, and message are required.' });
    return;
  }

  const date_sent = new Date().toISOString();
  db.run(
    `INSERT INTO messages (property_id, property_title, name, email, phone, message, date_sent)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [property_id || null, property_title || null, name, email, phone || null, message, date_sent],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: this.lastID, message: 'Message sent successfully.' });
    }
  );
});

// 4. Get all contact inquiries (Admin Dashboard)
app.get('/api/messages', (req, res) => {
  db.all('SELECT * FROM messages ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Serve frontend static files
app.use(express.static(__dirname));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
