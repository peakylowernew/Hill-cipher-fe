import React, { useState } from "react";
import Header from "../../layout/Header";
const avatar = "/image/avata2.jpg";

const Profile = () => {
  const year = 2025;

  // Danh sách các tháng và ngày trong tuần
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // State để quản lý trạng thái Public/Private
  const [isPublic, setIsPublic] = useState(true);

  // Hàm lấy số ngày trong tháng
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Tạo dữ liệu contributions theo từng tháng
  const contributionsByMonth = Array.from({ length: 12 }, (_, month) => {
    const daysInMonth = getDaysInMonth(month, year);
    return Array.from({ length: daysInMonth }, () => Math.floor(Math.random() * 5));
  });

  // Hàm chuyển đổi giữa Public và Private
  const toggleVisibility = () => {
    setIsPublic((prevState) => !prevState);
  };

  return (
    <div className="pt-16 flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-sans">
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center space-x-4">
          <img
            src={avatar}
            alt="Pixelated purple character"
            className="rounded-full w-24 h-24"
            width="100"
            height="100"
          />
          <div>
            <h1 className="text-2xl font-bold">Nguyễn Văn</h1>
            <button className="mt-2 px-4 py-2 bg-gray-800 text-red-400 rounded hover:bg-gray-700 hover:border hover:border-red-400">
              Edit profile
            </button>
          </div>
        </div>

        {/* Pinned section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Pinned</h2>
          <div className="mt-2 p-4 bg-gray-800 rounded">
            <div className="flex items-center space-x-2">
              <i className="fas fa-book text-gray-400"></i>
              <button className="text-blue-400">Đồ án tốt nghiệp Hillcipher</button>
              <span
                onClick={toggleVisibility} // Hàm xử lý click
                className={`bg-gray-700 text-gray-400 text-xs px-2 py-1 rounded cursor-pointer ${
                  isPublic ? "bg-grayay-500" : "bg-gray-500"
                }`}
              >
                {isPublic ? "Public" : "Private"}
              </span>
            </div>
          </div>
        </div>

        {/* Contributions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Contribution activity in {year}</h2>
          <div className="mt-2 p-4 bg-gray-900 rounded">
            <div className="flex">
              {/* Nhãn ngày trong tuần */}
              <div className="flex flex-col justify-start text-sm text-gray-400 mr-2 mt-[21px]">
                {days.map((day, index) => (
                  <span key={index} className="h-5 flex items-center">{day}</span>
                ))}
              </div>

              {/* Lưới theo tháng */}
              <div className="flex overflow-x-auto space-x-4">
                {contributionsByMonth.map((monthData, monthIndex) => (
                  <div key={monthIndex} className="flex flex-col">
                    <span className="text-sm text-gray-400 text-center mb-1">{months[monthIndex]}</span>
                    <div className="grid grid-rows-7 grid-flow-col gap-1">
                      {monthData.map((value, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`w-4 h-4 rounded-sm ${
                            value === 0 ? "bg-gray-700" :
                            value === 1 ? "bg-green-200" :
                            value === 2 ? "bg-green-400" :
                            value === 3 ? "bg-green-600" :
                            "bg-green-800"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chú thích */}
            <div className="mt-4 flex justify-between items-center text-gray-400">
              <button className="text-blue-400">Learn how we count contributions</button>

              <div className="flex items-center space-x-2">
                <span>Less</span>
                <div className="w-4 h-4 bg-gray-700 rounded-sm"></div>
                <div className="w-4 h-4 bg-green-200 rounded-sm"></div>
                <div className="w-4 h-4 bg-green-400 rounded-sm"></div>
                <div className="w-4 h-4 bg-green-600 rounded-sm"></div>
                <div className="w-4 h-4 bg-green-800 rounded-sm"></div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contribution activity heading */}
        <div className="mt-8">
        </div>
      </div>

      {/* Buttons */}
      <div className="fixed top-4 right-4">
        <button className="text-blue-400">Customize your pins</button>
      </div>
      <div className="fixed top-4 right-20 flex flex-col items-end space-y-2">
        <button className="px-4 py-2 bg-blue-600 rounded text-white font-semibold">2025</button>
      </div>
    </div>
  );
};

export default Profile;
