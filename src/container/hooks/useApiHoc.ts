import { useStoreLoader } from "@store/storeLoader";
import { useStoreError } from "@store/storeError";
import { useCallback } from 'react';

const useApiHoc = () => {
    const { startLoader, stopLoader } = useStoreLoader();
    const { setError } = useStoreError();

    const apiHoc = useCallback(async (successAction: () => Promise<void>, errorAction?: () => void) => {
        try {
            startLoader();
            await successAction();
        } catch (error: Error | any) {
            setError(error.response?.data?.message || error.response?.data || error?.message);
            errorAction?.();
        } finally {
            stopLoader();
        }
    }, [startLoader, stopLoader, setError]);

    return apiHoc;
}

export default useApiHoc;