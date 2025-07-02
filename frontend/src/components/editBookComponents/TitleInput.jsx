const TitleInput = ({ title, onChange }) => (
    <>
        <input
            type="text"
            value={title}
            onChange={onChange}
            className="titleInput"
            placeholder="Escribe el titulo..."
        />
    </>
);

export default TitleInput;
