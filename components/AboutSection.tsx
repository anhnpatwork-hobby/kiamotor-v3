import React from 'react';
import { CONTACT_INFO } from '../constants';
import { ShieldCheck, Award, ThumbsUp } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          {/* Image Side */}
          <div className="w-full lg:w-3/5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/kia-long-bien.webp"
                alt="Showroom KIA Long Biên"
                className="w-full h-auto object-cover transform hover:scale-105 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-8">
                <p className="text-white font-montserrat font-bold text-2xl">{CONTACT_INFO.name}</p>
                <p className="text-kia-red font-medium">{CONTACT_INFO.role}</p>
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-100 rounded-full -z-10"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-red-50 rounded-full -z-10"></div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-2/5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-montserrat text-kia-black mb-6 uppercase tracking-tight text-center lg:text-left">
              Showroom KIA Số 1 <br />
              <span className="text-kia-red">Tại Hà Nội</span>
            </h2>

            <div className="prose prose-base sm:prose-lg text-gray-600 mb-10 text-center lg:text-left">
              <p className="font-bold text-black text-lg sm:text-xl mb-4">
                "{CONTACT_INFO.name} - Nơi niềm tin được khẳng định qua chất lượng dịch vụ và sự tận tâm."
              </p>
              <p className="mb-4">
                Là Showroom 3S chính hãng lớn nhất miền Bắc, chúng tôi tự hào sở hữu không gian trưng bày hiện đại cùng xưởng dịch vụ tiêu chuẩn toàn cầu.
              </p>
              <p>
                Với kho xe lớn nhất khu vực, chúng tôi cam kết giao xe ngay, đủ màu và mức giá cạnh tranh nhất thị trường. Đội ngũ nhân sự chuyên nghiệp luôn sẵn sàng phục vụ quý khách 24/7.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              <div className="text-center p-3 sm:p-4 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow bg-white shadow-sm sm:shadow-none">
                <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-kia-red mx-auto mb-2 sm:mb-3" />
                <h4 className="font-black text-[10px] sm:text-xs uppercase tracking-tighter sm:tracking-normal">Chính Hãng</h4>
              </div>
              <div className="text-center p-3 sm:p-4 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow bg-white shadow-sm sm:shadow-none">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-kia-red mx-auto mb-2 sm:mb-3" />
                <h4 className="font-black text-[10px] sm:text-xs uppercase tracking-tighter sm:tracking-normal">Uy Tín</h4>
              </div>
              <div className="text-center p-3 sm:p-4 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow bg-white shadow-sm sm:shadow-none">
                <ThumbsUp className="w-6 h-6 sm:w-8 sm:h-8 text-kia-red mx-auto mb-2 sm:mb-3" />
                <h4 className="font-black text-[10px] sm:text-xs uppercase tracking-tighter sm:tracking-normal">Chuyên Nghiệp</h4>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;