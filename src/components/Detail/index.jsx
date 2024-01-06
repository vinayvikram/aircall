import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import "../../css/ActivityDetail.css"
import ActivityDetail from './ActivityDetail';
import Header from '../Header';
import { BASE_URL } from '../../lib';

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

            await fetch(`${BASE_URL}/activities/${activity.id}`, {
                mode: "cors",
                cache: "no-cache",
                headers: {
                    'Content-Type': "application/json"
                },
                method: 'PATCH',
                body: JSON.stringify({
                    is_archived: !activity.is_archived
                })
            })

            await fetchActivityDetail(activity.id);
        } catch(err) {
            console.log(err)
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
        />
        <ActivityDetail activity={activity} activityLoading={activityLoading} />
    </React.Fragment>
    )
}

export default Detail;