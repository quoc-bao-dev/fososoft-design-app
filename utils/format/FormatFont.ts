export const ReplaceInDescription = (description: string | any, font: any) => {
    return description?.replaceAll("SVN-Cera", font);
};

export const MaskString = (input: string, visibleCount: number = 6): string => {
    if (input?.length <= visibleCount) {
        return input;
    }

    const visiblePart = input?.slice(0, visibleCount);
    const maskedPart = "*"?.repeat(input?.length - visibleCount);

    return `${visiblePart}${maskedPart}`;
};

// export const ReplaceInDescription = (description: string | undefined): string | undefined => {
//     return description?.replaceAll("SVN-Cera", "'__cera_init_40b992', '__cera_init_Fallback_40b992'");
// }

/**
 * Xóa tất cả style="font-weight: 400;" khỏi chuỗi HTML
 */
export function removeFontWeight400(html: string): string {
  if (!html) return html;
  // Xóa style="font-weight: 400;"
  return html.replace(/style\s*=\s*["']?font-weight:\s*400;?["']?/gi, "");
}
