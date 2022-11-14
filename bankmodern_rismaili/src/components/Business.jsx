import { features } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const FeatureCard = ({ icon, title, content, index, delay, featureC }) => (
  <motion.div
  initial={{ x: 800, opacity: 0 }}
  animate={featureC}
  transition={{
    duration: 1.2,
    delay: delay,
  }}
    className={`flex flex-row p-6 rounded-[20px] cursor-pointer ${
      index !== features.length - 1 ? "mb-6" : "mb-0"
    } feature-card`}
  >
    <div
      className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
    >
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </motion.div>
);

const Business = () => {
  const featureC = useAnimation();
  const buttonC = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const animationSequence = async () => {
    await featureC.start({ x: 0, opacity: 1 });
    return await buttonC.start({ scale: [1.5, 1], opacity: 1 });
  };

  useEffect(() => {
    if (inView) {
      animationSequence();
    }
  }, [inView]);

  return (
    <section id="features" className={`${layout.section} mt-10`}>
      <motion.div ref={ref} className={layout.sectionInfo}>
        <motion.h2
          initial={{ x: -500, opacity: 0 }}
          animate={featureC}
          transition={{
            duration: 1,
          }}
          className={styles.heading2}
        >
          You do the business, <br className="sm:block hidden" />
          we will handle the money.
        </motion.h2>

        <motion.p
          initial={{ x: -500, opacity: 0 }}
          animate={featureC}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          className={`${styles.paragraph} max-w-[470px] mt-5`}
        >
          With the right credit card, you can improve your financial life by
          building credit, earning rewards and saving money. But with hundreds
          of credit cards on the market.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={buttonC}
          transition={{
            duration: 1,
          }}
        >
          <Button styles="mt-10" />
        </motion.div>
      </motion.div>

    <div className={`${layout.sectionImg} flex-col`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index}      delay={0.5 + (index * 2) / 10}
        featureC={featureC} />
      ))}
    </div>
  </section>
);

      }
export default Business;
