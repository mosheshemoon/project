import UsersList from '../components/list/UsersList';
import Header from '../components/header/Header';
import css from './Home.module.scss';

function Home() {
    return (
        <div className={css.home}>
            <Header></Header>
            <UsersList></UsersList>
        </div>
    );
}

export default Home;
