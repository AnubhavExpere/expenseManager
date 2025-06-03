import { useCallback, useContext } from "react";
import { ModalContext } from "../context/Modal";

const ImportModal = () => {
    const modalContext = useContext(ModalContext);

    const hideModal = () => modalContext.setVisibleImport(false);

    return (
        <div className={`modal-container ${modalContext.visibleImport ? '' : 'hide-container'}`}>
            <div className="modal-content">
                <div className="import-header">
                    {/* <h1>Import Expenses</h1> */}
                    <img src='assets/close.png' className="close-btn" id="close" onClick={hideModal} />
                </div>
                <h3>This feature is not available right now.</h3>
            </div>
        </div>
    );
}

export default ImportModal; 