import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Mail, Globe } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-gradient-to-r from-mountain-green to-mountain-blue text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/lovable-uploads/b40aa23c-1098-4177-9174-95e9b19aaa9b.png" alt="Western Ghats X" className="h-10 w-auto" />
              <span className="text-2xl font-bold">Western Ghats X</span>
            </div>
            <p className="text-white/90 mb-6 leading-relaxed">
              Creating awareness about the mountain, its water streams, and nature to the locals. 
              Together, we're working to restore the natural flow of streams in the Kattanji Hills 
              through environmental conservation and community engagement.
            </p>
          </div>

          {/* Events & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Events</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <Link to="/sbl" className="text-white/80 hover:text-white transition-colors">
                  Saravanampatti Blasters League
                </Link>
              </li>
              <li>
                <Link to="/kattanji-marathon" className="text-white/80 hover:text-white transition-colors">
                  Kattanji Hills Marathon
                </Link>
              </li>
            </ul>
            <div className="space-y-2">
              <p className="text-sm text-white/80 cursor-pointer hover:text-white transition-colors" onClick={() => window.open('https://www.westernghatsx.in', '_blank')}>
                <Globe className="w-4 h-4 inline mr-2" />
                www.westernghatsx.in
              </p>
              <p className="text-sm text-white/80 cursor-pointer hover:text-white transition-colors" onClick={() => window.open('mailto:info@westernghatsx.in', '_blank')}>
                <Mail className="w-4 h-4 inline mr-2" />
                info@westernghatsx.in
              </p>
            </div>
          </div>

          {/* Support & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <Link to="/privacy-policy" className="text-white/80 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-white/80 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-white/80 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/contact-support" className="text-white/80 hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
            <div className="flex gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20 p-2"
                onClick={() => window.open('https://facebook.com/westernghatsx', '_blank')}
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20 p-2"
                onClick={() => window.open('https://instagram.com/westernghatsx', '_blank')}
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20 p-2"
                onClick={() => window.open('https://twitter.com/westernghatsx', '_blank')}
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20 p-2"
                onClick={() => window.open('mailto:info@westernghatsx.in', '_blank')}
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <hr className="border-white/20 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-white/80">
            © {currentYear} Western Ghats X. All rights reserved.
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;