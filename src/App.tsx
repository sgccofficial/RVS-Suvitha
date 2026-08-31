import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Upload, Phone, Mail, MapPin, Clock, 
  ChevronRight, ArrowRight, ArrowUpRight, Star, StarHalf
} from 'lucide-react';

const IMAGES = [
  '/gallery-1.jpg',
  '/gallery-2.jpg',
  '/gallery-3.jpg',
  '/gallery-4.jpg',
  '/gallery-5.jpg'
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    pincode: ''
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Auto-scroll gallery simulation or active state management
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const center = target.scrollLeft + target.offsetWidth / 2;
      
      const children = Array.from(target.children) as HTMLElement[];
      let closestIdx = 0;
      let minDiff = Infinity;
      
      children.forEach((child, idx) => {
        const box = child.offsetLeft + child.offsetWidth / 2;
        const diff = Math.abs(center - box);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      setActiveImage(closestIdx);
    };

    const gallery = document.getElementById('galleryScroll');
    if (gallery) {
      gallery.addEventListener('scroll', handleScroll);
      return () => gallery.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleWhatsAppSend = () => {
    const { name, phone, pincode, message } = formData;
    let hasError = false;
    const newErrors = { name: '', phone: '', pincode: '' };

    if (!name.trim()) {
      newErrors.name = "Please enter your name.";
      hasError = true;
    }
    
    if (!phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
      hasError = true;
    } else if (phone.replace(/[^\d]/g, '').length < 10) {
      newErrors.phone = "Please enter a valid phone number.";
      hasError = true;
    }

    if (!pincode.trim()) {
      newErrors.pincode = "Please enter your pincode.";
      hasError = true;
    } else if (pincode !== "641606" && pincode !== "641604") {
      newErrors.pincode = "Sorry, we only deliver to areas with pincode 641606 and 641604.";
      hasError = true;
    }
    
    setFormErrors(newErrors);

    if (hasError) return;

    const text = `*Bill Upload*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Pincode:* ${pincode}\n*Message:* ${message}`;
    const url = "https://wa.me/919444517649?text=" + encodeURIComponent(text);
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand */}
            <div className="flex items-center gap-4">
              <img src="/gallery-2.jpg" alt="RVS Logo" className="h-12 w-12 rounded-xl object-cover shadow-sm" />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-sky-500 leading-tight">RVS</span>
                <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Departmental Stores</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#gallery" className="text-sm font-semibold text-slate-600 hover:text-sky-500 transition-colors">Gallery</a>
              <a href="#upload" className="text-sm font-semibold text-slate-600 hover:text-sky-500 transition-colors">Upload Bill</a>
              <a href="#reviews" className="text-sm font-semibold text-slate-600 hover:text-sky-500 transition-colors">Reviews</a>
              <a href="#contact" className="text-sm font-semibold text-slate-600 hover:text-sky-500 transition-colors">Contact</a>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <div className={`fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu} />
      <div className={`fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center border-b border-slate-100">
          <span className="font-bold text-slate-900">Menu</span>
          <button onClick={toggleMenu} className="p-2 -mr-2 text-slate-500 hover:bg-slate-100 rounded-lg"><X className="h-5 w-5" /></button>
        </div>
        <nav className="flex flex-col p-4 gap-2 flex-1">
          <a href="#gallery" onClick={toggleMenu} className="flex items-center p-3 rounded-lg text-slate-700 hover:bg-slate-50 font-medium">Gallery</a>
          <a href="#upload" onClick={toggleMenu} className="flex items-center p-3 rounded-lg text-slate-700 hover:bg-slate-50 font-medium">Upload Bill</a>
          <a href="#reviews" onClick={toggleMenu} className="flex items-center p-3 rounded-lg text-slate-700 hover:bg-slate-50 font-medium">Reviews</a>
          <a href="#contact" onClick={toggleMenu} className="flex items-center p-3 rounded-lg text-slate-700 hover:bg-slate-50 font-medium">Contact</a>
        </nav>
        <div className="p-4 text-xs font-medium text-slate-400 border-t border-slate-100 text-center">
          ©SGCC OFFICIAL
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-16">
          {/* Logo Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
            style={{ backgroundImage: "url('/gallery-2.jpg')" }}
          />
          <div className="absolute inset-0 bg-sky-900/40" />
          
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight drop-shadow-md">
              RVS Departmental Stores
            </h1>
            <p className="text-lg md:text-2xl text-sky-50 font-medium max-w-2xl mx-auto mb-10 drop-shadow-md">
              People's Own Shopping Paradise!!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#upload" className="inline-flex justify-center items-center gap-2 bg-white text-sky-500 px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all">
                <Upload className="h-5 w-5" />
                Upload Bill Now
              </a>
              <a href="#contact" className="inline-flex justify-center items-center gap-2 bg-sky-600/50 text-white px-8 py-4 rounded-xl font-bold backdrop-blur hover:bg-sky-600 active:scale-95 transition-all">
                Contact us
              </a>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="pt-10 pb-8 bg-white relative -mt-8 rounded-t-[3rem] shadow-[0_-8px_30px_rgba(0,0,0,0.04)] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Gallery</h2>
              <p className="text-slate-500">Take a look inside our departmental store where quality meets convenience.</p>
            </div>
            
            {/* Horizontal Scroll Gallery */}
            <div className="relative">
              <div 
                id="galleryScroll"
                className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
                style={{ scrollbarWidth: 'none' }}
              >
                {IMAGES.map((src, index) => (
                  <div 
                    key={index}
                    className={`relative flex-shrink-0 w-[85vw] sm:w-[400px] aspect-[4/3] snap-center rounded-2xl overflow-hidden transition-all duration-500 ${activeImage === index ? 'opacity-100 shadow-2xl scale-100' : 'opacity-40 scale-95 shadow-md'}`}
                  >
                    <img 
                      src={src} 
                      alt={`Gallery ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback for missing images in preview
                        (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/f1f5f9/94a3b8?text=Image+' + (index+1);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Upload Bill Section */}
        <section id="upload" className="py-10 bg-slate-50 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center justify-center p-3 bg-sky-100 rounded-xl mb-6">
                  <Upload className="h-6 w-6 text-sky-500" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-6">Upload Your Bill for Delivery</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Send us your shopping list, and we will prepare your order for delivery. It's faster, easier and connects you directly to our WhatsApp.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 text-slate-700">
                    <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-500 font-bold text-sm">1</div>
                    <span>Fill in your contact details below</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-700">
                    <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-500 font-bold text-sm">2</div>
                    <span>Tap send to open WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-700">
                    <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-500 font-bold text-sm">3</div>
                    <span>Attach your bill photo and send!</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="name">Your Name</label>
                    <input 
                      id="name"
                      type="text" 
                      className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${formErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20'}`}
                      placeholder="Ponraj A"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({...formData, name: e.target.value});
                        if (formErrors.name) setFormErrors({...formErrors, name: ''});
                      }}
                    />
                    {formErrors.name && (
                      <p className="text-sm font-medium text-red-500 flex items-start gap-1 mt-2">
                        <X className="h-4 w-4 flex-shrink-0 mt-0.5" /> <span>{formErrors.name}</span>
                      </p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="phone">Phone Number</label>
                      <input 
                        id="phone"
                        type="tel" 
                        className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${formErrors.phone ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20'}`}
                        placeholder="+91 99999 99999"
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^\d+ ]/g, '');
                          if (val.length <= 15) {
                            setFormData({...formData, phone: val});
                            if (formErrors.phone) setFormErrors({...formErrors, phone: ''});
                          }
                        }}
                      />
                      {formErrors.phone && (
                        <p className="text-sm font-medium text-red-500 flex items-start gap-1 mt-2">
                          <X className="h-4 w-4 flex-shrink-0 mt-0.5" /> <span>{formErrors.phone}</span>
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="pincode">Pincode</label>
                      <input 
                        id="pincode"
                        type="text" 
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${formErrors.pincode ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20'}`}
                        placeholder="641606"
                        value={formData.pincode}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= 6) {
                            setFormData({...formData, pincode: val});
                            if (formErrors.pincode) setFormErrors({...formErrors, pincode: ''});
                          }
                        }}
                      />
                      {formErrors.pincode && (
                        <p className="text-sm font-medium text-red-500 flex items-start gap-1 mt-2">
                          <X className="h-4 w-4 flex-shrink-0 mt-0.5" /> <span>{formErrors.pincode}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="message">Additional Message</label>
                    <textarea 
                      id="message"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all outline-none resize-none"
                      placeholder="Any specific instructions for your order..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <button 
                    type="button" 
                    onClick={handleWhatsAppSend}
                    className="w-full mt-2 bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  >
                    Proceed to WhatsApp
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <p className="text-center text-xs text-slate-500 pt-2 font-medium">
                    WhatsApp will open with your details ready. You can attach your bill there.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-10 bg-slate-50 border-t border-slate-100 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Customer Reviews</h2>
              <div className="flex flex-col items-center justify-center gap-1 mb-2">
                <span className="font-bold text-4xl text-slate-900 mb-1">4.3</span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-6 h-6 fill-amber-400" />
                  <Star className="w-6 h-6 fill-amber-400" />
                  <Star className="w-6 h-6 fill-amber-400" />
                  <Star className="w-6 h-6 fill-amber-400" />
                  <StarHalf className="w-6 h-6 fill-amber-400" />
                </div>
              </div>
              <p className="text-slate-500 font-medium mt-2">Based on 79+ local ratings</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "J Karthikeyan",
                  date: "7 months ago",
                  rating: 4,
                  text: "Friendly local people to help you through your needs. Goods sold at almost wholesale rate",
                  color: "bg-orange-100 text-orange-700 border-orange-200"
                },
                {
                  name: "Hari Krishnan",
                  date: "9 months ago",
                  rating: 5,
                  text: "Products are very good & very quality",
                  color: "bg-blue-100 text-blue-700 border-blue-200"
                },
                {
                  name: "Praveen Kumar",
                  date: "3 months ago",
                  rating: 5,
                  text: "",
                  color: "bg-slate-100 text-slate-700 border-slate-200"
                },
                {
                  name: "Sownthiri Jegadeesh",
                  date: "11 months ago",
                  rating: 4,
                  text: "you can buy groceries here",
                  color: "bg-green-100 text-green-700 border-green-200"
                },
                {
                  name: "vinoth vivid",
                  date: "8 months ago",
                  rating: 2,
                  text: "",
                  color: "bg-teal-100 text-teal-700 border-teal-200"
                },
                {
                  name: "Kaviarasu Kalimuthu",
                  date: "10 months ago",
                  rating: 5,
                  text: "Friendly shoppers ✌️",
                  color: "bg-pink-100 text-pink-700 border-pink-200"
                },
                {
                  name: "Prema S",
                  date: "5 months ago",
                  rating: 5,
                  text: "",
                  color: "bg-indigo-100 text-indigo-700 border-indigo-200"
                }
              ].map((review, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col h-full hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-medium text-base opacity-90 border shadow-sm ${review.color}`}>
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-tight">{review.name}</h4>
                      <span className="text-xs text-slate-500">{review.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                    ))}
                  </div>
                  {review.text && (
                    <p className="text-slate-700 text-sm leading-relaxed flex-1">"{review.text}"</p>
                  )}
                  <div className={`mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 ${!review.text && 'mt-auto'}`}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-xs font-semibold text-slate-500">Posted on Google</span>
                  </div>
                </div>
              ))}
              
              {/* QR Code Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 flex flex-col items-center justify-center text-center h-full hover:shadow-md transition-all p-2">
                <img 
                  src="/google-qr.png" 
                  alt="Google Reviews QR Code" 
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-10 bg-white border-t border-slate-100 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Contact us</h2>
              <p className="text-slate-500">Do visit us for shopping and inquiries...</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              <div className="flex flex-col gap-6">
                
                {/* 1. Call & Email */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <a href="tel:9942025493" className="bg-slate-50 rounded-2xl p-6 flex gap-4 border border-slate-100 hover:bg-sky-50 hover:border-sky-300 hover:shadow-md hover:-translate-y-0.5 active:bg-sky-100 active:border-sky-400 active:shadow-sm active:translate-y-0 transition-all items-center group relative">
                    <div className="h-12 w-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-100 group-hover:text-sky-600 transition-colors">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1 text-lg group-hover:text-sky-700 transition-colors">Call us</h3>
                      <span className="text-slate-600 group-hover:text-sky-600 transition-colors">+91 99420 25493</span>
                    </div>
                    <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-sky-400 group-hover:text-sky-600 group-active:text-sky-700 transition-colors" />
                  </a>
                  
                  {/* Email */}
                  <a href="mailto:ponraj1234a@gmail.com" className="bg-slate-50 rounded-2xl p-6 flex gap-4 border border-slate-100 hover:bg-sky-50 hover:border-sky-300 hover:shadow-md hover:-translate-y-0.5 active:bg-sky-100 active:border-sky-400 active:shadow-sm active:translate-y-0 transition-all items-center group relative">
                    <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-100 group-hover:text-sky-600 transition-colors">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="overflow-hidden w-full">
                      <h3 className="font-bold text-slate-900 mb-1 text-lg group-hover:text-sky-700 transition-colors">Email us</h3>
                      <span className="text-slate-600 block truncate w-full group-hover:text-sky-600 transition-colors" title="ponraj1234a@gmail.com">ponraj1234a@gmail.com</span>
                    </div>
                    <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-sky-400 group-hover:text-sky-600 group-active:text-sky-700 transition-colors" />
                  </a>
                </div>

                {/* 2. Open Hours */}
                <div className="bg-slate-50 rounded-2xl p-6 flex gap-5 border border-slate-100">
                  <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="flex-1 w-full">
                    <h3 className="font-bold text-slate-900 mb-3 text-lg">Opening Hours</h3>
                    <div className="space-y-2 text-slate-600 text-sm sm:text-base">
                      <div className="flex justify-between gap-4 border-b border-slate-200 pb-2">
                        <span className="font-medium text-slate-700">Mon - Thu, Sat - Sun</span>
                        <span>8:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-4 pt-1">
                        <span className="font-medium text-slate-700">Fridays</span>
                        <span className="text-right">8:00 AM - 10:00 AM<br/>4:00 PM - 10:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Location & Google Page */}
                <div className="bg-slate-50 rounded-2xl p-6 flex gap-5 border border-slate-100">
                  <div className="h-12 w-12 rounded-xl bg-sky-100 text-sky-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2 text-lg">Location</h3>
                    <p className="text-slate-600 leading-relaxed mb-3">
                      45, Thirumalai Nagar,<br/>
                      Opp. Raagam Exports, Near Canara Bank,<br/>
                      Kangeyam Road, Nallur,<br/>
                      Tiruppur - 641606
                    </p>
                    <a href="https://g.page/rvsdepstores" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold text-sm px-4 py-2 rounded-lg hover:border-sky-500 hover:text-sky-500 transition-colors shadow-sm">
                      Open Google Page <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>

              </div>

              {/* 4. Map */}
              <div className="bg-slate-200 rounded-3xl overflow-hidden shadow-inner h-[400px] lg:h-auto min-h-[400px] relative">
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  style={{ border: 0 }}
                  title="Google Maps Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15664.123281031316!2d77.3789498!3d11.0857317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba90814c9e1da59%3A0xe161e520ca873c74!2sRVS%20DEPARTMENTAL%20STORES!5e0!3m2!1sen!2sin!4v1714400000000!5m2!1sen!2sin"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 opacity-90">
            <img src="/gallery-2.jpg" alt="Logo" className="h-8 w-8 rounded-lg object-cover" />
            <span className="font-bold text-white tracking-wide">RVS Departmental Stores</span>
          </div>
          <p className="text-sm font-medium">
            ©SGCC OFFICIAL
          </p>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        <a 
          href="tel:+919942025493"
          className="bg-white text-slate-700 p-3.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform flex items-center justify-center border border-slate-200 group"
          aria-label="Call us"
        >
          <Phone className="w-7 h-7 fill-current" />
        </a>
        <a 
          href="https://wa.me/919444517649" 
          target="_blank" 
          rel="noreferrer"
          className="bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform flex items-center justify-center group"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
