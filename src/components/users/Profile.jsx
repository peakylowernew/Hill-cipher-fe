import Header from "../../layout/Header";
const avatar = "/image/avata2.jpg";

const Profile = () => {
  return (
    <div className="pt-16 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <Header />
      
      <div className="bg-white shadow-lg p-10 rounded-2xl max-w-lg w-full transform transition-all hover:shadow-2xl hover:scale-105">
        <div className="flex flex-col items-center space-y-8">
          {/* Avatar with border and modern effect */}
          <div className="relative">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md transition-all duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 opacity-40"></div>
          </div>

          {/* Title with bold and stylish font */}
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight hover:text-indigo-600 transition duration-300">
            Nguyễn Văn HoMe
          </h2>

          {/* User information section */}
          <div className="text-center space-y-4">
            <p className="text-gray-800 text-lg flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v6m0 0l3-3m-3 3l-3-3m9 13a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="font-semibold">Ngày sinh:</span> 01/01/1990
            </p>
            <p className="text-gray-800 text-lg flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4v16h14V4H5z"/>
              </svg>
              <span className="font-semibold">Số điện thoại:</span> 0123 456 789
            </p>
            <p className="text-gray-800 text-lg flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 10l4 4-4 4M14 6l4 4-4 4"/>
              </svg>
              <span className="font-semibold">Đến từ:</span> Hồ Chí Minh
            </p>
          </div>

          {/* Edit profile button with hover effects */}
          <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-300 transform hover:scale-105">
            Chỉnh sửa hồ sơ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
