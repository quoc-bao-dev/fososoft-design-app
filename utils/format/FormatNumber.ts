type CountryCode = 'VN' | 'US' | 'JP' | 'KR' | 'default';

const formatNumber = (num: number): string => {
    // Làm tròn số và chuyển thành chuỗi
    let roundedNumber = Math.round(num).toString();

    // Sử dụng regex để thêm dấu phân cách hàng nghìn
    roundedNumber = roundedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return roundedNumber;
};

const formatNumberNoRounding = (num: number): string => {
    // Làm tròn số và chuyển thành chuỗi
    // Sử dụng regex để thêm dấu phân cách hàng nghìn
    const roundedNumber = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return roundedNumber;
};

//  format số đến hàng ngàn (vdu: 300k)
const FormatNumberToThousands = (number: number): string => {
    if (number >= 1000) {
        return (number / 1000)?.toFixed(0)?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k";
    } else {
        // return number?.toString();
        return (number / 1000)?.toFixed(0)?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k";
    }
};

// format đến hàng ngàn có số lẻ
const FormatNumberToThousandsDecimal = (number: number): string => {
    if (number >= 1000) {
        // Chia cho 1000 và lấy 1 chữ số thập phân
        return (number / 1000)?.toFixed(1) + "k";
    } else {
        // Trả về số nguyên nếu nhỏ hơn 1000
        return number?.toString();
    }
};

const FormatNumberToThousandsComman = (number: number): string => {
    if (number >= 1000) {
        return (number / 1000)?.toFixed(0)?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return number?.toString();
    }
};

const FormatOnlyNumberToThousands = (number: number): string => {
    if (number >= 1000) {
        return (number / 1000)?.toFixed(0);
    } else {
        return number?.toString();
    }
};

