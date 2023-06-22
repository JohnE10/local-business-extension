
                import Image from 'next/image';
                import Script from 'next/script';
                import Link from 'next/link';
                // import LiteYouTubeEmbed from "react-lite-youtube-embed";
                // import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
                // import '@/jQueryLoader.js';
                // import Sidebar from '@/components/Sidebar';
                // import Footer from '@/components/Footer';
                // import BackToTopButton from '@/components/BackToTopButton';
                // import Header from '@/components/Header';
                
                

                const index = () => {
                    return (
                        <>
                            
  <div id="cf-wrapper">
    <div className="cf-alert cf-alert-error cf-cookie-error" id="cookie-alert" data-translate="enable_cookies">Please enable cookies.</div>
    <div id="cf-error-details" className="cf-error-details-wrapper">
      <div className="cf-wrapper cf-header cf-error-overview">
        <h1 data-translate="block_headline">Email Protection</h1>
        <h2 className="cf-subheadline"><span data-translate="unable_to_access">You are unable to access this email address</span> uptownsmiles.com</h2>
      </div>

      <div className="cf-section cf-wrapper">
        <div className="cf-columns two">
          <div className="cf-column">
            <p>The website from which you got to this page is protected by Cloudflare. Email addresses on that page have been hidden in order to keep them from being accessed by malicious bots. <strong>You must enable Javascript in your browser in order to decode the e-mail address</strong>.</p>
            <p>If you have a website and are interested in protecting it in a similar way, you can <Link rel="noopener noreferrer" href="https://www.cloudflare.com/sign-up?utm_source=email_protection">sign up for Cloudflare</Link>.</p>
          </div>

          <div className="cf-column">
            <div className="grid_4">
              <div className="rail">
                  <div className="panel">
                      <ul className="nobullets">
                        <li><Link rel="noopener noreferrer" className="modal-link-faq" href="https://support.cloudflare.com/hc/en-us/articles/200170016-What-is-Email-Address-Obfuscation-">How does Cloudflare protect email addresses on website from spammers?</Link></li>
                        <li><Link rel="noopener noreferrer" className="modal-link-faq" href="https://support.cloudflare.com/hc/en-us/categories/200275218-Getting-Started">Can I sign up for Cloudflare?</Link></li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cf-error-footer cf-wrapper w-240 lg:w-full py-10 sm:py-4 sm:px-8 mx-auto text-center sm:text-left border-solid border-0 border-t border-gray-300">
  <p className="text-13">
    <span className="cf-footer-item sm:block sm:mb-1">Cloudflare Ray ID: <strong className="font-semibold">7d44e62c4a022fbb</strong></span>
    <span className="cf-footer-separator sm:hidden">•</span>
    <span id="cf-footer-item-ip" className="cf-footer-item hidden sm:block sm:mb-1">
      Your IP:
      <button type="button" id="cf-footer-ip-reveal" className="cf-footer-ip-reveal-btn">Click to reveal</button>
      <span className="hidden" id="cf-footer-ip">196.120.38.170</span>
      <span className="cf-footer-separator sm:hidden">•</span>
    </span>
    <span className="cf-footer-item sm:block sm:mb-1"><span>Performance &amp; security by</span> <Link rel="noopener noreferrer" href="https://www.cloudflare.com/5xx-error-landing" id="brand_link" target="_blank">Cloudflare</Link></span>
    
  </p>
  
</div>


    </div>
  </div>

  






                        </>
                    )    
                }
                export default index;
            