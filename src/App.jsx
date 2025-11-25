import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  
  // Voucher state
  const [vouchers, setVouchers] = useState([
    { id: 1, code: 'WELCOME50', discount: '50%', type: 'percentage', used: 47, limit: 100, active: true },
    { id: 2, code: 'HVAC20', discount: '20%', type: 'percentage', used: 12, limit: 50, active: true },
    { id: 3, code: 'PLUMBING100', discount: '₱100', type: 'fixed', used: 5, limit: 25, active: true },
  ]);

  const [newVoucher, setNewVoucher] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    redemptionLimit: ''
  });

  const handleCreateVoucher = (e) => {
    e.preventDefault();
    const voucher = {
      id: Date.now(),
      code: newVoucher.code.toUpperCase(),
      discount: newVoucher.discountType === 'percentage' 
        ? `${newVoucher.discountValue}%` 
        : `₱${newVoucher.discountValue}`,
      type: newVoucher.discountType,
      used: 0,
      limit: parseInt(newVoucher.redemptionLimit),
      active: true
    };
    setVouchers([voucher, ...vouchers]);
    setNewVoucher({ code: '', discountType: 'percentage', discountValue: '', redemptionLimit: '' });
    alert('Voucher created successfully!');
  };

  const toggleVoucherStatus = (id) => {
    setVouchers(vouchers.map(v => 
      v.id === id ? { ...v, active: !v.active } : v
    ));
  };

  const renderDashboard = () => (
    <div className="dashboard-content">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <div className="stat-value">127</div>
            <div className="stat-label">Total Jobs</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <div className="stat-value">23</div>
            <div className="stat-label">This Month</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <div className="stat-value">₱45,600</div>
            <div className="stat-label">Revenue</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <div className="stat-value">4.8</div>
            <div className="stat-label">Rating</div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Jobs</h2>
        <div className="jobs-table">
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>Toilet Repair</td>
                <td>Nov 24, 2025</td>
                <td><span className="status-badge completed">Completed</span></td>
                <td>₱1,350</td>
              </tr>
              <tr>
                <td>Maria Santos</td>
                <td>Leak Repair</td>
                <td>Nov 23, 2025</td>
                <td><span className="status-badge completed">Completed</span></td>
                <td>₱2,250</td>
              </tr>
              <tr>
                <td>Robert Chen</td>
                <td>Drain Cleaning</td>
                <td>Nov 25, 2025</td>
                <td><span className="status-badge pending">Scheduled</span></td>
                <td>₱900</td>
              </tr>
              <tr>
                <td>Lisa Garcia</td>
                <td>Pipe Installation</td>
                <td>Nov 26, 2025</td>
                <td><span className="status-badge pending">Scheduled</span></td>
                <td>₱3,600</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Performance Trends</h2>
        <div className="trend-card">
          <p>📈 Your bookings are up 15% this month</p>
          <p>⭐ You've maintained a 4.8+ rating for 6 months</p>
          <p>💬 Response time: Average 2.3 hours</p>
        </div>
      </div>

      <div className="quick-actions">
        <button className="action-btn">Update Availability</button>
        <button className="action-btn" onClick={() => setCurrentView('messages')}>View Messages</button>
        <button className="action-btn" onClick={() => setCurrentView('vouchers')}>Create Voucher</button>
      </div>
    </div>
  );

  const renderVouchers = () => (
    <div className="vouchers-content">
      <h1>Voucher Management</h1>
      
      <div className="voucher-create-section">
        <h2>Create New Voucher</h2>
        <form onSubmit={handleCreateVoucher} className="voucher-form">
          <div className="form-row">
            <div className="form-group">
              <label>Voucher Code</label>
              <input
                type="text"
                value={newVoucher.code}
                onChange={(e) => setNewVoucher({...newVoucher, code: e.target.value})}
                placeholder="e.g., SUMMER25"
                required
              />
            </div>
            <div className="form-group">
              <label>Discount Type</label>
              <select
                value={newVoucher.discountType}
                onChange={(e) => setNewVoucher({...newVoucher, discountType: e.target.value})}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₱)</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Discount Value</label>
              <input
                type="number"
                value={newVoucher.discountValue}
                onChange={(e) => setNewVoucher({...newVoucher, discountValue: e.target.value})}
                placeholder={newVoucher.discountType === 'percentage' ? '10' : '100'}
                required
              />
            </div>
            <div className="form-group">
              <label>Redemption Limit</label>
              <input
                type="number"
                value={newVoucher.redemptionLimit}
                onChange={(e) => setNewVoucher({...newVoucher, redemptionLimit: e.target.value})}
                placeholder="100"
                required
              />
            </div>
          </div>
          <button type="submit" className="create-voucher-btn">Create Voucher</button>
        </form>
      </div>

      <div className="vouchers-list-section">
        <h2>Active Vouchers</h2>
        <div className="vouchers-grid">
          {vouchers.map(voucher => (
            <div key={voucher.id} className={`voucher-card ${!voucher.active ? 'inactive' : ''}`}>
              <div className="voucher-header">
                <h3>{voucher.code}</h3>
                <span className={`voucher-status ${voucher.active ? 'active' : 'inactive'}`}>
                  {voucher.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="voucher-discount">{voucher.discount} OFF</div>
              <div className="voucher-usage">
                <div className="usage-bar">
                  <div 
                    className="usage-fill" 
                    style={{width: `${(voucher.used / voucher.limit) * 100}%`}}
                  ></div>
                </div>
                <div className="usage-text">{voucher.used} / {voucher.limit} used</div>
              </div>
              <button 
                className="toggle-status-btn"
                onClick={() => toggleVoucherStatus(voucher.id)}
              >
                {voucher.active ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="messages-content">
      <div className="chat-header-provider">
        <div className="customer-info">
          <div className="customer-avatar">RC</div>
          <div>
            <h2>Robert Chen</h2>
            <p>Drain Cleaning • Nov 25, 10:00 AM</p>
          </div>
        </div>
      </div>
      
      <div className="chat-messages-provider">
        <div className="chat-message-provider customer">
          <div className="message-bubble">
            <p>Hi! I have a clogged drain in my kitchen. Can you help?</p>
            <span className="message-time-small">9:30 AM</span>
          </div>
        </div>
        
        <div className="chat-message-provider provider">
          <div className="message-bubble">
            <p>Yes, I can help with that! I have availability tomorrow at 10 AM. Does that work for you?</p>
            <span className="message-time-small">9:35 AM</span>
          </div>
        </div>
        
        <div className="chat-message-provider customer">
          <div className="message-bubble">
            <p>Perfect! See you tomorrow at 10 AM. The address is 123 Main St, Makati.</p>
            <span className="message-time-small">9:40 AM</span>
          </div>
        </div>
        
        <div className="chat-message-provider provider">
          <div className="message-bubble">
            <p>Great! I'll be there on time. Please ensure the area around the sink is accessible.</p>
            <span className="message-time-small">9:45 AM</span>
          </div>
        </div>
        
        <div className="chat-message-provider customer">
          <div className="message-bubble">
            <p>Will do! Thank you!</p>
            <span className="message-time-small">9:50 AM</span>
          </div>
        </div>
      </div>
      
      <div className="chat-input-provider">
        <input type="text" placeholder="Type a message..." />
        <button className="send-btn-provider">➤</button>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="schedule-content">
      {/* Active Job Card */}
      <div className="active-job-card">
        <div className="job-status-badge">On the Way</div>
        <h2>Robert Chen</h2>
        <p className="job-service">Drain Cleaning</p>
        <p className="job-time">Scheduled: Today, 10:00 AM</p>
      </div>
      
      {/* Map View */}
      <div className="map-container-provider">
        <div className="map-placeholder">
          <div className="map-pin your-location">📍</div>
          <div className="route-line"></div>
          <div className="map-pin customer-location">🏠</div>
          <div className="map-info">
            <p><strong>3.2 km</strong> away</p>
            <p>~12 mins drive</p>
          </div>
        </div>
      </div>
      
      {/* Customer Location */}
      <div className="location-card">
        <h3>📍 Customer Location</h3>
        <p className="address">123 Main St, Makati City, Metro Manila</p>
        <button className="navigate-btn">🧭 Navigate</button>
      </div>
      
      {/* Job Actions */}
      <div className="job-actions">
        <button className="action-btn-large arrived">I've Arrived</button>
        <button className="action-btn-large start">Start Job</button>
      </div>
      
      {/* Upcoming Jobs */}
      <div className="upcoming-section">
        <h3>Upcoming Jobs</h3>
        <div className="mini-job-card">
          <div className="mini-job-date">Nov 26, 2:00 PM</div>
          <div className="mini-job-details">
            <strong>Lisa Garcia</strong>
            <p>Pipe Installation</p>
            <p className="mini-job-address">📍 456 Oak Ave, Quezon City</p>
          </div>
        </div>
        <div className="mini-job-card">
          <div className="mini-job-date">Nov 27, 9:00 AM</div>
          <div className="mini-job-details">
            <strong>James Wilson</strong>
            <p>Toilet Repair</p>
            <p className="mini-job-address">📍 789 Pine Rd, Pasig</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="profile-content">
      <h1>Profile & Settings</h1>
      
      {/* Verification Status */}
      <div className="verification-banner">
        <div className="verification-status verified">
          ✓ Verified Provider
        </div>
        <p>Your account has been verified and approved</p>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-avatar-large">SC</div>
        <button className="change-photo-btn">Change Photo</button>
        <h2>Sarah Chen</h2>
        <p className="profile-specialty">Plumbing Specialist</p>
        <div className="profile-stats">
          <div>⭐ 4.8 Rating</div>
          <div>📊 127 Jobs</div>
          <div>⏱️ 8 Years</div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="profile-section">
        <h3>Personal Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Full Name</label>
            <input type="text" value="Sarah Chen" />
          </div>
          <div className="info-item">
            <label>Email</label>
            <input type="email" value="sarah.chen@email.com" />
          </div>
          <div className="info-item">
            <label>Phone</label>
            <input type="tel" value="+63 917 123 4567" />
          </div>
          <div className="info-item">
            <label>Address</label>
            <input type="text" value="Makati City, Metro Manila" />
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div className="profile-section">
        <h3>Service Details</h3>
        <div className="info-item">
          <label>Specialties</label>
          <textarea rows="3">Toilet repair, drain cleaning, clog removal, bathroom fixtures, leak repair, emergency plumbing</textarea>
        </div>
        <div className="info-item">
          <label>Service Areas</label>
          <input type="text" value="Makati, Taguig, Pasig, Mandaluyong, Quezon City" />
        </div>
        <div className="info-item">
          <label>Years of Experience</label>
          <input type="number" value="8" />
        </div>
        <div className="info-item">
          <label>Hourly Rate (₱)</label>
          <input type="number" value="45" />
        </div>
      </div>

      {/* Payment Details */}
      <div className="profile-section payment-section">
        <h3>💳 Payment Details</h3>
        <p className="section-desc">Where you'll receive your earnings</p>
        <div className="info-grid">
          <div className="info-item">
            <label>Bank Name</label>
            <input type="text" value="BDO Unibank" />
          </div>
          <div className="info-item">
            <label>Account Number</label>
            <input type="text" value="**** **** 1234" />
          </div>
          <div className="info-item">
            <label>Account Name</label>
            <input type="text" value="Sarah Chen" />
          </div>
          <div className="info-item">
            <label>Payment Method</label>
            <select>
              <option>Bank Transfer</option>
              <option>GCash</option>
              <option>PayMaya</option>
            </select>
          </div>
        </div>
        <div className="payment-verified">
          ✓ Payment details verified
        </div>
      </div>

      {/* Availability */}
      <div className="profile-section">
        <h3>Availability</h3>
        <div className="availability-toggle">
          <label className="toggle-label">
            <input type="checkbox" defaultChecked />
            <span className="toggle-slider"></span>
            <span className="toggle-text">Currently accepting jobs</span>
          </label>
        </div>
        <div className="info-item">
          <label>Working Hours</label>
          <input type="text" value="Mon-Sat, 8:00 AM - 6:00 PM" />
        </div>
      </div>

      <button className="save-profile-btn">Save Changes</button>
    </div>
  );

  const renderDocuments = () => (
    <div className="documents-content">
      <h1>Documents</h1>
      <div className="documents-grid">
        <div className="document-card">
          <div className="document-icon">📄</div>
          <div className="document-info">
            <strong>Business Permit</strong>
            <p>Expires: Dec 31, 2025</p>
            <span className="doc-status verified">✓ Verified</span>
          </div>
        </div>
        <div className="document-card">
          <div className="document-icon">📄</div>
          <div className="document-info">
            <strong>Plumbing License</strong>
            <p>Expires: Jun 30, 2026</p>
            <span className="doc-status verified">✓ Verified</span>
          </div>
        </div>
        <div className="document-card">
          <div className="document-icon">📄</div>
          <div className="document-info">
            <strong>Insurance Certificate</strong>
            <p>Expires: Mar 15, 2026</p>
            <span className="doc-status verified">✓ Verified</span>
          </div>
        </div>
      </div>
      <button className="upload-doc-btn">+ Upload New Document</button>
    </div>
  );

  const renderWorkSamples = () => (
    <div className="work-samples-content">
      <h1>Work Samples</h1>
      <div className="samples-grid">
        <div className="sample-card">
          <div className="sample-image">🚿</div>
          <p>Bathroom Renovation</p>
        </div>
        <div className="sample-card">
          <div className="sample-image">🚰</div>
          <p>Kitchen Sink Installation</p>
        </div>
        <div className="sample-card">
          <div className="sample-image">🔧</div>
          <p>Pipe Repair</p>
        </div>
        <div className="sample-card">
          <div className="sample-image">💧</div>
          <p>Water Heater Service</p>
        </div>
      </div>
      <button className="upload-sample-btn">+ Add Work Sample</button>
    </div>
  );

  return (
    <div className="provider-app">
      {/* Top Header */}
      <div className="top-header">
        <div className="header-logo">
          <span className="logo-icon">🔧</span>
          <span className="logo-text">HNDY Provider</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">

        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'vouchers' && renderVouchers()}
        {currentView === 'messages' && renderMessages()}
        {currentView === 'schedule' && renderSchedule()}
        {currentView === 'profile' && renderProfile()}
        {currentView === 'documents' && renderDocuments()}
        {currentView === 'work-samples' && renderWorkSamples()}
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button 
          className={currentView === 'dashboard' ? 'nav-item active' : 'nav-item'}
          onClick={() => setCurrentView('dashboard')}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-label">Dashboard</span>
        </button>
        <button 
          className={currentView === 'messages' ? 'nav-item active' : 'nav-item'}
          onClick={() => setCurrentView('messages')}
        >
          <span className="nav-icon">💬</span>
          <span className="nav-label">Messages</span>
        </button>
        <button 
          className={currentView === 'schedule' ? 'nav-item active' : 'nav-item'}
          onClick={() => setCurrentView('schedule')}
        >
          <span className="nav-icon">📅</span>
          <span className="nav-label">Schedule</span>
        </button>
        <button 
          className={currentView === 'profile' ? 'nav-item active' : 'nav-item'}
          onClick={() => setCurrentView('profile')}
        >
          <span className="nav-icon">👤</span>
          <span className="nav-label">Profile</span>
        </button>
      </nav>

      <div className="manus-badge">⚡ Made with Manus</div>
    </div>
  );
}
