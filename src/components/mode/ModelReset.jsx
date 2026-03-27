import "./ModelReset.css";

/**
 * Modal component used to confirm a reset or critical action.
 *
 * @component
 * @param {Object} props - Component props
 *
 * @param {string} props.message - Message displayed inside the modal
 *
 * @param {Function} props.onConfirm - Callback triggered when the user confirms the action
 * @param {Function} props.onCancel - Callback triggered when the user cancels the action
 *
 * @returns {JSX.Element} The rendered confirmation modal
 */
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