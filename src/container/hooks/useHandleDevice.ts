import { storeDevice } from '@store/storeDevice';

const useHandleDevice = () => {
    const { device } = storeDevice();

    const handleDevice = (webAction: any, appAction: any) => {
        if (device.platform === "web") {
            webAction()
        } else {
            appAction()
        }
    }

    return handleDevice
}

export default useHandleDevice