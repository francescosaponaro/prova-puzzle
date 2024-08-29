import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const PublicRoute = ({ RouteComponent }) => {
    const location = useLocation();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0, transition: {
                    duration: .2,
                    ease: "easeInOut",
                }
            }}
            transition={{
                duration: .2,
                ease: "easeInOut",
            }}
            key={location.pathname}
        >
            <RouteComponent />
        </motion.div>
    );
};

export default PublicRoute;