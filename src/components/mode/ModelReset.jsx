import "./ModelReset.css";

const ModelReset = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="modelOverlay">
            <div className="modelBox">
                <p className="modelMessage" style={{ whiteSpace: "pre-line" }}>
                    {message}
                </p>
                <div className="modelActions">
                    <button className="modelBtn modelBtnConfirmReset" onClick={onConfirm}>
                        Oui
                    </button>

                    <button className="modelBtn modelBtnCancelReset" onClick={onCancel}>
                        Non
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModelReset;