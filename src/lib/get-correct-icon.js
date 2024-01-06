import MissedCallIcon from '../icons/missed-call.svg';
import AnsweredCallIcon from '../icons/answered-call.svg';
import VoicemailIcon from "../icons/voicemail.svg";
import DefaultCallIcon from "../icons/default-call.svg";

export const getCallTypeIcon = (call_type) => {
    switch (call_type) {
        case "missed": return MissedCallIcon;
        case "answered": return AnsweredCallIcon;
        case "voicemail": return VoicemailIcon;
        default: return DefaultCallIcon;
    }
}