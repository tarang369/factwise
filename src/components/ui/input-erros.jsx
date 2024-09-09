/* eslint-disable react/prop-types */
const InputErrors = ({ error }) => {
    return (
        <>
            {error && <p className="text-red-500 text-xs text-left">{error}</p>}
        </>
    );
};

export default InputErrors;
