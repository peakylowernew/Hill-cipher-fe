import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../layout/Header";
import { FaBook, FaPhone, FaTimes } from "react-icons/fa";
import { getUid } from "../../utils/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [historyData,setHistoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

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
          alert("Người dùng không tồn tại.");
        } else {
          alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-300 text-black font-sans pt-24">
      <Header />
      <main className="max-w-5xl mx-auto p-6 space-y-10">
        {/* Thông tin người dùng */}
        <section className="flex items-center gap-6 bg-white p-6 rounded-xl shadow-lg">
          <img
            src={user?.avatar || "/image/avata2.jpg"}
            alt="User avatar"
            className="rounded-full w-28 h-28 object-cover border-4 border-purple-900"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {/* {user?.name || "Đang tải..."} */}
              {user?.email ? user.email.split('@')[0] : "Đang tải..."}
              </h1>
            <button className="mt-3 px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300">
              Edit Profile
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
            <div className="flex items-center gap-3">
              <FaPhone className="text-gray-400" />
              <p className="text-black">Phone: {user?.phone || "Chưa cập nhật"}</p>
            </div>
          </div>
        </section>

        {/* Lịch sử sử dụng công cụ */}
        <section className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Tool usage history</h2>
          <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
            <table className="w-full text-sm text-left">
              <thead className="sticky top-0 bg-gray-800/0 text-black">
                <tr className="border-b border-gray-600">
                  <th className="p-3">Tools</th>
                  <th className="p-3">Day</th>
                  <th className="p-3 text-right">detail</th>
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
          <div className="fixed inset-0 bg-gray-800/50 z-50 flex justify-center items-center">
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

      </main>
    </div>
  );
};

export default Profile;
