import { useEffect, useState } from "react"
import "../css/ActivityFeed.css";
import { DateTime } from "luxon";
import { sortAndGroupFeed } from "../lib/sort-and-group-feed";

const ActivityFeed = () => {
    const [feedByDate, setFeedByDate] = useState([]);

    useEffect(() => {
        try {
            fetch('https://cerulean-marlin-wig.cyclic.app/activities').then(res => res.json()).then(data => {
                const processedFeed = sortAndGroupFeed(data);

                console.log(processedFeed);
                setFeedByDate(processedFeed);
            }).catch(err => {
                console.log(err);
            })
        } catch(e) {
            console.log(e);
        }
    },[])

    return (<div className="activity-feed-container">
        {feedByDate.map(item => (
            <div key={item.date}>
                <div className="activity-date">{DateTime.fromISO(item.date).toFormat("dd MMM yyyy")}</div>
                <div className="activity-feed">
                {item.feed.map((f) => (
                    <div className="activity">
                        <div>
                        {f.via ? f.via : "Unknown"}
                        </div>
                        <div>
                            {DateTime.fromISO(f.created_at).toFormat("hh:mm a")}
                        </div>
                    </div>
                ))}
            </div>
            </div>
        ))}
    </div>)
}

export default ActivityFeed;