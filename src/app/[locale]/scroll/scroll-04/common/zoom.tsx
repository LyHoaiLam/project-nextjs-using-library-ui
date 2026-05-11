"use client"
import * as motion from "motion/react-client"

export default function Zoom() {
  return (
    <motion.div
      //   style={ball}
      className="w-50 h-50 bg-red-900 rounded-full"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{
        once: false, // scroll ra → vào lại thì chạy lại
        amount: 0.6, // 60% visible mới trigger
      }}
      transition={{
        duration: 0.8,
        delay: 0.3,
        // ease: [0, 0.71, 0.2, 1.01],
        ease: [0, 0.1, 0.2, 1.1],
      }}
    />
  )
}

/**
 * ==============   Styles   ================
 */

// const ball = {
//   width: 200,
//   height: 200,
//   borderRadius: "50%",
//   background: "red",
// };