// format 3 số là có dấu ","
const FormatNumberComma = (number: number): string => {
    // Lấy phần nguyên của số
    const integerPart = Math?.floor(number);

    // Chuyển đổi thành chuỗi và thêm dấu phẩy ngăn cách hàng nghìn
    return integerPart?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
// format 3 số là có dấu ",," và thêm + hoặc - phía trước
const FormatNumberCommaAndPlusOrMinus = (number: number) => {
    const absNumber = Math?.abs(number);

    const formattedNumber = new Intl.NumberFormat("de-DE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })
        .format(absNumber)
        .replace(/\./g, ",");

    if (number < 0) {
        return `- ${formattedNumber}`;
    } else if (number > 0) {
        return `+ ${formattedNumber}`;
    }
    return formattedNumber;
};

// format 3 số không thập phân thì chứa dấu "," nếu là số thập phân thì "."
const FormatNumberCommanAnDot = (value: number): string => {
    return value?.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// format 3 số là có dấu "."
const FormatNumberDot = (number: number): string => {
    return Math?.round(number)
        ?.toString()
        ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// format 3 số là có dấu "." và thêm + hoặc - phía trước
const FormatNumberDotAndPlusOrMinus = (number: number) => {
    const absNumber = Math?.abs(number);
    const formattedNumber = new Intl.NumberFormat("de-DE")?.format(absNumber);
    if (number < 0) {
        return `- ${formattedNumber}`;
    } else if (number > 0) {
        return `+ ${formattedNumber}`;
    }
    return formattedNumber;
};

// format 3 số là có dấu " "
const FormatNumberSpace = (number: number): string => {
    return Math?.round(number)
        ?.toString()
        ?.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

// format đã có làm tròn (3 số -> .)
// const FormatNumberToCommanDecimal = (number: number, decimalPlaces: number): string => {
//     const roundedNumber = number?.toFixed(decimalPlaces); // Làm tròn đến số chữ số thập phân
//     const [integerPart, decimalPart] = roundedNumber?.split('.'); // Tách phần nguyên và phần thập phân
//     const formattedIntegerPart = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Định dạng phần nguyên với dấu phẩy
//     return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
// };

const FormatNumberToCommanDecimal = (number: number, decimalPlaces: number): string => {
    const roundedNumber = number?.toFixed(decimalPlaces); // Làm tròn đến số chữ số thập phân
    const [integerPart, decimalPart] = roundedNumber?.split('.'); // Tách phần nguyên và phần thập phân
    const formattedIntegerPart = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Định dạng phần nguyên với dấu phẩy

    // Kiểm tra nếu phần thập phân tồn tại và khác 0 thì mới show ra
    return decimalPart && parseInt(decimalPart) !== 0
        ? `${formattedIntegerPart}.${decimalPart}`
        : formattedIntegerPart;
};

// format số sao yêu thích
const FormatPointStar = (number: number, decimalPlaces: number): string => {
    const stringNumber = number.toString();
    const decimalIndex = stringNumber.indexOf(".");

    if (decimalIndex !== -1 && stringNumber.length - decimalIndex - 1 > decimalPlaces) {
        return stringNumber.slice(0, decimalIndex + decimalPlaces + 1);
    } else {
        return stringNumber;
    }
};

// format đến giới hạn
const FormatMaxNumber = (number: number, max_number: number): string => {
    if (number >= max_number) {
        return `${max_number}`;
    } else {
        return number?.toString();
    }
};

// format số vượt quá max là "+"
const FormatNumberHundred = (number: number, max_number: number): string => {
    if (number >= max_number) {
        return `${max_number} +`;
    } else {
        return number?.toString();
    }
};

// format số điện thoại
// const FormatPhoneNumber = (number: number | string, decimalPlaces?: number): string => {
//     // Chuyển đổi số điện thoại thành chuỗi và loại bỏ tất cả các ký tự không phải là số
//     const numberString = number?.toString()?.replace(/\D/g, "");

//     // Kiểm tra số điện thoại 8 số
//     if (numberString?.length === 8) {
//         // Định dạng cho số điện thoại 8 số (4-4)
//         return numberString.replace(/(\d{4})(\d{4})/, "$1 $2");
//     }

//     // Kiểm tra số điện thoại 10 số
//     if (numberString?.length === 10) {
//         // Định dạng cho số điện thoại 10 số (4-3-3)
//         return numberString.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
//     }

//     // Kiểm tra số điện thoại 11 số (vd: 1 555 505 5050)
//     if (numberString?.length >= 11) {
//         return numberString.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "+$1 $2 $3 $4")
//     }

//     // Trả về số điện thoại gốc nếu không phải 8 hoặc 10 số
//     return numberString;
// };

const FormatPhoneNumber = (number: number | string, countryCode: CountryCode = 'default'): string => {
    // Chuyển đổi số điện thoại thành chuỗi và loại bỏ tất cả các ký tự không phải là số
    const numberString = number?.toString()?.replace(/\D/g, "");

    if (!numberString) return '';

    switch (countryCode) {
        case 'VN':
            if (numberString.length === 9) {
                return numberString.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
            } else if (numberString.length === 10) {
                return numberString.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
            } else if (numberString.length >= 11) {
                return numberString.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3");
            }
            break;
        case 'US':
            if (numberString.length === 10) {
                return numberString.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
            } else if (numberString.length === 11) {
                return numberString.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "+$1 ($2) $3-$4");
            }
            break;
        case 'JP':
            if (numberString.length === 10) {
                return numberString.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
            } else if (numberString.length === 11) {
                return numberString.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
            }
            break;
        case 'KR':
            if (numberString.length === 10) {
                return numberString.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
            } else if (numberString.length === 11) {
                return numberString.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
            }
            break;
        default:
            if (numberString.length === 8) {
                return numberString.replace(/(\d{4})(\d{4})/, "$1 $2");
            } else if (numberString.length === 10) {
                return numberString.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
            } else if (numberString.length >= 11) {
                return numberString.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "+$1 $2 $3 $4");
            }
    }

    // Trả về số điện thoại gốc nếu không phù hợp với bất kỳ định dạng nào
    return numberString;
};

const FormatPhoneNumberCountry = (number: number | string, countryCode: CountryCode = 'default'): string => {
    // Chuyển đổi số điện thoại thành chuỗi và loại bỏ tất cả các ký tự không phải là số
    let numberString = number?.toString()?.replace(/\D/g, "");

    if (!numberString) return '';

    // Xóa số 0 đầu tiên nếu có
    numberString = numberString.replace(/^0/, '');

    switch (countryCode) {
        case 'VN': {
            // Định dạng số điện thoại Việt Nam: (+84) xxx xxx xxx hoặc (+84) xxxx xxx xxx
            if (numberString.length === 9) {
                return `(+84) ${numberString.slice(0, 3)} ${numberString.slice(3, 6)} ${numberString.slice(6)}`;
            } else if (numberString.length === 10) {
                return `(+84) ${numberString.slice(0, 4)} ${numberString.slice(4, 7)} ${numberString.slice(7)}`;
            }
            break;
        }
        case 'US': {
            // Định dạng số điện thoại Mỹ: +1 (xxx) xxx-xxxx
            if (numberString.length === 10) {
                return `+1 (${numberString.slice(0, 3)}) ${numberString.slice(3, 6)}-${numberString.slice(6)}`;
            } else if (numberString.length === 11) {
                return `+1 (${numberString.slice(1, 4)}) ${numberString.slice(4, 7)}-${numberString.slice(7)}`;
            }
            break;
        }
        case 'JP': {
            // Định dạng số điện thoại Nhật Bản: +81 xx-xxxx-xxxx hoặc +81 xxx-xxxx-xxxx
            if (numberString.length === 10) {
                return `+81 ${numberString.slice(0, 2)}-${numberString.slice(2, 6)}-${numberString.slice(6)}`;
            } else if (numberString.length === 11) {
                return `+81 ${numberString.slice(0, 3)}-${numberString.slice(3, 7)}-${numberString.slice(7)}`;
            }
            break;
        }
        case 'KR': {
            // Định dạng số điện thoại Hàn Quốc: +82 xx-xxxx-xxxx hoặc +82 xxx-xxxx-xxxx
            if (numberString.length === 10) {
                return `+82 ${numberString.slice(0, 2)}-${numberString.slice(2, 6)}-${numberString.slice(6)}`;
            } else if (numberString.length === 11) {
                return `+82 ${numberString.slice(0, 3)}-${numberString.slice(3, 7)}-${numberString.slice(7)}`;
            }
            break;
        }
        default: {
            // Định dạng mặc định: xxxx xxxx, xxxx xxx xxx, hoặc +x xxx xxx xxxx
            if (numberString.length === 8) {
                return `${numberString.slice(0, 4)} ${numberString.slice(4)}`;
            } else if (numberString.length === 10) {
                return `${numberString.slice(0, 4)} ${numberString.slice(4, 7)} ${numberString.slice(7)}`;
            } else if (numberString.length >= 11) {
                return `+${numberString.slice(0, 1)} ${numberString.slice(1, 4)} ${numberString.slice(4, 7)} ${numberString.slice(7)}`;
            }
        }
    }

    // Trả về số điện thoại gốc nếu không phù hợp với bất kỳ định dạng nào
    return numberString;
};

// formart trang my trip
const FormatCurrency = (amount: any) => {
    // Chuyển số tiền sang chuỗi
    var amountString = amount.toString();

    // Chèn dấu phẩy sau mỗi 3 chữ số từ phải qua trái, trừ chữ số đầu tiên nếu số tiền có hơn 3 chữ số
    for (var i = amountString.length - 3; i > 0; i -= 3) {
        amountString = amountString.slice(0, i) + " " + amountString.slice(i);
    }

    // Thêm ký hiệu tiền tệ 'đ' vào cuối chuỗi
    amountString += "đ";

    return amountString;
};

// format số km & số m
const FormatDistance = (distance: number) => {
    if (distance >= 1000) {
        // Nếu lớn hơn hoặc bằng 1000, chuyển đổi thành km
        return (distance / 1000).toFixed(1) + "km";
    } else {
        // Nếu bé hơn 1000, giữ nguyên là m
        return Math.round(distance) + "m";
    }
};

// format full km
const FormatDistanceFullKm = (distance: number) => {
    if (distance >= 1000) {
        // Nếu lớn hơn hoặc bằng 1000, chuyển đổi thành km và giữ 1 chữ số thập phân
        return (distance / 1000).toFixed(1) + "km";
    } else {
        // Nếu bé hơn 1000, chuyển đổi thành km và giữ 3 chữ số thập phân
        return (distance / 1000).toFixed(3) + "km";
    }
};

// format bỏ dấu "," trong chuỗi string
const FormatOriginalString = (value: string) => {
    return value?.replace(/[.,]/g, "");
};

// format %
const FormatPercentage = (value: number): string => {
    // Nếu giá trị lớn hơn 100 thì đặt giá trị bằng 100
    if (value > 100) {
        value = 100;
    }

    // Định dạng giá trị với tối đa hai chữ số thập phân
    const formattedValue = value.toFixed(2);

    // Loại bỏ chữ số 0 ở cuối nếu không cần thiết
    return `${parseFloat(formattedValue)}%`;
};
const FormatPercentageNoLimit = (value: number): string => {
    // Định dạng giá trị với tối đa hai chữ số thập phân
    const formattedValue = value?.toFixed(2);

    // Loại bỏ chữ số 0 ở cuối nếu không cần thiết
    return `${parseFloat(formattedValue)}%`;
};

const FormatLovelaceToAda = (lovelace: number) => lovelace / 1_000_000;

const FormatPhoneNumberToLimit = (phoneNumber: string) => {
    // Kiểm tra xem số điện thoại có hợp lệ hay không
    if (!phoneNumber || phoneNumber.length < 7) {
        return phoneNumber; // Trả về giá trị ban đầu nếu không hợp lệ
    }
    // Lấy 4 ký tự đầu tiên và thêm dấu *
    const formatted: any = phoneNumber.slice(0, 4) + '****' as any
    return formatted;
}

export {
    formatNumber,
    formatNumberNoRounding,
    FormatNumberToThousands,
    FormatOnlyNumberToThousands,
    FormatNumberToThousandsComman,
    FormatOriginalString,
    FormatNumberDot,
    FormatNumberDotAndPlusOrMinus,
    FormatNumberToCommanDecimal,
    FormatPointStar,
    FormatNumberHundred,
    FormatPhoneNumber,
    FormatCurrency,
    FormatDistance,
    FormatDistanceFullKm,
    FormatNumberComma,
    FormatNumberCommaAndPlusOrMinus,
    FormatNumberSpace,
    FormatPercentage,
    FormatPercentageNoLimit,
    FormatMaxNumber,
    FormatNumberCommanAnDot,
    FormatNumberToThousandsDecimal,
    FormatLovelaceToAda,
    FormatPhoneNumberToLimit,
    FormatPhoneNumberCountry
};
