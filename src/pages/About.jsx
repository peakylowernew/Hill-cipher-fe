import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Abouts = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blackgray">
      <Header />

      {/* Nội dung chính */}
      <main className="flex-grow">
        <section className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="pt-8 text-3xl font-bold text-gray-900 mb-6 text-center">Về Chúng Tôi</h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            <strong>3AE</strong> là một nhóm sinh viên với niềm đam mê mã hóa và bảo mật thông tin. Website này được chúng tôi phát triển nhằm hiện thực hóa nguyện vọng xây dựng một công cụ trực quan, dễ sử dụng để <strong>mã hóa và giải mã theo thuật toán Hill Cipher</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            Với mong muốn hỗ trợ người dùng tiếp cận kiến thức mật mã một cách trực quan, nhóm đã xây dựng nên hệ thống có khả năng minh họa, hướng dẫn và thực hành trực tiếp trên trình duyệt. Dù là sinh viên, giảng viên, hay bất kỳ ai yêu thích lĩnh vực an toàn thông tin – website này đều có thể là một công cụ hữu ích.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            Chúng tôi tin rằng việc học mật mã không chỉ là lý thuyết khô khan, mà cần có sự trải nghiệm thực tế. Đó cũng chính là lý do mà 3AE không ngừng cải tiến website, mang đến trải nghiệm học tập thú vị và hiệu quả hơn mỗi ngày.
          </p>
        </section>
      </main>

      {/* Footer luôn nằm dưới */}
      <Footer />
    </div>
  );
};

export default Abouts;
