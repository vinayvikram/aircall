import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import ActivityDetail from './ActivityDetail';
import Header from '../Header';
import { BASE_URL } from '../../lib';
import ArchiveIcon from "../../icons/archive.svg";
import UnarchiveIcon from "../../icons/unarchive.svg";
import { toast } from 'react-toastify';

const Detail = () => {

    const [activity, setActivity] = useState({});
    const [activityLoading, setActivityLoading] = useState(false);
    const [archiveLoading, setArchiveLoading] = useState(false);

    const {id} = useParams();

    const fetchActivityDetail = useCallback( async (id) => {
        try {
            setActivityLoading(true)
            const data = await fetch(`${BASE_URL}/activities/${id}`, {
                cache: "no-cache",
                method: "GET"
            }).then(res => res.json());

            setActivity(data)
        } catch(e) {
            console.log(e);
            toast(e.message ? e.message : 'Failed to fetch data.', {
                position: "bottom-center",
                autoClose: 2000
            })
        } finally {
            setActivityLoading(false)
        }
    },[setActivityLoading, setActivity])

    useEffect(() => {
        fetchActivityDetail(id)
    },[id, fetchActivityDetail])

    const toggleArchive = useCallback(async () => {

        try {
            setArchiveLoading(true);

            await toast.promise(fetch(`${BASE_URL}/activities/${activity.id}`, {
                mode: "cors",
                cache: "no-cache",
                headers: {
                    'Content-Type': "application/json"
                },
                method: 'PATCH',
                body: JSON.stringify({
                    is_archived: !activity.is_archived
                })
            }), {
                pending: activity.is_archived ? "Unarchiving" : "Archiving",
                success: activity.is_archived ? "Unarchived successfully." : "Archived successfully.",
                error: "Something went wrong."
            }, {
                position: 'bottom-center',
                autoClose: 2000
            })

            await fetchActivityDetail(activity.id);
        } catch(err) {
            console.log(err);
            toast(err.message ? err.message : 'Something went worng', {
                position: "bottom-center",
                autoClose: 2000
            })
        } finally {
            setArchiveLoading(false)
        }
    },[setArchiveLoading, activity, fetchActivityDetail])


    return ( 
    <React.Fragment>
        <Header 
            type='DETAIL'
            archiveButtonLabel={activity.is_archived ? "Unarchive" : "Archive"}
            archiveButtonAction={toggleArchive}
            archiveLoading={archiveLoading}
            archiveIcon={activity.is_archived ? UnarchiveIcon : ArchiveIcon}
        />
        <ActivityDetail activity={activity} activityLoading={activityLoading} />
    </React.Fragment>
    )
}

export default Detail;