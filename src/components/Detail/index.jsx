import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import "../../css/ActivityDetail.css"
import ActivityDetail from './ActivityDetail';
import Header from '../Header';

const Detail = () => {

    const [activity, setActivity] = useState({});
    const [activityLoading, setActivityLoading] = useState(false);
    const [archiveLoading, setArchiveLoading] = useState(false);

    const {id} = useParams();

    const fetchActivityDetail = useCallback( async (id) => {
        try {
            setActivityLoading(true)
            const data = await fetch(`https://cerulean-marlin-wig.cyclic.app/activities/${id}`, {
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

    const archiveActivity = useCallback(async (id) => {

        try {
            setArchiveLoading(true);

            await fetch(`https://cerulean-marlin-wig.cyclic.app/activities/${id}`, {
                mode: "cors",
                cache: "no-cache",
                headers: {
                    'Content-Type': "application/json"
                },
                method: 'PATCH',
                body: JSON.stringify({
                    is_archived: true
                })
            })
        } catch(err) {
            console.log(err)
        } finally {
            setArchiveLoading(false)
        }
    },[setArchiveLoading])


    return ( 
    <React.Fragment>
        <Header 
            type='DETAIL'
        />
        <ActivityDetail activity={activity} activityLoading={activityLoading} />
    </React.Fragment>
    )
}

export default Detail;