// const AWS = require('aws-sdk');
// const base64ToImage = require('base64-to-image');
// const fs = require('fs');

// // Cấu hình AWS S3
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// // Hàm để chuyển đổi chuỗi base64 thành hình ảnh và tải lên S3
// const uploadBase64ImageToS3 = async (base64Data) => {
//   // Chuyển đổi base64 thành hình ảnh và lưu vào thư mục tạm thời
//   const { filePath } = base64ToImage(base64Data, './temp', { fileName: 'avatar' });

//   // Đọc dữ liệu hình ảnh đã chuyển đổi
//   const fileData = fs.readFileSync(filePath);

//   // Tạo đối tượng Promise để lưu trữ dữ liệu trong S3
//   return new Promise((resolve, reject) => {
//     // Cấu hình các thông số cho yêu cầu putObject
//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: 'avatar.png', // Tên file bạn muốn lưu trữ trên S3
//       Body: fileData,
//       ContentType: 'image/png', // ContentType của hình ảnh
//     };

//     // Gửi yêu cầu putObject đến S3
//     s3.putObject(params, (err, data) => {
//       if (err) {
//         // Nếu có lỗi, reject với lỗi
//         reject(err);
//       } else {
//         // Nếu thành công, resolve với URL của hình ảnh đã lưu
//         const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;
//         resolve(imageUrl);
//       }
//     });
//   });
// };

// module.exports = uploadBase64ImageToS3;


