'use client'

import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

const width = 800;
const height = 600;

function getPlaceholderImageUrl() {
  return `https://picsum.photos/seed/${Math.round(Math.random() * 100)}/${width}/${height}`;
}

interface AnimatedImageProps {
  src: string
  width: number
  height: number
  isExpanded: boolean
}

function AnimatedImage({ src, width, height, isExpanded }: AnimatedImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  return <motion.div
    transition={{
      duration: 0.5,
    }}
    animate={{
      width: isHovered || isExpanded ? width * 1.2 : width,
      height: isHovered || isExpanded ? height * 1.2 : height,
    }}
    className={`relative`}
    onHoverStart={() => setIsHovered(true)}
    onHoverEnd={() => setIsHovered(false)}
  >
    <Image
      src={src}
      alt=''
      fill
    />
  </motion.div>
}


function AnimatedPanel({ src }: { src: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return <motion.div
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
      width: isExpanded ? "100vw" : 'auto',
    }}
    onClick={() => {
      setIsExpanded(true)
      console.log('Animated panel expanded')
    }}
    className={`debug flex p-40 ${isExpanded ? '' : ''}`}
  >
    <AnimatedImage
      src={src}
      width={width}
      height={height}
      isExpanded={isExpanded}
    />
    {
      isExpanded && <div
        className='flex text-white'
        hidden={true}
      >

        test<br/>
        test<br/>
        test<br/>
        test<br/>
        test<br/>
        test<br/>
        test<br/>
        test<br/>
        test<br/>
        <button
          onClick={(event) => {
            event.stopPropagation()
            setIsExpanded(false)
            console.log('expanded', isExpanded)
          }}
          className='justify-end m-16'
        >
          x
        </button>
      </div>
    } 
  </motion.div>
}

export default function Home() {

  const srcs = [];
  const imgs = [];
  for (let i = 0; i < 10; i++) {
    srcs.push(getPlaceholderImageUrl());
    imgs.push(
      <AnimatedPanel 
        key={i} 
        src={srcs[srcs.length - 1]} 
      />
    );
  }

  return <div className="my-64 flex">
    <div className='space-y-16 bg-black inline-block m-auto'>
      {imgs}
    </div>
  </div>

}
