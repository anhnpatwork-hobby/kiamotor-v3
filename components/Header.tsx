import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { PageView } from '../App';

interface HeaderProps {
  onNavigate: (view: PageView, id?: string) => void;
  currentView: PageView;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, view: PageView, hash?: string) => {
    e.preventDefault();
    onNavigate(view);
    setIsMenuOpen(false);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const navItems = [
    { label: 'Trang Chủ', view: 'home', hash: undefined },
    { label: 'Dòng Xe', view: 'products', hash: undefined },
    { label: 'Bảng Giá', view: 'pricing', hash: undefined },
    { label: 'Thủ Tục Trả Góp', view: 'finance', hash: undefined },
    { label: 'Liên Hệ', view: 'contact', hash: undefined },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 bg-[#050505] border-b border-white/10 py-4 lg:py-5 transition-all duration-300 font-sans shadow-lg"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between relative">
            {/* Logo Area */}
            <div
              className="flex items-center gap-3 z-10 cursor-pointer"
              onClick={() => {
                onNavigate('home');
                setIsMenuOpen(false);
              }}
            >
              <img
                src="/images/kia logo.png"
                alt="KIA Long Biên"
                className="h-10 lg:h-12 w-auto object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-8 font-medium text-sm text-gray-300">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.hash ? `#${item.hash}` : '#'}
                  onClick={(e) => handleNavClick(e, item.view as PageView, item.hash)}
                  className={`hover:text-white transition-colors uppercase tracking-wide text-xs font-bold ${(currentView === item.view && !item.hash) ? 'text-kia-red' : ''
                    }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA Button Area */}
            <div className="flex items-center gap-4 z-10">
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\./g, '')}`}
                className="hidden sm:flex items-center gap-3 bg-kia-red text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/40 group"
              >
                <Phone className="w-4 h-4 group-hover:animate-pulse" />
                <span>{CONTACT_INFO.phone}</span>
              </a>

              {/* Mobile Menu Icon */}
              <button
                className="lg:hidden text-white p-1"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 transform transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full pt-24 pb-10 px-6">
          <nav className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.hash ? `#${item.hash}` : '#'}
                onClick={(e) => handleNavClick(e, item.view as PageView, item.hash)}
                className={`text-2xl font-bold uppercase tracking-wider ${currentView === item.view ? 'text-kia-red' : 'text-white'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto">
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\./g, '')}`}
              className="flex items-center justify-center gap-3 bg-kia-red text-white w-full py-4 rounded-xl font-bold text-lg shadow-xl"
            >
              <Phone className="w-5 h-5" />
              <span>Gọi Ngay: {CONTACT_INFO.phone}</span>
            </a>

            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>KIA Long Biên - Showroom Chính Hãng 3S</p>
              <p className="mt-1">{CONTACT_INFO.address}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;