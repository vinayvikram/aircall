import { useNavigate } from "react-router-dom";
import CallLogo from "../../call-icon.svg";

const ActivityLogo = () => {

    const navigate = useNavigate();

    return (
        <div className='activity-logo' onClick={() => navigate('/')}>
          <img src={CallLogo} alt="circle-call"/>
          Activity
        </div>
    )
};

export default ActivityLogo;