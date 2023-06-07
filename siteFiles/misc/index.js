
import Image from 'next/image';
import Link from 'next/link';
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import '../jQueryLoader.js';
import Carousel from '@/components/Carousel.js';
import { CarouselData } from '@/components/CarouselData.js';
import Svg12 from '../components/Svg12';
import Navbar from '@/components/Navbar';
import Untitled32 from '../public/wp-content/uploads/2022/06/Untitled-3-2.jpg';
import horiz120001200 from '/public//wp-content/uploads/2022/06/horiz-1-2000x1200.png';


const index = () => {


	return (
		<>



			<div id="page" className="site">
				<Link className="skip-link screen-reader-text" href="#content">Skip to content</Link>

				<header id="masthead" className="site-header">

					<div className="custom-header">
						<div className="custom-header-media">
							<div id="wp-custom-header" className="wp-custom-header">
								{/* 
                        <Image
                        src={Untitled32}
                        alt="Untitled32"
                        qualtiy={20}
                        priority="false"
                        sizes="100vw"
                         />
                     */}
								
                        <Image
                        src={Untitled32}
                        alt="Untitled32"
                        qualtiy={20}
                        priority="false"
                        sizes="100vw"
                         />
                    
							 </div>
						</div>

						<div className="site-branding">
							<div className="wrap">
								<Link href="/" className="custom-logo-link" rel="home" aria-current="page">
									
                        <Image
                        src={croppedUntitled13}
                        alt="croppedUntitled13"
                        qualtiy={20}
                        priority="false"
                        sizes="100vw"
                         />
                    
								</Link>
								<div className="site-branding-text">
									<h1 className="site-title"><Link href="/" rel="home">Mid-City Smiles Family Dentistry</Link></h1>
									<p className="site-description"></p>
								</div>
							</div>
						</div>
					</div>

					<div className="navigation-top">
						<div className="wrap">
							<Navbar />
						</div>
					</div>

				</header>

				<div className="site-content-contain">
					<div id="content" className="site-content">

						<div id="primary" className="content-area">
							<main id="main" className="site-main">

								{/* <div className="panel-image" style={{ backgroundImage: 'url(/wp-content/uploads/2022/06/horiz-1-2000x1200.png)' }}> */}
								<div className="panel-image">
								
                        <Image
                        src={horiz120001200}
                        alt="horiz120001200"
                        qualtiy={20}
                        priority="false"
                        sizes="100vw"
                         />
                    
									<div className="panel-image-prop" style={{ paddingTop: '60%' }}>

									</div>
								</div>

								<article id="post-12" className="twentyseventeen-panel  post-12 page type-page status-publish has-post-thumbnail hentry">

									{/* <div className="panel-image" style={{ backgroundImage: 'url(/wp-content/uploads/2022/06/horiz-1-2000x1200.png)' }}>
										<div className="panel-image-prop" style={{ paddingTop: '60%' }}>

										</div>
									</div> */}

									<div className="panel-content">
										<div className="wrap">
											<header className="entry-header">
												<h2 className="entry-title">WELCOME</h2>

											</header>

											<div className="entry-content">

												<p>Your smile is one of the first things people notice.&nbsp; Dr. Mark D. Anderson, Dr. Perla Hernandez, Dr. Delmy Urbina, and Dr. Caylin Frye, along with their caring team, use the most advanced technology and techniques to create and restore beautiful and healthy smiles.  We are a dental practice located in the heart of New Orleans. We specialize in family dentistry and provide complete dental care for all ages, including orthodontic care, placement of dental implants, and cosmetic procedures.  Being located in Mid-City, we are convenient to all areas of town.&nbsp; Come visit our state-of-the-art office!</p>



												<figure className="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio">
													{/* <div className="wp-block-embed__wrapper"> */}

													<LiteYouTubeEmbed id="VpmVNiU4CTs" title="YouTube video player">
													</LiteYouTubeEmbed>
													{/* </div> */}
												</figure>



												<hr className="wp-block-separator has-text-color has-red-color has-css-opacity has-red-background-color has-background is-style-wide" />


												<div style={{ textAlign: 'center' }}>
													{/* <iframe loading="lazy" src="https://summerlou.smugmug.com/frame/slideshow?key=8vk8wf&amp;speed=3&amp;transition=fade&amp;autoStart=1&amp;captions=0&amp;navigation=0&amp;playButton=0&amp;randomize=0&amp;transitionSpeed=2" width="800" height="600" frameBorder="no" scrolling="no">
													</iframe> */}

													<div>
														<Carousel images={CarouselData} />
													</div>
												</div>
											</div>

										</div>
									</div>

								</article>


							</main>
						</div>


					</div>

					<footer id="colophon" className="site-footer">
						<div className="wrap">


							<aside className="widget-area" aria-label="Footer">
								<div className="widget-column footer-widget-1">
									<section id="zoom-social-icons-widget-2" className="widget zoom-social-icons-widget"><h2 className="widget-title">Follow us</h2>

										{/* <ul className="zoom-social-icons-list zoom-social-icons-list--with-canvas zoom-social-icons-list--round zoom-social-icons-list--no-labels">


											<li className="zoom-social_icons-list__item">
												<Link className="zoom-social_icons-list__link" href="https://www.facebook.com/midcitysmiles" target="_blank" title="Facebook">

													<span className="screen-reader-text">facebook</span>

													<span className="zoom-social_icons-list-span social-icon socicon socicon-facebook" data-hover-rule="background-color" data-hover-color="#727272" style={{ backgroundColor: '#1877F2' }}></span>

												</Link>
											</li>


											<li className="zoom-social_icons-list__item">
												<Link className="zoom-social_icons-list__link" href="https://www.instagram.com/midcitysmiles/" target="_blank" title="Instagram">

													<span className="screen-reader-text">instagram</span>

													<span className="zoom-social_icons-list-span social-icon socicon socicon-instagram" data-hover-rule="background-color" data-hover-color="#727272" style={{ backgroundColor: '#d13aab' }}></span>

												</Link>
											</li>


											<li className="zoom-social_icons-list__item">
												<Link className="zoom-social_icons-list__link" href="https://www.snapchat.com/add/midcitysmiles" target="_blank" title="Default Label">

													<span className="screen-reader-text">snapchat</span>

													<span className="zoom-social_icons-list-span social-icon socicon socicon-snapchat" data-hover-rule="background-color" data-hover-color="#727272" style={{ backgroundColor: '#eeee22' }}></span>

												</Link>
											</li>


										</ul> */}

										<ul className="zoom-social-icons-list zoom-social-icons-list--with-canvas zoom-social-icons-list--round zoom-social-icons-list--no-labels">


											<li className="zoom-social_icons-list__item">
												<a className="zoom-social_icons-list__link" href="https://www.facebook.com/midcitysmiles" target="_blank" title="Facebook">

													
                        <Image
                        src={fb1}
                        alt="fb1"
                        qualtiy={20}
                        priority="false"
                        sizes="100vw"
                         />
                    

													{/* <span className="screen-reader-text">facebook</span> */}

													{/* <span className="zoom-social_icons-list-span social-icon socicon socicon-facebook" data-hover-rule="backgroundColor" data-hover-color="#727272" style={{backgroundColor : '#1877F2'}}></span> */}

												</a>
											</li>


											<li className="zoom-social_icons-list__item">
												<a className="zoom-social_icons-list__link" href="https://www.instagram.com/midcitysmiles/" target="_blank" title="Instagram">

													<span className="screen-reader-text">instagram</span>

													
                        <Image
                        src={insta1}
                        alt="insta1"
                        qualtiy={20}
                        priority="false"
                        sizes="100vw"
                         />
                    

													{/* <span className="zoom-social_icons-list-span social-icon socicon socicon-instagram" data-hover-rule="backgroundColor" data-hover-color="#727272" style={{backgroundColor : '#d13aab'}}></span> */}

												</a>
											</li>


											<li className="zoom-social_icons-list__item">
												<a className="zoom-social_icons-list__link" href="https://www.snapchat.com/add/midcitysmiles" target="_blank" title="Default Label">

													<span className="screen-reader-text">snapchat</span>

													
                        <Image
                        src={dl1}
                        alt="dl1"
                        qualtiy={20}
                        priority="false"
                        sizes="100vw"
                         />
                    

													{/* <span className="zoom-social_icons-list-span social-icon socicon socicon-snapchat" data-hover-rule="backgroundColor" data-hover-color="#727272" style={{backgroundColor : '#eeee22'}}></span> */}

												</a>
											</li>
										</ul>

									</section>
									<section id="nav_menu-7" className="widget widget_nav_menu">
										<nav className="menu-top-container" aria-label="Menu">
											<ul id="menu-top" className="menu">
												<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-12 current_page_item menu-item-80"><Link href="/" aria-current="page">HOME</Link>
												</li>
												<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-144"><Link href="our-team/">OUR TEAM</Link></li>
												<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-148"><Link href="contact-us/">CONTACT US</Link></li>
												<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-161"><Link href="procedures/">PROCEDURES</Link></li>
												<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-164"><Link href="orthodontics/">INVISALIGN</Link></li>
												<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-153"><Link href="patient-forms/">PATIENT FORMS</Link></li>
												<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-321"><Link href="payment-insurance/">PAYMENT/INSURANCE</Link></li>
											</ul>
										</nav>
									</section><section id="block-4" className="widget widget_block widget_text">
										<p>

										</p>
									</section>
									<section id="block-3" className="widget widget_block widget_text">
										<p></p>
									</section>			</div>
								<div className="widget-column footer-widget-2">
									<section id="block-11" className="widget widget_block">
										<div className="is-layout-flow wp-block-group"><div className="wp-block-group__inner-container">
											<div className="is-layout-flex wp-container-2 wp-block-columns">
												<div className="is-layout-flow wp-block-column" style={{ flexBasis: '100%' }}>
													<figure className="wp-block-image size-full">
														
                        <Image
                        src={croppedpels}
                        alt="croppedpels"
                        qualtiy={20}
                        priority="false"
                        sizes="100vw"
                         />
                    
													</figure>
												</div>
											</div>
										</div></div>
									</section>			</div>
							</aside>

							<div className="site-info">
								<Link className="privacy-policy-link" href="privacy-policy/">Privacy Policy</Link>
									
								<Link href="https://wordpress.org/" className="imprint">
										</Link>
							</div>
						</div>
					</footer>
				</div>
			</div>




			<Svg12 />







		</>
	)
}
export default index;
