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
} as const;

export const SUCCESS_MESSAGES = {
    QR_CREATED: "Tạo mã QR thành công",
    CARD_SELECTED: "Đã chọn tài khoản",
} as const;