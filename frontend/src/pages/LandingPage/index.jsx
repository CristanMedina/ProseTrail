import { motion } from "framer-motion"

const LandingPage = () => {

  return (
    <>
        <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration: 0.5}}
            className="max-w-md w-full bg-slate-300 bg-opacity-20 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="p-8">
                  <h2>Landing Page</h2>
                </div>
        </motion.div>
    </>
  )
}

export default LandingPage