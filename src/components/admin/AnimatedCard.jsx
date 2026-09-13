import { motion } from "framer-motion";


function AnimatedCard({
  children,
  delay = 0,
}) {


  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 30,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.5,
        delay,
      }}

      whileHover={{
        y: -6,
      }}

    >

      {children}

    </motion.div>

  );

}


export default AnimatedCard;