const { useState, useEffect } = React;

// SVG Icons
const Icons = {
  Home: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Bed: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>,
  Bath: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="7" x2="7" y1="19" y2="21"/><line x1="17" x2="17" y1="19" y2="21"/></svg>,
  Square: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  User: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
};

// Utilities
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

const formatPriceIndian = (price) => {
  if (price === 0) return '₹0';
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2).replace(/\.00$/, '')} Crore`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2).replace(/\.00$/, '')} Lakh`;
  } else {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  }
};

// Components
const Navbar = ({ page, setPage, currentUser, setCurrentUser }) => (
  <nav className="navbar">
    <div className="container nav-content">
      <div className="logo" onClick={() => setPage('home')}>
        <Icons.Home />
        <span>LuxEstate</span>
      </div>
      <ul className="nav-links">
        <li className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>Home</li>
        <li className={page === 'listings' ? 'active' : ''} onClick={() => setPage('listings')}>Listings</li>
        <li className={page === 'admin' ? 'active' : ''} onClick={() => setPage('admin')}>Dashboard</li>
      </ul>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {currentUser ? (
          <>
            <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-light)', marginRight: '0.5rem' }}>
              Welcome, <strong style={{ color: 'var(--primary)' }}>{currentUser.name}</strong>!
            </span>
            <button className="btn btn-outline" onClick={() => { setCurrentUser(null); setPage('home'); }} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-outline" onClick={() => setPage('login')} style={{ border: 'none', color: 'var(--text-color)' }}>Sign In</button>
            <button className="btn btn-primary" onClick={() => setPage('register')}>Register</button>
          </>
        )}
      </div>
    </div>
  </nav>
);

const Footer = ({ setPage }) => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <h3>LuxEstate</h3>
          <p className="text-light" style={{color: '#94a3b8', marginTop: '1rem'}}>
            Premium real estate services for those who seek the extraordinary. Powered by Node.js & SQL.
          </p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li onClick={() => setPage('home')}>Home</li>
            <li onClick={() => setPage('listings')}>Listings</li>
            <li onClick={() => setPage('admin')}>Admin Dashboard</li>
          </ul>
        </div>
        <div>
          <h3>Legal</h3>
          <ul className="footer-links">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div>
          <h3>Contact Us</h3>
          <ul className="footer-links">
            <li>123 Luxury Way</li>
            <li>Visakhapatnam, AP, India</li>
            <li>contact@luxestate.com</li>
            <li>+91 94401 23456</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} LuxEstate. All rights reserved.
      </div>
    </div>
  </footer>
);

const PropertyCard = ({ property, onSelect }) => (
  <div className="property-card" onClick={() => onSelect(property)}>
    <div className="property-image-container">
      {property.featured === 1 && <div className="property-badge">Featured</div>}
      <div className="property-badge" style={{ left: 'auto', right: '1rem', backgroundColor: property.status === 'Rent' ? '#10b981' : '#f59e0b' }}>
        For {property.status}
      </div>
      <img src={property.image} alt={property.title} className="property-image" loading="lazy" />
      <div className="property-price">{formatPrice(property.price)}</div>
    </div>
    <div className="property-content">
      <h3 className="property-title">{property.title}</h3>
      <div className="property-location">
        <Icons.MapPin />
        <span>{property.location}</span>
      </div>
      <div className="property-features">
        <div className="property-feature">
          <Icons.Bed />
          <span>{property.bedrooms} Beds</span>
        </div>
        <div className="property-feature">
          <Icons.Bath />
          <span>{property.bathrooms} Baths</span>
        </div>
        <div className="property-feature">
          <Icons.Square />
          <span>{property.area} sqft</span>
        </div>
      </div>
    </div>
  </div>
);

