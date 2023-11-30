import { panelAtom } from "@/src/atoms/panel.atom";
import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { MdClose } from "react-icons/md";

interface PanelProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Panel: React.FC<PanelProps> = ({ children, onClose }) => {
  const [showPanel] = useAtom(panelAtom);

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

  if (!showPanel) return null;

  return (
    <div className="z-20 lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-screen">
      <div onClick={onClose} className="w-full bg-black opacity-40" />

      <motion.div
        className="fixed right-0 top-0 z-10 h-screen w-3/4 overflow-y-auto bg-white p-6 shadow-lg dark:bg-black lg:w-1/3"
        variants={panelVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Button onClick={onClose} className="absolute right-4 top-4">
          <MdClose className="h-6 w-6" />
        </Button>

        {children}
      </motion.div>
    </div>
  );
};

export default Panel;
