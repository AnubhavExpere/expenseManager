import { useContext } from "react";
import Button from "./Button";
import { ModalContext } from "../context/Modal";
import {UserContext} from "../context/User"

function TopContainer(){
    const userContext = useContext(UserContext); 
    const modalContext = useContext(ModalContext);

    const showAddExpense = () => modalContext.setVisibleAddExpense(true);
    const showImportModal = () => {
        console.log('showing import modal..');
        modalContext.setVisibleImport(true);
        console.log('visible import: ', modalContext.visibleImport);
    }

    const firstName = userContext ? userContext.first_name : '';
    return (
        <div className='top-container'>
            <div className="welcome-text">
                <h1>Welcome Back, {firstName}!</h1>
                <p>Track your expenses and manage your budget effectively.</p>
            </div>
            <div className="action-buttons">
                <Button icon='assets/export.png' text='Import' onClickCallback={showImportModal} bgColor='white' textColor='black'/>
                <Button icon='assets/add.png' text='Add Expenses' onClickCallback={showAddExpense} bgColor='black' textColor='white' />
            </div>
        </div>
    )
}

export default TopContainer;