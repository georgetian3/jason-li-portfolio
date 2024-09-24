'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Lenis from 'lenis'

const width = 600
const height = 400
const placeholderImageUrl = `https://via.placeholder.com/${width}x${height}.png`

function AnimatedImage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"]
  });
  const scaleTransform = useTransform(() => 1 - Math.abs(0.5 - scrollYProgress.get()))
  return <motion.div
    ref={ref}
    initial={{ 
      opacity: 0,
    }}
    whileInView={{
      opacity: 1,
    }}
    transition={{ 
      duration: 0.5,
    }}
    style={{
      position: "relative",
      // border: '1px solid red',
      scaleX: scaleTransform,
      scaleY: scaleTransform,
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Image
      src={placeholderImageUrl}
      alt=""
      width={width}
      height={height}
    />
    <div style={{marginLeft: '16px'}}>
      text<br/>
      text<br/>
      text<br/>
      text<br/>
    </div>
  </motion.div>
}

export default function Home() {

  useEffect( () => {
    const lenis = new Lenis()
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

  })

  const imgs = []
  for (let i = 0; i < 10; i++) {
    imgs.push(<AnimatedImage key={i} />)
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {imgs}
      </main>
    </div>
  );
}

// import "./styles.css";
// import { useRef } from "react";
// import { motion, useScroll } from "framer-motion";

// function Item() {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["end end", "start start"]
//   });

//   return (
//     <section>
//       <div ref={ref}>
//         <figure className="progress">
//           <svg id="progress" width="75" height="75" viewBox="0 0 100 100">
//             <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
//             <motion.circle
//               cx="50"
//               cy="50"
//               r={Math.abs(15 - scrollYProgress.get())}
//               pathLength="1"
//               className="indicator"
//               style={{ pathLength: scrollYProgress }}
//             />
//           </svg>
//         </figure>
//       </div>
//     </section>
//   );
// }

// export default function App() {
//   return (
//     <>
//       <Item />
//       <Item />
//       <Item />
//       <Item />
//       <Item />
//       <Item />
//       <Item />
//       <Item />
//       <Item />
//       <Item />
//       <Item />
//       <Item />
//     </>
//   );
// }
