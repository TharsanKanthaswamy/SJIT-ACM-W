import { useSocials } from "@/hooks/use-data";
import { Github, Twitter, Linkedin, Instagram, ExternalLink } from "lucide-react";

export function Footer() {
  const { data: socials } = useSocials();

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold">ACM-W</h3>
            <p className="text-primary-foreground/70 max-w-xs leading-relaxed">
              Department of Artificial Intelligence and Data Science. Empowering women in computing since 2025.
              St. Joseph's Institute of Technology Student Chapter.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#events" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="#team" className="hover:text-white transition-colors">Our Team</a></li>
              <li><a href="https://stjosephstechnology.ac.in/" target="_blank" rel="noopener" className="hover:text-white transition-colors flex items-center gap-1">College Website <ExternalLink size={14}/></a></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Connect</h4>
            <div className="flex gap-4">
              {socials?.map((social) => (
                <a
                  key={social.id}
                  href={social.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all hover:-translate-y-1"
                >
                  {social.platform === "github" && <Github size={20} />}
                  {social.platform === "twitter" && <Twitter size={20} />}
                  {social.platform === "linkedin" && <Linkedin size={20} />}
                  {social.platform === "instagram" && <Instagram size={20} />}
                </a>
              ))}
              {!socials?.length && (
                <div className="text-sm text-white/50 italic">No social links added yet</div>
              )}
            </div>
            <p className="text-sm text-primary-foreground/50 pt-4">
              © {new Date().getFullYear()} ACM-W Student Chapter. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
