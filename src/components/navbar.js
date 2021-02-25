import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class NavBar extends React.Component {
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location = "/login"
    }

    Siswa = () => {
        window.location = "/siswa"
    }

    Pelanggaran = () => {
        window.location = "/pelanggaran"
    }

    Pegawai = () => {
        window.location = "/pegawai"
    }
 
    render(){
        return(
            <Navbar bg="light" variant="light">
                <Navbar.Brand> <Link to='/'>Home</Link></Navbar.Brand>
                <Nav className="mr-auto">
                    {/* <Nav.Link> <Link to='/pegawai'>Pegawai</Link></Nav.Link> */}
                    <Nav.Link onClick={() => this.Siswa()}>Siswa</Nav.Link>
                    <Nav.Link onClick={() => this.Pelanggaran()}>Pelanggaran Siswa</Nav.Link>
                    <Nav.Link onClick={() => this.Pegawai()}>Pegawai</Nav.Link>
                    <Nav.Link onClick={() => this.Logout()}>Logout</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}
export default NavBar;