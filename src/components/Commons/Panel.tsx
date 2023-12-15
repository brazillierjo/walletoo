import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/utils/tailwindMerge";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";

interface PanelProps {
  widthClasses?: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Panel: React.FC<PanelProps> = ({ widthClasses, children, onClose }) => {
  const panelVariants = {
    initial: {
      x: "100%",
    },
    animate: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    exit: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <div className="z-20 lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-screen">
      <div onClick={onClose} className="w-full bg-black opacity-40" />

      <motion.div
        className={cn(
          "fixed right-0 top-0 z-10 h-screen overflow-y-auto bg-white p-6 shadow-lg dark:bg-black",
          widthClasses ? widthClasses : "w-3/4 lg:w-1/3"
        )}
        variants={panelVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Button variant="outline" onClick={onClose} className="absolute right-4 top-4">
          <MdClose className="h-4 w-4" />
        </Button>

        {children}
      </motion.div>
    </div>
  );
};

export default Panel;