// Pages
const Home = ({ setPage, onSelect, properties, onSearch }) => {
  const [searchVal, setSearchVal] = useState('');
  const featuredProperties = properties.filter(p => p.featured === 1).slice(0, 3);
  
  return (
    <div className="fade-in">
      <section className="hero">
        <div className="container" style={{position: 'relative', zIndex: 10, width: '100%'}}>
          <div className="hero-content">
            <h1 className="hero-title text-5xl">Find Your Dream Home Today</h1>
            <p className="hero-subtitle">Discover the most premium and exclusive properties in top locations.</p>
            
            <div className="hero-search">
              <input 
                type="text" 
                placeholder="Search by city, neighborhood (e.g. Visakhapatnam)..." 
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    onSearch(searchVal);
                    setPage('listings');
                  }
                }}
              />
              <button className="btn btn-primary" onClick={() => { onSearch(searchVal); setPage('listings'); }}>
                <Icons.Search />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl">Featured Properties</h2>
          <p className="text-light mt-4">Handpicked luxury properties for you</p>
        </div>
        
        <div className="property-grid">
          {featuredProperties.map(prop => (
            <PropertyCard key={prop.id} property={prop} onSelect={onSelect} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="btn btn-outline" onClick={() => { onSearch(''); setPage('listings'); }}>
            View All Properties
          </button>
        </div>
      </section>
      
      <section style={{ backgroundColor: 'white' }} className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl mb-8">Why Choose LuxEstate?</h2>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ flex: '1', minWidth: '250px', padding: '2rem' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--bg-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--secondary)' }}>
                <Icons.Home />
              </div>
              <h3 className="mb-2">Premium Selection</h3>
              <p className="text-light">We only list properties that meet our strict luxury standards.</p>
            </div>
            <div style={{ flex: '1', minWidth: '250px', padding: '2rem' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--bg-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--secondary)' }}>
                <Icons.MapPin />
              </div>
              <h3 className="mb-2">Prime Locations</h3>
              <p className="text-light">Properties situated in the most desirable neighborhoods worldwide.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Listings = ({ onSelect, properties, loading, onSearch }) => {
  const [filter, setFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Dynamic max price determination
  const matchingProperties = properties.filter(p => {
    const typeMatch = filter === 'All' || p.type === filter;
    const statusMatch = statusFilter === 'All' || p.status === statusFilter;
    return typeMatch && statusMatch;
  });

  const prices = matchingProperties.map(p => p.price);
  const maxAvailablePrice = prices.length > 0 ? Math.max(...prices) : 1000000000;

  const [priceLimit, setPriceLimit] = useState(maxAvailablePrice);

  // Sync priceLimit with the maximum price whenever filters change
  useEffect(() => {
    setPriceLimit(maxAvailablePrice);
  }, [filter, statusFilter, properties]);

  // Adjust step dynamically
  const step = maxAvailablePrice > 10000000 ? 5000000 : (maxAvailablePrice > 1000000 ? 100000 : 5000);

  // Filter by price
  const filteredProperties = matchingProperties.filter(p => p.price <= priceLimit);

  const types = ['All', 'House', 'Villa', 'Penthouse', 'Apartment', 'Estate'];

  return (
    <div className="container py-12 fade-in">
      <div className="mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="text-4xl mb-2">Property Listings</h1>
          <p className="text-light">Explore our complete collection of luxury real estate stored in SQL.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '400px' }}>
          <div className="hero-search" style={{ margin: 0, width: '100%', border: '1px solid var(--border-color)' }}>
            <input 
              type="text" 
              placeholder="Search listings..." 
              onChange={e => onSearch(e.target.value)} 
              style={{ padding: '0.5rem 1rem' }}
            />
          </div>
        </div>
      </div>

      {/* Premium Filter Controls with Range Meter */}
      <div style={{ 
        background: 'white', 
        padding: '1.5rem', 
        borderRadius: 'var(--radius-lg)', 
        border: '1px solid var(--border-color)', 
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          {/* Type Filter */}
          <div style={{ flex: '1 1 300px' }}>
            <h4 style={{ marginBottom: '0.75rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)' }}>Property Type</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {types.map(t => (
                <button 
                  key={t}
                  className={`btn ${filter === t ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setFilter(t)}
                  style={{ borderRadius: '9999px', padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          {/* Status Filter */}
          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ marginBottom: '0.75rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)' }}>Purchase Type</h4>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['All', 'Sale', 'Rent'].map(s => (
                <button 
                  key={s}
                  className={`btn ${statusFilter === s ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setStatusFilter(s)}
                  style={{ borderRadius: '9999px', padding: '0.4rem 0.9rem', fontSize: '0.8rem', flex: 1 }}
                >
                  {s === 'All' ? 'All' : s === 'Sale' ? 'For Buy' : 'For Rent'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />

        {/* Range Meter */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', margin: 0 }}>
              Price Range Meter
            </h4>
            <span style={{ fontWeight: 700, color: 'var(--secondary)', fontSize: '1.1rem', background: 'var(--bg-color)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              Max Price: {formatPriceIndian(priceLimit)}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 500 }}>₹0</span>
            <input 
              type="range" 
              min="0" 
              max={maxAvailablePrice} 
              step={step}
              value={priceLimit} 
              onChange={e => setPriceLimit(Number(e.target.value))} 
              style={{ 
                flexGrow: 1, 
                accentColor: 'var(--secondary)', 
                height: '6px', 
                borderRadius: '3px',
                cursor: 'pointer'
              }} 
            />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 500 }}>
              {formatPriceIndian(maxAvailablePrice)}
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-light">Loading properties from SQL database...</div>
      ) : (
        <div className="property-grid">
          {filteredProperties.map(prop => (
            <PropertyCard key={prop.id} property={prop} onSelect={onSelect} />
          ))}
        </div>
      )}
      
      {!loading && filteredProperties.length === 0 && (
        <div className="text-center py-20 text-light">
          No properties found matching your criteria.
        </div>
      )}
    </div>
  );
};

const PropertyDetails = ({ property, onBack }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState({ type: '', text: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [property]);

  // Leaflet Map Initialization
  useEffect(() => {
    if (!property || !property.latitude || !property.longitude) return;

    const mapContainer = document.getElementById('property-map');
    if (!mapContainer) return;

    // Reset container contents to avoid "Map container is already initialized"
    mapContainer.innerHTML = '<div id="map-inner" style="height: 100%; width: 100%; border-radius: var(--radius-md);"></div>';

    try {
      const map = L.map('map-inner').setView([property.latitude, property.longitude], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Custom marker icon using Leaflet default
      L.marker([property.latitude, property.longitude]).addTo(map)
        .bindPopup(`<b>${property.title}</b><br>${property.location}`)
        .openPopup();

      // Adjust map layout after initialization
      setTimeout(() => {
        map.invalidateSize();
      }, 200);

      return () => {
        map.remove();
      };
    } catch (e) {
      console.error("Map initialization failed", e);
    }
  }, [property]);

  if (!property) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    setSubmitStatus({ type: 'info', text: 'Sending message...' });

    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        property_id: property.id,
        property_title: property.title,
        ...formData
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to submit message.');
        return res.json();
      })
      .then(data => {
        setSubmitStatus({ type: 'success', text: 'Message saved to SQL Database! The agent will contact you shortly.' });
        setFormData({ name: '', email: '', phone: '', message: '' });
      })
      .catch(err => {
        setSubmitStatus({ type: 'error', text: 'Failed to send message. Please verify backend connection.' });
      });
  };

  return (
    <div className="container py-12 fade-in">
      <button className="btn btn-outline mb-8" onClick={onBack}>
        <Icons.ArrowLeft />
        Back to Listings
      </button>

      <div className="details-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="text-4xl mb-2">{property.title}</h1>
            <div className="property-location" style={{ fontSize: '1rem', marginBottom: 0 }}>
              <Icons.MapPin />
              <span>{property.location}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {property.featured === 1 && <span className="property-badge" style={{ position: 'static', display: 'inline-block' }}>Featured</span>}
            <span className="property-badge" style={{ position: 'static', display: 'inline-block', backgroundColor: property.status === 'Rent' ? '#10b981' : '#f59e0b' }}>
              For {property.status}
            </span>
          </div>
        </div>
      </div>

      <div className="details-image-grid">
        <img src={property.image} alt={property.title} className="details-main-image" />
        <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Interior" className="details-sub-image" />
        <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Interior 2" className="details-sub-image" />
      </div>

      <div className="details-content-wrapper">
        <div className="details-info">
          <h2>About this property</h2>
          <p className="details-description">{property.description}</p>
          
          <h2>Property Details</h2>
          <div className="details-features-grid">
            <div className="details-feature-item">
              <Icons.Bed />
              <div>
                <div className="details-feature-value">{property.bedrooms}</div>
                <div className="details-feature-label">Bedrooms</div>
              </div>
            </div>
            <div className="details-feature-item">
              <Icons.Bath />
              <div>
                <div className="details-feature-value">{property.bathrooms}</div>
                <div className="details-feature-label">Bathrooms</div>
              </div>
            </div>
            <div className="details-feature-item">
              <Icons.Square />
              <div>
                <div className="details-feature-value">{property.area}</div>
                <div className="details-feature-label">Square Feet</div>
              </div>
            </div>
          </div>

          <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Location Map</h2>
          <p className="text-light" style={{ marginBottom: '1rem' }}>Use the interactive map below to explore the surrounding neighborhood.</p>
          {/* Map Element */}
          <div id="property-map" style={{ height: '320px', width: '100%', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '2rem', zIndex: 1, position: 'relative' }}>
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)', background: '#e2e8f0' }}>Loading Map...</div>
          </div>
        </div>
        
        <div>
          <div className="contact-card">
            <div className="contact-card-price">{formatPrice(property.price)}</div>
            
            {/* Agent Contact Card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', background: 'var(--bg-color)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icons.User />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--primary)' }}>{property.agent_name || 'In-House Agent'}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                  <Icons.Phone />
                  <span>{property.agent_phone || '+91 94401 23456'}</span>
                </div>
              </div>
            </div>

            <h3 className="mb-4">Contact Agent</h3>
            <form onSubmit={handleSubmitMessage}>
              <div className="form-group">
                <input type="text" name="name" className="form-control" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <input type="email" name="email" className="form-control" placeholder="Your Email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <input type="tel" name="phone" className="form-control" placeholder="Phone Number (Optional)" value={formData.phone} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <textarea name="message" className="form-control" placeholder={`I am interested in ${property.title}...`} value={formData.message} onChange={handleInputChange} required></textarea>
              </div>
              <button className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
            </form>

            {submitStatus.text && (
              <div style={{ 
                marginTop: '1rem', 
                padding: '0.75rem 1rem', 
                borderRadius: 'var(--radius-md)', 
                fontSize: '0.875rem', 
                background: submitStatus.type === 'success' ? '#d1fae5' : submitStatus.type === 'error' ? '#fee2e2' : '#dbeafe',
                color: submitStatus.type === 'success' ? '#065f46' : submitStatus.type === 'error' ? '#991b1b' : '#1e40af',
                border: `1px solid ${submitStatus.type === 'success' ? '#a7f3d0' : submitStatus.type === 'error' ? '#fca5a5' : '#bfdbfe'}`
              }}>
                {submitStatus.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Login = ({ setPage, setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => { throw new Error(data.error || 'Login failed') });
        }
        return res.json();
      })
      .then(data => {
        setCurrentUser(data.user);
        setPage('home');
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container py-20 fade-in" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div className="contact-card" style={{ padding: '2.5rem' }}>
        <h2 className="text-3xl mb-2 text-center">Welcome Back</h2>
        <p className="text-light text-center mb-6">Sign in to your LuxEstate account</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
            <input type="email" className="form-control" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group mb-6">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
            <input type="password" className="form-control" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem' }} disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {error && (
          <div style={{ 
            marginBottom: '1rem', 
            padding: '0.75rem 1rem', 
            borderRadius: 'var(--radius-md)', 
            fontSize: '0.875rem', 
            background: '#fee2e2',
            color: '#991b1b',
            border: '1px solid #fca5a5'
          }}>
            {error}
          </div>
        )}

        <div className="text-center text-light">
          Don't have an account? <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }} onClick={() => setPage('register')}>Register here</span>
        </div>
      </div>
    </div>
  );
};

const Register = ({ setPage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: '', text: '' });
    setLoading(true);

    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => { throw new Error(data.error || 'Registration failed') });
        }
        return res.json();
      })
      .then(data => {
        setStatus({ type: 'success', text: 'Account created successfully! Redirecting to login...' });
        setName('');
        setEmail('');
        setPassword('');
        setTimeout(() => {
          setPage('login');
        }, 1500);
      })
      .catch(err => {
        setStatus({ type: 'error', text: err.message });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container py-20 fade-in" style={{ maxWidth: '450px', margin: '0 auto' }}>
      <div className="contact-card" style={{ padding: '2.5rem' }}>
        <h2 className="text-3xl mb-2 text-center">Create an Account</h2>
        <p className="text-light text-center mb-6">Join LuxEstate to save your favorite properties</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
            <input type="text" className="form-control" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
            <input type="email" className="form-control" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group mb-6">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
            <input type="password" className="form-control" placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem' }} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {status.text && (
          <div style={{ 
            marginBottom: '1rem', 
            padding: '0.75rem 1rem', 
            borderRadius: 'var(--radius-md)', 
            fontSize: '0.875rem', 
            background: status.type === 'success' ? '#d1fae5' : '#fee2e2',
            color: status.type === 'success' ? '#065f46' : '#991b1b',
            border: `1px solid ${status.type === 'success' ? '#a7f3d0' : '#fca5a5'}`
          }}>
            {status.text}
          </div>
        )}

        <div className="text-center text-light">
          Already have an account? <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }} onClick={() => setPage('login')}>Sign In</span>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = ({ onBack }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching messages:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-12 fade-in">
      <button className="btn btn-outline mb-8" onClick={onBack}>
        <Icons.ArrowLeft />
        Back to Home
      </button>

      <h1 className="text-4xl mb-4">Inquiries Dashboard</h1>
      <p className="text-light mb-8">View contact requests and messages submitted by potential buyers stored in the SQLite database.</p>

      {loading ? (
        <div className="text-center py-20 text-light">Loading inquiries...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20 text-light" style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', padding: '4rem' }}>
          No inquiries received yet. Try filling out the contact form on any listing page!
        </div>
      ) : (
        <div style={{ overflowX: 'auto', background: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Property</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Client Name</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Contact Info</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-light)', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                    {new Date(msg.date_sent).toLocaleString()}
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 500 }}>
                    {msg.property_title || 'General Inquiry'}
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 500 }}>
                    {msg.name}
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.875rem' }}>
                    <div>{msg.email}</div>
                    {msg.phone && <div style={{ color: 'var(--text-light)', marginTop: '0.25rem' }}>{msg.phone}</div>}
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-light)', whiteSpace: 'pre-wrap', maxWidth: '300px' }}>
                    {msg.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Main App component
const App = () => {
  const [page, setPage] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const fetchProperties = (query = '') => {
    setLoading(true);
    let url = '/api/properties';
    if (query) {
      url += `?search=${encodeURIComponent(query)}`;
    }
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching properties:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSelectProperty = (prop) => {
    setSelectedProperty(prop);
    setPage('details');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchProperties(query);
  };

  return (
    <div>
      <Navbar page={page} setPage={setPage} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main style={{ minHeight: 'calc(100vh - 4.5rem)' }}>
        {page === 'home' && <Home setPage={setPage} onSelect={handleSelectProperty} properties={properties} onSearch={handleSearch} />}
        {page === 'listings' && <Listings onSelect={handleSelectProperty} properties={properties} loading={loading} onSearch={handleSearch} />}
        {page === 'details' && <PropertyDetails property={selectedProperty} onBack={() => setPage('listings')} />}
        {page === 'login' && <Login setPage={setPage} setCurrentUser={setCurrentUser} />}
        {page === 'register' && <Register setPage={setPage} />}
        {page === 'admin' && <AdminDashboard onBack={() => setPage('home')} />}
      </main>
      <Footer setPage={setPage} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
