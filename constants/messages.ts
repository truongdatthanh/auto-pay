export const ERROR_MESSAGES = {
    // Form validation errors
    CARD_REQUIRED: "Vui lòng chọn tài khoản ngân hàng",
    AMOUNT_REQUIRED: "Vui lòng nhập số tiền",
    AMOUNT_TOO_LOW: "Số tiền tối thiểu là {min} VNĐ",
    AMOUNT_TOO_HIGH: "Số tiền vượt quá giới hạn cho phép ({max} tỷ VNĐ)",
    AMOUNT_INVALID: "Số tiền không hợp lệ",

    // System errors
    NAVIGATION_ERROR: "Có lỗi xảy ra khi tạo mã QR. Vui lòng thử lại.",
    NETWORK_ERROR: "Lỗi kết nối mạng. Vui lòng kiểm tra internet.",
    UNKNOWN_ERROR: "Có lỗi không xác định xảy ra. Vui lòng thử lại.",

    REQUIRED_EMAIL: "Email không được để trống",
    INVALID_EMAIL: "Email không hợp lệ",

    REQUIRED_PASSWORD: "Mật khẩu không được để trống",
    SHORT_PASSWORD: ( minLength: number ) => `Mật khẩu phải có ít nhất ${ minLength } ký tự`,
    PASSWORD_MISMATCH: "Mật khẩu không khớp",

    REQUIRED_CONFIRM_PASSWORD: "Mật khẩu xác nhận không được để trống",
    SHORT_CONFIRM_PASSWORD: ( minLength: number ) => `Mật khẩu xác nhận phải có ít nhất ${ minLength } ký tự`,

    REQUIRED_FULLNAME: "Họ tên không được để trống",
    INVALID_FULLNAME: "Họ tên không hợp lệ",

} as const;

export const SUCCESS_MESSAGES = {
    QR_CREATED: "Tạo mã QR thành công",
    CARD_SELECTED: "Đã chọn tài khoản",
} as const;