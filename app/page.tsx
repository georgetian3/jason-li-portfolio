// 'use client'

// import { motion, useScroll, useTransform } from 'framer-motion';
// import Image from 'next/image';
// import { useEffect, useRef, useState } from 'react';
// import Lenis from 'lenis'

// const width = 600
// const height = 400

// function getPlaceholderImageUrl() {
//   return `https://picsum.photos/seed/${Math.round(Math.random() * 100)}/${width}/${height}`
// }

// function AnimatedImage({src}: {src: string}) {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ['end end', 'start start']
//   });
//   const [scale, setScale] = useState<number>(1)
//   // const scaleTransform = useTransform(() => 1 - Math.abs(0.5 - scrollYProgress.get()))
//   return <motion.div
//     ref={ref}
//     initial={{ 
//       opacity: 0,
//     }}
//     whileInView={{
//       opacity: 1,
//     }}
//     transition={{ 
//       duration: 0.5,
//     }}
//     animate={{
//       width: width * scale,
//       height: height * scale,
//     }}
//     // style={{
//     //   scaleX: scale,
//     //   scaleY: scale,
//     // }}
//     onHoverStart={() => setScale(1.2)}
//     onHoverEnd={() => setScale(1)}
//     className="relative space-x-4 flex items-center border-2 border-red-600"
//   >
//     <Image
//       src={src}
//       alt=''
//       fill
//       objectFit='contain'
//     />
//     <div>
//       text<br/>
//       text<br/>
//       text<br/>
//       text<br/>
//     </div>
//   </motion.div>
// }



// export default function Home() {
//   useEffect(() => {
//     const lenis = new Lenis()
//     function raf(time: number) {
//       lenis.raf(time)
//       requestAnimationFrame(raf)
//     }
//     requestAnimationFrame(raf)
//   })
//   const srcs = []
//   const imgs = []
//   for (let i = 0; i < 10; i++) {
//     srcs.push(getPlaceholderImageUrl())
//     imgs.push(<AnimatedImage key={i} src={srcs[srcs.length - 1]}/>)
//   }
//   return (
//     <div className="flex justify-center">
//       <div className="flex-col justify-center align-center space-y-16 border-2 border-green-600">
//         {imgs}
//       </div>
//     </div>
//   );
// }

'use client'

import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

const width = 600;
const height = 400;

function getPlaceholderImageUrl() {
  return `https://picsum.photos/seed/${Math.round(Math.random() * 100)}/${width}/${height}`;
}

function AnimatedImage({ src }: { src: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'start start'],
  });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
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
      animate={{
        width: isHovered ? width * 1.2 : width,
        height: isHovered ? height * 1.2 : height,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative mx-auto`}
    >
      <Image
        src={src}
        alt=''
        fill
        objectFit='contain'
      />
      <div className="absolute flex items-center justify-center">
        text<br />
        text<br />
        text<br />
        text<br />
      </div>
    </motion.div>
  );
}

export default function Home() {

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const srcs = [];
  const imgs = [];
  for (let i = 0; i < 10; i++) {
    srcs.push(getPlaceholderImageUrl());
    imgs.push(
      <AnimatedImage 
        key={i} 
        src={srcs[srcs.length - 1]} 
      />
    );
  }

  return (
    <div className="mx-auto space-y-16 pd m-64">
      {imgs}
    </div>
  );
}
