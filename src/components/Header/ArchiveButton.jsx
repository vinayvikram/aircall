const ArchiveButton = ({ label, onClick}) => {
    return (
        <div className='archive-button'>
            <button onClick={onClick}>
            {label}
            </button>
        </div>
    )
};

export default ArchiveButton;