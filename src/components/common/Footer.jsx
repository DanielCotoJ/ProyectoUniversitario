export default function Footer() {
  return (
    <footer className="bg-brand-light text-slate-700 text-sm pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        
        {/* TALK ABOUT YOUR STORE */}
        <div className="space-y-4">
          <h3 className="font-semibold text-brand-dark">Talk about your store</h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            Sea Level Swim features an extensive selection of precision contouring
            and body moulded swimsuits made from regenerated nylon. The result is
            a beautiful line-up of luxurious high quality pieces that feel right
            for the times and designed to last.
          </p>
          <p className="italic text-brand text-lg">– Lorem</p>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="font-semibold text-brand-dark mb-4">Shop</h3>
          <ul className="space-y-2 text-slate-600">
            <li>One Pieces</li>
            <li>Swimwear Tops</li>
            <li>Swim Bottoms</li>
            <li>Tankinis</li>
            <li>Surf Suits & Rash vests</li>
            <li>Sustainable Swim</li>
          </ul>
        </div>

        {/* HELP */}
        <div>
          <h3 className="font-semibold text-brand-dark mb-4">Help</h3>
          <ul className="space-y-2 text-slate-600">
            <li>Search</li>
            <li>About Us</li>
            <li>Contact us</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="space-y-4">
          <h3 className="font-semibold text-brand-dark">Newsletter</h3>
          <p className="text-slate-600">
            Sign up for our newsletter to only receive good things.
          </p>

          <div className="border-b border-slate-400 pb-1">
            <input
              type="email"
              placeholder="Enter email"
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          {/* Social icons */}
          <div className="flex gap-4 text-xl text-slate-700">
            <span className="cursor-pointer hover:text-brand-dark transition">📘</span>
            <span className="cursor-pointer hover:text-brand-dark transition">📷</span>
            <span className="cursor-pointer hover:text-brand-dark transition">🐦</span>
            <span className="cursor-pointer hover:text-brand-dark transition">🎵</span>
          </div>
        </div>
      </div>

      {/* COUNTRY + PAY ICONS */}
      <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        <div className="text-slate-700 text-sm">
          United Kingdom (GBP £)
        </div>

        <div className="flex gap-2 text-2xl opacity-80">
          <span>💳</span>
          <span>💰</span>
          <span>💳</span>
          <span>🏦</span>
          <span>💳</span>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="max-w-7xl mx-auto px-6 mt-8 text-xs text-slate-600">
        © {new Date().getFullYear()} mila. Powered by Shopify
      </div>
    </footer>
  );
}
