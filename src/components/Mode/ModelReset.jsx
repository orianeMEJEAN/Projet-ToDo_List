import "./ModelReset.css";

const ModelReset = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="modelOverlay">
            <div className="modelBox">
                <p className="modelMessage">{message}</p>
                <div className="model-actions">
                    <button className="modelBtn modelBtnConfirm" onClick={onConfirm}>
                        Oui
                    </button>

                    <button className="modelBtn modelBtnCancel" onClick={onCancel}>
                        Non
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModelReset;