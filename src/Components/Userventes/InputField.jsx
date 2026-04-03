import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

export default function InputField({ label, placeholder, icon: Icon }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        {label} <span className="text-red-500">*</span>
      </label>

      <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-orange-400">
        {Icon && <Icon className="text-gray-400 mr-2" />}
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>
    </div>
  );
}