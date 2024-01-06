import { Duration } from "luxon";
import "../../css/ActivityDetail.css";
import { getCallTypeIcon } from "../../lib/get-correct-icon";


const ActivityDetail = ({ activity, activityLoading }) => {

    if(activityLoading) {
        return (
            <div className='activity-detail'>
                Loading...
            </div>
        )
    }

    return (
        <div className='activity-detail-container'>
        <div className="activity-detail">
            <div>
                <b>Direction : </b> <i>{activity.direction ? activity.direction : "Unknown"} </i>  
            </div>
            <div>
                <b>From :</b> <i>{activity.from ? activity.from : "Unknown"}</i>
            </div>
            <div>
                <b>To : </b> <i>{activity.to ? activity.to : "Unknown"}</i>
            </div>
            <div>
                <b>Via : </b> <i>{activity.via ? activity.via : "Unknown"}</i>
            </div>
            <div>
                <b>Duration: </b> <i>{Duration.fromMillis(activity.duration).toFormat("hh:mm:ss.SSS")}</i>
            </div>
            <div>
                <b>Is Archived : </b> <i>{activity.is_archived ? "Yes" : "No"}</i>
            </div>
            <div>
                <b>Call Type : </b> <i>{activity.call_type}</i>
            </div>
        </div>
        <div className="call-type-icon">
            <img src={getCallTypeIcon(activity.call_type ? activity.call_type : '')} />
        </div>
    </div>
    )
}

export default ActivityDetail;