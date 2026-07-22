import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, MapPin, ChevronRight, Briefcase } from 'lucide-react';

export interface PersonalDetailsData {
  fullName: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | '';
  address: string;
  city: string;
  state: string;
  pincode: string;
  occupation: string;
  annualIncome: string;
}

interface PersonalDetailsProps {
  initialData?: Partial<PersonalDetailsData>;
  onNext: (data: PersonalDetailsData) => void;
}

export const PersonalDetailsStep: React.FC<PersonalDetailsProps> = ({ initialData, onNext }) => {
  const [formData, setFormData] = useState<PersonalDetailsData>({
    fullName: initialData?.fullName || '',
    email: initialData?.email || '',
    mobile: initialData?.mobile || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    gender: (initialData?.gender as any) || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    pincode: initialData?.pincode || '',
    occupation: initialData?.occupation || '',
    annualIncome: initialData?.annualIncome || ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PersonalDetailsData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof PersonalDetailsData, string>> = {};

    if (!formData.fullName) newErrors.fullName = 'Full name is required as per PAN';
    if (!formData.email) newErrors.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.mobile)) newErrors.mobile = 'Enter valid 10-digit Indian mobile number';

    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Please select gender';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Enter valid 6-digit pincode';

    if (!formData.occupation) newErrors.occupation = 'Occupation is required';
    if (!formData.annualIncome) newErrors.annualIncome = 'Annual income is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-xl mx-auto space-y-6 font-sans text-slate-100"
    >
      <div className="text-center mb-6">
        <div className="w-14 h-14 mx-auto bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-3 text-blue-400">
          <User className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">Personal & Demographics Details</h2>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Provide your identity details matching official government identification documents.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Full Name (as per PAN Card) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Omar Khan"
              className={`w-full pl-10 pr-4 py-3 bg-[#1E293B] border rounded-xl text-xs font-medium text-white placeholder-slate-500 outline-none transition ${
                errors.fullName ? 'border-rose-500' : 'border-slate-700 focus:border-blue-500'
              }`}
            />
          </div>
          {errors.fullName && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{errors.fullName}</span>}
        </div>

        {/* Email & Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-3 bg-[#1E293B] border rounded-xl text-xs font-medium text-white outline-none transition ${
                  errors.email ? 'border-rose-500' : 'border-slate-700 focus:border-blue-500'
                }`}
              />
            </div>
            {errors.email && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{errors.email}</span>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Mobile Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="tel"
                maxLength={10}
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="9876543210"
                className={`w-full pl-10 pr-4 py-3 bg-[#1E293B] border rounded-xl text-xs font-medium text-white outline-none transition ${
                  errors.mobile ? 'border-rose-500' : 'border-slate-700 focus:border-blue-500'
                }`}
              />
            </div>
            {errors.mobile && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{errors.mobile}</span>}
          </div>
        </div>

        {/* Date of Birth & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Date of Birth <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className={`w-full pl-10 pr-4 py-3 bg-[#1E293B] border rounded-xl text-xs font-medium text-white outline-none transition ${
                  errors.dateOfBirth ? 'border-rose-500' : 'border-slate-700 focus:border-blue-500'
                }`}
              />
            </div>
            {errors.dateOfBirth && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{errors.dateOfBirth}</span>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Gender <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
              className={`w-full px-3.5 py-3 bg-[#1E293B] border rounded-xl text-xs font-medium text-white outline-none transition ${
                errors.gender ? 'border-rose-500' : 'border-slate-700 focus:border-blue-500'
              }`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{errors.gender}</span>}
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Residential Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <textarea
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="House/Flat No, Street, Locality"
              className={`w-full pl-10 pr-4 py-2.5 bg-[#1E293B] border rounded-xl text-xs font-medium text-white outline-none transition ${
                errors.address ? 'border-rose-500' : 'border-slate-700 focus:border-blue-500'
              }`}
            />
          </div>
          {errors.address && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{errors.address}</span>}
        </div>

        {/* City, State, Pincode */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">City *</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Mumbai"
              className="w-full px-3 py-2.5 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-medium text-white outline-none focus:border-blue-500"
            />
            {errors.city && <span className="text-[10px] font-bold text-rose-500 mt-0.5 block">{errors.city}</span>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">State *</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              placeholder="Maharashtra"
              className="w-full px-3 py-2.5 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-medium text-white outline-none focus:border-blue-500"
            />
            {errors.state && <span className="text-[10px] font-bold text-rose-500 mt-0.5 block">{errors.state}</span>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Pincode *</label>
            <input
              type="text"
              maxLength={6}
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              placeholder="400001"
              className="w-full px-3 py-2.5 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-medium text-white outline-none focus:border-blue-500"
            />
            {errors.pincode && <span className="text-[10px] font-bold text-rose-500 mt-0.5 block">{errors.pincode}</span>}
          </div>
        </div>

        {/* Occupation & Income */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Occupation *</label>
            <select
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="w-full px-3.5 py-3 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-medium text-white outline-none focus:border-blue-500"
            >
              <option value="">Select Occupation</option>
              <option value="salaried">Salaried Employee</option>
              <option value="self-employed">Self-Employed / Business</option>
              <option value="professional">Professional</option>
              <option value="student">Student / Homemaker</option>
            </select>
            {errors.occupation && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{errors.occupation}</span>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Annual Income *</label>
            <select
              value={formData.annualIncome}
              onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
              className="w-full px-3.5 py-3 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-medium text-white outline-none focus:border-blue-500"
            >
              <option value="">Select Income Bracket</option>
              <option value="1-5lakh">₹1 Lakh - ₹5 Lakh</option>
              <option value="5-10lakh">₹5 Lakh - ₹10 Lakh</option>
              <option value="10-25lakh">₹10 Lakh - ₹25 Lakh</option>
              <option value=">25lakh">Above ₹25 Lakh</option>
            </select>
            {errors.annualIncome && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{errors.annualIncome}</span>}
          </div>
        </div>

      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
        >
          <span>Next: PAN Verification</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default PersonalDetailsStep;
