'use client'

import { AnimatePresence, motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

const width = 600;
const height = 400;

function getPlaceholderImageUrl() {
  return `https://picsum.photos/seed/${Math.round(Math.random() * 100)}/${width}/${height}`;
}

function AnimatedImage(
  { src, handleHoverStart, handleHoverEnd, handleClick }:
  { src: string, handleHoverStart: Function, handleHoverEnd: Function, handleClick: Function }
) {
  // const ref = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ['end end', 'start start'],
  // });
  const [isHovered, setIsHovered] = useState(false);

  return <motion.div layout className="flex place-content-center ">
    <AnimatePresence
    >
      <motion.div
        onHoverStart={() => {
          handleHoverStart()
          setIsHovered(true)
        }}
        onHoverEnd={() => {
          handleHoverEnd()
          setIsHovered(false)
        }}
        className='flex space-x-4'
      >
        <motion.div layout
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
            width: isHovered ? width * 1 : width,
            height: isHovered ? height * 1 : height,
          }}
          
          onClick={() => {
            console.log('handleclick')
            handleClick()
          }}
          className="relative"
        >
          <Image
            src={src}
            alt=''
            fill
            className='z-0'
            />
        </motion.div>
        {isHovered && <motion.div layout className={`flex flex-col justify-center`}
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
        >
          texasdfasdfasdfasfaft<br />
          text<br />
          text<br />
          text<br />
          text<br />
        </motion.div>}
      </motion.div>

    </AnimatePresence>
    
  </motion.div>
}

export default function Home() {

  const [hovered, setHovered] = useState(-1)
  const [clicked, setClicked] = useState(-1)
  const [imgs, setImgs] = useState<JSX.Element[]>([])

  // useEffect(() => {
  //   const lenis = new Lenis();
  //   function raf(time: number) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }
  //   requestAnimationFrame(raf);
  // });

  useEffect(() => {
    console.log('creating new imgs')
    const newImgs = []
    for (let i = 0; i < 20; i++) {
      const url = getPlaceholderImageUrl()
      newImgs.push(
        <AnimatedImage 
          key={i} 
          src={url}
          handleHoverStart={() => {
            setHovered(i)
          }}
          handleHoverEnd={() => {
            console.log('end hovered', hovered)
            setHovered(-1)
          }}
          handleClick={() => {
            console.log('before', i, clicked)
            if (i == clicked) {
              console.log('i == clicked')
              setClicked(-1)
            } else {
              console.log('else')
              setClicked(i)
            }
            console.log('after', i, clicked)
          }}
        />
      )
    }
    setImgs(newImgs)
  }, [])

  return <div className="flex-1 h-full space-y-16 overflow-y-auto">
    {imgs}
  </div>
  
}
