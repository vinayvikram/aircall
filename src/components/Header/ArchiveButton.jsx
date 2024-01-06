const ArchiveButton = ({ label, onClick, loading, icon }) => {
    return (
        <div className='archive-button'>
            <img src={icon} />
            <button onClick={onClick} disabled={loading}>
            {loading ? "Loading..." : label}
            </button>
        </div>
    )
};

export default ArchiveButton;