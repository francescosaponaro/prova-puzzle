import { useEffect } from "react";
import { Device } from '@capacitor/device';
import { storeDevice } from "@store/storeDevice";

const useDeviceType = () => {
    const { setDevice: setDeviceType } = storeDevice();

    useEffect(() => {
        const logDeviceInfo = async () => {
            const info = await Device.getInfo();

            setDeviceType(info)
        };

        logDeviceInfo();
    }, []);
}

export default useDeviceType;