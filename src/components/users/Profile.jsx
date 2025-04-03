/*
import Header from "../../layout/Header";

const Profile = () => {
    return (
      <div className="pt-16">
        <Header />
        <h2>Chào mừng bạn đến trang Profile</h2>
        <p>Đây là trang thông tin cá nhân của bạn.</p>
      </div>
    );
  };
  
  export default Profile;
  */
  import Header from  "../../layout/Header"
  import image from "../../../public/image/avata2.jpg"
  import backgroundProfile from "../../../public/image/backgroundProfile/nen-profile.jpg" // Hình ảnh làm nền trang
const Profile = () => {
  return (
    <div
      className="pt-16 flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundProfile})` }} // Áp dụng hình ảnh nền
    >
      <Header />
      
      <div className="bg-white bg-opacity-80 shadow-lg p-8 rounded-lg flex items-center space-x-6"> {/* Sử dụng bg-opacity để làm mờ nền */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6"><strong>Thông Tin Của Bạn</strong></h2>
        
        {/* Avatar */}
        <img 
          src={image} // Sử dụng hình ảnh avatar
          alt="User Avatar" 
          className="w-40 h-40 rounded-full border-4 border-gray-300"
        />

        {/* Thông tin cá nhân */}
        <div className="text-left">
          <h2 className="text-2xl font-bold text-gray-800"><strong>Nguyễn Văn HoMe</strong></h2>
          <p className="text-gray-600"><strong>Ngày sinh:</strong> 01/01/1990</p>
          <p className="text-gray-600"><strong>Số điện thoại:</strong> 0123 456 789</p>
          <p className="text-gray-600"><strong>Đến từ đâu:</strong> Hồ Chí Minh</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
