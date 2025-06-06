import MainContainer from '../components/MainContainer';
import BottomContainer from '../components/BottomContainer';
import AddTransaction from '../components/AddTransactionModal';
import { ModalProvider } from '../context/Modal';
import ImportModal from '../components/ImportModal';
import SortBox from '../components/SortBox';

function Home() {
    return (
        <>
            <MainContainer />
            <BottomContainer />
            <ImportModal />
        </>
    )
}

export default Home;