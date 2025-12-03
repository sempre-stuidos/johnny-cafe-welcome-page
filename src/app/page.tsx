import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
      <section 
        className="w-full h-[90vh] px-8 transition-colors duration-300 overflow-y-hidden"
        style={{ backgroundColor: 'var(--theme-bg-nav)' }}
      >
        <div className="flex flex-row h-full gap-8 w-full">
          {/* Left Side - 40% */}
          <div className="flex flex-col justify-between py-8" style={{ width: '40%' }}>
            <div className="mt-12">
              <h3>
                478 PARLIAMENT ST
              </h3>

              <h1>
                JOHNNY G's
              </h1>
              <div className="flex flex-row align-bottom" style={{ width: '500', position: 'relative' }}>
                <h2 style={{ 
                  position: 'absolute',
                  WebkitTextStroke: '2px #334D2D',
                  zIndex: 10
                }}>
                  Brunch
                </h2>
                <p style={{
                  fontFamily: 'var(--font-amoret-sans)',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '18.9px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: 'var(--theme-text-light-cream)',
                  height: '25px',
                  position: 'absolute',
                  left: 300,
                  top: 45
                }}>
                  EST 1975
                </p>
              </div>

            </div>

            <Image
              src="/comet-vector.svg"
              alt="Comet vector"
              width={200}
              height={200}
              className="w-auto h-auto"
            />

            <div className="flex flex-col justify-between relative" style={{ height: '250px' }}>
              <h4>
                Have brunch at one of the oldest Restaurants in Cabbagetown
              </h4>

              <div className="flex flex-col justify-between" style={{ height: '60px' }}>
                <h5>
                  MONDAY - SUNDAY
                </h5>

                <h5>
                  7AM - 4PM
                </h5>
              </div>

              <Image
                src="/star-vector.svg"
                alt="Star vector"
                width={50}
                height={50}
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
                style={{
                  right: '-100px'
                }}
              />
            </div>
            <button className="btn-reservation mt-4 flex items-center gap-2">
              Reservation
              <Image
                src="/right-arrow-vector.svg"
                alt="Right arrow"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </button>
          </div>

          {/* Right Side - 60% */}
          <div className="flex items-end justify-end" style={{ width: '60%' }}>

            <div className="frame w-full relative overflow-hidden " style={{
              backgroundColor: 'transparent',
              border: '2px solid #B29738',
              height: '650px',
              width:'650px',
              borderTopLeftRadius: '999px',
              borderTopRightRadius: '999px'
            }}>
              <Image
                src="/home/brunch-frame-bg.jpg"
                alt="Brunch dish"
                fill
                sizes="550px"
                className="object-cover"
                style={{
                  borderRadius: '999px 999px 0 0'
                }}
                unoptimized
              />

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
