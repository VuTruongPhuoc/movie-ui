export const slugHandler = (text) => {
    return text
        .toLowerCase() // Chuyển thành chữ thường
        .trim() // Xóa khoảng trắng ở đầu và cuối
        .replace(/([áàảãạâấầẩẫậăắằẳẵặ])/g, 'a')
        .replace(/([éèẻẽẹêếềểễệ])/g, 'e')
        .replace(/([íìỉĩị])/g, 'i')
        .replace(/([óòỏõọôốồổỗộơớờởỡợ])/g, 'o')
        .replace(/([úùủũụưứừửữự])/g, 'u')
        .replace(/([ýỳỷỹỵ])/g, 'y')
        .replace(/đ/g, 'd') // Thay thế "đ" bằng "d"
        .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch nối
        .replace(/-+/g, '-') // Thay thế nhiều dấu gạch nối liên tiếp bằng một
        .replace(/[^a-z0-9\-]/g, '') // Xóa ký tự không hợp lệ
        .replace(/^-+|-+$/g, ''); // Xóa dấu gạch nối ở đầu và cuối
};
