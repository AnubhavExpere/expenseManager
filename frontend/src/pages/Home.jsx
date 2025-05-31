import MainContainer from '../components/MainContainer';
import BottomContainer from '../components/BottomContainer';
import AddTransaction from '../components/AddTransactionModal';
import { ModalProvider } from '../context/Modal';
import ImportModal from '../components/ImportModal';

function Home() {
    return (
        <>
            <ModalProvider>
                <MainContainer />
                <BottomContainer />
                <AddTransaction />
                <ImportModal />
            </ModalProvider>
        </>
    )
}

export default Home;