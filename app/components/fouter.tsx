import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <h4 className="font-bold mb-3 text-sm md:text-base">Mahsulot</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-400 hover:text-white text-xs md:text-sm">Xususiyatlar</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white text-xs md:text-sm">Narxlar</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white text-xs md:text-sm">Premium</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-sm md:text-base">Resurslar</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-400 hover:text-white text-xs md:text-sm">Hujjatlar</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white text-xs md:text-sm">Darsliklar</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white text-xs md:text-sm">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-sm md:text-base">Kompaniya</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-400 hover:text-white text-xs md:text-sm">Biz haqimizda</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white text-xs md:text-sm">Karera</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white text-xs md:text-sm">Aloqa</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-sm md:text-base">Huquqiy</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-400 hover:text-white text-xs md:text-sm">Maxfiylik</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white text-xs md:text-sm">Shartlar</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white text-xs md:text-sm">Cookie</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-3 md:mb-0">
              <Link href="#" className="text-lg font-bold text-white flex items-center">
                <i className="fas fa-code mr-2"></i>KodPlatform
              </Link>
            </div>
            <div className="text-xs md:text-sm text-slate-400">
              © {new Date().getFullYear()} KodPlatform. Barcha huquqlar himoyalangan.
            </div>
          </div>
        </div>
      </footer>
    )
}