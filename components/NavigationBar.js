import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Form,
    FormGroup,
    Label,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <Navbar color="light" light expand="md" style={{boxShadow: '0px 10px 5px 0px #eee'}}>
                <NavbarBrand href="/">Şarkı Sözleri</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/">Anasayfa</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/artists">Sanatçılar</NavLink>
                        </NavItem>
                        <NavItem style={{marginLeft:'10px'}}>
                            <Input
                                type="search"
                                name="search"
                                id="exampleSearch"
                                placeholder="şarkı arayın..."
                                onKeyUp={this.props.handleSearch}
                                onChange={this.props.handleSearch}
                            />
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavigationBar;