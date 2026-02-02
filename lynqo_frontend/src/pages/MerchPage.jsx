import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, InputGroup } from 'react-bootstrap';
import { FaSearch, FaFilter, FaShoppingCart } from 'react-icons/fa';
import './ShopPage.css';

const MERCH_ITEMS = [
  { id: 1, name: 'Lynqo T-Shirt', category: 'Clothing', price: 25, image: 'https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg' },
  { id: 2, name: 'Lynqo Mug', category: 'Accessories', price: 12, image: 'https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg' },
  { id: 3, name: 'Premium Hoodie', category: 'Clothing', price: 45, image: 'https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg' },
  { id: 4, name: 'Language Sticker Pack', category: 'Stationery', price: 5, image: 'https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg' },
  { id: 5, name: 'Lynqo Cap', category: 'Clothing', price: 20, image: 'https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg' },
  { id: 6, name: 'Notebook', category: 'Stationery', price: 15, image: 'https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg' },
];

const CATEGORIES = ['All', 'Clothing', 'Accessories', 'Stationery'];

export default function MerchPage() {
  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(50);

  // --- FILTER LOGIC ---
  const filteredItems = MERCH_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesPrice = item.price <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className='gradient-bg'>
    <Container className="merch-page py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Lynqo Merchandise Store</h1>
        <p className="lead text-muted">Show your love for language learning with exclusive Lynqo gear!</p>
      </div>

      <Row>
        {/* SIDEBAR FILTERS */}
        <Col lg={3} className="mb-4">
          <Card className="border-0 shadow-sm p-3 sticky-top" style={{top: '20px'}}>
            <h5 className="mb-3"><FaFilter className="me-2"/> Filters</h5>
            
            {/* Search */}
            <Form.Group className="mb-3">
              <Form.Label>Search</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaSearch/></InputGroup.Text>
                <Form.Control 
                  placeholder="T-Shirt, Mug..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            {/* Categories */}
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Price Range */}
            <Form.Group className="mb-3">
              <Form.Label>Max Price: ${priceRange}</Form.Label>
              <Form.Range 
                min={0} 
                max={100} 
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
            </Form.Group>
            
            <Button 
              variant="outline-secondary" 
              size="sm" 
              className="w-100"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setPriceRange(100);
              }}
            >
              Clear Filters
            </Button>
          </Card>
        </Col>

        {/* PRODUCT GRID */}
        <Col lg={9}>
          {filteredItems.length > 0 ? (
            <Row className="g-4">
              {filteredItems.map(item => (
                <Col md={6} lg={4} key={item.id}>
                  <Card className="h-100 border-0 shadow-sm product-card">
                    <div className="product-img-wrapper">
                      <Card.Img variant="top" src={item.image} className="img-fluid" />
                      <div className="hover-overlay">
                        <Button variant="light" size="sm" className="rounded-circle">
                          <FaSearch/>
                        </Button>
                      </div>
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Badge bg="secondary" className="fw-normal">{item.category}</Badge>
                        <span className="fw-bold fs-5 text-primary">${item.price}</span>
                      </div>
                      <Card.Title className="fw-bold h5 mb-3">{item.name}</Card.Title>
                      <Button variant="outline-dark" className="mt-auto w-100 rounded-pill">
                        <FaShoppingCart className="me-2"/> Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5">
              <h4 className="text-muted">No products match your search criteria.</h4>
              <p className="text-muted">Try adjusting your filters or clearing all filters.</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
    </div>
  );
}
