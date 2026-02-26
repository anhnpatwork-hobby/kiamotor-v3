import React from 'react';
import { CONTACT_INFO, CAR_MODELS, PRICING_BY_MODEL } from '../constants';
import { PageView } from '../App';
import { AlertTriangle, ArrowRight, MessageCircle, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

interface PricingViewProps {
  onNavigate: (view: PageView, id?: string) => void;
}

// Helper to find car image from constants
const getCarImage = (id: string) => {
  const car = CAR_MODELS.find(c => c.id === id);
  return car ? car.images[0] : 'https://via.placeholder.com/600x400?text=KIA+Car';
};



const PricingView: React.FC<PricingViewProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 animate-fade-in font-sans">

      {/* 1. HEADER & DISCLAIMER */}
      <section className="bg-white pb-10 sm:pb-12 pt-6 sm:pt-8 border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black font-montserrat text-kia-black uppercase tracking-tight mb-4 leading-tight">
              Bảng Giá Xe KIA <span className="text-kia-red block sm:inline">Niêm Yết Chính Hãng 2026</span>
            </h1>
            <p className="text-gray-500 font-medium mb-6 sm:mb-8 text-sm sm:text-base">
              Cập nhật mới nhất tại {CONTACT_INFO.name}. <br className="sm:hidden" /> Giá đã bao gồm VAT.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-6 text-left flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-sm">
              <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0" />
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-gray-900 uppercase mb-1 text-sm sm:text-base">Thông Báo Quan Trọng</h3>
                <p className="text-[12px] sm:text-sm text-gray-700 leading-relaxed">
                  <strong>Lưu ý:</strong> Bảng giá dưới đây là <strong>Giá Niêm Yết</strong> từ nhà máy.
                  Để nhận <strong>Giá Lăn Bánh</strong>,
                  Quý khách vui lòng liên hệ Hotline: <a href={`tel:${CONTACT_INFO.phone}`} className="font-bold text-kia-red hover:underline">{CONTACT_INFO.phone}</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRICE TABLES BY MODEL */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {PRICING_BY_MODEL.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-12 sm:mb-20 last:mb-0">
              {/* Category Title */}
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-black font-montserrat text-white bg-black py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg uppercase tracking-wide">
                  {group.category}
                </h2>
                <div className="h-px bg-gray-300 flex-grow hidden sm:block"></div>
              </div>

              {/* Models Loop */}
              <div className="space-y-8 sm:space-y-12">
                {group.models.map((model, modelIndex) => (
                  <div key={modelIndex} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-12">

                      {/* Left: Image (Fixed Height Frame) */}
                      <div className="lg:col-span-5 bg-gray-50 p-6 flex flex-col justify-center items-center border-b lg:border-b-0 lg:border-r border-gray-100 relative group cursor-pointer" onClick={() => onNavigate('product-detail', model.id)}>
                        <h3 className="text-xl sm:text-2xl font-black font-montserrat text-gray-900 uppercase mb-4 z-10 text-center">{model.name}</h3>

                        {/* Fixed height container for consistent frame size */}
                        <div className="relative w-full h-[150px] sm:h-[220px] mb-4 sm:mb-6 flex items-center justify-center">
                          <img
                            src={getCarImage(model.id)}
                            alt={model.name}
                            className="max-w-[70%] sm:max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-700 drop-shadow-xl z-10"
                          />
                          {/* Decorative blob */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white rounded-full blur-2xl -z-0"></div>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-kia-red transition-colors">
                          <span>Xem chi tiết xe</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>

                      {/* Right: Table */}
                      <div className="lg:col-span-7 p-4 sm:p-6">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse min-w-[320px]">
                            <thead>
                              <tr className="border-b-2 border-gray-100">
                                <th className="py-3 pr-4 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Phiên Bản</th>
                                <th className="py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Giá Niêm Yết</th>
                                <th className="py-3 pl-4 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Hành Động</th>
                              </tr>
                            </thead>
                            <tbody>
                              {model.versions.map((ver, vIndex) => (
                                <tr key={vIndex} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/80 transition-colors">
                                  <td className="py-3 sm:py-4 pr-3 text-[12px] sm:text-sm font-bold text-gray-800 leading-tight">{ver.name}</td>
                                  <td className="py-3 px-2 sm:px-4 text-[12px] sm:text-base font-black text-kia-red font-montserrat whitespace-nowrap">{ver.price}</td>
                                  <td className="py-3 pl-3 text-right">
                                    <a
                                      href="http://Zalo.me/0869932031"
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 bg-white border border-kia-red text-kia-red text-[10px] sm:text-[10px] font-black px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-kia-red hover:text-white transition-all uppercase whitespace-nowrap shadow-sm"
                                    >
                                      <MessageCircle className="w-3 h-3" />
                                      Báo Giá
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100 bg-red-50/50 rounded-xl p-3.5 flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-kia-red mt-0.5 flex-shrink-0" />
                          <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed">
                            <strong>Giá tốt + Quà tặng độc quyền:</strong> Gọi ngay Hotline <a href={`tel:${CONTACT_INFO.phone}`} className="text-kia-red font-bold hover:underline">{CONTACT_INFO.phone}</a>.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SEO & INFO SECTION */}
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="text-2xl font-black font-montserrat text-gray-900 mb-6 uppercase">
            Dự Tính Chi Phí Lăn Bánh Xe KIA Tại Hà Nội
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600 bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <p className="mb-4">
              Ngoài giá niêm yết ở trên, để xe có thể lăn bánh hợp pháp trên đường, Quý khách hàng cần chi trả thêm các khoản thuế phí bắt buộc của nhà nước (Cập nhật 2026):
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-sm md:text-base">
              <li><strong>Thuế trước bạ:</strong> 12% giá trị xe (Áp dụng tại Hà Nội).</li>
              <li><strong>Phí biển số:</strong> 20.000.000 VNĐ (Biển Hà Nội).</li>
              <li><strong>Phí đăng kiểm:</strong> 340.000 VNĐ.</li>
              <li><strong>Phí đường bộ:</strong> 1.560.000 VNĐ/năm (Cá nhân).</li>
              <li><strong>Bảo hiểm TNDS:</strong> 480.000 VNĐ (Xe 5 chỗ) hoặc 873.000 VNĐ (Xe 7 chỗ).</li>
            </ul>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-blue-800 text-sm italic">
                <strong>MẸO NHỎ:</strong> Hiện tại {CONTACT_INFO.name} đang có chương trình <strong>Hỗ trợ 50% - 100% Lệ phí trước bạ</strong> cho một số dòng xe.
                Con số lăn bánh thực tế sẽ <span className="text-red-600 font-bold uppercase">THẤP HƠN</span> nhiều so với tính toán lý thuyết.
                Hãy gọi cho chúng tôi để biết chính xác xe nào đang được giảm thuế.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION FORM */}
      <section className="py-16 bg-[#050505] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
            <FileSpreadsheet className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-black font-montserrat uppercase mb-2">
              Nhận Báo Giá Lăn Bánh Chi Tiết
            </h2>
            <p className="text-gray-400 mb-8 text-sm md:text-base">
              Chúng tôi sẽ gửi bảng tính chi tiết (File Excel/Ảnh) bao gồm cả phí dịch vụ đăng ký trọn gói qua Zalo cho anh/chị ngay lập tức.
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Họ tên của bạn"
                className="w-full p-4 rounded-lg bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-kia-red focus:ring-1 focus:ring-kia-red transition-all"
              />
              <input
                type="tel"
                placeholder="Số điện thoại Zalo"
                className="w-full p-4 rounded-lg bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-kia-red focus:ring-1 focus:ring-kia-red transition-all"
              />
              <select className="w-full p-4 rounded-lg bg-black/50 border border-gray-700 text-white focus:outline-none focus:border-kia-red focus:ring-1 focus:ring-kia-red transition-all appearance-none cursor-pointer">
                <option className="text-gray-500">Dòng xe quan tâm...</option>
                {PRICING_BY_MODEL.flatMap(g => g.models).map((m, idx) => (
                  <option key={idx} value={m.name} className="text-black">{m.name}</option>
                ))}
              </select>

              <button className="w-full bg-kia-red hover:bg-red-700 text-white font-bold py-4 rounded-lg uppercase tracking-wider transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 mt-4">
                Gửi Yêu Cầu Ngay
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PricingView;