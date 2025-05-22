import { useEffect, useRef } from 'react';
import useAutoSave from './useAuthoSaveData';
import { useLayout } from '../../provider/layoutProvider';
import { isEqual } from 'lodash';

const useAutoSaveWithDiff = (AUTOSAVE_INTERVAL) => {
    const { liveDetails } = useLayout();
    const saveData = useAutoSave();
    const lastSavedRef = useRef({});
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!liveDetails) return;

            const fieldsToSave = {};

            // List of fields to track
            const trackableFields = [
                'personalDetails', 'educations', 'experiences', 'achievements', 'strengths',
                'certificates', 'languages', 'industryExpertise', 'openSourceWork', 'passions',
                'awards', 'trainings', 'my_time', 'skills', 'summary'
            ];

            for (const field of trackableFields) {
                if (!isEqual(liveDetails[field], lastSavedRef.current[field])) {
                    fieldsToSave[field] = true;
                }
            }

            if (Object.keys(fieldsToSave).length > 0) {
                saveData(fieldsToSave); // Save only changed fields
                lastSavedRef.current = { ...liveDetails }; // Update snapshot
            }
        }, AUTOSAVE_INTERVAL);

        return () => clearTimeout(timeout);
    }, [liveDetails, saveData]);
};

export default useAutoSaveWithDiff;
