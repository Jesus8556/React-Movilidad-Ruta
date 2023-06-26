import Layout from "../components/layout";
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";
import axios from "axios";

function Prueba() {
    const url = 'http://127.0.0.1:8000/api/movilidad/'
    const urlColegio = 'http://127.0.0.1:8000/api/colegio/'
    const urlApoderado = 'http://127.0.0.1:8000/api/apoderado/'
    const urlGrado = 'http://127.0.0.1:8000/api/grado/'
    const urlVehiculo = 'http://127.0.0.1:8000/api/vehiculo/'
    const urlAlumno = 'http://127.0.0.1:8000/api/alumno/'

    const [colegio, setColegio] = useState([]);
    const [apoderado, setApoderado] = useState([]);
    const [grado, setGrado] = useState([]);
    const [vehiculo, setVehiculo] = useState([]);
    const [alumno, setAlumno] = useState([]);
    const [movilidad, setMovilidad] = useState([]);

    const [movilidad_id, setMovilidadId] = useState(null);
    const [movilidad_tipo_servicio, setMovilidadTipoServicio] = useState('');
    const [movilidad_turno, setMovilidadTurno] = useState('');
    const [movilidad_seccion, setMovilidadSeccion] = useState('');
    const [movilidad_docente, setMovilidadDocente] = useState('');
    const [movilidad_pago, setMovilidadPago] = useState(0);
    const [colegio_nombre, setColegioNombre] = useState('');
    const [apoderado_nombre, setApoderadoNombre] = useState('');
    const [grado_nombre, setGradoNombre] = useState('');
    const [vehiculo_marca, setVehiculoMarca] = useState('');
    const [alumno_nombre, setAlumnoNombre] = useState('');
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState("Datos a modificar");
    const [bandera, setBandera] = useState(false)

    useEffect(() => {
        axios.get(url)
            .then(res => {
                console.log(res.data);
                setMovilidad(res.data);
                setBandera(false)
            })
    }, [bandera]);

    useEffect(() => {
        axios.get(urlColegio)
            .then(res => {
                console.log(res.data);
                setColegio(res.data);
            })
    }, []);
    useEffect(() => {
        axios.get(urlApoderado)
            .then(res => {
                console.log(res.data);
                setApoderado(res.data);
            })
    }, []);
    useEffect(() => {
        axios.get(urlGrado)
            .then(res => {
                console.log(res.data);
                setGrado(res.data);
            })
    }, []);
    useEffect(() => {
        axios.get(urlVehiculo)
            .then(res => {
                console.log(res.data);
                setVehiculo(res.data);
            })
    }, []);
    useEffect(() => {
        axios.get(urlAlumno)
            .then(res => {
                console.log(res.data);
                setAlumno(res.data);
            })
    }, []);

    function guardar(e){
        e.preventDefault()
        let cod = movilidad_id;
        let datos = {
            movilidad_tipo_servicio:movilidad_tipo_servicio,
        
            movilidad_turno: movilidad_turno,
            movilidad_seccion: movilidad_seccion,
            movilidad_docente:movilidad_docente,
            movilidad_pago: movilidad_pago,
            colegio_nombre:colegio_nombre,
            apoderado_nombre:apoderado_nombre,
            grado_nombre:grado_nombre,
            vehiculo_marca:vehiculo_marca,
            alumno_nombre:alumno_nombre

        }
        if(cod > 0){
            //actualizar
        }
        else{

            axios.post(url, datos)
            .then(res=>{
                console.log(res.data)
                setBandera(true)
                setMovilidadTipoServicio('')
                setMovilidadTurno('')
                setMovilidadSeccion('')
                setMovilidadDocente('')
                setMovilidadPago('')
                setColegioNombre('')
                setApoderadoNombre('')
                setGradoNombre('')
                setVehiculoMarca('')
                setAlumnoNombre('')
                setMovilidadId(null)
            }).catch((error)=>{
                console.log(error.toString())
            })
        }
    }



    return (
        <Layout>
            <>

            <h1>Parentescos</h1>
            <div className="container-fluid" >
            <div className="row mt-3">
                <form onSubmit={guardar}>
                    <label className="form-label">Tipo de servicio</label>
                    <input type="hidden" value={movilidad_id} />
                    <input type="text" className="form-control"
                    id="movilidad_tipo_servicio" value={movilidad_tipo_servicio}
                    onChange={(e)=>setMovilidadTipoServicio(e.target.value)}
                    />
                    <br/>
                    <label className="form-label">Turno</label>
                    <input type="text" className="form-control"
                    id="movilidad_turno" value={movilidad_turno}
                    onChange={(e)=>setMovilidadTurno(e.target.value)}
                    />
                    <br/>
                    <label className="form-label">Seccion</label>
                    <input type="text" className="form-control"
                    id="movilidad_seccion" value={movilidad_seccion}
                    onChange={(e)=>setMovilidadSeccion(e.target.value)}
                    />
                    <br/>
                    <label className="form-label">Docente</label>
                    <input type="text" className="form-control"
                    id="movilidad_docente" value={movilidad_docente}
                    onChange={(e)=>setMovilidadDocente(e.target.value)}
                    />
                    <br/>
                    <label className="form-label">Pago</label>
                    <input type="number" className="form-control"
                    id="movilidad_pago" value={movilidad_pago}
                    onChange={(e)=>setMovilidadPago(e.target.value)}
                    />
                    <br/>

                    <label className="form-label">Nombre del Colegio</label>
                    <select name="" className="form-select" id="colegio_nombre" onChange={(e)=>setColegioNombre(e.target.value)}>

                        {colegio.map((col,index)=>{
                            return(
                                <option key={index} value={colegio_nombre}  >
                                    {col.colegio_nombre} 
                                </option>
                            )
                        })}
                    </select>
                    
                    <br/>

                    <label className="form-label">Nombre del Apoderado</label>
                    <select name="" className="form-select" id="apoderado_nombre" onChange={(e)=>setApoderadoNombre(e.target.value)}>
                        {apoderado.map((col,index)=>{
                            return(
                                <option key={index} value={apoderado_nombre}  >
                                    {col.apoderado_nombre} 
                                </option>
                            )
                        })}
                    </select>
                    <br/>
                    <label className="form-label">Grado</label>
                    <select name="" className="form-select" id="grado_nombre" onChange={(e)=>setGradoNombre(e.target.value)}>
                        {grado.map((col,index)=>{
                            return(
                                <option key={index} value={grado_nombre}  >
                                    {col.grado_nombre} 
                                </option>
                            )
                        })}
                    </select>
            
                    
                    <br/>
                    <label className="form-label">Marca de vehiculo</label>
                    <select name="" className="form-select" id="vehiculo_marca" onChange={(e)=>setVehiculoMarca(e.target.value)}>
                        {vehiculo.map((col,index)=>{
                            return(
                                <option key={index} value={vehiculo_marca}  >
                                    {col.vehiculo_marca} 
                                </option>
                            )
                        })}
                    </select>
                    <br/>
                    <label className="form-label">Nomber del alumno</label>
                    <select name="" className="form-select" id="alumno_nombre" onChange={(e)=>setAlumnoNombre(e.target.value)}>
                        {alumno.map((col,index)=>{
                            return(
                                <option key={index} value={alumno_nombre}  >
                                    {col.alumno_nombre} 
                                </option>
                            )
                        })}
                    </select>
                    <br/>

                    <button type="submit" className="btn btn-success">Guardar</button>


                </form>
            </div>

            </div>
            
                <div className="App">
                    <div className="container-fluid">
                        <div className="row mt-3">
                            <div className="col-md-4 offset-md-4" >
                                <div className="d-grid mx-auto">
                                    <button onClick={()=> openModal(1)} className="btn btn-dark" data-bs-toggle='modal' data-bs-target='#modalMovilidad'>
                                        <i className="fa-solid fa-circle-plus"></i> Añadir
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign: 'center' }}>#</th>
                                                <th style={{ textAlign: 'center' }}>Tipo de Servicio</th>
                                                <th style={{ textAlign: 'center' }}>Turno</th>
                                                <th style={{ textAlign: 'center' }}>Seccion</th>
                                                <th style={{ textAlign: 'center' }}>Docente</th>
                                                <th style={{ textAlign: 'center' }}>Pago</th>
                                                <th style={{ textAlign: 'center' }} >Nombre del Colegio</th>
                                                <th style={{ textAlign: 'center' }}>Nombre del apoderado</th>
                                                <th style={{ textAlign: 'center' }}>Grado</th>
                                                <th style={{ textAlign: 'center' }}>Marca de Vehiculo</th>
                                                <th style={{ textAlign: 'center' }}>Nombre del alumno</th>
                                                <th style={{ textAlign: 'center' }}>Acciones</th>

                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {movilidad.map((data) => (
                                                
                                                <tr key={data.movilidad_id}>
                                                    <td>{(i + 1)}</td>

                                                    <td style={{ textAlign: 'center' }}>{data.movilidad_tipo_servicio}</td>
                                                    <td style={{ textAlign: 'center' }}>{data.movilidad_turno}</td>
                                                    <td style={{ textAlign: 'center' }}>{data.movilidad_seccion}</td>
                                                    <td style={{ textAlign: 'center' }}>{data.movilidad_docente}</td>
                                                    <td style={{ textAlign: 'center' }}>S/.{data.movilidad_pago}</td>
                                                    <td style={{ textAlign: 'center' }}>{data.colegio_nombre}</td>
                                                    <td style={{ textAlign: 'center' }}>{data.apoderado_nombre}</td>
                                                    <td style={{ textAlign: 'center' }}>{data.grado_nombre}</td>
                                                    <td style={{ textAlign: 'center' }}>{data.vehiculo_marca}</td>
                                                    <td style={{ textAlign: 'center' }}>{data.alumno_nombre}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <button onClick={() => openModal(
                                                            2,
                                                            data.id,
                                                            data.movilidad_tipo_servicio,
                                                            data.movilidad_turno,
                                                            data.movilidad_seccion,
                                                            data.movilidad_docente,
                                                            data.movilidad_pago,
                                                            data.colegio_nombre,
                                                            data.apoderado_nombre,
                                                            data.grado_nombre,
                                                            data.vehiculo_marca,
                                                            data.alumno_nombre

                                                        )}

                                                            className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                                                            <i className='fa-solid fa-edit'></i>
                                                        </button>
                                                        &nbsp;
                                                        <button onClick={() => deleteProduct(data.id, data.movilidad_tipo_servicio)} className='btn btn-danger'>
                                                            <i className='fa-solid fa-trash'></i>
                                                        </button>
                                                    </td>




                                                </tr>
                                            ))
                                            }



                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                    



                </div>
            </>




        </Layout>
    )
}
export default Prueba