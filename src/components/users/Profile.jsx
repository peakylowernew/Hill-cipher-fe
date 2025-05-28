import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../layout/Header";
import { FaBook, FaTimes } from "react-icons/fa";
import { getUid } from "../../utils/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [historyData,setHistoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", avatar: "" });
  const [ error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const uid = getUid();
      if (!uid) {
        console.error("Không tìm thấy UID người dùng.");
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/user/${uid}`);
        if (response.data) {
          // console.log("Thông tin người dùng:", response.data);
          setUser(response.data);
          fetchHistory(uid);
        } else {
          console.error("Không tìm thấy người dùng với UID:", uid);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        if (error.response && error.response.status === 404) {
          setError("Người dùng không tồn tại.");
        } else {
          setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
      }
    };
    
  const fetchHistory = async (uid) => {

    try {
      console.log("uid ",uid);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/history/${uid}`);
      setHistoryData(res.data.history || []);
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử:", error);
      setHistoryData([]);
    }
  };

    fetchUserData();
  }, []);

  const openModal = (item) => {
    setSelectedTool(item);
    setIsModalOpen(true);
  };

  const uploadImageToCloudinary = async (file) => {
    const cloudName = "dct5ysc7b";
    const uploadPreset = "HILLCIPHER";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
      return res.data.secure_url;
    } catch (error) {
      console.error("Upload lỗi:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-300 text-black font-sans pt-24">
      <Header />
      <main className="max-w-5xl mx-auto p-6 space-y-10">
        {/* Thông tin người dùng */}
        <section className="flex items-center gap-6 bg-white p-6 rounded-xl shadow-lg">
          <img
            src={user?.avatar || "/image/avata.png"}
            alt="User avatar"
            className="rounded-full w-28 h-28 object-cover border-4 border-purple-900"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {user?.name?.trim() || (user?.email ? user.email.split('@')[0] : "Đang tải...")}
            </h1>

            <button
                className="mt-3 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                onClick={() => {
                  setFormData({ name: user?.name || "", avatar: user?.avatar || "" });
                  setIsEditing(true);
                }}
              >
                Chỉnh sửa hồ sơ
            </button>
          </div>
        </section>

        {/* Thông tin cá nhân */}
        <section className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FaBook className="text-gray-400" />
              <p className="text-black">Email: {user?.email || "Đang tải..."}</p>
            </div>
          </div>
        </section>

        {/* Lịch sử sử dụng công cụ */}
        <section className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Lịch sử sử dụng công cụ</h2>
          <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
            <table className="w-full text-sm text-left">
              <thead className="sticky top-0 bg-gray-200 text-black">
                <tr className="border-b border-gray-600">
                  <th className="p-3">Công cụ</th>
                  <th className="p-3">Ngày giờ thực hiện</th>
                  <th className="p-3 text-right">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {historyData?.length > 0 ? (
                  historyData.map((item) => (
                    <tr key={item.id || item.timestamp} className="border-b border-gray-200 hover:bg-gray-100 transition-colors">
                       <td className="p-3 capitalize">{item.action}</td>
                       <td className="p-3">
                          {item.timestamp? new Date(item.timestamp._seconds * 1000).toLocaleString() : "N/A"}
                        </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => openModal(item)}
                          className="text-blue-500 underline hover:text-blue-300 transition-colors"
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-5">Không có lịch sử sử dụng.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Modal hiển thị chi tiết lịch sử */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800/20  flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-[90vw] max-w-3xl max-h-[80vh] overflow-y-auto text-gray-800">
              <h3 className="text-xl font-bold mb-4">{selectedTool?.tool}</h3>
              <p><strong>Hành động:</strong> {selectedTool?.action}</p>
              <p><strong>Input:</strong> {selectedTool?.input}</p>
              <p><strong>Output:</strong> {selectedTool?.output}</p>
              <p><strong>Key:</strong> {selectedTool?.key}</p>
              <p><strong>Bước thực hiện:</strong></p>
              <div className="space-y-3 mt-2 text-sm text-gray-700">
                {Array.isArray(selectedTool?.steps) && selectedTool.steps.length > 0 ? (
                  selectedTool.steps.map((stepStr, i) => {
                    if (typeof stepStr === 'string') {
                      // Thử parse để xem có phải là JSON object không
                      try {
                        const parsed = JSON.parse(stepStr);
                        if (typeof parsed === 'object' && parsed.step) {
                          // Là JSON object hợp lệ
                          return (
                            <div key={i} className="border-l-4 border-purple-500 pl-3">
                              <p dangerouslySetInnerHTML={{ __html: `<strong>${parsed.step}</strong>` }} />
                              {parsed.details && (
                                <ul className="list-disc ml-5 mt-1">
                                  {parsed.details.map((detail, j) => (
                                    <li key={j} dangerouslySetInnerHTML={{ __html: detail }} />
                                  ))}
                                </ul>
                              )}
                            </div>
                          );
                        } else {
                          // Là chuỗi thường, hiển thị luôn
                          return <p key={i} dangerouslySetInnerHTML={{ __html: stepStr }} />;
                        }
                      } catch (e) {
                        // Không parse được, hiển thị như chuỗi
                        return <p key={i} dangerouslySetInnerHTML={{ __html: stepStr }} />;
                      }
                    } else if (typeof stepStr === 'object' && stepStr.step) {
                      // Trường hợp dữ liệu là object chứ không phải string
                      return (
                        <div key={i} className="border-l-4 border-purple-500 pl-3">
                          <p dangerouslySetInnerHTML={{ __html: `<strong>${stepStr.step}</strong>` }} />
                          {stepStr.details && (
                            <ul className="list-disc ml-5 mt-1">
                              {stepStr.details.map((detail, j) => (
                                <li key={j} dangerouslySetInnerHTML={{ __html: detail }} />
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    } else {
                      return <p key={i}>Không thể hiển thị bước {i + 1}</p>;
                    }
                  })
                ) : (
                  <p>Không có bước nào.</p>
                )}
              </div>
              <p><strong>Thời gian:</strong> {selectedTool?.timestamp ? new Date(selectedTool.timestamp._seconds * 1000).toLocaleString() : "N/A"}</p>
              <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes /> Đóng
              </button>
            </div>
          </div>
        )}

        {isEditing && (
          <div className="fixed inset-0 bg-gray-800/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-[90vw] max-w-md text-gray-800 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Chỉnh sửa thông tin</h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Tên hiển thị"
                  className="border p-2 rounded w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="border p-2 rounded w-full"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      try {
                        const imageUrl = await uploadImageToCloudinary(file);
                        setFormData((prev) => ({ ...prev, avatar: imageUrl }));
                        setError("Tải ảnh thành công!");
                      } catch (error) {
                        console.error("Upload lỗi:", error);
                        setError("Tải ảnh thất bại.");
                      }
                    }
                  }}
                />
                {formData.avatar && (
                  <img
                    src={formData.avatar}
                    alt="Xem trước avatar"
                    className="w-24 h-24 mt-2 rounded-full object-cover border"
                />
                )}
              </div>
              <div className="flex gap-3 mt-5 justify-end">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={async () => {
                    try {
                      const uid = getUid();
                      await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/user/${uid}`, formData);
                      setError("Cập nhật thành công.");
                      setUser((prev) => ({ ...prev, ...formData }));
                      setIsEditing(false);
                    } catch (err) {
                      console.error(err);
                      setError("Lỗi khi cập nhật.");
                    }
                  }}
                >
                  Lưu thay đổi
                </button>
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  onClick={() => setIsEditing(false)}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      {error && (
        <div className="max-w-5xl mx-auto mt-4 p-4 bg-red-100 text-red-800 rounded shadow">
          <p>{error}</p>
          <button
            onClick={() => setError("")}
            className="mt-2 text-sm text-red-600 underline hover:text-red-800"
          >
            Đóng
          </button>
        </div>
      )}

    </div>
  );
};

export default Profile;
