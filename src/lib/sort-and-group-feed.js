import { groupBy } from "lodash";
import { DateTime } from "luxon";

export const sortAndGroupFeed = (feed) => {

    const groupedFeedObject = groupBy(feed, f => DateTime.fromISO(f.created_at).toISODate());

    const groupedFeedArray = Object.entries(groupedFeedObject).map(ent => ({
        date: ent[0],
        feed: ent[1].sort((a,b) => DateTime.fromISO(a.created_at) < DateTime.fromISO(b.created_at))
    }));

    const sortedAndGroupedFeed = groupedFeedArray.sort((a,b) => DateTime.fromISO(a.date) < DateTime.fromISO(b.date));

    return sortedAndGroupedFeed;
}