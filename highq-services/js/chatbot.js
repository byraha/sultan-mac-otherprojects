var hqChatbot = {

  // ---- KNOWLEDGE BASE ----
  kb: [
    {
      keywords: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good evening'],
      answer: 'Namaste! 👋 Welcome to High Q Services. I\'m your Virtual Assistant. How can I help you today? You can ask me about our services, catering orders, contact details, or anything else about High Q Services.'
    },
    {
      keywords: ['who', 'what is', 'about', 'company', 'high q', 'tell me about'],
      answer: 'High Q Services is a Bangalore-based multi-service company founded in 2015. We serve 500+ businesses across 11 service verticals including catering, facility management, manpower, IT services, and more. Our mission is "Enhancing Life Beyond Limits" through quality service excellence.'
    },
    {
      keywords: ['catering', 'food', 'cater', 'meal', 'lunch', 'dinner', 'menu'],
      answer: 'We offer premium catering & food supply services! This includes: corporate catering for offices, event catering for conferences & parties, daily tiffin service, wedding & banquet catering, and Jain/specialty meals. All our kitchens are FSSAI certified. <a href="service-catering.html" target="_blank">View Catering Details →</a>',
      link: 'service-catering.html'
    },
    {
      keywords: ['order catering', 'catering order', 'book catering', 'catering request'],
      answer: 'You can place a catering order directly through our online form! Just click the link below, fill in your event details, and we\'ll get back to you within 24 hours with a customized menu. <a href="catering.html" target="_blank">Order Catering Now →</a>',
      link: 'catering.html'
    },
    {
      keywords: ['fruit', 'fruits', 'fresh fruit', 'mango', 'apple'],
      answer: 'We supply farm-fresh fruits daily to corporate cafeterias, hotels, hospitals, and institutions. Our range includes seasonal fruits, citrus & exotics, organic selection, cut fruit trays, and fresh juices. Sourced directly from trusted growers. <a href="service-fruits.html" target="_blank">View Fruits Service →</a>',
      link: 'service-fruits.html'
    },
    {
      keywords: ['facility', 'facilities', 'housekeeping', 'cleaning', 'maintenance', 'security', 'pest control', 'landscaping'],
      answer: 'Our Facilities Management division handles: professional housekeeping, trained security personnel, pest control, MEP maintenance (electrical/plumbing/HVAC), landscaping, and waste management. ISO-compliant processes with 24/7 support. <a href="service-facilities.html" target="_blank">View Facility Services →</a>',
      link: 'service-facilities.html'
    },
    {
      keywords: ['manpower', 'staff', 'staffing', 'recruitment', 'workforce', 'employee', 'labor', 'worker'],
      answer: 'We provide skilled and unskilled manpower across industries: skilled labor (electricians, plumbers, technicians), office staffing (admin, data entry, reception), hospitality staff (chefs, servers), industrial workers, and security personnel. 100% statutory compliance with payroll management. <a href="service-manpower.html" target="_blank">View Manpower Services →</a>',
      link: 'service-manpower.html'
    },
    {
      keywords: ['crockery', 'cutlery', 'glassware', 'hotel supply', 'restaurant supply', 'kitchen'],
      answer: 'We supply premium crockery, cutlery, glassware, buffet equipment, hotel linen, and kitchen essentials. Perfect for restaurants, hotels, banquet halls, and event organizers. Bulk discounts and pan-India delivery available. <a href="service-crockery.html" target="_blank">View Crockery Range →</a>',
      link: 'service-crockery.html'
    },
    {
      keywords: ['it', 'computer', 'laptop', 'hardware', 'repair', 'network', 'tech', 'software', 'amc'],
      answer: 'Our IT division provides: hardware sales (desktops, laptops, servers), repairs & AMC, networking (LAN/WiFi/firewall), cloud services (Office 365, Google Workspace), IT support, and CCTV/access control installation. Authorized brand partners with certified engineers. <a href="service-it.html" target="_blank">View IT Services →</a>',
      link: 'service-it.html'
    },
    {
      keywords: ['car', 'automotive', 'vehicle', 'consultancy', 'buy car', 'sell car', 'valuation', 'inspection'],
      answer: 'Our Car Consultancy service offers: purchase guidance, vehicle valuation, documentation support, pre-purchase inspection, maintenance advisory, and financing assistance. Unbiased expert advice — we work for you, not dealerships. <a href="service-car.html" target="_blank">View Car Consultancy →</a>',
      link: 'service-car.html'
    },
    {
      keywords: ['furniture', 'furnishing', 'furnish', 'interior', 'office furniture', 'home furniture', 'sofa', 'chair', 'desk'],
      answer: 'We provide complete furnishing & furniture solutions: office furniture (ergonomic chairs, desks, workstations), home furnishing (sofas, beds, wardrobes), custom design & fabrication, space planning, and professional installation. Free site visit and consultation. <a href="service-furniture.html" target="_blank">View Furniture Services →</a>',
      link: 'service-furniture.html'
    },
    {
      keywords: ['property', 'real estate', 'brokerage', 'buy', 'sell', 'rent', 'lease', 'apartment', 'office space', 'commercial'],
      answer: 'Our Property Brokerage covers: residential sales, commercial real estate, rental services, property leasing, investment advisory, and legal assistance (title verification, due diligence, RERA compliance). Deep knowledge of Bangalore\'s prime locations. <a href="service-property.html" target="_blank">View Property Services →</a>',
      link: 'service-property.html'
    },
    {
      keywords: ['contact', 'phone', 'call', 'mobile', 'number', 'reach'],
      answer: 'You can reach us at: 📞 <strong>+91 9900051336</strong> (Call or WhatsApp)<br>📧 <strong>Highqservices02@gmail.com</strong><br>📍 NO.54/8/13, 8th Cross, C.L.R Layout, R.T Nagar, Bangalore - 560032<br>🕐 Mon - Sat: 9:00 AM - 7:00 PM'
    },
    {
      keywords: ['address', 'location', 'office', 'where', 'visit', 'bangalore'],
      answer: 'Our office is located at: <strong>NO.54/8/13, 8th Cross, C.L.R Layout, R.T Nagar, Bangalore - 560032</strong>. We\'re open Monday to Saturday, 9:00 AM to 7:00 PM. <a href="contact.html" target="_blank">View on Map →</a>',
      link: 'contact.html'
    },
    {
      keywords: ['email', 'mail', 'send'],
      answer: 'You can email us at: <strong>Highqservices02@gmail.com</strong>. We typically respond within 24 hours. Or use our contact form: <a href="contact.html" target="_blank">Contact Form →</a>',
      link: 'contact.html'
    },
    {
      keywords: ['whatsapp', 'wa', 'chat'],
      answer: 'You can chat with us on WhatsApp at <strong>+91 9900051336</strong>. Just click the WhatsApp button on this page to start a conversation!'
    },
    {
      keywords: ['service', 'what do you do', 'offer', 'provide', 'solutions', 'verticals'],
      answer: 'We offer 11 service verticals under one roof: 1) 🍽️ Catering & Food Supply, 2) 🥭 Fresh Fruits Supply, 3) 🏢 Facilities Management, 4) 👥 Manpower Support, 5) 🍶 Crockery & Miscellaneous, 6) 💻 IT Sales & Services, 7) 🚗 Car Consultancy, 8) 🛋️ Furnishing & Furniture, 9) 🏠 Property Brokerage. <a href="services.html" target="_blank">View All Services →</a>',
      link: 'services.html'
    },
    {
      keywords: ['gallery', 'photo', 'image', 'picture', 'work'],
      answer: 'Check out our gallery to see our work in action! We have photos of corporate catering, events, facility management, and more. <a href="gallery.html" target="_blank">View Gallery →</a>',
      link: 'gallery.html'
    },
    {
      keywords: ['price', 'cost', 'rate', 'quote', 'pricing', 'charges', 'fee', 'budget'],
      answer: 'Pricing varies based on your specific requirements, quantity, and service type. Please <a href="contact.html" target="_blank">contact us</a> or call <strong>+91 9900051336</strong> for a free custom quote. We\'ll tailor a package that fits your budget!'
    },
    {
      keywords: ['complaint', 'feedback', 'suggestion', 'review'],
      answer: 'We value your feedback! Please share your thoughts, complaints, or suggestions at <strong>Highqservices02@gmail.com</strong> or call <strong>+91 9900051336</strong>. We take all feedback seriously and continuously improve our services.'
    },
    {
      keywords: ['timing', 'hour', 'open', 'closed', 'working day', 'business hour'],
      answer: 'Our business hours are: <strong>Monday to Saturday: 9:00 AM - 7:00 PM</strong>. Sunday: Closed. For urgent inquiries outside business hours, please WhatsApp us at <strong>+91 9900051336</strong>.'
    },
    {
      keywords: ['thank', 'thanks', 'thank you'],
      answer: 'You\'re welcome! 😊 Is there anything else I can help you with? Feel free to ask about our services, place a catering order, or get our contact details.'
    },
  ],

  // ---- SUGGESTED QUESTIONS ----
  suggestions: [
    'What services do you offer?',
    'Tell me about catering',
    'What is your contact number?',
    'Where is your office?',
    'How do I order catering?',
    'Do you have IT services?'
  ],

  // ---- INIT CHATBOT ----
  init: function () {
    var self = this;
    var html = '';
    html += '<div class="chatbot-float" id="chatbotFloat">';
    html += '  <div class="chatbot-tooltip">Ask me anything!</div>';
    html += '  <button class="chatbot-btn" id="chatbotToggle" aria-label="Open chat">';
    html += '    <i class="fas fa-comment-dots"></i>';
    html += '    <i class="fas fa-times" style="display:none;"></i>';
    html += '  </button>';
    html += '</div>';
    html += '<div class="chatbot-panel" id="chatbotPanel">';
    html += '  <div class="chatbot-header">';
    html += '    <div class="chatbot-avatar"><img src="logo.jpg" alt="Logo" /></div>';
    html += '    <div><strong>HIGHQSERVICES</strong><br><span style="font-size:0.75rem;opacity:0.8;">Virtual Assistant</span></div>';
    html += '    <button class="chatbot-close" id="chatbotClose">&times;</button>';
    html += '  </div>';
    html += '  <div class="chatbot-messages" id="chatbotMessages">';
    html += '    <div class="chatbot-msg bot">';
    html += '      <div class="msg-content">Hello! 👋 I\'m the <strong>HIGHQSERVICES Virtual Assistant</strong>. How can I help you today? You can ask about our services, contact details, catering orders, or anything else!</div>';
    html += '    </div>';
    html += '    <div class="chatbot-suggestions" id="chatbotSuggestions">';
    this.suggestions.forEach(function (s) {
      html += '      <button class="chatbot-suggestion-btn" data-msg="' + s.replace(/"/g, '&quot;') + '">' + s + '</button>';
    });
    html += '    </div>';
    html += '  </div>';
    html += '  <div class="chatbot-input-wrap">';
    html += '    <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Type your question..." />';
    html += '    <button class="chatbot-send" id="chatbotSend"><i class="fas fa-paper-plane"></i></button>';
    html += '  </div>';
    html += '</div>';

    var container = document.getElementById('chatbotContainer');
    if (container) container.innerHTML = html;

    // Toggle
    var toggle = document.getElementById('chatbotToggle');
    var panel = document.getElementById('chatbotPanel');
    var closeBtn = document.getElementById('chatbotClose');
    var tooltip = document.querySelector('.chatbot-tooltip');

    if (toggle) {
      toggle.addEventListener('click', function () {
        var isOpen = panel.classList.contains('open');
        panel.classList.toggle('open');
        toggle.querySelector('.fa-comment-dots').style.display = isOpen ? '' : 'none';
        toggle.querySelector('.fa-times').style.display = isOpen ? 'none' : '';
        if (tooltip) tooltip.style.display = 'none';
        if (!isOpen) self.scrollToBottom();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        panel.classList.remove('open');
        toggle.querySelector('.fa-comment-dots').style.display = '';
        toggle.querySelector('.fa-times').style.display = 'none';
      });
    }

    // Auto-hide tooltip
    if (tooltip) {
      setTimeout(function () {
        tooltip.style.opacity = '0';
        setTimeout(function () { tooltip.style.display = 'none'; }, 500);
      }, 8000);
    }

    // Send handlers
    var input = document.getElementById('chatbotInput');
    var sendBtn = document.getElementById('chatbotSend');

    function sendMessage() {
      var text = input.value.trim();
      if (!text) return;
      self.addMessage(text, 'user');
      input.value = '';
      self.scrollToBottom();
      setTimeout(function () { self.respond(text); }, 400);
    }

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') sendMessage();
      });
    }

    // Suggestion clicks
    document.querySelectorAll('.chatbot-suggestion-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var msg = btn.getAttribute('data-msg');
        if (!msg) return;
        self.addMessage(msg, 'user');
        btn.parentElement.style.display = 'none';
        self.scrollToBottom();
        setTimeout(function () { self.respond(msg); }, 400);
      });
    });
  },

  // ---- ADD MESSAGE ----
  addMessage: function (text, sender) {
    var msgs = document.getElementById('chatbotMessages');
    if (!msgs) return;
    var div = document.createElement('div');
    div.className = 'chatbot-msg ' + sender;
    div.innerHTML = '<div class="msg-content">' + text.replace(/\n/g, '<br/>') + '</div>';
    msgs.appendChild(div);
    this.scrollToBottom();
  },

  // ---- SCROLL TO BOTTOM ----
  scrollToBottom: function () {
    var msgs = document.getElementById('chatbotMessages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  },

  // ---- RESPOND ----
  respond: function (text) {
    var lower = text.toLowerCase();
    var bestMatch = null;
    var bestScore = 0;

    this.kb.forEach(function (item) {
      var score = 0;
      item.keywords.forEach(function (kw) {
        if (lower.indexOf(kw) !== -1) {
          score += kw.length;
        }
      });
      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    });

    if (bestMatch && bestScore > 1) {
      var answer = bestMatch.answer;
      // Add contact suggestion if not already present
      if (answer.indexOf('9900051336') === -1 && lower.indexOf('contact') === -1 && lower.indexOf('phone') === -1) {
        answer += '<br/><br/>📞 Need immediate help? Call us at <strong>+91 9900051336</strong> or <a href="https://wa.me/919900051336" target="_blank">WhatsApp us</a>.';
      }
      this.addMessage(answer, 'bot');
    } else {
      this.addMessage('I\'m not sure I understood that. Could you try rephrasing? You can ask me about our <strong>services</strong>, <strong>catering orders</strong>, <strong>contact details</strong>, or <strong>office location</strong>. Or try one of the suggestions above! 😊', 'bot');
    }
  }
};

// ---- INIT ON DOM READY ----
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('chatbotContainer')) {
    hqChatbot.init();
  }
});
