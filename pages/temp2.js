import React, { useEffect, useState } from 'react'
import { fileNameFromUrl, isAbsoluteURL } from '../utils/helpers';
import useFetch from './customHooks/useFetch';
import { parse } from 'url';



const temp2 = () => {

  const cheerio = require('cheerio');

  const [str, setStr] = useState('');
  const [match, setMatch] = useState('');

  const html = `
  
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import '../../jQueryLoader.js';
import Carousel from '@/components/Carousel.js';
import { CarouselData } from '@/components/CarouselData.js';
import Svg11 from '../../components/Svg11';
import HeaderImage from '@/components/HeaderImage.js';


const index = () => {



	return (
		<>

			<div id="page" className="site">
				<Link className="skip-link screen-reader-text" href="#content">Skip to content</Link>

				<header id="masthead" className="site-header">

					<div className="custom-header">

						<HeaderImage />
						{/* <div className="custom-header-media">
							<div id="wp-custom-header" className="wp-custom-header" style={{}}>
								<Image src="/wp-content/uploads/2022/06/Untitled-3-2.jpg" width="2000" height="1200" alt="" priority="false" />
							</div>
						</div> */}

						<div className="site-branding">
							<div className="wrap">

								<Link href="/" className="custom-logo-link" rel="home">
									<Image width="281" height="250" src="/wp-content/uploads/2022/06/cropped-Untitled-1-3.png" className="custom-logo" alt="Mid-City Smiles Family Dentistry" priority="false" quality={20} />
								</Link>
								<div className="site-branding-text">
									<p className="site-title"></p>
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

						<div className="wrap">
							<div id="primary" className="content-area">
								<main id="main" className="site-main">

									<article id="post-115" className="post-115 page type-page status-publish hentry">
										<header className="entry-header">
											<h1 className="entry-title">OUR TEAM</h1>
										</header>
										<div className="entry-content">
											{/* <p style={{ textAlign: 'center' }}><iframe src="https://summerlou.smugmug.com/frame/slideshow?key=8vk8wf&amp;autoStart=1&amp;captions=0&amp;navigation=0&amp;playButton=0&amp;speed=3&amp;transition=fade&amp;transitionSpeed=2" width="800" height="600" frameBorder="no" scrolling="no"></iframe></p> */}
											<div style={{display: 'flex', textAlign: 'center'}}>
												<Carousel images={CarouselData} />
											</div>

											<hr className="wp-block-separator has-alpha-channel-opacity" />

											{/* <hr /> */}

											<h2 className="has-text-align-center has-text-color" style={{ color: '#f30d0d' }}>OUR DOCTORS</h2>

											<h3 className="has-text-align-center"><strong>Mark D. Anderson, DDS</strong></h3>


											<div className="wp-block-image">
												<figure className="aligncenter size-full">
													<Image  width="250" height="350" src="/wp-content/uploads/2022/05/Anderson.jpg" alt="" className="wp-image-123" priority="false" />
													</figure></div>


											<p>Dr. Anderson graduated from the LSU School of Dentistry in 2000.&nbsp; Upon graduating dental school, Dr. Anderson began working as an associate dentist under Dr. Ronald Villars in downtown New Orleans.&nbsp; He&nbsp;practiced dentistry in the CBD (central business district) for 9 years and in August of 2009 opened up Mid-City Smiles Family Dentistry.&nbsp; Over the years Dr. Anderson has completed many hours of continuing education with an emphasis on&nbsp;<Link href="http://midcitysmiles.com/ortho.html">orthodontic dentistry</Link>, including&nbsp; <Link href="http://invisalign.com/" target="_blank" rel="noreferrer noopener">Invisalign®</Link>&nbsp;certification.&nbsp; He is the leading Invisalign provider in the greater New Orleans area achieving  Diamond status in 2021 through  Invisalign, a distinction earned by less than 1% of Invisalign providers worldwide.  Dr. Anderson  is also a lifetime member of the Untied States Dental Institute, the oldest program in the industry for education of orthodontics for general dentists including  traditional straightwire braces and functional appliances. &nbsp;Dr. Anderson has also received specialized training for the surgical placement of <strong>dental implants</strong>. Patients are now able to receive complete dental implant care from start to finish at Mid-City Smiles including the use of digitally guided surgery. <strong>Sports Dentistry</strong> is another area Dr. Anderson has focused a lot of continuing education and training on. He has been a member of the Academy of Sports Dentistry since 2012.&nbsp; Dr. Anderson has helped provide dental/trauma care for local athletes and currently serves as the official team dentist of the New Orleans Pelicans as well as the University of New Orleans Athletics program.</p>



											<p>Dr. Anderson is fluent in Spanish.&nbsp; He is a member of both the Hispanic Dental Association and the Louisiana Hispanic Chamber of Commerce.&nbsp; He also periodically does a dental health radio show on the local Spanish radio channel.  Since 2009, Dr. Anderson has been voted every year by his peers as one of New Orleans’ Top Dentists.&nbsp; His most recent profile appeared in the Top Dentists issue of New Orleans Magazine.</p>



											<p>Dr. Anderson was born and raised in New Orleans, Louisiana.&nbsp; He is a graduate of Benjamin Franklin High School and received his undergraduate Bachelor’s degree from LSU in Baton Rouge.&nbsp; His father is also a native New Orleanian (in fact, he was born and raised in the Mid-City area).&nbsp; His mother is a native of Havana, Cuba.&nbsp; He is married to Summer Anderson, a native of Baton Rouge, Louisiana. He has 2 sons (Luke and Benjamin) and a daughter (Isabelle).&nbsp; He also enjoys traveling, camping, hiking, and playing/watching most sports especially Pelicans, Saints, UNO and all LSU teams.&nbsp; Dr. Anderson is also a member of the Krewe of Endymion, Mardi Gras’ largest parade organization.</p>



											<h3>Education:</h3>



											<ul><li>Benjamin Franklin Senior High School,&nbsp;New Orleans</li><li>Louisiana State University,&nbsp;Baton Rouge</li><li>Louisiana State University School of Dentistry, New Orleans</li></ul>



											<h3>Organizations:</h3>



											<ul><li>American Dental Association</li><li>Louisiana Dental Association</li><li>New Orleans Dental Association&nbsp;</li><li>Academy of Sports Dentistry&nbsp;</li><li>American Academy of Clear Aligners</li><li>International Association of Dental Traumatology</li><li>Hispanic Dental Association</li><li>Academy of General Dentistry</li><li>United States Dental Institute&nbsp;</li><li>Psi Omega Dental Fraternity</li><li>Krewe of Endymion</li></ul>



											<h3>Additional affiliations:</h3>



											<ul><li>New Orleans Pelicans, Team Dentist</li><li>University of New Orleans Athletics</li></ul>



											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h3 className="has-text-align-center"><strong>Perla Hernandez, DDS</strong></h3>


											<div className="wp-block-image">
												<figure className="aligncenter size-full"><Image  width="250" height="350" src="/wp-content/uploads/2022/05/perla-1.jpg" alt="" priority="false" /></figure></div>


											<p>Dr. Perla Hernandez has been a proud New Orleans resident since she was 11 years old. She is originally from Guanajuato, Mexico. Dr. Hernandez graduated from LW Higgins High School in Marrero. She earned a Bachelor of Science degree in Biology with a Minor in Chemistry from Nicholls State University in Thibodaux, LA.  At Nicholls State, Dr. Hernandez won the Outstanding Achievement in Pre-Dentistry Award. She was also a member of the BBB Biological Honor Society.</p>



											<p>She went on to receive her Doctorate of Dental Surgery from Louisiana State University School of Dentistry in 2021. At LSU Dental School, Dr. Hernandez participated in a life changing volunteer mission trip providing free dental care to the underserved communities of the Dominican Republic. Dr. Hernandez is passionate about dentistry and helping others. She strives to make her patients feel comfortable while providing the highest standard of care.</p>



											<p>Dr. Hernandez is a certified Botox and dermal filler provider. She received her training and certification through the American Academy of Facial Esthetics. She is also a member of the American Dental Association, Louisiana Dental Association, Academy of General Dentistry, Hispanic Dental Association, and New Orleans Dental Association. She is fluent in Spanish. During her spare time, Dr. Hernandez enjoys traveling and spending time with loved ones.</p>



											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h3 className="has-text-align-center"><strong>Delmy Urbina, DDS</strong></h3>


											<div className="wp-block-image">
												<figure className="aligncenter size-full"><Image  width="252" height="349" src="/wp-content/uploads/2022/05/del.jpg" alt="" priority="false" /></figure></div>


											<p>Dr. Delmy Urbina is originally from San Pedro Sula, Honduras. She moved to New Orleans in 2006,  attending and graduating from Grace King High School in Metairie. She quickly fell in love with the beauty and culture of New Orleans and considers it her second home.</p>



											<p>She graduated with honors from the University of New Orleans where she earned a Bachelor of Science degree.  At UNO, Dr. Urbina completed 2 years of extensive published research in developmental biology focusing on the early stages of animal development and gene expression. She also began working as a dental assistant at Mid-City Smiles during her pre-dental studies.</p>



											<p>Dr. Urbina graduated with honors from Louisiana State University School of Dentistry in 2022. During dental school, Dr. Urbina continued with her research endeavors in microbiology and studied the cariogenic potential of streptococcus mutants isolated from children with severe dental decay, which again became a published article. Dr. Urbina values the importance of preventative care in Dentistry which is why she is up to date with the latest research to better help her patients. Dr. Urbina was awarded the Serpas scholarship in 2018 for outstanding academics.</p>



											<p>Dr. Urbina is fluent in Spanish and French. She is a member of the New Orleans Spanish Apostolate where she volunteers helping her community. She also volunteers and works closely with Golden Change, a program to empower ethnically diverse communities in New Orleans. Dr. Urbina has also enjoyed spending her time volunteering with the Louisiana Mission of Mercy, a dental health team that provides free dental care for the underserved. She feels so blessed with all the opportunities bestowed upon her, that giving back to her community is a must. Dr. Urbina is excited to start this new chapter in her life offering patients the best dental treatment available here at Mid-City Smiles.</p>



											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h3 className="has-text-align-center"><strong>Caylin Frye, DDS</strong></h3>


											<div className="wp-block-image">
												<figure className="aligncenter size-full"><Image  width="252" height="349" src="/wp-content/uploads/2022/05/frye.jpg" alt="" priority="false" /></figure></div>


											<p>Dr. Caylin Frye is originally from Jupiter, Florida and received her Bachelor of Science degree from Florida State University with a minor in Family and Child Sciences. She then traveled to our nation’s capital and received her Doctor of Dental Surgery degree from Howard University College of Dentistry in Washington D.C. Following dental school, Dr. Frye completed a one year general practice residency at the Washington D.C. Veterans Affairs hospital where she received specialized training in Implants, Oral Surgery, Endodontics, Treatment planning and Smile design cases. Dr. Frye met her husband, a native of New Orleans, Louisiana, while in D.C. and eventually moved down to the Big Easy in 2017 where she has practiced ever since.</p>



											<p>In her spare time Dr. Frye is an avid sports enthusiast, you can find her cheering on her New Orleans Saints and Pelicans, and anything Florida State Seminoles related. As long as LSU is not competing against FSU then you can find her cheering for the Tigers as well! She grew up with a love for dance and danced all through high school, college, and was even a part of a world renowned tap company, Sole Defined, based out of the D.C. area while in dental school.<br /><br />Dr. Frye has a love for cosmetic dentistry and a passion for helping patients feel beautiful and confident behind their smile. She has completed various courses to gain additional specialized training in Porcelain Veneers, Invisalign, Botox and Fillers and Smile Makeovers. Dr. Frye is a Board Member of the American Academy of Clear Aligners (AACA), as well as a member of the American Academy of Cosmetic Dentistry (AACD) and the American Academy of General Dentistry (AGD). Dr. Frye is here to help you achieve your perfect dream smile in no time!</p>



											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h2 className="has-text-align-center has-text-color" style={{ color: '#f30d0d' }}>DENTAL HYGIENE TEAM</h2>



											<h3 className="has-text-align-center"><strong>Betsy Barreca, RDH</strong></h3>


											<div className="wp-block-image">
												<figure className="aligncenter size-full"><Image  width="250" height="350" src="/wp-content/uploads/2022/05/image-2.png" alt="" priority="false" /></figure></div>


											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h3 className="has-text-align-center"><strong>Shannon Marretta, RDH</strong></h3>


											<div className="wp-block-image">
												<figure className="aligncenter"><Image  src="/images/shan.jpg" alt="Shannon" width="250" height="350" priority="false" /></figure></div>


											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h3 className="has-text-align-center"><strong>Gabrielle Stoute, RDH </strong></h3>


											<div className="wp-block-image">
												<figure className="aligncenter size-full"><Image  width="252" height="349" src="/wp-content/uploads/2022/05/gab.jpg" alt=""  priority="false" /></figure></div>


											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h3 className="has-text-align-center"><strong>Maria Haar, BSDH, RDH</strong></h3>


											<div className="wp-block-image">
												<figure className="aligncenter size-full"><Image  width="250" height="350" src="/wp-content/uploads/2022/06/haar-1.jpg" alt="" priority="false" /></figure></div>


											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h2 className="has-text-align-center has-text-color" style={{ color: '#f30d0d' }}>FRONT OFFICE TEAM</h2>



											<h3 className="has-text-align-center"><strong>Chelsea Acosta</strong><br />FRONT OFFICE COORDINATOR</h3>


											<div className="wp-block-image">
												<figure className="aligncenter size-full"><Image  width="252" height="349" src="/wp-content/uploads/2022/05/cea.jpg" alt="" priority="false" /></figure></div>


											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h3 className="has-text-align-center"><strong>Xochilt Silva</strong></h3>


											<div className="wp-block-image">
												<figure className="aligncenter"><Image  src="/images/Xo%20-%20Copy.jpg" alt="" width="250" height="350" priority="false" /></figure></div>


											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h3 className="has-text-align-center"><strong>Mary Nunez</strong></h3>


											<div className="wp-block-image">
												<figure className="aligncenter size-full"><Image  width="252" height="349" src="/wp-content/uploads/2022/05/mary.jpg" alt="" priority="false" /></figure></div>


											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h3 className="has-text-align-center"><strong>Amalia Lopez</strong></h3>


											<div className="wp-block-image">
												<figure className="aligncenter size-full"><Image  width="250" height="350" src="/wp-content/uploads/2022/06/am.jpg" alt="" priority="false" /></figure></div>


											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h3 className="has-text-align-center"><strong>Miranda Salcido</strong></h3>


											<div className="wp-block-image">
												<figure className="aligncenter size-full"><Image  width="250" height="350" src="/wp-content/uploads/2022/05/image-3.png" alt="" className="wp-image-128" priority="false" /></figure></div>


											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<p className="has-text-align-center">NOT PICTURED:  <strong>Laura Salas, Esperanza Villavicencio, Michelle Majoria</strong>  </p>



											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h2 className="has-text-align-center has-text-color" style={{ color: '#f30d0d' }}>DENTAL ASSISTING TEAM</h2>



											<h3 className="has-text-align-center"><strong>Rosi Lagos, EDDA</strong><br />CLINICAL COORDINATOR</h3>


											<div className="wp-block-image">
												<figure className="aligncenter size-full"><Image  width="250" height="350" priority="false" src="/wp-content/uploads/2022/06/rosi.jpg" /></figure></div>


											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h3 className="has-text-align-center"><strong>Jeannete Salas, DDS, EDDA</strong></h3>


											<div className="wp-block-image">
												<figure className="aligncenter size-full"><Image  width="252" height="349" src="/wp-content/uploads/2022/05/js.jpg" alt=""  priority="false" /></figure></div>


											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h3 className="has-text-align-center"><strong>Houria Dziri, EDDA</strong></h3>


											<div className="wp-block-image">
												<figure className="aligncenter"><Image  src="/images/houria.jpg" alt="Houria" width="250" height="350" priority="false" /></figure></div>


											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h3 className="has-text-align-center"><strong>Mona Okasha</strong>, <strong>EDDA</strong></h3>


											<div className="wp-block-image">
												<figure className="aligncenter size-full"><Image  width="252" height="349" priority="false" src="/wp-content/uploads/2022/05/mona.jpg" /></figure></div>


											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h3 className="has-text-align-center"><strong>Kimberly Nunez, EDDA</strong></h3>


											<div className="wp-block-image">
												<figure className="aligncenter"><Image  src="/images/kim.jpg" alt="Kim" width="250" height="350" priority="false" /></figure></div>


											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<h3 className="has-text-align-center"><strong>Krisalfania Flores-Alvarado</strong>, <strong>EDDA</strong></h3>


											<div className="wp-block-image">
												<figure className="aligncenter"><Image src="/images/kris%20-%20Copy.jpg" alt="" width="250" height="350" priority="false" /></figure></div>


											<hr className="wp-block-separator has-alpha-channel-opacity" />



											<p className="has-text-align-center">NOT PICTURED:  <strong>Bri Martin,</strong> <strong>Nalleli Cisneros</strong></p>
										</div>
									</article>

								</main>
							</div>
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
														src='/images/fb1.png'
														alt=''
														// width={40}
														// height={38}
														width="40"
														height="38"
													/>

													{/* <span className="screen-reader-text">facebook</span> */}

													{/* <span className="zoom-social_icons-list-span social-icon socicon socicon-facebook" data-hover-rule="backgroundColor" data-hover-color="#727272" style={{backgroundColor : '#1877F2'}}></span> */}

												</a>
											</li>


											<li className="zoom-social_icons-list__item">
												<a className="zoom-social_icons-list__link" href="https://www.instagram.com/midcitysmiles/" target="_blank" title="Instagram">

													<span className="screen-reader-text">instagram</span>

													<Image
														src='/images/insta1.png'
														alt=''
														// width={40}
														// height={42}
														width='40'
														height='42'

													/>

													{/* <span className="zoom-social_icons-list-span social-icon socicon socicon-instagram" data-hover-rule="backgroundColor" data-hover-color="#727272" style={{backgroundColor : '#d13aab'}}></span> */}

												</a>
											</li>


											<li className="zoom-social_icons-list__item">
												<a className="zoom-social_icons-list__link" href="https://www.snapchat.com/add/midcitysmiles" target="_blank" title="Default Label">

													<span className="screen-reader-text">snapchat</span>

													<Image
														src='/images/dl1.png'
														alt=''
														// width={42}
														// height={40}
														width='42'
														height='40'
													/>

													{/* <span className="zoom-social_icons-list-span social-icon socicon socicon-snapchat" data-hover-rule="backgroundColor" data-hover-color="#727272" style={{backgroundColor : '#eeee22'}}></span> */}

												</a>
											</li>


										</ul>

									</section><section id="nav_menu-7" className="widget widget_nav_menu"><nav className="menu-top-container" aria-label="Menu"><ul id="menu-top" className="menu"><li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-80"><Link href="/">HOME</Link></li>
										<li className="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-115 current_page_item menu-item-144"><Link href="/" aria-current="page">OUR TEAM</Link></li>
										<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-148"><Link href="/contact-us/">CONTACT US</Link></li>
										<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-161"><Link href="/procedures/">PROCEDURES</Link></li>
										<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-164"><Link href="/orthodontics/">INVISALIGN</Link></li>
										<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-153"><Link href="/patient-forms/">PATIENT FORMS</Link></li>
										<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-321"><Link href="/payment-insurance/">PAYMENT/INSURANCE</Link></li>
									</ul></nav></section><section id="block-4" className="widget widget_block widget_text">
										<p></p>
									</section><section id="block-3" className="widget widget_block widget_text">
										<p></p>
									</section>			</div>
								<div className="widget-column footer-widget-2">
									<section id="block-11" className="widget widget_block">
										<div className="is-layout-flow wp-block-group"><div className="wp-block-group__inner-container">
											<div className="is-layout-flex wp-container-2 wp-block-columns">
												<div className="is-layout-flow wp-block-column" style={{ flexBasis: '100%' }}>
													<figure className="wp-block-image size-full"><Image  width="348" height="250" src="/wp-content/uploads/2022/06/cropped-pels.png" alt="" priority="false" /></figure>
												</div>
											</div>
										</div></div>
									</section>			</div>
							</aside>

							<div className="site-info">
								<Link className="privacy-policy-link" href="/privacy-policy/">Privacy Policy</Link>	<Link href="https://wordpress.org/" className="imprint">
								</Link>
							</div>
						</div>
					</footer>
				</div>
			</div>

			<Svg11 />







		</>
	)
}
export default index;
  
  `;

  const extractContent = (text) => {
    // const regex = /\(([^)]+)\)/;
    const regex = /\(([\s\S]*)\)/;
    const matches = text.match(regex);
    if (matches && matches.length >= 2) {
      return matches[1];
    }
    return null;
  };



  const handleSubmit = () => {
    // setMatch(extractContent(html));
    // console.log({match});

    const imageUrl = 'images/kris%20-%20Copy.jpg';
    const decodedImageUrl = decodeURIComponent(imageUrl);
    
    console.log({decodedImageUrl});

    
  };

  const $ = cheerio.load(html);
  const imgs = $('img');

// imgs.each((i, el) => {
//   console.log($(el).attr('src'));
// })

  return (
    <div>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        {/* {loading && <div>... Loading</div>}
        {useFetchError && <div className='text-danger'>{useFetchError}</div>} */}
        <div className='d-flex justify-content-center align-items-center '>
          <div><label>Enter BasePath:</label></div>
          <div>
            <input
              type='text'
              value={str}
              onChange={(e) => setStr(e.target.value.replaceAll('\\', '/'))}
            />
          </div>
          <div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>

      </div>


        {match && <div style={{width: '60%', margin: 'auto'}}>{$.html()}</div>}




    </div>
  )
}

export default temp2;