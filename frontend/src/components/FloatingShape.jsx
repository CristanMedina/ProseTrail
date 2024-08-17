import {motion} from "framer-motion"

const FloatingShape = ( {color, size, top, left, delay} ) => {
  return (
    <motion.div 
    className={`absolute rounded-full blur-3xl opacity-40 ${color} ${size}`}
    style={{top,left}}
    animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0,360],
    }}
    transition={{
        duration: 15,
        ease: "linear",
        repeat: Infinity,
        delay,
    }}

    aria-hidden="true"
    />
  )
}

export default FloatingShape