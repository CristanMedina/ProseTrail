const TitleInput = ({ title, onChange }) => (
    <>
        <input
            type="text"
            value={title}
            onChange={onChange}
            className="titleInput"
            placeholder="Enter book title"
        />
    </>
);

export default TitleInput;