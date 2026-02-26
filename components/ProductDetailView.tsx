import React, { useState, useEffect } from 'react';
import { CAR_MODELS, CONTACT_INFO, PRICING_BY_MODEL } from '../constants';
import { ArrowLeft, Check, Phone, MessageCircle, Wallet, Shield, Award, CheckCircle2 } from 'lucide-react';
import { PageView } from '../App';

interface ProductDetailViewProps {
  carId: string;
  onNavigate: (view: PageView) => void;
}

const ProductDetailView: React.FC<ProductDetailViewProps> = ({ carId, onNavigate }) => {
  const car = CAR_MODELS.find(c => c.id === carId);
  const [activeImage, setActiveImage] = useState<string>('');

  // Extract pricing data for this car
  const pricingModels = PRICING_BY_MODEL.flatMap(g => g.models).filter(m => m.id === carId);

  useEffect(() => {
    if (car && car.images.length > 0) {
      setActiveImage(car.images[0]);
    }
  }, [car]);

  if (!car) {
    return <div className="pt-32 text-center">Không tìm thấy sản phẩm.</div>;
  }

  return (
    <div className="pt-20 min-h-screen bg-white animate-fade-in font-sans">

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 lg:px-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
          <button onClick={() => onNavigate('home')} className="hover:text-black">Trang Chủ</button>
          <span>/</span>
          <button onClick={() => onNavigate('products')} className="hover:text-black">Dòng Xe</button>
          <span>/</span>
          <span className="text-kia-red">{car.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">

          {/* Left: Images */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 mb-4 sm:mb-6 border border-gray-200 shadow-sm">
              <img src={activeImage} alt={car.name} className="w-full h-auto object-cover" />
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-kia-red text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded font-bold uppercase tracking-wide text-xs sm:text-sm">
                {car.status}
              </div>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 font-sans font-bold">
              {car.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-video bg-gray-100 rounded-lg cursor-pointer border transition-all ${activeImage === img ? 'border-kia-red ring-2 ring-kia-red/20' : 'border-transparent hover:border-black'}`}
                >
                  <img src={img} alt={`${car.name} ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-montserrat text-black uppercase mb-2 leading-tight text-center lg:text-left">{car.name}</h1>
            <p className="text-lg sm:text-xl text-gray-500 italic mb-6 text-center lg:text-left">{car.tagline}</p>

            <div className="bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-100 mb-8">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-[10px] sm:text-sm font-bold text-gray-400 sm:text-gray-500 uppercase">Giá Niêm Yết</span>
                <span className="text-2xl sm:text-3xl font-black text-kia-red">{car.price}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs sm:text-sm bg-blue-50 p-2 sm:p-2.5 rounded w-fit mx-auto lg:mx-0">
                <Wallet className="w-4 h-4" />
                Trả góp chỉ từ: {car.installmentPrice}
              </div>
            </div>

            <div className="space-y-4 mb-10 px-2 sm:px-0">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <p className="text-sm sm:text-base text-gray-700"><strong>Sẵn xe giao ngay:</strong> Cam kết đủ màu, giao xe tận nhà.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <p className="text-sm sm:text-base text-gray-700"><strong>Ưu đãi tháng:</strong> Tặng bảo hiểm thân vỏ & phụ kiện chính hãng.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <p className="text-sm sm:text-base text-gray-700"><strong>Hỗ trợ:</strong> Đăng ký lái thử tại nhà miễn phí.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
              <a href={`tel:${CONTACT_INFO.phone.replace(/\./g, '')}`} className="bg-kia-red text-white py-3 sm:py-4 rounded-xl font-bold uppercase flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-lg shadow-red-200 text-xs sm:text-base">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                Gọi Ngay
              </a>
              <a href="http://Zalo.me/0869932031" target="_blank" rel="noreferrer" className="bg-[#0068FF] text-white py-3 sm:py-4 rounded-xl font-bold uppercase flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 text-xs sm:text-base">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Chat Zalo
              </a>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <p className="text-center text-xs text-gray-400 uppercase font-bold mb-4">Cam kết từ {CONTACT_INFO.name}</p>
              <div className="flex justify-around text-center">
                <div>
                  <Shield className="w-6 h-6 text-gray-800 mx-auto mb-2" />
                  <span className="text-[10px] font-bold uppercase block text-gray-600">Bảo hành<br />5 Năm</span>
                </div>
                <div>
                  <Award className="w-6 h-6 text-gray-800 mx-auto mb-2" />
                  <span className="text-[10px] font-bold uppercase block text-gray-600">Showroom<br />3S Quốc Tế</span>
                </div>
                <div>
                  <Wallet className="w-6 h-6 text-gray-800 mx-auto mb-2" />
                  <span className="text-[10px] font-bold uppercase block text-gray-600">Giá Tốt<br />Nhất MB</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* DETAILED PRICING SECTION */}
        {pricingModels.length > 0 && (
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-8 bg-kia-red rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-black font-montserrat text-black uppercase tracking-tight">
                  Bảng Giá Chi Tiết {car.name}
                </h2>
              </div>

              <div className="space-y-10">
                {pricingModels.map((model, mIdx) => (
                  <div key={mIdx}>
                    {pricingModels.length > 1 && (
                      <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 tracking-widest flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-kia-red" />
                        {model.name}
                      </h3>
                    )}
                    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-200/50">
                      <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead>
                          <tr className="border-b border-gray-100 bg-gray-50/50">
                            <th className="py-4 sm:py-5 px-4 sm:px-6 text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-widest">Phiên Bản</th>
                            <th className="py-4 sm:py-5 px-4 sm:px-6 text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-widest">Giá Niêm Yết</th>
                            <th className="py-4 sm:py-5 px-4 sm:px-6 text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-widest text-right">Hành Động</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {model.versions.map((ver, vIdx) => (
                            <tr key={vIdx} className="hover:bg-gray-50/50 transition-colors group">
                              <td className="py-4 sm:py-6 px-4 sm:px-6">
                                <span className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-kia-red transition-colors capitalize">
                                  {ver.name.toLowerCase()}
                                </span>
                              </td>
                              <td className="py-4 sm:py-6 px-4 sm:px-6">
                                <span className="text-base sm:text-lg font-black text-kia-red font-montserrat whitespace-nowrap">
                                  {ver.price} <span className="text-[10px] font-bold">VNĐ</span>
                                </span>
                              </td>
                              <td className="py-4 sm:py-6 px-4 sm:px-6 text-right">
                                <a
                                  href="http://Zalo.me/0869932031"
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-2 bg-white border-2 border-kia-red text-kia-red text-[10px] sm:text-xs font-black px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-kia-red hover:text-white transition-all duration-300 uppercase shadow-sm active:scale-95 whitespace-nowrap"
                                >
                                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                  Báo Giá
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              {/* Note */}
              <div className="mt-10 bg-white p-6 rounded-2xl border border-gray-200 flex items-start gap-4">
                <div className="bg-red-50 p-2 rounded-lg">
                  <Award className="w-6 h-6 text-kia-red" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <strong>Lưu ý:</strong> Giá niêm yết trên chưa bao gồm các ưu đãi tiền mặt và quà tặng phụ kiện tại showroom.
                    Tùy vào từng thời điểm, Phòng Bán Hàng <strong>{CONTACT_INFO.name}</strong> sẽ có chính sách giá tốt nhất Hà Nội cho khách hàng.
                  </p>
                  <p className="mt-2 text-sm font-bold text-kia-red">
                    Gọi ngay {CONTACT_INFO.phone} để ép giá tốt nhất!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailView;