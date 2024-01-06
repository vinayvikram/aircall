import React, { useEffect, useState, useCallback } from "react"
import { sortAndGroupFeed } from "../../lib/sort-and-group-feed";
import ActivityFeed from "./ActivityFeed";
import Header from "../Header";

const Home = () => {
    const [feedByDate, setFeedByDate] = useState([]);
    const [selectedTab, setSelectedTab] = useState("INBOX");

    const [feedLoading, setFeedLoading] = useState(false)


    const fetchFeedData = useCallback(async (selectedTab) => {

        try {

            setFeedLoading(true);

            const fetchedData = await fetch('https://cerulean-marlin-wig.cyclic.app/activities').then(res => res.json());

            const filteredData = fetchedData.filter(f => selectedTab === "ARCHIVED" ? f.is_archived : !f.is_archived);
    
            const sortedAndGroupedData = sortAndGroupFeed(filteredData.filter(f => f.via));
    
            setFeedByDate(sortedAndGroupedData);

        } catch(e) {
            console.log(e);
        } finally {
            setFeedLoading(false)
        }

    },[sortAndGroupFeed, setFeedByDate, setFeedLoading])


    useEffect(() => {
        fetchFeedData(selectedTab)
    },[selectedTab, fetchFeedData])


    return (
    <React.Fragment>
        <Header 
            type="HOME" 
            selectedTab={selectedTab} 
            setSelectedTab={setSelectedTab} 
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