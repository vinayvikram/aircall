import {DateTime, Duration} from 'luxon';
import "../../css/ActivityFeed.css"
import { useNavigate } from 'react-router-dom';


const ActivityFeed = ({ selectedTab, feedByDate, feedLoading }) => {

    const navigate = useNavigate();


    if (feedLoading) {
        return (
        <div className='activity-feed-container'>
            Loading...
        </div>
        )
    }

    return (
        <div className="activity-feed-container">
        {feedByDate.map(item => (
            <div key={item.date}>
                <div className="activity-date">{DateTime.fromISO(item.date).toFormat("MMM, dd yyyy")}</div>
                <div className="activity-feed">
                {item.feed.filter(f => selectedTab === "ARCHIVED" ? f.is_archived : !f.is_archived).map((f) => (
                    <div className="activity" onClick={() => navigate(`/detail/${f.id}`)} key={f.id}>
                        <div className="via-and-duration">
                            <b>{f.via ? f.via : "Unknown"}</b>
                            <i>{Duration.fromMillis(f.duration).toFormat("hh:mm:ss")}</i>
                        </div>
                        <div>
                            {DateTime.fromISO(f.created_at).toFormat("hh:mm a")}
                        </div>
                    </div>
                ))}
            </div>
            </div>
        ))}
    </div>
    )
};

export default ActivityFeed;