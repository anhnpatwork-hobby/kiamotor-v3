import React, { useState } from 'react';
import { CAR_MODELS, CONTACT_INFO, PRICING_BY_MODEL } from '../constants';
import { Wallet, MessageCircle, Info, ArrowRight, ChevronDown, ChevronUp, CheckCircle2, Tag } from 'lucide-react';
import { PageView } from '../App';

interface AllProductsViewProps {
  onNavigate: (view: PageView, id?: string) => void;
}

// Get pricing versions for a car by its id
const getPricingForCar = (carId: string) => {
  const allModels = PRICING_BY_MODEL.flatMap(g => g.models);
  return allModels.filter(m => m.id === carId);
};

const AllProductsView: React.FC<AllProductsViewProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'sedan' | 'suv' | 'mpv'>('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filteredCars = filter === 'all'
    ? CAR_MODELS
    : CAR_MODELS.filter(car => car.group === filter);

  const toggleCard = (carId: string) => {
    setExpandedCard(prev => (prev === carId ? null : carId));
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 animate-fade-in font-sans">

      {/* A. HERO BANNER */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden bg-[#050505]">
        <img
          src="/images/banner_web .jpg"
          alt="Showroom KIA Long Biên Panorama"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-center md:text-left">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-5xl font-black font-montserrat text-white uppercase tracking-wide leading-snug mb-6">
              Showroom {CONTACT_INFO.name} <br />
              <span className="text-kia-red inline-block mt-3 md:mt-4">Kho Xe Lớn Nhất Miền Bắc</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed">
              Cập nhật bảng giá & Ưu đãi mới nhất tháng 1/2026. Đủ màu - Giao ngay - Hỗ trợ lái thử tại nhà.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-[72px] lg:top-[80px] z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 sm:py-5 gap-2 sm:gap-3 no-scrollbar justify-start sm:justify-center">
            <button
              onClick={() => setFilter('all')}
              className={`whitespace-nowrap px-6 sm:px-8 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase transition-all duration-300 flex-shrink-0 ${filter === 'all' ? 'bg-black text-white shadow-lg' : 'bg-[#F2F4F7] text-[#475467] hover:bg-gray-200'}`}
            >
              Tất Cả
            </button>
            <button
              onClick={() => setFilter('sedan')}
              className={`whitespace-nowrap px-6 sm:px-8 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase transition-all duration-300 flex-shrink-0 ${filter === 'sedan' ? 'bg-black text-white shadow-lg' : 'bg-[#F2F4F7] text-[#475467] hover:bg-gray-200'}`}
            >
              Sedan & Hatchback
            </button>
            <button
              onClick={() => setFilter('suv')}
              className={`whitespace-nowrap px-6 sm:px-8 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase transition-all duration-300 flex-shrink-0 ${filter === 'suv' ? 'bg-black text-white shadow-lg' : 'bg-[#F2F4F7] text-[#475467] hover:bg-gray-200'}`}
            >
              SUV & Gầm Cao
            </button>
            <button
              onClick={() => setFilter('mpv')}
              className={`whitespace-nowrap px-6 sm:px-8 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase transition-all duration-300 flex-shrink-0 ${filter === 'mpv' ? 'bg-black text-white shadow-lg' : 'bg-[#F2F4F7] text-[#475467] hover:bg-gray-200'}`}
            >
              MPV & Gia Đình
            </button>
          </div>
        </div>
      </section>

      {/* B. PRODUCT LIST */}
      <section className="py-12 bg-[#F8F9FB]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCars.map((car) => {
              const pricingModels = getPricingForCar(car.id);
              const isExpanded = expandedCard === car.id;

              return (
                <div
                  key={car.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col group"
                >
                  {/* Card Header: Image */}
                  <div
                    className="relative h-56 overflow-hidden bg-gray-100 cursor-pointer"
                    onClick={() => onNavigate('product-detail', car.id)}
                  >
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    />
                    {/* Version Badge - Styled like screenshot */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-black/80 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-sm font-bold uppercase tracking-wider">
                        {car.version}
                      </div>
                    </div>
                  </div>

                  {/* Card Body: Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3
                      className="text-xl font-black font-montserrat text-gray-900 uppercase mb-2 cursor-pointer group-hover:text-kia-red transition-colors"
                      onClick={() => onNavigate('product-detail', car.id)}
                    >
                      {car.name}
                    </h3>

                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wide mb-6 line-clamp-1">
                      {car.tagline}
                    </p>

                    <div className="space-y-4 mb-6 pt-4 border-t border-gray-50">
                      {/* Price Section */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Giá Ưu Đãi</span>
                        <div className="text-xl font-black text-kia-red tracking-tight">
                          {car.price.split(' ')[0]} <span className="text-xs">{car.price.split(' ')[1]}</span>
                        </div>
                      </div>

                      {/* Installment Info */}
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-50 rounded-lg">
                          <Wallet className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <span className="text-sm text-gray-600 font-medium">
                          Góp chỉ: <span className="font-bold text-gray-900">{car.installmentPrice}</span>
                        </span>
                      </div>

                      {/* Status Info */}
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-green-50 rounded-lg">
                          <Info className="w-3.5 h-3.5 text-green-600" />
                        </div>
                        <span className="text-sm text-green-700 font-bold italic">
                          {car.status}
                        </span>
                      </div>
                    </div>

                    {/* Buttons: Side by Side */}
                    <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-50">
                      <button
                        onClick={() => onNavigate('product-detail', car.id)}
                        className="py-3 rounded-xl border border-gray-900 text-gray-900 text-[10px] font-black uppercase hover:bg-gray-900 hover:text-white transition-all duration-300 text-center"
                      >
                        Xem Chi Tiết
                      </button>
                      <a
                        href="http://Zalo.me/0869932031"
                        target="_blank"
                        rel="noreferrer"
                        className="py-3 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase flex items-center justify-center gap-1.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 shadow-md shadow-blue-50"
                      >
                        {/* <MessageCircle className="w-3.5 h-3.5" /> */}
                        Báo Giá Zalo
                      </a>
                    </div>
                  </div>

                  {/* Pricing Toggle (Optional but kept for functionality) */}
                  {pricingModels.length > 0 && (
                    <button
                      onClick={() => toggleCard(car.id)}
                      className="w-full py-2 bg-gray-50 text-[9px] font-bold text-gray-400 uppercase hover:text-kia-red transition-colors border-t border-gray-100 flex items-center justify-center gap-1"
                    >
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      {isExpanded ? 'Ẩn bảng giá' : 'Xem chi tiết các phiên bản'}
                    </button>
                  )}

                  {/* Expand: Pricing Table (Simplified for grid layout) */}
                  {isExpanded && pricingModels.length > 0 && (
                    <div className="p-4 bg-gray-50 animate-fade-in border-t border-gray-100">
                      <div className="space-y-3">
                        {pricingModels[0].versions.map((ver, vIdx) => (
                          <div key={vIdx} className="flex justify-between items-center text-[11px] py-1 border-b border-gray-200 last:border-0">
                            <span className="font-bold text-gray-700">{ver.name}</span>
                            <span className="font-black text-kia-red">{ver.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* C. SEO TEXT & WHY CHOOSE US */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="text-2xl font-black font-montserrat text-gray-900 mb-6 uppercase">
            Tại Sao Nên Mua Xe Tại {CONTACT_INFO.name}?
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600">
            <p className="mb-4">
              <strong>KIA Long Biên</strong> tự hào là Showroom 3S chính hãng quy mô lớn nhất hệ thống THACO KIA tại miền Bắc. Khi mua xe tại đây, Quý khách hàng sẽ được hưởng những đặc quyền:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none pl-0">
              <li className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-kia-red mt-2.5"></div>
                <div>
                  <strong className="text-gray-900 block mb-1">Kho xe khổng lồ</strong>
                  Chúng tôi luôn có sẵn xe, đủ màu sắc và phiên bản để Quý khách xem thực tế và nhận xe ngay mà không phải chờ đợi.
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-kia-red mt-2.5"></div>
                <div>
                  <strong className="text-gray-900 block mb-1">Giá tốt nhất thị trường</strong>
                  Chính sách giá linh hoạt, cam kết không chênh giá, hỗ trợ tối đa các khoản phí lăn bánh.
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-kia-red mt-2.5"></div>
                <div>
                  <strong className="text-gray-900 block mb-1">Hỗ trợ tài chính mạnh</strong>
                  Liên kết với 15 ngân hàng lớn, hỗ trợ trả góp lên đến 85% giá trị xe, xử lý hồ sơ nợ xấu, duyệt vay trong 5 phút.
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-kia-red mt-2.5"></div>
                <div>
                  <strong className="text-gray-900 block mb-1">Lái thử tại nhà</strong>
                  Chỉ cần 1 cuộc điện thoại, chúng tôi sẽ mang xe đến tận cửa nhà để Quý khách trải nghiệm.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* BOTTOM FORM */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            <div className="bg-kia-red p-8 md:w-1/3 flex flex-col justify-center text-white">
              <h3 className="text-2xl font-black font-montserrat uppercase mb-4 leading-tight">Bạn vẫn phân vân chưa chọn được xe?</h3>
              <p className="text-sm opacity-90">Đừng lo, hãy để lại thông tin. Chuyên gia tư vấn sẽ gọi lại hỗ trợ bạn tìm ra chiếc xe phù hợp nhất với ngân sách trong 5 phút.</p>
            </div>
            <div className="p-8 md:w-2/3">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Họ tên</label>
                  <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-black" placeholder="Nhập họ tên" />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Số điện thoại</label>
                  <input type="tel" className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-black" placeholder="Nhập SĐT" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tầm tiền dự kiến</label>
                  <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-black">
                    <option>Dưới 500 Triệu</option>
                    <option>500 - 800 Triệu</option>
                    <option>Trên 800 Triệu</option>
                  </select>
                </div>
                <div className="col-span-1 md:col-span-2 mt-2">
                  <button type="button" className="w-full bg-black text-white font-bold uppercase py-4 rounded hover:bg-kia-red transition-colors flex items-center justify-center gap-2">
                    Gửi Yêu Cầu Tư Vấn
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AllProductsView;