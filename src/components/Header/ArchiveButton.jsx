const ArchiveButton = ({ label, onClick, loading}) => {
    return (
        <div className='archive-button'>
            <button onClick={onClick} disabled={loading}>
            {loading ? "Loading..." : label}
            </button>
        </div>
    )
};

export default ArchiveButton;