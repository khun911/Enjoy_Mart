"use client";

import React, { useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Award,
  Sparkles,
  Camera,
  CheckCircle2,
  Package,
  Heart,
  Save,
  Bell,
  KeyRound,
  Plus,
} from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    name: string;
    email: string;
    isVip: boolean;
  };
  onUpdateUser: (updated: { name: string; email: string }) => void;
}

export default function ProfileModal({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
}: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState<"personal" | "addresses" | "payments" | "security">("personal");

  // Editable Profile Form State
  const [fullName, setFullName] = useState(currentUser.name || "Khun Phan");
  const [email, setEmail] = useState(currentUser.email || "khun911@users.noreply.github.com");
  const [phone, setPhone] = useState("+855 12 345 678");
  const [gender, setGender] = useState("Male");
  const [birthday, setBirthday] = useState("1998-05-15");
  const [isSaved, setIsSaved] = useState(false);

  // Address State
  const [addresses, setAddresses] = useState([
    {
      id: "addr-1",
      title: "Home (Default)",
      street: "No. 128, Street 2004",
      city: "Phnom Penh",
      country: "Cambodia",
      isDefault: true,
    },
    {
      id: "addr-2",
      title: "Work / Office",
      street: "Tech Tower, 8th Floor, Preah Monivong Blvd",
      city: "Phnom Penh",
      country: "Cambodia",
      isDefault: false,
    },
  ]);

  // Notifications State
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [promoAlerts, setPromoAlerts] = useState(true);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ name: fullName, email });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100 flex flex-col max-h-[92vh]">
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white p-6 pb-16 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-white leading-none">
                ENJOY<span className="text-blue-300">-MART</span>
              </span>
              <span className="text-white/60 text-xs font-semibold">| Client Profile</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Identity Bar */}
        <div className="px-6 -mt-10 mb-4 shrink-0">
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              {/* Avatar with Camera badge */}
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
                  {fullName.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full p-1 shadow border border-gray-200 flex items-center justify-center text-blue-600">
                  <Camera className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-lg font-black text-gray-900">{fullName}</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                    <Sparkles className="w-3 h-3 text-amber-500" /> VIP Gold
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{email}</p>
                <span className="text-[10px] font-medium text-emerald-600 flex items-center justify-center sm:justify-start gap-1 mt-1">
                  <ShieldCheck className="w-3 h-3" /> Verified Account Holder
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-4">
              <div className="text-center">
                <div className="text-base font-black text-gray-900">12</div>
                <div className="text-[10px] text-gray-400 font-medium flex items-center gap-1 justify-center">
                  <Package className="w-3 h-3 text-blue-500" /> Orders
                </div>
              </div>
              <div className="text-center">
                <div className="text-base font-black text-amber-600">1,420</div>
                <div className="text-[10px] text-gray-400 font-medium flex items-center gap-1 justify-center">
                  <Award className="w-3 h-3 text-amber-500" /> Points
                </div>
              </div>
              <div className="text-center">
                <div className="text-base font-black text-rose-500">3</div>
                <div className="text-[10px] text-gray-400 font-medium flex items-center gap-1 justify-center">
                  <Heart className="w-3 h-3 text-rose-500" /> Saved
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-gray-100 flex items-center gap-6 text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("personal")}
            className={`py-2.5 relative transition cursor-pointer ${
              activeTab === "personal"
                ? "text-blue-600 font-bold border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Personal Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("addresses")}
            className={`py-2.5 relative transition cursor-pointer ${
              activeTab === "addresses"
                ? "text-blue-600 font-bold border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Saved Addresses ({addresses.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("payments")}
            className={`py-2.5 relative transition cursor-pointer ${
              activeTab === "payments"
                ? "text-blue-600 font-bold border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Payment Cards
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`py-2.5 relative transition cursor-pointer ${
              activeTab === "security"
                ? "text-blue-600 font-bold border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Security & Alerts
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "personal" && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Client Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition"
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition"
                    />
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition"
                    />
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Account Status
                  </label>
                  <div className="px-3.5 py-2.5 bg-blue-50 border border-blue-100 rounded-xl text-xs font-bold text-blue-700 flex items-center justify-between">
                    <span>VIP Platinum Member</span>
                    <span className="text-[10px] text-blue-500 font-normal">Active</span>
                  </div>
                </div>
              </div>

              {isSaved && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-bold animate-in fade-in duration-150">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Your profile details have been saved successfully!</span>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === "addresses" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Manage shipping addresses for fast 1-click checkout.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newAddr = {
                      id: `addr-${Date.now()}`,
                      title: "New Address",
                      street: "Street 271, Sangkat Boeng Tumpun",
                      city: "Phnom Penh",
                      country: "Cambodia",
                      isDefault: false,
                    };
                    setAddresses([...addresses, newAddr]);
                  }}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Address
                </button>
              </div>

              <div className="space-y-3">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-4 rounded-2xl border transition ${
                      addr.isDefault
                        ? "border-blue-500 bg-blue-50/40"
                        : "border-gray-200 bg-gray-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <h4 className="text-xs font-bold text-gray-900">{addr.title}</h4>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                            Default
                          </span>
                        )}
                      </div>
                      {!addr.isDefault && (
                        <button
                          type="button"
                          onClick={() => {
                            setAddresses(
                              addresses.map((a) => ({
                                ...a,
                                isDefault: a.id === addr.id,
                              }))
                            );
                          }}
                          className="text-[11px] text-blue-600 hover:underline cursor-pointer font-semibold"
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1 pl-6">
                      {addr.street}, {addr.city}, {addr.country}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-4">
              <span className="text-xs text-gray-500 block">
                Saved credit and debit cards secured with 256-Bit SSL encryption.
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Visa Card */}
                <div className="p-4 rounded-2xl border-2 border-blue-600 bg-gradient-to-tr from-slate-900 to-blue-900 text-white shadow-sm flex flex-col justify-between h-36">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold italic text-lg tracking-tight">VISA</span>
                    <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
                      Primary
                    </span>
                  </div>
                  <div className="font-mono text-sm tracking-widest">•••• •••• •••• 9182</div>
                  <div className="flex items-center justify-between text-[10px] text-blue-200">
                    <span className="uppercase">{fullName}</span>
                    <span>EXP: 08/29</span>
                  </div>
                </div>

                {/* Mastercard */}
                <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/80 text-gray-800 flex flex-col justify-between h-36">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-red-500" />
                      <div className="w-5 h-5 rounded-full bg-amber-400 -ml-2" />
                    </div>
                    <span className="text-[10px] text-gray-400">Secondary</span>
                  </div>
                  <div className="font-mono text-sm tracking-widest text-gray-700">•••• •••• •••• 4242</div>
                  <div className="flex items-center justify-between text-[10px] text-gray-500">
                    <span className="uppercase">{fullName}</span>
                    <span>EXP: 11/27</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-gray-700" />
                    <span className="font-bold text-gray-900">Account Password</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert("Password reset link sent to your registered email.")}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-blue-600 font-bold hover:bg-blue-50 cursor-pointer"
                  >
                    Change Password
                  </button>
                </div>
                <p className="text-[11px] text-gray-500">
                  Last changed 3 months ago. Strong alphanumeric encryption recommended.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-center gap-2 font-bold text-gray-900">
                  <Bell className="w-4 h-4 text-gray-700" />
                  <span>Email & SMS Notifications</span>
                </div>

                <div className="space-y-2 pt-1">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-700">Real-time Order & Tracking updates</span>
                    <input
                      type="checkbox"
                      checked={orderAlerts}
                      onChange={(e) => setOrderAlerts(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-700">Exclusive VIP Promotions & Flash Deals</span>
                    <input
                      type="checkbox"
                      checked={promoAlerts}
                      onChange={(e) => setPromoAlerts(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs shrink-0">
          <span className="text-[11px] text-gray-400">
            Enjoy-Mart Account ID: #EM-USER-9118
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
