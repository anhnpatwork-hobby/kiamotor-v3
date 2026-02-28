import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { CAR_MODELS, CONTACT_INFO } from '../constants';

interface PopupFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        budget: '',
        carModel: ''
    });

    // Handle escape key to close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.phone) {
            alert('Vui lòng nhập số điện thoại!');
            return;
        }

        const subject = `Yêu cầu tư vấn xe từ ${formData.name || 'Khách hàng'}`;
        const body = `Chào ${CONTACT_INFO.consultantName}, tôi muốn nhận tư vấn xe.

Thông tin khách hàng:
- Họ tên: ${formData.name || 'Không cung cấp'}
- SĐT: ${formData.phone}
- Tầm tiền: ${formData.budget || 'Chưa xác định'}
- Dòng xe quan tâm: ${formData.carModel || 'Chưa xác định'}`;

        window.location.href = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-900 bg-white/50 hover:bg-white rounded-full transition-all"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Left Panel - Red */}
                <div className="w-full md:w-5/12 bg-kia-red p-8 md:p-12 flex flex-col justify-center text-white">
                    <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 leading-tight">
                        BẠN VẪN PHÂN<br />
                        VÂN CHƯA CHỌN<br />
                        ĐƯỢC XE?
                    </h2>
                    <p className="text-lg text-white/90 leading-relaxed font-medium">
                        Đừng lo, hãy để lại thông tin. Chuyên gia tư vấn sẽ gọi lại hỗ trợ bạn tìm ra chiếc xe phù hợp nhất với ngân sách trong 5 phút.
                    </p>
                </div>

                {/* Right Panel - Form */}
                <div className="w-full md:w-7/12 p-8 md:p-12 bg-gray-50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-bold text-gray-600 uppercase tracking-wide">
                                    Họ tên
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Nhập họ tên"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-kia-red focus:border-transparent transition-all outline-none"
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-bold text-gray-600 uppercase tracking-wide">
                                    Số điện thoại <span className="text-kia-red">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Nhập SĐT"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-kia-red focus:border-transparent transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-600 uppercase tracking-wide">
                                Tầm tiền dự kiến
                            </label>
                            <select
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-kia-red focus:border-transparent transition-all outline-none text-gray-700"
                            >
                                <option value="">Chọn tầm tiền dự kiến</option>
                                <option value="Dưới 500 Triệu">Dưới 500 Triệu</option>
                                <option value="500 - 700 Triệu">Từ 500 - 700 Triệu</option>
                                <option value="700 - 1 Tỷ">Từ 700 - 1 Tỷ</option>
                                <option value="Trên 1 Tỷ">Trên 1 Tỷ</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-600 uppercase tracking-wide">
                                Dòng xe quan tâm
                            </label>
                            <select
                                name="carModel"
                                value={formData.carModel}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-kia-red focus:border-transparent transition-all outline-none text-gray-700"
                            >
                                <option value="">Chọn dòng xe (Tùy chọn)</option>
                                {CAR_MODELS.map(car => (
                                    <option key={car.id} value={car.name}>{car.name}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-300 shadow-xl mt-4"
                        >
                            <span>GỬI YÊU CẦU TƯ VẤN</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default PopupForm;
