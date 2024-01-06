const ActivityDetail = ({ activity, activityLoading }) => {

    if(activityLoading) {
        return (
            <div className='activity-detail'>
                Loading...
            </div>
        )
    }

    return (
        <div className='activity-detail'>
        <div>
            Direction : {activity.direction}   
        </div>
        <div>
            From : {activity.from}
        </div>
        <div>
            To : {activity.to}
        </div>
        <div>
            Via : {activity.via}
        </div>
        <div>
            Duration: {activity.duration}
        </div>
        <div>
            Is Archived : {activity.is_archived}
        </div>
        <div>
            Call Type : {activity.call_type}
        </div>
    </div>
    )
}

export default ActivityDetail;