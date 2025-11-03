const FormatTimeDeadline = (targetDate: string): string => {
    const target = new Date(targetDate.split('/').reverse().join('-')); // Chuyển "30/10/2024" thành "2024-10-30"
    const now = new Date();

    // Tính số mili giây chênh lệch
    let diff = target.getTime() - now.getTime();

    // Nếu thời gian đã qua, trả về 00d : 00h : 00m
    if (diff <= 0) return "00d : 00h : 00m";

    // Tính số ngày, giờ, phút
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(diff / (1000 * 60));

    // Định dạng kết quả
    const formatted = `${String(days).padStart(2, '0')}d : ${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m`;

    return formatted;
}

export {
    FormatTimeDeadline
}