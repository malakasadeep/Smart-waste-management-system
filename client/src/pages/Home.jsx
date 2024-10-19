import React from "react";
import { useSpring, animated } from 'react-spring';
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import homeBg from './../images/homebg.jpg';
import localImage from './../images/local.jpg'
import Downlocal from './../images/downlocal.jpg'

export default function Home() {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 }
  });

  const slideInFromLeft = useSpring({
    transform: 'translateX(0%)',
    from: { transform: 'translateX(-100%)' },
    config: { duration: 1000 }
  });

  const slideInFromRight = useSpring({
    transform: 'translateX(0%)',
    from: { transform: 'translateX(100%)' },
    config: { duration: 1000 }
  });

  const popIn = useSpring({
    to: { transform: 'scale(1)' },
    from: { transform: 'scale(0)' },
    config: { tension: 200, friction: 12 }
  });

  return (
    <>
      <Navbar transparent />
      <main>
        <animated.div  className="relative pt-16 pb-32 flex content-center items-center justify-center" style={{
          minHeight: "75vh",
          backgroundImage: `url(${homeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <animated.div style={slideInFromLeft} className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Your waste management journey begins here.
                  </h1>
                  <p className="mt-4 text-lg text-gray-300">
                    This is an example of an efficient waste management system you can implement using our solutions. It features innovative tools and techniques designed to simplify your waste collection, tracking, and disposal processes.
                  </p>
                </div>
              </animated.div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </animated.div>

        <section className="pb-20 bg-gray-300 -mt-24">
          <div className="container mx-auto px-4">
            <animated.div style={popIn} className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Awarded Agency</h6>
                    <p className="mt-2 mb-4 text-gray-600">
                    Our garbage management service ensures timely and efficient waste collection. We utilize a fleet of modern vehicles equipped with GPS tracking to optimize routes
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Free Revisions
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Keep you user engaged by providing meaningful information. Remember that by this time, the user is curious.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                      <i className="fas fa-fingerprint"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Verified Company
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Write a few lines about each one. A paragraph describing a feature will be enough. Keep you user engaged!
                    </p>
                  </div>
                </div>
              </div>
            </animated.div>

            <animated.div style={fadeIn} className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Partnering with us makes waste management easy
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                  Ensure effective waste disposal by using our advanced solutions. Our tools are designed to simplify the process and improve efficiency, keeping your environment clean and sustainable.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                  Our system comes with ready-to-use features that help you manage waste better and faster. Just customize the options to fit your needs, and you're set to go. Streamline your operations with smart waste tracking and collection tools.
                </p>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-green-600 w-full mb-6 shadow-lg rounded-lg bg-green-600">
                  <img
                    alt="..."
                    src={localImage}
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block"
                      style={{
                        height: "95px",
                        top: "-94px"
                      }}
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-green-600 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                      Waste Management Services
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                      Waste generation is a constant process, but with efficient systems in place, we can manage its collection and disposal year-round, ensuring a cleaner environment for all.
                    </p>
                  </blockquote>
                </div>
              </div>
            </animated.div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <animated.div style={slideInFromRight} className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src={Downlocal}
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-green-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-green-300">
                    <i className="fas fa-recycle text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-semibold">A Greener Tomorrow</h3>
                  <p className="mt-4 text-lg leading-relaxed text-black">
                    Our waste management solutions are designed to help you transition to more sustainable practices. Whether you're a small business or a large organization, we've got the tools to help you succeed.
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 mr-3">
                            <i className="fas fa-leaf"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-black">Eco-friendly Solutions</h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 mr-3">
                            <i className="fas fa-globe"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-black">Global Impact</h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 mr-3">
                            <i className="fas fa-trash"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-black">Efficient Waste Collection</h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </animated.div>
        </section>

        <animated.section style={fadeIn} className="pt-20 pb-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">
                  Our Waste Management Heroes
                </h2>
                <p className="text-lg leading-relaxed m-4 text-black">
                  According to the Environmental Protection Agency, waste management professionals like Jane Doe are taking the lead in reducing waste and promoting sustainable practices.
                </p>
              </div>
            </div>
          </div>
        </animated.section>

        <animated.section style={slideInFromLeft} className="pb-20 relative block bg-gray-900">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-900 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  Build something
                </h2>
              </div>
            </div>
          </div>
        </animated.section>
      </main>
      <Footer />
    </>
  );
}