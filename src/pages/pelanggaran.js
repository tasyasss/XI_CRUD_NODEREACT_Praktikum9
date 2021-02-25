import React from 'react';
import axios from 'axios';
import NavBar from '../components/navbar'
import {Button, Modal, Table, Card, Form} from 'react-bootstrap';

class Pelanggaran extends React.Component {
    constructor() {  
        super();  
        this.state = {  
            pelanggaran: [],  
            id_pelanggaran: "",
            nama_pelanggaran: "",
            poin: "",
            action: "",  
            search: "", 
            isModalOpen: false,
        }  
        
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    bind = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleAdd = () => {
        this.setState({
            id_pelanggaran: "",
            nama_pelanggaran: "",
            poin: "",     
            action: "insert",
            isModalOpen: true
        })
    }

    handleEdit = (item) => {
        this.setState({
            id_pelanggaran: item.id_pelanggaran,
            nama_pelanggaran: item.nama_pelanggaran,
            poin: item.poin,     
            action: "update",
            isModalOpen: true
        })
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }

    handleSave = (event) => {
        event.preventDefault();
        // menampung data nip, nama dan alamat dari form
        // kedalam FormData() untuk dikirim 
        let url = "";
        if (this.state.action === "insert") {
            url = "http://localhost:2000/pelanggaran/save"
        } else {
            url = "http://localhost:2000/pelanggaran/update"
        }
        
        let form = {
            id_pelanggaran: this.state.id_pelanggaran,
            nama_pelanggaran: this.state.nama_pelanggaran,
            poin: this.state.poin
        }

        // mengirim data ke api untuk disimpan pada database
        axios.post(url, form, this.headerConfig())
        .then(response => {
            // jika proses simPn berhasil, memanggil data yang terbaru
            this.getPelanggaran();
        })
        .catch(error => {
            console.log(error);
        });
        // menutup form Modal
        this.setState({
            isModalOpen: false
        })
    }

    getPelanggaran = () => {
        let url = "http://localhost:2000/pelanggaran";
        // mengakses api untuk mengambil data pelanggaran
        
        axios.get(url, this.headerConfig())
        .then(response => {
          // mengisikan data dari respon API ke array pelanggaran
          this.setState({pelanggaran: response.data.pelanggaran});
        })

        .catch(error => {
          console.log(error);
        });
    }

    findPelanggaran = (event) => {
        let url = "http://localhost:2000/pelanggaran/";
        if (event.keyCode === 13) {
            // menampung data keyword pencarian
            
            let form = {
                find: this.state.search
            }
            // mengakses api untuk mengambil data pelanggaran
            // berdasarkan keyword
            
            axios.post(url, form, this.headerConfig())
            .then(response => {
                // mengisikan data dari respon api ke array pelanggaran
                this.setState({pelanggaran: response.data.pelanggaran});
            })

            .catch(error => {
                console.log(error);
            });
        }
    }

    componentDidMount(){
        // method yang pertama kali dipanggil pada saat load page
        this.getPelanggaran()
    }

    Drop = (id_pelanggaran) => {
        let url = "http://localhost:2000/pelanggaran/" + id_pelanggaran;
        // memanggil url api untuk menghappus data pada database
        if (window.confirm('Hapus data ini?')) {
            axios.delete(url, this.headerConfig())
            .then(response => {
                // jika proses hapus data berhasil, memanggil data yang terbaru
                this.getPelanggaran();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    
    componentDidMount(){
        // method yang pertama kali dipanggil pada saat load page
        this.getPelanggaran()
    }

    render(){
        return(
            <>
                <NavBar />
                <Card>
                    <Card.Header className="card-header bg-info text-white" align={'center'}>
                        Data Pelanggaran
                    </Card.Header>

                    <Card.Body>
                        <input type="text" className="form-control mb-2" 
                        name="search" value={this.state.search} onChange={this.bind} 
                        onKeyUp={this.findPelanggaran} placeholder="Pencarian..." />
                        
                        <Button variant="success" onClick={this.handleAdd}>
                            Tambah Data
                        </Button>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID Pelanggaran</th>  
                                    <th>Nama Pelanggaran</th>  
                                    <th>Poin</th>  
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.pelanggaran.map((item,index) => {  
                                return (  
                                <tr key={index}>  
                                    <td>{item.id_pelanggaran}</td>  
                                    <td>{item.nama_pelanggaran}</td>  
                                    <td>{item.poin}</td>  
                                    <td>  
                                    <Button className="btn btn-sm btn-info m-1" data-toggle="modal"  
                                    data-target="#modal" onClick={() => this.handleEdit(item)}>  
                                        Edit  
                                    </Button>  
                                    <Button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.id_pelanggaran)}>  
                                        Hapus  
                                    </Button>  
                                    </td>  
                                </tr>  
                                );  
                            })}
                            </tbody>
                            </Table>
                </Card.Body>
                </Card>

                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Pelanggaran</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.handleSave}>
                        <div className="modal-body">
                            ID Pelanggaran
                            <input type="number" name="id_pelanggaran" value={this.state.id_pelanggaran} onChange={this.bind}
                            className="form-control" required />
                            Nama Pelanggaran
                            <input type="text" name="nama_pelanggaran" value={this.state.nama_pelanggaran} onChange={this.bind}
                            className="form-control" required />
                            Poin
                            <input type="number" name="poin" value={this.state.poin} onChange={this.bind}
                            className="form-control" required />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-sm btn-success" type="submit">
                                Simpan
                            </button>
                        </div>
                    </form>     
                </Modal>
            </>
        );  
    }




}

export default Pelanggaran;