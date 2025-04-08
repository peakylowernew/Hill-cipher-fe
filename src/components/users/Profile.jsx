import Header from "../../layout/Header";
import { useState, useMemo } from "react";
import { FaBook, FaPhone, FaTimes } from "react-icons/fa"; // Sử dụng icon từ react-icons

const avatar = "/image/avata2.jpg";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null); // Lưu thông tin công cụ được chọn để hiển thị trong modal

  // Dữ liệu mẫu
  const historyData = useMemo(
    () => [
      { id: 1, tool: "Encrypt", day: "Sunday 9:30 AM", content: "detail" },
      { id: 2, tool: "Decrypt", day: "Sunday 6:00 AM", content: "detail" },
      { id: 3, tool: "Encrypt", day: "Thursday 8:20 AM", content: "detail"},
      { id: 1, tool: "Encrypt", day: "Sunday 9:30 AM", content: "detail" },
      { id: 2, tool: "Decrypt", day: "Sunday 6:00 AM", content: "detail" },
      { id: 3, tool: "Encrypt", day: "Thursday 8:20 AM", content: "detail"},
      { id: 1, tool: "Encrypt", day: "Sunday 9:30 AM", content: "detail" },
      { id: 2, tool: "Decrypt", day: "Sunday 6:00 AM", content: "detail" },
      { id: 3, tool: "Encrypt", day: "Thursday 8:20 AM", content: "detail"},
      { id: 1, tool: "Encrypt", day: "Sunday 9:30 AM", content: "detail" },
      { id: 2, tool: "Decrypt", day: "Sunday 6:00 AM", content: "detail" },
      { id: 3, tool: "Encrypt", day: "Thursday 8:20 AM", content: "detail"},
      // Thêm dữ liệu mẫu nếu cần
    ],
    []
  );

  // Hàm mở modal và lưu thông tin công cụ được chọn
  const openModal = (item) => {
    setSelectedTool(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans pt-16">
      <Header />
      <main className="max-w-5xl mx-auto p-6 space-y-10">
        {/* Thông tin người dùng */}
        <section className="flex items-center gap-6 bg-gray-800/50 p-6 rounded-xl shadow-lg">
          <img
            src={avatar}
            alt="User avatar"
            className="rounded-full w-28 h-28 object-cover border-4 border-purple-500"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">Nguyễn Văn</h1>
            <button className="mt-3 px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300">
              Edit Profile
            </button>
          </div>
        </section>

        {/* Thông tin cá nhân */}
        <section className="bg-gray-800/50 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FaBook className="text-gray-400" />
              <p className="text-blue-400">Email: nguyenvan@gmail.com</p>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-gray-400" />
              <p className="text-blue-400">Phone: 01928356</p>
            </div>
          </div>
        </section>

        {/* Lịch sử sử dụng công cụ */}
        <section className="bg-gray-800/50 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Tool usage history</h2>
          <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
            <table className="w-full text-sm text-left">
              <thead className="sticky top-0 bg-gray-800/80 text-gray-300">
                <tr className="border-b border-gray-600">
                  <th className="p-3">Tools</th>
                  <th className="p-3">Day</th>
                  <th className="p-3 text-right">detail</th>
                </tr>
              </thead>
              <tbody>
                {historyData.length > 0 ? (
                  historyData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                      <td className="p-3">{item.tool}</td>
                      <td className="p-3">{item.day}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => openModal(item)}
                          className="text-blue-400 underline hover:text-blue-300 transition-colors"
                        >
                          {item.content}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-3 text-center text-gray-400">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Modal */}
      {isModalOpen && selectedTool && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-gray-100 p-6 rounded-xl w-full max-w-md text-gray-800 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold">Chi tiết công cụ</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Khóa</label>
                <input
                  type="text"
                  value={selectedTool.key}
                  className="mt-1 w-full p-2 bg-gray-200 rounded-lg border border-gray-300"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bản mã</label>
                <input
                  type="text"
                  value={selectedTool.code}
                  className="mt-1 w-full p-2 bg-gray-200 rounded-lg border border-gray-300"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cách thức thực hiện</label>
                <textarea
                  value={selectedTool.method}
                  className="mt-1 w-full p-2 bg-gray-200 rounded-lg border border-gray-300 resize-none"
                  rows="3"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

// CSS tùy chỉnh (nếu cần thêm vào file CSS hoặc trong <style>)
// const customStyles = `
//   @keyframes fade-in {
//     from { opacity: 0; transform: translateY(10px); }
//     to { opacity: 1; transform: translateY(0); }
//   }
//   .animate-fade-in {
//     animation: fade-in 0.3s ease-out;
//   }
// `;