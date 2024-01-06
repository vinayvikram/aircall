import React, { useEffect, useState, useCallback } from "react"
import { sortAndGroupFeed } from "../../lib/sort-and-group-feed";
import ActivityFeed from "./ActivityFeed";
import Header from "../Header";
import { BASE_URL } from "../../lib";

const Home = () => {
    const [feedByDate, setFeedByDate] = useState([]);
    const [selectedTab, setSelectedTab] = useState("INBOX");

    const [feedLoading, setFeedLoading] = useState(false);
    const [archiveLoading, setArchiveLoading] = useState(false);


    const fetchFeedData = useCallback(async (selectedTab) => {

        try {

            setFeedLoading(true);

            const fetchedData = await fetch(`${BASE_URL}/activities`).then(res => res.json());

            const filteredData = fetchedData.filter(f => selectedTab === "ARCHIVED" ? f.is_archived : !f.is_archived);
    
            const sortedAndGroupedData = sortAndGroupFeed(filteredData);
    
            setFeedByDate(sortedAndGroupedData);

        } catch(e) {
            console.log(e);
        } finally {
            setFeedLoading(false)
        }

    },[setFeedByDate, setFeedLoading])

    const archiveAll = useCallback(async () => {
        const unarchivedActivities = feedByDate.map(f => f.feed).flat();

        try {

            setArchiveLoading(true);

            await Promise.all(unarchivedActivities.map(activity => {
                return fetch(`${BASE_URL}/activities/${activity.id}`, {
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
            })).then(() => {
                fetchFeedData(selectedTab)
            })

        } catch (err) {
            console.log(err)
        } finally {
            setArchiveLoading(false)
        }

    },[feedByDate, setArchiveLoading, fetchFeedData, selectedTab]);

    const resetAll = useCallback(async () => {
        try {
            setArchiveLoading(true);
            await fetch(`${BASE_URL}/reset`,{
                cache: "no-cache",
                method: 'PATCH'
            }).then(() => {
                fetchFeedData(selectedTab)
            })

        } catch (err) {
            console.log(err)
        } finally {
            setArchiveLoading(false);
        }
    },[setArchiveLoading, fetchFeedData, selectedTab])


    useEffect(() => {
        fetchFeedData(selectedTab)
    },[selectedTab, fetchFeedData])


    return (
    <React.Fragment>
        <Header 
            type="HOME" 
            selectedTab={selectedTab} 
            setSelectedTab={setSelectedTab} 
            archiveButtonLabel={selectedTab === "INBOX" ? "Archive all calls" : "Unarchive all calls"}
            archiveButtonAction={selectedTab === "INBOX" ? archiveAll : resetAll}
            archiveLoading={archiveLoading}
        />
        <ActivityFeed 
            selectedTab={selectedTab} 
            feedByDate={feedByDate} 
            feedLoading={feedLoading} 
        />
    </React.Fragment>
    )
}

export default Home;