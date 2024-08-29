import styles from "./index.module.scss";
import clsx from "clsx";

const IconButton = ({
    onClick: action = () => { },
    icon,
    isRotate = false
}) => {

    return (
        <div className={clsx(styles.button, { [styles.rotate]: isRotate })}
            onClick={action}>
            {icon}
        </div>
    )
}

export default IconButton;