
const ArchiveButton = ({ label, onClick, loading, icon }) => {
    return (
        <div className='archive-button'>
            <img src={icon} alt="archive-icon" />
            <button onClick={onClick} disabled={loading}>
            {label}
            </button>
        </div>
    )
};

export default ArchiveButton;