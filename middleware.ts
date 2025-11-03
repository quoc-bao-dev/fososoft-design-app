import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Danh sách từ khóa spam (có thể cập nhật thêm theo log thực tế)
const spammyKeywords = [
  'xổ số', 'vietlott', 'casino', 'thuốc', 'bet', 'seo', 'backlink',
  'hack', 'tăng like', 'gà đá', 'mitom', 'red tiger', 'bwing', 'grabtaxi'
]

export function middleware(request: NextRequest) {
  const rawUrl = decodeURIComponent(request.url.toLowerCase())

  const matchedSpam = spammyKeywords.some(keyword => rawUrl.includes(keyword))

  if (matchedSpam) {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = '/404'
    newUrl.search = ''
    return NextResponse.rewrite(newUrl)
  }

  return NextResponse.next()
}

// ⚠️ Chặn cho toàn bộ route (bao gồm /, /blogs, /products, v.v.)
export const config = {
  matcher: ['/:path*'],
}
