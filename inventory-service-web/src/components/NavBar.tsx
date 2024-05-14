    import { FC, useContext } from 'react';
    import Container from 'react-bootstrap/Container';
    import Navbar from 'react-bootstrap/Navbar';
    import { Context } from '../main';
    import { observer } from 'mobx-react-lite';
    import { Link } from 'react-router-dom';
    import { Theme, ThemeContext } from '../services/ThemeProvider/lib/ThemeContext';
    import ThemeToggle from './ThemeTogler';


    const NavBar: FC = () => {
    const { userStore } = useContext(Context);
    const { theme } = useContext(ThemeContext);

    return (
        <Navbar bg={theme === Theme.DARK ? 'dark' : 'light'} variant={theme === Theme.DARK ? 'dark' : 'light'}>
        <Container>
            <Navbar.Brand>
            <Link to={'/'}>Inventory-Service</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <ThemeToggle />
            <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                Signed in as: <a href="#login">{userStore.user.email}</a>
            </Navbar.Text>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
    };

    export default observer(NavBar);
