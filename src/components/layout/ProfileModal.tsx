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

  const displayName = fullName || currentUser.name || "khun911";
  const displayEmail = email || currentUser.email || "khun911@enjoy-mart.com";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white p-6 pb-16 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-white leading-none">
                ENJOY<span className="text-blue-300">-MART</span>
              </span>
              <span className="text-white/80 text-xs font-semibold">| Client Profile</span>
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
          <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              {/* Avatar with Camera badge */}
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full p-1 shadow border border-slate-200 flex items-center justify-center text-blue-600">
                  <Camera className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-lg font-black text-slate-900">{displayName}</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-[10px] font-black">
                    <Sparkles className="w-3 h-3 text-amber-500" /> VIP Gold
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">{displayEmail}</p>
                <span className="text-[10px] font-bold text-emerald-700 flex items-center justify-center sm:justify-start gap-1 mt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Account Holder
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-4">
              <div className="text-center">
                <div className="text-base font-black text-slate-900">12</div>
                <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1 justify-center">
                  <Package className="w-3 h-3 text-blue-600" /> Orders
                </div>
              </div>
              <div className="text-center">
                <div className="text-base font-black text-amber-700">1,420</div>
                <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1 justify-center">
                  <Award className="w-3 h-3 text-amber-600" /> Points
                </div>
              </div>
              <div className="text-center">
                <div className="text-base font-black text-rose-600">3</div>
                <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1 justify-center">
                  <Heart className="w-3 h-3 text-rose-600" /> Saved
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 flex items-center gap-6 text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("personal")}
            className={`py-2.5 relative transition cursor-pointer ${
              activeTab === "personal"
                ? "text-blue-700 font-extrabold border-b-2 border-blue-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Personal Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("addresses")}
            className={`py-2.5 relative transition cursor-pointer ${
              activeTab === "addresses"
                ? "text-blue-700 font-extrabold border-b-2 border-blue-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Saved Addresses ({addresses.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("payments")}
            className={`py-2.5 relative transition cursor-pointer ${
              activeTab === "payments"
                ? "text-blue-700 font-extrabold border-b-2 border-blue-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Payment Cards
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`py-2.5 relative transition cursor-pointer ${
              activeTab === "security"
                ? "text-blue-700 font-extrabold border-b-2 border-blue-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Security & Alerts
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {activeTab === "personal" && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Client Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Khun Phan"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition shadow-2xs"
                    />
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@email.com"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition shadow-2xs"
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+855 12 345 678"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition shadow-2xs"
                    />
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition cursor-pointer shadow-2xs"
                  >
                    <option value="Male" className="text-slate-900 bg-white">Male</option>
                    <option value="Female" className="text-slate-900 bg-white">Female</option>
                    <option value="Other" className="text-slate-900 bg-white">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Account Status
                  </label>
                  <div className="px-3.5 py-2.5 bg-blue-50 border border-blue-200 rounded-xl text-xs font-extrabold text-blue-900 flex items-center justify-between shadow-2xs">
                    <span>VIP Platinum Member</span>
                    <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {isSaved && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-900 font-bold animate-in fade-in duration-150">
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
                <span className="text-xs text-slate-600 font-medium">
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
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer"
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
                        ? "border-blue-500 bg-blue-50/50"
                        : "border-slate-200 bg-slate-50/70"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <h4 className="text-xs font-bold text-slate-900">{addr.title}</h4>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
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
                          className="text-[11px] text-blue-600 hover:underline cursor-pointer font-bold"
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-slate-700 font-medium mt-1 pl-6">
                      {addr.street}, {addr.city}, {addr.country}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-4">
              <span className="text-xs text-slate-600 font-medium block">
                Saved credit and debit cards secured with 256-Bit SSL encryption.
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Visa Card */}
                <div className="p-4 rounded-2xl border-2 border-blue-600 bg-gradient-to-tr from-slate-950 to-blue-950 text-white shadow-sm flex flex-col justify-between h-36">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold italic text-lg tracking-tight text-white">VISA</span>
                    <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
                      Primary
                    </span>
                  </div>
                  <div className="font-mono text-sm tracking-widest text-white">•••• •••• •••• 9182</div>
                  <div className="flex items-center justify-between text-[10px] text-blue-200 font-semibold">
                    <span className="uppercase">{displayName}</span>
                    <span>EXP: 08/29</span>
                  </div>
                </div>

                {/* Mastercard */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 flex flex-col justify-between h-36">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-red-500" />
                      <div className="w-5 h-5 rounded-full bg-amber-400 -ml-2" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold">Secondary</span>
                  </div>
                  <div className="font-mono text-sm tracking-widest text-slate-900 font-bold">•••• •••• •••• 4242</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-600 font-semibold">
                    <span className="uppercase">{displayName}</span>
                    <span>EXP: 11/27</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-slate-700" />
                    <span className="font-bold text-slate-900">Account Password</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert("Password reset link sent to your registered email.")}
                    className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-blue-600 font-bold hover:bg-blue-50 cursor-pointer shadow-2xs"
                  >
                    Change Password
                  </button>
                </div>
                <p className="text-[11px] text-slate-600 font-medium">
                  Last changed 3 months ago. Strong alphanumeric encryption recommended.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Bell className="w-4 h-4 text-slate-700" />
                  <span>Email & SMS Notifications</span>
                </div>

                <div className="space-y-2 pt-1 font-semibold">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-slate-800">Real-time Order & Tracking updates</span>
                    <input
                      type="checkbox"
                      checked={orderAlerts}
                      onChange={(e) => setOrderAlerts(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-slate-800">Exclusive VIP Promotions & Flash Deals</span>
                    <input
                      type="checkbox"
                      checked={promoAlerts}
                      onChange={(e) => setPromoAlerts(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
          <span className="text-[11px] text-slate-500 font-medium">
            Enjoy-Mart Account ID: #EM-USER-9118
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-xl font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
