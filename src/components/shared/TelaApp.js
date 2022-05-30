import Header from './Header';
import Menu from './Menu';

export default function TelaApp({ children }) {

    return (
        <>
            <Header />
                {children}
            <Menu />
        </>
    );
}