import { useNavigate } from "react-router-dom";
import ActivityLogo from "./ActivityLogo";
import ArchiveButton from "./ArchiveButton";
import "../../css/Header.css";
import ArchiveIcon from "../../icons/archive.svg"
import SettingsIcon from "../../icons/settings.svg";
import BackIcon from "../../icons/back.svg";

const Header = ({ type = "HOME", selectedTab = "INBOX", setSelectedTab = () => {}, archiveButtonLabel = '', archiveButtonAction = () => {}, archiveLoading = false, archiveIcon = ArchiveIcon }) => {

    const navigate = useNavigate();

    switch (type) {
        case "HOME": 
            return (
                <header>
                    <div className="logo-container">
                        <ActivityLogo />
                        <div className='tabs-container'>
                            <button role="tab" className={`tab ${selectedTab === "INBOX" ? "selected" : ""}`} onClick={() => setSelectedTab("INBOX")} >
                                Inbox
                            </button>
                            <span className='dashed-line'></span>
                            <button role="tab" className={`tab ${selectedTab === "ARCHIVED" ? "selected" : ""}`} onClick={() => setSelectedTab("ARCHIVED")}>
                                Archived
                            </button>
                        </div>
                        <img src={SettingsIcon} alt='' />
                    </div>
                    <ArchiveButton icon={archiveIcon} label={archiveButtonLabel} onClick={archiveButtonAction} loading={archiveLoading} />
                </header>
            );
        case "DETAIL":
            return (
                <header>
                    <div className="logo-container">
                        <ActivityLogo />
                        <div className="back-button">
                            <button onClick={() => navigate('/')}>
                                <img src={BackIcon} alt="back" />
                                Go Back
                            </button>
                        </div>
                        <img src={SettingsIcon} alt='' />
                    </div>
                    <ArchiveButton icon={archiveIcon} label={archiveButtonLabel} onClick={archiveButtonAction} loading={archiveLoading} />
                </header>
            );
        default:
            return <></>;
    }
};

export default Header;