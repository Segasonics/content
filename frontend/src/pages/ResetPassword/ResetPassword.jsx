import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../features/AuthDataSlice/AuthDataSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Reset Password Data:", form);

  try {
    const result = await dispatch(resetPassword(form));

    if (resetPassword.fulfilled.match(result)) {
      toast.success(result.payload.message || "Password reset successful");
      setForm({ oldPassword: "", newPassword: "" });
      navigate('/')
    } else {
      toast.error(result.payload?.message || "Password reset failed");
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Old Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
              placeholder="Enter old password"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-950 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 cursor-pointer transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
