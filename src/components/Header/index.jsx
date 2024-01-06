import { useNavigate } from "react-router-dom";
import ActivityLogo from "./ActivityLogo";
import ArchiveButton from "./ArchiveButton";
import "../../css/Header.css";

const Header = ({ type = "HOME", selectedTab = "INBOX", setSelectedTab = () => {}, archiveButtonLabel = '', archiveButtonAction = () => {} }) => {

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
                    </div>
                    <ArchiveButton label={archiveButtonLabel} onClick={archiveButtonAction} />
                </header>
            );
        case "DETAIL":
            return (
                <header>
                    <div className="logo-container">
                        <ActivityLogo />
                        <div className="back-button">
                            <button onClick={() => navigate('/')}>
                                Go Back
                            </button>
                        </div>
                    </div>
                    <ArchiveButton label={archiveButtonLabel} onClick={archiveButtonAction} />
                </header>
            );
        default:
            return <></>;
    }
};

export default Header;