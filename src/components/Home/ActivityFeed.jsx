import {DateTime, Duration} from 'luxon';
import "../../css/ActivityFeed.css"
import { useNavigate } from 'react-router-dom';
import { getCallTypeIcon } from '../../lib/get-correct-icon';
import { Loading } from '../Loading';


const ActivityFeed = ({ selectedTab, feedByDate, feedLoading }) => {

    const navigate = useNavigate();


    if (feedLoading) {
        return (
        <div className='activity-feed-container'>
            <Loading />
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
                        <div >
                            <img src={getCallTypeIcon(f.call_type ? f.call_type : '')} alt="call-type-icon" />
                            <div className="via-and-duration">
                                <b>{f.via ? f.via : "Unknown"}</b>
                                <i>{Duration.fromMillis(f.duration).toFormat("hh:mm:ss")}</i>
                            </div>
                        </div>
                        <div className='activity-time'>
                            {DateTime.fromISO(f.created_at).toFormat("hh:mm")}
                            <b>
                                {DateTime.fromISO(f.created_at).toFormat("a")}
                            </b>
                            
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